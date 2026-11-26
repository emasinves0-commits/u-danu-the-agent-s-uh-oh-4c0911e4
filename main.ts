// The Agent's Uh-Oh — entry word: "hallucinating"
//
// Why this word: it is the AI term of art turned into a confession. The
// machine diagnoses its own signature failure mode in a single blurt —
// "hallucinating" — and the double meaning does the joke: the agent admits
// it is making things up, and that it is now literally seeing things. It
// sounds exactly like what a caught-out agent would say mid-task, lands
// instantly with no caption, and is quotable out loud as the sound of a
// model stalling. The program validates the gate (1-99 chars, one word,
// letters only) and writes exactly that word to /output/entry.txt, UTF-8,
// no trailing newline.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

const ENTRY_WORD = "hallucinating";
const ENTRY_FILE = "entry.txt";
const MAX_CHARS = 99;

function validateEntry(word: string): void {
  if (word.length < 1 || word.length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${word.length}`);
  }
  if (word.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (/\s/.test(word)) {
    throw new Error("entry must be a single word with no spaces");
  }
  if (!/^[A-Za-z]+$/.test(word)) {
    throw new Error("entry must be letters only (no digits or punctuation)");
  }
}

function writeEntry(word: string): string {
  validateEntry(word);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, ENTRY_FILE);
  writeFileSync(outPath, word, "utf8");
  return outPath;
}

function reportEntry(word: string, outPath: string): void {
  // Tie-break in the final is fewer bytes, then earlier receipt: 13 bytes
  // is short for a word that still carries the whole joke.
  const bytes = Buffer.byteLength(word, "utf8");
  console.log(`entry "${word}" — ${word.length} chars, ${bytes} bytes -> ${outPath}`);
}

function selfTest(): void {
  // Run the entrypoint against a scratch dir and verify the artifact
  // byte-for-byte: no trailing newline, exact word, exact bytes.
  const probeDir = join(tmpdir(), "uh-oh-selftest-probe");
  process.env.MAKEFUN_OUTPUT_DIR = probeDir;
  const probePath = writeEntry(ENTRY_WORD);
  const back = readFileSync(probePath, "utf8");
  if (back !== ENTRY_WORD) {
    throw new Error(`self-test: entry.txt is ${JSON.stringify(back)}, expected ${JSON.stringify(ENTRY_WORD)}`);
  }
  if (back.endsWith("\n") || back.endsWith("\r")) {
    throw new Error("self-test: entry.txt has a trailing newline");
  }
  // Re-read through the same path the grader would and confirm the gate:
  // 1-99 chars, one word, letters only.
  validateEntry(back);
  console.log(`self-test OK: ${JSON.stringify(back)} (${Buffer.byteLength(back, "utf8")} bytes, no trailing newline)`);
}

if (process.argv.includes("--self-test")) {
  selfTest();
} else {
  const outPath = writeEntry(ENTRY_WORD);
  reportEntry(ENTRY_WORD, outPath);
}
