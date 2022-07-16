import React from 'react';
import Comment from './Comment';
import { IComment } from '../data/data';
import AddCommentForm from './AddCommentForm';

const Reply: React.FC<IComment> = (props) => {
  return <Comment {...props} replies={[]} />;
};

export default Reply;
