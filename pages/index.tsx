import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useContext } from 'react';
import AddCommentForm from '../components/AddCommentForm';
import CommentList from '../components/CommentList';
import Overlay from '../components/Overlay';
import { currentUser } from '../data/data';
import { OverlayContext } from '../store/overlayContext';

const Home: NextPage = () => {
  const overlayCtx = useContext(OverlayContext);

  return (
    <div>
      <Head>
        <title>Interactive comments section | frontendmentor.io</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {overlayCtx?.shown && <Overlay onClick={overlayCtx!.toggleShown} />}

      <main className="max-w-screen-md m-auto">
        <CommentList />
        <AddCommentForm
          isReply={false}
          replyingTo="null"
          replyingToId={-1}
          hideForm={() => {}}
          currentUser={currentUser}
        />
      </main>

      <footer className="text-center text-xs text-app-neutral-blue-grayish my-8">
        Frontend challenge by{' '}
        <a
          href="https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9"
          target="_blank"
          rel="noreferrer"
        >
          frontendmentor.io
        </a>
        , done by Dominik Rubröder
      </footer>
    </div>
  );
};

export default Home;
