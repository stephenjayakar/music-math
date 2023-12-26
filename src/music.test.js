import * as math from './math';

const allNotesAndEnharmonics = [
      'C',
      'C♯',
      'D♭',
      'D',
      'D♯',
      'E♭',
      'E',
      'F',
      'F♯',
      'G♭',
      'G',
      'G♯',
      'A♭',
      'A',
      'A♯',
      'B♭',
      'B',
];


describe('randomNote', () => {
  test('should return a value that is in the list of notes', () => {
    for (let i = 0; i < 100; ++i) {
      const note = math.randomNote();
      expect(allNotesAndEnharmonics).toContain(note);
    }
  });

  // This is pretty hard to get to work because there are two uses of
  // randomness -- one for picking the note, the other to pick between
  // two enharmonics.

  // test('all values are eventually returned', () => {
  //   // Create a generator that will deterministically return values from 0 to 11. We want to make this test deterministic instead of random.
  //   function* generateSequence() {
  //     const values = [...Array(allNotesAndEnharmonics.length).keys()];
  //     while (true) {
  //       for (let value of values) {
  //         yield value / allNotesAndEnharmonics.length; // This will be used as Math.random return value
  //       }
  //     }
  //   }

  //   const sequenceGenerator = generateSequence();
  //   jest.spyOn(Math, 'random').mockImplementation(() => sequenceGenerator.next().value);

  //   const generatedNotes = new Set();

  //   // Iterate enough times to get all the notes
  //   for (let i = 0; i < allNotesAndEnharmonics.length; i++) {
  //     generatedNotes.add(randomNote());
  //   }

  //   // Check if every expected note has been generated.
  //   for (const note of allNotesAndEnharmonics) {
  //     expect(generatedNotes).toContain(note);
  //   }

  //   Math.random.mockRestore();
  // });
});

describe('intervalNote', () => {
  test('basic intervals', () => {
    console.log(-2 % 6);
    expect(math.intervalNote('A', 4)).toEqual('C♯');
    expect(math.intervalNote('A', 9)).toEqual('F♯');
    expect(math.intervalNote('C', 9)).toEqual('A');
    expect(math.intervalNote('C', -10)).toEqual('D');
  });
});
