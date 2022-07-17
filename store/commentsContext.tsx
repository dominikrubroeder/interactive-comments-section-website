import { createContext, useState } from 'react';
import { CommentContextType, IComment, commentList } from '../data/data';

export const CommentsContext = createContext<CommentContextType | null>(null);

type CommentsContextProviderProps = {
  children?: React.ReactNode;
};

const CommentsContextProvider: React.FC<CommentsContextProviderProps> = ({
  children,
}) => {
  const [comments, setComments] = useState<IComment[]>(commentList);

  const addCommentHandler = (newComment: IComment, replyingToId: number) => {
    // Adding a reply
    comments.map((comment: IComment) => {
      if (comment.id === replyingToId) {
        comment.replies = [...comment.replies, newComment];
        setComments([...comments]);
      }
    });
  };

  const deleteCommentHandler = (commentId: number) => {
    setComments((previousState) =>
      previousState.filter((comment) => comment.id !== commentId)
    );
  };

  const updateCommentHandler = () => {};

  const context: CommentContextType = {
    comments,
    addComment: addCommentHandler,
    deleteComment: deleteCommentHandler,
    updateComment: updateCommentHandler,
  };

  return (
    <CommentsContext.Provider value={context}>
      {children}
    </CommentsContext.Provider>
  );
};

export default CommentsContextProvider;
