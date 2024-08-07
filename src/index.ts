#!/usr/bin/env tsx

import { Command } from "commander";
import { version } from "../package.json";

import {
  keyFileOption,
  debugOption,
  appVersionNameOption,
  releaseNotesOption,
  packageNameOptioon,
  bundleFileOption,
  trackOption,
} from "./options";
import { upload } from "./upload";
const program = new Command();

program
  .version(version,"--version", "playpush version")
  .addOption(debugOption)
  .addOption(keyFileOption)
  .addOption(appVersionNameOption)
  .addOption(releaseNotesOption)
  .addOption(packageNameOptioon)
  .addOption(bundleFileOption)
  .addOption(trackOption);

program.parse(process.argv);

const options = program.opts();
if (options.debug) console.log(options);

if (!options.credentialsFilePath) {
  program.error("Not credentilas file provided");
}
const keyFile = options.credentialsFilePath;
const { packageName, bundle, track, appVersionName, releaseNotes } = options;

upload(program, keyFile, packageName, bundle, track, appVersionName, releaseNotes);
