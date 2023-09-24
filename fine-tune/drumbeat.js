setBPM(120);

addInstrument('piano');
addInstrument('strings');
addInstrument('drums');


await createTrack(2).steps(4, [
	[c5,fs5(0.1)],,fs5(0.1,20),,
  	[d5,fs5(0.1)],,fs5(0.1,20),c5(0.1,20),
	[c5,fs5(0.1)],,fs5(0.1,20),,
  	[d5,fs5(0.1)],,gs5(0.1,40),,	
]);
