export const fromBase64ToUTF8 = (code: string) => {
    return Buffer.from(code, 'base64').toString('utf8');
}