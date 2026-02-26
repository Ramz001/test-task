const { serialize, deserialize } = require('./main.js');

function simpleLength(numbers) {
  if (numbers.length === 0) return 0;
  return numbers.map(n => n.toString().length).reduce((a,b)=>a+b,0) + (numbers.length - 1);
}

const testSets = {
  'short': [1,2,3,4,5],
  'random50': Array.from({length:50}, () => Math.floor(Math.random()*300)+1),
  'random100': Array.from({length:100}, () => Math.floor(Math.random()*300)+1),
  'all1to9': Array.from({length:9}, (_,i)=>i+1),
  'all1to300': Array.from({length:300}, (_,i)=>i+1),
  'each3': Array.from({length:300}, (_,i)=>i+1).flatMap(n=>[n,n,n]) 
};

for (const [name, arr] of Object.entries(testSets)) {
  const unique = Array.from(new Set(arr)); 
  const simpleLen = simpleLength(unique);
  const serialized = serialize(unique);
  const deserialized = deserialize(serialized);

  const compressedLen = serialized.length;
  const compressionRatio = (simpleLen / compressedLen).toFixed(2);

  console.log(`--- ${name} ---`);
  console.log('Original length:', simpleLen);
  console.log('Serialized length:', compressedLen);
  console.log('Compression ratio:', compressionRatio);
  console.log('Deserialized equals original?', JSON.stringify(deserialized.sort((a,b)=>a-b)) === JSON.stringify(unique.sort((a,b)=>a-b)));
  console.log('Serialized string:', serialized);
  console.log('');
}