import React, { useState, useRef, useEffect } from 'react';
import {useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import io from 'socket.io-client';
import { Text } from '@react-three/drei';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
// import character from '../assets/character.fbx';
import idle from '../assets/idle.fbx';
import walk from '../assets/walking.fbx';
import {ClickAnimation, Floor} from './Misc'
import newShirt from '../assets/manngrid.jpeg'

function AnimatedFBXModel(props) {
    const [fbx, setFbx] = useState(null);
    const [fbx2, setFbx2] = useState(null);
    const [mixes, setMixer] = useState(null);
    const [mixes2, setMixer2] = useState(null);
    const mixerRef = useRef();
    const mixerRef2 = useRef();
    useEffect(() => {
      const loader1 = new FBXLoader();
      const loader2 = new FBXLoader();
      loader1.load(idle, (fbx) => {
        console.log("here is it", fbx);
        const shirtMesh = fbx.getObjectByName('Ch42_Shirt');
        const material = new THREE.MeshStandardMaterial({  map: new THREE.TextureLoader().load(newShirt) });
        shirtMesh.material = material;
        setFbx(fbx);
      });
    
      loader2.load(walk, (fbx) => {
        const shirtMesh = fbx.getObjectByName('Ch42_Shirt');
        const material = new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load(newShirt) });
        shirtMesh.material = material;
        setFbx2(fbx);
      });
  
      Promise.all([loader1, loader2]).then(() => {
        props.loadHandler();
      });
  
    }, []);

    useFrame((state,delta) => {
      if (props.isWalking && mixes2) {
        mixerRef2.current && mixerRef2.current.update(delta);
      }
      if (!props.isWalking && mixes) {
        mixerRef.current && mixerRef.current.update(delta);
      }
    });
  
    useEffect(() => {
      if(fbx){
        fbx.scale.set(0.01, 0.01, 0.01);
        const mixer = new THREE.AnimationMixer(fbx);
        const action = mixer.clipAction(fbx.animations[0]);
        action.play();
        setMixer(mixer);
        mixerRef.current = mixer; // assign the mixer to the ref
        // assign the mixer to the ref
      }
    }, [fbx]);
    useEffect(() => {
      if(fbx2){
        fbx2.scale.set(0.01, 0.01, 0.01);
        const mixer = new THREE.AnimationMixer(fbx2);
        const action = mixer.clipAction(fbx2.animations[0]);
        action.play();
        setMixer2(mixer);
        mixerRef2.current = mixer; // assign the mixer to the ref
        // assign the mixer to the ref
      }
    }, [fbx2]);
    if (!fbx) {
      return null;
    }
    if (!fbx2) {
      return null;
    }
    return (
      <group>
        { !props.isWalking?
          <primitive object={fbx} position = {props.position} rotation = {props.rotation}/>
        : 
          <primitive object={fbx2} position = {props.position} rotation = {props.rotation}/>
        }
      </group>
    );
  }




  function User(props) {
    function Chatz() {
      var string = " ";
      function handleKeyDown(event) {
        console.log(event.key); // Outputs the pressed key to the console
        setChat("~ ~ ~")
        // Check if the pressed key is 'Enter'
        if (event.key === 'Enter'){
          
          // Perform desired actions when 'Enter' key is pressed
          console.log('Enter key pressed!');
          setChat(string)
          string = " "
        }
        if (event.key === 'Backspace'){
          
          string = string.split()
        }
        string += event.key.toString();
        
      }
      
      // Attach the event listener to the document object
      document.addEventListener('keydown', handleKeyDown);
    }
    const [chat, setChat] = useState('');
    Chatz();
    const meshRef = useRef();
    
    const [userX, setUserX] = useState(0);
    const [userZ, setUserZ] = useState(0);
    const [targetX, setTargetX] = useState(0);
    const [targetZ, setTargetZ] = useState(0);
    const [moving, setMoving] = useState(false);
    const [facing, setFacing] = useState(3.1415/3);
    const [pendingWindow, setPendingWindow] = useState("")
    const clock = new THREE.Clock();
    //Restart the clock when the User is rerendered. Everytime a new move instruction occurs, a rerender is triggered.
    clock.start();
    useEffect(() => {
      if (props.command == "Design Studio"){
        const dx = 12
        const dz = 0
        setTargetX(dx)
        setTargetZ(dz)
        var tempFacing = 0;
        if (dx-userX < 0){
          tempFacing = Math.PI + Math.atan((dz-userZ)/(dx-userX));
        } else {
          tempFacing = Math.atan((dz-userZ)/(dx-userX));
        }
        setFacing(tempFacing);
        setMoving(true)
        setPendingWindow("../Design")
      }
      if (props.command == "Voting Commune"){
        const dx = 0
        const dz = 12
        setTargetX(dx)
        setTargetZ(dz)
        var tempFacing = 0;
        if (dx-userX < 0){
          tempFacing = Math.PI + Math.atan((dz-userZ)/(dx-userX));
        } else {
          tempFacing = Math.atan((dz-userZ)/(dx-userX));
        }
        setFacing(tempFacing);
        setMoving(true)
        setPendingWindow("../Vote")
      }
      if (props.command == "Shop"){
        const dx = 0
        const dz = -12
        setTargetX(dx)
        setTargetZ(dz)
        var tempFacing = 0;
        if (dx-userX < 0){
          tempFacing = Math.PI + Math.atan((dz-userZ)/(dx-userX));
        } else {
          tempFacing = Math.atan((dz-userZ)/(dx-userX));
        }
        setFacing(tempFacing);
        setMoving(true)
        setPendingWindow("../Shop")
      }
    }, [props.command]);
    function handleClick(x,z){
      console.log("x:",x)
      props.controlsRef.current.maxPolarAngle = Math.PI / 2.1; 
      props.controlsRef.current.minPolarAngle = Math.PI / 9 ;
      if (!moving){
        setTargetX(x);
        setTargetZ(z);
        var tempFacing = 0;
        if (x-userX < 0){
          tempFacing = Math.PI + Math.atan((z-userZ)/(x-userX));
        } else {
          tempFacing = Math.atan((z-userZ)/(x-userX));
        }
        setFacing(tempFacing);
        setMoving(true);
        if(props.socket){
            props.socket.emit("send_message", [x,z]);
        }
        
      }
  }

    useFrame (({camera}) => {
      if (meshRef.current) {
        meshRef.current.lookAt(camera.position);
      }
      if (moving) {
        const diffX = targetX -userX;
        const diffY = targetZ -userZ;
        var length = Math.sqrt(diffX*diffX+diffY*diffY); //calculating length
        if (length < 0.5) {
          setMoving(false);
          if(pendingWindow != ""){
            window.location.href = pendingWindow
            setPendingWindow("")
          }
        }
        const delta = clock.getDelta() * 3;
        var fraction = delta / length;
        if (fraction > 1){
          setUserX(targetX);
          setUserZ(targetZ);
          props.controlsRef.current.target.set(targetX, 0.5, targetZ);
        }
        else{
        setUserX(userX + diffX * fraction);
        setUserZ(userZ + diffY * fraction);
        props.controlsRef.current.target.set(userX + diffX * fraction, 0.5, userZ + diffY * fraction);
        }
      }
    });

    return (
      <>
          <Floor updateLocation={handleClick}/> 
          <AnimatedFBXModel url={walk} url2={idle}animationName="walking" isWalking={moving}position={[userX,-1,userZ]} rotation ={[0,3.1415/2 - facing,0]} loadHandler={props.loadHandler}/>
            <mesh ref={meshRef} position={[userX, 2, userZ]}>
              <Text
               // set the position of the text
              fontSize={1} // set the font size
              color="white" // set the color of the text
              anchorX="center" // set the horizontal alignment
              anchorY="middle" // set the vertical alignment
              >
                {props.username}
              </Text>
              <Text
               // set the position of the text
              fontSize={0.3} // set the font size
              color="yellow" // set the color of the text
              anchorX="center" // set the horizontal alignment
              anchorY="bottom" // set the vertical alignment
              >
                {chat}
              </Text>            </mesh>
          
          {moving == true? 
            <ClickAnimation x = {targetX} z ={targetZ}/>
          :
            null
          }
      </>
    );
  }

function NPC(props){
  const clock3 = useRef(new THREE.Clock());
    const [realPos, setRealPos] = useState([0,0]);
    const [first, setFirst] = useState(null);
    const [facing, setFacing] = useState(0);
    const [walkVector, setWalkVector] = useState(null);
    const [positionSnap, setPositionSnap] = useState(null);
    const [distance, setDistance] = useState(0);
    const meshRef = useRef(null);
 

  

  useFrame (({camera}) => {
    if(meshRef != null){
      if(meshRef.current) {
        meshRef.current.lookAt(camera.position);
      }
  }
    //if there is a walk command
    if(props.position){
      if(props.position !== realPos && walkVector != null){
        //to make no skipping the end
        const constip = clock3.current.getDelta() * 3;
        const newX = constip * walkVector[0] ;
        const newY = constip * walkVector[1] ;
        const length = Math.sqrt(newX*newX+newY*newY); 
        setDistance(distance - length);
        if (distance < 0.5) {
          setRealPos(props.position);
        }
        else{
          setRealPos([newX + realPos[0], newY+ realPos[1]]);
        }
      }
  }
  
  });
  useEffect(() => {
      setRealPos(props.position);
      setFirst(props.postion);
    }, []);
  useEffect(() => {
    const x = props.position[0];
    const z = props.position[1];
    const userX = realPos[0];
    const userZ = realPos[1];
    var tempFacing;
    if (x-userX < 0){
      tempFacing = Math.PI + Math.atan((z-userZ)/(x-userX));
    } else {
      tempFacing = Math.atan((z-userZ)/(x-userX));
    }
    setFacing(tempFacing);

    if(props.position != null && props.position != first){
      clock3.current.start();
    //everyime NPC needs to walk to a new location
    var real = realPos;
    //put him at the right start place
   
    if(positionSnap != null){
        setRealPos(positionSnap);
        real = positionSnap;
    }
    setPositionSnap(props.position);
    //calculate unit vector
    const diffX = props.position[0] -real[0];
    const diffY = props.position[1] -real[1];
    var length = Math.sqrt(diffX*diffX+diffY*diffY); 
    setDistance(length);
    setWalkVector([(props.position[0] - real[0])/length, (props.position[1] - real[1])/length]);
  }
  }, [props.position]);

    return(
        <>
            <mesh ref={meshRef} position={[realPos[0],2,realPos[1]]}>
              <Text
               // set the position of the text
              fontSize={1} // set the font size
              color="white" // set the color of the text
              anchorX="center" // set the horizontal alignment
              anchorY="middle" // set the vertical alignment
              >
                {props.socketCon}
              </Text>
            </mesh>
          <AnimatedFBXModel isWalking={realPos != props.position} position={[realPos[0],-1,realPos[1]]} rotation ={[0,3.1415/2 - facing,0]} loadHandler={props.loadHandler}/>
        </>
    )

}

function Players(props){
    const [dict, setDict] = useState({});
    const [socket, setSocket] = useState(null);
    const [playersLoaded, setPlayersLoaded] = useState(0);
    const [setup, setSetup] = useState(false);
    const [users, setUsers] = useState({});
    useEffect(() => {
        const newSocket = io.connect("http://localhost:3002?username="+props.username);
        setSocket(newSocket);
        props.setSocket(newSocket)
        newSocket.on("welcome", (data) => {
          setDict(data[0]);
          setSetup(true);
          setUsers(data[1])
          props.setChat(data[2])
        });
        newSocket.on("removePlayer", (data) => {
          setDict(prevState => {
              const { [data[0]]:_, ...newState } = prevState;
              return newState;
            });
          props.setChat((prevChats) => {
              const updatedChats = [...prevChats];
              updatedChats.shift();
              updatedChats.push(data[1] + " just left");
              return updatedChats;
            });
        });
        newSocket.on("newChat", (data) => {
          console.log("chat received")
          props.setChat((prevChats) => {
            const updatedChats = [...prevChats];
            updatedChats.shift();
            updatedChats.push(data[0] + ": " + data[1]);
            return updatedChats;
          });
        });
        newSocket.on("init_message", (data) => {
          setDict(prevState => ({ ...prevState, [data[0]]: [0,0] }));
          setUsers(prevState => ({ ...prevState, [data[0]]: data[1] }));
          props.setChat((prevChats) => {
            const updatedChats = [...prevChats];
            updatedChats.shift();
            updatedChats.push(data[1] + " just joined");
            return updatedChats;
          });
      });
        newSocket.on("moving_message", (data) => {
          console.log("Users:", users[data[0]]);
          const temp = [data[1], data[2]];
          const key = data[0]
          setDict(prevState => ({ ...prevState, [key]: temp }));
      });
      
    }, []);

    function loadHandler() {
      setPlayersLoaded(prevPlayersLoaded => {
        const curr = prevPlayersLoaded + 1;
        const dictLength = Object.keys(dict).length + 1;
        props.loadHandler(curr/dictLength * 100);
        return curr;
      });

    }
    return(
        <>
          {setup && (
            <>
              <User username = {props.username} controlsRef = {props.controlsRef} socket={socket} loadHandler={loadHandler} command={props.command}/>
              {Object.entries(dict).map(([key, value], index) => (
                <NPC key={`NPC-${key}`} position={value} socketCon={users[key]} loadHandler={loadHandler} />
              ))}
            </>
          )}
        </>
    )
}

export default Players;