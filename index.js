exports.handler = async (event) => {
    let responseBody = "";

    switch (event.path) {
        case "/getId":
            responseBody = getId(event);
            break;
        case "/report":
            responseBody = report(event);
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