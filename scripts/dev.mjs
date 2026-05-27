import { spawn } from "node:child_process";

const isWindows = process.platform === "win32";
const npm = isWindows ? "npm.cmd" : "npm";

const children = [
  spawn(npm, ["run", "dev", "-w", "backend"], {
    stdio: "inherit",
    shell: isWindows,
    env: process.env
  }),
  spawn(npm, ["run", "dev", "-w", "frontend"], {
    stdio: "inherit",
    shell: isWindows,
    env: process.env
  })
];

let shuttingDown = false;

const shutdown = (code = 0) => {
  if (shuttingDown) {
    return;
  }
  shuttingDown = true;
  for (const child of children) {
    child.kill("SIGTERM");
  }
  process.exit(code);
};

for (const child of children) {
  child.on("exit", (code, signal) => {
    if (shuttingDown) {
      return;
    }
    shutdown(signal ? 1 : code ?? 1);
  });
}

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));
