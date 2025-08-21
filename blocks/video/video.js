export default function decorate(block) {
  const videoURL = block.children[0]?.textContent?.trim();

  if (!videoURL) {
    block.textContent = "No video URL provided";
    return;
  }

  // Clear block content
  block.innerHTML = "";

  // Create video container
  const container = document.createElement('div');
  container.id = 'video-1';
  block.appendChild(container);

  // Dynamically load Vimeo API
  const script = document.createElement('script');
  script.src = 'https://player.vimeo.com/api/player.js';
  script.onload = () => {
    const player = new Vimeo.Player(container, {
      url: videoURL,
      width: 640,
    });

    player.on('play', () => {});
  };
  document.head.appendChild(script);
}
