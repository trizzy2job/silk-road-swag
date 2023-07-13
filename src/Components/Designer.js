import './designer.css';
import React, {useState, useEffect, useRef} from 'react'
// import logo from '../../assets/seller1.png';
import {  Link } from "react-router-dom";
import waterMark from "../assets/colorback.png";
import down from "../assets/colorback.png";
import arrow from "../assets/upArrow.png";
import NFTMaker from './nftMaker';
// import {arrayify, hexlify} from "@ethersproject/bytes";
// import {create} from 'ipfs-http-client';
// import { encrypt, decrypt, PrivateKey } from 'eciesjs';
import "ethereumjs-util";
import ShowHide from './showandHide';
// import { keccak256 } from '@ethersproject/keccak256';
// import {encryptString, decryptString, privateToPublicMe, privateToWalletMe} from '../decrypt/eth-encrypt';
import visten from "../assets/colorback.png";
// import { ItemView } from '../three/ItemView';
// import Model from '../three/Model';
import { InsideDesigner } from './InsideDesigner'
import uploadImage from '../assets/upload.png'

export const Designer = () =>{
    const canvas = useRef(null);
    const [numElements, setNumElements] = useState(0);
    const[images, setImages] = useState([]);
    const [top,setTop] = useState('1');
    const [pos, setPos] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [rots, setRots] = useState([]);
    const [pointer, setPointer] = useState(-1);
    const [water, setWater] = useState(false);
    const [ipfs, setIPFS] = useState();
    const [penI, setPendingImage] = useState(false);
    const[threedmock, set3dmock] = useState(visten);
    const [shirtColor, setShirtColor] = useState("white");
    const [scene, setScene] = useState(0);
    const [zcamera, setZCamera] = useState(500);
    const[move, setMove] = useState(false);
    const [ipfsLink, setIpfsLink] = useState("");
    const waterImage = new Image();
    waterImage.src = waterMark;
    const [childData, setChildData] = useState("");
    const [sides, setSides] = useState([])
    useEffect(() =>{
        if(scene ==3){
            console.log("storing mapping")
            sessionStorage.setItem("mapSubmission", threedmock)
        }
        },[scene])
    function submitPage(){
        sessionStorage.setItem("designSubmission", childData)
      
        window.location.href = "../Submit"
    }

    function changeRot(direction){
        var tempRot = rots;
        tempRot[pointer] = direction * 3.1415 / 180;
        console.log(direction);
        setRots(tempRot);
        setTop(top+1);
    }

    function deleteImage(){
        console.log("Delete initiated at: "+ pointer );
        setNumElements(numElements-1);
        console.log("num elements decreased")
        var temp = images;
        temp.pop(pointer);
        setImages(temp);
        var tempP = pos
        tempP.pop(pointer);
        setPos(tempP);
        var tempS = sizes
        tempS.pop(pointer);
        var tempR = rots;
        tempR.pop(pointer);
        setRots(tempR);
        console.log("popped pointer at")
        setSizes(tempS);
        var tempSi = sides
        tempSi.pop(pointer);
        setSides(tempSi);
        if (pointer != 0){
            setPointer(pointer - 1);
        }
        console.log(pointer);
        
        setPendingImage(false);
        setTop(top+1)
    }
    function calculateMainCanvasCoordinatesFront(x, y) {
        // Define the mapping between the smaller frame and main canvas coordinates
        const framePoints = [
            
          { frameX: 0, frameY: 0, mainX: 305, mainY:  932 },
          { frameX: 1, frameY: 0, mainX: 123, mainY: 931 },
          { frameX: 1, frameY: 1, mainX: 123, mainY: 661 },
          { frameX: 0, frameY: 1, mainX: 305, mainY: 661 },
        ];
      
        // Calculate the normalized coordinates within the frame
        const normalizedX = (x - framePoints[0].frameX) / (framePoints[1].frameX - framePoints[0].frameX);
        const normalizedY = (y - framePoints[0].frameY) / (framePoints[3].frameY - framePoints[0].frameY);
      
        // Find the corresponding points in the main canvas
        const mainPoint1 = framePoints[0];
        const mainPoint2 = framePoints[1];
        const mainPoint3 = framePoints[2];
        const mainPoint4 = framePoints[3];
        console.log("before inter")
        // Interpolate the main canvas coordinates based on the normalized coordinates
        const mainX = interpolate(mainPoint1.mainX, mainPoint2.mainX, mainPoint3.mainX, mainPoint4.mainX, normalizedX, normalizedY);
        const mainY = interpolate(mainPoint1.mainY, mainPoint2.mainY, mainPoint3.mainY, mainPoint4.mainY, normalizedX, normalizedY);
        console.log("after inter")
        console.log(mainX, mainY)
        return [ mainX, mainY ];
      }
      
      // Helper function for linear interpolation
      function interpolate(x1, x2, x3, x4, t, u) {
        return (
          (1 - t) * (1 - u) * x1 +
          t * (1 - u) * x2 +
          t * u * x3 +
          (1 - t) * u * x4
        );
      }
    function calculateMainCanvasCoordinatesBack(x, y) {
    
        // Define the mapping between the smaller frame and main canvas coordinates
        const framePoints = [
          { frameX: 0, frameY: 0, mainX: 75, mainY: 514.5 },
          { frameX: 1, frameY: 0, mainX: 74, mainY: 319 },
          { frameX: 1, frameY: 1, mainX: 363, mainY: 317 },
          { frameX: 0, frameY: 1, mainX: 362, mainY: 513 },
        ];
      
        // Calculate the normalized coordinates within the frame
        const normalizedX = (x - framePoints[0].frameX) / (framePoints[1].frameX - framePoints[0].frameX);
        const normalizedY = (y - framePoints[0].frameY) / (framePoints[3].frameY - framePoints[0].frameY);
      
        // Find the corresponding points in the main canvas
        const mainPoint1 = framePoints[0];
        const mainPoint2 = framePoints[1];
        const mainPoint3 = framePoints[2];
        const mainPoint4 = framePoints[3];
        console.log("before inter")
        // Interpolate the main canvas coordinates based on the normalized coordinates
        const mainX = interpolate(mainPoint1.mainX, mainPoint2.mainX, mainPoint3.mainX, mainPoint4.mainX, normalizedX, normalizedY);
        const mainY = interpolate(mainPoint1.mainY, mainPoint2.mainY, mainPoint3.mainY, mainPoint4.mainY, normalizedX, normalizedY);
        console.log("after inter")
        console.log(mainX, mainY)
        return [ mainX, mainY ];
      }
      
      // Helper function for linear interpolation
      function interpolate(x1, x2, x3, x4, t, u) {
        return (
          (1 - t) * (1 - u) * x1 +
          t * (1 - u) * x2 +
          t * u * x3 +
          (1 - t) * u * x4
        );
      }
    const handleInputChange = (event) => {
        //add image
        //doesnt allow more than 4 images to be uploaded to a shirt
        if(images.length > 4){
            return
        }
        const temp = URL.createObjectURL(event.target.files[0]);
        const upImage = new Image();
        upImage.onload = function(){
            var tempSiz = sizes;
            if(this.width > this.height){
                let ratio = this.height/this.width
                tempSiz.push([100,100 * ratio]);
            }
            else{
                let ratio = this.height/this.width
                tempSiz.push([100 * ratio,100]);
            }
            setSizes(tempSiz);
        }
        upImage.src = temp;
        // setImage(upImage);
        var tempImage = images;
        tempImage.push(upImage);
        setImages(tempImage);
        setPointer(pointer+1);
        setNumElements(numElements+1);
        var tempPos = pos;
        tempPos.push([0.5,0.5]);
        setPos(tempPos);
        var tempRot = rots
        tempRot.push(3.1415);
        setRots(tempRot);
        var tempSides = sides
        tempSides.push(true)
        setSides(tempSides)
        setPendingImage(true);
        console.log("Rots: "+ rots);
        // setPI(event.target.files[0]);
      }
    function drawRot(ctx, i) {
    ctx.save();
    let temp;
    if(sides[i]){
        temp = calculateMainCanvasCoordinatesFront(pos[i][0], pos[i][1])
    }
    else{
        temp = calculateMainCanvasCoordinatesBack(pos[i][0], pos[i][1])
    }
    ctx.translate(temp[0], temp[1]);
    ctx.rotate(rots[i]); // Radians are used directly since we already calculated the rotation angle
    ctx.drawImage(images[i], -sizes[i][0] / 2, -sizes[i][1] / 2, sizes[i][0], sizes[i][1]);
    ctx.restore();
}

    const changeLayers = (f, s) =>{
        console.log("changed layers")
        if(f >= 0 && s < images.length ){
            var temp = images;
            var t1 = images[f]
            temp[f] = temp[s]
            temp[s] = t1
            setImages(temp);
            var tempP = pos
            t1 = pos[f]
            tempP[f] = pos[s]
            tempP[s] = t1
            setPos(tempP);
            var tempS = sizes
            t1 = sizes[f]
            tempS[f] =sizes[s]
            tempS[s] = t1
            var tempR = rots;
            t1 = rots[f]
            tempR[f] =rots[s]
            tempR[s] = t1
            setRots(tempR);
        }
        else{
            console.log("action blocked")
        }
    }
    
    useEffect(() =>{
        if(canvas){
            console.log("Rots" + rots);
            const ctx=canvas.current.getContext("2d");
            ctx.clearRect(0, 0, 5000, 5000);
            // ctx.clearRect(0, 0, 2000, 2000);
            
            ctx.fillStyle = shirtColor;
            ctx.fillRect(0, 0, 2000, 2000);
            // ctx.drawImage(shirt,70,0,700,800);
            for(var i = 0; i<numElements; i++){
                drawRot(ctx,i);
                //ctx.drawImage(images[i],pos[i][0],pos[i][1], sizes[i][0], sizes[i][1]);
                // ctx.drawImage(images[i],pos[i][0],pos[i][1], sizes[i][0], sizes[i][1]);
            }
            if (water){
                ctx.drawImage(waterImage,-500,-500,2000,2000);
            }
            set3dmock(canvas.current.toDataURL('image/jpeg',1));
            

        }
    },[top, pos, water, shirtColor, rots, sides])


    const click = ({nativeEvent}) => {
        const x = nativeEvent.offsetX;
        const y = nativeEvent.offsetY;
        for (var i = 0; i<numElements; i++){
            if (x > pos[i][0] && x < pos[i][0]+sizes[i][0]){
                if (y > pos[i][1] && y < pos[i][1]+sizes[i][1]){
                    setPointer(i);
                    console.log("found match: "+i);
                    break;
                }
            }
        }
        
    }

    async function infura(e){
     

    }
//saves the design specs to a file text.txt
//todo: add rotation information
    const designSpecs = () => {
        var str = "Design Details \n";
        console.log("test: "+pos[0][0].toString())
        str = str + "Manufacturer: Visten Co.\n";
        str = str + "Shirt Style: 0x1\n";
        str = str + "Shirt color: "+shirtColor+"\n";
        

        for (var i = 0; i<numElements; i++){
            str = str + "**** NEW IMAGE ****" + "\n";
            str = str + "Image source: " + images[i].src + "\n";
            str = str + "xPos: " + pos[i][0] + "\n";
            str = str +  "yPos: " + pos[i][1] + "\n";
            str = str +  "Width: " + sizes[i][0] + "\n";
            str = str + "Height: " + sizes[i][1] + "\n";
        }

        const priv = 'ead75d17f3748b52b863f9358cdc9646fa6caf66399919d375ea6339639d909a';
        const pub = priv;
        var blob = new Blob(
            [str],
            { type: "text/plain;charset=utf-8" });
        const text = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = text;
        link.download ="text.txt"
        link.click();
        }
    
    return(
        <>
        
        <div id = "fullDesign">
            <Link to ="">
            {scene == 1?
            <div id="rightBackground" onClick={e=>setScene(2)} >
            
                <h1>Done</h1>
        
            </div>
            :null}
            {scene ==3 ?
                <div id="rightBackground" onClick={e=>setScene(4)} >
            
                <h1>Done</h1>
        
            </div>
            :null}
            </Link>
            {/* {scene==1 ?  
                 
            <div id="bottomDesigner1">
                <button onClick={e=>setScene(2)}>Done Editing</button>
            </div>
                    :null} */}
            {scene==1 && images.length>0 &&top>1?
            <div id="rightImage">
                {/* <div id="imgselect"> */}
                <div id="rightImageHeader">
                    <h2>Select Image to Modify</h2>
                </div >
                <div id="imagesCol">
                    {
                        images.map((img, index)=>{
                            const isActive = index === pointer;
                            if (index == images.length-1 && penI){
                                return
                            }
                            return(
                                
                                <div id={isActive?"imgBoxActive":"imgBox"} onClick={e=>setPointer(index)}>
                                    <div id="toggleBox" onClick={e=>{
                                                const temp = sides
                                                let trots = rots
                                                if(temp[index]){
                                                    trots[index] = trots[index] + 3.1415/2
                                                }
                                                else{
                                                    trots[index] = trots[index] - 3.1415/2
                                                }
                                                setRots(trots)
                                                temp[index] = !temp[index]
                                                
                                                setSides(temp)
                                                setTop(top+"1")
                                            }   
                                        }>
                                        {sides[index]? 
                                        <h3>Move to Back</h3>
                                        :<h3>Move to Front</h3>}
                                    </div>
                                    <div id="smallImage">
                                        <img src={img.src} height="100%"width="auto"/>
                                    </div >
                                    <div id="imgNum">
                                        <h3>Size: {parseInt(sizes[index][0])}, {parseInt(sizes[index][1])}</h3>
                                        <h3>Coordinates: {pos[index][0]}, {pos[index][1]} </h3>
                                        <h3>Rotation: {rots[index]}</h3>
                                        <h3>Layer: {index + 1}</h3>
                                    </div>

                                    <div id="changeLayer">
                                        {index > 0 ?
                                            <button onClick ={() =>{
                                                changeLayers(index-1, index);
                                                setTop(top+"1")
                                            }
                                        }>Up</button>
                                        :null}
                                        {index < sizes.length -1 ?
                                        <button onClick ={() =>{
                                            changeLayers(index, index+1)
                                            setTop(top+"1")
                                         } }>Down</button>
                                        :null}
                                    </div>
                                    
                                </div>
                                
                                
                            )
                        })
                    }
                </div >
            {/* </div> */}
           
            </div>
             :null}
              {scene==1?
              <div id="topOfDesign">
                       
                            
                            
                            <label id="uploadLabel">
                            <div id="blueUp">
                            <input type="file" id="cancelUpload" onChange={handleInputChange} accept=".jpeg, .jpg, .png"/>
                                <img id="downimage"width="50px"height="50px"src={uploadImage}/>
                                <h3 id="downtext">Upload Image</h3>
                            </div>
                            </label>
                            { penI ? 
                                <div id="pendingImage">
                                    <ShowHide source={images[pointer].src} /> 
                                    <div id="pendingImageOption">
                                        <button onClick={e=>{setTop(top+"1");setPendingImage(false);}}>Use</button>
                                        <button onClick={e=>{deleteImage();setIPFS(false)}}> Cancel</button>
                                    </div>
                                </div> 
                            : null }           
                        
                        
                   
                    </div>
                    :null}
            {!((scene==1 || scene ==3) && (images.length <= 0 || top <= 1))? 
            <div id="modelBackground">
                {scene==0 ?
             <div id = "scene0">
                <h1>Color Picker</h1>
                        <input id="shirtColorPicker3" type="color" name="head" value={shirtColor} onChange={e=>{setShirtColor(e.target.value)}}/>
                <button onClick={e=>{{setScene(1)};setZCamera(-500);setMove(true)}}>Use Color</button>
            </div>
             : null}

{scene==1 && images.length > 0 && top > 1?
                <> 
                <div id="controlHeader"> 
                    <h2>Manipulate Image</h2>
                </div>
                <div id = "arrowContainer">
                    <div id="arrowContainer2">
                        <div id="topArrows">
                            <div id="topBut" > <img src={arrow} id="botButtonImage" onClick={e=>{
                                    if (pos.length>0){
                                        var temp = pos;
                                        if(temp[pointer][1] > 0.11){
                                            temp[pointer][1] = pos[pointer][1] - 0.1;
                                            setPos(temp);
                                            setTop(top+1);
                                        }
                                        else{
                                            console.log("action blocked")
                                        }
                                    }
                                }}/></div>
                         </div>
                        <div id="botArrows"> 
                        <div className="botBut">
                            <img src={arrow} alt="Arrow" id="botButtonImageLeft" onClick={e=>{
                                    if (pos.length>0){
                                        var temp = pos;
                                        if(temp[pointer][0] > 0.11){
                                            temp[pointer][0] = pos[pointer][0] - 0.1;
                                            setPos(temp);
                                            setTop(top+1);
                                        }
                                        else{
                                            console.log("action blocked")
                                        }
                                    }
                                }}/>
                        </div>
                        <div className="botBut">
                            <img src={arrow} alt="Arrow" id="botButtonImageMiddle" onClick={e=>{
                                    if (pos.length>0){
                                        var temp = pos;
                                        if(temp[pointer][1] < 0.9){
                                            temp[pointer][1] = pos[pointer][1] + 0.1;
                                            setPos(temp);
                                            setTop(top+1);
                                        }
                                        else{
                                            console.log("action blocked")
                                        }
                                    }
                                }}/>
                        </div>
                        <div className="botBut" onClick={e=>{
                                    if (pos.length>0){
                                        var temp = pos;
                                        if(temp[pointer][0] < 0.89){
                                        temp[pointer][0] = pos[pointer][0] + 0.1;
                                        setPos(temp);
                                        setTop(top+1);
                                        }
                                    }
                                    else{
                                        console.log("action blocked")
                                    }
                                }}>
                            <img src={arrow} alt="Arrow" id="botButtonImageRight" />
                        </div>
                        </div>
                    </div>
                   <div id="sizeContainer"> 
                   <button onClick={e=>{
                            if (pos.length>0){
                                var temp = sizes;
                                temp[pointer][0] = temp[pointer][0] * 0.8;
                                temp[pointer][1] = temp[pointer][1] * 0.8;
                                setSizes(temp);
                                setTop(top+1);
                            }
                            }}>Shrink</button>
                        <button onClick={e=>{
                            if (pos.length>0){
                                var temp = sizes;
                                temp[pointer][0] = temp[pointer][0] * 1.2;
                                temp[pointer][1] = temp[pointer][1] * 1.2;
                                setSizes(temp);
                                setTop(top+1);
                            }
                        }}>Enlarge</button>
                   </div>
                    </div>
              
                    <div id="rotationContainer" style={{ height: '20%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
  <h2>Rotate</h2>
  <input type="range" min="0" max="360" onChange={e => changeRot(e.target.value)} />
</div>
                    </>
                : null}

{scene==2?
                   <div>
                      
                    {childData !='' ?
                    //screenshot is deplayed
                        <div >
                            {/* <button href = "/Submit" id="finishDButton" onClick={e=>{
                                    const canvas = document.getElementById("upCanvas");
                                    const image = canvas.toDataURL('image/jpeg',0.9);
                                    infura(image);
                                    console.log(image.src);
                                }}>
                            <h1>Finish Design</h1>
                            <p>Upload to IPFS</p>
                            </button> */}

                            {/* <button >{childData}</button> */}

                   

                                {/* <div>
                                    <h2>Your image:</h2>
                                    <img width="100%"src={childData}/>
                                    <button onClick={e=>{submitPage()}} >Keep Image</button>
                                    <button>Retake</button>
                                </div> */}
                            
                       

                        </div>
                         :
                        <div id="picInstructions">
                            <h2>Take a Picture</h2>
                            <h3>Adjust your view to position the camera</h3>
                            <h3>Press on the character to snap a photo</h3>
                        </div>
                         }  
                    </div>
                : null}    
            </div>
            
            :null}
            <div id="dd2model">
                <InsideDesigner src={threedmock} scene={scene} z={zcamera} move={move} color={shirtColor} parent={setChildData} />
            
            </div>
             {/* Hidden 2-D Canvas for designing */}
                <canvas ref={canvas} id="upCanvas" height="1000px" width="1000px" onMouseDown={click} hidden={true} onClick={(event)=>{
                  
                    const canvasRect = canvas.current.getBoundingClientRect();
                 
                    const clickX = (event.clientX - canvasRect.left) 
                    const clickY = (event.clientY - canvasRect.top) 
                    console.log(clickX, clickY);
                   
                }}><h1>Hello</h1></canvas> 
            </div>
            {childData !== '' && scene == 2 && (
      <div id="popup">
        <div className="popup-content">
          <h2>Are you sure?</h2>
          {/* <img src={childData} alt="Image" className="popup-image" /> */}
          <div id="nftDiv">
           <NFTMaker src={childData} width={0.9}/>
        </div>
          <p>Your additional message here</p>
          <button onClick={e=>{setScene(3)}}>Crop Image</button>
          <button onClick={e=>{
            console.log(scene)
            console.log(childData)
            setChildData('')
          }}>Retake</button>
        </div>
      </div>
    )}
       {childData !== '' && scene > 2 && (
      <div id="popup">
        <div className="popup-content">
          <h2>Are you sure?</h2>
          {/* <img src={childData} alt="Image" className="popup-image" /> */}
          <div id="nftDiv">
           <NFTMaker src={childData} width={0.9} scene={scene}/>
        </div>
          {/* <p>Cutomise the NFT</p>
          <button onClick={e=>{setScene(3)}}>Zoom Out</button>
          <button onClick={e=>{
          }}>Zoom In</button> */}
        </div>
      </div>
    )}
        </>
        
    )
}

export default Designer;