import React from 'react';
import Comment from './Comment';
import { IReply } from '../data/data';

const Reply: React.FC<IReply> = (props) => {
  return <Comment {...props} replies={[]} />;
};

export default Reply;
