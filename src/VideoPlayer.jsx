import React from 'react';
import qs from 'querystring';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { like } from './actions';
import Nav from './component/Nav/Nav';
import SearchBar from './component/SearchBar/SearchBar';
import {withRouter} from 'react-router-dom';


const VideoPlayer = props => {

  const { id } = props.match.params;
  const { v } = qs.parse(props.location.search);
  const _id = id || v;
  if (_id) return null;

  const url = `https://youtube.com/embed/${_id}`;
  
  return (
    <div>
      <Nav>
        <SearchBar onSearchVideos={e => props.history.push(`/results?search=${e}`)} />
      </Nav>
      <iframe src={url} title={_id} />
      <button onClick={() => props.like(_id)}>좋아요!!</button>
      {props.data[_id] && props.data[_id].count ? props.data[_id].count : 0}
    </div>
  )
}
function mapStateToProps(state){
    return {
    data:state.videos.data
    }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({like},dispatch)
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(VideoPlayer));