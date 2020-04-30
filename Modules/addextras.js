exports.addextrastoscripts = (function () {
	function ReplaceExtras(searchObject, extrasObj, deleteProperties) {
		Object.keys(searchObject).forEach(function (k) {
			var action = searchObject[k]
			if (action['type'] && action['type'] === 'TrackEvent') {
				if (Object.keys(action['settings']['extras']).length === 0) {
					action['settings']['extras'] = extrasObj
				}
				else {
					let currentExtras = action['settings']['extras'];
					action['settings']['extras'] = Object.assign(currentExtras, extrasObj)
				}
			}

			try{
				if (deleteProperties) {
					for (const j in deleteProperties) {
						if (deleteProperties.hasOwnProperty(j)) {
							const prop = deleteProperties[j];
							if (action['settings']['extras'][prop]) {
								delete action['settings']['extras'][prop];
							}
						}
					}
				}
			}
			catch (ex) {
				console.log(ex);
			}
		})
		return searchObject
	}
	return function (blipJson, deleteProperties) {
			try {
				var fs = require('fs')
				var extrasService = require('./../resources/extras')
				var extrasObj = extrasService.getExtrasScripts()
				Object.keys(blipJson).forEach(function (k) {
					var blipblock = blipJson[k]
					blipblock['$leavingCustomActions'] = ReplaceExtras(blipblock['$leavingCustomActions'], extrasObj, deleteProperties)
					blipblock['$enteringCustomActions'] = ReplaceExtras(blipblock['$enteringCustomActions'], extrasObj, deleteProperties)
				})

				return blipJson;
				
			} catch (error) {
				console.log(error)
			}
		}
	
})()