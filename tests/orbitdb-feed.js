const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')

const ipfs = new IPFS()
const orbitdb = new OrbitDB(ipfs)

const feed = orbitdb.feed('haad.posts')
feed.add({ title: 'Hello', content: 'World' })
  .then(() => {
    const posts = feed.iterator().collect()
    posts.forEach((post) => {
      let data = post.payload.value
      console.log(data.title + '\n', data.content)
      // Hello 
      //  World   
    })
  })