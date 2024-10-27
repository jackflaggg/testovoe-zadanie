export const fromBase64ToUTF8 = (code: string) => {
    return Buffer.from(code, 'base64').toString('utf8');
}

export const fromUTF8ToBase64 = (code: string) => {
    return Buffer.from(code, 'utf8').toString('base64');
}