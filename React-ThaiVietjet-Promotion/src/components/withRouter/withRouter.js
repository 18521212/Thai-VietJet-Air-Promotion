import {
    Routes,
    Route,
    useNavigate,
    useLocation,
    useParams
} from "react-router-dom";

const withRouter = WrappedComponent => props => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    // etc... other react-router-dom v6 hooks

    return (
        <WrappedComponent
            {...props}
            navigate={navigate}
            location={location}
            params={params}
        // etc...
        />
    );
};

export default withRouter