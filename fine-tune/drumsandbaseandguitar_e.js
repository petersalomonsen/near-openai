setBPM(120);
addInstrument('piano');
addInstrument('strings');
addInstrument('drums');
addInstrument('guitar');
addInstrument('bass');

createTrack(3).steps(2, [
	e5,b5,e5,b5,
  	e5,b5,d6,b5
]);

createTrack(4).steps(4, [
	e2(0.2),,e2(0.2),,
  	e2(0.2),,e2(0.2),,
      e2(0.2),,cs2(0.5),,
        d2(0.4),,ds2(0.2),,
]);

await createTrack(2).steps(4, [
	[c5,fs5(0.1)],,fs5(0.1,20),,
  	[d5,fs5(0.1)],,fs5(0.1,20),c5(0.1,20),
	[c5,fs5(0.1)],,fs5(0.1,20),,
  	[d5,fs5(0.1)],,gs5(0.1,40),,	
]);
