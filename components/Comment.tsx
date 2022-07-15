import React from 'react';

const Comment: React.FC = () => {
  return (
    <div className="flex items-start gap-4 p-4 rounded-lg bg-white">
      <div className="flex flex-col gap-0 text-center shrink-0 bg-app-neutral-gray-light rounded-lg px-2">
        <button className="p-2 text-app-primary-blue-grayish-light hover:text-app-primary-blue-moderate">
          +
        </button>
        <p className="text-app-primary-blue-moderate">12</p>
        <button className="p-2 text-app-primary-blue-grayish-light hover:text-app-primary-blue-moderate">
          -
        </button>
      </div>

      <div className="flex-1 grid gap-4">
        <header className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <div>Avatar</div>
            <h2>amyrobson</h2>
            <p>1 month ago</p>
          </div>

          <button className="text-app-primary-blue-moderate">icon Reply</button>
        </header>

        <p className="text-app-neutral-blue-grayish">
          Impressive! Though it seems the drag feature could be improved. But
          overall it looks incredible. You`ve nailed the design and the
          responsiveness at various breakpoints works really well.
        </p>
      </div>
    </div>
  );
};

export default Comment;
