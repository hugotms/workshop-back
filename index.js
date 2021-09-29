//const { getId } = require("./getId");
const { report } = require("./report");
const { getSite } = require("./getSite")

exports.handler = async (event) => {
    let responseBody = "";

    switch (event.path) {
        case "/getId":
            //responseBody = getId(event);
            break;
        case "/report":
            responseBody = await report(event);
            break;
        case "/getsite":
            responseBody = await getSite(event);
            break;
        default:
            responseBody = JSON.stringify({
                statusCode: 404,
                data: "Action not allowed"
            });
    }

    let response = {
        headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin" : "*"
        },
        body: responseBody
    };
    return response;
};