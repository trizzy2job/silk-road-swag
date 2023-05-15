import {React, useState} from 'react';
import Scene from '../Components/Scene'
import Auth from '../Components/Auth';

function Home() {
  const [username, setUsername] = useState("");
  function update(x){
    setUsername(x)
  }

  return (
    <>
      <Auth update ={update} />
      <Scene username={username}/>

    </>
  );
}

export default Home;