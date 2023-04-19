import React from "react";
import { NavLink, Link } from "react-router-dom";
import './css/header.css'
import { useAuth } from '../../context/auth'
import Toast from './../../toast/Toast';

const Header = () => {

     const [auth, setAuth] = useAuth()

     const handleLogout = () => {
          localStorage.removeItem("auth")
          setAuth({
               ...auth,
               user: null,
               token: ""
          })
          Toast.successMsg("Logout successfully.")
     }

     return (
          <nav className="header navbar container-fluid navbar-expand-lg">
               <Link to="/"
                    className="navbar-brand fw-bold text-secondary ms-3">
                    👜 Ecommerce
               </Link>
               <button className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
               </button>
               <div className="collapse navbar-collapse"
                    id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto">
                         <li className="nav-item">
                              <NavLink to="/"
                                   className="nav-link">
                                   Home
                              </NavLink>
                         </li>
                         <li className="nav-item">
                              <NavLink to="/category"
                                   className="nav-link">
                                   Category
                              </NavLink>
                         </li>
                         {
                              !auth.user || !auth.token ?
                                   (<>
                                        <li className="nav-item">
                                             <NavLink to="/register"
                                                  className="nav-link">
                                                  Register
                                             </NavLink>
                                        </li>
                                        <li className="nav-item">
                                             <NavLink to="/login"
                                                  className="nav-link">
                                                  Login
                                             </NavLink>
                                        </li>
                                   </>)
                                   :
                                   (<>
                                        <li className="nav-item dropdown">
                                             <NavLink className="nav-link dropdown-toggle"
                                                  id="navbarDropdownMenuLink"
                                                  to={`/dashboard/${auth.user.role === 1 ? "admin" : "user"}`}
                                                  role="button"
                                                  data-bs-toggle="dropdown"
                                                  aria-expanded="false" >
                                                  {auth.user?.name}
                                             </NavLink>
                                             <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" >
                                                  <li className="nav-item">
                                                       <NavLink to={`/dashboard/${auth.user.role === 1 ? "admin" : "user"}`}
                                                            className="dropdown-item">
                                                            Dashboard
                                                       </NavLink>
                                                  </li>
                                                  <li className="nav-item">
                                                       <NavLink to="/login" onClick={handleLogout}
                                                            className="dropdown-item">
                                                            Logout
                                                       </NavLink>
                                                  </li>
                                             </ul>
                                        </li>
                                   </>)
                         }
                         <li className="nav-item">
                              <NavLink to="/cart"
                                   className="nav-link">
                                   🛒 (0)
                              </NavLink>
                         </li>
                    </ul>
               </div>
          </nav>
     );
};

export default Header;
