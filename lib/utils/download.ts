import axios from "axios";

import * as fs from "fs-extra";
import * as tar from "tar";

import * as log from "./log";

export default async function download(
  name: string,
  url: string,
  location = "",
) {
  const path = `${process.cwd()}${location}/node_modules/${name}`;

  await fs.mkdirp(path);

  const response = await axios.get(url, {
    headers: {
      "Content-Type":
        "application/vnd.npm.install-v1+json; q=1.0, application/json; q=0.8, */*",
      Authorization: "Accept",
    },
    responseType: "stream",
  });

  if (response.status !== 200) throw new Error("ERROR: NOT FOUND");

  response.data
    ?.pipe(tar.extract({ cwd: path, strip: 1 }))
    .on("close", log.tickInstalling);
}

const result = await download(
  "typescript",
  "https://registry.npmjs.org/typescript/-/typescript-5.3.3.tgz",
);

console.log(result);
