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
if (ADVICE.length < 1 || ADVICE.length > 200 || !/\S/.test(ADVICE)) {
  throw new Error(`advice fails the gate at ${ADVICE.length} characters`);
}

const dest = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// In the grader /output is a mount point: create it when it is missing,
// never remove it and never empty it wholesale.
mkdirSync(dest, { recursive: true });
writeFileSync(`${dest}/entry.txt`, ADVICE, "utf8");

console.log(`wrote ${dest}/entry.txt (${ADVICE.length} characters)`);
