class ConfigModel {

    chatGptApiKey: string
    databaseType: 'local' 
    modelType: string

    constructor({chatGptApiKey, databaseType, modelType}: {chatGptApiKey: string, databaseType: 'local', modelType: string}) {
        this.chatGptApiKey = chatGptApiKey
        this.databaseType = databaseType
        this.modelType = modelType
    }
}

export default ConfigModel