import Image from 'next/image';
import React from 'react';
import { currentUser } from '../data/data';

const AddCommentForm: React.FC = () => {
  return (
    <div className="flex items-start gap-4 bg-white rounded-lg p-4 mt-4">
      <Image
        src={currentUser.image.png}
        width={32}
        height={32}
        alt={`${currentUser.username} avatar`}
        className="shrink-0"
      />
      <form className="flex-1 flex items-start gap-2">
        <textarea
          placeholder="Add a comment..."
          className="flex-1 resize-none border rounded-lg px-4 py-2 min-h-[6rem]"
        />
        <button className="shrink-0 bg-app-primary-blue-moderate text-white py-3 px-6 rounded-xl uppercase">
          Send
        </button>
      </form>
    </div>
  );
};

export default AddCommentForm;
