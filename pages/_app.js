import Navbar from '../components/Navbar';
import { UserContext } from '../lib/context';
import { useAuthState } from'react-firebase-hooks/auth';
import 'tailwindcss/tailwind.css';
import { auth } from '../lib/firebase';
import '../styles/globals.css'


function MyApp({ Component, pageProps }) {

  const [user] = useAuthState(auth)

  return (
  <UserContext.Provider value={user}>
    <Navbar />
    <Component {...pageProps} />
  </UserContext.Provider>
  )
}

export default MyApp
