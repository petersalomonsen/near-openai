setBPM(90);

addInstrument('piano');
addInstrument('string');
addInstrument('drums');

createTrack(0).steps(4, [
  [d5,f5,a5],,[d5,f5,a5],,
  [d5,f5,a5],,[d5,f5,a5],,
  [c5,e5,g5],,[c5,e5,g5],,
  [c5,e5,g5],,[c5,e5,g5],,
]);

createTrack(1).play([
  [0, d5(2.0)],
  [0, f5(2.0)],
  [0, a5(2.0)],
  [2, c5(2.0)],
  [2, e5(2.0)],
  [2, g5(2.0)],
]);

await createTrack(2).steps(4, [
	[c5,fs5(0.1)],,fs5(0.1,20),,
  	[d5,fs5(0.1)],,fs5(0.1,20),,
	[c5,fs5(0.1)],,fs5(0.1,20),,
  	[d5,fs5(0.1)],,fs5(0.1,20),,	
]);
