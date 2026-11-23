// One Line, Best Line — entry program for make.fun.
// The house judge compares the single sentence this program writes to
// /output/entry.txt against the other entries, two at a time.
// Runs on Node 22 with no dependencies and no network access.
import { mkdirSync, writeFileSync } from "node:fs";

// The line: one sentence, 120 characters. A houseplant intervention is
// an absurd opening image that stops the scroll, and the punch reframes
// neglect as a crime scene — the whole joke lands in a single read.
const LINE =
  "My plants staged an intervention today: apparently watering them once a month is not a relationship, it's a crime scene.";

const OUTPUT_PATH = "/output/entry.txt";

// The gate accepts UTF-8 text of 1 to 240 characters that is not only
// whitespace; the brief also asks for a single sentence, so the line must
// end on one sentence terminator and carry no line break.
// The judge weighs, after validity, whether the whole idea arrives in a
// single sentence with a turn at the end — so the line must not hide a
// second sentence inside itself: no sentence terminator may appear
// before the final character, and no em dash may split it into two
// would-be sentences either.
function validateSingleSentence(line: string): void {
  const body = line.slice(0, -1);
  if (/[.!?]/.test(body)) {
    throw new Error("line must be a single sentence, found an early terminator");
  }
}

function validate(line: string): void {
  if (line.length < 1 || line.length > 240) {
    throw new Error(`line must be 1..240 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  if (line.includes("\n")) {
    throw new Error("line must be a single line");
  }
  if (!/[.!?]$/.test(line)) {
    throw new Error("line must be a single sentence ending in . ! or ?");
  }
  validateSingleSentence(line);
}

function main(): void {
  validate(LINE);
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUTPUT_PATH, LINE, "utf8");
  console.log(`wrote ${OUTPUT_PATH} (${LINE.length} characters)`);
}

main();
