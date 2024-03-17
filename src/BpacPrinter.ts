import {BpacCommand, Connection} from "./util";

export class BpacPrinter {
    private readonly p: unknown;
    private readonly connection: Connection

    constructor(obj: unknown, connection: Connection) {
        this.p = obj;
        this.connection = connection;
    }

    GetPrinterClass() {
        return new BpacPrinter(undefined, new Connection())
    }

    async GetInstalledPrinters() {
        const method = "IPrinter::GetInstalledPrinters";
        this.connection.check();

        const arg = {
            method,
            p: this.p
        } as BpacCommand;

        const response = await this.connection.execute<{ printers: string[] | undefined }>(arg);
        return response.value?.printers;
    }

    async GetMediaId(): Promise<string | undefined> {
        const method = "IPrinter::GetMediaId";
        this.connection.check();

        const arg = {
            method,
            p: this.p
        } as BpacCommand;

        const response = await this.connection.execute<{ id: string }>(arg);
        return response.value?.id;
    }

    async GetMediaName(): Promise<string | undefined> {
        const method = "IPrinter::GetMediaName";
        this.connection.check();

        const arg = {
            method,
            p: this.p
        } as BpacCommand;

        const response = await this.connection.execute<{ name: string }>(arg);
        return response.value?.name;
    }

    async GetPrintedTapeLength(): Promise<number | undefined> {
        const method = "IPrinter::GetPrintedTapeLength";
        this.connection.check();

        const arg = {
            method,
            p: this.p
        } as BpacCommand;

        const response = await this.connection.execute<{ length: number }>(arg);
        return response.value?.length;
    }

    async GetSupportedMediaIds() {
        const method = "IPrinter::GetSupportedMediaIds";
        this.connection.check();

        const arg = {
            method,
            p: this.p
        } as BpacCommand;

        const response = await this.connection.execute<{ mediaIds: number[] | undefined }>(arg);
        return response.value?.mediaIds;
    }

    async GetSupportedMediaNames() {
        const method = "IPrinter::GetSupportedMediaNames";
        this.connection.check();

        const arg = {
            method,
            p: this.p
        } as BpacCommand;

        const response = await this.connection.execute<{ mediaNames: string[] | undefined }>(arg);
        return response.value?.mediaNames;
    }

    async IsMediaIdSupported(id: string): Promise<boolean | undefined> {
        const method = "IPrinter::IsMediaIdSupported";
        this.connection.check();

        const arg = {
            method,
            p: this.p,
            id
        } as BpacCommand;

        const response = await this.connection.execute<never>(arg);
        return response.ret;
    }

    async IsMediaNameSupported(name: string): Promise<boolean | undefined> {
        const method = "IPrinter::IsMediaNameSupported";
        this.connection.check();

        const arg = {
            method,
            p: this.p,
            name
        } as BpacCommand;

        const response = await this.connection.execute<never>(arg);
        return response.ret;
    }

    async IsPrinterOnline(name: string): Promise<boolean | undefined> {
        const method = "IPrinter::IsPrinterOnline";
        this.connection.check();

        const arg = {
            method,
            p: this.p,
            name
        } as BpacCommand;

        const response = await this.connection.execute<never>(arg);
        return response.ret;
    }

    async IsPrinterSupported(name: string): Promise<boolean | undefined> {
        const method = "IPrinter::IsPrinterSupported";
        this.connection.check();

        const arg = {
            method,
            p: this.p,
            name
        } as BpacCommand;

        const response = await this.connection.execute<never>(arg);
        return response.ret;
    }

    async ErrorCode(): Promise<number | undefined> {
        const method = "IPrinter::GetErrorCode";
        this.connection.check();

        const arg = {
            method,
            p: this.p
        } as BpacCommand;

        const response = await this.connection.execute<{ errorCode: number }>(arg);
        return response.value?.errorCode;
    }

    async ErrorString(): Promise<string | undefined> {
        const method = "IPrinter::GetErrorString";
        this.connection.check();

        const arg = {
            method,
            p: this.p
        } as BpacCommand;

        const response = await this.connection.execute<{ errorString: string }>(arg);
        return response.value?.errorString;
    }

    async Name(): Promise<string | undefined> {
        const method = "IPrinter::GetName";
        this.connection.check();

        const arg = {
            method,
            p: this.p
        } as BpacCommand;

        const response = await this.connection.execute<{ name: string }>(arg);
        return response.value?.name;
    }

    async PortName(): Promise<string | undefined> {
        const method = "IPrinter::GetPortName";
        this.connection.check();

        const arg = {
            method,
            p: this.p
        } as BpacCommand;

        const response = await this.connection.execute<{ port: string }>(arg);
        return response.value?.port;
    }

}
