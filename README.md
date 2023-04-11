# Package maintainer script

This is a simple utility to help update packagist maintainers. Packagist doesn't provide an API to do some privileged tasks (e.g. Adding/removing maintainers). To get around that, the command require you to provide a some cookie values.



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)


<!-- toc -->
* [Package maintainer script](#package-maintainer-script)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
This package is not published on NPM. You need to clone it locally for it to work.

```bash
git clone https://github.com/maxime-rainville/packagist-maintainer
nvm install 18
nvm use
npm install
npm run build
./bin/run
```

## Getting the cookie value

- Login into [https://packagist.org/](https://packagist.org/)
- Using your browser's Dev tools look at the cookie value for `packagist` and `pauth`.
- When running the command provide the cookie values.

Note that those values are likely to change while the command is running. If you hit an error, try refreshing your browser to get the new values.

# Commands
<!-- commands -->
* [`packagist-maintainer grant MAINTAINER ORGANISATION`](#packagist-maintainer-grant-maintainer-organisation)
* [`packagist-maintainer help [COMMANDS]`](#packagist-maintainer-help-commands)
* [`packagist-maintainer revoke MAINTAINER`](#packagist-maintainer-revoke-maintainer)

## `packagist-maintainer grant MAINTAINER ORGANISATION`

Grant access for a specific maintainer to all packages within an organisation. The command will warn you of what it will do before it does it.

```
USAGE
  $ packagist-maintainer grant MAINTAINER ORGANISATION --pauth <value> --packagist <value>

ARGUMENTS
  MAINTAINER    Packagist maintainer to grant access to
  ORGANISATION  Packagist organisation this person can manage

FLAGS
  --packagist=<value>  (required) packagist cookie
  --pauth=<value>      (required) pauth cookie

DESCRIPTION
  Grant access for a specific maintainer to all packages within an organisation. The command will warn you of what it
  will do before it does it.
```

_See code: [dist/commands/grant/index.ts](https://github.com/maxime-rainville/packagist-maintainer/blob/v0.0.0/dist/commands/grant/index.ts)_

## `packagist-maintainer help [COMMANDS]`

Display help for packagist-maintainer.

```
USAGE
  $ packagist-maintainer help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for packagist-maintainer.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.8/src/commands/help.ts)_

## `packagist-maintainer revoke MAINTAINER`

Revoke access for a specific maintainer to all packages the logged-in maintainer has access to. The command will warn you of what it will do before it does it.

```
USAGE
  $ packagist-maintainer revoke MAINTAINER --pauth <value> --packagist <value>

ARGUMENTS
  MAINTAINER  Packagist maintainer to fetch data for

FLAGS
  --packagist=<value>  (required) packagist cookie
  --pauth=<value>      (required) pauth cookie

DESCRIPTION
  Revoke access for a specific maintainer to all packages the logged-in maintainer has access to. The command will warn
  you of what it will do before it does it.
```

_See code: [dist/commands/revoke/index.ts](https://github.com/maxime-rainville/packagist-maintainer/blob/v0.0.0/dist/commands/revoke/index.ts)_
<!-- commandsstop -->
