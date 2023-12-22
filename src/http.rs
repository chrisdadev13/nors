const REGISTRY: &str = "https://registry.npmjs.org/react";

pub async fn resolve(pkg: String) {
    let res = reqwest::get("{REGISTRY}/{pkg}/latest").await;
}
