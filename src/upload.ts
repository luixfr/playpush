import { androidpublisher_v3, google, GoogleApis } from "googleapis";
import { Command } from "commander";
import fs from "fs";
import { GoogleAuth } from "google-auth-library";

const SCOPES = ["https://www.googleapis.com/auth/androidpublisher"];
export async function upload(
  program: Command,
  keyFile: string,
  packageName: string,
  bundle: string,
  track: string,
  versionName?:string,
  releaseNotes?:string
) {
  const auth = authenticate(keyFile, SCOPES);

  google.options({ auth });

  const play = createAdroidPublisher(google, auth, packageName);
  const editId = await createEdit(program, play, packageName);

  const upload = await uploadBundle(play, editId, packageName, bundle);
  if (!upload.versionCode) {
    program.error("Invalid upload version code");
    return;
  }

  await setUploadTrack(play, editId, packageName, track, versionName, releaseNotes, upload.versionCode);
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
  program: Command,
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
  versionName?: string,
  releaseNotes?: string,
  versionCode?: number
) {
  await play.edits.tracks.update({
    editId,
    track,
    packageName,
    requestBody: {
      releases: [
        {
          name: versionName,
          releaseNotes: [{ language: "en-US", text: releaseNotes }],
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
