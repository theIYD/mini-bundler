const Module = require("./utils/Module")

// Start
function build({ entryFile }) {
    createDependencyGraph(entryFile);
}

function createDependencyGraph(filePath) {
    return new Module(filePath)
}

build({
    entryFile: "./inputs/index.js"
})