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

  const response = await axios.get(url);

  response.data
    ?.pipe(tar.extract({ cwd: path, strip: 1 }))
    .on("close", log.tickInstalling);
}
