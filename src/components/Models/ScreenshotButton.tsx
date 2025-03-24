import { useThree } from '@react-three/fiber';

function ScreenshotButton() {
  const { gl, scene, camera } = useThree();

  const handleScreenshot = () => {
    // Render the scene
    gl.render(scene, camera);
    // Convert the canvas to a data URL
    const dataUrl = gl.domElement.toDataURL('image/png');
    // Create a link element to download the image
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'screenshot.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button onClick={handleScreenshot} style={{ position: 'absolute', top: 20, right: 20 }}>
      Capture Screenshot
    </button>
  );
}

export default ScreenshotButton;
