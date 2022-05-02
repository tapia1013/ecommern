import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Cookie',
    email: 'cookie@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true
  },
  {
    name: 'Vee',
    email: 'vee@example.com',
    password: bcrypt.hashSync('123456', 10),
  }, {
    name: 'Jay',
    email: 'jay@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users