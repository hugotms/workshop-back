const { getId } = require("./getId");
const { report } = require("./report");
const { getSite } = require("./getSite");

exports.handler = async (event) => {
    let responseBody = "";

    switch (event.path) {
        case "/workshop/getid":
            responseBody = await getId(event);
            break;
        case "/workshop/report":
            responseBody = await report(event);
            break;
        case "/workshop/getsite":
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
            "access-control-allow-origin": "*"
        },
        body: responseBody
    };
    return response;
};

