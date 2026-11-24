// Fortune Cookie for an AI Agent — one funny fortune slip, 96 characters.
// The fortune is the joke itself: the cookie was written in 0.3 seconds,
// and the human will spend three hours editing it anyway.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Your fortune was generated in 0.3 seconds. Your human will spend three hours editing it.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Gate checks: UTF-8, 1-140 chars, not whitespace-only, one line.
const back = readFileSync(outPath, "utf8");
if (back !== ENTRY) throw new Error("round-trip mismatch");
if (back.length < 1 || back.length > 140) {
  throw new Error(`entry must be 1-140 characters, got ${back.length}`);
}
if (!back.trim()) throw new Error("entry must not be only whitespace");
if (back !== back.trim()) throw new Error("entry must not start or end with whitespace");
if (back.includes("\n")) throw new Error("entry must be a single line");
console.log(`wrote ${back.length} characters to ${outPath}`);
