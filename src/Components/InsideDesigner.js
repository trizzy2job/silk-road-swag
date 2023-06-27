import { Suspense, useEffect, useMemo, useState} from 'react'
import { Canvas, useLoader, useFrame, useThree  } from '@react-three/fiber'
// import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { Html, Bounds, useBounds, Stars, useTexture, useGLTF, Sky, SpotLight, Stage, FlyControls} from "@react-three/drei";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
import shirtTwo from '../assets/tshirt_obj.obj'
import { OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import './three.css'
import colorBack from '../assets/colorback.png'
import character from '../assets/character.fbx';
import { LightFixt, MetalBase, LightFixtB, NeonSign } from './Assets';
// import {create} from 'ipfs-http-client';

// async function infura(e){
//   // const ipfsClient = require('ipfs-http-client');
//   const projectId = '28zAasknKw7w7ViLtFtNtxkNdCz';
//   const projectSecret = 'ca916af6aecabd19b54015a2661681c4';
//   const auth ='Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
//   const client = create({
//       host: 'ipfs.infura.io',
//       port: 5001,
//       protocol: 'https',
//       headers: {
//           authorization: auth,
//       },
//   });
//   // const link = document.createElement("a");
//   // link.href=e;
//   // link.download ="text.txt"
//   var tempR;
//   console.log("Right before server add")
//   await client.add(e).then((res) => {
     
//   //    metaJson("https://ipfs.io/ipfs/"+res.path);
//       tempR =  res.path;
//   });
  
//   return tempR;
//   // window.location.href = "../Submit"

// }

function RGBBars(props){
    const rV = parseInt(props.color[1]+props.color[2],16) / 255.0;
    const gV = parseInt(props.color[3]+props.color[4],16) / 255.0;
    const bV = parseInt(props.color[5]+props.color[6],16) / 255.0;
    // console.log("rv: "+rV);
        const Rgeometry = new THREE.CylinderGeometry( 20, 20, rV * 175, 32 );
        const Bgeometry = new THREE.CylinderGeometry( 20, 20, gV * 175, 32 );
        const Ggeometry = new THREE.CylinderGeometry( 20, 20, bV * 175, 32 );
        // const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );  
        return(
            <>
            <mesh position = {[70,rV * 87.5 + 50,200+75]}  geometry={Rgeometry}   rotation={[0,0,0]}> 
             <meshStandardMaterial color="red" emissive={"red"}
        emissiveIntensity={1}/>
             
            </mesh>
            <mesh position = {[115,gV * 87.5 + 50,225+75]}  geometry={Bgeometry}   rotation={[0,0,0]}> 
            <meshStandardMaterial color="green" emissive={"green"}
        emissiveIntensity={1}/>
            
           </mesh>
           <mesh position = {[70,bV * 87.5 + 50, 250+75]}  geometry={Ggeometry}   rotation={[0,0,0]}> 
           <meshStandardMaterial color="blue" emissive={"blue"}
        emissiveIntensity={1}/>
           
          </mesh>
          </>
        )

}

function GroundPlane() {
    return (
      <mesh receiveShadow rotation={[-3.1415/2, 0, 0]} position={[0, -1, 0]}>
        <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
        <meshStandardMaterial attach="material" color="grey"  />
      </mesh>
    );
  }

  function Roof() {
    return (
      <mesh receiveShadow rotation={[3.1415/2, 0, 0]} position={[0, 249, 0]}>
        <planeBufferGeometry attach="geometry" args={[2000, 1000]} />
        <meshStandardMaterial attach="material" color="black"  />
      </mesh>
    );
  }

  function BackDrop(props) {
    var colorBackT;

      var temp = colorBack;
      colorBackT = useTexture(temp);
    

    return (
      <mesh receiveShadow position={[0, 0, 0]}>
        <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
        { props.scene == 0?
        <meshStandardMaterial attach="material" map={colorBackT} />
        : null }
         { props.scene > 0?
         <meshStandardMaterial attach="material" color="black" />
         : null }
      </mesh>
    );
  }
  function BackDropb() {
    return (
      <mesh receiveShadow position={[0, 0, 0]} rotation={[3.14,0,0]}>
        <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
        <meshStandardMaterial attach="material" color="black" />
      </mesh>
    );
  }
  function BottomC(){
    const geometry = new THREE.CylinderGeometry( 75, 75, 10, 32 );
      return(
        <mesh position={[92.5, 50, 225+75]} geometry={geometry}   rotation={[0,0,0]}> 
             <meshStandardMaterial color="pink" />
             
            </mesh>
      )
  }

  function BottomC2(){
    const geometry = new THREE.CylinderGeometry( 75, 75, 10, 32 );
      return(
        <mesh position={[92.5, 60+87.5 *2, 225+75]} geometry={geometry}   rotation={[0,0,0]}> 
             <meshStandardMaterial color="pink"   />
             
            </mesh>
      )
  }

  function BottomC3(){
    const geometry = new THREE.CylinderGeometry( 75, 75, 87.5*2, 32 );
      return(
        <mesh position={[92.5, 60+87.5, 225+75]} geometry={geometry}   rotation={[0,0,0]}> 
             <meshStandardMaterial color="blue" opacity="0.4" transparent={true}/>
             
            </mesh>
      )
  }

  function BottomC4(props){
    // const base = useLoader(THREE.TextureLoader, joker);
    const geometry = new THREE.CylinderGeometry( 75, 75, 50, 32 );
      return(
        <mesh position={[92.5, 50-35, 225+75]} geometry={geometry}   rotation={[0,0,0]}> 
             <meshStandardMaterial color={props.color} emissive={props.color}
        emissiveIntensity={1} />
             
            </mesh>
      )
  }
  function BackDrop3(props) {
    var temp = colorBack;
    // if (props.scene == 1){
    //     temp = silk;
    //   }
      const colorBackT = useTexture(temp);
    return (
      <mesh receiveShadow rotation = {[0,3.14/2,3.14/2]}position={[0, 0, 0]}>
        <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
        { props.scene == 0?
        <meshStandardMaterial attach="material" map={colorBackT} />
        : null }
         { props.scene > 0?
         <meshStandardMaterial attach="material" color="black" />
         : null }
      </mesh>
    );
  }
  function Wallc2r(props) {
    return (
      <mesh receiveShadow rotation = {[0,0,3.14/2]}position={[250, 125, -500]}>
        <planeBufferGeometry attach="geometry" args={[250, 500]} />
        <meshStandardMaterial attach="material" color="black"/>
      </mesh>
    );
  }
  function Wallc2b(props) {
    
    return (
      <mesh receiveShadow rotation = {[0,-3.14/2,3.14/2]}position={[500, 125, -250]}>
        <planeBufferGeometry attach="geometry" args={[250, 500]} />
        <meshStandardMaterial attach="material" color="black"/>
      </mesh>
    );
  }
  
  
function PixelRow(props){
  const begin = []
  for (var i = 0; i < props.cols; i++)
  {
    begin.push(0);
  }
  const [brightness, setBrightness] = useState(begin);
  const height = 500/brightness.length;
  const ycoord = 10;
  const startz = 0;
  
  useFrame((state) => {
    const fractionalPos = Math.floor(state.camera.position.z / -height);
    const brightness_temp = brightness;
    for(let i = 0; i<brightness_temp.length; i++){
          if (brightness_temp[i] > 0){
          brightness_temp[i] -= 0.05;
          }
      }
    if (props.active){
        brightness_temp[fractionalPos] = 11;
        if(fractionalPos > 0){
            brightness_temp[fractionalPos-1] = 11;
        }
        if(fractionalPos <brightness.length-1){
            brightness_temp[fractionalPos+1] = 11;
        }
    
      
    } 
    setBrightness(brightness_temp);
    })
  return(
      <>
      {
    brightness.map((color, index)=>{
        const zcoord = (-height/2)-(index * height);  //zcoord of middle of tile
        
        return(
          <mesh key={"pixelMesh" + index}receiveShadow rotation={[-3.1415/2, 0, 0]} position={[props.xcoord, ycoord, zcoord + startz]}>
              <planeBufferGeometry key={"geometry" + index} attach="geometry" args={[props.xdir, height]}  />
              <meshStandardMaterial  key={"standardMesh" + index} attach="material" color={[color+5,0,20]}  />
              {/* {(zcoord - height/2 < cameraZ < zcoord + height/2) ?  */}
              {/* <meshStandardMaterial attach="material" color="aquamarine"  />  */}
              {/* <meshStandardMaterial emissive={"white"} emissiveIntensity={brightness[index]} key={"standardMesh" + index} attach="material" color={color}  /> */}
          </mesh>
        )
      })}
    </>
    )
}

function PixelScreen(props){
    const listActive =[];
    for(var i = 0; i < 15; i++ ){
      listActive.push(false);
    }
    const xdir = 500 / listActive.length;
    const [rows, setRows] = useState([]);
    useFrame((state) => {
      const fractionalPos = Math.floor(state.camera.position.x / xdir);
      listActive[fractionalPos] = true;
      if(fractionalPos > 0){listActive[fractionalPos-1] = true;} 
      if(fractionalPos < listActive.length-1){listActive[fractionalPos+1] = true;}
      setRows(listActive);
      
  })
    return(
      <>
        {
          rows.map((status, index)=>{
            return(
            <PixelRow key={"pixelRow: "+index}active={status} xcoord={0+ index*xdir} xdir={xdir} cols={15}/>
            )
          })
        }
      </>
    )
}

function BackDrop3b() {
  return (
    <mesh receiveShadow rotation = {[0,-3.14/2,3.14/2]}position={[0, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
      <meshStandardMaterial attach="material" color="pink" />
    </mesh>
  );
  }

function Startbuttone(){
  return (
      
      <mesh position={[500,30,0]}>
          <Html transform position={[0,0,0]} height={400} width={200}>
          <div>
              <div id="startbuttonDiv">
                  <h1 id="startbuttonscript">Pick Your Shirt Color</h1>
              </div>
          </div>
      </Html >
      </mesh>
    );
  }

function Startbuttone2(){
  return (
      <mesh position={[0,30,-500]}  rotation={[0,3.14/2,0]}>
          <Html transform position={[0,0,0]} height={400} width={200} >
            <div>
                <div id="startbuttonDiv">
                    <h1 id="startbuttonscript">Style your shirt</h1>
                </div>
            </div>
        </Html >
      </mesh>
  );
}

export function BasicShirtDisplaySill(prop){
    const [yrot, setYRot] = useState(1);
    const [realFbx, setRealFbx] = useState(null);
    const [x, setx] = useState(125);
    const [z, setz] = useState(125);
    const { gl, scene, camera } = useThree()
    useFrame((state) => {
        if(prop.scene == 0){setYRot(yrot+1)};
        if(prop.scene==1){
            setz(-250);
            setx(50);
            setYRot(-92);
        }
        
    });
    useEffect(() => {
        const loader1 = new FBXLoader();
        loader1.load(character, (fbx) => {
            setRealFbx(fbx);
      });
          },[]);
    useEffect(() => {
        if(realFbx){
            const shirtMesh = realFbx.getObjectByName('Ch42_Shirt');
            const material = new THREE.MeshStandardMaterial({  map: new THREE.TextureLoader().load(prop.itemt) });
            shirtMesh.material = material;
            setRealFbx(realFbx);
        }
          },[prop.itemt]);

    function screenShot(){
      if(prop.scene == 2)
        console.log("buttered up for a screenshot");
        gl.render(scene, camera)
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.toneMappingExposure = 0.6
        gl.outputEncoding = THREE.sRGBEncoding
        gl.preserveDrawingBuffer = true
        gl.domElement.toBlob(
          async function(blob) {
            var image = new Image();
            image.src = URL.createObjectURL(blob);
            prop.parent(image.src);
          }
          
        )
    }
   if (!realFbx){
    return null;
   }
   return (
       <>
       <primitive object={realFbx} position={[x+200 ,10, z]} rotation-y={Math.PI * 0.005*yrot} onClick={screenShot}/>
     </>
   )
 }
 function ColorMaker(props){
    return(
        <>
        <BottomC />
        <BottomC2 />
        <BottomC3 />
        <BottomC4 color={props.color}/>
        <RGBBars color={props.color}/>
        </>
    )
}

const CameraController0 = () => {
    const { camera, gl } = useThree();
    useEffect(
      () => {
        const controls = new OrbitControls(camera, gl.domElement);
  
        
        controls.minDistance = 300;
        controls.maxDistance = 600;
        controls.maxPolarAngle = Math.PI/2; //up and down angle
        controls.minPolarAngle = Math.PI/3;
        controls.minAzimuthAngle = 0;
        controls.maxAzimuthAngle = Math.PI/2; //sidways angle

        return () => {
          controls.dispose();
        };
      },
      [camera, gl]
    );
    return null;
  };
  const CameraController1 = (props) => {
    const { camera, gl } = useThree();
    useEffect(
      () => {
      
        const controls = new OrbitControls(camera, gl.domElement);
        camera.position.set(250,75,-350);
        controls.target = new THREE.Vector3(250, 75, -250);
       
        controls.minDistance = 150;
        controls.maxDistance = 250;
        controls.maxPolarAngle = Math.PI/2;
        controls.minPolarAngle = 3.14/3;

        return () => {
          controls.dispose();
        };
      },
      [camera, gl]
    );
    return null;
  };

export const InsideDesigner= (props) => {
   
    const [zinner, zinnerset] = useState(500);
   
   
    if (props.z != zinner){
        zinnerset(-500)
    };

   
    
    return<Suspense fallback={null}>
      <Canvas camera={{position:[500,10,props.z]}}>
       {/* First Room */}
        {props.scene == 0 ?
        <>
          <CameraController0/>
          <ColorMaker color={props.color}/>
          <Startbuttone />
        </>
        : 
        // second room
        <>    
          <CameraController1 />
          <LightFixtB center={[250,100,-250]} scene={props.scene}/>
          {/* <MetalBase /> */}
          <NeonSign />
          
          <Wallc2b />
          <Startbuttone2 />
          <PixelScreen />
        </>
        }

        {/* Building structure */}
        <ambientLight intensity={0.5} color={"white"} />
        <GroundPlane />
        <Roof />
        <BackDrop scene={props.scene} />
        <BackDropb />
        <BackDrop3b />
        <Wallc2r />
        <BackDrop3 scene={props.scene} />
        <BasicShirtDisplaySill scene={props.scene} itemt={props.src} name="joker design" parent={props.parent}/>
    </Canvas>
  </Suspense>

    
}

