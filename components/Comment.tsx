import Image from 'next/image';
import React, { useState, useContext, useRef, useEffect } from 'react';
import { currentUser, IComment } from '../data/data';
import AddCommentForm from './AddCommentForm';
import IconReply from './icons/IconReply';
import { CommentsContext } from '../store/commentsContext';
import IconEdit from './icons/IconEdit';
import IconDelete from './icons/IconDelete';
import Overlay from './Overlay';

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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [initialContent, setInitialContent] = useState(content);

  const contentTextAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const hasReplies = replies && replies.length > 0;
  const computeCreatedAt =
    new Date(createdAt) && new Date(createdAt).toString() !== 'Invalid Date'
      ? 'Some seconds ago...'
      : createdAt;

  const deleteHandler = (commentId: number) => {
    commentsCtx?.deleteComment(commentId);
    setShowDeleteModal(false);
  };

  const updateHandler = () => {
    const updatedComment: IComment = {
      id,
      content: contentTextAreaRef.current!.value,
      createdAt,
      score,
      user,
      replies,
      replyingTo,
    };

    commentsCtx?.updateComment(updatedComment);
    setIsEditMode(false);
  };

  const onChangeHandler = (e: any) => {
    setInitialContent(e.target.value);
  };

  useEffect(() => {
    if (contentTextAreaRef && isEditMode) {
      contentTextAreaRef.current!.focus();
    }
  }, [isEditMode]);

  return (
    <>
      {showDeleteModal && (
        <div>
          <Overlay onClick={() => setShowDeleteModal(false)} />

          <div className="p-4 bg-white rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-xs max-h-min z-50">
            <h2 className="mb-4 font-bold text-xl text-app-neutral-blue-dark">
              Delete comment
            </h2>
            <p className="text-app-neutral-blue-grayish mb-4">
              Are you sure you want to delete this comment? This will remove
              comment and can`t be undone.
            </p>
            <footer className="flex items-center justify-end gap-2">
              <button
                className="bg-app-neutral-blue-grayish text-white px-4 py-2 rounded-lg"
                onClick={() => setShowDeleteModal(false)}
              >
                No, cancel
              </button>
              <button
                className="bg-app-primary-red-soft text-white px-4 py-2 rounded-lg"
                onClick={() => deleteHandler(id)}
              >
                Yes, delete
              </button>
            </footer>
          </div>
        </div>
      )}

      <div
        className={`relative flex flex-col-reverse gap-4 p-4 rounded-lg bg-white sm:items-start sm:flex-row ${
          hasReplies ? 'mb-4' : ''
        }`}
      >
        <div className="flex items-center gap-0 text-center shrink-0 bg-app-neutral-gray-light rounded-lg px-2 self-start sm:flex-col">
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
                className="flex items-center gap-2 text-app-primary-blue-moderate absolute bottom-6 right-4 sm:relative sm:top-auto sm:right-auto sm:bottom-auto"
                onClick={() =>
                  setShowReplyForm((previousState) => !previousState)
                }
              >
                <IconReply /> Reply
              </button>
            )}

            {user.username === currentUser.username && (
              <div className="flex items-center gap-4 absolute bottom-6 right-4 sm:relative sm:top-auto sm:right-auto sm:bottom-auto">
                <button
                  className="flex items-center gap-2 text-app-primary-red-soft"
                  onClick={() =>
                    setShowDeleteModal((previousState) => !previousState)
                  }
                >
                  <IconDelete /> Delete
                </button>

                <button
                  className="flex items-center gap-2 text-app-primary-blue-moderate"
                  onClick={() =>
                    setIsEditMode((previousState) => !previousState)
                  }
                >
                  <IconEdit /> {isEditMode ? 'Cancel' : 'Edit'}
                </button>
              </div>
            )}
          </header>

          <div className="text-app-neutral-blue-grayish">
            {replyingTo && !isEditMode && (
              <span className="text-app-primary-blue-moderate font-bold">
                @{replyingTo}&nbsp;
              </span>
            )}
            {!isEditMode && initialContent}

            {isEditMode && (
              <div className="grid gap-2">
                <textarea
                  className="textarea"
                  onChange={(e) => onChangeHandler(e)}
                  ref={contentTextAreaRef}
                  defaultValue={initialContent}
                />

                <button
                  className="bg-app-primary-blue-moderate text-white py-3 px-6 rounded-xl uppercase justify-self-end"
                  onClick={updateHandler}
                >
                  Update
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {hasReplies && (
        <ul className="grid gap-4 pl-4 ml-4 border-l-2 sm:pl-8 sm:ml-8">
          {replies.map((reply) => (
            <li key={reply.id}>
              <Comment {...reply} />
            </li>
          ))}
        </ul>
      )}

      {showReplyForm && (
        <AddCommentForm
          isReply={true}
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
