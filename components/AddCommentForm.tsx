import Image from 'next/image';
import React, { useRef, useContext, useEffect } from 'react';
import { IComment, IUser } from '../data/data';
import { CommentsContext } from '../store/commentsContext';
import Button from './Button';

interface AddCommentFormProps {
  isReply: boolean;
  replyingToId: number;
  replyingTo: string;
  currentUser: IUser;
  hideForm: () => void;
}

const AddCommentForm: React.FC<AddCommentFormProps> = ({
  isReply,
  replyingToId,
  replyingTo,
  currentUser,
  hideForm,
}) => {
  const commentCtx = useContext(CommentsContext);
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
      replyingTo: isReply ? replyingTo : '',
    };

    commentCtx?.addComment(newComment, replyingToId, isReply);

    if (!isReply) commentRef.current!.value = '';

    if (isReply) hideForm();
  };

  useEffect(() => {
    if (commentRef.current && isReply) {
      commentRef.current.focus();
      commentRef.current.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    }
  }, [isReply]);

  return (
    <div className="flex items-start gap-4 bg-white rounded-lg p-4 mt-4 opacity-0 invisible animate-appear">
      <Image
        src={currentUser.image.png}
        width={32}
        height={32}
        alt={`${currentUser.username} avatar`}
        className="shrink-0"
      />
      <form
        className="flex-1 grid gap-2 sm:flex sm:items-start"
        onSubmit={onSubmitHandler}
      >
        <textarea
          placeholder="Add a comment..."
          className="flex-1 textarea"
          ref={commentRef}
        />

        <Button>Send</Button>
      </form>
    </div>
  );
};

export default AddCommentForm;
