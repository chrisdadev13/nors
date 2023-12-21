use std::env::current_dir;
use std::io::Result;
use std::path::PathBuf;

pub fn cwd() -> Result<PathBuf> {
    current_dir()
}
