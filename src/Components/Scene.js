import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, Text} from '@react-three/drei'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import idle from '../assets/idle.fbx'
import walk from '../assets/walking.fbx'
import sright from '../assets/skybox_right.png'
import sleft from '../assets/skybox_left.png'
import stop from '../assets/skybox_up.png'
import sbot from '../assets/skybox_down.png'
import sfront from '../assets/skybox_front.png'
import sback from '../assets/skybox_back.png'

function AnimatedFBXModel(props) {
  const fbx = useLoader(FBXLoader, props.url);
  const fbx2 = useLoader(FBXLoader, props.url2);
  const mixerRef = useRef();
  const mixerRef2 = useRef();
  const [mixes, setMixer] = useState(null);
  const [mixes2, setMixer2] = useState(null);
  useFrame((state, delta) => {
    if(props.isWalking && mixes) {
    mixerRef.current && mixerRef.current.update(delta);
 
  }
  if(!props.isWalking && mixes2) {
    mixerRef2.current && mixerRef2.current.update(delta);
   
  }
  });

  // useEffect(() => {
    
  //     console.log("animation should be")
  //     const animations = fbx.animations;
  //     console.log("length of animation", animations)
  //     const animation = animations[0]; // choose the first animation
  //     console.log(mixer);
  //     const action = mixer.clipAction(animation);
  //     console.log("done");
  //     action.play();
  //     mixerRef.current = mixer;
  //     return () => mixer.uncacheAction(action);
  
  // }, [fbx, mixer]);
  useEffect(() => {
    console.log("use effect");
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

function SkyBox(props) {
  const { scene } = useThree();
  const loader = new THREE.CubeTextureLoader();
  // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
  const texture = loader.load(props.urls);

  // Set the scene background property to the resulting texture.
  scene.background = texture;
  return null;
}

const ClickAnimation = (props) =>{
    return(
        <mesh
         visible
         position={[props.x, -0.95, props.z]}
         rotation={[-3.1415/2, 0, 0]}
         castShadow>
            <ringBufferGeometry args={[0.75, 1, 32]} />
            <meshBasicMaterial attach="material" color="hotpink" />
      </mesh>
    )
}
function Box(props) {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const meshRef = useRef();
    // useEffect(()=>{
    //     meshRef.current.lookAt(props.lookAt);
    // },[props.lookAt])
    
  return (
    <mesh castShadow={true} ref={meshRef} {...props} rotation={[0, props.rotation, 0]}>
      <boxBufferGeometry args={[props.width, props.height, props.depth]} />
      <meshStandardMaterial color={props.color} />
    </mesh>
  );
}
function Floor(props) {
    
    const { left, top } = props.can.current.getBoundingClientRect();
    const floorRef = useRef();
  
    const { camera } = useThree();
    const move = (event) => {
        console.log(event.point.x);
       
        props.updateLocation(event.point.x,event.point.z);

      
      };
    return (
        <mesh receiveShadow={true} rotation={[-3.1415/2, 0, 0]} position={[0, -1, 0]}
        ref={floorRef}
     
      onClick={move}
      layers={(floorRef.current && floorRef.current.layers.enable(0), [])}>
        <planeBufferGeometry receiveShadow attach="geometry" args={[1000, 1000]} />
        <meshStandardMaterial receiveShadow attach="material" color="black"  />
      </mesh>
    );
  }


function User(props) {
const fbx = useLoader(FBXLoader, walk);
fbx.scale.set(0.01, 0.01, 0.01);
const meshRef = useRef();
const[userX, setUserX] = useState(0);
const[userZ, setUserZ] = useState(0);
const[targetX, setTargetX] = useState(0);
const[targetZ, setTargetZ] = useState(0);
const[moving, setMoving] = useState(false);
const[facing, setFacing] = useState(3.1415/3);
function handleClick(x,z){
    // controlsRef.current.target.set(x, 0, y);
    // controlsRef.current.update();
   
    setTargetX(x);
    setTargetZ(z);
    if(z-userZ < 0 && x-userX < 0){
      setFacing(Math.PI + Math.atan((z-userZ)/(x-userX)));
    }
    else if(x-userX < 0){
      setFacing(Math.PI + Math.atan((z-userZ)/(x-userX)));
    }
    else{
      setFacing(Math.atan((z-userZ)/(x-userX)));
    }
    setMoving(true);
}
useFrame (({camera})=>{
    if (meshRef.current) {
        meshRef.current.lookAt(camera.position);
      }
    if(moving){
        const diffX = targetX -userX;
        const diffY = targetZ -userZ;
        var length = 10 * Math.sqrt(diffX*diffX+diffY*diffY); //calculating length
        if (length < 0.5){
            setMoving(false);
        }
        console.log(length);
       
        setUserX(userX+diffX/length/5);
        setUserZ(userZ+diffY/length/5);
        props.cameraHandler(userX+diffX/length,userZ+diffY/length);
    }
    else{
       
        console.log("arrived");
    }
})
  return (
    <>
       <primitive object={fbx} position={[userX,-1,userZ]} rotation ={[0,3.1415/2 - facing,0]}/>
      
        <Floor updateLocation={handleClick} can={props.can}/> 
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
        <ClickAnimation x = {targetX} z ={targetZ}/>:
        null
        }
    </>
  );
}

function Scene() {
    const cameraRef = useRef();
  const controlsRef = useRef();
    const canvasRef = useRef();
    const urls = [
     
     
      sfront,
      sback,
      stop,
      sbot,
      sright,
      sleft
      
    ];
    function cameraHandle(x,z){
        controlsRef.current.target.set(x, 0.5, z);
        controlsRef.current.maxPolarAngle = Math.PI / 2.1; 
        controlsRef.current.minPolarAngle =  Math.PI / 9 ;
    }
  return (
    <>
    <Canvas shadowMap shadows ref={canvasRef} style={{ width: '100%', height: window.innerHeight - 50}} >
    <SkyBox urls={urls} />
      <Box position={[-20, 0, 0]} width={10} height={10} depth={10} color={'red'} rotation = {0}/>
      <Box position={[20, 0, 0]} width={10} height={10} depth={10} color={'purple'} rotation = {0}/>
      <Box position={[0, 0, 20]} width={10} height={10} depth={10} color={'green'} rotation = {0}/>
      <Box position={[0, 0, -20]} width={10} height={10} depth={10} color={'yellow'} rotation = {0}/>
      <directionalLight
      color="white"
      intensity={1.5}
      position={[15, 7, 40]}  // position the light above the scene
    
      shadow-mapSize-width={512}  // set the shadow map size
      shadow-mapSize-height={512}
    />
     <ambientLight intensity={0.2} color="white" />
      <OrbitControls ref={controlsRef} args={[cameraRef.current]} />
      <User width={1} height={2} depth={0.5} color={'red'} can={canvasRef} cameraHandler={cameraHandle}/>
  
    </Canvas>
   </>
  );
}

export default Scene;