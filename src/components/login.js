import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

function Login({ setUser }) {

    const setCookie = (name, value, days) => {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }

    const handleNewUser = async (user) => {
        const formData = {
            email: user.email,
            admin: false,
            banned: false
        }

        try {
            const response = await fetch("/api/newUser", {
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

    const checkUserStatus = async (email) => {
        try {
            const response = await fetch("/api/users", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const users = await response.json();
            const user = users.find(user => user.email === email);
            
            if (user) {
                // User exists, return their banned status
                return { exists: true, banned: user.banned };
            } else {
                // User does not exist
                return { exists: false, banned: false };
            }
        } catch (error) {
            console.error("Error fetching users:", error.message);
            // Default to allow login in case of error but consider user does not exist
            return { exists: false, banned: false }; 
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
                    const domain = response.email.split('@')[1];
                    if (domain === 'torontomu.ca' || domain === 'ryerson.ca') {
                        const { exists, banned } = await checkUserStatus(response.email);
                        if (!banned) {
                            setUser(response);
                            if (!exists) {
                                handleNewUser(response); // Call this only if user does not exist
                            }
                            document.getElementById('signInButton').hidden = true;
                            // Set a cookie for the user
                            setCookie('userEmail', response.email, 7); // Set a cookie named 'userEmail' that expires in 7 days
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
