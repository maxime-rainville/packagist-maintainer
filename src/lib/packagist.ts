import {CheerioAPI, load} from 'cheerio'
import Package from './package'
import sleep from './sleep'

export default class Packagist {
  private cookie: string

  public constructor(packagistCookie:string, pauthCookie:string) {
    this.cookie = `pauth=${pauthCookie}; packagist=${packagistCookie}`
  }

  private async fetchHtml(url: string): Promise<CheerioAPI> {
    console.log(`https://packagist.org/${url}`)
    const response = await fetch(
      `https://packagist.org/${url}`,
      {headers: {cookie: this.cookie}},
    )
    const body = await response.text()
    const html = load(body)
    await sleep(500)
    return html
  }

  public async getCurrentUser(): Promise<string> {
    const html = await this.fetchHtml('profile')
    return html('h2.title').first().text().trim()
  }

  public async fetchPackagesManagedBy(maintainer: string, page = 1): Promise<string[]> {
    const html = await this.fetchHtml(`users/${maintainer}/?page=${page}`)

    const packages: string[] = []

    html('ul.packages').children('li').each((index, element) => {
      const p = element.attribs['data-url'].replace('/packages/', '')
      packages.push(p)
    })

    const pagination = html('.pagination > ul').children('li')

    if (pagination.length === 0 || pagination.last().is('.disabled')) {
      return packages
    }

    return [...packages, ...(await this.fetchPackagesManagedBy(maintainer, page + 1))]
  }

  public async fetchPackagesByOrg(organisation: string): Promise<string[]> {
    const response = await fetch(`https://packagist.org/packages/list.json?vendor=${organisation}`)
    const data = await response.json()
    await sleep(500)
    return data.packageNames
  }

  public async getMaintainers(packageName: string): Promise<string[]> {
    const p = await this.fetchPackage(packageName)
    return p.maintainers.map(m => m.name)
  }

  private async fetchPackage(packageName: string): Promise<Package> {
    const response = await fetch(`https://packagist.org/packages/${packageName}.json`)
    const data = await response.json()
    await sleep(500)
    return data.package
  }

  public async revokeAccess(packageName: string, maintainer: string): Promise<void> {
    const token = await this.fetchRemoveForm(packageName, maintainer)
    console.log(token)
    await this.postRemoveMaintainerForm(packageName, token.token, token.userId)
  }

  private async fetchRemoveForm(packageName: string, maintainer: string): Promise<{token: string, userId: string}> {
    const html = await this.fetchHtml(`packages/${packageName}`)
    const token = html('#remove_maintainer_form__token').val() as string

    let userId = ''
    html('#remove_maintainer_form_user').children().each((index, element) => {
      const node: any = element.children[0]
      if (node.data === maintainer) {
        userId = element.attribs.value
      }
    })

    return {token, userId}
  }

  private async postRemoveMaintainerForm(packageName: string, token: string, userId: string): Promise<void> {
    const form = new URLSearchParams()
    form.append('remove_maintainer_form[user]', userId)
    form.append('remove_maintainer_form[_token]', token)

    const url = `https://packagist.org/packages/${packageName}/maintainers/delete`
    const options = {
      method: 'POST',
      headers: {
        cookie: this.cookie,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: form.toString(),
    }

    const response = await fetch(url, options)

    await response.body

    await sleep(500)

    if (!response.ok) {
      console.error('rejection')
      return Promise.reject(new Error(`Failed to revoke access for ${packageName} from ${userId}`))
    }
  }

  public async grantAccess(packageName: string, maintainer: string): Promise<void> {
    const token = await this.fetchGrantForm(packageName)
    await this.postGrantMaintainerForm(packageName, token.token, maintainer)
  }

  private async fetchGrantForm(packageName: string): Promise<{token: string}> {
    const html = await this.fetchHtml(`packages/${packageName}`)
    const token = html('#add_maintainer_form__token').val() as string

    return {token}
  }

  private async postGrantMaintainerForm(packageName: string, token: string, maintainer: string): Promise<void> {
    const form = new URLSearchParams()
    form.append('add_maintainer_form[user]', maintainer)
    form.append('add_maintainer_form[_token]', token)

    const url = `https://packagist.org/packages/${packageName}/maintainers/`
    const options = {
      method: 'POST',
      headers: {
        cookie: this.cookie,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: form.toString(),
    }

    const response = await fetch(url, options)

    await response.body

    await sleep(500)

    if (!response.ok) {
      console.error('rejection')
      return Promise.reject(new Error(`Failed to grant access for ${packageName} to ${maintainer}`))
    }
  }
}
