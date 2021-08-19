import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    BrowserRouter as Router,
    Switch,
    Route,    
    Redirect
  } from "react-router-dom";
import Swal from 'sweetalert2';
import { startChecking } from '../actions/auth';
import Login from '../components/auth/Login';
import Calendar from '../components/calendar/Calendar';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';



const AppRouter = () => {

     const { checking, uid } = useSelector(state=>state.auth);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(startChecking())
    },[dispatch]);

    if(checking){
        return(
           <h5>Please wait</h5>
        );
    }

    return (
        <Router>
            <div>                
                <Switch>

                    <PublicRoute 
                            exact 
                            path="/login" 
                            component = { Login }
                            isAuth = { !!uid }

                    />

                    <PrivateRoute 
                                exact 
                                path="/" 
                                component = { Calendar }
                                isAuth = { !!uid }
                    />

                   <Redirect to = '/' />

                </Switch>
            </div>
        </Router>
    );
};

export default AppRouter;