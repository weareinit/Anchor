import axios from 'axios';
import authFailure from '../utils/auth';
const SERVER_URL = 'http://localhost:3000';

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
        if(String(e).includes('400'))
            alert('Hacker already accepted')

        else 
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
const getApplicants = async (page,q,history) => {
    try{
        const token = await localStorage.getItem("token");
        const config = {
            headers: {
                'Authorization':'Bearer '+ token
            }
        }

        if(!q)
            q = '';

        const {data} = await axios.get(SERVER_URL+`/application?page=${page}&q=${q}`,config);

        const {applicants,overallPages,count} = data.data

        return {applicants,overallPages,count};
    }catch(e){
        authFailure(history);
    }
    
}

const getStatistics = async (history) => {
    const makeObj = (key,value) => {
        return {key,value};
    }

    try{
        const token = await localStorage.getItem("token");
        const config = {
            headers: {
                'Authorization':'Bearer '+ token
            }
        }

        const {data} = await axios.get(SERVER_URL + '/admin/statistics',config);

        const{numApplicants,numConfirmed,numApplied,numNotApplied,numAccepted,numMales,numFemales} = data.data

        let applicantsObj = makeObj("Applicants",numApplicants)
        let confirmedObj = makeObj("Confirmed",numConfirmed);
        let appliedObj = makeObj("Applied",numApplied);
        let notAppliedObj = makeObj("Not Applied",numNotApplied);
        let acceptedObj = makeObj("Accepted",numAccepted);
        let malesObj = makeObj("Males",numMales);
        let femaleObj = makeObj("Females",numFemales);
    
        let stats = [applicantsObj,confirmedObj,appliedObj,notAppliedObj,acceptedObj,malesObj,femaleObj]
    
        return stats;

    }catch(e){
        authFailure(history);
    }
}

export default {acceptHacker, getApplicants, login, logout, checkIn,getStatistics};