import {BpacDocument} from "./BpacDocument";
import {BpacCommand} from "./util";
import {BpacObject} from "./BpacObject";

export class BpacObjects {
    public readonly p: unknown;
    public readonly document: BpacDocument;

    constructor(obj: unknown, doc: BpacDocument) {
        this.p = obj;
        this.document = doc;
    }

    async GetItem(index: number): Promise<BpacObject | undefined> {
        const method = "IObjects::GetItem";
        this.document.connection.check();

        const arg = {
            method,
            p: this.p,
            index
        } as BpacCommand;

        const response = await this.document.connection.execute<{ p: number }>(arg);

        if (!response.value || response.value.p < 0) {
            return undefined;
        }

        return new BpacObject(response.value.p, this.document);
    }

    async GetCount(): Promise<number | undefined> {
        const method = "IObjects::GetCount";
        this.document.connection.check();

        const arg = {
            method,
            p: this.p
        } as BpacCommand;

        const response = await this.document.connection.execute<{ count: number }>(arg);
        return response.value?.count;
    }

    async GetIndex(obj: BpacObjects): Promise<number | undefined> {
        const method = "IObjects::GetIndex";
        this.document.connection.check();

        const arg = {
            method,
            p: this.p,
            obj: obj.p
        } as BpacCommand;

        const response = await this.document.connection.execute<{ index: number }>(arg);
        return response.value?.index;
    }

    async GetIndexByName(name: string, indexBgn: number): Promise<number | undefined> {
        const method = "IObjects::GetIndexByName";
        this.document.connection.check();

        const arg = {
            method,
            p: this.p,
            name,
            indexBgn
        } as BpacCommand;

        const response = await this.document.connection.execute<{ index: number }>(arg);
        return response.value?.index;
    }

    async Insert(index: number, type: string, X: number, Y: number, width: number, height: number, option: any): Promise<BpacObject | undefined> {
        const method = "IObjects::Insert";
        this.document.connection.check();

        const arg = {
            method,
            p: this.p,
            index,
            type,
            X,
            Y,
            width,
            height,
            option
        } as BpacCommand;

        const response = await this.document.connection.execute<{ p: number }>(arg);

        if (!response.value || response.value.p < 0) {
            return undefined;
        }

        return new BpacObject(response.value.p, this.document);
    }

    async Remove(index: number): Promise<boolean | undefined> {
        const method = "IObjects::Remove";
        this.document.connection.check();

        const arg = {
            method,
            p: this.p,
            index
        } as BpacCommand;

        const response = await this.document.connection.execute<never>(arg);
        return response.ret;
    }

}