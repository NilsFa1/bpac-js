import { BpacDocument } from './BpacDocument';
import { BpacCommand } from './util';

export class BpacObject {
    private readonly p: unknown;
    public readonly document: BpacDocument;

    constructor (obj: unknown, doc: BpacDocument) {
        this.p = obj;
        this.document = doc;
    }

    setText (text: string) {
        const method = "IObject::SetText";

        this.document.connection.check();

        return this.document.connection.execute<never>({ method, p: this.p, text: text } as BpacCommand);
    }
}
