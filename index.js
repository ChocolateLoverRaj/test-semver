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
    'Good job'
]
lib.kind = () => kind[Math.floor(Math.random() * kind.length)]

export default lib
