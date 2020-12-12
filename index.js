const lib = () => 'noice'

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
lib.kind = () => kind[Math.floor(Math.random() * kind.length)]

lib.coin = () => Math.random() < 0.5
    ? 'heads'
    : 'tails'

export default lib
