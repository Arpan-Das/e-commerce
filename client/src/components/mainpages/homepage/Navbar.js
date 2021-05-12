import React, {Component} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserPlus, faSignInAlt, faSignOutAlt, faStore, faHandsHelping} from '@fortawesome/free-solid-svg-icons';
import Login from "../components/Login";

class NavigationBar extends Component {

    logout(){
        return this.props.history.push('/');
    }
    render() {
        const guestLinks = (
            <>
                <div className="mr-auto"></div>
                <Nav className="navbar-centre">
                <Link to={"login"} className="nav-link"><FontAwesomeIcon icon={faHandsHelping} /> Contact Us</Link>
                    <Link to={"login"} className="nav-link"><FontAwesomeIcon icon={faStore} /> Store</Link>
                    <Link to={"register"} className="nav-link"><FontAwesomeIcon icon={faUserPlus} /> Register</Link>
                    <Link to={"login"} className="nav-link"><FontAwesomeIcon icon={faSignInAlt} /> Login</Link>
                 
                </Nav>
            </>
        );
        const logger = ( 
            <>
              <Nav className="navbar-right">
                    <Link to={"logout"} className="nav-link" onClick={this.logout.bind(this)}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</Link>
                </Nav>
            </>
        );

        return (
            <Navbar bg="dark" variant="dark">
                <Link to={""} className="navbar-brand">
                <img src="https://i.pinimg.com/originals/d9/f9/ae/d9f9ae3b6ee6bd0ec100bd715af1a5ad.jpg" height="45px" width="45px" />
                    FOODIES
                    
                </Link>
                { Login.log ==='true' ? logger : guestLinks}
            </Navbar>
        );
    };
};



export default NavigationBar;