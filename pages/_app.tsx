import '@styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  // 가장 먼저 실행되는 컴포넌트(request가 와서 서버가 서빙할 때)
  return <Component {...pageProps} />;
}
