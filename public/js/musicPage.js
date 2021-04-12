let musicLink

$('#music-holder').css('display','none')
$('.loader-container').css('display','flex')


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      $('.user-details-container').css('display','flex')
      $('.user-name-container').css('display','flex')
      $('.user-name').text(user.displayName)
      $('.user-profile-image-container img').attr('src',user.photoURL)
    }
});

var animation = bodymovin.loadAnimation({
    container : document.getElementById('lady-playing-guitar'),
    renderer : 'svg',
    loop : true,
    autoplay : true,
    path : '../animations/Lady-Playing-Guitar.json'
})

//state persistence

firestore().enablePersistence({synchronizeTabs:true})
  .catch(function(err) {
    if(err.code == 'failed-precondition') {
    console.log("Can't persist data because multiple tabs are open");
    }
    else if (err.code == 'unimplemented') {
    console.log("Browser doesn't support persistence");
    }
});

//data fetch

const fetchData = async ()=>{
  const docRef = firestore().doc(`songs/birthday`)
  try{
    const snapShot = await docRef.get()
    if(!snapShot.exists){
      console.log('Document not exist');
    }
    else{
      const musicList = snapShot.data().song
      for(let index in musicList){
        $('#music-holder').append(
          `<div class="col-sm-6 col-md-12 col-lg-6 p-0 pr-sm-3 pl-sm-3">
              <div class="audio-card-container">
                <div class="audio-card">
                  <div class="song-name">${musicList[index].name}</div>
                  <div class="control-button">
                    <div class="button play-button" data-song-link=${musicList[index].link}>
                        <img src="../img/play-circle.svg" alt="">
                        Play
                    </div>
                    <div class="button pause-button" data-song-link=${musicList[index].link} style="display:none">
                        <img src="../img/pause-circle.svg" alt="">
                        Pause
                    </div>
                    <div class="button select-button" data-song-link=${musicList[index].link} data-song-name="${musicList[index].name}">
                        <img src="../img/check-circle.svg" alt="">
                        Select
                    </div>
                  </div>
                </div>
              </div>
            </div>`
        )
      }
      $('#music-holder').css('display','flex')
      $('.loader-container').css('display','none')      
    }
  }catch(err){
    console.error(err);
  }
}

fetchData()

$('#music-holder').on('click','.play-button',function(event){
  event.stopPropagation()
  const musicLink = $(this).attr('data-song-link')
  const audioPlayerSrc = $('#music-player').attr('src')
  
  $('.play-button').css('display','flex')
  $('.pause-button').css('display','none')

  if(musicLink === audioPlayerSrc){
    $('#music-player').trigger("play")
  }
  else{
    $('#music-player').trigger("stop")
    $('#music-player').attr('src',musicLink)
    $('#music-player').trigger("play")
  }
  const parent = $(this).parent()
  const pauseButton = $(parent).children()[1]
  $(this).css('display','none')
  $(pauseButton).css('display','flex')
})

$('#music-holder').on('click','.pause-button',function(event){
  event.stopPropagation()
  $('#music-player').trigger("pause")
  $(this).css('display','none')
  const parent = $(this).parent()
  const playButton = $(parent).children()[0]
  $(playButton).css('display','flex')
})

$('#music-holder').on('click','.select-button',function(event){
  event.stopPropagation()
  musicLink = $(this).attr('data-song-link')
  const musicName = $(this).attr('data-song-name')

  $('#music-player').trigger("pause")

  $('.music-name-container').text(musicName)
  $('.music-selection-popup').css('display','flex')
})

$('.ok-button').on('click',function(event){
  event.stopPropagation()
  const musicName = $('.music-name-container').text()
  
  firebase.analytics().logEvent("Music",{"Music Name":musicName})

  localStorage.setItem('music-link',musicLink)
  localStorage.setItem('music-name',musicName)
  window.history.back()
})

$('.cancel-button').on('click',function(event){
  event.stopPropagation()
  $('.music-selection-popup').css('display','none')
})

$('#music-player').on('stop',function(){
  $('.play-button').css('display','flex')
  $('.pause-button').css('display','none')
})

$('.music-selection-popup').on('click',function(event){
  event.stopPropagation()
    $(this).css('display','none')
})

$('.dialog-box').on('click',function(event){
  event.stopPropagation()
})