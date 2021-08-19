import Swal from "sweetalert2";
import { fetchNoToken, fetchWithToken } from "../helpers/request"
import { types } from "../types/types";
import { eventsCleanUp } from "./events";



export const startLogin = (email,password)=>{


    return async(dispatch)=>{        
       
    const resp = await fetchNoToken('auth',{ email, password },'POST');
    const body = await resp.json();

      if(body.ok){

        

          localStorage.setItem('token', body.token);
          localStorage.setItem('token-init-date', new Date().getTime());

          dispatch( login({
              uid: body.id,
              name: body.name
          }) )
        
      }else{

        Swal.fire('Error', body.msg,'error');
        
        }

    }


}

export const authStartRegister = ( name, email, password )=>{

    return async( dispatch )=>{

        const resp = await fetchNoToken('auth/register',{ name, email, password  },'POST' );
        const body = await resp.json();

       

        if(body.ok){

         
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid:body.id,
                name:body.name
            }))

        }else{

            Swal.fire('Error', body.msg,'error');
            
        }

    }

}

export const startChecking = ()=>{

    return async( dispatch )=>{

        const resp = await fetchWithToken('auth/renew' );
        const body = await resp.json();       

      
        if(body.ok){

         
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid:body.uid,
                name:body.name
            }))

        }else{

           
            dispatch(checkingFinish());
        }

    }


}

const checkingFinish = ()=>({ type: types.authCheckingFinish })


const login = (user)=>({
    type: types.authLogin,
    payload:user
});


export const startLogout = ()=>{

    return ( dispatch ) =>{

        localStorage.clear();
        dispatch(eventsCleanUp());
        dispatch(logout())

    }

}


const logout = ()=>({
    type: types.authLogout
})
