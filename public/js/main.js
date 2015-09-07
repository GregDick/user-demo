"use strict";

var FIREBASE_URL = "https://authentic-demo.firebaseio.com";
var fb = new Firebase(FIREBASE_URL);
var onLoggedOut = $(".onLoggedOut");
var onLoggedIn = $(".onLoggedIn");

var logInDiv = $(".login");
var registerDiv = $(".register");

var logInForm = $("form[name='login']");
var registerForm = $("form[name='register']");
var email = $("input[type='email']");
var logPassword = $("input[name='logPassword']");

//==========function calls===========
toggleContentBasedOnLogin();

$(".toRegister, input[value='Cancel']").on("click", toggleRegister);

//==========function code============
function toggleContentBasedOnLogin() {
  var authData = fb.getAuth();
  if (authData) {
    onLoggedOut.addClass("hidden");
    onLoggedIn.removeClass("hidden");
  } else {
    onLoggedOut.removeClass("hidden");
    onLoggedIn.addClass("hidden");
  }
}

function toggleRegister() {
  logInDiv.toggleClass("hidden");
  registerDiv.toggleClass("hidden");
};

registerForm.on("submit", function () {
  var email = $(".register input[type='email']");
  var passwords = $(".register input[type='password']");
  if ($(passwords[0]).val() === $(passwords[1]).val()) {
    fb.createUser({
      email: email.val(),
      password: $(passwords[0]).val()
    }, function (err, userData) {
      if (err) {
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
      } else {
        console.log(userData);
        alert("Successfully created user account with uid:" + userData.uid);
        toggleRegister();
      }
    });
  } else {
    passwords[0].value = "";
    passwords[1].value = "";
    alert("Passwords did not match");
  }
  event.preventDefault();
});

logInForm.on("submit", function () {
  fb.authWithPassword({
    email: email.val(), password: logPassword.val()
  }, function (err, authData) {
    if (err) {
      alert(err.toString());
    } else {
      toggleContentBasedOnLogin();
      var h1 = $(".onLoggedIn h1");
      h1.text("Hello " + authData.password.email);
      email.val("");
      logPassword.val("");
      $.ajax({
        method: "PUT",
        url: "" + FIREBASE_URL + "/users/" + authData.uid + "/profile.json",
        data: JSON.stringify(authData) }).done(function () {
        console.log("yisss");
      });
      alert("welcome " + authData.password.email);
    }
  });
  event.preventDefault();
});

$(".onLoggedIn button").on("click", function () {
  fb.unauth();
  toggleContentBasedOnLogin();
});
//# sourceMappingURL=data:application/json;base64,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Q0FBQyxFQUMvQixDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVU7QUFDaEIsZUFBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtPQUNyQixDQUFDLENBQUE7QUFDRixXQUFLLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDN0M7R0FDRixDQUFDLENBQUE7QUFDRixPQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Q0FDeEIsQ0FBQyxDQUFBOztBQUdGLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsWUFBVTtBQUM1QyxJQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDWiwyQkFBeUIsRUFBRSxDQUFDO0NBQzdCLENBQUMsQ0FBQSIsImZpbGUiOiJzcmMvanMvbWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBGSVJFQkFTRV9VUkwgPSBcImh0dHBzOi8vYXV0aGVudGljLWRlbW8uZmlyZWJhc2Vpby5jb21cIjtcbnZhciBmYiA9IG5ldyBGaXJlYmFzZShGSVJFQkFTRV9VUkwpO1xudmFyIG9uTG9nZ2VkT3V0ID0gJChcIi5vbkxvZ2dlZE91dFwiKTtcbnZhciBvbkxvZ2dlZEluID0gJChcIi5vbkxvZ2dlZEluXCIpO1xuXG52YXIgbG9nSW5EaXYgPSAkKFwiLmxvZ2luXCIpO1xudmFyIHJlZ2lzdGVyRGl2ID0gJChcIi5yZWdpc3RlclwiKTtcblxudmFyIGxvZ0luRm9ybSA9ICQoXCJmb3JtW25hbWU9J2xvZ2luJ11cIik7XG52YXIgcmVnaXN0ZXJGb3JtID0gJChcImZvcm1bbmFtZT0ncmVnaXN0ZXInXVwiKTtcbnZhciBlbWFpbCA9ICQoXCJpbnB1dFt0eXBlPSdlbWFpbCddXCIpO1xudmFyIGxvZ1Bhc3N3b3JkID0gJChcImlucHV0W25hbWU9J2xvZ1Bhc3N3b3JkJ11cIilcblxuLy89PT09PT09PT09ZnVuY3Rpb24gY2FsbHM9PT09PT09PT09PVxudG9nZ2xlQ29udGVudEJhc2VkT25Mb2dpbigpO1xuXG4kKFwiLnRvUmVnaXN0ZXIsIGlucHV0W3ZhbHVlPSdDYW5jZWwnXVwiKS5vbignY2xpY2snLCB0b2dnbGVSZWdpc3Rlcik7XG5cbi8vPT09PT09PT09PWZ1bmN0aW9uIGNvZGU9PT09PT09PT09PT1cbmZ1bmN0aW9uIHRvZ2dsZUNvbnRlbnRCYXNlZE9uTG9naW4oKXtcbiAgdmFyIGF1dGhEYXRhID0gZmIuZ2V0QXV0aCgpO1xuICBpZiAoYXV0aERhdGEpIHtcbiAgICBvbkxvZ2dlZE91dC5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgb25Mb2dnZWRJbi5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gIH0gZWxzZSB7XG4gICAgb25Mb2dnZWRPdXQucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgIG9uTG9nZ2VkSW4uYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZVJlZ2lzdGVyKCl7XG4gIGxvZ0luRGl2LnRvZ2dsZUNsYXNzKFwiaGlkZGVuXCIpO1xuICByZWdpc3RlckRpdi50b2dnbGVDbGFzcyhcImhpZGRlblwiKTtcbn07XG5cblxucmVnaXN0ZXJGb3JtLm9uKCdzdWJtaXQnLCBmdW5jdGlvbigpe1xuICB2YXIgZW1haWwgPSAkKFwiLnJlZ2lzdGVyIGlucHV0W3R5cGU9J2VtYWlsJ11cIik7XG4gIHZhciBwYXNzd29yZHMgPSAkKFwiLnJlZ2lzdGVyIGlucHV0W3R5cGU9J3Bhc3N3b3JkJ11cIik7XG4gIGlmKCQocGFzc3dvcmRzWzBdKS52YWwoKSA9PT0gJChwYXNzd29yZHNbMV0pLnZhbCgpKXtcbiAgICBmYi5jcmVhdGVVc2VyKHtcbiAgICAgIGVtYWlsOiBlbWFpbC52YWwoKSxcbiAgICAgIHBhc3N3b3JkOiAkKHBhc3N3b3Jkc1swXSkudmFsKClcbiAgICB9LCBmdW5jdGlvbihlcnIsIHVzZXJEYXRhKXtcbiAgICAgICAgICBpZihlcnIpIHtcbiAgICAgICAgICAgIGVtYWlsLnZhbChcIlwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICBzd2l0Y2ggKGVyci5jb2RlKSB7XG4gICAgICAgICAgICBjYXNlIFwiRU1BSUxfVEFLRU5cIjpcbiAgICAgICAgICAgICAgYWxlcnQoXCJUaGUgbmV3IHVzZXIgYWNjb3VudCBjYW5ub3QgYmUgY3JlYXRlZCBiZWNhdXNlIHRoZSBlbWFpbCBpcyBhbHJlYWR5IGluIHVzZS5cIik7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIklOVkFMSURfRU1BSUxcIjpcbiAgICAgICAgICAgICAgYWxlcnQoXCJUaGUgc3BlY2lmaWVkIGVtYWlsIGlzIG5vdCBhIHZhbGlkIGVtYWlsLlwiKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBhbGVydChcIkVycm9yIGNyZWF0aW5nIHVzZXI6XCIgKyBlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHVzZXJEYXRhKVxuICAgICAgICAgICAgYWxlcnQoXCJTdWNjZXNzZnVsbHkgY3JlYXRlZCB1c2VyIGFjY291bnQgd2l0aCB1aWQ6XCIgKyB1c2VyRGF0YS51aWQpO1xuICAgICAgICAgICAgdG9nZ2xlUmVnaXN0ZXIoKTtcbiAgICAgICAgICB9XG4gICAgfSk7XG4gIH1cbiAgZWxzZXtcbiAgICBwYXNzd29yZHNbMF0udmFsdWU9XCJcIjtcbiAgICBwYXNzd29yZHNbMV0udmFsdWU9XCJcIjtcbiAgICBhbGVydChcIlBhc3N3b3JkcyBkaWQgbm90IG1hdGNoXCIpO1xuICB9XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG59KTtcblxuXG5sb2dJbkZvcm0ub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKCl7XG4gIGZiLmF1dGhXaXRoUGFzc3dvcmQoe1xuICAgIGVtYWlsOiBlbWFpbC52YWwoKSwgcGFzc3dvcmQ6IGxvZ1Bhc3N3b3JkLnZhbCgpXG4gICAgfSwgZnVuY3Rpb24oZXJyLCBhdXRoRGF0YSl7XG4gICAgaWYoZXJyKXtcbiAgICAgIGFsZXJ0KGVyci50b1N0cmluZygpKVxuICAgIH1lbHNle1xuICAgICAgdG9nZ2xlQ29udGVudEJhc2VkT25Mb2dpbigpO1xuICAgICAgdmFyIGgxID0gJChcIi5vbkxvZ2dlZEluIGgxXCIpO1xuICAgICAgaDEudGV4dChgSGVsbG8gJHthdXRoRGF0YS5wYXNzd29yZC5lbWFpbH1gKTtcbiAgICAgIGVtYWlsLnZhbChcIlwiKTtcbiAgICAgIGxvZ1Bhc3N3b3JkLnZhbChcIlwiKTtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICAgIHVybDogYCR7RklSRUJBU0VfVVJMfS91c2Vycy8ke2F1dGhEYXRhLnVpZH0vcHJvZmlsZS5qc29uYCxcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoYXV0aERhdGEpLFxuICAgICAgfSkuZG9uZShmdW5jdGlvbigpe1xuICAgICAgICBjb25zb2xlLmxvZyhcInlpc3NzXCIpXG4gICAgICB9KVxuICAgICAgYWxlcnQoXCJ3ZWxjb21lIFwiICsgYXV0aERhdGEucGFzc3dvcmQuZW1haWwpO1xuICAgIH1cbiAgfSlcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbn0pXG5cblxuJChcIi5vbkxvZ2dlZEluIGJ1dHRvblwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICBmYi51bmF1dGgoKTtcbiAgdG9nZ2xlQ29udGVudEJhc2VkT25Mb2dpbigpO1xufSlcbiJdfQ==