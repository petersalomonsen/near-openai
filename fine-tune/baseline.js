setBPM(90);

addInstrument('piano');
addInstrument('strings');
addInstrument('drums');
addInstrument('guitar');
addInstrument('bass');

await createTrack(4).steps(4, [
	d2(0.5),,,d3(0.1),,a2(0.1),c3(0.1),d3(0.1),
]);

await createTrack(4).steps(4, [
	c2(0.5),,,c3(0.1),,c2(0.1),g2(0.1),c3(0.1),
]);

await createTrack(4).steps(4, [
	g2(0.5),,,g3(0.1),,d3(0.1),f3(0.1),g3(0.1),
]);

await createTrack(4).steps(4, [
	f2(0.5),,,f3(0.1),,f2(0.1),c3(0.1),f3(0.1),
]);
