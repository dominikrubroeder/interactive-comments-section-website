import React from 'react';
import Comment from './Comment';
import { IComment } from '../data/data';

const Reply: React.FC<IComment> = (props) => {
  return <Comment {...props} replies={[]} />;
};

export default Reply;
