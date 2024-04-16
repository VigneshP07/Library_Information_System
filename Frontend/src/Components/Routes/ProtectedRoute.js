import React, { Fragment, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useAlert } from "react-alert";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
    const alert = useAlert();
    const { isAuthenticated, loading, user } = useSelector(state => state.user);

    useEffect(() => {
        if (!isAuthenticated && !loading) {
            alert.error("Please log in to access this page.");
        }
    }, [isAuthenticated, loading, alert]);

    return (
        <Fragment>
            {loading === false && (
                <Route {...rest} render={props => {
                    if (!isAuthenticated) {
                        return <Redirect to="/login" />;
                    }

                    if (isAdmin && user.Type !== 'Admin') {
                        return <Redirect to="/" />;
                    }

                    return <Component {...props} />;
                }} />
            )}
        </Fragment>
    );
}

export default ProtectedRoute;
