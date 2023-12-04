import React, { useState, useEffect } from 'react';
import AuthBoxLoggedOut from './AuthBoxLoggedOut.jsx';
import AuthBoxLoggedIn from './AuthBoxLoggedIn.jsx';

function Header() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
  const [emailDisplayed, setEmailDisplayed] = useState(false);

  useEffect(() => {
    // Refresh the component whenever the localStorage user data changes.
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem('user')));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const displayEmail = () => {
    if (user && user.email && !emailDisplayed) {
      setEmailDisplayed(true);
      return <p>{user.email}</p>;
    }
    return null;
  };

  return (
    <header style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Text Adventure Game For Education</h1>
      
      {user && user.email ? (
        <div class = "login">
          
          <AuthBoxLoggedIn user={user} setUser={setUser} />
          {displayEmail()}
        </div>
      ) : (
        <AuthBoxLoggedOut />
      )}
    </header>
  );
}

export default Header;
