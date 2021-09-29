'use strict'
const AWS = require('aws-sdk');
const lambda = new AWS.Lambda({ region: 'eu-west-3' });

exports.report = async (RequestParams) => {
    let bdd = new AWS.DynamoDB.DocumentClient();
    let {url, id} = JSON.parse(RequestParams.body);
    let params = {
        TableName: "reported",
        Item: {
            id: id,
            url: url,
            date : new Date().getTime() / 1000
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
            data: 'Unable to set information'
        });
    }
}
