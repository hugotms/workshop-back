'use strict'
const AWS = require('aws-sdk');
const lambda = new AWS.Lambda({region: 'eu-west-3'});
const fetch = require("node-fetch");

exports.getBreach = async (url) => {
    try {
        const name = getName(url);
        const breach = await fetch(`https://haveibeenpwned.com/api/v3/breach/${name}`, {
            method: "GET",
        })
            .then(r => r.json())
            .then(r => r).catch(e => {
                throw e;
            });
        return JSON.stringify({
            statusCode: 200,
            data: {
                breachName: breach.Name,
                breachCount: breach.PwnCount,
                breachLastDate: breach.BreachDate,
                breachElements: breach.DataClasses
            }
        });
    } catch (err) {
        return JSON.stringify({
            statusCode: 404,
            data: err
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
