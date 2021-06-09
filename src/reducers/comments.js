import { actionsType } from '../actions/comments';

const initalState = [{
  comments: []
}, {
  comments: []
}];

const addComment = (state, action) => {
  const commentsUpdated = state;
  const date = new Date();

  const newComments = state[action.id].comments.concat({
    date: date.toUTCString(),
    text: action.text
  });

  commentsUpdated[action.id].comments = newComments;

  return commentsUpdated;
};

const comments = (state = initalState, action) => {
  switch (action.type) {
    case actionsType.ADD_COMMENT:
      return addComment(state, action);
    default:
      return state;
  }
};

export default comments;
