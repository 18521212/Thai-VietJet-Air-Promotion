import {
    Routes,
    Route,
    redirect, // test
    useNavigate,
    useLocation,
} from "react-router-dom";

const withRouter = WrappedComponent => props => {
    const navigate = useNavigate();
    const location = useLocation();
    // etc... other react-router-dom v6 hooks

    return (
        <WrappedComponent
            {...props}
            navigate={navigate}
            redirect={redirect}
            location={location}
        // etc...
        />
    );
};

export default withRouter