import jwt from 'jsonwebtoken';

// takes in user id
const generateToken = (id) => {
  // jwt({payload is ID},secret,{options:when it expires})
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '90d'
  })
}

export default generateToken