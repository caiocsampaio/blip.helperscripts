const getExtrasScripts = () => {
    return {
        "userName": "{{contact.name}}",
        "phoneNumber": "{{contact.phoneNumber}}",
        "idUser": "{{contact.identity}}",
        "idMessage": "{{input.message@id}}",
        "message": "{{input.content}}",
        "origin": "{{lastState}}"
    }
}

module.exports.getExtrasScripts = getExtrasScripts