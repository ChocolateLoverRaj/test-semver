import { getInput, setOutput } from '@actions/core'
import { validate } from 'jsonschema'
import capitalize from 'capitalize'

const packages = ['test-semver', 'another-package'] as const
const increments = ['none', 'patch', 'minor', 'major'] as const

const packageMapFn = (name: string): string => `Package: ${name}`
const incrementMapFn = (increment: string): string => `Semver Increment: ${capitalize(increment)}`

const incrementsByScopes = JSON.parse(getInput('increments', { required: true }))
validate(incrementsByScopes, {
  type: 'object',
  additionalProperties: { enum: increments },
  propertyNames: { enum: packages }
}, { throwAll: true })

setOutput('manage', JSON.stringify([
  ...increments.map(incrementMapFn),
  ...packages.map(packageMapFn)
]))
const setLabels = [
  ...Object.keys(incrementsByScopes).map(packageMapFn),
  ...Object.values(incrementsByScopes).map(incrementMapFn)
]
if (Object.keys(incrementsByScopes).length === 0) {
  setLabels.push(incrementMapFn('none'))
}
setOutput('set', JSON.stringify(setLabels))
