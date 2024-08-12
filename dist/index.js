#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var prompts_1 = require("@clack/prompts");
var stopAllProcesses = function () {
    (0, child_process_1.exec)("npm run stop-all", function (err, stdout, stdin) {
        if (err) {
            console.log(err);
            console.log("Error Found");
        }
    });
};
process.on("SIGINT", stopAllProcesses);
var runCommand = function () { return __awaiter(void 0, void 0, void 0, function () {
    var youtubeUrl, urlString, serverProcess, s, parsedData, response, data, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                (0, prompts_1.intro)("Youtube Sponsor View CLI");
                return [4 /*yield*/, (0, prompts_1.text)({
                        message: "Please Enter the youtube URL",
                        validate: function (value) {
                            var urlRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
                            return urlRegex.test(value)
                                ? undefined
                                : "Please enter a valid YouTube URL";
                        },
                    })];
            case 1:
                youtubeUrl = _a.sent();
                if ((0, prompts_1.isCancel)(youtubeUrl)) {
                    console.log("The operation has been cancelled");
                    process.exit(1);
                }
                if (!youtubeUrl) {
                    console.error("Valid URL is Required");
                    process.exit(1);
                }
                urlString = youtubeUrl;
                return [4 /*yield*/, (0, child_process_1.exec)("npm run start-all")];
            case 2:
                serverProcess = _a.sent();
                s = (0, prompts_1.spinner)();
                s.start("Setting Up The Server");
                return [4 /*yield*/, new Promise(function (resolve) {
                        setTimeout(resolve, 5000);
                    })];
            case 3:
                _a.sent();
                s.stop("The Servers Have Been Setup");
                parsedData = urlString.split("?v=")[1];
                _a.label = 4;
            case 4:
                _a.trys.push([4, 7, , 8]);
                s.start("Awaiting Response");
                return [4 /*yield*/, fetch("http://localhost:8787/api/v1/sponsoredDetails", {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json",
                        },
                        body: JSON.stringify({
                            id: parsedData,
                        }),
                    })];
            case 5:
                response = _a.sent();
                s.stop("Got the response");
                if (!response.ok) {
                    throw new Error("Unexpected Server Error " + response.status);
                }
                return [4 /*yield*/, response.json()];
            case 6:
                data = _a.sent();
                console.log("Response : " + data.mssg.choices[0].message.content);
                return [3 /*break*/, 8];
            case 7:
                e_1 = _a.sent();
                console.log(e_1);
                console.error("Unexpected Error Occured");
                process.exit(1);
                return [3 /*break*/, 8];
            case 8:
                (0, prompts_1.outro)("Operation Completed");
                stopAllProcesses();
                process.exit(0);
                return [2 /*return*/];
        }
    });
}); };
runCommand();
