import React, { Component } from 'react'
import {Link, NavLink} from 'react-router-dom'
import {
    Button,
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

import {onLogoutUser} from '../actions/index'

import {connect} from 'react-redux'

class Header extends Component {

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

    render() {
      // jika belum ada yg login
      if(!this.props.user_name){
        return (
          
          <div>
            <Navbar color="danger" light expand="md">
              <Link className="navbar-brand" to="/"><img width="150" src="https://181ge72mb8rnbx7z1k119thi-wpengine.netdna-ssl.com/wp-content/uploads/2018/03/vans-logo-2.png" alt=""/></Link>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink className="nav-link" to="/">All Product</NavLink>
                  </NavItem>
                  <NavItem>
                      <NavLink to='/register'>
                          <Button className='mx-3' color="primary">Register</Button>
                      </NavLink>
                  </NavItem>
                  <NavItem>
                      <NavLink to='/login'>
                          <Button color="success">Login</Button>
                      </NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
        
      
        );
      } else {
        // Jika sudah ada yang login
        return (
          <div>
            <Navbar color="danger" light expand="md">
              <Link className="navbar-brand" to="/"><img width="150" src="https://181ge72mb8rnbx7z1k119thi-wpengine.netdna-ssl.com/wp-content/uploads/2018/03/vans-logo-2.png" alt=""/></Link>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink className="nav-link" to="/">All Product</NavLink>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Hello {this.props.user_name}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                    <NavLink className="nav-link" to="/manageproducts">Manage Products</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      Option 2
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={this.props.onLogoutUser}>
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
        );
      }
        
    }
}

// function untuk mengambil data di redux state
const mapStateToProps = state => {
  return {
    user_name: state.auth.username
  }
}

export default connect(mapStateToProps, {onLogoutUser})(Header)