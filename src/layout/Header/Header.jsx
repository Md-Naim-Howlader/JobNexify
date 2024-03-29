import { useContext, useEffect, useRef, useState } from "react";
import "./header.css";
import { FaBars } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

import { FaUserCircle } from "react-icons/fa";
import { VscChromeClose } from "react-icons/vsc";
import { TbLogin } from "react-icons/tb";
import logoImg from "../../assets/image/logo.png";
import { NavLink, useNavigate } from "react-router-dom";

// authtication user

import auth from "../../firebase/firebase.config";
import { useSignOut } from "react-firebase-hooks/auth";
import { onAuthStateChanged } from "firebase/auth";
import Swal from "sweetalert2";
import { JobContext } from "../../Context/JobContext";
// authentication user
const Header = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [toggle, setToggle] = useState(false);

  const toggleRef = useRef();
  const navigate = useNavigate();

  // start get authentication user

  const [signOut] = useSignOut(auth);
  // End get authentication user
  const handleToggle = () => {
    setToggle(!toggle);

    // toggling
    toggle
      ? toggleRef.current.classList.remove("show")
      : toggleRef.current.classList.add("show");
  };
  const { favJobs } = useContext(JobContext);

  // signout
  const handleSignOut = () => {
    signOut();
    Swal.fire({
      position: "top center",
      icon: "success",
      title: "Sign Out Succesfully!",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/");
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo(user);
      } else {
        setUserInfo(null);
      }
    });
  });

  return (
    <header className="header">
      <div className="container">
        <div className="header__items">
          <div className="logo">
            <NavLink>
              <img src={logoImg} alt="logo" />
            </NavLink>
            <div className="navToggle">
              <button onClick={handleToggle}>
                {toggle ? <VscChromeClose /> : <FaBars />}
              </button>
            </div>
          </div>

          <nav className="navBar" ref={toggleRef}>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>

              <li>
                <NavLink to={userInfo ? "/jobs" : "/login"}>Jobs</NavLink>
              </li>

              <li>
                <NavLink to={userInfo ? "/postJob" : "/login"}>
                  Post a Job
                </NavLink>
              </li>

              <li>
                <NavLink to="/about">About</NavLink>
              </li>

              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>

              <li>
                {userInfo ? (
                  ""
                ) : (
                  <button onClick={() => navigate("/signUp")}>Sign Up</button>
                )}
              </li>
              <li>
                {userInfo ? (
                  <button
                    style={{ background: "black" }}
                    onClick={handleSignOut}
                  >
                    <BiLogOut /> Sign Out
                  </button>
                ) : (
                  <button onClick={() => navigate("/login")}>
                    <TbLogin /> Log In
                  </button>
                )}
              </li>
              <li className="fav ">
                <button onClick={() => navigate("/favorite")}>Favorite</button>
                <span>{favJobs.length > 0 ? favJobs.length : ""}</span>
              </li>
              <li>
                <button onClick={() => navigate("/login")} className="userBtn">
                  {userInfo?.photoURL ? (
                    <img className="userImg" src={userInfo?.photoURL} />
                  ) : (
                    <FaUserCircle />
                  )}
                  {userInfo?.displayName && (
                    <span
                      style={{
                        position: "relative",
                        top: "-12px",
                        left: "10px",
                      }}
                    >
                      {userInfo?.displayName}
                    </span>
                  )}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
