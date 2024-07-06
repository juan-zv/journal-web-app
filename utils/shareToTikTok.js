export async function shareToTikTok(videoBlob, accessToken) {
    const formData = new FormData();
    formData.append('video', videoBlob, 'video.mp4');
  
    try {
      const response = await fetch('https://open-api.tiktok.com/share/video/upload/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Failed to upload video to TikTok');
      }
  
      const result = await response.json();
      console.log('Video shared successfully:', result);
      return result;
    } catch (error) {
      console.error('Error sharing video to TikTok:', error);
      throw error;
    }
  }