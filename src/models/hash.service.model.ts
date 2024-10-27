export interface HashServiceInterface {
    _generateHash(password: string): Promise<string | null>;
    comparePassword(password: string, hash: string): Promise<boolean | null>;
}