export interface DBResponse {
    context: string,
    numTokens: number
}

export interface DBRequest {

}

export interface DBIterface {
    getContext: (request: DBRequest) => Promise<DBResponse>
}
