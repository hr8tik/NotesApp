import React,{useEffect} from 'react'
import {Link} from "react-router-dom";
import { useLocation,useNavigate } from 'react-router-dom';

function Navbar() {
  let location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Google Analytics
    console.log(location.pathname);
    
  }, [location]);
  const handleLogout =()=>{
    localStorage.removeItem('token')
    navigate('/login')

  }
  const navbarstyle = {
        backgroundColor:'red'
  }
  return (
    <nav style = {navbarstyle} className="navbar navbarDiv navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid ">
    <Link className="navbar-brand" to="/">Your Notes</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"?"active":""} `} aria-current="page" to="/">Home</Link >
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/About"?"active":""} `} to="/about">About</Link>
        </li>
       
        
      </ul>
      {!localStorage.getItem('token')?<form className="d-flex" role="search">
      <Link className="btn btn-primary mx-2" to="/login" href="#" role="button">Login</Link>
      <Link className="btn btn-primary mx-2" to="/signup" href="#" role="button">SignUp</Link>
      </form>:<button onClick={handleLogout} className='btn btn-primary'>Log Out</button>}
    </div>
  </div>
</nav>
  )
}

export default Navbar