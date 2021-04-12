const cardType = localStorage.getItem('card-type')

//Loading the Card Category
const Category= localStorage.getItem("cardCategory")


let Overlay_text = $('.overlay__text')

if(Category ==="birthday"){
  Overlay_text.text("A special something for your special day")
}else if(Category ==="anniversary"){
  Overlay_text.text("A special something for a Special Person")
}else if(Category ==="feelings"){
 const Feeling = localStorage.getItem("subCategory")
 if(Feeling ==='love'|| Feeling ==='thankyou' || Feeling ==='sorry'){
  Overlay_text.text("From the bottom of my heart")
 }else if(Feeling==='congrats'){
  Overlay_text.text("For the amazing You")
 }else if(Feeling==='weddingwishes'){
  Overlay_text.text("Best wishes on this wonderful journey")
 }else if(Feeling==='missyou'){
  Overlay_text.text("Hey there my special someone")
 }else if(Feeling==='getwellsoon'){
  Overlay_text.text("I pray you return to full health soon")
 }
}



if (cardType===" "){
  window.location.replace("../404.html")
}
let rootMaxWidth = $(window).width()
let rootMaxHeight = $(window).height()
let orientation
let imageRatio
let finalImageHeight
let finalImageWidth

if(cardType === "ecard-l"||cardType === "gcard-l"){
  orientation = "l"
}else if(cardType === "ecard-p"||cardType === "gcard-p"){
  orientation = "p"
}

//finding image dimensions on the basis of ratio

if(orientation === "p"){
  imageRatio = parseFloat(900 / 600)
}else if(orientation === "l"){
  imageRatio = parseFloat(600 / 900)
}

if (rootMaxWidth * imageRatio <= rootMaxHeight) {
  finalImageHeight = parseInt(rootMaxWidth * imageRatio);
  finalImageWidth =  rootMaxWidth;
  console.log("h",finalImageHeight, "w",finalImageWidth);
} else {
  finalImageHeight =  rootMaxHeight;
  finalImageWidth = parseInt(rootMaxHeight / imageRatio);
  console.log("h",finalImageHeight,"w", finalImageWidth);
}

//finding image dimensions on the basis of ratio


let CardID=null

if(cardType === 'ecard-l'){
    $('#ecard-screen-wrapper').css('display','flex')
    const dataUrl = localStorage.getItem('ecard-image')
    var img = new Image()
    img.src = dataUrl    
    img.id = `ecard-landscape-image` 
    CardID = "ecard-landscape-image"
    $("#preview-ecard-image").append(img);
}else if(cardType === 'ecard-p'){
    $('#ecard-screen-wrapper').css('display','flex')
    const dataUrl = localStorage.getItem('ecard-image')
    var img = new Image()
    img.src = dataUrl
    img.id = `ecard-portrait-image`
    CardID = "ecard-portrait-image"
    $("#preview-ecard-image").append(img);
}
// else if(cardType === 'gcard-l'){
//     $('#flipbook-screen-wrapper').css('display','flex')
//     $('#flipbook-l').css('display','flex')
//     $('#flipbook-front-page-l > img').attr('src',localStorage.getItem('gcard-image-link-0'))
//     $('#flipbook-middle-left-page-l > img').attr('src',localStorage.getItem('gcard-image-link-1'))
//     $('#flipbook-middle-right-page-l > img').attr('src',localStorage.getItem('gcard-image-link-2'))
//     $('#flipbook-back-page-l > img').attr('src',localStorage.getItem('gcard-image-link-3'))
//     $('#flipbook-l').css('display','flex')
// }else if(cardType === 'gcard-p'){
//     $('#flipbook-screen-wrapper').css('display','flex')
//     $('#flipbook-front-page > img').attr('src',localStorage.getItem('gcard-image-link-0'))
//     $('#flipbook-middle-left-page > img').attr('src',localStorage.getItem('gcard-image-link-1'))
//     $('#flipbook-middle-right-page > img').attr('src',localStorage.getItem('gcard-image-link-2'))
//     $('#flipbook-back-page > img').attr('src',localStorage.getItem('gcard-image-link-3'))
//     $('#flipbook').css('display','flex')
// }


//Loading card data

if (cardType === 'gcard-l'){
  $('#flipbook-screen-wrapper').css('display','flex')
  $(".card__wrapper").addClass("Landscape")
}
if (cardType === 'gcard-p'){
  $(".card__wrapper").addClass("Portrait")
}
if(cardType === 'gcard-l' || cardType ==='gcard-p'){
  $('#flipbook-screen-wrapper').css('display','flex')
  let cf = localStorage.getItem('gcard-image-link-0');
  let cil = localStorage.getItem('gcard-image-link-1');
  let cir = localStorage.getItem('gcard-image-link-2');
  let cb = localStorage.getItem('gcard-image-link-3');
  document.getElementById("card_front").style.backgroundImage ="url('"+cf+"')";
  if(cil!==" "){
    document.getElementById("card_middle_left").style.backgroundImage ="url('"+cil+"')";
  }else{
    document.getElementById("card_middle_left").style.backgroundImage  ="url('../img/blank_portrait.png')"};
  if(cir!==" "){
    document.getElementById("card_middle_right").style.backgroundImage ="url('"+cir+"')";
  }else{
    document.getElementById("card_middle_right").style.backgroundImage  ="white";
  }
  document.getElementById("card_back").style.backgroundImage ="url('"+cb+"')";
};




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
      setData()
  },10100)
}

//Ecard Animation
State=false
$('#preview-ecard-image').on('click',()=>{
  let Card = document.getElementById(CardID)
  let Overlay = document.getElementById("overlay")
  if (State){
    Overlay.classList.remove("back")
    Card.classList.remove("front")

    Overlay.classList.add("front")
    Card.classList.add("back")
    console.log(State);
    State=false
  }
  else{
    try{
      Overlay.classList.remove("front")
      Card.classList.remove("back")
    }
    finally{
      Overlay.classList.add("back")
      Card.classList.add("front")
      State=true
    }
B}});
//- Ecard Animation

// flip
let cardBody= document.getElementsByClassName('card_container');

var Cardbody = new Hammer(cardBody[0]);
// nds=newdeltastep,old DeltaStep,move, totalframes, current frame, initial frame , previous frame
let base=0,nt=5/3,tf=550,cf=1,initf=1,exf=0,interval,flag=!1;

function removeAllFrameClasses() {
  return this.className.split(" ").filter(function(n) {
      return n.match(/frame-\d{1,3}/)
  }).join(" ")
}

function d() {
  clearInterval(interval);
  flag = !1
};

Cardbody.add(new Hammer.Pan({
  direction: Hammer.DIRECTION_ALL,
  threshold: 0
}));


Cardbody.on("panstart panmove", (i) => {
  let pad,fpm,m,nds;
  if(d(),i.type ==="panstart"? (initf=exf,exf=0,base=0):initf=0,$('.card__wrapper').hasClass("Portrait"))
  pad =cardBody[0].clientWidth-10,fpm = Math.max(Math.floor(pad / tf), 1),m = i.deltaX;
  else if($('.card__wrapper').hasClass("Landscape")) pad =cardBody[0].clientHeight-50, fpm = Math.max(Math.floor(pad / tf), 1),m = i.deltaY;
  if(nds = Math.floor(m / -fpm * nt), base !== nds){
    if (cf=initf+exf+nds-base,cf=cf<1?1:cf,cf=cf>tf?tf:cf,exf!==cf)exf=cf,base=nds;
    window.requestAnimationFrame(()=>{
      $('.card').removeClass(removeAllFrameClasses).addClass("frame-" + cf)
    })
  }
});
  Cardbody.add(new Hammer.Tap({}));
5
function toFrame(edf) {
  let fps=Math.max(Math.floor(cf-edf/60),1),
  state = edf>cf? "up":"down";
  console.log("FPS:", fps, "state",state);

  interval = setInterval(()=>{
    flag= !0;
    state ==="up" && cf >=edf || state ==="down" && cf <=edf ? d() : (state ==="up" && cf >= edf -fps || state ==="down" && cf <= edf +fps) && (fps= 1);
    window.requestAnimationFrame(()=>{
      $('.card').removeClass(removeAllFrameClasses).addClass("frame-" + cf);
      ef=cf;
      state ==="up" ? cf+=fps : cf-=fps
    })
  },17)
};

  Cardbody.on('tap',(e)=>{
    if ($('.card__wrapper').hasClass("Portrait")){
      var pad =(cardBody[0].clientWidth);
    }else if($('.card__wrapper').hasClass("Landscape")){
      var pad =(cardBody[0].clientHeight);
    }
    let dx = e.center.x,mid=Math.floor(pad/2),base=1,fs1=200,fs2=350,fs3=550; 
    if(dx>=mid){
      if(flag){
        console.log(flag);
        return
      }
      if(cf >= fs3-15){
        //backto base
        console.log("basecall");
        toFrame(base);
        return
      }
       if(cf >=fs2 && cf<fs3-15){
        
        toFrame(fs3);
        return
      }
       if(cf >= fs1 && cf<fs2-15){
        // fs2
        toFrame(fs2);
        return
      }
        // f
      toFrame(fs1);
      return
      
    }else{  // <f1(base) >f1 <f2 (f1) >f2 <f3 (f2) >f3!= base? then f3
      if(flag){
        console.log(flag);
        return
      }
      if(cf>=base+5 && cf< fs1){
        console.log("fs3-5");
        toFrame(base);
        return
      }
       if(cf >=fs1-5 && cf<fs2){
        // fs1
        console.log("fs2-5");

        toFrame(fs1);
        return
      }
       if(cf >=fs2-5 && cf < fs3){
        // base
        console.log("fs1-5");

        toFrame(fs2);
        return
      }
      console.log("default");

        // fs3
      toFrame(fs3);
      return
      
    }
  })

// - Flipbook HAndler
//animation handler



function setData()
{
    const musicLink = localStorage.getItem('music-link') ? localStorage.getItem('music-link') : ' ' 

    if(musicLink===' '){
      $('#audio-control-button-container').css('display','none')
    }

    $('#music-player').attr('src',musicLink)
    $('.header-container').css('display','flex')
    $('.main-display').css('display','flex')
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


$(window).on("resize",function(){
  if($(window).width()<=590 && cardType === 'ecard-l'){
    $('#preview-ecard-image').css('justify-content','flex-start')
  }else{
    $('#preview-ecard-image').css('justify-content','center')
  }
})

if($(window).width()<=590 && cardType === 'ecard-l'){
  $('#preview-ecard-image').css('justify-content','flex-start')
}


