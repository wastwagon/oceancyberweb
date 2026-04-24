/**
 * Cross-platform Docker Compose runner (avoids # in npm scripts on Windows cmd.exe
 * and avoids `npm run ... --build` being parsed as npm flags).
 */
const { execSync } = require("child_process");
const path = require("path");

const root = path.join(__dirname, "..");
const cmd = process.argv[2];

const commands = {
  up: "docker compose up -d --build && docker compose ps",
  down: "docker compose down",
  ps: "docker compose ps",
  logs: "docker compose logs -f backend web",
  cms: "docker compose --profile cms up -d",
};

if (!commands[cmd]) {
  console.error("Usage: node scripts/docker-run.cjs <up|down|ps|logs|cms>");
  process.exit(1);
}

execSync(commands[cmd], { stdio: "inherit", cwd: root, shell: true });
