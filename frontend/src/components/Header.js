import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap'

import { logout } from '../actions/userActions';


const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout());
  }

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to='/'>Pro-Shop</Navbar.Brand>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />

          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <Nav.Link as={Link} to='/cart'>
                <i className='fas fa-shopping-cart'></i> Cart
              </Nav.Link>

              {
                userInfo
                  ? (
                    <NavDropdown title={userInfo.name} id='username'>
                      <Nav.Link style={{ color: 'black' }} as={Link} to='/profile'>
                        Profile
                      </Nav.Link>

                      <Nav.Link
                        style={{ color: 'black', cursor: 'pointer' }}
                        as={'span'}
                        onClick={logoutHandler}>
                        Logout
                      </Nav.Link>
                    </NavDropdown>
                  )
                  : (
                    <Nav.Link as={Link} to='/login'>
                      <i className='fas fa-user'></i> Sign In
                    </Nav.Link>
                  )
              }

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header