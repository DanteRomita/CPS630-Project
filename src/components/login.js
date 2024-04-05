import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

function Login({ setUser }) {

    const handleNewUser = async (user) => {
        const formData = {
            email: user.email,
            admin: false,
            banned: false
        }

        try {
            const response = await fetch("http://localhost:3001/api/newUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                // User was successfully added or already exists
                console.log("User processed successfully.");
            } else if (response.status === 409) {
                // User already exists
                console.log("User already exists.");
            }
        } catch (error) {
            console.error("Error processing user:", error.message);
        }
    };

    const checkBannedStatus = async (email) => {
        try {
            const response = await fetch("http://localhost:3001/api/users", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const users = await response.json();
            const user = users.find(user => user.email === email);
            return user ? !user.banned : true; // If user is not found, allow login by default
        } catch (error) {
            console.error("Error fetching users:", error.message);
            return true; // Default to allow login in case of error
        }
    };

    return (
        <div id="signInButton">
            <GoogleLogin
                theme="outline"
                shape="circle"
                size="medium"
                onSuccess={async (credentialResponse) => {
                    let response = jwtDecode(credentialResponse.credential);
                    console.log(response);
                    const domain = response.email.split('@')[1];
                    if (domain === 'torontomu.ca' || domain === 'ryerson.ca') {
                        const canLogin = await checkBannedStatus(response.email);
                        if (canLogin) {
                            setUser(response);
                            handleNewUser(response);
                            document.getElementById('signInButton').hidden = true;
                        } else {
                            alert('Your account has been banned. You cannot log in.');
                        }
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
