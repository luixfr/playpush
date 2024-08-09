import { Option } from "commander";
import 'dotenv/config'

export const debugOption = new Option(
  "-d, --debug",
  "output extra debugging"
).hideHelp(true);

export const keyFileOption = new Option(
  "-c, --credentials-file-path <path>",
  "Path to keyfile.json"
)
  .default(process.env.CREDENTIALS_KEYFILE, "The value of the CREDENTIALS_KEYFILE env variable")
  .makeOptionMandatory(false);

export const appVersionNameOption = new Option(
  "-v, --app-version-name <version>",
  "App version name"
).makeOptionMandatory(true);

export const releaseNotesOption = new Option(
  "-n, --release-notes <text>",
  "Release notes"
).makeOptionMandatory(false);

export const releaseNotesLanguagesOption = new Option(
  "-l, --release-notes-language <text>",
  "Release notes language localization code in BCP-47"
)
  .default("en-US")
  .makeOptionMandatory(false);

export const packageNameOptioon = new Option(
  "-p, --package-name <name>",
  "Package Name"
).makeOptionMandatory(true);

export const bundleFileOption = new Option(
  "-b, --bundle <path>",
  "Path to aab file"
).makeOptionMandatory(true);

export const trackOption = new Option("-t, --track <tracks>", "Relase track")
  .choices(["alpha", "beta", "production", "internal"])
  .default("internal")
  .makeOptionMandatory(false);
