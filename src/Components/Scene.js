import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import sright from '../assets/skybox_right.png';
import sleft from '../assets/skybox_left.png';
import stop from '../assets/skybox_up.png';
import sbot from '../assets/skybox_down.png';
import sfront from '../assets/skybox_front.png';
import sback from '../assets/skybox_back.png';
import { Box, SkyBox } from './Misc';
import Players from './MultiPlayer';
import './scene.css'
function Scene(props) {
  const cameraRef = useRef();
  const controlsRef = useRef();
  const canvasRef = useRef();
  const [chats, setChats] = useState(new Array(20).fill(""));
  const [chat, setChat] = useState('');
  const urls = [
    sfront,
    sback,
    stop,
    sbot,
    sright,
    sleft
  ];

  const addChat = (newChat) => {
    setChats((prevChats) => {
      const updatedChats = [...prevChats];
      updatedChats.shift();
      updatedChats.push(newChat);
      return updatedChats;
    });
  };

  return (
    <>
       
        <Canvas shadowMap shadows ref={canvasRef} style={{ width: '100%', height: window.innerHeight - 50 }}>
          <SkyBox urls={urls} />
          <Box position={[-20, 0, 0]} width={10} height={10} depth={10} color={'red'} rotation={0} />
          <Box position={[20, 0, 0]} width={10} height={10} depth={10} color={'purple'} rotation={0} onClick={()=>{window.location.href = "../Design"}}/>
          <Box position={[0, 0, 20]} width={10} height={10} depth={10} color={'green'} rotation={0} />
          <Box position={[0, 0, -20]} width={10} height={10} depth={10} color={'yellow'} rotation={0} />
          <directionalLight
            color="white"
            intensity={1.5}
            position={[15, 7, 40]} // position the light above the scene
            shadow-mapSize-width={512} // set the shadow map size
            shadow-mapSize-height={512}
          />
          <ambientLight intensity={0.2} color="white" />
          <OrbitControls ref={controlsRef} args={[cameraRef.current]}/>
     
            <Players username={props.username} controlsRef={controlsRef} loadHandler={props.loadHandler} />
         
        </Canvas>
        <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: "20%",
          height: '100%',
          background: 'rgba(0, 0, 0, 0.5)',
          color: '#fff',
        }}
      >
        <h1>Chat</h1>
        <div id="chats">
        {chats.map((chat, index) => (
          <p key={index}>{chat}</p>
        ))}
        </div>
        <div id="chatInput">
          <input value = {chat} onChange={e=>{setChat(e.target.value)}}></input>
          <button onClick={e=>{addChat(chat); setChat("")}}>Send</button>
        </div>
        {/* Content of the column div */}
      </div>
    </>
  );
}

export default Scene;
