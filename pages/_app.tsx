import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ContextProvider } from "./ContextProvider";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./api/firebase";

function MyApp({ Component, pageProps }: AppProps) {
  const [user, loading, error] = useAuthState(auth);

  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  );
}

export default MyApp;
