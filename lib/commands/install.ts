import download from "../utils/download";

import * as log from "../utils/log";

import { sortKeys } from "../utils/sort-keys";
import { findUp } from "find-up";
import { file } from "bun";

export default async function install(
  packages: string[],
  options: { dev?: boolean; prod?: boolean },
) {
  const pkgPath = (await findUp("package.json"))!;
  const pkgFile = file(pkgPath);

  const pkgJson = await pkgFile.json();

  console.log(options.dev);
  console.log(options.prod);

  pkgJson.dependencies = pkgJson.dependencies || {};
  packages.forEach((pkg) => (pkgJson.dependencies[pkg] = ""));

  log.prepareInstall(packages.length);
}
