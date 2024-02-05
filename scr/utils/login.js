import faker from 'faker'
import jwt from 'jsonwebtoken'

const generateToken = () => jwt.sign({ email: faker.internet.email() }, 'grd', { expiresIn: '1h' })
export default generateToken
