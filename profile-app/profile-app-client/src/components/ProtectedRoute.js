import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const protectedRoute = ({ component: Component, user, path })=>{
    //console.log({ component: Component, user, ...rest });
    return(
        <Route
            path={path}
            render={(props)=>{
                console.log(user)
                if(user){
                    return <Component {...props} loggedInUser={user} />
                } else {
                    return <Redirect to={ {pathname: "/", state: {from: props.location}} } />
                }
            }}
        />
    );
};

export default protectedRoute;