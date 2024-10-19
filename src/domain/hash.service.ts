import bcrypt from 'bcrypt'
export class HashService {
    async _generateHash(password: string, saltRounds: number = 10){
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(password, salt);
    }
    async comparePassword(password: string, hash: string){
        return await bcrypt.compare(password, hash);
    }
}