import fs from "fs";
import path from "path";
import { loadAsFile } from "../src/resolver";

describe("TEST - resolver", () => {
	beforeAll(() => {
		fs.mkdirSync("./tests/mocks");
	});

	afterAll(() => {
		fs.rmSync("./tests/mocks", { recursive: true });
	});

	it("should resolve to a file path", () => {
		fs.writeFileSync("./tests/mocks/index.js", "// Mock JS File");
		const pathOne = path.join(__dirname, "./mocks/index");
		const resolvedPathObject = loadAsFile(pathOne);
		expect(resolvedPathObject.isFile).toBe(true);
		expect(resolvedPathObject.relativePath).toContain(".js");
	});

	it("should NOT resolve to a file path", () => {
		fs.writeFileSync("./tests/mocks/index2.txt", "// Mock TXT File");
		const pathOne = path.join(__dirname, "./mocks/index2");
		const resolvedPathObject = loadAsFile(pathOne);
		expect(resolvedPathObject.isFile).toBe(false);
	});
});
