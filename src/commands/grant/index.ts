import {Args, Command, Flags, ux} from '@oclif/core'
import Packagist from '../../lib/packagist'

export default class Grant extends Command {
  static description = 'Grant access for a specific maintainer to all packages within an organisation'

  static flags = {
    pauth: Flags.string({description: 'pauth cookie', required: true}),
    packagist: Flags.string({description: 'packagist cookie', required: true}),
  }

  static args = {
    maintainer: Args.string({description: 'Packagist maintainer to grant access to', required: true}),
    organisation: Args.string({description: 'Packagist organisation this person can manage', required: true}),
  }

  async run(): Promise<void> {
    const {args, flags} = await this.parse(Grant)

    const packagist = new Packagist(flags.packagist, flags.pauth)
    const {maintainer, organisation} = args

    const noAccess: string[] = []
    const canGrant: string[] = []
    const alreadyHasAccess: string[] = []

    const me = await packagist.getCurrentUser()

    const packages = await packagist.fetchPackagesByOrg(organisation)

    for (const p of packages) {
      // eslint-disable-next-line no-await-in-loop
      const maintainers = await packagist.getMaintainers(p)
      if (maintainers.includes(maintainer)) {
        alreadyHasAccess.push(p)
      } else if (maintainers.includes(me)) {
        canGrant.push(p)
      } else {
        noAccess.push(p)
      }
    }

    this.list('Do not have access to manage these packages', noAccess)

    this.list('User already has access to these', alreadyHasAccess)

    if (canGrant.length === 0) {
      ux.info('\n\nThis user already has access to all packages in this organisation')
      return
    }

    this.list('Can grant access to these packages', canGrant)

    const confirm = await ux.confirm('\n\nDo you want to grant access to these packages?')

    if (confirm) {
      for (const p of canGrant) {
        this.log(`Granting access to ${p} to ${maintainer}`)
        // eslint-disable-next-line no-await-in-loop
        await packagist.grantAccess(p, maintainer)
      }
    }
  }

  private list(message:string, packages: string[]) {
    ux.info(`\n\n## ${message}`)
    for (const p of packages) {
      this.log(`- ${p}`)
    }
  }
}
