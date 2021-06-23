import { getInput, startGroup, endGroup } from '@actions/core'
import execa from 'execa'
import { join } from 'path'

const increments = ['none', 'patch', 'minor', 'major'] as const
type Increment = typeof increments[number]

const incrementsByScope: Record<string, Increment> =
  JSON.parse(getInput('increments_by_scope', { required: true }))
const newPackages: string[] = JSON.parse(getInput('new_packages', { required: true }))

const getCwd = (packageName: string): string => join(__dirname, '../../packages', packageName)
const gitChangelog = '--git.changelog npx auto-changelog --stdout --commit-limit false -u --template https://raw.githubusercontent.com/release-it/release-it/master/templates/changelog-compact.hbs';

(async () => {
  console.log('Incrementing existing packages')
  for (const [name, increment] of Object.entries(incrementsByScope)) {
    if (increment === 'none') continue
    startGroup(`Incrementing ${name}: ${increment}`)
    const command = execa('npx', [
      'release-it',
      increment,
      '--ci',
      gitChangelog,
      `--git.tagName ${name}-v\${version}`,
      `--git.commitMessage Chore: release ${name} v\${version}`,
      '--github.release true'
    ], { cwd: getCwd(name) })
    command.stdout?.pipe(process.stdout)
    await command
    endGroup()
  }
  console.log('Publishing new packages')
  for (const name of newPackages) {
    startGroup(`Publishing new packages: ${name}`)
    const command = execa('npx', [
      'release-it',
      '--ci',
      '--no-increment',
      `--git.tagName ${name}-v\${version}`,
      '--github.release true',
      gitChangelog
    ], { cwd: getCwd(name) })
    command.stdout?.pipe(process.stdout)
    await command
    endGroup()
  }
})().catch(e => {
  console.error(e)
  process.exit(1)
})
