import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const protectedRoute = ({ component: Component, user, path, getUserInfo })=>{
    //console.log({ component: Component, user, ...rest });
    return(
        <Route
            path={path}
            render={(props)=>{
                if(user){
                    return <Component {...props} loggedInUser={user} getUserInfo={getUserInfo} />
                } else {
                    return <Redirect to={ {pathname: "/", state: {from: props.location}} } />
                }
            }}
        />
    );
};

export default protectedRoute;