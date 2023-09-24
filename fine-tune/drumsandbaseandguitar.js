setBPM(120);
addInstrument('drums');
addInstrument('guitar');
addInstrument('bass');

createTrack(1).steps(2, [
	d5,a5,d5,a5,
  	d5,a5,c6,a5
]);

createTrack(2).steps(4, [
	d2(0.2),,d2(0.2),,
  	d2(0.2),,d2(0.2),,
      d2(0.2),,b1(0.5),,
        c2(0.4),,cs2(0.2),,
]);

await createTrack(0).steps(4, [
	[c5,fs5(0.1)],,fs5(0.1,20),,
  	[d5,fs5(0.1)],,fs5(0.1,20),c5(0.1,20),
	[c5,fs5(0.1)],,fs5(0.1,20),,
  	[d5,fs5(0.1)],,gs5(0.1,40),,	
]);
