# Package maintainer script

This is a simple utility to help update packagist maintainers. Packagist doesn't provide an API to do some privileged tasks (e.g. Adding/removing maintainers). To get around that, the commands require you to provide a some cookie values.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)


<!-- toc -->
* [Package maintainer script](#package-maintainer-script)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g packagist-maintainer
$ packagist-maintainer COMMAND
running command...
$ packagist-maintainer (--version)
packagist-maintainer/0.0.0 linux-x64 node-v18.15.0
$ packagist-maintainer --help [COMMAND]
USAGE
  $ packagist-maintainer COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`packagist-maintainer grant MAINTAINER ORGANISATION`](#packagist-maintainer-grant-maintainer-organisation)
* [`packagist-maintainer help [COMMANDS]`](#packagist-maintainer-help-commands)
* [`packagist-maintainer plugins`](#packagist-maintainer-plugins)
* [`packagist-maintainer plugins:install PLUGIN...`](#packagist-maintainer-pluginsinstall-plugin)
* [`packagist-maintainer plugins:inspect PLUGIN...`](#packagist-maintainer-pluginsinspect-plugin)
* [`packagist-maintainer plugins:install PLUGIN...`](#packagist-maintainer-pluginsinstall-plugin-1)
* [`packagist-maintainer plugins:link PLUGIN`](#packagist-maintainer-pluginslink-plugin)
* [`packagist-maintainer plugins:uninstall PLUGIN...`](#packagist-maintainer-pluginsuninstall-plugin)
* [`packagist-maintainer plugins:uninstall PLUGIN...`](#packagist-maintainer-pluginsuninstall-plugin-1)
* [`packagist-maintainer plugins:uninstall PLUGIN...`](#packagist-maintainer-pluginsuninstall-plugin-2)
* [`packagist-maintainer plugins update`](#packagist-maintainer-plugins-update)
* [`packagist-maintainer revoke MAINTAINER`](#packagist-maintainer-revoke-maintainer)

## `packagist-maintainer grant MAINTAINER ORGANISATION`

Grant access for a specific maintainer to all packages within an organisation

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
  Grant access for a specific maintainer to all packages within an organisation
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

## `packagist-maintainer plugins`

List installed plugins.

```
USAGE
  $ packagist-maintainer plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ packagist-maintainer plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.3/src/commands/plugins/index.ts)_

## `packagist-maintainer plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ packagist-maintainer plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ packagist-maintainer plugins add

EXAMPLES
  $ packagist-maintainer plugins:install myplugin 

  $ packagist-maintainer plugins:install https://github.com/someuser/someplugin

  $ packagist-maintainer plugins:install someuser/someplugin
```

## `packagist-maintainer plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ packagist-maintainer plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ packagist-maintainer plugins:inspect myplugin
```

## `packagist-maintainer plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ packagist-maintainer plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ packagist-maintainer plugins add

EXAMPLES
  $ packagist-maintainer plugins:install myplugin 

  $ packagist-maintainer plugins:install https://github.com/someuser/someplugin

  $ packagist-maintainer plugins:install someuser/someplugin
```

## `packagist-maintainer plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ packagist-maintainer plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ packagist-maintainer plugins:link myplugin
```

## `packagist-maintainer plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ packagist-maintainer plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ packagist-maintainer plugins unlink
  $ packagist-maintainer plugins remove
```

## `packagist-maintainer plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ packagist-maintainer plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ packagist-maintainer plugins unlink
  $ packagist-maintainer plugins remove
```

## `packagist-maintainer plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ packagist-maintainer plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ packagist-maintainer plugins unlink
  $ packagist-maintainer plugins remove
```

## `packagist-maintainer plugins update`

Update installed plugins.

```
USAGE
  $ packagist-maintainer plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

## `packagist-maintainer revoke MAINTAINER`

Revoke access for a specific maintainer

```
USAGE
  $ packagist-maintainer revoke MAINTAINER --pauth <value> --packagist <value>

ARGUMENTS
  MAINTAINER  Packagist maintainer to fetch data for

FLAGS
  --packagist=<value>  (required) packagist cookie
  --pauth=<value>      (required) pauth cookie

DESCRIPTION
  Revoke access for a specific maintainer
```

_See code: [dist/commands/revoke/index.ts](https://github.com/maxime-rainville/packagist-maintainer/blob/v0.0.0/dist/commands/revoke/index.ts)_
<!-- commandsstop -->
