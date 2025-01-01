import { AppBar, Toolbar, styled, Typography } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Component = styled(AppBar)`
    background: #FFFFFF;
    color: black;
`;

const Container = styled(Toolbar)`
    display: flex;
    justify-content: center; /* Center the links horizontally */
    align-items: center; /* Align items vertically */
    position: relative;
    gap: 20px; /* Add spacing between links */
    
    & > a {
        padding: 20px;
        color: #000;
        text-decoration: none;
        cursor: pointer;
        position: relative;
        font-weight: bold; /* Makes the text bold */
        transition: color 0.3s ease;
    }

    & > a:hover {
        color: orange; /* Change color on hover */
    }

    & > a.active {
        color: orange; /* Keep orange color when the link is active */
    }
`;

const Brand = styled(Typography)`
    font-size: 24px;
    font-weight: bold;
    margin-right: 250px; /* Pushes the "Student Connect" text to the left */
    color: rgb(255, 131, 73);
    padding-left: 10px; /* Adds spacing from the edge */
`;

const LogoutButton = styled(Link)`
    margin-left: auto;
    padding: 20px;
    color: #000;
    text-decoration: none;
    cursor: pointer;
    font-weight: bold;
    position: relative;

    &:hover {
        color: orange; /* Change color on hover */
    }
`;

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        sessionStorage.clear();
        navigate('/account'); // Redirects to the login page
    };

    return (
        <Component>
            <Container>
                <Brand>Student Connect</Brand> {/* Added brand text */}
                <Link
                    to="/"
                    className={location.pathname === '/' ? 'active' : ''}
                >
                    HOME
                </Link>
                <Link
                    to="/about"
                    className={location.pathname === '/about' ? 'active' : ''}
                >
                    ABOUT
                </Link>
                <Link
                    to="/contact"
                    className={location.pathname === '/contact' ? 'active' : ''}
                >
                    CONTACT
                </Link>
                <LogoutButton
                    to="/account"
                    onClick={(event) => {
                        event.preventDefault(); // Prevent default navigation behavior
                        logout(); // Call the logout function
                    }}
                >
                    LOGOUT
                </LogoutButton>
            </Container>
        </Component>
    );
};

export default Header;
