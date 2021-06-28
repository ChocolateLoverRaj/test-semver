import { getInput, startGroup, endGroup } from '@actions/core'
import execa from 'execa'
import { join } from 'path'
import { writeFile } from 'fs/promises'

const incrementsByScope =
  Object.entries<string>(JSON.parse(getInput('increments_by_scope', { required: true })))
const newPackages: string[] = JSON.parse(getInput('new_packages', { required: true }))

const getCwd = (packageName: string): string => join(__dirname, '../../packages', packageName)
const gitChangelog = '--git.changelog npx auto-changelog --stdout --commit-limit false -u --template https://raw.githubusercontent.com/release-it/release-it/master/templates/changelog-compact.hbs'
// eslint-disable-next-line no-template-curly-in-string
const npmrc = '//registry.npmjs.org/:_authToken=${NPM_TOKEN}'
const createNpmrc = async (dir: string): Promise<void> => await writeFile(join(dir, '.npmrc'), npmrc);

(async () => {
  if (incrementsByScope.length + newPackages.length > 0) {
    startGroup('Setup git author')
    const config: Record<string, string> = {
      'user.email': '41898282+github-actions[bot]@users.noreply.github.com',
      'user.name': 'github-actions[bot]'
    }
    for (const [key, value] of Object.entries(config)) {
      const command = execa('git', ['config', '--global', key, `"${value}"`])
      command.stdout?.pipe(process.stdout)
      await command
    }
    endGroup()
  }
  if (incrementsByScope.length > 0) {
    console.log('Incrementing existing packages')
    for (const [name, increment] of incrementsByScope) {
      if (increment === 'none') continue
      startGroup(`Incrementing ${name}: ${increment}`)
      const cwd = getCwd(name)
      await createNpmrc(cwd)
      const command = execa('npx', [
        'release-it',
        increment,
        '--ci',
        gitChangelog,
        `--git.tagName "${name}-v\\\${version}"`,
        `--git.commitMessage Chore: release ${name} v\\\${version}`,
        '--github.release true'
      ], { cwd })
      command.stdout?.pipe(process.stdout)
      await command
      endGroup()
    }
  } else console.log('No increments necessary')
  if (newPackages.length > 0) {
    console.log('Publishing new packages')
    for (const name of newPackages) {
      startGroup(`Publishing new packages: ${name}`)
      const cwd = getCwd(name)
      await createNpmrc(cwd)
      const command = execa('npx', [
        'release-it',
        '--ci',
        '--no-increment',
        `--git.tagName "${name}-v\\\${version}"`,
        '--github.release true',
        gitChangelog
      ], { cwd })
      command.stdout?.pipe(process.stdout)
      await command
      endGroup()
    }
  } else console.log('No new packages')
})().catch(e => {
  console.error(e)
  process.exit(1)
})
