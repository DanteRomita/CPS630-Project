import { googleLogout } from '@react-oauth/google';

function Logout({ setUser }) {

    const handleLogoutSuccess = () => {
        setUser({});
        document.getElementById('signInButton').hidden = false;
        console.log('Logout Success');
    };

    const logout = () => {
        googleLogout();
        handleLogoutSuccess();
    };

    return (
        <div class="center" id="signOutButton">
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default Logout;
