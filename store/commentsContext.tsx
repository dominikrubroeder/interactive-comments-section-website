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

  const deepIterator = (target: IComment[], commentId: number) => {
    if (typeof target === 'object') {
      for (const key in target) {
        if (target.find((comment) => comment.id === commentId)) {
          const commentToReplyTo = target.find(
            (comment) => comment.id === commentId
          );
          return commentToReplyTo;
        } else {
          target.forEach((comment: IComment) => {
            deepIterator(comment.replies, commentId);
          });
        }
      }
    } else {
      console.log('Not a valid object');
    }
  };

  const addCommentHandler = (newComment: IComment, replyingToId: number) => {
    // Adding a reply
    // comments.map((comment: IComment) => {
    //   if (comment.id === replyingToId) {
    //     comment.replies = [...comment.replies, newComment];
    //     setComments([...comments]);
    //   }
    // });

    const commentToReplyTo = deepIterator(comments, replyingToId);
    console.log(commentToReplyTo);
  };

  const deleteCommentHandler = (commentId: number) => {
    setComments((previousState) =>
      previousState.filter((comment) => comment.id !== commentId)
    );
  };

  const increaseScore = (commentId: number) => {
    comments.map((comment: IComment) => {
      if (comment.id === commentId) {
        comment.score += 1;
        setComments([...comments]);
      }
    });
  };

  const decreaseScore = (commentId: number) => {
    comments.map((comment: IComment) => {
      if (comment.id === commentId) {
        comment.score -= 1;
        setComments([...comments]);
      }
    });
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
