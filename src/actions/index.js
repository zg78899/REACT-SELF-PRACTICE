export const UPDATE_QUERY ='UPDATE_QUERY';
export const LIKE='LIKE';

export function updateQuery(query){
return ({type:UPDATE_QUERY,query})
};
export function like(id){
  return ({type:LIKE,id})
};
