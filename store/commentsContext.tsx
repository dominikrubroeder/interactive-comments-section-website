import { createContext, useEffect, useState } from 'react';
import { CommentContextType, IComment, commentList } from '../data/data';

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

  const increaseScore = (commentId: number) => {
    const deepIterator = (target: IComment[], commentId: number) => {
      if (typeof target !== 'object') console.log('Not a valid object');

      const commentToFind = target.find((comment) => comment.id === commentId);

      if (!commentToFind) {
        target.forEach((comment) => deepIterator(comment.replies, commentId));
        return;
      }

      commentToFind.score += 1;
      setComments([...comments]);
    };

    deepIterator(comments, commentId);
  };

  const decreaseScore = (commentId: number) => {
    const deepIterator = (target: IComment[], commentId: number) => {
      if (typeof target !== 'object') console.log('Not a valid object');

      const commentToFind = target.find((comment) => comment.id === commentId);

      if (!commentToFind) {
        target.forEach((comment) => deepIterator(comment.replies, commentId));
        return;
      }

      commentToFind.score -= 1;
      setComments([...comments]);
    };

    deepIterator(comments, commentId);
  };

  useEffect(() => {
    console.log(comments);
  }, [comments]);

  const updateCommentHandler = () => {};

  const context: CommentContextType = {
    comments,
    addComment: addCommentHandler,
    deleteComment: deleteCommentHandler,
    updateComment: updateCommentHandler,
    increaseScore,
    decreaseScore,
  };

  return (
    <CommentsContext.Provider value={context}>
      {children}
    </CommentsContext.Provider>
  );
};

export default CommentsContextProvider;
