import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TIP =
  "Tip: your agent finished the task while this screen loaded. It is now waiting on you.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

if (TIP.length < 1 || TIP.length > 200) {
  console.error(`tip must be 1-200 characters, got ${TIP.length}`);
  process.exit(1);
}
if (TIP.trim().length === 0 || TIP.includes("\n")) {
  console.error("tip must be a single non-blank line");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, TIP, "utf8");

// Read back and confirm the file holds exactly the tip, byte for byte.
if (readFileSync(target, "utf8") !== TIP) {
  console.error("entry.txt does not match the tip byte for byte");
  process.exit(1);
}
