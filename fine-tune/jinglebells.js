setBPM(90);

addInstrument('piano');

await createTrack(0).steps(4, [
  e5,,e5,,
  e5,,,,
  e5,,e5,,
  e5,,,,
  e5,,g5,,
  c5,,d5,,
  e5,,,,
  ,,,,
  f5,,f5,,
  f5,,f5,,
  f5,,e5,,
  e5,,e5,,
  e5,,d5,,
  d5,,e5,,
  d5,,,,
  g5,,,,
  ]);

await createTrack(0).steps(4, [
  e5,,e5,,
  e5,,,,
  e5,,e5,,
  e5,,,,
  e5,,g5,,
  c5,,d5,,
  e5,,,,
  ,,,,
  f5,,f5,,
  f5,,g5,,
  f5,,e5,,
  e5,,e5,,
  g5,,g5,,
  f5,,d5,,
  c5,,,,
]);

