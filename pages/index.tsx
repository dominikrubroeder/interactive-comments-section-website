import type { NextPage } from 'next';
import Head from 'next/head';
import Comment from '../components/Comment';
import CommentList from '../components/CommentList';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-screen-md m-auto">
        <CommentList />
      </main>
    </div>
  );
};

export default Home;
