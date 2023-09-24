setBPM(90);

addInstrument('piano');
addInstrument('strings');
addInstrument('drums');
addInstrument('guitar');
addInstrument('bass');

createTrack(4).steps(1, [
	c3,g2,c3,g2,c3,f2,c3,g2,f2,c3,g2,c2,d2,fs2,g2,d3
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
  f5,,f5,,
  f5,,e5,,
  e5,,e5,,
  e5,,d5,,
  d5,,e5,,
  d5,,,,
  g5,,,,
  ]);

createTrack(4).steps(1, [
	c3,g2,c3,g2,c3,f2,c3,g2,f2,c3,g2,c2,g2,b2,c3,c2
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

