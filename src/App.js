import './App.css';
import { GoogleLogin } from 'react-google-login';
import { useState } from 'react';

function App() {
  const handleFailure = (result) => {
    console.log(result);
  }
  const handleSuccess = (googleData) => {
    console.log("success");
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
    fetch('/api/google-login', requestOptions)
      .then(res => res.json())
      .then(data => {
        setLoginData(data);
        localStorage.setItem('loginData', JSON.stringify(data));
      });
  }

  const handleLogout = () => {
    localStorage.removeItem('loginData');
    setLoginData(null);
  };


  const [loginData, setLoginData] = useState(
    localStorage.getItem('loginData')
      ? JSON.parse(localStorage.getItem('loginData'))
      : null
  );
  return (
    <div className="App">
      <header className="App-header">
       
        <div>
          {loginData ? (
            <div>
              <h3>You logged in as {loginData.email}</h3>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <GoogleLogin
              clientId="804286895861-ot0h89v61d1rtdsep2sa8d4dstjiic9v.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={handleSuccess}
              onFailure={handleFailure}
              plugin_name="chat"
              cookiePolicy={'single_host_origin'}>
            </GoogleLogin>
          )}

        </div>
      </header>
    </div>
  );
}

export default App;
