import { BpacObject } from './BpacObject';
import {
    BpacCommand,
    Connection,
    ExportType,
    PrintOptionConstants
} from './util';

export class BpacDocument {
    [Symbol.asyncDispose] = async () => {
        console.log("using");
        await this.Close();
    };

    public readonly connection = new Connection();

    protected constructor (c: Connection) {
        this.connection = c;
    }

    static async Open (path: string) {
        const command = "IDocument::Open";
        const c = new Connection();
        await c.connect();
        const document = new BpacDocument(c);

        const arg = {
            filePath: path,
            method: command
        };

        const result = await document.connection.execute<never>(arg);
        if (!result) {
            throw new Error("Fehler beim Öffnen des Dokuments");
        }

        return document;
    }

    async GetObject (name: string) {
        const command = "IDocument::GetObject";
        this.connection.check()

        const arg = {
            name,
            method: command
        };

        const r = await this.connection.execute<{ p: number }>(arg);
        return new BpacObject(r.value.p, this);
    }

    async Export (type: ExportType, filePath: string, dpi: number) {
        const command = "IDocument::Export";
        this.connection.check()

        const arg = {
            type: 4,
            method: command,
            filePath,
            dpi
        } as BpacCommand;

        const r = await this.connection.execute<never>(arg);
        return r.ret;
    }

    async PrintOut (copyCount: number, option: PrintOptionConstants = PrintOptionConstants.bpoAutoCut) {
        const command = "IDocument::PrintOut";
        this.connection.check()

        const arg = {
            method: command,
            copyCount,
            option
        } as BpacCommand;

        const r = await this.connection.execute<never>(arg);
        return r.ret;
    }

    async EndPrint () {
        const command = "IDocument::EndPrint";
        this.connection.check();

        const arg = {
            method: command,
        } as BpacCommand;

        const r = await this.connection.execute<never>(arg);
        return r.ret;
    }

    async Close () {
        const command = "IDocument::Close";
        this.connection.check()

        const arg = {
            method: command,
        } as BpacCommand;

        const r = await this.connection.execute<never>(arg);
        await this.connection.disconnect();
        return r.ret;
    }
}
