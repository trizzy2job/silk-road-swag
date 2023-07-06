import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import sright from '../assets/skybox_right.png';
import sleft from '../assets/skybox_left.png';
import stop from '../assets/skybox_up.png';
import sbot from '../assets/skybox_down.png';
import sfront from '../assets/skybox_front.png';
import sback from '../assets/skybox_back.png';
import { Box, SkyBox, Camel, PalmTree } from './Misc';
import Players from './MultiPlayer';
import chatIcon from '../assets/chat.png'
import bed from '../assets/home.png'
import settings from '../assets/settings.png'
import './scene.css';

function Scene(props) {
  const cameraRef = useRef();
  const controlsRef = useRef();
  const canvasRef = useRef();
  const [chats, setChats] = useState(new Array(20).fill(""));
  const [chat, setChat] = useState('');
  const [socket, setSocket] = useState(null);
  const [showChat, setShowChat] = useState(true);
  const urls = [sfront, sback, stop, sbot, sright, sleft];
  const [roomName, setRoomName] = useState("")
  const [command, setCommand] = useState("")
  const addChat = (newChat) => {
    if (socket) {
      socket.emit('addChat', newChat);
    }
    setChats((prevChats) => {
      const updatedChats = [...prevChats];
      updatedChats.shift();
      updatedChats.push('You: ' + newChat);
      return updatedChats;
    });
  };

  
    
  

  const scene = useMemo(() => (
    <Canvas shadowMap shadows ref={canvasRef} style={{ width: '100%', height: '100%' }}>
      <SkyBox urls={urls} />
      <Camel position={[5, 2, 5]} size={1} color={'purple'} rotation={0}  />
      <PalmTree position={[-5, 0, 5]} size={1} color={'purple'} rotation={0}  />

      <Box position={[20, 0, 0]} width={10} height={10} depth={10} color={'purple'} rotation={0} onClick={() => {setRoomName("Design Studio")} } />
      <Box position={[0, 0, 20]} width={10} height={10} depth={10} color={'green'} rotation={0} onClick={() => {setRoomName("Voting Commune")} }/>
      <Box position={[0, 0, -20]} width={10} height={10} depth={10} color={'yellow'} rotation={0} onClick={() => {setRoomName("Shop")}} />
      <directionalLight
        color="white"
        intensity={1.5}
        position={[15, 7, 40]} // position the light above the scene
        shadow-mapSize-width={512} // set the shadow map size
        shadow-mapSize-height={512}
      />
      <ambientLight intensity={0.2} color="white" />
      <OrbitControls ref={controlsRef} args={[cameraRef.current]} />
      <Players setChat={setChats} setSocket={setSocket} username={props.username} controlsRef={controlsRef} loadHandler={props.loadHandler} command={command}/>
    </Canvas>
  ), [command]); // Empty dependency array to ensure the scene is memoized only once

  return (
    <>
      {showChat? 
      <div //chat div to be made on top of the scene
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '20%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.5)',
          color: '#fff',
          zIndex: '5'
        }}
      >
        <div id="chatHeader">
          <h1>Chat</h1>
        </div>
        <div id="chats">
          {chats.map((chat, index) => (
            <div id="chat"> 
              <p key={index}>{chat}</p>
            </div>
           
          ))}
        </div>
      
        <div id="chatInput">
          <input value={chat} onChange={(e) => setChat(e.target.value)}></input>
          <button onClick={(e) => {
            if(chat){
            addChat(chat);
            setChat('');
            }
          }}>Send</button>
        </div>
       
        {/* Content of the column div */}
      </div>
  :null}
     <div style={{ position: 'absolute', top: 0, left: 0, width: '10%', height: '100%', zIndex: '10' }}>
   
        <div style={{ marginBottom: '10px' }}>
        <button
  style={{
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: 'aqua',
    backgroundImage: `url(${settings})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
  }}
/>
        </div>
        <div style={{ marginBottom: '10px' }}>
        <button
  style={{
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: 'aqua',
    backgroundImage: `url(${chatIcon})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
  }}
  onClick={e=>{setShowChat(!showChat)}}
/>
        </div>
        <div>
        <button
  style={{
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: 'aqua',
    backgroundImage: `url(${bed})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
  }}
/>
        </div>
      </div>
      {roomName != "" && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '30%',
            height: '75%',
            background: 'rgba(0, 0, 0, 0.5)',
            color: '#fff',
            zIndex: '10',
          }}
        >
          <h1> Enter the {roomName}</h1>
          <button onClick={()=>{setCommand(roomName);setRoomName("")}}> Yes </button>
          <button onClick={()=>setRoomName("")}> Cancel </button>
        </div>
      )}
      <div style={{ width: '100%', height: '100%', position: 'absolute', left: 0, zIndex: '1' }}>
        {scene}
      </div>
    </>
  );
}

export default Scene;
