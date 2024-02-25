# bpac-js
This is a library to print on Brother Thermal-Printer with nodejs. This works by sending the commands to the official b-PAC-client Component.

Not all Features are available by now, but filling Templates and exporting or printing is possible.

Before using the package you need to set up the path to the bpacHost.exe. By default this can be found for the 32Bit-Version at `C:\\Program Files (x86)\\Common Files\\Brother\\b-PAC\\bpacHost.exe`.

## TODOS
There are many more Methods available on the b-PAC-Client. The logic and command names can be found, when installing the official Browser-Extension and looking at the bpac.js file.
On Windows you can find the Chrome-Extensions at: `C:\Users\<User>\AppData\Local\Google\Chrome\User Data\Default\Extensions`

Furthermore a usefully extension would be, that the package can automatically detect where to find the bpackHost.exe. After Installation this creates a Windows-Registry entry, which points to the manifest.json.
In this file is the path to the bpacHost.exe stored.
