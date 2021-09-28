//const { getId } = require("./getId");
const { report } = require("./report");
const { getSite } = require("./getSite")

exports.handler = async (event) => {
const { getId } = require("./getId");
const { report } = require("./report");
const { getSite } = require("./getSite")

    let responseBody = "";

    switch (event.path) {
        case "/getId":
            //responseBody = getId(event);
            break;
        case "/report":
            responseBody = await report(event);
            break;
        case "/getSite":
            responseBody = getSite(event);
            break;
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

