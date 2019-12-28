import React, { useEffect,useState } from 'react';
import qs from 'query-string';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { like, dislike,comment ,del} from './actions';
import Nav from './component/Nav/Nav';
import SearchBar from './component/SearchBar/SearchBar';
import { withRouter } from 'react-router-dom';
import uuid from 'uuid';
import axios from 'axios';
import { log } from 'util';


const VideoPlayer = props => {

  

  const { id } = props.match.params;
  const { v } = qs.parse(props.location.search);
  const _id = id || v;


  if (!_id) return null;
  const url = `https://youtube.com/embed/${_id}`;
  const[ videoInfo,setVideoInfo]=useState({});

  async function getYoutubeVideoData(_id){
    const params={
      key:process.env.REACT_APP_YOUTUBE_API_KEY,
      part:'snippet,statistics',
      id:_id,
    };
    const {data}=await axios.get('https://www.googleapis.com/youtube/v3/videos',{params});
    setVideoInfo({...data.items[0]});
  }
 useEffect(()=>{
  getYoutubeVideoData(_id);
 },[]);
 console.log(videoInfo);
 
  
  let text;
  let cid=0;
  return(
    <div>
      <Nav>
        <SearchBar onSearchVideos={e => props.history.push(`/results?search_query=${e}`)} />
      </Nav>
      <iframe src={url} title={_id} />
      <button onClick={() => props.like(_id)}>
      <yt-icon class="style-scope ytd-toggle-button-renderer">
      <svg 
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
      className="style-scope yt-icon"
      style={{
          pointerEvents: "none",
          display: "block",
          width: "20px",
          height: "20px"}}>
        <g class="style-scope yt-icon">
         <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57
         .03-.32c0-.41-
          .17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0
          1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.
          47.14-.73v-1.91l-.01-.01L23 10z"
           class="style-scope yt-icon">
           </path>
       </g>
      </svg>
  </yt-icon>
      </button>
      {props.data[_id] && props.data[_id].count ? props.data[_id].count : 0}

      <button onClick={() => props.dislike(_id)}>싫어요!!</button>
      {props.data[_id] && props.data[_id].dislike ? props.data[_id].dislike  : 0 }

      <textarea ref={ref=>text=ref}/><button onClick={()=>props.comment(_id,text.value,cid)}>등록</button>
      
        {props.data[_id]&& props.data[_id].comments && props.data[_id].comments.map((comment)=>
          <div key={uuid.v4()}>{comment.text}<button onClick={()=>props.del(_id, comment.cid)}>삭제</button></div>)}

    </div>
  )
}
function mapStateToProps(state) {
  return {
    data: state.videos.data
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ like, dislike,comment,del}, dispatch)
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VideoPlayer));


