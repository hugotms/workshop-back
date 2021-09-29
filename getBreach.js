'use strict'
const AWS = require('aws-sdk');
const lambda = new AWS.Lambda({region: 'eu-west-3'});
const fetch = require("node-fetch");

exports.getBreach = async (url) => {
    const name = getName(url);
    const breach = await fetch(`https://haveibeenpwned.com/api/v3/breach/${name}`, {
        method: "POST",
    })
        .then(r => r.json())
        .then(r => {
            console.log(r);
            return r
        }).catch(e => console.log(e));
    try {
        return JSON.stringify({
            statusCode: 200,
            data: {
                name: breach.Name,
                breaches : breach.PwnCount,
                lastDate: breach.BreachDate,
                elements: breach.DataClasses
            }
        });
    } catch (err) {
        return JSON.stringify({
            statusCode: 404,
            data: 'Unable to proceed information'
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

