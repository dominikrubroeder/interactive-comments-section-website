import React, { useContext } from 'react';
import Comment from './Comment';
import { CommentsContext } from '../store/commentsContext';

const CommentList: React.FC = () => {
  const commentCtx = useContext(CommentsContext);

  return (
    <ul className="grid gap-4 p-4">
      {commentCtx?.comments.map((comment) => (
        <li key={comment.id}>
          <Comment {...comment} />
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
