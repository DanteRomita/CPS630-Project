import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

function Login({ setUser }) {
    return (
        <div id="signInButton">
            <GoogleLogin
                onSuccess={credentialResponse => {
                    let response = jwtDecode(credentialResponse.credential)
                    console.log(response);
                    if (response.hd === 'torontomu.ca' || response.hd === 'ryerson.ca') {
                        setUser(response);
                        document.getElementById('signInButton').hidden = true;
                    } else {
                        alert('Must login with torontomu.ca or ryerson.ca domain');
                    }
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
        </div>
    );   
}

export default Login;
