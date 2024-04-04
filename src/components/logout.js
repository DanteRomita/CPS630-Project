// logout.js
import { googleLogout } from '@react-oauth/google';

function Logout({ setUser }) {
    const handleLogoutSuccess = () => {
        setUser({});
        console.log('Logout Success');
    };

    const logout = () => {
        googleLogout();
        handleLogoutSuccess();
    };

    return (
        <button id="signOutButton" className="btn waves-effect icon-link center" onClick={logout}>Logout</button>
    );
}

export default Logout;
