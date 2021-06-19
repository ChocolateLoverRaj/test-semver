import { getInput, setOutput } from '@actions/core'
import { create } from '@actions/glob'
import never from 'never'
import { readFile } from 'jsonfile'
import lastElement from 'last-element'
import diff from 'arr-diff'
import globGithub from './globGithub'
import { Octokit } from '@octokit/rest'

const packagesGlob = getInput('packages_glob', { required: true })
const eventFilePath = process.env.GITHUB_EVENT_PATH ?? never('No GITHUB_EVENT_PATH')

const eventPromise = readFile(eventFilePath);

(async () => {
  const [currentPackages, previousPackages] = (await Promise.all([
    create(packagesGlob, { implicitDescendants: false }).then<string[]>(async globber => await globber.glob()),
    eventPromise
      .then(async event => await globGithub(
        packagesGlob,
        new Octokit({ auth: process.env.GITHUB_TOKEN }),
        event.repository.owner.login,
        event.repository.name,
        event.before
      ))
  ])).map(paths => paths.map(path => lastElement(path.split('/'))))
  const newPackages = diff(previousPackages, currentPackages)
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  console.log(`New packages: ${previousPackages.join(', ') || '*none'}`)
  setOutput('new_packages', JSON.stringify(newPackages))
})().catch(e => {
  console.error(e)
  process.exit(1)
})
