mod file_system;
mod http;
mod manifest;

use clap::{Args, Parser, Subcommand};

use manifest::init::init_project;

#[derive(Parser)]
#[clap(name = "nors")]
#[command(
    author = "Chris P. <chrisdadev13@gmail.com>",
    version = "0.1.0",
    about = "nors - package manager for node.js written in rust",
    long_about = "nors - package manager for node.js written in rust"
)]
#[command(propagate_version = true)]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    /// initialize a typescript project in the current directory
    Init(InitArgs),
}

#[derive(Args)]
struct InitArgs {
    /// initialize a typescript project with default options
    #[arg(short, long)]
    yes: bool,
}

fn main() {
    match &Cli::parse().command {
        Commands::Init(args) => {
            init_project(args.yes);
        }
    }
}
