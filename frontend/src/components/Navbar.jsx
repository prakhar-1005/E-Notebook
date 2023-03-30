import React from 'react'
import {Link,useLocation, useNavigate } from "react-router-dom"

//Instead of useLocation, <NavLink/> can also be used in place of <Link/>

const Navbar = () => {

  let navigate = useNavigate();

  const handleLogout=()=>{
    localStorage.removeItem('token')
    navigate("/login");
  }

  let location = useLocation();

  return (

    <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">E-Notebook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location==="/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location==="/about" ? "active" : ""}`} to="/About">About</Link>
            </li>

          </ul>
            {!localStorage.getItem('token') ? <form className="d-flex" role="search">
              <Link className="btn btn-primary mx-2" to="/Login" role="button">Login</Link>
              <Link className="btn btn-primary mx-2" to="/Signup" role="button">Signup</Link>
            </form>:<button className="btn btn-danger mx-2" onClick={handleLogout}>Logout</button>}
        </div>
      </div>
    </nav>
    
  )
}

export default Navbar
