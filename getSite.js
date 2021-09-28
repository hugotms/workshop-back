'use strict'
const AWS = require('aws-sdk');
const lambda = new AWS.Lambda({ region: 'eu-west-3' });

export const getSite = async (event) => {
    let bdd = new AWS.DynamoDB.DocumentClient();
    let response = ""
    let url = JSON.parse(event.body);
    let params = {
        TableName: "whitelist"
    };

    const scanResults = [];
    let items = null;

    try {
        do {
            items =  await documentClient.scan(params).promise();
            items.Items.forEach((item) => scanResults.push(item));
            params.ExclusiveStartKey  = items.LastEvaluatedKey;
        } while(typeof items.LastEvaluatedKey !== "undefined");

        scanResults.forEach((item) => {
            //
        });
        return response;
    } catch (err) {
        return JSON.stringify({
            statusCode: 403,
            data: 'Unable to get requested information'
        });
    }
}