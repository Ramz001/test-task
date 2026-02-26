# Test Task: Number Serialization Utility

A lightweight utility for serializing and deserializing arrays of numbers between 1 and 300. It uses bit manipulation and base64 encoding to achieve efficient compression compared to a standard comma-separated string representation.

## How it works

The serialization process involves:
1.  **Bitmasking**: Since the numbers are limited to the range 1-300, it creates a bitfield of 300 bits (38 bytes). 
2.  **Bit manipulation**: Each number's presence is marked by setting the corresponding bit at `(n - 1)`.
3.  **Base64 encoding**: Converts the 38-byte buffer into a base64 string for easy storage and transmission.

## Usage

### Serializing
```javascript
const { serialize } = require('./main.js');
const numbers = [1, 5, 100, 250, 300];
const serialized = serialize(numbers);
// Result is a short base64 string
```

### Deserializing
```javascript
const { deserialize } = require('./main.js');
const originalNumbers = deserialize(serialized);
// Result is [1, 5, 100, 250, 300]
```

## Running Tests

The project includes a test suite that evaluates compression ratios for various datasets (random, short, full range, etc.).

```bash
npm run test
```

The test script compares the length of the base64 output against a "simple" string representation (comma-separated digits).

## Constraints
-   Supports numbers in the range: **1 - 300**.
-   Optimized for storage efficiency (maximum 38 bytes payload before base64 encoding).
