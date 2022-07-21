import { createContext, useState } from 'react';
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

  enum ContextActions {
    add = 'ADD',
    delete = 'DELETE',
    update = 'UPDATE',
    updateScore = 'UPDATE_SCORE',
  }

  function deepIterator(
    target: IComment[],
    action: string,
    commentId: number,
    newComment?: IComment,
    updatedComment?: IComment,
    updateScoreAction?: string
  ) {
    if (typeof target !== 'object') console.log('Not a valid object');

    // Check if comment to find is in the root level of the current IComment[] array (target)
    const indexOfCommentToFind = target.findIndex(
      (comment) => comment.id === commentId
    );

    // If the comment to find was not found, reiterate the next level of the root comments (their 'replies' property)
    if (indexOfCommentToFind === -1) {
      target.forEach((comment) =>
        deepIterator(
          comment.replies,
          action,
          commentId,
          newComment,
          updatedComment,
          updateScoreAction
        )
      );
      return;
    }

    // Only if we have found the comment to find, do the desired action
    switch (action) {
      case ContextActions.add:
        target[indexOfCommentToFind].replies.push(newComment!);
        setComments([...comments]);
        break;
      case ContextActions.delete:
        target.splice(indexOfCommentToFind, 1);
        setComments([...comments]);
        break;
      case ContextActions.update:
        target[indexOfCommentToFind] = updatedComment!;
        setComments([...comments]);
        break;
      case ContextActions.updateScore:
        if (updateScoreAction === ScoreActionType.increase)
          target[indexOfCommentToFind].score += 1;
        if (updateScoreAction === ScoreActionType.decrease)
          target[indexOfCommentToFind].score -= 1;
        setComments([...comments]);
        break;
      default:
        console.log('No matching comments context action.');
    }
  }

  const addCommentHandler = (
    newComment: IComment,
    replyingToId: number,
    isReply: boolean
  ) => {
    if (!isReply) {
      setComments((previousState) => previousState.concat(newComment));
    }

    if (isReply)
      deepIterator(comments, ContextActions.add, replyingToId, newComment);
  };

  const deleteCommentHandler = (commentId: number) => {
    deepIterator(comments, ContextActions.delete, commentId);
  };

  const updateCommentHandler = (updatedComment: IComment) => {
    const { id } = updatedComment;

    deepIterator(
      comments,
      ContextActions.update,
      id,
      undefined,
      updatedComment
    );
  };

  const updateScoreHandler = (type: string, commentId: number) => {
    deepIterator(
      comments,
      ContextActions.updateScore,
      commentId,
      undefined,
      undefined,
      type
    );
  };

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
