import axios from 'axios';
import authFailure from '../utils/auth';
const SERVER_URL = 'http://59301f60.ngrok.io';

/** 
 * returns token from backend if provided correct password
*/
const login = async (password,history) => {
    try{
        let {data} = await axios.post(SERVER_URL+'/token',{password});
        
        const {token} = data.data;
        localStorage.setItem("token",token);

        history.push('/hackers');

     }catch(e){
         alert('Invalid Password');
     }
}

/** 
 * removes token from localstorage
*/
const logout = async (history) => {
    try{
        await localStorage.setItem("token",null);

        history.push('/');

    }catch(e){
        console.log(e)
    }
}

/** 
 * accepts a hacker based on email
*/
const acceptHacker = async (email,history) => {
    try{
        const token = await localStorage.getItem("token");
        const config = {
            headers: {
                'Authorization':'Bearer '+ token
            },
        }

        await axios.put(SERVER_URL + "/admin/acceptOne",{email},config);
        alert('Accepted hacker');

    }catch(e){
        console.log(e);
        authFailure(history);
    }
}

/** 
 * checks in a hacker based on shellID
*/
const checkIn = async (shellID,history) => {
    try{
        const token = await localStorage.getItem("token");
        const config = {
            headers: {
                'Authorization':'Bearer '+ token
            },
        }

        await axios.put(SERVER_URL + "/admin/checkIn",{shellID},config);
        alert('Checked in hacker');

    }catch(e){
        authFailure(history);
    }
}

/** 
 * returns all applicants from database
*/
const getApplicants = async () => {
    const token = await localStorage.getItem("token");
        const config = {
            headers: {
                'Authorization':'Bearer '+ token
            }
        }

    const {data} = await axios.get(SERVER_URL+"/application",config);

    const {applicants} = data.data

    return applicants;
}

export default {acceptHacker, getApplicants, login, logout, checkIn};