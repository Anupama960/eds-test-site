export default function decorate(block) {
  const rows = Array.from(block.children);
  if (!rows.length) return;

  // Main container
  const container = document.createElement('div');
  container.className = 'video-playlist';

  // Main video section
  const mainVideoWrapper = document.createElement('div');
  mainVideoWrapper.className = 'main-video';
  const mainVideo = document.createElement('video');
  mainVideo.controls = true;

  // Playlist wrapper
  const playlistWrapper = document.createElement('div');
  playlistWrapper.className = 'playlist';

  rows.forEach((row, index) => {
    const cells = row.querySelectorAll('div');

    // Extract video URL (from text or <a> inside cell)
    const videoUrl = cells[0]?.querySelector('a')?.href || cells[0]?.innerText?.trim();

    // Extract optional placeholder image
    const placeholderImage = cells[1]?.querySelector('img')?.src || '';
    const placeholderAlt = cells[2]?.innerText?.trim() || '';

    if (!videoUrl) return;

    if (index === 0) {
      // First video = main
      mainVideo.src = videoUrl;
      if (placeholderImage) {
        mainVideo.setAttribute('poster', placeholderImage);
      }
      mainVideoWrapper.append(mainVideo);
    } else {
      // Playlist videos
      const thumb = document.createElement('video');
      thumb.className = 'playlist-video';
      thumb.src = videoUrl;
      thumb.muted = true;

      if (placeholderImage) {
        thumb.setAttribute('poster', placeholderImage);
      }
      if (placeholderAlt) {
        thumb.setAttribute('alt', placeholderAlt);
      }

      thumb.addEventListener('click', () => {
        mainVideo.src = videoUrl;
        if (placeholderImage) {
          mainVideo.setAttribute('poster', placeholderImage);
        } else {
          mainVideo.removeAttribute('poster');
        }
        mainVideo.play();
      });

      playlistWrapper.append(thumb);
    }
  });

  container.append(mainVideoWrapper, playlistWrapper);

  // Replace original block content
  block.textContent = '';
  block.append(container);
}
