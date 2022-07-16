import Image from 'next/image';
import React, { useRef } from 'react';
import { IComment, IUser } from '../data/data';

interface AddCommentFormProps {
  replyingToId: number;
  replyingTo: string;
  currentUser: IUser;
  hideForm: () => void;
}

const AddCommentForm: React.FC<AddCommentFormProps> = ({
  replyingToId,
  replyingTo,
  currentUser,
  hideForm,
}) => {
  const commentRef = useRef<HTMLTextAreaElement | null>(null);

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const newComment: IComment = {
      id: Math.random(),
      content: commentRef.current!.value,
      createdAt: new Date().toString(),
      score: 0,
      user: currentUser,
      replies: [],
      replyingTo: replyingTo,
    };
    console.log(newComment);

    // Add reply to comment
    // commentCtx.addComment(newComment, replyingToId)

    hideForm();
  };

  return (
    <div className="flex items-start gap-4 bg-white rounded-lg p-4 mt-4">
      <Image
        src={currentUser.image.png}
        width={32}
        height={32}
        alt={`${currentUser.username} avatar`}
        className="shrink-0"
      />
      <form
        className="flex-1 flex items-start gap-2"
        onSubmit={onSubmitHandler}
      >
        <textarea
          placeholder="Add a comment..."
          className="flex-1 resize-none border rounded-lg px-4 py-2 min-h-[6rem]"
          ref={commentRef}
        />
        <button className="shrink-0 bg-app-primary-blue-moderate text-white py-3 px-6 rounded-xl uppercase">
          Send
        </button>
      </form>
    </div>
  );
};

export default AddCommentForm;
