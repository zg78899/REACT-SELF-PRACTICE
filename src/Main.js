import React from 'react';
import './App.css';
import axios from 'axios';
import Nav from './component/Nav/Nav';
import SearchBar from './component/SearchBar/SearchBar';
import InfiniteScroll from 'react-infinite-scroller';
import uuid from 'uuid';
import { spinner1 } from './component/images/'
import VideoList from './component/VideoList/VideoList';

import qs from 'query-string';
// import qs from 'qs';
// import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateQuery } from './actions';

class Main extends React.Component {
  constructor(props) {
    super(props);
    
    Object.getOwnPropertyNames(Main.prototype).forEach(key => this[key] = this[key].bind(this));
    this.state = {
      videos: [],
      // selectedVideos: null,
      nextPageToken: null
    }
    this.defaultState = this.state;
  }
  
    _getYoutubeData = async (query, isChanged)=> {
    try {
      if (isChanged) {
        this.setState(this.defaultState);
      }
      const { nextPageToken } = this.state;
      const params = {
        key: process.env.REACT_APP_YOUTUBE_API_KEY,
        q: query,
        part: 'snippet',
        maxResults: 10,
        pageToken: nextPageToken
      }
      
      const { data } = await axios.get(`https://www.googleapis.com/youtube/v3/search`, { params });

      console.log(data);
      
      this.setState({
        videos: [...this.state.videos, ...data.items],
        nextPageToken: data.nextPageToken
      });
    }catch(e){}
  }

  getYoutubeData(query) {
    console.log();
    
    let isChanged = false;
    if (this.props.query !== query) {
      isChanged = true;
      this.props.updateQuery(query);
    }
    this._getYoutubeData(query,isChanged);
  }

  componentDidMount() {
    const { props } = this;
    if (props.location) {
      const { search_query } = qs.parse(props.location.search);
      if (search_query) this.getYoutubeData(search_query || '');
    }
  }

  componentDidUpdate(prevProps) {
    const { props } = this;
    if (props.location) {
      console.log(props.location.search);
      
      const { search_query } = qs.parse(props.location.search);
      const { search_query: prev } = qs.parse(prevProps.location.search);
      console.log(search_query, prev);
      if (search_query !== prev) this.getYoutubeData(search_query || '');
    }
  }

  render() {
    return (
      <div>
        <Nav>
          <SearchBar onSearchVideos={e => this.props.history.push(`/results?search_query=${e}`)}/>
        </Nav>
        <InfiniteScroll
          // loadMore={() => this.getYoutubeData(this.props.query)}
          hasMore={!!this.state.nextPageToken && !this.state.selectedVideos}
          loader={
            <div key={uuid.v4()} >
              <img src={spinner1} alt="loading" />
            </div>
          }
        >
          <VideoList
            {...this.state} 
            onVideoSelect={selectedVideos => this.props.history.push(`/watch?v=${selectedVideos}`)}
          />
        </InfiniteScroll>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    query: state.videos.query
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateQuery }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);
