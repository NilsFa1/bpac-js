import {BpacObject} from './BpacObject';
import {BpacCommand, Connection, ExportType, PrintOptionConstants} from './util';
import {BpacPrinter} from "./BpacPrinter";
import {BpacObjects} from "./BpacObjects";

export class BpacDocument {
    [Symbol.asyncDispose] = async () => {
        await this.Close();
    };

    public readonly connection = new Connection();

    protected constructor(c: Connection) {
        this.connection = c;
    }

    static async Open(path: string) {
        const command = "IDocument::Open";
        const c = new Connection();
        await c.connect();
        const document = new BpacDocument(c);

        const arg = {
            filePath: path,
            method: command
        };

        const result = await document.connection.execute<never>(arg);
        if (!result.ret) {
            throw new Error("Failed to open Document. Please check Path");
        }

        return document;
    }

    async GetObject(name: string) {
        const command = "IDocument::GetObject";
        this.connection.check();

        const arg = {
            name,
            method: command
        };

        const r = await this.connection.execute<{ p: number }>(arg);
        return new BpacObject(r.value.p, this);
    }

    async Export(type: ExportType, filePath: string, dpi: number) {
        const command = "IDocument::Export";
        this.connection.check();

        const arg = {
            type: 4,
            method: command,
            filePath,
            dpi
        } as BpacCommand;

        const r = await this.connection.execute<never>(arg);
        return r.ret;
    }

    async PrintOut(copyCount: number, option: PrintOptionConstants = PrintOptionConstants.bpoAutoCut) {
        const command = "IDocument::PrintOut";
        this.connection.check();

        const arg = {
            method: command,
            copyCount,
            option
        } as BpacCommand;

        const r = await this.connection.execute<never>(arg);
        return r.ret;
    }

    async EndPrint() {
        const command = "IDocument::EndPrint";
        this.connection.check();

        const arg = {
            method: command,
        } as BpacCommand;

        const r = await this.connection.execute<never>(arg);
        return r.ret;
    }

    async StartPrint(docName: string, option: PrintOptionConstants) {
        const command = "IDocument::StartPrint";
        this.connection.check();

        const arg = {
            method: command,
            docName,
            option
        } as BpacCommand;

        const r = await this.connection.execute<never>(arg);
        return r.ret;
    }

    async DoPrint(dwOption: PrintOptionConstants, szOption: string) {
        const command = "IDocument::DoPrint";
        this.connection.check();

        const arg = {
            method: command,
            dwOption,
            szOption
        } as BpacCommand;

        const r = await this.connection.execute<never>(arg);
        return r.ret;
    }

    async GetImageData(type: ExportType, width: number, height: number) {
        const command = "IDocument::GetImageData";
        this.connection.check();

        const arg = {
            method: command,
            type,
            width,
            height
        } as BpacCommand;

        const r = await this.connection.execute<{ image: object }>(arg);
        return r.value.image;
    }

    async GetObjectsCount(): Promise<number> {
        const command = "IDocument::GetObjectsCount";
        this.connection.check();

        const arg = {
            method: command
        } as BpacCommand;

        const response = await this.connection.execute<{ count: number }>(arg);
        return response.value.count;
    }

    async GetIndexByName(name: string, indexBgn: number): Promise<number | undefined> {
        const command = "IDocument::GetIndexByName";
        this.connection.check();

        const arg = {
            method: command,
            name,
            indexBgn
        } as BpacCommand;

        const response = await this.connection.execute<{ index: number }>(arg);
        return response.value.index;
    }

    async GetObjects(name: string): Promise<BpacObjects | undefined> {
        const command = "IDocument::GetObjects";
        this.connection.check();

        const arg = {
            method: command,
            name
        } as BpacCommand;

        const response = await this.connection.execute<{ p: number }>(arg);
        if (response.value.p >= 0) {
            return new BpacObjects(response.value.p, this);
        } else {
            return undefined;
        }
    }

    async GetBarcodeIndex(name: string): Promise<number | undefined> {
        const command = "IDocument::GetBarcodeIndex";
        this.connection.check();

        const arg = {
            method: command,
            name
        } as BpacCommand;

        const response = await this.connection.execute<{ index: number }>(arg);
        return response.value.index;
    }

    async GetMediaId(): Promise<string | undefined> {
        const command = "IDocument::GetMediaId";
        this.connection.check();

        const arg = {
            method: command
        } as BpacCommand;

        const response = await this.connection.execute<{ id: string }>(arg);
        return response.value.id;
    }

    async GetMediaName(): Promise<string | undefined> {
        const command = "IDocument::GetMediaName";
        this.connection.check();

        const arg = {
            method: command
        } as BpacCommand;

        const response = await this.connection.execute<{ name: string }>(arg);
        return response.value.name;
    }

    async GetPrinterName(): Promise<string | undefined> {
        const command = "IDocument::GetPrinterName";
        this.connection.check();

        const arg = {
            method: command
        } as BpacCommand;

        const response = await this.connection.execute<{ name: string }>(arg);
        return response.value.name;
    }

    async GetText(index: number): Promise<string | undefined> {
        const command = "IDocument::GetText";
        this.connection.check();

        const arg = {
            method: command,
            index
        } as BpacCommand;

        const response = await this.connection.execute<{ text: string }>(arg);
        return response.value.text;
    }

    async GetTextCount(): Promise<number | undefined> {
        const command = "IDocument::GetTextCount";
        this.connection.check();

        const arg = {
            method: command
        } as BpacCommand;

        const response = await this.connection.execute<{ count: number }>(arg);
        return response.value.count;
    }

    async GetTextIndex(name: string): Promise<number | undefined> {
        const command = "IDocument::GetTextIndex";
        this.connection.check();

        const arg = {
            method: command,
            name
        } as BpacCommand;

        const response = await this.connection.execute<{ index: number }>(arg);
        return response.value.index;
    }

    async GetPrinter(): Promise<BpacPrinter | undefined> {
        const command = "IDocument::GetPrinter";
        this.connection.check();

        const arg = {
            method: command
        } as BpacCommand;

        const response = await this.connection.execute<{ p: number }>(arg);
        if (response.value.p >= 0) {
            return new BpacPrinter(response.value.p, this.connection);
        } else {
            return undefined;
        }
    }

    async GetCurrentSheet(): Promise<string | undefined> {
        const command = "IDocument::GetCurrentSheet";
        this.connection.check();

        const arg = {
            method: command
        } as BpacCommand;

        const response = await this.connection.execute<{ name: string }>(arg);
        return response.value.name;
    }

    async GetCutLineCount(): Promise<number | undefined> {
        const command = "IDocument::GetCutLineCount";
        this.connection.check();

        const arg = {
            method: command
        } as BpacCommand;

        const response = await this.connection.execute<{ count: number }>(arg);
        return response.value.count;
    }

    async GetCutLines() {
        const command = "IDocument::GetCutLines";
        this.connection.check();

        const arg = {
            method: command
        } as BpacCommand;

        const response = await this.connection.execute<{ cutlines: unknown }>(arg);
        return response.value.cutlines;
    }

    async GetErrorCode(): Promise<number | undefined> {
        const command = "IDocument::GetErrorCode";
        this.connection.check();

        const arg = {
            method: command
        } as BpacCommand;

        const response = await this.connection.execute<{ errorCode: number }>(arg);
        return response.value.errorCode;
    }

    async GetMarginBottom(): Promise<number | undefined> {
        const command = "IDocument::GetMarginBottom";
        this.connection.check();

        const arg = {
            method: command
        } as BpacCommand;

        const response = await this.connection.execute<{ margin: number }>(arg);
        return response.value.margin;
    }

    async GetMarginLeft(): Promise<number | undefined> {
        const command = "IDocument::GetMarginLeft";
        this.connection.check();

        const arg = {
            method: command
        } as BpacCommand;

        const response = await this.connection.execute<{ margin: number }>(arg);
        return response.value.margin;
    }

    async GetMarginRight(): Promise<number | undefined> {
        const command = "IDocument::GetMarginRight";
        this.connection.check();

        const arg = {
            method: command
        } as BpacCommand;

        const response = await this.connection.execute<{ margin: number }>(arg);
        return response.value.margin;
    }

    async GetMarginTop(): Promise<number | undefined> {
        const command = "IDocument::GetMarginTop";
        this.connection.check();

        const arg = {
            method: command
        } as BpacCommand;

        const response = await this.connection.execute<{ margin: number }>(arg);
        return response.value.margin;
    }

    async GetOrientation(): Promise<number | undefined> {
        const command = "IDocument::GetOrientation";
        this.connection.check();

        const arg = {
            method: command
        } as BpacCommand;

        const response = await this.connection.execute<{ orientation: number }>(arg);
        return response.value.orientation;
    }

    async GetSheetNames(): Promise<string[] | undefined> {
        const command = "IDocument::GetSheetNames";
        this.connection.check();

        const arg = {
            method: command
        } as BpacCommand;

        const response = await this.connection.execute<{ names: string[] | undefined }>(arg);
        return response.value.names;
    }

    async GetWidth(): Promise<number | undefined> {
        const command = "IDocument::GetWidth";
        this.connection.check();

        const arg = {
            method: command
        } as BpacCommand;

        const response = await this.connection.execute<{ width: number }>(arg);
        return response.value.width;
    }

    async GetLength(): Promise<number | undefined> {
        const command = "IDocument::GetLength";
        this.connection.check();

        const arg = {
            method: command
        } as BpacCommand;

        const response = await this.connection.execute<{ length: number }>(arg);
        return response.value.length;
    }

    async Save(): Promise<boolean | undefined> {
        const command = "IDocument::Save";
        this.connection.check();

        const arg = {
            method: command
        } as BpacCommand;

        const response = await this.connection.execute<never>(arg);
        return response.ret;
    }

    async SaveAs(type: ExportType, filePath: string): Promise<boolean | undefined> {
        const command = "IDocument::SaveAs";
        this.connection.check();

        const arg = {
            method: command,
            type,
            filePath
        } as BpacCommand;

        const response = await this.connection.execute<never>(arg);
        return response.ret;
    }

    SetText(index: number, text: string) {
        const method = "IDocument::SetText";

        this.connection.check();
        return this.connection.execute<never>({method, index, text: text} as BpacCommand);
    }

    async SetBarcodeData(index: number, text: string): Promise<boolean | undefined> {
        const method = "IDocument::SetBarcodeData";
        this.connection.check();

        const arg = {
            method,
            index,
            text
        } as BpacCommand;

        const response = await this.connection.execute<never>(arg);
        return response.ret;
    }

    async SetMarginLeftRight(left: number, right: number): Promise<boolean | undefined> {
        const method = "IDocument::SetMarginLeftRight";
        this.connection.check();

        const arg = {
            method,
            left,
            right
        } as BpacCommand;

        const response = await this.connection.execute<never>(arg);
        return response.ret;
    }

    async SetMediaById(id: number, fit: boolean): Promise<boolean | undefined> {
        const method = "IDocument::SetMediaById";
        this.connection.check();

        const arg = {
            method,
            id,
            fit
        } as BpacCommand;

        const response = await this.connection.execute<never>(arg);
        return response.ret;
    }

    async SetMediaByName(name: string, fit: boolean): Promise<boolean | undefined> {
        const method = "IDocument::SetMediaByName";
        this.connection.check();

        const arg = {
            method,
            name,
            fit
        } as BpacCommand;

        const response = await this.connection.execute<never>(arg);
        return response.ret;
    }

    async SetPrinter(name: string, fit: boolean): Promise<boolean | undefined> {
        const method = "IDocument::SetPrinter";
        this.connection.check();

        const arg = {
            method,
            name,
            fit
        } as BpacCommand;

        const response = await this.connection.execute<never>(arg);
        return response.ret;
    }

    async SetCurrentSheet(name: string): Promise<boolean | undefined> {
        const method = "IDocument::SetCurrentSheet";
        this.connection.check();

        const arg = {
            method,
            name
        } as BpacCommand;

        const response = await this.connection.execute<never>(arg);
        return response.ret;
    }

    async SetMarginBottom(margin: number): Promise<boolean | undefined> {
        const method = "IDocument::SetMarginBottom";
        this.connection.check();

        const arg = {
            method,
            margin
        } as BpacCommand;

        const response = await this.connection.execute<never>(arg);
        return response.ret;
    }

    async SetMarginLeft(margin: number): Promise<boolean | undefined> {
        const method = "IDocument::SetMarginLeft";
        this.connection.check();

        const arg = {
            method,
            margin
        } as BpacCommand;

        const response = await this.connection.execute<never>(arg);
        return response.ret;
    }

    async SetMarginRight(margin: number): Promise<boolean | undefined> {
        const method = "IDocument::SetMarginRight";
        this.connection.check();

        const arg = {
            method,
            margin
        } as BpacCommand;

        const response = await this.connection.execute<never>(arg);
        return response.ret;
    }

    async SetMarginTop(margin: number): Promise<boolean | undefined> {
        const method = "IDocument::SetMarginTop";
        this.connection.check();

        const arg = {
            method,
            margin
        } as BpacCommand;

        const response = await this.connection.execute<never>(arg);
        return response.ret;
    }

    async SetLength(length: number): Promise<boolean | undefined> {
        const method = "IDocument::SetLength";
        this.connection.check();

        const arg = {
            method,
            length
        } as BpacCommand;

        const response = await this.connection.execute<never>(arg);
        return response.ret;
    }


    async Close() {
        const command = "IDocument::Close";
        this.connection.check();

        const arg = {
            method: command,
        } as BpacCommand;

        const r = await this.connection.execute<never>(arg);
        await this.connection.disconnect();
        return r.ret;
    }
}
