// Node at the edges of the terminal app: the effect mailbox, the clock,
// files, child processes and HTTP. Everything else is Gleam.

import { spawn, spawnSync } from "node:child_process";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { Ok, Error, toList } from "../gleam.mjs";

// --- the mailbox: effects post here, the loop drains it between polls -------

let mailbox = [];
let suspended = undefined;

export function post(message) {
  mailbox.push(message);
}

export function drain() {
  const messages = mailbox;
  mailbox = [];
  return toList(messages);
}

/// One job to run with the terminal handed back to the shell, such as an
/// editor. The loop picks it up after the effects of this step have run.
export function requestSuspend(job) {
  suspended = job;
}

export function takeSuspend() {
  const job = suspended;
  suspended = undefined;
  return job === undefined ? new Error(undefined) : new Ok(job);
}

// --- the clock and the environment ------------------------------------------

export function nowMs() {
  return Date.now();
}

export function randomFloat() {
  return Math.random();
}

export function env(name) {
  const value = process.env[name];
  return value === undefined || value === "" ? new Error(undefined) : new Ok(value);
}

export function homeDir() {
  return os.homedir();
}

export function nodeMajor() {
  return parseInt(process.versions.node.split(".")[0], 10);
}

export function nodePath() {
  return process.execPath;
}

export function isAscii(s) {
  return /^[\x20-\x7e]*$/.test(s);
}

// --- files ------------------------------------------------------------------

export function readFile(file) {
  try {
    return new Ok(fs.readFileSync(file, "utf8"));
  } catch {
    return new Error(undefined);
  }
}

export function writeFile(file, text) {
  try {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    // Written beside and renamed over, so a crash mid-write never leaves a
    // half file where the guest's progress was.
    const temp = file + ".tmp";
    fs.writeFileSync(temp, text, { encoding: "utf8", mode: 0o600 });
    fs.renameSync(temp, file);
    return new Ok(undefined);
  } catch (error) {
    return new Error(String(error.message ?? error));
  }
}

export function removeFile(file) {
  try {
    fs.rmSync(file, { force: true });
  } catch {}
  return undefined;
}

export function exists(file) {
  return fs.existsSync(file);
}

export function tempDir(prefix) {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
}

export function removeDir(dir) {
  try {
    fs.rmSync(dir, { recursive: true, force: true });
  } catch {}
  return undefined;
}

// --- processes --------------------------------------------------------------

/// Whether a program is on the PATH.
export function which(program) {
  const result = spawnSync(
    process.platform === "win32" ? "where" : "sh",
    process.platform === "win32" ? [program] : ["-c", `command -v "${program}"`],
    { stdio: "ignore" },
  );
  return result.status === 0;
}

/// Runs a program on the real terminal and waits, as an editor wants.
/// `command` is a shell word list such as `$EDITOR` can be ("code -w").
export function runInteractive(command, file) {
  const result = spawnSync(`${command} "${file.replaceAll('"', '\\"')}"`, {
    stdio: "inherit",
    shell: true,
  });
  if (result.error) return new Error(String(result.error.message));
  if (result.status === 127) return new Error(`${command}: command not found`);
  return new Ok(result.status ?? 0);
}

/// Runs a program to completion, capturing its output, killed after
/// `timeoutMs`. Resolves `[code, stdout, stderr, timedOut]`.
export function runCaptured(program, args, cwd, timeoutMs) {
  return new Promise((resolve) => {
    let stdout = "";
    let stderr = "";
    let timedOut = false;
    let child;
    try {
      child = spawn(program, args.toArray(), {
        cwd,
        stdio: ["ignore", "pipe", "pipe"],
        detached: process.platform !== "win32",
      });
    } catch (error) {
      resolve([-1, "", String(error.message ?? error), false]);
      return;
    }
    const timer = setTimeout(() => {
      timedOut = true;
      try {
        // The whole group: `gleam run` starts node, and node is the one spinning.
        process.kill(-child.pid, "SIGKILL");
      } catch {
        child.kill("SIGKILL");
      }
    }, timeoutMs);
    child.stdout.on("data", (chunk) => (stdout += chunk));
    child.stderr.on("data", (chunk) => (stderr += chunk));
    child.on("error", (error) => {
      clearTimeout(timer);
      resolve([-1, stdout, String(error.message ?? error), false]);
    });
    child.on("close", (code) => {
      clearTimeout(timer);
      resolve([code ?? -1, stdout, stderr, timedOut]);
    });
  });
}

// --- HTTP -------------------------------------------------------------------

/// Resolves `[status, body]`, status 0 when the server could not be reached.
export async function request(method, url, token, body) {
  const headers = { accept: "application/json" };
  if (token !== "") headers.authorization = `Bearer ${token}`;
  if (body !== "") headers["content-type"] = "application/json";
  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body === "" ? undefined : body,
      signal: AbortSignal.timeout(25000),
    });
    return [response.status, await response.text()];
  } catch (error) {
    return [0, String(error.cause?.message ?? error.message ?? error)];
  }
}
