import '../styles/globals.css'; 
import { AuthProvider } from '/context/AuthContext';
import { RacelistProvider } from '/context/RacelistContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <RacelistProvider>
        <Component {...pageProps} />
      </RacelistProvider>
    </AuthProvider>
  );
}

export default MyApp;　