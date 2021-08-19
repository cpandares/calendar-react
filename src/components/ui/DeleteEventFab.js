


import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  startEventDeleted } from '../../actions/events';

const DeleteEventFab = () => {

     const dispatch =  useDispatch();
    /*  const { activeEvent } = useSelector(state=>state.calendar);
 */
    const  handleDeleteClick = ()=>{

        dispatch(startEventDeleted(  ))

    }
    return (
        <button className="btn btn-outline-danger fab-danger" onClick = { handleDeleteClick }>
            <i className="fas fa-trash"></i>
            <span>Borrar evento</span>
        </button>
    );
};

export default DeleteEventFab;