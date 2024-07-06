'use client'

import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';

const VideoRecorder = ({ onRecordingComplete }) => {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [countdown, setCountdown] = useState(60);

  const startRecording = useCallback(() => {
    setIsRecording(true);
    setCountdown(60);
    
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm"
    });
    
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();

    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer);
          stopRecording();
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
  }, [webcamRef, setIsRecording, mediaRecorderRef]);

  const stopRecording = useCallback(() => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  }, [mediaRecorderRef, setIsRecording]);

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        onRecordingComplete(data);
      }
    },
    [onRecordingComplete]
  );

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        width={640}
        height={480}
      />
      {isRecording ? (
        <div>Recording: {countdown}s</div>
      ) : (
        <button onClick={startRecording}>Start Recording</button>
      )}
    </div>
  );
};

export default VideoRecorder;