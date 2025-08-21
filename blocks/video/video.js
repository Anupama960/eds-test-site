export default function decorate(block) {
  const videoUrl = block.textContent.trim(); // Assume block has Vimeo URL
  block.textContent = '';

  const iframe = document.createElement('iframe');
  iframe.src = videoUrl.replace('vimeo.com/', 'player.vimeo.com/video/');
  iframe.width = '640';
  iframe.height = '360';

  iframe.allow = 'autoplay; fullscreen; picture-in-picture';
  iframe.allowFullscreen = true;

  block.appendChild(iframe);

  // Initialize Vimeo player
  const player = new Vimeo.Player(iframe);
  player.on('play', () => {
    console.log('Played the video');
  });
}
