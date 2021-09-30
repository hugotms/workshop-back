'use strict'
const AWS = require('aws-sdk');
const lambda = new AWS.Lambda({region: 'eu-west-3'});
const axios = require("axios");

exports.getBreach = async (url) => {
    try {
        const name = getName(url);
        const breach = await axios.get(`https://haveibeenpwned.com/api/v3/breach/${name}`).then(r=>r.data);
        return JSON.stringify({
            statusCode: 200,
            data: {
                breachName: breach.Name,
                breachCount : breach.PwnCount,
                breachLastDate: breach.BreachDate,
                breachElements: breach.DataClasses
            }
        });
    } catch (err) {
        return JSON.stringify({
            statusCode: 404,
            data: {
                status: 'Aucune fuite de données détectée'
            }
        });
    }
}

const getName = (url) => {
    let tempurl = new URL(url);
    tempurl = tempurl.hostname;
    tempurl = tempurl.split('.');
    tempurl = tempurl[1];
    return tempurl;
}

