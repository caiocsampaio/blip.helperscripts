const getExtrasScripts = () => {
    return {
        "userName": "{{contact.name}}",
        "phoneNumber": "{{contact.phoneNumber}}",
        "message": "{{input.content}}",
        "origin": "{{lastState}}",
        "perfilMovel": "{{mobileClientType}}",
        "lastTicketId": "{{lastTicketId}}"
    }
}

module.exports.getExtrasScripts = getExtrasScripts