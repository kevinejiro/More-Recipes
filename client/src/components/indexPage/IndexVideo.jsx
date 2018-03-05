import React from 'react';
import Video from '../../assets/vid/covervideo.mp4';

/**
 * @return {JSX} JSX element
 */
function IndexVideo() {
  return (
    <video
      autoPlay
      loop
      muted
      className="video-bg_video"
      poster="#"
    >
      <source src={Video} type="video/mp4" />
    </video>
  );
}
export default IndexVideo;
