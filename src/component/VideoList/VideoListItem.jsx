import React from 'react';


const VideoLsitItem=props=>{
  // console.log(props);
  const VideoData={
    title:props.snippet.title,
    img:props.snippet.thumbnails.medium.url,
    channel:props.snippet.channelTitle,
    id:props.id.videoId,
  }


return (
  <div>
    <li onClick={()=>props.onVideoSelect(VideoData.id)}>
      <img src={VideoData.img} alt='thumbnails'/>
        <span>{VideoData.title}</span>
        <small>{VideoData.channel}</small>
    </li>
  </div>
)
}
export default VideoLsitItem;