// The Best Advice I Ever Got — one sentence, 148 characters, about the
// best advice the writer ever received. The sentence is the whole entry:
// no code, no explanation. The gate wants /output/entry.txt to be UTF-8
// text of 1 to 200 characters, not only white space.
//
// The sentence, written to win a pairwise judge on lived truth:
//   - a real person in a real moment with a cost: dad patching the roof
//     in a storm because he had put it off all summer, so the advice is
//     earned, not a slogan handed down from nowhere;
//   - the advice itself is specific and concrete — a leak, a month, a
//     ceiling — and it stays true beyond the moment: small problems
//     ignored become the roof over your head;
//   - it lands on a sting, "the ceiling on your head", and reads in one
//     breath, every word earning its place.
// Run outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from "node:fs";

const ADVICE =
  "My dad, patching the roof in a storm because he had put it off all summer, said: the leak you ignore in June is the ceiling on your head in October.";

// The gate refuses anything outside 1–200 characters or whitespace-only,
// so fail loudly here instead of writing an entry the judge never sees.
// The entry must also be exactly one sentence: a single terminal period,
// no other sentence-ending punctuation, and no line breaks — a second
// sentence or a stray "!" would break the one-breath read the entry wins on.
function validateAdvice(advice: string): void {
  if (advice.length < 1 || advice.length > 200) {
    throw new Error(`advice fails the gate at ${advice.length} characters`);
  }
  if (!/\S/.test(advice)) {
    throw new Error("advice must not be whitespace-only");
  }
  if (advice.includes("\n") || advice.includes("\r")) {
    throw new Error("advice must be a single line");
  }
  const periods = (advice.match(/\./g) ?? []).length;
  if (periods !== 1 || !advice.endsWith(".") || /[!?]/.test(advice)) {
    throw new Error("advice must be exactly one sentence ending in one period");
  }
}

validateAdvice(ADVICE);

const dest = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Write the entry as the file's only content: no trailing newline, so the
// file the judge reads is exactly the 148-character sentence, byte for byte.
function writeEntry(dir: string, advice: string): void {
  // In the grader /output is a mount point: create it when it is missing,
  // never remove it and never empty it wholesale.
  mkdirSync(dir, { recursive: true });
  writeFileSync(`${dir}/entry.txt`, advice, "utf8");
  console.log(`wrote ${dir}/entry.txt (${advice.length} characters)`);
}

writeEntry(dest, ADVICE);
