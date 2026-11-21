import React, { useEffect, useRef, useState } from 'react';
import './TryOnPreview.css';

const shadeColors = {
  'ruby red': '#b20f38',
  'nude blush': '#b96c72',
  'coral kiss': '#ee705f',
  'berry bold': '#7f1744',
  'classic pink': '#d95782',
  'clear shine': '#e88e9b',
  'pink candy': '#ed7198',
  'berry pop': '#a32662',
  'coral fizz': '#ed775d',
  black: '#29222a',
  'brown black': '#49332e',
  ivory: '#d9b99c',
  sand: '#c69a77',
  honey: '#ad7951',
  caramel: '#8e5c3e',
  espresso: '#64402e',
  fair: '#e5c7aa',
  light: '#d4a985',
  medium: '#b9835d',
  tan: '#986443',
};

function TryOnPreview({ product, shade }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [error, setError] = useState('');
  const [position, setPosition] = useState(50);
  const [size, setSize] = useState(50);
  const overlayType = product.category === 'Lips'
    ? 'lips'
    : product.category === 'Eyes'
      ? 'eyes'
      : 'cheeks';
  const color = shadeColors[(shade || '').toLowerCase()] || '#a83254';

  useEffect(() => () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
  }, []);

  const startCamera = async () => {
    setError('');
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError('Camera access is not available in this browser. Try a current browser over HTTPS or localhost.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { facingMode: 'user' },
      });
      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      setCameraActive(true);
    } catch (cameraError) {
      setError(cameraError.name === 'NotAllowedError'
        ? 'Camera permission was denied. Allow camera access in your browser settings and try again.'
        : 'Could not start the camera. Check that it is connected and not being used by another app.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraActive(false);
  };

  return (
    <section className="try-on-panel" aria-label="Virtual try-on">
      <div className="try-on-heading">
        <div>
          <h3>Try it on</h3>
          <p>Preview {product.name}{shade ? ` in ${shade}` : ''} with your camera.</p>
        </div>
        {cameraActive && (
          <button type="button" className="try-on-stop" onClick={stopCamera}>Turn camera off</button>
        )}
      </div>

      <div className="try-on-camera">
        <video ref={videoRef} className="try-on-video" autoPlay muted playsInline />
        {!cameraActive ? (
          <div className="try-on-placeholder">
            <span className="try-on-camera-icon" aria-hidden="true">◎</span>
            <p>Your camera preview stays on this device.</p>
            <button type="button" className="btn-primary" onClick={startCamera}>Enable camera</button>
          </div>
        ) : (
          <div
            className={`try-on-overlay try-on-${overlayType}`}
            style={{
              '--try-on-color': color,
              '--try-on-top': `${position}%`,
              '--try-on-scale': 0.7 + size / 100,
            }}
            aria-hidden="true"
          >
            {overlayType === 'lips' && (
              <svg viewBox="0 0 120 56" role="presentation">
                <path d="M5 27 Q20 20 38 13 Q50 8 60 17 Q70 8 82 13 Q100 20 115 27 Q99 31 84 43 Q70 53 60 43 Q50 53 36 43 Q21 32 5 27Z" />
                <path className="try-on-lip-cut" d="M7 27 Q28 26 43 20 Q53 17 60 22 Q67 17 77 20 Q93 26 113 27 Q94 31 78 30 Q68 29 60 33 Q52 29 42 30 Q25 31 7 27Z" />
              </svg>
            )}
            {overlayType === 'eyes' && (
              <svg viewBox="0 0 180 52" role="presentation">
                <path d="M5 30 Q35 5 75 28 Q40 49 5 30Z M105 28 Q145 5 175 30 Q140 49 105 28Z" />
                <path className="try-on-eye-line" d="M5 30 Q38 3 75 28 M105 28 Q142 3 175 30" />
              </svg>
            )}
            {overlayType === 'cheeks' && (
              <>
                <span className="try-on-cheek left" />
                <span className="try-on-cheek right" />
              </>
            )}
          </div>
        )}
        {cameraActive && <div className="try-on-guide">Center your face in the frame</div>}
      </div>

      {cameraActive && (
        <div className="try-on-controls">
          <label>
            Position
            <input type="range" min="38" max="72" value={position} onChange={event => setPosition(Number(event.target.value))} />
          </label>
          <label>
            Size
            <input type="range" min="20" max="80" value={size} onChange={event => setSize(Number(event.target.value))} />
          </label>
        </div>
      )}
      <p className="try-on-note">Visual preview only; placement is adjustable and does not track facial movement. Video is not recorded or uploaded.</p>
      {error && <p className="try-on-error" role="alert">{error}</p>}
    </section>
  );
}

export default TryOnPreview;
