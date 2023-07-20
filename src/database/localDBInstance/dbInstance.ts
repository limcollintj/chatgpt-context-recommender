import fs from 'fs'

/**
 * Retrieves the context from the local repository
 */
class localDBInstance implements DBIterface {
    fileUrlPath: string
    constructor(fileUrlPath: string) {
        this.fileUrlPath = fileUrlPath
    }
    getContext (request: DBRequest)  : Promise<DBResponse>  {
        return new Promise((resolve, reject) => {
            fs.readFile(this.fileUrlPath,'utf8', (err, data) => {
                if(err){
                    reject(new Error(err.message))
                }
                const dbResponse : DBResponse = {
                    context: data,
                    numTokens: data?.length
                }
                resolve(dbResponse)
            })
        })

    }

}

export default localDBInstance