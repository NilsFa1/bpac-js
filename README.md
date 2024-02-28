# bpac-js
This is a library to print on Brother Thermal-Printer with nodejs. This works by sending the commands to the official b-PAC-client Component.

Not all Features are available by now, but filling Templates and exporting or printing is possible.

Before using the package you need to set up the path to the bpacHost.exe. By default this can be found for the 32Bit-Version at `C:\\Program Files (x86)\\Common Files\\Brother\\b-PAC\\bpacHost.exe`.

## Example
```ts
import { BpacConfig, BpacDocument, ExportType } from '@nfails/bpac-js';

BpacConfig.bpacHostPath = "<path to bpacHost.exe>"
async function exportFile(lastname: string) {
const doc = await BpacDocument.Open("<path to lbx template>")
const o = await doc.GetObject("objLastName");
await o.setText(lastname);
await doc.Export(ExportType.bexBmp, `./test.bmp`, 100)
await doc.Close()
}

exportFile('TEST').then(() => console.log('success'))
```

## TODOS
There are many more Methods available on the b-PAC-Client. The logic and command names can be found, in the bpac.js file in the Examples from the official bpac-SDK

Furthermore a usefully extension would be, that the package can automatically detect where to find the bpackHost.exe. After Installation this creates a Windows-Registry entry, which points to the manifest.json.
This file stores the path to the bpacHost.exe.
