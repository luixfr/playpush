import { Option } from "commander";

export const debugOption = new Option(
  "-d, --debug",
  "output extra debugging"
).hideHelp(true);

export const keyFileOption = new Option(
  "-c, --credentials-file-path <type>",
  "Path to playstore-credentials.json"
).env("SERVICE_ACCOUNT_FILE");

export const appVersionNameOption = new Option(
  "-v, --app-version-name",
  "App version name"
);

export const releaseNotesOption = new Option(
  "-n, --release-notes",
  "Release notes"
);

export const releaseNotesLanguagesOption = new Option(
  "-n, --release-notes-language",
  "Release notes language localization code in BCP-47"
).default("en-US");

export const packageNameOptioon = new Option(
  "-p, --package-name",
  "Package Name"
);

export const bundleFileOption = new Option("-b, --bundle", "Path to aab file");

export const trackOption = new Option(
  "-t, --track <tracks>",
  "Relase track"
).choices(["alpha", "beta", "production", "internal"]);
