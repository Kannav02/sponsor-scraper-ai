#!/usr/bin/env node

import { exec } from "child_process";
import { intro, outro, text, spinner, isCancel } from "@clack/prompts";

const stopAllProcesses = () => {
  exec("npm run stop-all", (err, stdout, stdin) => {
    if (err) {
      console.log(err);
      console.log("Error Found");
    }
  });
};

process.on("SIGINT", stopAllProcesses);

const runCommand = async () => {
  intro("Youtube Sponsor View CLI");

  const youtubeUrl = await text({
    message: "Please Enter the youtube URL",
    validate: (value) => {
      const urlRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
      return urlRegex.test(value)
        ? undefined
        : "Please enter a valid YouTube URL";
    },
  });

  if (isCancel(youtubeUrl)) {
    console.log("The operation has been cancelled");
    process.exit(1);
  }

  if (!youtubeUrl) {
    console.error("Valid URL is Required");
    process.exit(1);
  }
  const urlString = youtubeUrl as string;
  const serverProcess = await exec("npm run start-all");
  const s = spinner();
  s.start("Setting Up The Server");
  await new Promise((resolve) => {
    setTimeout(resolve, 5000);
  });
  s.stop("The Servers Have Been Setup");

  const parsedData = urlString.split("?v=")[1];
  try {
    s.start("Awaiting Response");
    const response = await fetch(
      "http://localhost:8787/api/v1/sponsoredDetails",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          id: parsedData,
        }),
      }
    );
    s.stop("Got the response");

    if (!response.ok) {
      throw new Error("Unexpected Server Error " + response.status);
    }

    const data = await response.json();
    console.log("Response : " + data.mssg.choices[0].message.content);
  } catch (e) {
    console.log(e);
    console.error("Unexpected Error Occured");
    stopAllProcesses()
    process.exit(1);
  }
  outro("Operation Completed");
  stopAllProcesses();
  process.exit(0);
};
runCommand();
