import { useState } from 'react';
import Scene from '../Components/Scene'
import Auth from '../Components/Auth';
function Home() {
  const [str, setStr] = useState('');
  function usernameHandler(t)
{
  setStr(t);
}
  return (
    <>
<div className="app">
{<Auth username={usernameHandler}/>}
</div>
      <Scene username={str}/>
    </>
  );
}

export default Home;