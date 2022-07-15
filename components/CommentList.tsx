import React from 'react';
import { commentList } from '../data/data';
import Comment from './Comment';

const CommentList: React.FC = () => {
  return (
    <ul className="grid gap-4">
      {commentList.map((comment) => (
        <li key={comment.id}>
          <Comment {...comment} />
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
