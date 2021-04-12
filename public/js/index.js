firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      $('.user-details-container').css('display','flex')
      $('.user-name').text(user.displayName)
      $('.user-profile-image-container img').attr('src',user.photoURL)
      $('.logout-button').css('display','block')
      $('.login-button').css('display','none')
    }
    else{
      $('.login-button').css('display','flex')
      $('.logout-button').css('display','none')
    }
});


firebase.analytics().logEvent("page_view", { "Page title": "Home Page" });


$('.logout-button').on('click',function(){
  firebase.auth().signOut()
  $('.user-details-container').css('display','none')
  $('.user-name').text(' ')
  $(this).css('display','none')
  window.location.reload()
})

localStorage.setItem('music-link',' ')
localStorage.setItem('card-type',' ')
localStorage.setItem('music-name',' ')

const year = new Date().getFullYear()
$('#current-year').text(`${year}.`)


var animation1 = bodymovin.loadAnimation({
  container : document.getElementById('home-animation'),
  renderer : 'svg',
  loop : true,
  autoplay : true,
  path : './animations/25317-friendship-is-beyond-cast-or-color.json'
})

var animation2 = bodymovin.loadAnimation({
  container : document.getElementById('home-animation-1'),
  renderer : 'svg',
  loop : true,
  autoplay : true,
  path : './animations/25317-friendship-is-beyond-cast-or-color.json'
})

