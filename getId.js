'use strict'
const AWS = require('aws-sdk');
const lambda = new AWS.Lambda({ region: 'eu-west-3' });
let bdd = new AWS.DynamoDB.DocumentClient();

export const getId = async (RequestParams) => {
    const {requestId} = JSON.parse(RequestParams.requestContext.requestId);
    return JSON.stringify({
        statusCode: 200,
        data: requestId
    });
}
