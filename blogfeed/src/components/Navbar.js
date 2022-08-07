import React, { useContext } from 'react';
import $ from 'jquery';
import { userContext } from '../App';
import { NavLink, Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import M from 'materialize-css';
import 'font-awesome/css/font-awesome.min.css'
const Navbar = () => {

  const { state, dispatch } = useContext(userContext)
  const history = useHistory()
  const renderList = () => {
    if (!state) {
      return [
        <li><Link to="/signin"><i class="fa fa-sign-out"></i>&nbsp; Sign In</Link></li>,
        <li><Link to="/signup"><i class="fa fa-sign-out" aria-hidden="true"></i>&nbsp; Sign Up</Link></li>
      ]
    }
    else {
      return [
        <li><Link to="/"><i className="fa fa-rss" aria-hidden="true"></i>&nbsp; Feed</Link></li>,
        <li><Link to="/addpost"><i className="fa fa-plus" aria-hidden="true"></i>&nbsp; Create Post</Link></li>,
        <li><Link to="/profile"><i className="fa fa-user" aria-hidden="true"></i>&nbsp; My Feed</Link></li>,
        <li><Link to="#" onClick={() => {
          localStorage.clear();
          dispatch({ type: "CLEAR" })
          history.push('/signin')
        }} ><i className="fa fa-sign-out" aria-hidden="true"></i>&nbsp;Log Out</Link></li>
      ]
    }
  }

  return (
    <header className="header">
      <span className="logo"><img style={{ width: "45px", height: "45px", borderRadius: "50%" }}
        src={require("../assets/logo1.png")} /></span>
      <input className="menu-btn" type="checkbox" id="menu-btn" />
      <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
      <ul className="menu">
        {renderList()}
      </ul>
    </header>
  )

}
export default Navbar
