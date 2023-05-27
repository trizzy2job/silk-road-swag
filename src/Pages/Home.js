import {React, useEffect, useState} from 'react';
import Scene from '../Components/Scene'
import Auth from '../Components/Auth';

function Home() {
  const [username, setUsername] = useState("");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    if (loadingProgress === 100) {
      setLoadingComplete(true);
    }
  }, [loadingProgress]);

  function loadHandler(progress) {
    setLoadingProgress(progress);
  }
  function update(x){
    setUsername(x)
  }

  

  return (
    <>
      <Auth update ={update} progress = {loadingProgress} />
      <Scene username={username} loadHandler={loadHandler}/>

    </>
  );
}

export default Home;