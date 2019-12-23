import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {updateQuery} from '../../actions';


const SearchBar =props =>{
  const handEnter=search=>e=>{
    if(e.key === 'Enter'){
      search(e.target.value);
    }
  }
  // console.log(props)
  let input;
  return (
    <div>
      <input
      ref={ref=>(input=ref)}
      type="search"
      defaultValue={ props.query || '' }
      placeholder="검색어를 입력하세요."
      // onChange={e=>props.onSearchVideos(e.target.value)}
      onKeyPress={handEnter(props.onSearchVideos)}/>
      <button onClick={()=>props.onSearchVideos(input.value)}>
      </button>
      <hr/>
    </div>
  )
}
function mapStateToProps(state){
  return {
    query:state.videos.query
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({updateQuery},dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(SearchBar);
