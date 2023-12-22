use crate::file_system::get_current_working_directory;
use colour::red;
use dialoguer::Input;
use serde_json::{json, Value};
use std::{
    fs,
    path::{Path, PathBuf},
};

struct InitPrompts {
    name: String,
    description: String,
    author: String,
}

pub fn init_project(yes: bool) {
    let cwd = get_current_working_directory().expect("cannot read the current working directory");

    if cwd.as_path().join("package.json").exists() {
        red!("⚠️  ERROR: the package.json already exists");
        return;
    }

    let prompts: InitPrompts = if yes {
        InitPrompts {
            name: "project".to_string(),
            description: "".to_string(),
            author: "".to_string(),
        }
    } else {
        read_prompts()
    };

    let initial_json =
        create_initial_package_json(prompts.name, prompts.description, prompts.author);

    let content = serde_json::to_string_pretty(&initial_json)
        .expect("error transforming the package.json into string");

    create_file(cwd.as_path(), content);
}

fn create_file(path: &Path, package_json: String) {
    let pkg_path = PathBuf::from(path).join("package.json");

    fs::write(pkg_path, &package_json).expect("Writing Error");

    println!("Wrote to {}", path.display());
    println!("{}", package_json);
}

fn create_initial_package_json(name: String, description: String, author: String) -> Value {
    json!(
        {
        "name": name,
        "version": "1.0.0",
        "description": description,
        "main": "index.js",
        "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1"
        },
        "keywords": [],
        "author": author,
        "license": "ISC",
      }
    )
}

fn read_prompts() -> InitPrompts {
    let name: String = Input::new()
        .with_prompt("package name: (nors)")
        .interact_text()
        .unwrap_or_default();
    let description: String = Input::new()
        .with_prompt("package description: (nors)")
        .interact_text()
        .unwrap_or_default();
    let author: String = Input::new()
        .with_prompt("package author: (nors)")
        .interact_text()
        .unwrap_or_default();

    InitPrompts {
        name,
        description,
        author,
    }
}
