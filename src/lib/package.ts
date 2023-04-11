import Maintainer from './maintainer'

export default interface Package {
  name: string
  maintainers: Maintainer[]
}
