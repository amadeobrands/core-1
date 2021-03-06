describe('BlockInterlink', () => {
    const hash1 = new Hash(BufferUtils.fromBase64(Dummy.hash1));
    const hash2 = new Hash(BufferUtils.fromBase64(Dummy.hash2));

    const blockHashes = [hash1, hash2];
    const blockInterlink1 = new BlockInterlink(blockHashes);

    const hashes = [
        Hash.fromBase64(Dummy.hash1),
        Hash.fromBase64(Dummy.hash2),
        Hash.fromBase64(Dummy.hash3),
        Hash.fromBase64(Dummy.hash1),
        Hash.fromBase64(Dummy.hash2),
        Hash.fromBase64(Dummy.hash3),
        Hash.fromBase64(Dummy.hash1),
        Hash.fromBase64(Dummy.hash2),
        Hash.fromBase64(Dummy.hash3),
        Hash.fromBase64(Dummy.hash1),
        Hash.fromBase64(Dummy.hash2),
        Hash.fromBase64(Dummy.hash3),
        Hash.fromBase64(Dummy.hash1),
        Hash.fromBase64(Dummy.hash2),
        Hash.fromBase64(Dummy.hash3),
        Hash.fromBase64(Dummy.hash1),
        Hash.fromBase64(Dummy.hash2),
        Hash.fromBase64(Dummy.hash3),
        Hash.fromBase64(Dummy.hash1),
        Hash.fromBase64(Dummy.hash2),
        Hash.fromBase64(Dummy.hash3),
        Hash.fromBase64(Dummy.hash1),
        Hash.fromBase64(Dummy.hash2),
        Hash.fromBase64(Dummy.hash3),
        Hash.fromBase64(Dummy.hash1),
        Hash.fromBase64(Dummy.hash2)
    ];
    const longInterlink = new BlockInterlink(hashes);

    it('must have a well defined blockHashes array', () => {
        /* eslint-disable no-unused-vars */
        expect(() => {
            const test1 = new BlockInterlink(undefined);
        }).toThrow('Malformed blockHashes');

        expect(() => {
            const test1 = new BlockInterlink(null);
        }).toThrow('Malformed blockHashes');

        expect(() => {
            const test1 = new BlockInterlink(1);
        }).toThrow('Malformed blockHashes');

        expect(() => {
            const test1 = new BlockInterlink(new Uint8Array(101));
        }).toThrow('Malformed blockHashes');
        /* eslint-enable no-unused-vars */
    });

    it('is serializable and unserializable', (done) => {
        let buf = blockInterlink1.serialize();
        const blockInterlink2 = BlockInterlink.unserialize(buf);
        expect(buf.readPos).toBe(buf.buffer.byteLength);
        expect(blockInterlink1.equals(blockInterlink2)).toBe(true);

        buf = longInterlink.serialize();
        const longInterlink2 = BlockInterlink.unserialize(buf);
        expect(buf.readPos).toBe(buf.buffer.byteLength);
        expect(longInterlink.equals(longInterlink2)).toBe(true);

        (async () => {
            expect((await blockInterlink1.hash()).equals(await blockInterlink2.hash())).toBe(true);
            expect((await longInterlink.hash()).equals(await longInterlink2.hash())).toBe(true);
        })().then(done, done.fail);
    });

    it('has the correct serialized size', () => {
        expect(blockInterlink1.serializedSize).toBe(1 + 1 + blockHashes.length * Crypto.hashSize);
        expect(longInterlink.serializedSize).toBe(1 + 4 + hashes.length * Crypto.hashSize);
    });

    it('must return the correct root hash', (done) => {
        const rootHash = new Hash(BufferUtils.fromBase64('60x9tXAafmiaO2R3LPFcKTdJezUpuxZV+LspFBeIH5E='));
        (async () => {
            const hash = await blockInterlink1.hash();
            expect(hash.equals(rootHash)).toBe(true);
        })().then(done, done.fail);
    });

    it('must return the correct hash array', () => {
        const hashesArray = blockInterlink1.hashes;
        for (let i = 0; i < blockHashes.length; i++) {
            expect(hashesArray[i].equals(blockHashes[i])).toBe(true);
        }
    });

    it('must return the correct length', () => {
        expect(blockInterlink1.length).toBe(2);
    });
});
