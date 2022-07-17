import '../styles/globals.css';
import type { AppProps } from 'next/app';
import CommentsContextProvider from '../store/commentsContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CommentsContextProvider>
      <Component {...pageProps} />
    </CommentsContextProvider>
  );
}

export default MyApp;
