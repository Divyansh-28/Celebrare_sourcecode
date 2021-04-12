

$('.login-button').on('click',function(event){
  event.stopPropagation()
  $('.login_main_display').css('display','flex')
})

$('.login_main_display').on('click',function(event){
  event.stopPropagation()
  $(this).css('display','none')
})

$('.login_page').on('click',function(event){
  event.stopPropagation()
})

$('#close-login-popup').on('click',function(event){
  event.stopPropagation()
  $('.login_main_display').css('display','none')
})

  $("#facebookLogIn").on("click", function (event) {
    event.stopPropagation()
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(async(result)=> {
        $('.login_main_display').css('display','none')
        firebase.analytics().logEvent("login", { "Page title": "login popup" });
      })
      .catch(function (error) {
        const errCode = error.code;
        const errorMessage = error.message;
        console.log(errCode,errorMessage);
      });
  });

  $("#googleLogIn").on("click", function (event) {
    event.stopPropagation()
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(async (result)=>{
        $('.login_main_display').css('display','none')
        firebase.analytics().logEvent("login", { "Page title": "login-popup" });
      })
      .catch(function (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode,errorMessage);
      });
  });
