import axios from 'axios';
import authFailure from '../utils/auth';
const SERVER_URL = 'http://59301f60.ngrok.io';

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

const logout = async (history) => {
    try{
        await localStorage.setItem("token",null);

        history.push('/');

    }catch(e){
        console.log(e)
    }
}

const acceptHacker = async (email,history) => {
    try{
        const token = await localStorage.getItem("token");
        const config = {
            headers: {
                'Authorization':'Bearer '+ token
            },
            body: email
        }

        await axios.put(SERVER_URL + '/admin/acceptOne',config);

    }catch(e){
        authFailure(history);
    }
}

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

export default {acceptHacker,getApplicants,login, logout};