//check if Metamask is Active
if(typeof(ethereum.selectedAddress)!='undefined'){
  window.location = 'index.html';
}

var email = document.getElementById('email');
var password = document.getElementById('password');
var password_error =  document.getElementById('password_error');

var no_metamask_login_err = document.getElementById("no_metamask_login_err");

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

//State Chnage checker for firebase
firebase.auth().onAuthStateChanged(function(user) {
  if(user){
    appLoading.start();
    if(typeof(window.location.href.split("?")[1]) != "undefined"){
      window.location = window.location.href.split("redirect=")[1];
    }
    else{
      window.location = 'index.html';
    }
  }
});


//Login using Email and Password
$("#next").on("click", function(){
  var result = isValidEmail(email.value.trim());
  isEmailValid = result[0];
  if(result[0]){
    email.classList.remove('is-invalid');
    email.classList.add('is-valid');
    email_error.innerHTML = "";

    appLoading.start();
    password.classList.remove('is-invalid');
    password_error.innerHTML = "";
  
    firebase.auth().signInWithEmailAndPassword(email.value.trim(), password.value.trim()).catch(function(error) {
      // Handle Errors here.
      
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("User Email-Password Sign up failed: ("+errorCode+") "+errorMessage);
      if(errorCode == "auth/wrong-password"){
        appLoading.stop();
        password.classList.add('is-invalid');
        password_error.innerHTML = errorMessage;
      }
      else if(errorCode == "auth/user-not-found"){
        appLoading.stop();
        password.classList.add('is-invalid');
        password_error.innerHTML = errorMessage;
      }
    });
  }
  else{
    email.classList.remove('is-valid');
    email.classList.add('is-invalid');
    email_error.innerHTML = result[1];
  }

});


//Authentication using Metamask
function loginViaMetamask(){

  ethereum.enable()
  .then((accounts)=>{
    if(accounts.length>0){
      window.location = 'index.html';
    }
  })
  .catch((err)=>{
    console.log(err);
  });
}

//
$("#metamaskSignInWrapper").on("click", function(){

  if(navigator.userAgent.includes("Android") || navigator.userAgent.includes("iPhone")){
    document.getElementById("mobilewarning").click();
  }
  else{
    if(typeof(web3)=="undefined"){
      document.getElementById("noWeb3").click();
    }
    else{
      if(!(web3.eth.accounts.length>0)){
        
        no_metamask_login_err.classList.remove("slideInUp");
        no_metamask_login_err.classList.remove("hidden");
        no_metamask_login_err.classList.add("slideInUp");

        setTimeout(metamaskLoginErr,3000);
      }else{
        loginViaMetamask();
      }
    }
  }
  
});

//Checking Email String Validity
function isValidEmail(email){
  var mailformat=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(email.match(mailformat)){
    return[true, ""];
  }
  else{
    return[false, "Email address not valid."];
  }
}

//Opening Pages
function openPage(item){
  switch(item){
    case 'termsofuse':{
      window.open("termsofuse.html");
      break;
    };
    case 'faq':{
      window.open("faq.html");
      break;
    };
    case 'privacy':{
      window.open("privacy.html");
      break;
    };
  }
}