exports.findHttp = (function () {
    return function (flow, isTitleOnly, isUrlOnly) {
        var httpBlocks = [];
        if (isUrlOnly) {
            httpBlocks = '';
        }
        var requests = Object.keys(flow).forEach((k) => {
            var blipblock = flow[k];

            var leavingHttp = blipblock.$leavingCustomActions.filter(a => a.type == 'ProcessHttp');
            var enterHttp = blipblock.$enteringCustomActions.filter(a => a.type == 'ProcessHttp');

            if (leavingHttp.length > 0 || enterHttp.length > 0) {
                if (isTitleOnly) {
                    httpBlocks.push(blipblock.$title);
                } else if (isUrlOnly) {
                    let enter = enterHttp.map(a => a.settings.uri);
                    let leave = leavingHttp.map(a => a.settings.uri);
                    if (enter.length > 0) {
                        httpBlocks += (`${enter}\n`);
                    }
                    if (leave.length > 0) {
                        httpBlocks += (`${leave}\n`);
                    }
                } else {
                    httpBlocks.push({
                        $title: blipblock.$title,
                        $enteringCustomActions: enterHttp,
                        $leavingCustomActions: leavingHttp
                    });
                }
            }
        });

        return httpBlocks;
    }
})()