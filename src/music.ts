// TODO: rename to music

// Meant to encapsulate the interval math
/*
   | |   | | |
  C D E F G A B C
*/

export const notes: string[] = [
  "C",
  "C♯",
  "D",
  "D♯",
  "E",
  "F",
  "F♯",
  "G",
  "G♯",
  "A",
  "A♯",
  "B",
];

export function randomIntInc(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomNote(): string {
  const randomNote = notes[randomIntInc(0, notes.length - 1)];
  return randomNote;
}

// Returns a value from [-12, -1] or [1, 12].
export function randomInterval(): number {
  const random = randomIntInc(-12, 11);
  return random >= 0 ? random + 1 : random;
}

export function notesEqual(a: string, b: string): boolean {
  return a === b;
}

export function intervalNote(note: string, interval: number): string {
  const index = notes.indexOf(note);
  if (index === -1) {
    throw new Error("the provided note was invalid");
  }

  let newIndex = (index + interval) % notes.length;
  if (newIndex < 0) {
    newIndex = notes.length + newIndex;
  }
  return notes[newIndex];
}

const lookupFlat: { [key: string]: string } = {
  "C♯": "D♭",
  "D♯": "E♭",
  "F♯": "G♭",
  "G♯": "A♭",
  "A♯": "B♭",
};

// Returns string representation of a note. This may alternate between
// enharmonics or display both.
export function noteRepr(
  note: string,
  displayBoth: boolean,
  seed: number
): string {
  const flat = lookupFlat[note];
  if (!flat) {
    return note;
  }

  if (displayBoth) {
    return `${note}/${flat}`;
  } else {
    // Choose between which enharmonic to return
    return Math.round(seed) === 0 ? note : flat;
  }
}
