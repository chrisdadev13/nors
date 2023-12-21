use clap::{Parser, Subcommand};

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
    /// initialize a package.json
    Init,
}

fn main() {
    match &Cli::parse().command {
        Commands::Init => {
            println!("Hello World");
        }
    }
}
