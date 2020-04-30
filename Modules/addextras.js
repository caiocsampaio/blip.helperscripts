exports.addextrastoscripts = (function () {
	function ReplaceExtras(searchObject, extrasObj) {
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
		})
		return searchObject
	}
	return function (blipJson) {
			try {
				var fs = require('fs')
				var extrasService = require('./../resources/extras')
				var extrasObj = extrasService.getExtrasScripts()
				Object.keys(blipJson).forEach(function (k) {
					var blipblock = blipJson[k]
					blipblock['$leavingCustomActions'] = ReplaceExtras(blipblock['$leavingCustomActions'], extrasObj)
					blipblock['$enteringCustomActions'] = ReplaceExtras(blipblock['$enteringCustomActions'], extrasObj)
				})

				return blipJson;
				
			} catch (error) {
				console.log(error)
			}
		}
	
})()