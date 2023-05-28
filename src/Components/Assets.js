
import {useEffect, useMemo, useState} from 'react'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import lightB from '../assets/LightFixture6.glb'
import neon from '../assets/neonsign.glb'


export function NeonSign(){
 
  const {scene} = useLoader(GLTFLoader, neon)

  return(
    
    <primitive rotation={[0,-3.14/2,0]} position={[490,150,-250]}object={scene} scale={[5,5,5]} />

  )
}

export function LightFixtB(props){
  const [c1, setc1] = useState("white");
  const [c2, setc2] = useState("white");
  const [c3, setc3] = useState("white");
  const [c4, setc4] = useState("white");
  const[ct, setct] = useState(0)
  const [count, setcount] = useState(0);
  const {scene} = useLoader(GLTFLoader, lightB);
  
//   useEffect(()=>{
//     console.log(props.scene);
//     if(props.scene==3){
//       console.log("finished");
//       setc1("red");
//       setc2("blue");
//       setc3("red");
//       setc4("blue");
// }}, [])

  useFrame((state) => {
    
    if(props.scene==2){
    setcount(count+1);
  //   if(count%22==0){
  //   if(ct==0){
  //   setc1("Blue");
  //   setc2("Red");
  //   setc3("Blue");
  //   setc4("Red");
  //   setct(1);
  //   }
  
  // if(ct==1){
  //   setc2("Blue");
  //   setc1("Red");
  //   setc4("Blue");
  //   setc3("Red");
  //   setct(0);
  //   }
  // }
    }
  })


  return(
    <>
    <rectAreaLight 
    color={c1}
    position={[250,175,-325]}
    rotation={[-3.14/2 * 1.5,0,0]}
    args={[5, 100]}
    castShadow
    
    />
    <rectAreaLight 
    color={c3}
    rotation={[-3.14/4 + 3.14,3.14,0]} position={[250,175,-200]}
    args={[5, 100]}
    castShadow
    
    />
    <rectAreaLight 
    color={c2}
    
    rotation={[0,3.14/2,3.14/4]} position={[310,175,-250]}
    args={[5, 200]}
    castShadow
  
    />

<rectAreaLight 
    color={c4}
    
    rotation={[0,-3.14/2,3.14/4]} position={[310-140,175,-250]}
    args={[5, 100]}
    castShadow
    />
      <primitive position={props.center} object={scene} scale={[5,5,5]} />
    
    </>
  )
}

