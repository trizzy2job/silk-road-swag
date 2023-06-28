import {React, useEffect, useState} from 'react';
import Scene from '../Components/Scene'
import Auth from '../Components/Auth';
import { setQuaternionFromProperEuler } from 'three/src/math/MathUtils';

function Home() {
  const [username, setUsername] = useState("");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [allowed, setAllowed] = useState(false);
  const [doneLoad, setDoneLoad] = useState(false)
  useEffect(() => {
    if (loadingProgress === 100) {
      const timer = setTimeout(() => {
        console.log('Message after 5 seconds');
        setDoneLoad(true);
      }, 3000); // 5000 milliseconds = 5 seconds
      console.log("username:", username)
      return () => clearTimeout(timer);
    }
  }, [loadingProgress]);
  return (
    <>
       { (!doneLoad && username)?
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
                width: `${loadingProgress}%`,
                height: '100%',
                background: 'purple',
              }}
            ></div>
          </div>
          <div style={{ marginTop: '10px', color: 'purple' }}>
            Loading... {loadingProgress}%
          </div>
        </div>
        </div></div>
      :null}
      {username?
        <Scene username={username} loadHandler={setLoadingProgress}/>
        :<Auth update ={setUsername} setAllowed={setAllowed}/>}

    </>
  );
}

export default Home;