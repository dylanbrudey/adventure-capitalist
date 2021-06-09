export const actionsType = {
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT'
};

export const addComment = (id, text) => ({
  type: actionsType.ADD_COMMENT,
  id,
  text
});
