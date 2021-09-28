'use strict'
const AWS = require('aws-sdk');
const lambda = new AWS.Lambda({ region: 'eu-west-3' });

const checkUrl = async (url) => {
    let bdd = new AWS.DynamoDB.DocumentClient();
    let params = {
        TableName: "whitelist",
        Key: {
            url: url
        }
    };
    try {
        let data = await bdd.get(params).promise();
        if (data.Item) {
            return 200;
        } else {
            return 400;
        }
    } catch (err) {
        return 403;
    }
}

const checkMatch = async (url) => {
    let bdd = new AWS.DynamoDB.DocumentClient();
    let params = {
        TableName: "whitelist"
    };

    let biggerPercentage = 0;
    let urlToKeep;

    try {
        let data = await bdd.scan(params).promise();
        data.Items.forEach((item) => {
            let urlToCheck = item.url;
            if (Math.abs(urlToCheck.length - url.length) < 4) {
                let s1 = "";
                let s2 = "";
                if (url.length < urlToCheck.length) {
                    s1 = url.toLowerCase();
                    s2 = urlToCheck.toLowerCase();
                } else {
                    s1 = urlToCheck.toLowerCase();
                    s2 = url.toLowerCase();
                }
                let percentage = 100;

                for (let i = 0; i < s1.length; i++) {
                    if (s1.charAt(i) != s2.charAt(i)) {
                        percentage = percentage - 100 / s1.length;
                    }
                }

                if (percentage > biggerPercentage) {
                    biggerPercentage = percentage;
                    urlToKeep = urlToCheck;
                }
            }
        });

        if (biggerPercentage >= 90) {
            return JSON.stringify({
                statusCode: 201,
                data: urlToKeep
            });
        } else {
            return JSON.stringify({
                statusCode: 402,
                data: 'Unknown website'
            });
        }
    } catch (err) {
        return JSON.stringify({
            statusCode: 403,
            data: 'Unable to get requested information'
        });
    }
}

exports.getSite = async (event) => {
    let { url } = JSON.parse(event.body);

    if (await checkUrl(url) == 200) {
        return JSON.stringify({
            statusCode: 200,
            data: 'Site secured'
        });
    } else {
        return await checkMatch(url);
    }
}