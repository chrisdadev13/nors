import axios from "axios";

export interface Manifest {
  [version: string]: {
    dependencies?: { [dep: string]: string };
    version: string;
    dist: { shasum: string; tar: string };
  };
}

const REGISTRY = "https://registry.npmjs.org/";

const cache: { [dep: string]: Manifest } = Object.create(null);

export default async function resolve(name: string): Promise<Manifest> {
  const cached = cache[name];
  if (cached) return cached;

  const response = await axios.get(`${REGISTRY}${name}/latest`, {
    headers: {
      "Content-Type":
        "application/vnd.npm.install-v1+json; q=1.0, application/json; q=0.8, */*",
      Authorization: "Accept",
    },
  });
  if (response.status !== 200) {
    throw new Error(`ERROR: No such package: ${name}`);
  }

  return {
    lts: {
      dependencies: response.data.dependencies,
      version: response.data.version,
      dist: {
        shasum: response.data.dist.shasum,
        tar: response.data.dist.tarball,
      },
    },
  };
}

//const result = await resolve("typescript");
//console.log(result);
