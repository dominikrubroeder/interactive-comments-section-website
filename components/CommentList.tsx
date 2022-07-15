import React from 'react';
import { commentList } from '../data/data';
import Comment from './Comment';

const CommentList: React.FC = () => {
  return (
    <ul>
      {commentList.map((comment) => (
        <li key={comment.id}>
          <Comment />
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
