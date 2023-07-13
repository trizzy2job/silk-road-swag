import { useEffect, useRef, useState } from 'react';
import './nftmaker.css';
export default function NFTMaker(props) {
  const canvasRef = useRef(null);
  const [translation, setTranslation] = useState({ translateX: 0, translateY: 0 });
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const image = new Image();
    image.src = props.src;

    image.onload = () => {
      const aspectRatio = image.width / image.height;
      const canvasParent = canvas.parentElement;
      const canvasWidth = canvasParent.clientWidth;
      const canvasHeight = canvasWidth / aspectRatio;

      // Calculate the zoomed width and height
      const zoomedWidth = canvasWidth * zoom;
      const zoomedHeight = canvasHeight * zoom;

      // Calculate the translation offsets
      const translateX = (zoomedWidth - canvasWidth) / 2;
      const translateY = (zoomedHeight - canvasHeight) / 2;

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      // Apply the zoom and translation
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        image,
        -translateX + translation.translateX,
        -translateY + translation.translateY,
        zoomedWidth,
        zoomedHeight
      );
    };
  }, [props.src, translation, zoom]);

  const handleTranslation = (dx, dy) => {
    setTranslation(prevTranslation => ({
      translateX: prevTranslation.translateX + dx,
      translateY: prevTranslation.translateY + dy
    }));
  };

  const handleZoomOut = () => {
    setZoom(prevZoom => (prevZoom > 0.5 ? prevZoom - 0.1 : prevZoom));
  };

  const handleZoomIn = () => {
    setZoom(prevZoom => prevZoom + 0.1);
  };


   

  useEffect(() => {
    if(props.scene ==4){
        const canvas = canvasRef.current;
        const dataURL = canvas.toDataURL(); // Capture canvas as a base64-encoded image
        sessionStorage.setItem('designSubmission', dataURL);
        // sessionStorage.setItem('mapSubmission', dataURL);
        window.location.href = "../Submit"
    }
  },[props.scene])

  return (
    <div id="nftmaker">
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
      {props.scene == 3?
      <>
        <div id="nftButtons">
            <div id="nftarrows">
                <div id="nftUp">
                    <button onClick={() => handleTranslation(0, 10)}>Up</button>
                </div>
                <div id="nftDown">
                    <button onClick={() => handleTranslation(10, 0)}>Left</button>
                    <button onClick={() => handleTranslation(0, -10)}>Down</button>
                    <button onClick={() => handleTranslation(-10, 0)}>Right</button>
                </div>
            </div>
            <div id="nftzoom">
                <button onClick={handleZoomOut}>Zoom Out</button>
                <button onClick={handleZoomIn}>Zoom In</button>
            </div>
        </div>
        </>
      : null }
    </div>

  );
}
