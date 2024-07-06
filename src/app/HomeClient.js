'use client'

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import VideoRecorder from '@/components/VideoRecorder';
import { shareToTikTok } from '@/utils/shareToTikTok';

export default function HomeClient() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  const handleRecordingComplete = async (blob) => {
    setRecordedBlob(blob);
    setFeedback("Great job on recording your daily experience!");
  };

  const handleDownload = () => {
    const url = URL.createObjectURL(recordedBlob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'daily_video.webm';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    try {
      await shareToTikTok(recordedBlob, session.accessToken);
      alert('Video shared successfully to TikTok!');
    } catch (error) {
      alert('Failed to share video to TikTok. Please try again.');
    }
  };

  return (
    <div>
      <h1>Welcome, {session.user.name}</h1>
      <button onClick={() => signOut()}>Sign out</button>
      
      <h2>Daily Video Journal</h2>
      <VideoRecorder onRecordingComplete={handleRecordingComplete} />
      {recordedBlob && (
        <div>
          <h3>Your recorded video:</h3>
          <video src={URL.createObjectURL(recordedBlob)} controls />
          <button onClick={handleDownload}>Download</button>
          <button onClick={handleShare}>Share to TikTok</button>
        </div>
      )}
      {feedback && (
        <div>
          <h3>AI Feedback:</h3>
          <p>{feedback}</p>
        </div>
      )}
      {(recordedBlob || feedback) && (
        <button onClick={() => window.location.reload()}>End Session</button>
      )}
    </div>
  );
}