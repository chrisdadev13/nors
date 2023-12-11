import { file, write } from "bun";

export default async function init() {
  const dir = process.cwd();
  const name = dir.split("/").at(-1);

  const path = `${dir}/package.json`;

  const fileExists = await file(path).exists();

  if (fileExists) {
    console.error("ERROR: The file package.json already exists");
    return;
  }

  const content = {
    name: name,
    version: "1.0.0",
    description: "",
    main: "index.js",
    scripts: {
      test: 'echo "Error: no test specified" && exit 1',
    },
    keywords: [],
    author: "",
    license: "ISC",
  };

  write(path, JSON.stringify(content, null, 2));

  console.log(`Wrote to ${path} ✍️  `);
  console.log(content);
}
