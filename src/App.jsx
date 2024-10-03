import { useSelector } from 'react-redux';
import User from './component/User/User';
import Auth from './component/Authentication/Auth';
import './App.css';
function App() {
  const auth = useSelector((state) => state.auth);

  // Show a loading spinner if authentication is in progress
  if (auth.loading) {
    return (
      <div className="loading-spinner">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      {auth.isAuthenticated===true ? <User /> : <Auth />}
    </>
  );
}

export default App;
