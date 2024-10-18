export const fromUTF8ToBase64 = (code: string) => {
    return Buffer.from(code, 'utf8').toString('base64');
}