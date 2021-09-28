let bdd = new AWS.DynamoDB.DocumentClient();

export const report = async (RequestParams) => {
    let params = {
        TableName: "Reported",
        Item: {
            url: RequestParams.url,
            source : RequestParams.source,
            date : new Date(),
        }
    };
    try {
        let res = await bdd.put(params).promise();
    } catch (err) {
        responseBody = JSON.stringify({
            statusCode: 404,
            data: 'Unable to put requested information'
        });
    }
}
//------------ PUT -----------------------------
