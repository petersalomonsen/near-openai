onmessage = async (msg) => {
    if (msg.data.wasm) {
        const sampleRate = msg.data.samplerate;
        const wasmInstancePromise = WebAssembly.instantiate(msg.data.wasm,
            {
                environment: {
                    SAMPLERATE: sampleRate
                }
            });
        const wasmInstance = (await wasmInstancePromise).instance.exports;

        const patternsptr = wasmInstance.allocatePatterns(4);
        const patternsbuf = new Uint8Array(wasmInstance.memory.buffer, patternsptr, msg.data.numInstruments * 16);
        patternsbuf.set(msg.data.patterns);
        const instrpatternlistsptr = wasmInstance.allocateInstrumentPatternList(1, msg.data.numInstruments);
        wasmInstance.setBPM(msg.data.bpm);

        const durationMillis = msg.data.songduration;

        const SAMPLE_FRAMES = 128;
        const durationFrames = durationMillis * sampleRate / 1000;

        const samplebuffer = wasmInstance.allocateSampleBuffer ? wasmInstance.allocateSampleBuffer(SAMPLE_FRAMES) : wasmInstance.samplebuffer;
        const wasmleftbuffer = new Float32Array(wasmInstance.memory.buffer,
            samplebuffer,
            SAMPLE_FRAMES);
        const wasmrightbuffer = new Float32Array(wasmInstance.memory.buffer,
            samplebuffer + (SAMPLE_FRAMES * 4),
            SAMPLE_FRAMES);

        let framepos = 0;
        const leftbuffer = new ArrayBuffer(durationFrames * 4);
        const leftview = new DataView(leftbuffer);
        const rightbuffer = new ArrayBuffer(durationFrames * 4);
        const rightview = new DataView(rightbuffer);

        const isLittleEndian = new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;

        while (framepos < durationFrames) {
            wasmInstance.playEventsAndFillSampleBuffer != undefined ?
                wasmInstance.playEventsAndFillSampleBuffer() :
                wasmInstance.fillSampleBuffer();

            for (let n = 0; n < SAMPLE_FRAMES && framepos < durationFrames; n++) {
                leftview.setFloat32(framepos * 4, wasmleftbuffer[n], isLittleEndian);
                rightview.setFloat32(framepos * 4, wasmrightbuffer[n], isLittleEndian);
                framepos++;
            }

            postMessage({
                progress: framepos / durationFrames
            });
        }
        postMessage({ leftbuffer, rightbuffer }, [leftbuffer, rightbuffer]);
    }
};
