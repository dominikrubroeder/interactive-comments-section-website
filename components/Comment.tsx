import Image from 'next/image';
import React from 'react';
import { IComment } from '../data/data';
import Reply from './Reply';

const Comment: React.FC<IComment> = ({
  id,
  content,
  createdAt,
  score,
  user,
  replies,
  replyingTo,
}) => {
  const hasReplies = replies && replies.length > 0;

  return (
    <>
      <div
        className={`flex items-start gap-4 p-4 rounded-lg bg-white ${
          hasReplies ? 'mb-4' : ''
        }`}
      >
        <div className="flex flex-col gap-0 text-center shrink-0 bg-app-neutral-gray-light rounded-lg px-2">
          <button className="p-2 text-app-primary-blue-grayish-light hover:text-app-primary-blue-moderate">
            +
          </button>
          <p className="text-app-primary-blue-moderate">{score}</p>
          <button className="p-2 text-app-primary-blue-grayish-light hover:text-app-primary-blue-moderate">
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
              <p>{createdAt}</p>
            </div>

            <button className="text-app-primary-blue-moderate">
              icon Reply
            </button>
          </header>

          <p className="text-app-neutral-blue-grayish">
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
              <Reply {...reply} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Comment;
