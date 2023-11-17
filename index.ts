import { BuildOptions } from "types";
import Module from "./utils/Module"

// Start
function build({ entryFile }: BuildOptions): void {
    createDependencyGraph(entryFile);
}

function createDependencyGraph(filePath: string): Module {
    return new Module(filePath)
}

build({
    entryFile: "./inputs/index.js"
})