import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import io from 'socket.io-client';
import { OrbitControls, Text } from '@react-three/drei';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import character from '../assets/character.fbx';
import idle from '../assets/idle.fbx';
import walk from '../assets/walking.fbx';
import {Box, ClickAnimation} from './Misc'
import { useMemo } from "react";

function calculateWalkVector(facingDirection) {
  // Calculate the x and y components of the unit vector based on the facing direction
  const x = Math.cos(facingDirection);
  const y = Math.sin(facingDirection);

  // Return the unit vector as an object with x and y properties
  return [x, y ];
}

function Floor(props) {
    const floorRef = useRef();
    const move = (event) => {
      console.log(event.point.x);
      props.updateLocation(event.point.x, event.point.z);
    };
  
    return (
      <mesh
        receiveShadow={true}
        rotation={[-3.1415/2, 0, 0]}
        position={[0, -1, 0]}
        ref={floorRef}
        onClick={move}
        layers={(floorRef.current && floorRef.current.layers.enable(0), [])}
      >
        <planeBufferGeometry receiveShadow attach="geometry" args={[1000, 1000]} />
        <meshStandardMaterial receiveShadow attach="material" color="black"  />
      </mesh>
    );
  }

function AnimatedFBXModel(props) {
    const fbx = useLoader(FBXLoader, props.url);
    const fbx2 = useLoader(FBXLoader, props.url2);
    const mixerRef = useRef();
    const mixerRef2 = useRef();
    const [mixes, setMixer] = useState(null);
    const [mixes2, setMixer2] = useState(null);
  
    useFrame((state, delta) => {
      if (props.isWalking && mixes) {
        mixerRef.current && mixerRef.current.update(delta);
      }
      if (!props.isWalking && mixes2) {
        mixerRef2.current && mixerRef2.current.update(delta);
      }
    });
  
    useEffect(() => {
      const mixer = new THREE.AnimationMixer(fbx);
      const action = mixer.clipAction(fbx.animations[0]);
      action.play();
      setMixer(mixer);
      mixerRef.current = mixer; // assign the mixer to the ref
  
      const mixer2 = new THREE.AnimationMixer(fbx);
      const action2 = mixer2.clipAction(fbx2.animations[0]);
      action2.play();
      setMixer2(mixer2);
      mixerRef2.current = mixer2; // assign the mixer to the ref
    }, []);
  
    return (
      <group>
        <primitive object={fbx} />
      </group>
    );
  }
  function User(props) {
    const clock = new THREE.Clock();
    clock.start();
    const walkingSpeed = 5; //decrease to accelerate
    const fbx = useLoader(FBXLoader, walk);
    fbx.scale.set(0.01, 0.01, 0.01);
    const meshRef = useRef();
    const [userX, setUserX] = useState(0);
    const [userZ, setUserZ] = useState(0);
    const [targetX, setTargetX] = useState(0);
    const [targetZ, setTargetZ] = useState(0);
    const [moving, setMoving] = useState(false);
    const [facing, setFacing] = useState(3.1415/3);
    
    function handleClick(x,z){
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
            props.socket.emit("send_message", {message: [x,z]});
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
        }
        const delta = clock.getDelta() * 3;
        console.log("****clock delta", delta);
        // console.log(delta2);
        // console.log(delta);
        // // console.log(length);
        // console.log(diffX/length* delta, "delta: ", delta, " at ", userX);
        setUserX(userX + (diffX / length) * delta);
        setUserZ(userZ + (diffY / length) * delta);
        // setUserX(userX+diffX/length/50); //dividing by length finds the unit vector of the path
        // setUserZ(userZ+diffY/length/50);

        props.controlsRef.current.target.set(userX+diffX/length, 0.5, userZ+diffY/length);
        props.controlsRef.current.maxPolarAngle = Math.PI / 2.1; 
        props.controlsRef.current.minPolarAngle = Math.PI / 9 ;
      }
    });
    return (
      <>
         <primitive object={fbx} position={[userX,-1,userZ]} rotation ={[0,3.1415/2 - facing,0]}/>
          <Floor updateLocation={handleClick}/> 
          <AnimatedFBXModel url={walk} url2={idle}animationName="walking" isWalking={moving}/>
            <mesh ref={meshRef} position={[userX, 2, userZ]}>
              <Text
               // set the position of the text
              fontSize={1} // set the font size
              color="white" // set the color of the text
              anchorX="center" // set the horizontal alignment
              anchorY="middle" // set the vertical alignment
              >
                T-Mobile
              </Text>
            </mesh>
          {moving == true? 
            <ClickAnimation x = {targetX} z ={targetZ}/>
            :null
          }
      </>
    );
  }
function NPC(props){
    const [realPos, setRealPos] = useState([0,0]);
    const [fbx, setFbx] = useState(null);
    // const [meshRef, setMeshRef] = useState(null);
  
  useEffect(() => {
    new FBXLoader().load(character, setFbx);
  }, []);
  useFrame (({clock}) => {
    if(props.second){
      if(props.second[1]){
        console.log("moving on a frame", realPos, clock.getDelta());
        const [x,y] = calculateWalkVector(props.second[0]);
        const diffX = 0.02 * x + realPos[0];
        const diffY = 0.02 * y + realPos[1];
        setRealPos([diffX, diffY]);
      }
  }
  });
  useEffect(() => {
    console.log("NPC just moved");
    setRealPos([props.position[0],props.position[2]]);
  }, [props.postion]);
  useEffect(() => {
    console.log("props.second", props.second);
  }, [props.second]);

  if (!fbx) {
    return null;
  }

    fbx.scale.set(0.01, 0.01, 0.01);
    return(
        <>
            {/* <mesh ref={meshRef} position={[props.position[0],2,props.position[2]]}>
              <Text
               // set the position of the text
              fontSize={1} // set the font size
              color="white" // set the color of the text
              anchorX="center" // set the horizontal alignment
              anchorY="middle" // set the vertical alignment
              >
                T-Mobile
              </Text>
            </mesh> */}
             <primitive object={fbx} position={[realPos[0],-1,realPos[1]]}/>
             {/* <AnimatedFBXModel url={walk} url2={idle}animationName="walking" isWalking={moving}/> */}
        </>
    )

}

function Players(props){
  // const clock = useRef(new THREE.Clock());
    const [dict, setDict] = useState({});
    const [facing, setFacing] = useState({});
    const [socket, setSocket] = useState(null);
    // const fbx = useLoader(FBXLoader, character);
    // fbx.scale.set(0.01, 0.01, 0.01);
    // useFrame(({ clock }) => {
    //   const updates = {};
    
    //   for (const key in facing) {
    //     if (facing.hasOwnProperty(key)) {
    //       const [x, y] = facing[key];
    //       if (y) {
    //         const [userX, userZ] = facing[key];
    //         const [diffx, diffy] = calculateWalkVector(x);
    //         var delta = clock.getDelta();
    //         if (delta > 0.5){
    //           delta = 0.5;
    //         }
    //         delta = 0.02
    //         console.log("clocl delta", delta);
    //         const x1 = userX + diffx * delta;
    //         const x2 = userZ + diffy * delta;
    //         updates[key] = [x1, x2];
    //       }
    //     }
    //   }
    
    //   // Update the state once per frame
    //   setDict(prevState => ({ ...prevState, ...updates }));
    // });
   
      
    useEffect(() => {
        console.log("Dict after update:", dict);
      }, [dict]);
    useEffect(() => {
        
        const newSocket = io.connect("http://localhost:3002");
        setSocket(newSocket);

        newSocket.on("welcome", (data) => {
            console.log("welcomed: ", data);
            setDict(data);
        });
        
        newSocket.on("removePlayer", (data) => {
            console.log("bye bye: ", data);
            setDict(prevState => {
              const { [data]:_, ...newState } = prevState;
              return newState;
            });
      
          });

        newSocket.on("rec_message", (data) => {
            const temp = [data[1], data[2]];
            const key = data[0]
            // console.log("socket npc just moved");
            // console.log("ID: ", data[0]);
            // console.log("moving from:", dict);
            // console.log("moving to:", temp);
            setDict(prevState => ({ ...prevState, [key]: temp }));
            setFacing(prevState => ({ ...prevState, [key]: [0, false]}));
        
      });
      newSocket.on("moving_message", (data) => {
        console.log("NPC facing: ", data);
        setFacing(prevState => ({ ...prevState, [data[0]]: [data[1], true] }));
        console.log("facing,", facing);
    });
    }, []);
    return(
        <>
        <User controlsRef = {props.controlsRef} socket={socket}/>
        {
        Object.entries(dict).map(([key, value], index) => (
         
                <NPC key={`NPC-${index}`} position={[value[0], 8, value[1]]} second = {facing[key]}/>
         
       ))}
        </>
    )
}

export default Players;