/**
 * @module @programmerraj/test-semver
 */

/**
 * Returns `'noice'`.
 * @returns {string}
 */
const lib = () => 'noice'

/**
 * Returns `3`.
 */
lib.good = () => 3

const kind = [
    'Thank You',
    'You are amazing',
    'Good',
    'Nice',
    'You\'re Welcome',
    'Hello',
    'Hi',
    'Good morning',
    'Thanks',
    'Great',
    'Wonderful',
    'Good afternoon',
    'Good evening',
    'Good night',
    'You\'re nice',
    'Good job',
    'You are awesome',
    'You are good',
    'You are'
]
/**
 * Returns a random kind message.
 */
lib.kind = () => kind[Math.floor(Math.random() * kind.length)]

/**
 * Randomly returns either `'head'` or `'tail'`, like a coin flip.
 */
lib.coin = () => Math.random() < 0.5
    ? 'head'
    : 'tail'

export default lib
