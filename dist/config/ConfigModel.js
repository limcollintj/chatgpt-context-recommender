class ConfigModel {
    constructor({ chatGptApiKey, databaseType, modelType }) {
        this.chatGptApiKey = chatGptApiKey;
        this.databaseType = databaseType;
        this.modelType = modelType;
    }
}
export default ConfigModel;
