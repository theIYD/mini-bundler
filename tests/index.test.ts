import fs from "fs";
import path from "path";
import { loadAsDirectory, loadAsFile } from "../src/resolver";

describe("TEST - resolver", () => {
	beforeEach(() => {
		fs.mkdirSync("./tests/mocks");
	});

	afterEach(() => {
		fs.rmSync("./tests/mocks", { recursive: true });
	});

	it("should resolve a JS file to path", () => {
		fs.writeFileSync("./tests/mocks/index.js", "// Mock JS File");
		const pathOne = path.join(__dirname, "./mocks/index");
		const resolvedPathObject = loadAsFile(pathOne);
		expect(resolvedPathObject.isFile).toBe(true);
		expect(resolvedPathObject.relativePath).toContain(".js");
	});

	it("should NOT resolve a non-JS file to a path", () => {
		fs.writeFileSync("./tests/mocks/index2.txt", "// Mock TXT File");
		const pathOne = path.join(__dirname, "./mocks/index2");
		const resolvedPathObject = loadAsFile(pathOne);
		expect(resolvedPathObject.isFile).toBe(false);
	});

	it("should NOT resolve a directory to a path", () => {
		const pathOne = path.join(__dirname, "./mocks/");
		const resolvedPathObject = loadAsFile(pathOne);
		expect(resolvedPathObject.isFile).toBe(false);
	});

	it("should resolve to a directory", () => {
		fs.writeFileSync("./tests/mocks/index.js", "// Mock JS File");
		const pathOne = path.join(__dirname, "./mocks/");
		const resolvedPathObject = loadAsDirectory(pathOne);
		expect(resolvedPathObject.isFile).toBe(true);
		expect(resolvedPathObject.relativePath).toContain(".js");
	});

	it("should NOT resolve a non-JS file to a directory", () => {
		fs.writeFileSync("./tests/mocks/index2.txt", "// Mock TXT File");
		const pathOne = path.join(__dirname, "./mocks/");
		const resolvedPathObject = loadAsDirectory(pathOne);
		expect(resolvedPathObject.isFile).toBe(false);
	});
});
