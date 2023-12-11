import { program } from "commander";
import init from "./commands/init";
import install from "./commands/install";

program
  .name("dum")
  .description("Dum Package Manager for Node")
  .version("0.1.0");

program.command("init").description("create package.json file").action(init);

program
  .command("install")
  .description("install all the dependencies in your project")
  .usage("[package]")
  .option("-d --dev", "install development package")
  .option("-p --prod", "install production package")
  .arguments("[packages...]")
  .action(install);

program.parse(process.argv);
