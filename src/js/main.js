var FIREBASE_URL = "https://authentic-demo.firebaseio.com";
var fb = new Firebase(FIREBASE_URL);
var onLoggedOut = $(".onLoggedOut");
var onLoggedIn = $(".onLoggedIn");

var logInDiv = $(".login");
var registerDiv = $(".register");

var logInForm = $("form[name='login']");
var registerForm = $("form[name='register']");
var email = $("input[type='email']");
var logPassword = $("input[name='logPassword']")

//==========function calls===========
toggleContentBasedOnLogin();

$(".toRegister, input[value='Cancel']").on('click', toggleRegister);

//==========function code============
function toggleContentBasedOnLogin(){
  var authData = fb.getAuth();
  if (authData) {
    onLoggedOut.addClass('hidden');
    onLoggedIn.removeClass('hidden');
  } else {
    onLoggedOut.removeClass('hidden');
    onLoggedIn.addClass('hidden');
  }
}

function toggleRegister(){
  logInDiv.toggleClass("hidden");
  registerDiv.toggleClass("hidden");
};


registerForm.on('submit', function(){
  var email = $(".register input[type='email']");
  var passwords = $(".register input[type='password']");
  if($(passwords[0]).val() === $(passwords[1]).val()){
    fb.createUser({
      email: email.val(),
      password: $(passwords[0]).val()
    }, function(err, userData){
          if(err) {
            email.val("");
            console.log(err);
            switch (err.code) {
            case "EMAIL_TAKEN":
              alert("The new user account cannot be created because the email is already in use.");
              break;
            case "INVALID_EMAIL":
              alert("The specified email is not a valid email.");
              break;
            default:
              alert("Error creating user:" + err);
            }
          }else {
            console.log(userData)
            alert("Successfully created user account with uid:" + userData.uid);
            toggleRegister();
          }
    });
  }
  else{
    passwords[0].value="";
    passwords[1].value="";
    alert("Passwords did not match");
  }
  event.preventDefault();
});


logInForm.on('submit', function(){
  fb.authWithPassword({
    email: email.val(), password: logPassword.val()
    }, function(err, authData){
    if(err){
      alert(err.toString())
    }else{
      toggleContentBasedOnLogin();
      var h1 = $(".onLoggedIn h1");
      h1.text(`Hello ${authData.password.email}`);
      email.val("");
      logPassword.val("");
      $.ajax({
        method: 'PUT',
        url: `${FIREBASE_URL}/users/${authData.uid}/profile.json`,
        data: JSON.stringify(authData),
      }).done(function(){
        console.log("yisss")
      })
      alert("welcome " + authData.password.email);
    }
  })
  event.preventDefault();
})


$(".onLoggedIn button").on('click', function(){
  fb.unauth();
  toggleContentBasedOnLogin();
})
