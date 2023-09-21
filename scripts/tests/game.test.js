/**
 * @jest-environment jsdom
 */

const { hasUncaughtExceptionCaptureCallback } = require("process");
const { game, newGame, showScore } = require("../game");

beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
    
});

/*

The code snippet you provided seems to be written in JavaScript and is using Node.js to read the contents of an HTML file and 
then inject those contents into the current document in a specific context, like a browser environment. 
Let's break down the code step by step:

beforeAll(() => { ... });: This appears to be the beginning of a test setup or a function that runs some code before a suite of tests. 
It's likely using a testing framework like Jasmine, Mocha, or Jest. 
This setup function is executed before running any tests within the suite.

let fs = require("fs");: This line imports the Node.js 'fs' (file system) module, 
which provides methods for working with the file system, including reading files.

let fileContents = fs.readFileSync("index.html", "utf-8");: 
This line uses the 'readFileSync' method from the 'fs' module to synchronously read the contents of a file named "index.html" in the current directory. 
The contents are read as text (UTF-8 encoding) and stored in the variable 'fileContents'.

document.open();: This line is part of the code that assumes a browser-like environment. 
In a browser, 'document.open()' prepares the document for writing new content.

document.write(fileContents);: Here, the 'document.write()' method is used to write the contents of the "index.html" file into the current document. 
In a browser, this would effectively replace the entire content of the current page with the content of "index.html".

document.close();: This line is used to close the document after writing the contents. 
In a browser, 'document.close()' would typically be called after 'document.open()' and 'document.write()' to finalize the document structure.

In summary, this code snippet sets up a test environment (presumably for front-end testing) and reads the contents of an "index.html" file from the file system using Node.js. 
It then injects these contents into the current document as if it were a web page, effectively simulating loading the "index.html" file in a browser environment. 
This can be useful for testing web applications or components that rely on the content of "index.html" without actually opening a browser.





*/

describe("game object contains keys", () => {
    test("score key exists", () => {
        expect("score" in game).toBe(true);
    });

    test("currentGame key exists", () => {
        expect("currentGame" in game).toBe(true);
    });
    test("playerMoves key exists", () => {
        expect("playerMoves" in game).toBe(true);
    });
    test("choices key exists", () => {
        expect("choices" in game).toBe(true);
    });

    test("choices contain correct ids", () => {
        expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
    });
});

describe("newGame works correctly", () => {
    beforeAll(() => {
        game.score = 42;
        game.playerMoves = ["button1", "button2"];
        game.currentGame = ["button1", "button2"];
        document.getElementById("score").innerText = "42";
        newGame();
    });

    test("should set game score to zero", () => {
        expect(game.score).toEqual(0);
    });

    test("should clear the computer sequence array", () => {
        expect(game.currentGame.length).toBe(0);
    });

    test("should clear the playerMoves array", () => {
        expect(game.playerMoves.length).toBe(0);
    });

    test("Should display 0 for the element with the id of score", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
});

