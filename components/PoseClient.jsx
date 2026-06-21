//src/components/PoseClient.jsx
// src/components/PoseClient.jsx
"use client";

import React, { useEffect, useRef, useState } from 'react';


const playAudio = (direction) => {
  let audioFile = null;

  switch (direction) {
    case 'yana hareket':
      audioFile = '/audio/solahareket.mp3';
      break;
    case 'sağa hareket':
      audioFile = '/audio/sagahareket.mp3';
      break;
    case 'sola hareket':
      audioFile = '/audio/sagahareket.mp3';
      break;
    case 'öne hareket':
      audioFile = '/audio/arkayahareket.mp3';
      break;
    default:
      return;
  }

  const audio = new Audio(audioFile);
  audio.play();
};


export default function PoseClient() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [movementDirection, setMovementDirection] = useState(null);
  const [error, setError] = useState(null);
  const previousPoseRef = useRef(null);
  const detectorRef = useRef(null);

  // Hareket yönünü tespit eden fonksiyon
  const detectMovementDirection = (prevPose, currentPose) => {
  if (!prevPose || !currentPose) return null;

  try {
    const nosePrev = prevPose.keypoints.find(k => k.name === 'nose');
    const noseCurrent = currentPose.keypoints.find(k => k.name === 'nose');

    if (!nosePrev || !noseCurrent || nosePrev.score < 0.3 || noseCurrent.score < 0.3) {
      return 'hareket yok';
    }

    const xChange = noseCurrent.x - nosePrev.x;

    const leftShoulder = currentPose.keypoints.find(k => k.name === 'left_shoulder');
    const rightShoulder = currentPose.keypoints.find(k => k.name === 'right_shoulder');
    const leftHip = currentPose.keypoints.find(k => k.name === 'left_hip');
    const rightHip = currentPose.keypoints.find(k => k.name === 'right_hip');

    if (leftShoulder && rightShoulder && leftShoulder.score > 0.3 && rightShoulder.score > 0.3) {
      const shoulderSlope = Math.abs(leftShoulder.y - rightShoulder.y);
      const shoulderDistance = Math.abs(leftShoulder.x - rightShoulder.x);

      // Yan durma tespiti
      if (shoulderSlope < shoulderDistance * 0.3) {
        if (xChange > 4) return 'arkaya hareket';
        if (xChange < -4) return 'öne hareket';
      } else {
        // Burun ile kalça arasındaki dikey mesafe
        const avgHipY = (leftHip?.y + rightHip?.y) / 2 || null;
        if (avgHipY) {
          const prevNoseY = nosePrev.y;
          const currentNoseY = noseCurrent.y;
          const noseToHipChange = currentNoseY - prevNoseY;

          if (Math.abs(noseToHipChange) > 8) {
            return noseToHipChange > 0 ? 'öne hareket' : 'arkaya hareket';
          }
        }
      }
    }

    return 'hareket yok';
  } catch (error) {
    console.error('Movement detection error:', error);
    return 'tespit hatası';
  }
};


  useEffect(() => {
    let mounted = true;
    let rafId = null;
    let stream = null;
    let lastDetectionTime = 0;

    const init = async () => {
      if (typeof window === 'undefined' || !mounted) return;

      try {
        setError(null);
        
        // TensorFlow.js ve pose-detection'ı ayrı ayrı import et
const tf = await import('@tensorflow/tfjs'); // ✅ Doğru paket
await import('@tensorflow/tfjs-backend-webgl'); // sadece backend'i yükler
await tf.setBackend('webgl'); // ✅ Doğru çağrı
await tf.ready();


const poseDetection = await import('@tensorflow-models/pose-detection'); // ✅ model burada


        // Kamera erişimini başlat
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: 'user' // Ön kamera
          } 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.playsInline = true;
          videoRef.current.muted = true;
          
          // Video yüklendikten sonra oynat
          await new Promise((resolve) => {
            videoRef.current.onloadedmetadata = resolve;
          });
          await videoRef.current.play();
        }

        // MoveNet detector oluştur
        detectorRef.current = await poseDetection.createDetector(
          poseDetection.SupportedModels.MoveNet,
          {
            modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
          }
        );

        setIsModelLoaded(true);

        // Pose estimation döngüsü
const detectPose = async () => {
  if (!mounted || !detectorRef.current || !videoRef.current) return;

  try {
    const poses = await detectorRef.current.estimatePoses(videoRef.current);

    if (canvasRef.current && poses.length > 0) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      const currentPose = poses[0];
      const keypoints = currentPose.keypoints.filter(kp => kp.score > 0.2);

      keypoints.forEach(kp => {
        ctx.beginPath();
        ctx.arc(kp.x, kp.y, 4, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();

        ctx.fillStyle = 'white';
        ctx.font = '10px Arial';
        ctx.fillText(kp.name, kp.x + 5, kp.y - 5);
      });

      // 🔁 Hareket yönü tespiti sadece belli aralıklarla yapılır
      const now = Date.now();
if (previousPoseRef.current && now - lastDetectionTime > 800) {
  const direction = detectMovementDirection(previousPoseRef.current, currentPose);
  setMovementDirection(direction);
  playAudio(direction); // ✅ sesli geri bildirim
  lastDetectionTime = now;
}


      previousPoseRef.current = currentPose;
    } else if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  } catch (error) {
    console.error('Pose estimation error:', error);
  }

  if (mounted) {
    rafId = requestAnimationFrame(detectPose);
  }
};

        detectPose();

      } catch (error) {
        console.error('Initialization error:', error);
        setError(`Başlatma hatası: ${error.message}`);
      }
    };

    init();

    // Temizlik fonksiyonu
    return () => {
      mounted = false;
      if (rafId) cancelAnimationFrame(rafId);
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (detectorRef.current && detectorRef.current.dispose) {
        detectorRef.current.dispose();
      }
    };
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <video
          ref={videoRef}
          width="640"
          height="480"
          style={{ 
            display: 'block', 
            transform: 'scaleX(-1)',
            backgroundColor: '#000',
            borderRadius: '8px'
          }}
          muted
          playsInline
        />
        <canvas
          ref={canvasRef}
          width="640"
          height="480"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            pointerEvents: 'none',
            transform: 'scaleX(-1)',
            borderRadius: '8px'
          }}
        />
      </div>
      
      <div style={{ marginTop: '20px', fontSize: '18px' }}>
        {error ? (
          <div style={{ color: 'red', padding: '10px', backgroundColor: '#ffe6e6', borderRadius: '4px' }}>
            <h3>Hata:</h3>
            <p>{error}</p>
            <p>Lütfen kamera erişimine izin verdiğinizden ve HTTPS bağlantısı kullandığınızdan emin olun.</p>
          </div>
        ) : !isModelLoaded ? (
          <div style={{ padding: '20px' }}>
            <div>Model yükleniyor...</div>
            <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
              TensorFlow.js ve MoveNet modeli yükleniyor, lütfen bekleyin.
            </div>
          </div>
        ) : (
          <div style={{ 
            padding: '15px', 
            backgroundColor: '#f0f8ff', 
            borderRadius: '8px',
            marginTop: '15px'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#0066cc' }}>
              Hareket Yönü: 
              <span style={{ 
                color: movementDirection === 'hareket yok' ? '#666' : '#0066cc',
                fontWeight: 'bold',
                marginLeft: '5px'
              }}>
                {movementDirection || 'Tespit ediliyor...'}
              </span>
            </h3>
            <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
              Kameranın karşısında yan durun ve hareket edin.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}