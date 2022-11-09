export interface APIResult {
    error?: string;
}

export interface LoginResult extends APIResult {
    id: number;
}
