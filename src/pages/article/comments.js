import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { addComment } from '../../actions/comments';

const Comment = ({ item }) => {
  const { date, text } = item;

  return (
    <li className="list-group-item">
      <span>{`${date} -> ${text}`}</span>
    </li>
  );
};

const Comments = ({ comments, dispatch }) => {
  const textArea = useRef();
  const { id } = useParams();

  const handleAddComment = () => {
    if (!textArea.current.value.length) {
      return;
    }

    dispatch(addComment(id, textArea.current.value));

    textArea.current.value = '';
  };

  return (
    <div className="mt-5">
      <div className="row">
        <div className="col-12">
          <h4>Add Comment</h4>
          <form>
            <div className="mb-3">
              <textarea ref={textArea} className="form-control" id="sendcomment" rows="3" />
            </div>
            <div className="mb-3">
              <button type="button" onClick={handleAddComment} className="btn btn-primary">Add Comment</button>
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <h4>View comments</h4>
        </div>
        <div className="col-12">
          <ul className="list-group">
            {comments.map((item) => <Comment key={item.date} item={item} />)}
          </ul>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  comments: state.comments[0].comments
});

export default connect(mapStateToProps)(Comments);
