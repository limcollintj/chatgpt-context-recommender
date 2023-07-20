interface DBResponse {
    context: string,
    numTokens: number
}

interface DBRequest {
    
}

interface DBIterface {
    getContext: (request: DBRequest) => Promise<DBResponse>  
}