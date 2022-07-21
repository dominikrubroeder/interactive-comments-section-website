import { createContext, useEffect, useState } from 'react';
import {
  CommentContextType,
  IComment,
  commentList,
  ScoreActionType,
} from '../data/data';

export const CommentsContext = createContext<CommentContextType | null>(null);

type CommentsContextProviderProps = {
  children?: React.ReactNode;
};

const CommentsContextProvider: React.FC<CommentsContextProviderProps> = ({
  children,
}) => {
  const [comments, setComments] = useState<IComment[]>(commentList);

  const addCommentHandler = (
    newComment: IComment,
    replyingToId: number,
    isReply: boolean
  ) => {
    if (!isReply) {
      setComments((previousState) => previousState.concat(newComment));
    }

    const deepIterator = (
      target: IComment[],
      commentId: number,
      newComment: IComment
    ) => {
      if (typeof target !== 'object') console.log('Not a valid object');

      const commentToFind = target.find((comment) => comment.id === commentId);

      if (!commentToFind) {
        target.forEach((comment) =>
          deepIterator(comment.replies, commentId, newComment)
        );
        return;
      }

      commentToFind.replies.push(newComment);
      setComments([...comments]);
    };

    deepIterator(comments, replyingToId, newComment);
  };

  const deleteCommentHandler = (commentId: number) => {
    const deepIterator = (target: IComment[], commentId: number) => {
      if (typeof target !== 'object') console.log('Not a valid object');

      const indexOfCommentToDelete = target.findIndex(
        (comment) => comment.id === commentId
      );

      if (indexOfCommentToDelete === -1) {
        target.forEach((comment) => deepIterator(comment.replies, commentId));
        return;
      }

      target.splice(indexOfCommentToDelete, 1);
      setComments([...comments]);
    };

    deepIterator(comments, commentId);
  };

  const updateCommentHandler = (updatedComment: IComment) => {
    const deepIterator = (target: IComment[], updatedComment: IComment) => {
      if (typeof target !== 'object') console.log('Not a valid object');

      const { id } = updatedComment;

      const indexOfCommentToUpdate = target.findIndex(
        (comment) => comment.id === id
      );

      if (indexOfCommentToUpdate === -1) {
        target.forEach((comment) =>
          deepIterator(comment.replies, updatedComment)
        );
        return;
      }

      target[indexOfCommentToUpdate] = updatedComment;
      setComments([...comments]);
    };

    deepIterator(comments, updatedComment);
  };

  const updateScoreHandler = (type: string, commentId: number) => {
    const deepIterator = (target: IComment[], commentId: number) => {
      if (typeof target !== 'object') console.log('Not a valid object');

      const commentToFind = target.find((comment) => comment.id === commentId);

      if (!commentToFind) {
        target.forEach((comment) => deepIterator(comment.replies, commentId));
        return;
      }

      if (type === ScoreActionType.increase) commentToFind.score += 1;
      if (type === ScoreActionType.decrease) commentToFind.score -= 1;

      setComments([...comments]);
    };

    deepIterator(comments, commentId);
  };

  useEffect(() => {
    console.log(comments);
  }, [comments]);

  const context: CommentContextType = {
    comments,
    addComment: addCommentHandler,
    deleteComment: deleteCommentHandler,
    updateComment: updateCommentHandler,
    updateScore: updateScoreHandler,
  };

  return (
    <CommentsContext.Provider value={context}>
      {children}
    </CommentsContext.Provider>
  );
};

export default CommentsContextProvider;
