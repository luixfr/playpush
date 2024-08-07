import { Option } from "commander";

export const debugOption = new Option(
  "-d, --debug",
  "output extra debugging"
).hideHelp(true);

export const keyFileOption = new Option(
  "-c, --credentials-file-path",
  "Path to keyfile.json"
)
  .env("CREDENTIALS_KEYFILE")
  .makeOptionMandatory(false);

export const appVersionNameOption = new Option(
  "-v, --app-version-name",
  "App version name"
).makeOptionMandatory(true);

export const releaseNotesOption = new Option(
  "-n, --release-notes",
  "Release notes"
).makeOptionMandatory(false);

export const releaseNotesLanguagesOption = new Option(
  "-l, --release-notes-language",
  "Release notes language localization code in BCP-47"
)
  .default("en-US")
  .makeOptionMandatory(false);

export const packageNameOptioon = new Option(
  "-p, --package-name",
  "Package Name"
).makeOptionMandatory(true);

export const bundleFileOption = new Option(
  "-b, --bundle",
  "Path to aab file"
).makeOptionMandatory(true);

export const trackOption = new Option("-t, --track <tracks>", "Relase track")
  .choices(["alpha", "beta", "production", "internal"])
  .default("internal")
  .makeOptionMandatory(false);
