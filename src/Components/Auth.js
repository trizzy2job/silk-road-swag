import React, { useState } from 'react';
import {useRef,useEffect} from 'react';

import '../CSS/menu.css'
import { Link } from 'react-router-dom';
import Web3 from "web3";
import axios from './Axios';

const USER_REGEX = /^[A-z][A-z0-9-_]{1,32}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function AuthOverlay(props) {
  const [doneLoad, setDoneLoad] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLoginButton, setShowLoginButton] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [address, setAddress] = useState("");
  const [connected,setConnected] = useState("Connect Metamask");
  const userRef = useRef();
  const errRef = useRef();
  const [userAddress, setUserAddress] = useState(null)
  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [wallet, setWallet] = useState('');
  const [username, setUsername] = useState('');
  const [link, setLink] = useState('Connect');
  const handleLoginSecond= async (e) => {
    e.preventDefault();
    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
    console.log(accounts)
    setUserAddress(accounts[0])
    window.accounts = accounts
    setWallet(accounts[0]);
    setLink("Log In");
    connectionProxy();
}
const connectionProxy = async () => {connection()}
const connection = async () => {
  const response = await axios.post("http://localhost:3500/auth",
               JSON.stringify({wallet}),
              JSON.stringify({
                  headers: { 'Content-Type': 'text/plain'},
                  withCredentials: true
              })
              );
      console.log(response);
    await setUsername(response.data.name);
              props.update(username);
    setLink("Connected");
}
const handleLogout = () => {
setUser(false);
}


  async function getAccount(){
    if(!window.ethereum){setConnected("Please install Metamask"); console.log("Window.ethereum error")}
    else {
    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
    window.accounts = accounts;
    setWallet(window.accounts);
    window.web3 = new Web3(window.ethereum)
          const addy = accounts[0][0] + accounts[0][1] + accounts[0][2]+ + accounts[0][3]+accounts[0][4]+accounts[0][5]+"..."+accounts[0][38]+accounts[0][39]+accounts[0][40]+accounts[0][41];
        setAddress(addy);
  
  setConnected("Connected  to " + addy);}
  }
  useEffect(() => {
}, [])
useEffect(() => {
    setValidName(USER_REGEX.test(user));
}, [user])
useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
}, [email])
useEffect(() => {
  if (props.progress === 100) {
    const timer = setTimeout(() => {
      console.log('Message after 5 seconds');
      setDoneLoad(true);
    }, 3000); // 5000 milliseconds = 5 seconds

    return () => clearTimeout(timer);
  }
}, [props.progress]);
useEffect(() => {
    setErrMsg('');
}, [user, email])
  const handleContinueAsGuest = () => {
    handleBack();
  };
  const handleSubmit = async () => {
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = EMAIL_REGEX.test(email);
    const v3 = wallet == "undefined";
    if (!v1) {
        setErrMsg("Username must begin with a letter. Letters, numbers, underscores, and hyphens are allowed.");
        return;
    }
if (!v2) {
        setErrMsg("Invalid Email");
        return;
    }
    if (v3) {
      setErrMsg("Must connect to Metamask");
      setConnected("Please install Metamask");
      return;
  }
    const reg = user + "," + email + "," + wallet;
    const rex = JSON.stringify(reg);
    try {
        const response = await axios.post('http://localhost:3500/register',
            JSON.stringify(reg),
            JSON.stringify({
              headers: { 'Content-Type': 'application/json'},
                withCredentials: true
            })
          );
        console.log(response?.data); //remove
        console.log(response?.accessToken);
        console.log(JSON.stringify(response)) //remove
        setSuccess(true);
        setUser('');
        setEmail('');
    } catch (err) {
        if (!err?.response) {
            setErrMsg('Server not responding. Please try again.');
        } else if (err.response?.status === 409) {
            setErrMsg('Username Taken');
  }
    else if (err.response?.status === 410) {
            setErrMsg('Email already in use');
        }
    else if (err.response?.status === 411) {
            setErrMsg('Wallet already in use');
        }
    
         else {
            setErrMsg('Error Z')
    console.log(err)
        }
    }
}
  const handleLogin = () => {
    setShowLoginForm(true);
  };
  const handleLoginTop = () => {
    setShowOverlay(true);
  };
  const handleRegister = () => {
    setShowRegisterForm(true);

  };

  const handleBack = () => {
    setShowLoginForm(false);
    setShowRegisterForm(false);
  };
  const handleContinueAsGuestClick = () => {
    setShowOverlay(false);
    setShowLoginButton(true);
  };
  return (
    <>
     <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">ℹ️</Link>
        </li>
        <li>
          <Link to="/vote">Vote</Link>
        </li>
        {showLoginButton && (
          <li onClick={handleLoginTop}>
            <a>Login</a>
          </li>
        )}
      </ul>
    </nav>
    {showOverlay && !doneLoad && (
      <div className="overlay">
      <div className="modal">
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '33%',
            padding: '10px',
            textAlign: 'center',
            zIndex: '9999', // Higher z-index value to appear in front
          }}
        >
          <div
            style={{
              width: '100%',
              height: '20px',
              background: 'white',
              borderRadius: '5px',
              overflow: 'hidden',
              animation: 'glow 2s ease-in-out infinite',
            }}
          >
            <div
              style={{
                width: `${props.progress}%`,
                height: '100%',
                background: 'purple',
              }}
            ></div>
          </div>
          <div style={{ marginTop: '10px', color: 'purple' }}>
            Loading... {props.progress}%
          </div>
        </div>
        </div></div>
      )}
    




    {showOverlay && doneLoad &&(
    <div className="overlay" width = '50%'>
      <div className="modal">
        {!showLoginForm && !showRegisterForm && (
          <>
            <h2 className="modal__title">Silk Road Swag </h2>
            <div className="modal__buttons">
              <button className="modal__button" onClick={handleContinueAsGuestClick}>
                Guest Entrance
              </button>
              <button className="modal__button" onClick={handleLogin}>
                Log In
              </button>
              <button className="modal__button" onClick={handleRegister}>
                Register
              </button>
            </div>
          </>
        )}

        {showLoginForm && (
          <>
  <h2 className="auth-form__title">Login</h2>
  <div className="auth-form__group">
    <button id ="forms" class="button" type="submit" className="auth-form__button" onClick={handleLoginSecond}>Connect</button>
  </div>
            <button className="modal__button" onClick={handleBack}>
              Back
            </button>
          </>
        )}

        {showRegisterForm && (
          <>
           {success ? (<div><p id = "successReg">Registration Successful</p><p id = "successReg">Welcome to the SRS community!</p></div>):(<>
  <h2 className="auth-form__title">Register</h2>
  <div className="auth-form__group">
    <input id= "input" placeholder="Username" onChange={(e) => setUser(e.target.value)}/>
  </div>
  <div className="auth-form__group">
    <input id= "input" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
  </div>

  <div className="auth-form__group">
    <button id ="forms" class="button" onClick = {() => getAccount() }>{connected}</button>
  </div>
  <div>
    <button type="submit" id ="forms" className="auth-form__button" onClick={handleSubmit}> Register</button>
          </div>
          <p id = "error" ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <button className="modal__button" onClick={handleBack}>
              Back
            </button>
            </>)}
          </>
        )}
      </div>
    </div>
    )}
    </>
  );
  
}

export default AuthOverlay;