import React from "react";
import {Link} from 'react-router-dom'

export const Navbar = () => ( 
  <nav className="p-2 navbar navbar-expand-lg navbar-light bg-light">
    <Link className="navbar-brand" to="/">Usuarios</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon" /></button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <Link className="nav-item nav-link active" to="/about">About <span className="sr-only">(current)</span></Link>
      </div>
    </div>
  </nav>
)