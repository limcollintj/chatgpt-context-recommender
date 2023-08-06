import fs from 'fs';
/**
 * Retrieves the context from the local repository
 */
class localDBInstance {
    constructor(fileUrlPath) {
        this.fileUrlPath = fileUrlPath;
    }
    getContext(request) {
        return new Promise((resolve, reject) => {
            fs.readFile(this.fileUrlPath, 'utf8', (err, data) => {
                if (err) {
                    reject(new Error(err.message));
                }
                const dbResponse = {
                    context: data,
                    numTokens: data?.length
                };
                resolve(dbResponse);
            });
        });
    }
}
export default localDBInstance;
