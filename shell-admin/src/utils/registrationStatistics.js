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

const makeObj = (key,value) => {
    return {key:key,value:value};
}

const getStatistics = (arr) => {
    let applicants = numApplicants(arr);
    let confirmed = numConfirmed(arr);
    let applied = numApplied(arr);
    let notApplied = numNotApplied(arr);
    let accepted = numAccepted(arr);
    let males = numMales(arr);
    let females = numFemales(arr);

    let applicantsObj = makeObj("Applicants",applicants)
    let confirmedObj = makeObj("Confirmed",confirmed);
    let appliedObj = makeObj("Applied",applied);
    let notAppliedObj = makeObj("Not Applied",notApplied);
    let acceptedObj = makeObj("Accepted",accepted);
    let malesObj = makeObj("Males",males);
    let femaleObj = makeObj("Females",females);

    let data = [applicantsObj,confirmedObj,appliedObj,notAppliedObj,acceptedObj,malesObj,femaleObj]

    return data;
}

module.exports = {getStatistics}