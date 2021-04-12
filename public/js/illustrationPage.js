firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      $('.user-details-container').css('display','flex')
      $('.user-name-container').css('display','flex')
      $('.user-name').text(user.displayName)
      $('.user-profile-image-container img').attr('src',user.photoURL)
    }
});
