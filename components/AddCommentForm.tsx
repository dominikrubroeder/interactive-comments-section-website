import Image from 'next/image';
import React from 'react';
import { currentUser } from '../data/data';

const AddCommentForm: React.FC = () => {
  return (
    <div className="flex items-start gap-4 bg-white rounded-lg p-4">
      <Image
        src={currentUser.image.png}
        width={32}
        height={32}
        alt={`${currentUser.username} avatar`}
        className="shrink-0"
      />
      <form>
        <textarea placeholder="Add a comment..." />
        <button>Send</button>
      </form>
    </div>
  );
};

export default AddCommentForm;
