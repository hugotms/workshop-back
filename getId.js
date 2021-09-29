'use strict'
const AWS = require('aws-sdk');
const lambda = new AWS.Lambda({ region: 'eu-west-3' });

exports.getId = async (RequestParams) => {
    return JSON.stringify({
        statusCode: 200,
        data: RequestParams.requestContext.requestId
    });
}