/**
 * @module @programmerraj/test-semver
 */

import randomItem from 'random-item'

/**
 * Returns `'noice'`.
 * @returns {string}
 */
export const lib = () => 'noice'

/**
 * Returns `3`.
 * @returns {number}
 */
export const good = () => 3

const kindMessages = [
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
export const kind = () => randomItem(kindMessages)

/**
 * Randomly returns either `'head'` or `'tail'`, like a coin flip.
 */
export const coin = () => Math.random() < 0.5
    ? 'head'
    : 'tail'
