exports.findMintFinalizacoes = (function () {
    return function (flow) {
        var finalizacaoBlocks = [];
        var conditionOutputs = Object.keys(flow).forEach((k) => {
            var blipblock = flow[k];
            
            var conditionOutputs = blipblock.$conditionOutputs.filter(c => 
                c.conditions.filter(o => 
                    o.values.find(v => v.indexOf('FINALIZACAO_') != -1)
                ).length > 0
            );
            
            if (conditionOutputs.length > 0) {
                var outputConditions = [];
                conditionOutputs.forEach(c => {
                    outputConditions.push({
                        $title: flow[c.stateId].$title,
                        values: c.conditions[0].values
                    })
                })
                finalizacaoBlocks.push({
                    $title: blipblock.$title,
                    outputConditions
                })
            }
        });

        return finalizacaoBlocks;
    }
})()