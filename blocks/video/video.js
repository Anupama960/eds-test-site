export default function decorate(block) {
  const videoURL = block.children[0]?.textContent?.trim();

  if (videoURL) {
    // Create container div for Vimeo player
    const htmlVideoElement = document.createElement('div');
    htmlVideoElement.setAttribute('data-vimeo-url', videoURL);
    htmlVideoElement.setAttribute('id', 'video-1');
    block.append(htmlVideoElement);

    // Load Vimeo Player once DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
      const videoContainer = document.querySelector('#video-1');
      if (videoContainer) {
        // Initialize Vimeo Player
        const player = new Vimeo.Player(videoContainer);

        player.on('play', () => {});

        player.on('pause', () => {});

        player.on('ended', () => {});
      }
    });
  } else {
    block.textContent = 'No Vimeo URL provided';
  }
}
