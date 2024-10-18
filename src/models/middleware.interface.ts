export interface MiddlewareInterface {
    execute: (req: Request, res: Response) => Promise<void>;
}