const MAX = 300;
const BYTES = Math.ceil(MAX / 8); // 38

function serialize(numbers) {
  const bits = new Uint8Array(BYTES);

  for (const n of numbers) {
    const index = n - 1;
    const byteIndex = index >> 3;
    const bitIndex = index & 7;
    bits[byteIndex] |= (1 << bitIndex);
  }

  return Buffer.from(bits).toString("base64");
}

function deserialize(str) {
  const bytes = Buffer.from(str, "base64");
  const result = [];

  for (let i = 0; i < MAX; i++) {
    const byteIndex = i >> 3;
    const bitIndex = i & 7;

    if (bytes[byteIndex] & (1 << bitIndex)) {
      result.push(i + 1);
    }
  }

  return result;
}

module.exports = { serialize, deserialize };