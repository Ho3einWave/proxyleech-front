function request_image(url: string) {
    return new Promise(function (resolve, reject) {
        var img = new Image();
        img.onload = function () {
            resolve(img);
        };
        img.onerror = function () {
            reject(url);
        };
        img.src =
            url +
            "?random-no-cache=" +
            Math.floor((1 + Math.random()) * 0x10000).toString(16);
    });
}

function ping(url: string, multiplier?: number): Promise<number> {
    return new Promise(function (resolve) {
        const start = new Date().getTime();
        const response = function () {
            let delta = new Date().getTime() - start;
            delta *= multiplier || 1;
            resolve(delta);
        };
        request_image(url).then(response).catch(response);

        // Set a timeout for max-pings, 5s.
        setTimeout(function () {
            resolve(-1);
        }, 5000);
    });
}

export default ping;
