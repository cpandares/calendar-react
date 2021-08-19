import Swal from "sweetalert2";
import { dateEventTransformer } from "../helpers/dateEventTrasnformer";
import { fetchWithToken } from "../helpers/request";
import { types } from "../types/types";

export const startAddNew = (event) => {
  return async (dispatch, getState) => {
    const { uid, name } = getState().auth;

    console.log(getState().auth);

    try {
      const resp = await fetchWithToken("events", event, "POST");
      const body = await resp.json();

      if (body.ok) {
        event.id = body.event.id;
        event.user = {
          _id: uid,
          name: name,
        };

        console.log(event);
        dispatch(eventAddNew(event));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event,
});

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event,
});

export const clearEventActive = () => ({ type: types.clearEventActive });


export const startEventUpdate = (event)=>{

  return async( dispatch )=>{

      try {
        
        const resp = await fetchWithToken(`events/${event.id}`,event,'PUT');
        const body = await resp.json();

        if(body.ok){

          dispatch(eventUpdated(event));

        }else{
          Swal.fire('Error', body.msg,'error');
        }

      } catch (error) {
        
      }

  }

}

const eventUpdated = (event) => ({
  type: types.eventUpdated,
  payload: event,
});

export const startEventDeleted = ()=>{

  
  return async( dispatch, getState )=>{

    const { id } = getState().calendar.activeEvent

    try {
      
      const resp = await fetchWithToken(`events/${id}`,{ },'DELETE');
      const body = await resp.json();

      if(body.ok){

        dispatch(eventDeleted());

      }else{
        Swal.fire('Error', body.msg,'error');
      }

    } catch (error) {
      
    }

  }

}

export const eventDeleted = (event) => ({
  type: types.eventDeleted,
  payload: event,
});

export const startEventLoaded = ( events )=>{

    return async( dispatch ) =>{

       try {
        const resp = await fetchWithToken('events');
        const body = await resp.json();

        const eventos =  dateEventTransformer(body.events);
        //console.log(eventos)
        dispatch(eventLoaded(eventos));

       } catch (error) {
          console.log()
       }

    }

}

const eventLoaded = (events)=>({
   type: types.eventLoaded,
   payload: events
})

export const eventsCleanUp = ()=>({
  type : types.eventsCleanUp
})
