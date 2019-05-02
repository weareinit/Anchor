/**
 * makes token null, routes to landing page
 * @param {Object} history - History prop from react-router
 */
const authFailure = async (history) => {
    alert('Unauthorized, please login');

    await localStorage.setItem("token",null);

    history.push('/')
}

export default authFailure;