import '../styles/globals.css';
import type { AppProps } from 'next/app';
import CommentsContextProvider from '../store/commentsContext';
import OverlayContextProvider from '../store/overlayContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <OverlayContextProvider>
      <CommentsContextProvider>
        <Component {...pageProps} />
      </CommentsContextProvider>
    </OverlayContextProvider>
  );
}

export default MyApp;
