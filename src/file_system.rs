use std::env::current_dir;
use std::io::Result;
use std::path::PathBuf;

pub fn get_current_working_directory() -> Result<PathBuf> {
    current_dir()
}
