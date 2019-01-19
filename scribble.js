const OrbitDB = require('orbit-db');
const Ipfs = require('ipfs');
const ipfs = new Ipfs({'api-path': '/api/v0/', host: 'ipfs.infura.io', port: '5001', protocol: 'https'})

const orbitdb = new OrbitDB(ipfs);

const feed = orbitdb.feed(randomString(16));
console.log(typeof(feed));
    feed.add({ title: 'vasa', content: 'hello world' })
    .then(() => {
        const posts = feed.iterator().collect();
        posts.forEach((post) => {
        let data = post.payload.value
        console.log(data.title + '\n', data.content)
        })
    });

/* document.getElementById('submit').onclick(()=>{
    const feed = orbitdb.feed(randomString(16));
    feed.add({ title: document.getElementById('title').value, content: document.getElementById('note').value })
    .then(() => {
        const posts = feed.iterator().collect();
        posts.forEach((post) => {
        let data = post.payload.value
        console.log(data.title + '\n', data.content)
        })
    });
}) */
    






function randomString(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
}