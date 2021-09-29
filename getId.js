'use strict'
const AWS = require('aws-sdk');
const lambda = new AWS.Lambda({ region: 'eu-west-3' });
let bdd = new AWS.DynamoDB.DocumentClient();

exports.getId = async (RequestParams) => {
    return JSON.stringify({
        statusCode: 200,
        data: RequestParams.requestContext.requestId
    });
}
