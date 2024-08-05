import { androidpublisher_v3, google, GoogleApis } from "googleapis";
import { Command, Option } from "commander";
import { version } from "../package.json";
import fs from "fs";
import { GoogleAuth } from "google-auth-library";
const program = new Command();
const SCOPES = ["https://www.googleapis.com/auth/androidpublisher"];
program;
program
  .version(version)
  .option("-d, --debug", "output extra debugging")
  .addOption(
    new Option(
      "-f, --credentials-file-path <type>",
      "Path to playstore-credentials.json"
    ).env("SERVICE_ACCOUNT_FILE")
  )
  .option("-vn, --version-name <type>", "Version name")
  .option("-rn, --release-notes <type>", "Release notes")
  .requiredOption("-p, --package-name <type>", "Package Name")
  .requiredOption("-b, --path-to-aab <type>", "Path to aab file")
  .addOption(
    new Option("-t, --track <tracks>", "Relase track").choices([
      "alpha",
      "beta",
      "production",
      "internal",
    ])
  );

program.parse(process.argv);

const options = program.opts();
if (options.debug) console.log(options);

if (!options.credentialsFilePath) {
  program.error("Not credentilas file provided");
}
const keyFile = options.credentialsFilePath;

const { packageName, pathToAab, track } = options;

main(keyFile, packageName, pathToAab, track);

async function main(
  keyFile: string,
  packageName: string,
  bundle: string,
  track: string
) {
  const auth = authenticate(keyFile, SCOPES);

  google.options({ auth });

  const play = createAdroidPublisher(google, auth, packageName);
  const editId = await createEdit(play, packageName);

  const upload = await uploadBundle(play, editId, packageName, bundle);
  if (!upload.versionCode) {
    program.error("Invalid upload version code");
    return;
  }

  await setUploadTrack(play, editId, packageName, track, upload.versionCode);
  await commitUpload(play, editId, packageName);
}

function authenticate(keyFile: string, scopes: string[]) {
  const auth = new google.auth.GoogleAuth({
    keyFile,
    scopes,
  });

  return auth;
}

function createAdroidPublisher(
  google: GoogleApis,
  auth: GoogleAuth,
  packageName: string
) {
  var play = google.androidpublisher({
    version: "v3",
    auth: auth,
    params: {
      packageName,
    },
  });
  return play;
}

async function createEdit(
  play: androidpublisher_v3.Androidpublisher,
  packageName: string
) {
  const insert = await play.edits.insert({
    requestBody: {},
    packageName,
  });

  if (!insert.data.id) {
    program.error("Unable to create edit");
  }
  return insert.data.id as string;
}

async function uploadBundle(
  play: androidpublisher_v3.Androidpublisher,
  editId: string,
  packageName: string,
  bundle: string
) {
  const upload = await play.edits.bundles.upload({
    editId,
    packageName,
    media: {
      mimeType: "application/octet-stream",
      body: fs.createReadStream(bundle),
    },
  });

  return upload.data;
}

async function setUploadTrack(
  play: androidpublisher_v3.Androidpublisher,
  editId: string,
  packageName: string,
  track: string,
  versionCode?: number
) {
  const update = await play.edits.tracks.update({
    editId,
    track,
    packageName,
    requestBody: {
      releases: [
        {
          name: options.versionName,
          releaseNotes: options.releaseNotes,
          versionCodes: versionCode ? [versionCode.toString()] : undefined,
        },
      ],
    },
  });
}

async function commitUpload(
  play: androidpublisher_v3.Androidpublisher,
  editId: string,
  packageName: string
) {
  const commit = await play.edits.commit({ editId, packageName });
  return commit.data;
}
