export default function decorate(block) {
  const videoLinks = Array.from(block.querySelectorAll('a')).map(a => a.href);

  if (!videoLinks.length) return;

  const [mainVideoUrl, ...otherVideos] = videoLinks;

  // Create container structure
  const container = document.createElement('div');
  container.className = 'video-gallery';

  const mainVideoWrapper = document.createElement('div');
  mainVideoWrapper.className = 'main-video';

  const playlistWrapper = document.createElement('div');
  playlistWrapper.className = 'video-playlist';

  // Utility: Create video or iframe
  const createVideoElement = (url, isThumbnail = false) => {
if (url.includes('youtube') || url.includes('youtu.be')) {
      const iframe = document.createElement('iframe');
iframe.src = `https://www.youtube.com/embed/${extractYouTubeId(url)}?rel=0`;
      iframe.frameBorder = '0';
      iframe.allow = 'autoplay; fullscreen; picture-in-picture';
      iframe.loading = 'lazy';
      iframe.className = isThumbnail ? 'thumbnail' : 'main-video-frame';
      return iframe;
    } else if (url.includes('vimeo')) {
      const iframe = document.createElement('iframe');
iframe.src = `https://player.vimeo.com/video/${extractVimeoId(url)}`;
      iframe.frameBorder = '0';
      iframe.allow = 'autoplay; fullscreen; picture-in-picture';
      iframe.loading = 'lazy';
      iframe.className = isThumbnail ? 'thumbnail' : 'main-video-frame';
      return iframe;
    } else {
      const video = document.createElement('video');
      video.src = url;
      video.controls = true;
      video.className = isThumbnail ? 'thumbnail' : 'main-video-frame';
      if (isThumbnail) {
        video.muted = true;
        video.playsInline = true;
        video.preload = 'metadata';
      }
      return video;
    }
  };

  // Extract YouTube ID
  const extractYouTubeId = (url) => {
    const regex = /(?:youtube\.com.*v=|youtu\.be\/)([^&]+)/;
    const match = url.match(regex);
    return match ? match[1] : '';
  };

  // Extract Vimeo ID
  const extractVimeoId = (url) => {
    const regex = /vimeo\.com\/(\d+)/;
    const match = url.match(regex);
    return match ? match[1] : '';
  };

  // Main video element
  let mainVideo = createVideoElement(mainVideoUrl);
  mainVideoWrapper.appendChild(mainVideo);

  // Playlist thumbnails
  otherVideos.forEach((videoUrl) => {
    const thumbWrapper = document.createElement('div');
    thumbWrapper.className = 'playlist-item';

    const thumb = createVideoElement(videoUrl, true);
    thumbWrapper.appendChild(thumb);

    thumbWrapper.addEventListener('click', () => {
      mainVideoWrapper.innerHTML = '';
      mainVideo = createVideoElement(videoUrl);
      mainVideoWrapper.appendChild(mainVideo);
    });

    playlistWrapper.appendChild(thumbWrapper);
  });

  container.append(mainVideoWrapper, playlistWrapper);

  block.innerHTML = '';
  block.append(container);
}
