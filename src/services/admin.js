import axios from 'axios';
import jwt from 'jsonwebtoken';

import authFailure from '../utils/auth';

//const SERVER_URL = 'https://api.shellhacks.net';
const SERVER_URL = 'http://localhost:3000';
const PRE_REG_URL = 'https://us-central1-preregistration-fc98c.cloudfunctions.net/widgets';

const admin = axios.create({ baseURL: SERVER_URL });

/**
 * Verifies that the user has a valid JWT, will force them off if not
 * @param {Object} history - History prop from react router
 */
const verifyLogin = async (history) => {
    try {
        const token = await localStorage.getItem("token");

        await jwt.verify(token, '5555');

        return token;

    } catch (e) {
        authFailure(history);
    }
}

/**
 * Returns token from backend if provided correct password
 * @param {String} password - Given password 
 * @param {Object} history - History prop from react router
 */
const login = async (password, history) => {
    try {
        let { data } = await admin.post('/token', { password });
        
        const { token } = data.data;

        localStorage.setItem("token", token);

        history.push('/hackers');

    } catch (e) {
        alert('Invalid Password');
    }
}

/**
 * Removes token from local storage and routes to landing page
 * @param {Object} history -History prop from react router
 */
const logout = async (history) => {
    try {
        await localStorage.setItem("token", null);

        history.push('/');

    } catch (e) {
        console.log(e)
    }
}

/**
 * Accepts a hacker based on email
 * @param {String} email - Hacker email
 * @param {Object} history - History prop from react router
 */
const acceptHacker = async (shellIDs, history) => {
    try {
        const token = await verifyLogin(history);
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token
            },
        }

        await admin.put("/admin/accept", { shellIDs }, config);
        alert('Accepted hacker, refresh to see changes');

    } catch (e) {
        if (String(e).includes('400'))
            alert('Hacker already accepted')

        else
            console.log(e);
    }
}

const deleteOne = async (shellID, history) => {
  try {
    const token = await verifyLogin(history);

    const config = {
      headers: {
        'Authorization': 'Bearer ' + token
      },
    };

    await admin.put("/admin/delete", { shellID }, config);

    alert('Hacker deleted, refresh to see changes');
  } catch (e) {
    console.log(e);
  }
}

/**
 * Checks in a hacker based on shellID
 * @param {String} shellID - ShellID of hacker 
 * @param {Object} history - History prop from react router
 */
const checkIn = async (shellID, history) => {
    try {
        const token = await verifyLogin(history);

        const config = {
            headers: {
                'Authorization': 'Bearer ' + token
            },
        }

        await admin.put("/admin/checkIn", { shellID }, config);

        alert('Checked in hacker');
    } catch (e) {
        console.log(e);
    }
}

/**
 * Returns all applicants from database
 * @param {Number} page - Page number
 * @param {String} q - Query string for search
 * @param {Object} history - History prop from react router
 */
const getApplicants = async (page, q, history, filter = '') => {
    try {
        const token = await verifyLogin(history);
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }

        if (!q)
            q = '';

        const { data } = await admin.get(`/application?page=${page}&q=${q}&filter=${filter}`, config);
        const { applicants, allApplicants, overallPages, count } = data.data

        return { applicants, allApplicants, overallPages, count };
    } catch (e) {
        String(e).includes("401") ?
            console.log(e) :
            alert('No Hackers found');
    }
}

/**
 * Gets registration statistics from API
 * @param {Object} history - History prop from react-router
 */
const getStatistics = async (history) => {
    const makeObj = (key, value) => {
        return { key, value };
    }

    try {
        const token = await verifyLogin(history);
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }

        const { data } = await admin.get('/cabinet/statistics', config);

        const { numApplicants, numConfirmed, numApplied, numNotApplied, numAccepted, numMales, numFemales, sortedSchools, numCantGo } = data.data

        let applicantsObj = makeObj("Registered", numApplicants)
        let confirmedObj = makeObj("Confirmed", numConfirmed);
        let appliedObj = makeObj("Applied", numApplied);
        let notAppliedObj = makeObj("Not Applied", numNotApplied);
        let acceptedObj = makeObj("Accepted", numAccepted);
        let malesObj = makeObj("Males", numMales);
        let femaleObj = makeObj("Females", numFemales);
        let cantGoObj = makeObj("Can't Go", numCantGo);

        let stats = [applicantsObj, confirmedObj, cantGoObj, appliedObj, notAppliedObj, acceptedObj, malesObj, femaleObj]

        return {stats, sortedSchools};

    } catch (e) {
        console.log(e);
    }
}

/**
 * Sends push notifications to mobile and web clients
 * 
 * @param {String} title - Title for push notification 
 * @param {String} body - Body for push notificatoin
 * @param {Object} data - Data for push notification
 */
const sendNotifications = async (title, body, data, history) => {
    try {
        const token = await verifyLogin(history);

        const config = {
            headers: {
                'Authorization': 'Bearer ' + token
            },
        }

        const date = new Date();
        const { tag } = data

        await admin.post('/admin/notification', { title, body, data }, config);
        await admin.post('/admin/announcement', { title, body, tag, sentTime: date }, config);

        alert('notification sent');

    } catch (e) {
        console.log(e)
    }
}

/**
 * sends reminder emails to all hackers who have not applied yet
 * 
 * @param {Object} history history prop from react-router
 */
const remindApply = async (history) => {
  try{
    const token = await verifyLogin(history);

    const config = {
      headers: {
          'Authorization': 'Bearer ' + token
      },
    }

    await admin.get('/admin/remind_apply', config);
    alert('Reminders sent!');
  } catch (e) {
    console.log(e);
  }
}

/**
 * sends reminder emails to all hackers who have not confirmed yet
 * 
 * @param {Object} history history prop from react-router
 */
const remindConfirm = async (history) => {
  try{
    const token = await verifyLogin(history);

    const config = {
      headers: {
          'Authorization': 'Bearer ' + token
      },
    }

    await admin.get('/admin/remind_confirm', config);
    alert('Reminders sent!');

  } catch (e) {
    console.log(e);
  }
}

/**
 * Creates new axios with @PRE_REG_URL
 * return pre-registration database snapshot
 */
const getPreReg = async (history) => {

    var newInstance = await axios.create({
        baseURL: PRE_REG_URL,
    });

    try {
        await verifyLogin(history);

        const response = await newInstance.get('/');

        return response.data;

    } catch (e) {
        console.log(e);
        alert('Something happened...contact Jehf');
    }
}

export default { acceptHacker, getApplicants, login, logout, checkIn, getStatistics, verifyLogin, sendNotifications, getPreReg, remindApply, remindConfirm, deleteOne };