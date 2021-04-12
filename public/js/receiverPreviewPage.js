firebase.analytics().logEvent("page_view", { "Page title": "receiver-preview-page" });


const urlParts = $(location).attr("href").split("?")
const subParts = urlParts[1].split("&")
const docId = subParts[0].split("=")[1]
const uId = subParts[1].split("=")[1]
let cardType
let orientation
let cardDetails

//animation handler

var animation1 = bodymovin.loadAnimation({
  container : document.getElementById('letter-packed'),
  renderer : 'svg',
  loop : true,
  autoplay : true,
  path : '../animations/letter-packed.json'
})

var animation2 = bodymovin.loadAnimation({
  container : document.getElementById('message-send'),
  renderer : 'svg',
  loop : true,
  autoplay : true,
  path : '../animations/message-send.json'
})

var animation3 = bodymovin.loadAnimation({
  container : document.getElementById('plane-fly'),
  renderer : 'svg',
  loop : true,
  autoplay : true,
  path : '../animations/paper-plane.json'
})

var animation4 = bodymovin.loadAnimation({
  container : document.getElementById('message-received'),
  renderer : 'svg',
  loop : true,
  autoplay : true,
  path : '../animations/message-received.json'
})

hideAnimation1()
hideAnimation2()
hideAnimation3()
hideAnimation4()


function hideAnimation1(){    
  setTimeout(function(){
      $('.animation-container-1').css('display','none')
      $('.animation-container-2').css('display','flex')
  },2000)
}

function hideAnimation2(){    
  setTimeout(function(){
      $('.animation-container-2').css('display','none')
      $('.animation-container-3').css('display','flex')
  },4000)
}

function hideAnimation3(){    
  setTimeout(function(){
      $('.animation-container-3').css('display','none')
      $('.animation-container-4').css('display','flex')
  },6000)
}

function hideAnimation4(){    
  setTimeout(function(){
      $('.animation-container-4').css('display','none')
      setData(cardDetails)
  },10100)
}

//animation handler

const fetchData = async()=>{
    const docRef = firestore().doc(`users/${uId}/sharedcards/${docId}`)
    try{
        const snapshot = await docRef.get()
        if(!snapshot.exists){
            console.log("Document not exist");
        }
        else{
            const data = snapshot.data()
            cardDetails = data
        }
    }catch(err){
        console.error(err);
    }
}

fetchData()


function setData(data){
  cardType = data.type
  orientation = data.orientation
  const musicLink = data.music
  const images = data.imagelink           

  $('.header-container').css('display','flex')
  $('.main-display').css('display','flex')

  if(musicLink!==' '){
    $('#music-player').attr('src',musicLink)
  }else{
    $('#audio-control-button-container').css('display','none')
  }

  if(cardType === 'ecard' && orientation === 'l'){
    $('#ecard-screen-wrapper').css('display','flex')
    var img = new Image()
    img.src = images[0]
    img.id = `ecard-landscape-image`
    $("#preview-ecard-image").append(img);

  }else if(cardType === 'ecard' && orientation=== 'p'){
      $('#ecard-screen-wrapper').css('display','flex')
      var img = new Image()
      img.src = images[0]
      img.id = `ecard-portrait-image`
      $("#preview-ecard-image").append(img);
  
  }else if(cardType === 'gcard' && orientation==='l'){
      $('#flipbook-screen-wrapper').css('display','flex')
      $('#flipbook-front-page-l > img').attr('src',images[0])
      $('#flipbook-middle-left-page-l > img').attr('src',images[1])
      $('#flipbook-middle-right-page-l > img').attr('src',images[2])
      $('#flipbook-back-page-l > img').attr('src',images[3])
      $('#flipbook-l').css('display','flex')
  }else if(cardType === 'gcard' && orientation === 'p'){
      $('#flipbook-screen-wrapper').css('display','flex')
      $('#flipbook-front-page > img').attr('src',images[0])
      $('#flipbook-middle-left-page > img').attr('src',images[1])
      $('#flipbook-middle-right-page > img').attr('src',images[2])
      $('#flipbook-back-page > img').attr('src',images[3])
      $('#flipbook').css('display','flex')
  }

  if($(window).width()>1250 && cardType === 'gcard'){
    $('#flipbook-forward-button-1').css('display','flex')
    $('#flipbook-backward-button-1').css('display','flex')
    $('#flipbook-forward-button-0').css('display','none')
    $('#flipbook-backward-button-0').css('display','none')
  }
  else if($(window).width()<=1250 && cardType === 'gcard'){
    $('#flipbook-forward-button-0').css('display','flex')
    $('#flipbook-backward-button-0').css('display','flex')
    $('#flipbook-forward-button-1').css('display','none')
    $('#flipbook-backward-button-1').css('display','none')
  }
}

$('#play-button').on('click',function(){
  $('#music-player').trigger('play')
  $(this).css('display','none')
  $('#pause-button').css('display','flex')
})

$('#pause-button').on('click',function(){
  $('#music-player').trigger('pause')
  $(this).css('display','none')
  $('#play-button').css('display','flex')
})

$('#music-player').on('pause',function(){
  $('#play-button').css('display','flex')
  $('#pause-button').css('display','none')
})


//portrait card flipbook
var oTurn = $("#flipbook").turn({
    autoCenter: true,
    next: true,
});

$("#prev").click(function (e) {
  e.preventDefault();
  oTurn.turn("previous");
});

$("#next").click(function (e) {
  e.preventDefault();
  oTurn.turn("next");
});

$("#prev1").click(function (e) {
  e.preventDefault();
  oTurn.turn("previous");
});

$("#next1").click(function (e) {
  e.preventDefault();
  oTurn.turn("next");
});

$('#flipbook-front-page').on('click',function(event){
  event.stopPropagation()
  oTurn.turn("next");
})

$('#flipbook-middle-left-page').on('click',function(event){
  event.stopPropagation()
  oTurn.turn("previous")
})
$('#flipbook-middle-right-page').on('click',function(event){
  event.stopPropagation()
  oTurn.turn("next")
})
$('#flipbook-back-page').on('click',function(event){
  event.stopPropagation()
  oTurn.turn("previous")
})
  
  
//landscape card flipbook

var oTurn1 = $('#flipbook-l').turn({
  autoCenter: true,
  next: true,
})

$("#prev").click(function (e) {
  e.preventDefault();
  oTurn1.turn("previous");
});

$("#next").click(function (e) {
  e.preventDefault();
  oTurn1.turn("next");
});

$("#prev1").click(function (e) {
  e.preventDefault();
  oTurn1.turn("previous");
});

$("#next1").click(function (e) {
  e.preventDefault();
  oTurn1.turn("next");
});


$('#flipbook-front-page-l').on('click',function(event){
  event.stopPropagation()
  oTurn1.turn("next");
})

$('#flipbook-middle-left-page-l').on('click',function(event){
  event.stopPropagation()
  oTurn1.turn("previous")
})
$('#flipbook-middle-right-page-l').on('click',function(event){
  event.stopPropagation()
  oTurn1.turn("next")
})
$('#flipbook-back-page-l').on('click',function(event){
  event.stopPropagation()
  oTurn1.turn("previous")
})


$(window).on("resize",function(){
  if($(window).width()<=590 && cardType === 'ecard' && orientation === 'l'){
    $('#preview-ecard-image').css('justify-content','flex-start')
  }else{
    $('#preview-ecard-image').css('justify-content','center')
  }
})

if($(window).width()<=590 && cardType === 'ecard' && orientation === 'l'){
  $('#preview-ecard-image').css('justify-content','flex-start')
}

//flipbook control button
$(window).on("resize",function(){
  if($(window).width()>1250 && cardType === 'gcard' ){
    $('#flipbook-forward-button-1').css('display','flex')
    $('#flipbook-backward-button-1').css('display','flex')
    $('#flipbook-forward-button-0').css('display','none')
    $('#flipbook-backward-button-0').css('display','none')
  }
  else if($(window).width()<=1250 && cardType === 'gcard'){
    $('#flipbook-forward-button-0').css('display','flex')
    $('#flipbook-backward-button-0').css('display','flex')
    $('#flipbook-forward-button-1').css('display','none')
    $('#flipbook-backward-button-1').css('display','none')
  }
})



//flipbook control button


