import Image from 'next/image';
import React, { useState, useContext } from 'react';
import { currentUser, IComment } from '../data/data';
import AddCommentForm from './AddCommentForm';
import IconReply from './icons/IconReply';
import { CommentsContext } from '../store/commentsContext';
import IconEdit from './icons/IconEdit';
import IconDelete from './icons/IconDelete';

const Comment: React.FC<IComment> = ({
  id,
  content,
  createdAt,
  score,
  user,
  replies,
  replyingTo,
}) => {
  const commentsCtx = useContext(CommentsContext);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const hasReplies = replies && replies.length > 0;
  const computeCreatedAt =
    new Date(createdAt) && new Date(createdAt).toString() !== 'Invalid Date'
      ? 'Some seconds ago...'
      : createdAt;

  const deepIterator = (target: any) => {
    console.log(target);
    console.log(typeof target);
    if (typeof target === 'object') {
      for (const key in target) {
        deepIterator(target[key]);
      }
    } else {
      console.log(target);
    }
  };

  return (
    <>
      <div
        className={`flex items-start gap-4 p-4 rounded-lg bg-white ${
          hasReplies ? 'mb-4' : ''
        }`}
      >
        <div className="flex flex-col gap-0 text-center shrink-0 bg-app-neutral-gray-light rounded-lg px-2">
          <button
            className="p-2 text-app-primary-blue-grayish-light hover:text-app-primary-blue-moderate"
            onClick={() => commentsCtx?.increaseScore(id)}
          >
            +
          </button>
          <p className="text-app-primary-blue-moderate">{score}</p>
          <button
            className="p-2 text-app-primary-blue-grayish-light hover:text-app-primary-blue-moderate"
            onClick={() => commentsCtx?.decreaseScore(id)}
          >
            -
          </button>
        </div>

        <div className="flex-1 grid gap-4">
          <header className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-4">
              <Image
                src={user.image.png}
                width={32}
                height={32}
                alt={`${user.username} avatar`}
                className="rounded-full"
              />
              <h2>{user.username}</h2>
              <p>{computeCreatedAt}</p>
            </div>

            {user.username !== currentUser.username && (
              <button
                className="flex items-center gap-2 text-app-primary-blue-moderate"
                onClick={() =>
                  setShowReplyForm((previousState) => !previousState)
                }
              >
                <IconReply /> Reply
              </button>
            )}

            {user.username === currentUser.username && (
              <div className="flex items-center gap-4">
                <button
                  className="flex items-center gap-2 text-app-primary-red-soft"
                  onClick={() => commentsCtx?.deleteComment(id)}
                >
                  <IconDelete /> Delete
                </button>

                <button className="flex items-center gap-2 text-app-primary-blue-moderate">
                  <IconEdit /> Edit
                </button>
              </div>
            )}
          </header>

          <p
            className="text-app-neutral-blue-grayish"
            onClick={() => deepIterator(replies)}
          >
            {replyingTo && (
              <span className="text-app-primary-blue-moderate font-bold">
                @{replyingTo}&nbsp;
              </span>
            )}
            {content}
          </p>
        </div>
      </div>

      {hasReplies && (
        <ul className="grid gap-4 pl-8 ml-8 border-l-2">
          {replies.map((reply) => (
            <li key={reply.id}>
              <Comment {...reply} />
            </li>
          ))}
        </ul>
      )}

      {showReplyForm && (
        <AddCommentForm
          replyingToId={id}
          replyingTo={user.username}
          currentUser={currentUser}
          hideForm={() => setShowReplyForm(false)}
        />
      )}
    </>
  );
};

export default Comment;
