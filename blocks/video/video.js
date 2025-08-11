export default function decorate(block) {
  // Get the value of the 'video' data attribute from the block
  const assetUrl = block.dataset.video?.trim();
  
  // If no URL was provided, show a fallback message
  if (!assetUrl) {
    block.innerHTML = '<p>No video selected</p>';
    return;
  }
 
  let embedHTML = '';
 
  // If the URL contains 'vimeo.com', treat it as a Vimeo embed
  if (assetUrl.includes('vimeo.com')) {
    const videoIdMatch = assetUrl.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
 
    if (videoId) {
      embedHTML = `
        <iframe src="https://player.vimeo.com/video/${videoId}"
          width="640" height="360" frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen></iframe>
      `;
    } else {
      embedHTML = '<p>Invalid Vimeo URL</p>';
    }
  } else {
    // Otherwise, assume it's a direct AEM DAM video URL
    embedHTML = `<video controls width="640" height="360">
                   <source src="${assetUrl}" type="video/mp4">
                   Your browser does not support the video tag.
                 </video>`;
  }
 
  // Finally, set the block's inner HTML to the embed
  block.innerHTML = embedHTML;
}
 