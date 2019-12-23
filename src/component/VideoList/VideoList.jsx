import React from 'react';
import uuid from 'uuid';
import VideoListItem from './VideoListItem';

const VideoList=props=>{

  const videos = props.videos.map(video => <VideoListItem {...video} key={uuid.v4()} onVideoSelect={props.onVideoSelect}/>)
  return (
    <div>
      <ul>
        {videos}
      </ul>
    </div>

  )

}
export default VideoList;
