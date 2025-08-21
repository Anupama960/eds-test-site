export default function decorate(block) {
  const videoURL = block.children[0]?.textContent?.trim();
  if (videoURL) {
    const htmlVideoElement = document.createElement('div');
    htmlVideoElement.setAttribute('data-vimeo-url', videoURL);
    // htmlVideoElement.setAttribute('data-vimeo-width', '457');
    // htmlVideoElement.setAttribute('data-vimeo-height', '259px');
    htmlVideoElement.setAttribute('id', 'video-1');

    block.append(htmlVideoElement);

    // eslint-disable-next-line no-restricted-globals
    addEventListener('DOMContentLoaded', () => {
      const videoContainer = document.querySelector('#video-1');
      // eslint-disable-next-line no-undef
      const player = new Vimeo.Player(videoContainer);

      player.on('play', () => {
        // eslint-disable-next-line no-console
        console.log('Played the video');
      });
    });
  }
}
