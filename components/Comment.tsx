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
}) => {
  return (
    <>
      <div
        className={`flex items-start gap-4 p-4 rounded-lg bg-white ${
          replies.length > 0 ? 'mb-4' : ''
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
                width="2rem"
                height="2rem"
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
            {replies.length > 0 && <span>Answered from</span>}
            {content}
          </p>
        </div>
      </div>

      {replies.length > 0 && (
        <ul className="grid gap-4 pl-8">
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
