import {React, useEffect, useState} from 'react';
import Scene from '../Components/Scene'
import Auth from '../Components/Auth';

function Home() {
  const [username, setUsername] = useState("");
  const [loadingProgress, setLoadingProgress] = useState(0);

  return (
    <>
      <Auth update ={setUsername} progress = {loadingProgress} />
      <Scene username={username} loadHandler={setLoadingProgress}/>

    </>
  );
}

export default Home;