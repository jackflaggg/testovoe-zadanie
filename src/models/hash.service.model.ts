export interface HashServiceInterface {
    _generateHash(password: string, saltRounds: number): Promise<string | null>;
    comparePassword(password: string, hash: string): Promise<boolean | null>;
}