
const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')

// OrbitDB uses Pubsub which is an experimental feature
// and need to be turned on manually.
// Note that these options need to be passed to IPFS in
// all examples even if not specified so.
const ipfsOptions = {
  'EXPERIMENTAL': {
    'pubsub': true
  }
}

// Create IPFS instance
const ipfs = new IPFS(ipfsOptions)

ipfs.on('error', (e) => console.error(e))
ipfs.on('ready', async () => {
  const orbitdb = new OrbitDB(ipfs)

  // Create / Open a database
  const db = await orbitdb.kvstore('settings')
  await db.load()


  db.put('volume', '100')
  .then(() => {
    console.log('res',db.get('volume'))
    // 100
  });

});