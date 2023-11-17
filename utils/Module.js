const fs = require("fs");
const swc = require("@swc/core")
const resolveRequest = require("./Resolve")

class Module {
    constructor(filePath) {
        this.filePath = filePath;
        this.content = fs.readFileSync(filePath, 'utf-8')
        this.ast = swc.parseSync(this.content)
        this.dependencies = this.findDependencies();
    }

    findDependencies() {
        return this.ast.body
            .filter(node => node.type === "ImportDeclaration")
            .map(node => node.source.value)
            .map(relativePath => resolveRequest(this.filePath, relativePath))
    }
}

module.exports = Module;