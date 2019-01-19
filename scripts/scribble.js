// Initialize Firebase
var production_config = {
    apiKey: "AIzaSyCl98x3fJQuvdBuKtWOd8AHHigYASaCSPw",
    authDomain: "ipfscloud-da4e7.firebaseapp.com",
    databaseURL: "https://ipfscloud-da4e7.firebaseio.com",
    projectId: "ipfscloud-da4e7",
    storageBucket: "ipfscloud-da4e7.appspot.com",
    messagingSenderId: "243693028930"
  };

  var development_config = {
    apiKey: "AIzaSyCj0zWOdlwOc8rBWrTWzEf_Ahgu6akFYXo",
    authDomain: "ipfscloud-49862.firebaseapp.com",
    databaseURL: "https://ipfscloud-49862.firebaseio.com",
    projectId: "ipfscloud-49862",
    storageBucket: "ipfscloud-49862.appspot.com",
    messagingSenderId: "811456726438"
};



firebase.initializeApp(production_config);
var firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true}
firestore.settings(settings);


var currentUser;

//Setting current user
if(typeof(ethereum.selectedAddress)!='undefined'){
    //if user came via Metamask login
    currentUser = ethereum.selectedAddress;
}
else if(typeof(firebase.auth().currentUser)!='undefined'){
    //if user came via Firebase login
    currentUser = firebase.auth().currentUser;
}
else{
    //if user is not logged in, then send him back to the login screen
    //window.location = 'login.html';
    console.log('not logged in',typeof(ethereum.selectedAddress),typeof(firebase.auth().currentUser));
}


const ipfs = new IpfsApi({'api-path': '/api/v0/', host: 'ipfs.infura.io', port: '5001', protocol: 'https'});


//Submitting and Pinning note to IPFS Network
function submitNote(){

    //creating the document object 
    var doc = {
        'uid': currentUser,
        'title': document.getElementById('title').value,
        'note': document.getElementById('note').value
    }

    //TODO: Encrypting the document object

    //adding document to the IPFS Network
    ipfs.files.add(ipfs.Buffer.from(JSON.stringify(doc)), (err, res)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(res);

            //pinning the returned ipfsHash
            ipfs.pin.add(res[0]['hash'], function (_err, _res) {
                if(_err){
                    console.log('Error while pinning ',_err);
                }
                else{
                    console.log('Pinning Successful ',_res);
                }
            })

        }
    });
}


//Fetching note from IPFS Network 
function getNote(ipfsPath){
    ipfs.cat(ipfsPath, function (err, file) {
        if (err) {
          throw err
        }
        console.log('NOTE: ',JSON.parse(file.toString('utf8')));
      })
}
