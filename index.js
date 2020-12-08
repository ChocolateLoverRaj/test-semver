const lib = () => 'noice'

lib.good = () => 3

const kind = [
    'Thank You',
    'You are amazing'
]
lib.kind = () => kind[Math.floor(Math.random() * kind.length)]

export default lib
