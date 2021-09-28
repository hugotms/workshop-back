'use strict'
const AWS = require('aws-sdk');
const lambda = new AWS.Lambda({ region: 'eu-west-3' });
let bdd = new AWS.DynamoDB.DocumentClient();

exports.report = async (RequestParams) => {
    const {url, source} = JSON.parse(RequestParams.body);
    let params = {
        TableName: "reported",
        Item: {
            id: RequestParams.requestContext.requestId,
            url: url,
            source : source,
            date : new Date().toISOString()
        }
    };
    try {
        let res = await bdd.put(params).promise();
        return JSON.stringify({
            statusCode: 200,
            data: 'Ok'
        });
    } catch (err) {
        return JSON.stringify({
            statusCode: 404,
            data: 'Unable to get requested information'
        });
    }
}
