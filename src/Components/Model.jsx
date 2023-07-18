import { Suspense, useState, useMemo, useEffect} from 'react'
import { Canvas,} from '@react-three/fiber'
import { Html, Bounds, useBounds,OrbitControls, Stars, useTexture, useGLTF, Sky, SpotLight, Stage} from "@react-three/drei";
// import { GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
// import { OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import floortity from '../assets/floortt.png'
import {BasicShirtDisplay}  from './Shirts'
// import { makeList } from './Textures';
import {Camel} from './Asset';
import * as THREE from "three";



function ItemBoard(props){
  console.log(props.name)
 
  return (
    <mesh receiveShadow position={props.loc}>
      <Html transform>
        <div id="itemboardpop">
          <h1>{props.name}</h1>
        </div>
      </Html>
      <planeBufferGeometry attach="geometry" args={[50, 100]} />
      <meshStandardMaterial color="purple"attach="material"/>
    </mesh>
  );
}

function SelectToZoom({ children }) {
  const [loc, setLoc] = useState([0,0,0])
  const[nameProduct, setNameProduct] = useState("unknown")
  const api = useBounds()
  
  return (
    <group onClick={e => (e.stopPropagation(),
    setNameProduct(e.object.name),
    console.log(e.object.name),
     setLoc([e.object.position.x, e.object.position.y+100,e.object.position.z]))} onPointerMissed={(e) => e.button === 0 && api.refresh().fit()}>
      {children}
       
      <ItemBoard loc={loc} name={nameProduct}/>
    </group>
  )
}

  




export const Model = (props) =>{

  console.log("MODEL REFRESH");
//   const listItems = makeList();
  const [camelo, setcamelo] = useState(null);
  const portalGeo = new THREE.CylinderGeometry( 120, 120, 20, 32 );
  const[ready, setready] = useState(false);
  const [randb, setrandb] = useState(1);

//   function bum(){
//     console.log("bum");
//   }
//   useEffect(() => {
//     console.log("Use effect called");
//     const loadAll = () =>{
//     const promise1 = new Promise((resolve, reject) => {
     
//             // let onLoad = function () {
//             //   console.log("about to resolve")
//             //  resolve(answer);
//             // };
//             let onProgress = function () { };
//             let onError = function () {
//                 console.log("failure");
//             };
//             console.log("loading all")
//             let manager = new THREE.LoadingManager(bum);
            
//             const loader = new OBJLoader( manager );
// 				loader.load( camelSRS, function ( obj ) {
//           console.log("inside load");
//           console.log("object: " +obj)
// 					setcamelo(obj)

// 				}, onProgress, onError );
//           //   const answer =loader.loadAsync(camelSRS, onLoad, onProgress, onError).then((value)=>{console.log("async thened:" +answer)});
//           // console.log("answer: " + answer);

//       // console.log("Loading All");
      
//       // // const loader = new OBJLoader();
//       // // const objCamel = loader.load(camelSRS)
//       // const objCamel = new useLoader(OBJLoader, camelSRS);
//       // console.log("Loading All2");
     

 
//       // resolve(objCamel);

      
//     });
//     return promise1;
//   }
//   loadAll().then((value) => {
//       console.log("success");
//       console.log("value:"+ value);
//       console.log("load all done");
//       setcamelo(value);
//       console.log("camelo:" +camelo)
//       // setready(true);
//       // expected output: "Success!"
//     });
//     // promise1.then((value) => {
//     //   console.log(value);
//     //   // expected output: "Success!"
//     // });
    
   
// }, [])
  // const objCamel = useLoader(OBJLoader, camelSRS);
  // const geomCamel = useMemo(() => {
  //   let g;
  //   objCamel.traverse((c) => {
  //     if (c.type === "Mesh") {
  //       const _c = c;
  //       g = _c.geometry;
  //     }
  //   });
  //   return g;
  // }, [objCamel]);
 
  return(
  <>
 
 
  {/* { ready ?  */}
  <Canvas height="100%"camera={{position: props.cam, rotation:[3.14/2,0,3.14/2]}}>
      {/* Change the margin on the bounds in order to alter the zoom on the camera */}
      <Suspense fallback={null}>
      <Camel loc={[700,2,310]} rot={[0,-Math.PI / 1.2,0]}/>
      <Camel loc={[640,2,-330]} rot={[0,-Math.PI /7,0]}/>
      <Bounds fit clip margin={0.25}>   
      <SelectToZoom>
       
      
        

          
            <BasicShirtDisplay name={"hello"} start ={0 * -100} itemt={floortity} />
          
    
    </SelectToZoom>
    </Bounds>
    </Suspense>
  

    <OrbitControls target={props.loc}/>
    <ambientLight intensity={0.5} />
    <pointLight position={[-2040,0,-20]}/>

       </Canvas>
      
       </>
       )
}

export default Model;