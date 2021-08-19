import React, { useEffect, useState } from 'react';

import { Calendar as Bigcalendar, momentLocalizer } from 'react-big-calendar';

import moment from 'moment';
import Navbar from '../ui/Navbar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../helpers/calendar-messages';
import CalendarEvent from './CalendarEvent';


import 'moment/locale/es';
import CalendarModal from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventSetActive, startEventLoaded } from '../../actions/events';
import AddNewFab from '../ui/AddNewFab';
import DeleteEventFab from '../ui/DeleteEventFab';
moment.locale('es');
const localizer = momentLocalizer(moment);



const Calendar = () => {

    const dispatch = useDispatch();
    const { events } = useSelector(state=>state.calendar);
    const { uid } = useSelector(state=>state.auth);

    useEffect(()=>{
        dispatch(startEventLoaded())
    },[dispatch])

    const { activeEvent } = useSelector(state =>state.calendar);    

    const  [ lastView, setLastView ] = useState( localStorage.getItem('lastView') || 'month' )

    const onDoubleClickEvent = (e)=>{
        dispatch(
            uiOpenModal(e)
        )
    }

    const onSelectEvent = (e)=>{
        console.log(e)
        dispatch( eventSetActive(e) )

       
    }

    const onViewChange = (e)=>{
        console.log(e)
        setLastView(e)
        localStorage.setItem('lastView', e);

    }

    const eventStyleGetter = (event, start, end, isSelected )=> {

        const style = {
            backgroundColor:( uid === event.user._id ) ? '#367CF7' : '#456585',
            borderRadiues : '0px',
            opacity:0.8,
            diplay: 'block',
            color:'white',
            

        }

        return {
            style
        }

    }

    return (
        <div>
            <Navbar />

            <Bigcalendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 900 }}
                messages = { messages }
                onDoubleClickEvent = { onDoubleClickEvent }
                onSelectEvent = { onSelectEvent }
                onView = { onViewChange }
                view = { lastView }
                eventPropGetter = { eventStyleGetter }
                components = { { event: CalendarEvent  } }
             />

            <AddNewFab />

            {
                (activeEvent) && <DeleteEventFab  />  
            }
            

            <CalendarModal />
        </div>
    );
};

export default Calendar;