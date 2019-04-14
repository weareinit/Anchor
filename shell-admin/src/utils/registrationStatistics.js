const numApplicants = (arr) => {
    return arr.length
}

const numConfirmed = (arr) => {
    let count = 0;
    arr.map(hacker => {
        const {applicationStatus} = hacker;

        if(applicationStatus == 'confirmed')
            count ++;
    })

    return count;
}

const numApplied = (arr) => {
    let count = 0;
    arr.map(hacker => {
        const {applicationStatus} = hacker;

        if(applicationStatus == 'applied')
            count ++;
    })

    return count;
}

const numNotApplied = (arr) => {
    let count = 0;
    arr.map(hacker => {
        const {applicationStatus} = hacker;

        if(applicationStatus == 'not applied')
            count ++;
    })

    return count;
}

const numAccepted = (arr) => {
    let count = 0;
    arr.map(hacker => {
        const {applicationStatus} = hacker;

        if(applicationStatus == 'accepted')
            count ++;
    })

    return count;
}

const numMales = (arr) => {
    let count = 0;
    arr.map(hacker => {
        const {gender} = hacker;

        if(gender && gender == 'male')
            count ++;
    })

    return count;
}

const numFemales = (arr) => {
    let count = 0;
    arr.map(hacker => {
        const {gender} = hacker;

        if(gender && gender == 'female')
            count ++;
    })

    return count;
}

module.exports = {numApplicants,numConfirmed,numAccepted,numApplied,numNotApplied,numFemales,numMales}