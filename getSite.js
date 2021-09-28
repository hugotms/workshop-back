'use strict'
const AWS = require('aws-sdk');
const lambda = new AWS.Lambda({ region: 'eu-west-3' });

const checkUrl = (url) => {
    let bdd = new AWS.DynamoDB.DocumentClient();
    let params = {
        TableName: "whitelist",
        Key: {
            url: url
        }
    };
    try {
        let data = bdd.get(params).promise();
        return 200;
    } catch (err) {
         return 403;
    }
}

const checkMatch = (url) => {
    let bdd = new AWS.DynamoDB.DocumentClient();
    let params = {
        TableName: "whitelist"
    };

    const scanResults = [];
    let items = null;

    try {
        do {
            items =  bdd.scan(params).promise();
            items.Items.forEach((item) => scanResults.push(item));
            params.ExclusiveStartKey  = items.LastEvaluatedKey;
        } while(typeof items.LastEvaluatedKey !== "undefined");

        let biggerPercentage = 0;
        let urlToKeep;

        scanResults.forEach((item) => {
            let s1 = url.toLowerCase();
            let s2 = item.toLowerCase();
            let percentage = 100;

            for (let i=0; i <= s1.length; i++) {
                for(let y=0; s2.length; y++) {
                    if (s1.charAt(i) != s2.charAt(y)) {
                        percentage = percentage - (100 / s1.length);
                    }
                }
            }

            if (percentage > biggerPercentage) {
                urlToKeep = item;
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

export const getSite = async (event) => {
    let response = ""
    let url = JSON.parse(event.body);

    if (checkUrl(url) == 200) {
        return JSON.stringify({
            statusCode: 200,
            data: 'Site secured'
        });
    } else {
        return checkMatch(url);
    }
}