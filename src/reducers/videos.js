import { UPDATE_QUERY, LIKE, DISLIKE, COMMENT, DELETE } from '../actions';


const INITAL_STATE = {
  query: '',
  data: {}

}
export default function videos(state = INITAL_STATE, action) {
  switch (action.type) {
    case UPDATE_QUERY:
      return {
        ...state,
        query: action.query
      }

    case LIKE:
      const video = state.data[action.id];
      return {
        ...state,
        data: {
          ...state.data,
          [action.id]: {
            ...video,
            count: video && video.count ?
             video.count + 1 : 1
          }
        }
      }

    case DISLIKE:
      const _data = state.data[action.id];
      return {
        ...state,
        data: {
          ...state.data,
          [action.id]: {
            ..._data,
            dislike: _data && _data.dislike ?
             _data.dislike + 1 : 1
          }
        }
      }
      case COMMENT:
        const _comments=state.data[action.id];
        return {
          ...state,
          data:{
            ...state.data,
            [action.id]:{
              ..._comments,
              comments: _comments && _comments.comments
              ?
              [
                {text:action.val, cid : Math.max(-1,..._comments.comments.map(commet=>commet.cid ))+1 },
              ..._comments.comments
              ]
              :
              [{text:action.val,cid :0}]
            }
          }
        }
        case DELETE:
          const comments_del=state.data[action.id];
          return {
            ...state,
            data:{
              ...state.data,
              [action.id]:{
              comments: comments_del && comments_del.comments.filter(comment=>{
                return comment.cid !== action.commentId
              })
              }
            }

          }

    default:
      return state;
  }
}
