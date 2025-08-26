// export default function decorate(block) {
//   const links = Array.from(block.querySelectorAll('a'));

//   if (!links.length) {
//     return;
//   }

//   // Create containers
//   const mainContainer = document.createElement('div');
//   mainContainer.className = 'gallery-main-video';

//   const thumbContainer = document.createElement('div');
//   thumbContainer.className = 'gallery-thumbnails';

//   block.innerHTML = '';
//   block.append(mainContainer, thumbContainer);

//   // Function to embed DAM video
//   function embedDAMVideo(url) {
//     const video = document.createElement('video');
//     video.src = url;
//     video.controls = true;
//     video.width = 640;
//     video.height = 360;
//     return video;
//   }

//   // Show first video in main container
//   const firstLink = links[0];
//   const firstVideo = embedDAMVideo(firstLink.href);
//   mainContainer.append(firstVideo);

//   // Create thumbnails for rest
//   links.forEach((link, index) => {
//     const thumbVideo = embedDAMVideo(link.href);
//     thumbVideo.width = 160;
//     thumbVideo.height = 90;
//     thumbVideo.muted = true;
//     thumbVideo.playsInline = true;

//     // When thumbnail clicked → replace main video
//     thumbVideo.addEventListener('click', () => {
//       mainContainer.innerHTML = '';
//       const newMainVideo = embedDAMVideo(link.href);
//       mainContainer.append(newMainVideo);
//     });

//     // Skip showing first video again in thumbnails
//     if (index > 0) {
//       thumbContainer.append(thumbVideo);
//     }
//   });
// }
