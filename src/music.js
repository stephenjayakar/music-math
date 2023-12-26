// TODO: rename to music

// Meant to encapsulate the interval math
/*
   | |   | | |
  C D E F G A B C
*/

// TODO: it's possible we should store this in a different
// way. Because it's becoming really tricky to have to do the `/`
// splitting every time I process this list, as well as soft-equality
// is annoying to implement.
// const notes = [
//   'C',
//   'C♯/D♭',
//   'D',
//   'D♯/E♭',
//   'E',
//   'F',
//   'F♯/G♭',
//   'G',
//   'G♯/A♭',
//   'A',
//   'A♯/B♭',
//   'B',
// ];
export const notes = [
  'C',
  'C♯',
  'D',
  'D♯',
  'E',
  'F',
  'F♯',
  'G',
  'G♯',
  'A',
  'A♯',
  'B',
];

export function randomIntInc(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomNote() {
  const randomNote = notes[randomIntInc(0, notes.length - 1)]

  // Return only one side of the `/`, not both
  // if (randomNote.includes('/')) {
  //   const equivalentNotes = randomNote.split('/')
  //   return equivalentNotes[Math.floor(Math.random())]
  // } else {}

  return randomNote;
}

// Returns a value from [-12, -1] or [1, 12].
export function randomInterval() {
  const random = randomIntInc(-12, 11);
  if (random >= 0) {
    return random + 1
  }
  return random;
}

export function notesEqual(a, b) {
  return a === b;
}

export function intervalNote(note, interval) {
  const index = notes.indexOf(note);
  if (index === -1) {
    throw new Error('the provided note was invalid');
  }

  let newIndex = (index + interval) % notes.length;
  if (newIndex < 0) {
    newIndex = notes.length + newIndex;
  }
  return notes[newIndex];
}

const lookupFlat = {
  'C♯': 'D♭',
  'D♯': 'E♭',
  'F♯': 'G♭',
  'G♯': 'A♭',
  'A♯': 'B♭',
}

// Returns string representation of a note. This may alternate between
// enharmonics or display both.
export function noteRepr(
  note,
  displayBoth,
  seed,
) {
  if (!(note in lookupFlat)) {
    return note
  }

  const flat = lookupFlat[note];
  if (displayBoth) {
    return `${note}/${flat}`;
  } else {
    // Choose between which enharmonic to return
    if (Math.round(seed) == 0) {
      return note;
    } else {
      return flat;
    }
  }
}
