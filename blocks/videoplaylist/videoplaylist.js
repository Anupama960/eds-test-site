export default function decorate(block) {
  const videos = Array.from(block.querySelectorAll('a')); // EDS stores DAM refs as links

  if (!videos.length) return;

  // Main container
  const container = document.createElement('div');
  container.className = 'videoplaylist';

  // Main video section
  const mainVideoWrapper = document.createElement('div');
  mainVideoWrapper.className = 'main-video';
  const mainVideo = document.createElement('video');
  mainVideo.controls = true;
  mainVideo.src = videos[0].href; // first video
  mainVideoWrapper.append(mainVideo);

  // Playlist (right side)
  const playlistWrapper = document.createElement('div');
  playlistWrapper.className = 'playlist';

  videos.forEach((link, index) => {
    if(index === 0) return;
    const thumb = document.createElement('video');
    thumb.className = 'playlist-video';
    thumb.src = link.href;
    thumb.muted = true;

    // Change main video on click
    thumb.addEventListener('click', () => {
      mainVideo.src = link.href;
      mainVideo.play();
    });

    playlistWrapper.append(thumb);

    // remove links from DOM after processing
  });

  container.append(mainVideoWrapper, playlistWrapper);

  // replace block content
  block.textContent = '';
  block.append(container);
}
