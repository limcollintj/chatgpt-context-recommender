/**
 * Retrieves the context from the local repository
 */
class localDBInstance implements DBIterface {
    constructor() {

    }
    getContext (request: DBRequest)  {
        const dbResponse : DBResponse = {
            context: "", // TODO
            numTokens: 1 // TODO
        }
        return dbResponse
    }

}

export default localDBInstance