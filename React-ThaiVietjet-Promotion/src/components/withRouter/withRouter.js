import {
    Routes,
    Route,
    useNavigate,
    useLocation,
    useParams,
    useSearchParams
} from "react-router-dom";

const withRouter = WrappedComponent => props => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const [searchParams] = useSearchParams();
    // etc... other react-router-dom v6 hooks

    return (
        <WrappedComponent
            {...props}
            navigate={navigate}
            location={location}
            params={params}
            searchParams={searchParams}
        // etc...
        />
    );
};

export default withRouter