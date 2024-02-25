import { BpacDocument } from './BpacDocument';

export class BpacObject {
    private readonly p : unknown;
    public readonly document: BpacDocument
    constructor(obj: unknown, doc: BpacDocument) {
        this.p = obj;
        this.document = doc;
    }

    setText(text: string) {
        const method = "IObject::SetText";

        this.document.connection.check();

        // @ts-ignore
        return this.document.connection.execute<void>({ method, p: this.p ,text: text})
    }
}
