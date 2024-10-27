export class OutCreateSupplierErrors {
    constructor(public status: string,
                public extensions: {message: string, field: string},
                public data: null) { }
}