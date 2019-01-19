const IPFS = require('ipfs');
const OrbitDB = require('orbit-db');

const ipfs = new IPFS();
const orbitdb = new OrbitDB(ipfs);

const kv = orbitdb.kvstore('settings');
kv.put('volume', '100')
  .then(() => {
    console.log(kv.get('volume'))
    // 100
  });