# PlayPush CLI Tool Documentation
## Overview
The PlayPush CLI tool is designed to facilitate the process of uploading Android App Bundles (AAB) to the Google Play Store. It provides a simple command-line interface (CLI) for managing the upload of your application bundles, setting release notes, and specifying the release track.

## Examples
1. Upload an App Bundle:

```bash
npx playpush -c /path/to/keyfile.json -v 1.0.0 --p com.example.myapp -b /path/to/app.aab 
```
2. Upload an App Bundle with release notes:
```bash
npx playpush -c /path/to/keyfile.json -v 1.0.0 -n "Initial release" -p com.example.myapp -b /path/to/app.aab 

```
3. Upload an App Bundle to beta channel:
```bash
npx playpush -v 1.0.0 -p com.example.myapp -b /path/to/app.aab -t beta
```

## Requirements
To use this CLI too you need: 
* [Create a service account and JSON keyfile](documentation/CreateServiceAccount.md)
* [Add the service account to you Google Play Console](documentation/AddServiceAccount.md)

## Environment Variables
* set CREDENTIALS_KEYFILE to specify the path to the `keyfile.json` file. If not provided through the command-line options, this environment variable will be used if set.

## Options

### Global Options
`--version`
* Displays the version of PlayPush.

`-h, --help`
* Displays help information for the command.

### Upload Options
`-c, --credentials-file-path <path>`

* Description: Path to the `keyfile.json` file.
* Default: Environment variable value of `CREDENTIALS_KEYFILE`

`-v, --app-version-name <name>`

* Description: Specifies the version name of the app to be uploaded.
* Mandatory: Yes

`-n, --release-notes <notes>`

* Description: Provides release notes for the app version.
* Mandatory: No

`-l, --release-notes-language <locale>`

* Description: Language localization code for the release notes in BCP-47 format. Defaults to "en-US" if not specified.
* Default: en-US
* Mandatory: No

`-p, --package-name <name>`

* Description: The package name of the app (e.g., com.example.myapp).
* Mandatory: Yes

`-b, --bundle <path>`

* Description: Path to the Android App Bundle (AAB) file that you want to upload.
* Mandatory: Yes

`-t, --track <track>`

* Description: Release track for the app. Possible values are "alpha", "beta", "production", and "internal". Defaults to "internal".
* Choices: alpha, beta, production, internal
* Default: internal
* Mandatory: No


## Additional Notes
Ensure that you have valid credentials and the necessary permissions to upload bundles to the Google Play Store.
