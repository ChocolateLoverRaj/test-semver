import { getInput, setOutput } from '@actions/core'
import { validate } from 'jsonschema'
import capitalize from 'capitalize'

const increments = ['none', 'patch', 'minor', 'major'] as const
type Increment = typeof increments[number]

const packageMapFn = (name: string): string => `Package: ${name}`
const incrementMapFn = (increment: Increment): string => `Semver Increment: ${capitalize(increment)}`

const newPackageLabel = 'New Package';

(async () => {
  const packages: string[] = JSON.parse(getInput('packages', { required: true }))
  const arrStrSchema = {
    type: 'array',
    items: { type: 'string' }
  }
  validate(packages, arrStrSchema, { throwAll: true })
  const incrementsByScopes: Record<string, Increment> = JSON.parse(getInput('increments', { required: true }))
  validate(incrementsByScopes, {
    type: 'object',
    additionalProperties: { enum: increments },
    propertyNames: { enum: packages }
  }, { throwAll: true })
  const newPackages: string[] = JSON.parse(getInput('new_packages', { required: true }))
  validate(newPackages, arrStrSchema, { throwAll: true })

  setOutput('manage', JSON.stringify([
    ...increments.map(incrementMapFn),
    ...packages.map(packageMapFn),
    newPackageLabel
  ]))
  const setLabels = [
    ...Object.keys(incrementsByScopes).map(packageMapFn),
    ...Object.values(incrementsByScopes).map(incrementMapFn)
  ]
  if (Object.keys(incrementsByScopes).length === 0) {
    setLabels.push(incrementMapFn('none'))
  }
  if (newPackages.length > 0) setLabels.push(newPackageLabel)
  setOutput('set', JSON.stringify(setLabels))
})().catch(e => {
  console.error(e.message)
  process.exit(1)
})
