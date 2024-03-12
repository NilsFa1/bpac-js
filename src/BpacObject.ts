import {BpacDocument} from './BpacDocument';
import {BpacCommand, BpacFontEffect, BpacObjectAttribute, BpacObjectType} from './util';

export class BpacObject {
    private readonly p: unknown;
    public readonly document: BpacDocument;

    constructor(obj: unknown, doc: BpacDocument) {
        this.p = obj;
        this.document = doc;
    }

    setText(text: string) {
        const method = "IObject::SetText";

        this.document.connection.check();
        return this.document.connection.execute<never>({method, p: this.p, text: text} as BpacCommand);
    }

    getText() {
        const method = "IObject::GetText";

        this.document.connection.check();
        return this.document.connection.execute<{ text: string }>({method, p: this.p} as BpacCommand);
    }

    getAttribute(kind: BpacObjectAttribute) {
        const method = "IObject::GetAttribute";

        this.document.connection.check();
        return this.document.connection.execute<object>({method, p: this.p, kind} as BpacCommand);
    }

    getData(kind: number) {
        const method = "IObject::GetData";

        this.document.connection.check();
        return this.document.connection.execute<object>({method, p: this.p, kind} as BpacCommand);
    }

    async getFontBold() {
        const method = "IObject::GetFontBold";

        this.document.connection.check();
        const res = await this.document.connection.execute<boolean>({method, p: this.p} as BpacCommand);
        res.value = res.ret;
        return res;
    }

    getFontEffect() {
        const method = "IObject::GetFontEffect";

        this.document.connection.check();
        return this.document.connection.execute<{ effect: BpacFontEffect }>({method, p: this.p} as BpacCommand);
    }

    async getFontItalics() {
        const method = "IObject::GetFontItalics";

        this.document.connection.check();
        const res = await this.document.connection.execute<boolean>({method, p: this.p} as BpacCommand);
        res.value = res.ret;
        return res;
    }

    getFontMaxPoint() {
        const method = "IObject::GetFontMaxPoint";

        this.document.connection.check();
        return this.document.connection.execute<{ point: number }>({method, p: this.p} as BpacCommand);
    }

    GetFontName() {
        const method = "IObject::GetFontName";

        this.document.connection.check();
        return this.document.connection.execute<{ name: string }>({method, p: this.p} as BpacCommand);
    }

    async getFontStrikeout() {
        const method = "IObject::GetFontStrikeout";

        this.document.connection.check();
        const res = await this.document.connection.execute<boolean>({method, p: this.p} as BpacCommand);
        res.value = res.ret;
        return res;
    }

    async getFontUnderline() {
        const method = "IObject::GetFontUnderline";

        this.document.connection.check();
        const res = await this.document.connection.execute<boolean>({method, p: this.p} as BpacCommand);
        res.value = res.ret;
        return res;
    }

    setAlign(horizontal: number, vertical: number) {
        const method = "IObject::SetAlign";

        this.document.connection.check();
        return this.document.connection.execute<never>({method, p: this.p, horizontal, vertical} as BpacCommand);
    }

    setAttribute(attribute: BpacObjectAttribute) {
        const method = "IObject::SetAttribute";

        this.document.connection.check();
        return this.document.connection.execute<never>({method, p: this.p, attribute} as BpacCommand);
    }

    setData(kind: number, data: unknown, param: unknown) {
        const method = "IObject::SetData";

        const o = Object.prototype.toString.call(data).slice(8, -1);
        const parsedData = o === "Date" ? (data as Date).getTime() / 1e3 : data;

        this.document.connection.check();
        return this.document.connection.execute<never>({
            method,
            p: this.p,
            kind,
            data: parsedData,
            param
        } as BpacCommand);
    }

    setFontBold(bold: boolean) {
        const method = "IObject::SetFontBold";

        this.document.connection.check();
        return this.document.connection.execute<never>({method, p: this.p, bold} as BpacCommand);
    }

    setFontEffect(effect: BpacFontEffect) {
        const method = "IObject::SetFontEffect";

        this.document.connection.check();
        return this.document.connection.execute<never>({method, p: this.p, effect} as BpacCommand);
    }

    setFontItalics(italics: boolean) {
        const method = "IObject::SetFontItalics";

        this.document.connection.check();
        return this.document.connection.execute<never>({method, p: this.p, italics} as BpacCommand);
    }

    setFontMaxPoint(point: number) {
        const method = "IObject::SetFontMaxPoint";

        this.document.connection.check();
        return this.document.connection.execute<never>({method, p: this.p, point} as BpacCommand);
    }

    SetFontName(name: string) {
        const method = "IObject::SetFontName";

        this.document.connection.check();
        return this.document.connection.execute<never>({method, p: this.p, name} as BpacCommand);
    }

    setFontStrikeout(strikeout: boolean) {
        const method = "IObject::SetFontStrikeout";

        this.document.connection.check();
        return this.document.connection.execute<never>({method, p: this.p, strikeout} as BpacCommand);
    }

    setFontUnderline(underline: boolean) {
        const method = "IObject::SetFontUnderline";

        this.document.connection.check();
        return this.document.connection.execute<never>({method, p: this.p, underline} as BpacCommand);
    }

    setPosition(x: number, y: number, width: number, heigth: number) {
        const method = "IObject::SetPosition";

        this.document.connection.check();
        return this.document.connection.execute<never>({method, p: this.p, x, y, width, heigth} as BpacCommand);
    }

    setSelection(start: number, end: number) {
        const method = "IObject::SetPosition";

        this.document.connection.check();
        return this.document.connection.execute<never>({method, p: this.p, start, end} as BpacCommand);
    }

    getHeight() {
        const method = "IObject::GetHeight";

        this.document.connection.check();
        return this.document.connection.execute<{ height: number }>({method, p: this.p} as BpacCommand);
    }

    setHeight(height: number) {
        const method = "IObject::SetHeight";

        this.document.connection.check();
        return this.document.connection.execute<never>({method, p: this.p, height} as BpacCommand);
    }

    getHorizontalAlign() {
        const method = "IObject::GetHorizontalAlign";

        this.document.connection.check();
        return this.document.connection.execute<{ align: number }>({method, p: this.p} as BpacCommand);
    }

    setHorizontalAlign(align: number) {
        const method = "IObject::SetHorizontalAlign";

        this.document.connection.check();
        return this.document.connection.execute<never>({method, p: this.p, align} as BpacCommand);
    }

    getName() {
        const method = "IObject::GetName";

        this.document.connection.check();
        return this.document.connection.execute<{ name: string }>({method, p: this.p} as BpacCommand);
    }

    setName(name: string) {
        const method = "IObject::SetName";

        this.document.connection.check();
        return this.document.connection.execute<never>({method, p: this.p, name} as BpacCommand);
    }

    getOrientation() {
        const method = "IObject::GetOrientation";

        this.document.connection.check();
        return this.document.connection.execute<{ orientation: number }>({method, p: this.p} as BpacCommand);
    }

    setOrientation(orientation: number) {
        const method = "IObject::SetOrientation";

        this.document.connection.check();
        return this.document.connection.execute<never>({method, p: this.p, orientation} as BpacCommand);
    }


    getSelectionEnd() {
        const method = "IObject::GetSelectionEnd";

        this.document.connection.check();
        return this.document.connection.execute<{ selection: number }>({method, p: this.p} as BpacCommand);
    }

    setSelectionEnd(selection: number) {
        const method = "IObject::SetSelectionEnd";

        this.document.connection.check();
        return this.document.connection.execute<never>({method, p: this.p, selection} as BpacCommand);
    }

    getSelectionStart() {
        const method = "IObject::GetSelectionStart";

        this.document.connection.check();
        return this.document.connection.execute<{ selection: number }>({method, p: this.p} as BpacCommand);
    }

    setSelectionStart(selection: number) {
        const method = "IObject::SetSelectionStart";

        this.document.connection.check();
        return this.document.connection.execute<never>({method, p: this.p, selection} as BpacCommand);
    }

    getType() {
        const method = "IObject::GetType";

        this.document.connection.check();
        return this.document.connection.execute<{ type: BpacObjectType }>({method, p: this.p} as BpacCommand);
    }

    getVerticalAlign() {
        const method = "IObject::GetVerticalAlign";

        this.document.connection.check();
        return this.document.connection.execute<{ align: number }>({method, p: this.p} as BpacCommand);
    }

    setVerticalAlign(align: number) {
        const method = "IObject::SetVerticalAlign";

        this.document.connection.check();
        return this.document.connection.execute<never>({method, p: this.p, align} as BpacCommand);
    }

    GetWidth() {
        const method = "IObject::GetWidth";

        this.document.connection.check();
        return this.document.connection.execute<{ width: number }>({method, p: this.p} as BpacCommand);
    }

    setWidth(width: number) {
        const method = "IObject::SetWidth";

        this.document.connection.check();
        return this.document.connection.execute<never>({method, p: this.p, width} as BpacCommand);
    }

    getX() {
        const method = "IObject::GetX";

        this.document.connection.check();
        return this.document.connection.execute<{ X: number }>({method, p: this.p} as BpacCommand);
    }

    setX(X: number) {
        const method = "IObject::SetX";

        this.document.connection.check();
        return this.document.connection.execute<never>({method, p: this.p, X} as BpacCommand);
    }

    getY() {
        const method = "IObject::GetY";

        this.document.connection.check();
        return this.document.connection.execute<{ Y: number }>({method, p: this.p} as BpacCommand);
    }

    setY(Y: number) {
        const method = "IObject::SetY";

        this.document.connection.check();
        return this.document.connection.execute<never>({method, p: this.p, Y} as BpacCommand);
    }

}
