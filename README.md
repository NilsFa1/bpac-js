# bpac-js
This is a library to print on Brother Thermal-Printer with nodejs. This works by sending the commands to the official b-PAC-client Component.

## Requierements
### b-Pac Client Component
The official b-PAC Client Component [Brother Download Website](https://support.brother.com/g/s/es/dev/en/bpac/download/index.html) must be installed. 

If the Installation-Location differs from the Default-Location it can happen, that the path to the `bpacHost.exe` has to be set manually in your program.
````ts
BpacConfig.bpacHostPath = "<path to bpacHost.exe>"
````

### Printer Driver
Install the appropriate printer driver for your Brother printer on your system. This can also be found on the official Brother Website.

## Usage
### Install
`npm install @nfails/bpac-js` 

### Example - Export
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

### Example - Print
```ts
async function printLabel(lastName) {
  const doc = await BpacDocument.Open("<path to lbx template>")
  const o = await doc.GetObject("objLastName");
  await doc.SetPrinter(<PrinterName>, false);
  await o.setText(lastName);
  await doc.StartPrint("Sample Label");
  await doc.PrintOut(1);
  await doc.EndPrint();
  await doc.Close();
}
```

## Contribute
If you encounter issues or have suggestions, feel free to contribute to the project.
