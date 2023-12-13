import { file, write } from "bun";
import resolve from "../utils/resolve";
import download from "../utils/download";

export default async function init({ javascript }: { javascript: boolean }) {
  const dir = process.cwd();
  const name = dir.split("/").at(-1);

  const path = `${dir}/package.json`;

  const fileExists = await file(path).exists();

  if (fileExists) {
    console.error("ERROR: The file package.json already exists");
    return;
  }

  const ts = await resolve("typescript");

  let content = {
    name: name,
    version: "1.0.0",
    description: "",
    main: javascript ? "index.js" : "index.ts",
    scripts: {
      test: 'echo "Error: no test specified" && exit 1',
    },
    keywords: [],
    author: "",
    license: "ISC",
    ...(javascript
      ? {}
      : {
          peerDependencies: {
            typescript: ts.lts.version,
          },
        }),
  };
  write(path, JSON.stringify(content, null, 2));

  console.log(`Wrote to ${path} ✍️  `);
  console.log(content);

  if (!javascript) {
    createTsIndex(dir);
    await download("typescript", ts.lts.dist.tar);
  }
}

const createTsIndex = (dir: string) => {
  const path = `${dir}/index.ts`;
  write(path, "console.log('Hello World')");
};
