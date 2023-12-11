import axios from "axios";

export interface Manifest {
  [version: string]: {
    dependencies?: { [dep: string]: string };
    dist: { shasum: string; tarball: string };
  };
}

const REGISTRY = "https://registry.npmjs.org/";

const cache: { [dep: string]: Manifest } = Object.create(null);

export default async function (name: string): Promise<Manifest> {
  const cached = cache[name];
  if (cached) return cached;

  const response = await axios.get(`${REGISTRY}${name}`);
  if (response.status !== 200) {
    throw new Error(`ERROR: No such package: ${name}`);
  }

  const lts = response.data["dist-tags"].latest;
  const version = response.data.versions[lts];

  return {
    [lts]: {
      dependencies: version.dependencies,
      dist: {
        shasum: version.dist.shasum,
        tarball: version.dist.tarball,
      },
    },
  };
}
