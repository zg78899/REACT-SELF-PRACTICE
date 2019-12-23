import {UPDATE_QUERY,LIKE} from '../actions';

const INITAL_STATE={
  query:'',
  data:{}
}
export default function videos(state=INITAL_STATE,action){
  switch(action.type){
    case UPDATE_QUERY:
      return {
        ...state,
        query:action.query
      }
      case LIKE:
        const video = state.data[action.id];
        return {
          ...state,
          data: {
            ...state.data,
            [action.id ]: {
              count: video ? video.count+1 : 1
            }
          }
        }
      default :
      return state;
  }
}
