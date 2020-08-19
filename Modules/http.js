exports.findHttp = (function () {
    return function (flow, isTitleOnly) {
        var httpBlocks = [];
        var requests = Object.keys(flow).forEach((k) => {
            var blipblock = flow[k];

            var leavingHttp = blipblock.$leavingCustomActions.filter(a => a.type == 'ProcessHttp');
            var enterHttp = blipblock.$enteringCustomActions.filter(a => a.type == 'ProcessHttp');

            if (leavingHttp.length > 0 || enterHttp.length > 0) {
                if (isTitleOnly) {
                    httpBlocks.push(blipblock.$title);
                } else {
                    httpBlocks.push({
                        $title: blipblock.$title,
                        $enteringCustomActions: blipblock.$enteringCustomActions,
                        $leavingCustomActions: blipblock.$leavingCustomActions
                    });
                }
                
            }
        });

        return httpBlocks;
    }
})()