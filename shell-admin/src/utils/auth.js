const authFailure = async (history) => {
    alert('Unauthorized, please login');

    await localStorage.setItem("token",null);

    history.push('/')
}

export default authFailure;