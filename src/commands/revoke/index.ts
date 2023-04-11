import {Args, Command, Flags, ux} from '@oclif/core'
import Packagist from '../../lib/packagist'

export default class Revoke extends Command {
  static description = 'Revoke access for a specific maintainer to all ' +
  'packages the logged-in maintainer has access to. The command will ' +
  'warn you of what it will do before it does it.'

  static flags = {
    pauth: Flags.string({description: 'pauth cookie', required: true}),
    packagist: Flags.string({description: 'packagist cookie', required: true}),
  }

  static args = {
    maintainer: Args.string({description: 'Packagist maintainer to fetch data for', required: true}),
  }

  async run(): Promise<void> {
    const {args, flags} = await this.parse(Revoke)

    const packagist = new Packagist(flags.packagist, flags.pauth)
    const maintainer = args.maintainer

    const noAccess: string[] = []
    const hasAccess: string[] = []

    const me = await packagist.getCurrentUser()

    const packages = await packagist.fetchPackagesManagedBy(maintainer)

    for (const p of packages) {
      // eslint-disable-next-line no-await-in-loop
      const maintainers = await packagist.getMaintainers(p)
      if (maintainers.includes(me)) {
        hasAccess.push(p)
      } else {
        noAccess.push(p)
      }
    }

    ux.info('\n\nDo not have access to manage these packages')
    this.log(noAccess.join('\n'))

    if (hasAccess.length === 0) {
      ux.info('\n\nYou do not have access to revoke any packages for this user')
      return
    }

    ux.info('\n\nYou have access to manage these packages')
    this.log(hasAccess.join('\n'))

    const confirm = await ux.confirm('\n\nDo you want to revoke access to these packages?')

    if (confirm) {
      for (const p of hasAccess) {
        // eslint-disable-next-line no-await-in-loop
        await packagist.revokeAccess(p, maintainer)
      }
    }
  }
}
