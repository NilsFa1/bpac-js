import { ChildProcess, spawn } from 'node:child_process';
import { BpacConfig } from './config';
import { promisified as regedit } from "regedit";
import { readFileSync } from "fs";
import {existsSync} from "node:fs";

export enum PrintOptionConstants {
    bpoDefault = 0,
    bpoAutoCut = 1,
    bpoCutPause = 1,
    bpoCutMark = 2,
    bpoMirroring = 4,
    bpoColor = 8,
    bpoStamp = 128, // 0x00000080
    bpoHalfCut = 512, // 0x00000200
    bpoChainPrint = 1024, // 0x00000400
    bpoTailCut = 2048, // 0x00000800
    bpoQuality = 65536, // 0x00010000
    bpoSpecialTape = 524288, // 0x00080000
    bpoHighSpeed = 16777216, // 0x01000000
    bpoHighResolution = 33554432, // 0x02000000
    bpoCutAtEnd = 67108864, // 0x04000000
    bpoIdLabel = 268435456, // 0x10000000
    bpoMono = 268435456, // 0x10000000
    bpoNoCut = 268435456, // 0x10000000
    bpoRfid = 536870912, // 0x20000000
    bpoContinue = 1073741824, // 0x40000000
}

export enum ExportType {
    bexOpened,
    bexLbx,
    bexLbl,
    bexLbi,
    bexBmp,
    bexPAF,
}

export async function findBpacHostExe() {
    try {
        const regEntryPath = 'HKLM\\SOFTWARE\\Google\\Chrome\\NativeMessagingHosts\\com.brother.bpac'
        const regentries = await regedit.list([regEntryPath]);
        const regEntry = regentries[regEntryPath];
        if(!regEntry.exists) {
            throw new Error('No Windows Registry Entry found for bpac client sdk')
        }
        const path = regEntry.values[''].value.toString();
        if(!existsSync(path)) {
            throw new Error('manifest_chrome.json not found in location: ' + path + ' (Path found in Windows Registry Entry)');
        }
        const file = readFileSync(path, 'utf8')
        const obj = JSON.parse(file.trim())
        const bpacHostPath = path.replace('manifest_chrome.json', obj.path)
        if(existsSync(bpacHostPath)) {
            return bpacHostPath
        }
        throw new Error('BpacHost.exe not found in location from manifest_chrome.json: ' + bpacHostPath);
    } catch (e) {
        if(process.env.NODE_ENV === "debug"){
            throw new Error(e);
        }
        return undefined;
    }
}

export interface BpacCommand {
    method: string;
}

export interface IBpacResult {
    method: string;
    ret: boolean;

    [index: string]: unknown;
}

export class BpacResult<T extends object> {
    //Not Correcty Set?
    private length: number;

    public value: T;

    public method: string;
    public ret: boolean;

    constructor (data: Buffer) {
        this.length = +data.toString("utf-8", 0, 4);
        const obj: IBpacResult = JSON.parse(data.toString("utf-8", 4));
        this.method = obj.method;
        this.ret = obj.ret;
        delete obj.ret;
        delete obj.method;
        this.value = obj as T;
    }
}

export class Connection {
    public available: boolean;
    public path?: string;
    public process?: ChildProcess;

    constructor () {
        this.available = false;
        this.path = undefined;
        this.process = undefined;
    }

    async connect () {
        if(BpacConfig.bpacHostPath == null || BpacConfig.bpacHostPath == '') {
            BpacConfig.bpacHostPath = await findBpacHostExe()
        }

        if (BpacConfig.bpacHostPath == null) {
            throw Error('Please set Path to bpacHost.exe in BpacConfig');
        }
        const pro = spawn(`${BpacConfig.bpacHostPath}`, { stdio: ['pipe', 'pipe', 'pipe'] });
        
        this.path = BpacConfig.bpacHostPath;
        this.process = pro;
        this.available = true;
    }

    async disconnect () {
        this.process?.kill();

        this.path = undefined;
        this.available = false;
    }

    execute<TResult extends object> (command: BpacCommand) {
        const result = new Promise<BpacResult<TResult>>((resolve, reject) => {
            const resolveFn = ((data: Buffer) => {
                this.process?.stdout?.removeListener('data', resolveFn);
                this.process?.stderr?.removeListener('data', resolveFn);
                resolve(new BpacResult<TResult>(data));
            });

            const rejectFn = ((data: Buffer) => {
                this.process?.stdout?.removeListener('data', resolveFn);
                this.process?.stderr?.removeListener('data', resolveFn);
                reject(new BpacResult<TResult>(data));
            });

            this.process?.stdout?.on('data', (data: Buffer) => resolveFn(data));
            this.process?.stderr?.on('data', (data: Buffer) => rejectFn(data));
        });

        const buf = Buffer.allocUnsafe(4);  // Init buffer without writing all data to zeros
        buf.writeInt32LE(JSON.stringify(command).length);
        this.process?.stdin?.write(buf, 'utf-8');
        this.process?.stdin?.write(JSON.stringify(command), 'utf-8');

        return result;
    }

    public check () {
        if (!this.available) {
            throw new Error('No connection to bpacHost Process');
        }
    }
}
