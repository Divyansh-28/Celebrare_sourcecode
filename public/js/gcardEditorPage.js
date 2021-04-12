$('#loader-container').css('display','flex')

localStorage.setItem('gcard-image-link-0',' ')
localStorage.setItem('gcard-image-link-1',' ')
localStorage.setItem('gcard-image-link-2',' ')
localStorage.setItem('gcard-image-link-3',' ')

let selectedLayout = null;
let countTextArea = 15;
let cardOrientation
let selectedPage;
let countImage= 11;
let selectedInsidePage='left-page';


const urlParts = $(location).attr("href").split("?")
const subParts = urlParts[1].split("&")
const cardCategory = subParts[0].split("=")[1]
const cardSubCategory = subParts[1].split("=")[1]
const cardId = subParts[2].split("=")[1]
const cardPosition = subParts[3].split("=")[1]

firebase.analytics().logEvent("Card", {"Card" : cardId});
firebase.analytics().logEvent("Card type", {"Card type": "Gcard"});



var animation = bodymovin.loadAnimation({
  container : document.getElementById('loader-1'),
  renderer : 'svg',
  loop : true,
  autoplay : true,
  path : '../animations/loading.json'
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

//data fetching
fetchData = async ()=>{
  const docRef = firestore().doc(`celebrare/sectioncards/${cardCategory}/allcards/${cardSubCategory}/${cardId}`)
  try{
      const snapShot =await docRef.get()
      if(!snapShot.exists)
      {
          console.log('Document not exist');
      }
      else{
       const cardDetails = {
         imageUrl : snapShot.data().link,
         texts : snapShot.data().texts,
         title : snapShot.data().title,
         alt : snapShot.data().alt,
         orientation : snapShot.data().orientation
        }
        $('#card-default-image').attr('src',cardDetails.imageUrl)

        if(cardDetails.orientation === 'l')
          {
            cardOrientation = 'landscape'
            $('#front-page-content').css('display','flex')
            $('#front-page-content').addClass('landscape-mode')
            $('.page').addClass('page-landscape-mode')
            $('#back-page-content').addClass('landscape-mode')
            $('#inside-page-content').css('justify-content','flex-start')
            document.getElementById("default-1").click();
            $('#gcard-editor-window').css('overflow-x','auto')

            $('#flipbook').css('display','none')
            $('#flipbook-l').css('display','block')

            $('#layout2 > .page > .right-page > .text-container >.inner-block').css('width','90%')
            
            $('#layout3 > .page > .right-page > .text-container >.inner-block').css('width','90%')

            $('#layout3 > .page > .left-page > .inner-block').css('flex-direction','row')
            $('#layout3 > .page > .left-page > .inner-block').css('width','90%')
            $('#layout3 > .page > .left-page > .inner-block > .image-container').css('height','100%')
            $('#layout3 > .page > .left-page > .inner-block > .image-container').css('width','50%')
            $('#layout3 > .page > .left-page > .inner-block > .text-container').css('height','100%')
            $('#layout3 > .page > .left-page > .inner-block > .text-container').css('width','45%')

            $('#layout4 > .page > .left-page > .inner-block').css('flex-direction','row')
            $('#layout4 > .page > .left-page > .inner-block').css('width','90%')
            $('#layout4 > .page > .left-page > .inner-block > .image-container').css('height','100%')
            $('#layout4 > .page > .left-page > .inner-block > .image-container').css('width','50%')
            $('#layout4 > .page > .left-page > .inner-block > .text-container').css('height','100%')
            $('#layout4 > .page > .left-page > .inner-block > .text-container').css('width','45%')

            $('#layout4 > .page > .right-page > .inner-block').css('flex-direction','row')
            $('#layout4 > .page > .right-page > .inner-block').css('width','90%')
            $('#layout4 > .page > .right-page > .inner-block > .image-container').css('height','100%')
            $('#layout4 > .page > .right-page > .inner-block > .image-container').css('width','50%')
            $('#layout4 > .page > .right-page > .inner-block > .text-container').css('height','100%')
            $('#layout4 > .page > .right-page > .inner-block > .text-container').css('width','45%')

            $('#layout6 > .page > .right-page > .text-container >.inner-block').css('width','90%')

            $('#layout6 > .page > .left-page > .inner-block').css('flex-direction','row')
            $('#layout6 > .page > .left-page > .inner-block').css('width','90%')
            $('#layout6 > .page > .left-page > .inner-block > #upper-block').css('width','45%')
            $('#layout6 > .page > .left-page > .inner-block > #upper-block').css('height','100%')
            $('#layout6 > .page > .left-page > .inner-block > #upper-block').css('flex-direction','column')
            $('#layout6 > .page > .left-page > .inner-block > #upper-block > .image-container').css('height','65%')
            $('#layout6 > .page > .left-page > .inner-block > #upper-block > .image-container').css('width','100%')
            $('#layout6 > .page > .left-page > .inner-block > #upper-block > .text-container').css('width','100%')
            $('#layout6 > .page > .left-page > .inner-block > #upper-block > .text-container').css('height','30%')

            $('#layout6 > .page > .left-page > .inner-block > #middle-block').css('width','45%')
            $('#layout6 > .page > .left-page > .inner-block > #middle-block').css('height','100%')
            $('#layout6 > .page > .left-page > .inner-block > #middle-block').css('flex-direction','column')
            $('#layout6 > .page > .left-page > .inner-block > #middle-block > .image-container').css('height','65%')
            $('#layout6 > .page > .left-page > .inner-block > #middle-block > .image-container').css('width','100%')
            $('#layout6 > .page > .left-page > .inner-block > #middle-block > .text-container').css('width','100%')
            $('#layout6 > .page > .left-page > .inner-block > #middle-block > .text-container').css('height','30%')
          }
        else{
          $('#flipbook').css('display','block')
          $('#flipbook-l').css('display','none')

          document.getElementById("default").click();
          cardOrientation = 'portrait'
          $('#front-page-content').css('display','flex')
          $('#front-page-content').addClass('portrait-mode')
          $('.page').addClass('page-portrait-mode')
          $('#back-page-content').addClass('portrait-mode')
          $('#inside-page-content').css('overflow-x','auto')
        }
        console.log(cardOrientation);
        for(let index in cardDetails.texts){
          $('#front-page-content').append(`
              <div 
                class="text-holder" 
                id=text-holder-${countTextArea}
                style="
                  top: ${cardDetails.texts[index].top}px;
                  left: ${cardDetails.texts[index].left}px;
                "
              >
                <i class="fa fa-trash delete-ecard-text"></i>
                <textarea
                  id=text_area${countTextArea}
                  class="user_text"
                  spellcheck="false"
                  style='
                    text-align: ${cardDetails.texts[index].alignment};
                    color :${cardDetails.texts[index].color};
                    font-family : ${cardDetails.texts[index].fontFamily};
                    font-size : ${cardDetails.texts[index].fontSize};              
                '"
                >
                  ${cardDetails.texts[index].value}
                </textarea>
              </div>
          `)
          addTextEditor()
          ++countTextArea;
        } 
      $('#loader-container').css('display','none')
      $('#gcard-editor-window').css('display','flex')
      }  
  }
  catch(err)
  {
      console.log(err);
  }
}

fetchData();

// function to resize make an element

function resizerFunction(id){
  interact(id)
  .resizable({
      // resize from all edges and corners
      edges: { left: false, right: true, bottom: true, top: false },
  
      listeners: {
      move (event) {
          var target = event.target
          var x = (parseFloat(target.getAttribute('data-x')) || 0)
          var y = (parseFloat(target.getAttribute('data-y')) || 0)
  
          // update the element's style
          target.style.width = event.rect.width + 'px'
          target.style.height = event.rect.height + 'px'
  
          // translate when resizing from top or left edges
          x += event.deltaRect.left
          y += event.deltaRect.top
  
          target.style.webkitTransform = target.style.transform =
          'translate(' + x + 'px,' + y + 'px)'
  
          target.setAttribute('data-x', x)
          target.setAttribute('data-y', y)
          // target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
      }
      },
      modifiers: [
      // keep the edges inside the .container
      interact.modifiers.restrictEdges({
          outer: '.container'
      }),
  
      // minimum size
      interact.modifiers.restrictSize({
          min: { width: 100, height: 50 }
      })
      ],
  
      inertia: true
  })
}

// function to drag an element 
  
function draggerFunction(id){
// target elements with the "draggable" class
interact(id)
.draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    modifiers: [
    interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
    })
    ],
    // enable autoScroll
    autoScroll: true,

    listeners: {
    // call this function on every dragmove event
    move: dragMoveListener,

    // call this function on every dragend event
    end (event) {
        var textEl = event.target.querySelector('p')

        textEl && (textEl.textContent =
        'moved a distance of ' +
        (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                    Math.pow(event.pageY - event.y0, 2) | 0))
            .toFixed(2) + 'px')
    }
    }
})

function dragMoveListener (event) {
var target = event.target
// keep the dragged position in the data-x/data-y attributes
var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

// translate the element
target.style.webkitTransform =
    target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)'

// update the posiion attributes
target.setAttribute('data-x', x)
target.setAttribute('data-y', y)
}
}
  
//for opening different pages of a card

function openLayout(evt, layoutNumber) {
  evt.stopPropagation()
  selectedLayout = layoutNumber;
  var i, labcontent, lablinks;
  labcontent = document.getElementsByClassName("labcontent");
  for (i = 0; i < labcontent.length; i++) {
    labcontent[i].style.display = "none";
  }
  lablinks = document.getElementsByClassName("lablinks");
  for (i = 0; i < lablinks.length; i++) {
    lablinks[i].className = lablinks[i].className.replace(
      " active",
      ""
    );
  }
  document.getElementById(layoutNumber).style.display = "block";
  evt.currentTarget.className += " active";
}
document.getElementById("defaultOpen").click();

function openPage(pageName, elmnt, color) {
  selectedPage = pageName

  if(pageName === 'Front-Page'){
    if($(window).width()>767){
      $('.desktop-view-tool-box').css('display','flex')
    }
    else{
      $('.mobile-view-tool-box-1').css('display','flex')
      $('.mobile-view-tool-box-2').css('display','none')
    }
    $('.pcb-1 > img').attr('src','../img/front-red.svg')
    $('.text-tools').css('display','none')
    if(cardOrientation === 'landscape'){
      $('.layout-tab-wrapper-1').css('display','none')
    }else{
      $('.layout-tab-wrapper').css('display','none')
    }
  }else{
    $('.pcb-1 > img').attr('src','../img/front.svg')
  }  
  
  if(pageName === 'Inside'){
    if($(window).width()>767){
      $('.desktop-view-tool-box').css('display','flex') 
    }
    else{
      $('.mobile-view-tool-box-1').css('display','flex')
      $('.mobile-view-tool-box-2').css('display','none')
    }
    $('#tool-change-layout').css('display','flex')
    $('.mobile-view-tool-change-layout').css('display','flex')
    $('.pcb-2 > img').attr('src','../img/inside-red.svg')
    $('.text-tools').css('display','none')
    if(cardOrientation==='landscape'){
      $('.layout-tab-wrapper-1').css('display','none')
    }else{
      $('.layout-tab-wrapper').css('display','none')
    }
  }else{
    if($(window).width()>767){
      if(cardOrientation === 'landscape'){
        $('.layout-tab-1').css('display','none')   
      }else{
        $('.layout-tab').css('display','none')   
      }
    }
    $('#tool-change-layout').css('display','none')
    $('.mobile-view-tool-change-layout').css('display','none')
    $('.pcb-2 > img').attr('src','../img/inside.svg')

  }

  if(pageName === 'Back-Page'){
    if($(window).width()>767){
      $('.desktop-view-tool-box').css('display','flex')
      $('.layout-tab-wrapper').css('display','none')
      $('.layout-tab-wrapper-1').css('display','none')
    }
    else{
      $('.mobile-view-tool-box-1').css('display','flex')
      $('.mobile-view-tool-box-2').css('display','none')
    }
    $('.text-tools').css('display','none')
    $('.pcb-3 > img').attr('src','../img/back-red.svg')
    if(cardOrientation==='landscape'){
      $('.layout-tab-wrapper-1').css('display','none')
    }else{
      $('.layout-tab-wrapper').css('display','none')
    }
  }else{
    $('.pcb-3 > img').attr('src','../img/back.svg')
  }

    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.color = " rgb(100, 97, 97)"; 
      tablinks[i].style.borderColor = " rgb(160, 157, 157)"
    }
    document.getElementById(pageName).style.display = "block";
    elmnt.style.color = color;
    elmnt.style.borderColor = color
}

//add image editor
function addImageEditor(){
  $(".gcard-tool-bar").append(`
    <div class="image-tools" id=customize-image-pop-up-${countImage}>
      <div class="tools-3">
        <div class="mobile-view-image-size" >
          <span id=image-width-value-${countImage}>Width: 200</span>
          <input type="range" min="10" max="500" value="200"  class="font-size-slider" id=image-width-${countImage}>
          <span id=image-height-value-${countImage}>Height: 200</span>
          <input type="range" min="10" max="800" value="200"  class="font-size-slider" id=image-height-${countImage}>
        </div>
        <div class="mobile-view-image-position" >
          <span id=image-xposition-value-${countImage}>X: 0</span>
          <input type="range" min="0" max="500" value="0"  class="font-size-slider" id=image-xposition-${countImage}>
          <span id=image-yposition-value-${countImage}>Y: 0</span>
          <input type="range" min="0" max="800" value="0"  class="font-size-slider" id=image-yposition-${countImage}>
        </div>
      </div>
    </div>
  `)
}

//add text-editor

function addTextEditor(){
  $('.gcard-tool-bar').append(
    `<div class="text-tools" id="customize-text-pop-up-${countTextArea}">
      <div class="tools-2">
        <div class="mobile-view-text-font-size" >
          <div>
            <span class="font-size-title">Size : </span>
            <span id="font-size-value-${countTextArea}">20</span>
          </div>
          <input type="range" min="10" max="200" value="20"  class="font-size-slider" id="font-size-${countTextArea}">
        </div>
        <div class="mobile-view-text-font-alignment">
          <div class="font-alignment-title">
            Alignment :
          </div>
          <div style="width:100%;display:flex;justify-content:space-around">
            <i class="fa fa-align-left icon" id="icon1-${countTextArea}"></i>
            <i class="fa fa-align-center icon" id="icon2-${countTextArea}"></i>
            <i class="fa fa-align-right icon" id="icon3-${countTextArea}"></i>
          </div>
        </div>
        <div class="font-family-title">
          Typefaces : 
        </div>
        <div class="mobile-view-text-font-family" id="font-style-${countTextArea}">
              <span style="font-family: 'Akronim', cursive;">Akronim</span>
              <span style="font-family: 'Alex Brush', cursive;">Alex Brush</span>
              <span style="font-family: 'Allura', cursive;">Allura</span>
              <span style="font-family: 'Arizonia', cursive;">Arizonia</span>
              <span style="font-family: 'Bonbon', cursive;">Bonbon</span>
              <span style="font-family: 'Bungee Inline', cursive;">Bungee Inline</span>
              <span style="font-family: 'Caveat', cursive;">Caveat</span>
              <span style="font-family: 'Dancing Script', cursive;">Dancing Script</span>
              <span style="font-family: 'Finger Paint', cursive;">Finger Paint</span>
              <span style="font-family: 'Fjalla One', sans-serif;">Fjalla One</span>
              <span style="font-family: 'Great Vibes', cursive;">Great Vibes</span>
              <span style="font-family: 'Handlee', cursive;">Handlee</span>
              <span style="font-family: 'Henny Penny', cursive;">Henny Penny</span>
              <span style="font-family: 'Indie Flower', cursive;">Indie Flower</span>
              <span style="font-family: 'Italianno', cursive;">Italianno</span>
              <span style="font-family: 'Kalam', cursive ;">Kalam Light</span>
              <span style="font-family: 'Lato', sans-serif;">Lato Thin</span>
              <span style="font-family: 'Lora', serif;">Lora</span>
              <span style="font-family: 'Lovers Quarrel', cursive;">Lovers Quarrel</span>
              <span style="font-family: 'Meddon', cursive;">Meddon</span>
              <span style="font-family: 'Miss Fajardose', cursive;">Miss Fajardose</span>
              <span style="font-family: 'Molle', cursive;">Molle</span>
              <span style="font-family: 'Monsieur La Doulaise', cursive;">Monsieur La Doulaise</span>
              <span style="font-family: 'Mountains of Christmas', cursive;">Mountains of Christmas</span>
              <span style="font-family: 'Pacifico', cursive;">Pacifico</span>
              <span style="font-family: 'Parisienne', cursive;">Parisienne</span>
              <span style="font-family: 'Poppins', sans-serif;">Poppins Light</span>
              <span style="font-family: 'Quicksand', sans-serif;">Quicksand</span>
              <span style="font-family: 'Ribeye Marrow', cursive;">Ribeye Marrow</span>
              <span style="font-family: 'Roboto', sans-serif;">Roboto Thin</span>
              <span style="font-family: 'Rouge Script', cursive;">Rouge Script</span>
              <span style="font-family: 'Sacramento', cursive;">Sacramento</span>
              <span style="font-family: 'Sail', cursive;">Sail</span>
              <span style="font-family: 'Satisfy', cursive;">Satisfy</span>
              <span style="font-family: 'Seaweed Script', cursive;">Seaweed Script</span>
              <span style="font-family: 'Slabo 13px', serif ;">Slabo</span>
              <span style="font-family: 'Vast Shadow', cursive;">Vast Shadow</span>
              <span style="font-family: 'Yesteryear', cursive;">Yesteryear</span>
        </div>
        <div class="mobile-view-text-font-color change-font-color-${countTextArea}">
          <div class="font-color-title">
            Color :
          </div>
          <div class="row" style="height: 30px; display: flex;flex-direction: row;width: 100%;justify-content: space-between;align-items: center;margin:0">
            <div class="color" id="cr_1" style="background-color: #363535"></div>
            <div class="color" id="cr_2" style="background-color: #677e39"></div>
            <div class="color" id="cr_3" style="background-color: #677e69"></div>
            <div class="color" id="cr_4" style="background-color: #686868"></div>
            <div class="color" id="cr_5" style="background-color: #8d782f"></div>
            <div class="color" id="cr_6" style="background-color: #FFB400"></div>
            <div class="color" id="cr_7" style="background-color: #E53D39"></div>
            <div class="color" id="cr_8" style="background-color: #2C91DE"></div>
          </div>
          <div class="row" style="height: 30px; display: flex;flex-direction: row;width: 100%;justify-content: space-between;align-items: center;margin:0">
            <div class="color" id="cr_9" style="background-color: #000000"></div>
            <div class="color" id="cr_10" style="background-color: #FFFFFF;border-radius: 50%;border: 1px solid black;"></div>
            <div class="color" id="cr_11" style="background-color: #970E65"></div>
            <div class="color" id="cr_12" style="background-color: #650633"></div>
            <div class="color" id="cr_13" style="background-color: #F3A2A3"></div>
            <div class="color" id="cr_14" style="background-color: #D44F70"></div>
            <div class="color" id="cr_15" style="background-color: #CA0B15"></div>
            <div class="color" id="cr_16" style="background-color: #97070E"></div>
          </div>
          <div class="row" style="height: 30px; display: flex;flex-direction: row;width: 100%;justify-content: space-between;align-items: center;margin:0">
            <div class="color" id="cr_17" style="background-color: #650508"></div>
            <div class="color" id="cr_18" style="background-color: #F35D19"></div>
            <div class="color" id="cr_19" style="background-color: #9E5727"></div>
            <div class="color" id="cr_20" style="background-color: #D8B571"></div>
            <div class="color" id="cr_21" style="background-color: #978454"></div>
            <div class="color" id="cr_22" style="background-color: #65320C"></div> 
            <div class="color" id="cr_23" style="background-color: #8793D6"></div>
            <div class="color" id="cr_24" style="background-color: #866AA5"></div>
          </div>
          <div class="row" style="height: 30px; display: flex;flex-direction: row;width: 100%;justify-content: space-between;align-items: center;margin:0">
            <div class="color" id="cr_25" style="background-color: #552978"></div>
            <div class="color" id="cr_26" style="background-color: #1D549F"></div>
            <div class="color" id="cr_27" style="background-color: #073464"></div>
            <div class="color" id="cr_28" style="background-color: #55B2AE"></div>
            <div class="color" id="cr_29" style="background-color: #D5D5D5"></div>
            <div class="color" id="cr_30" style="background-color: #FFFAA3"></div>
            <div class="color" id="cr_31" style="background-color: #C0CFAF"></div>
            <div class="color" id="cr_32" style="background-color: #469E57"></div>
          </div>
        </div>
        <div class="mobile-view-text-position" >
        <span id=text-xposition-value-${countTextArea}>X : 0</span>
        <input type="range" min="0" max="520" value="0"  class="font-size-slider" id=text-xposition-${countTextArea}>
        <span id=text-yposition-value-${countTextArea}>Y : 0</span>
        <input type="range" min="0" max="800" value="0"  class="font-size-slider" id=text-yposition-${countTextArea}>
      </div>
      </div>
  </div>`
  )
}

//function to edit text css

function editCSSProperties(id,parentId){
  const pos = id.slice(19,)

  $(`#font-style-${pos}`).on('click','span',function(event){
    event.stopPropagation()
    console.log(id)
    $(`#font-style-${pos} > span`).css("color","black")
    $(this).css("color","rgb(8, 185, 96)")
    $(`#${id}`).css("font-family",$(this).css('font-family'))
  })
  
  $(`#font-size-${pos}`).on('input',function(event){
    event.stopPropagation()
    const value = $(this).val()
    $(`#font-size-value-${pos}`).text(`${value}`)
    $(`#${id}`).css("height",'auto')
    $(`#${id}`).css('height',document.getElementById(`${id}`).scrollHeight+"px");
    $(`#${id}`).css("font-size",value+"px")
  })

  $(`.change-font-color-${pos}`).on('click','div',function(event){
    event.stopPropagation()
    const color = $(this).css("background-color");
    if(color !== "rgba(0, 0, 0, 0)")
    {
      $(`.color`).css("box-shadow","")
      $(this).css("box-shadow","1px 1px 10px 1px rgba(0, 0, 0, .8)")      
      $(`#${id}`).css("color",color)    
    }
  })

  $(`#icon1-${pos}`).on("click",function(event){
    event.stopPropagation()
    $(`#icon1-${pos}`).addClass("icon-active")
    $(`#icon2-${pos}`).removeClass("icon-active")
    $(`#icon3-${pos}`).removeClass("icon-active")
    $(`#${id}`).css("text-align","left")
  })
   
  $(`#icon2-${pos}`).on("click",function(event){
    event.stopPropagation()
    $(`#icon2-${pos}`).addClass("icon-active")
    $(`#icon1-${pos}`).removeClass("icon-active")
    $(`#icon3-${pos}`).removeClass("icon-active")
    $(`#${id}`).css("text-align","center")
  })
  
  $(`#icon3-${pos}`).on("click",function(event){
    event.stopPropagation()
    $(`#icon3-${pos}`).addClass("icon-active")
    $(`#icon2-${pos}`).removeClass("icon-active")
    $(`#icon1-${pos}`).removeClass("icon-active")
    $(`#${id}`).css("text-align","right")
  })  

  $(`#text-xposition-${pos}`).on('input',function(event){
    event.stopPropagation()
    const value = $(this).val()
    $(`#text-xposition-value-${pos}`).text(`X : ${value}`)
    $(`#${parentId}`).css("left",value+"px")
  })

  $(`#text-yposition-${pos}`).on('input',function(event){
    event.stopPropagation()
    const value = $(this).val()
    $(`#text-yposition-value-${pos}`).text(`Y : ${value}`)
    $(`#${parentId}`).css("top",value+"px")
  })
}

//function to edit image css

function editImageProperties(id){
  let pos
  if(id.toString().length>=29){
    pos = id.slice(27,)
  }else{
    pos = id.slice(11,)
  }
  $(`#image-width-${pos}`).on('input',function(event){
    event.stopPropagation()
    const value = $(this).val()
    $(`#image-width-value-${pos}`).text(`Width: ${value}`)
    $(`#${id}`).css("width",value+"px")
  })

  $(`#image-height-${pos}`).on('input',function(event){
    event.stopPropagation()
    const value = $(this).val()
    $(`#image-height-value-${pos}`).text(`Height: ${value}`)
    $(`#${id}`).css("height",value+"px")
  })

  $(`#image-xposition-${pos}`).on('input',function(event){
    event.stopPropagation()
    const value = $(this).val()
    $(`#image-xposition-value-${pos}`).text(`X : ${value}`)
    $(`#${id}`).css("left",value + 'px')
    if(pos < 11){
      $(`#${id}`).css("transform",`translate(${value}px,${0})`)
    }
  })

  $(`#image-yposition-${pos}`).on('input',function(event){
    event.stopPropagation()
    const value = $(this).val()
    $(`#image-yposition-value-${pos}`).text(`Y : ${value}`)
    $(`#${id}`).css("top",value+"px")
    if(pos < 11){
      $(`#${id}`).css("transform",`translate(${0},${value}px)`)
    }
  })
}

//add custom text and corresponding editor

//desktop
$(".tool-add-text").on("click",function(){
  if(selectedPage === 'Front-Page'){
    $('#front-page-content').append(
      `<div class="text-holder" id=default-text-input-holder-${countTextArea}>
      <i class="fa fa-trash delete-gcard-text"></i>
      <textarea spellcheck="false" class="user_text" id=default-text-input-${countTextArea} placeholder="Add Text" ></textarea>
    </div>`
    )
  }
  else if(selectedPage === 'Inside'){
    $(`#${selectedLayout} .page .${selectedInsidePage}`).append(
      `<div class="text-holder" id=default-text-input-holder-${countTextArea}>
        <i class="fa fa-trash delete-gcard-text"></i>
        <textarea spellcheck="false" class="user_text" id=default-text-input-${countTextArea} placeholder="Add Text" ></textarea>
      </div>`
    )
  }
  else if(selectedPage === 'Back-Page'){
    $('#back-page-content').append(
      `<div class="text-holder" id=default-text-input-holder-${countTextArea}>
        <i class="fa fa-trash delete-gcard-text"></i>
        <textarea spellcheck="false" class="user_text" id=default-text-input-${countTextArea} placeholder="Add Text" ></textarea>
      </div>`
    )
  }

  addTextEditor()
  countTextArea++;
})

//mobile
$(".mobile-view-tool-add-text").on("click",function(){

  if(cardOrientation === 'landscape'){
    $('.layout-tab-wrapper-1').css('display','none')
  }else{
    $('.layout-tab-wrapper').css('display','none')
  }

  if(selectedPage === 'Front-Page'){
    $('#front-page-content').append(
      `<div class="text-holder" id=default-text-input-holder-${countTextArea}>
      <i class="fa fa-trash delete-gcard-text"></i>
      <textarea spellcheck="false" class="user_text" id=default-text-input-${countTextArea} placeholder="Add Text" ></textarea>
    </div>`
    )
  }
  else if(selectedPage === 'Inside'){
    $(`#${selectedLayout} .page .${selectedInsidePage}`).append(
      `<div class="text-holder" id=default-text-input-holder-${countTextArea}>
        <i class="fa fa-trash delete-gcard-text"></i>
        <textarea spellcheck="false" class="user_text" id=default-text-input-${countTextArea} placeholder="Add Text" ></textarea>
      </div>`
    )
  }
  else if(selectedPage === 'Back-Page'){
    $('#back-page-content').append(
      `<div class="text-holder" id=default-text-input-holder-${countTextArea}>
        <i class="fa fa-trash delete-gcard-text"></i>
        <textarea spellcheck="false" class="user_text" id=default-text-input-${countTextArea} placeholder="Add Text" ></textarea>
      </div>`
    )
  }

  addTextEditor()
  countTextArea++;
})

//add image from local storage and corresponding editor

//desktop
$("#image-input").change(function(e){
  const file = e.target.files[0]
  if(file){
    const reader = new FileReader();
    reader.addEventListener('load',function(e){
      const imgUrl = e.target.result
      if(selectedPage === 'Front-Page'){
        $('#front-page-content').append(
          `<div class="image-holder" id=default-image-input-holder-${countImage}>
            <i class="fa fa-trash delete-gcard-image"></i>
            <img src=${imgUrl} id=user-image-${countImage} class="user-image">
          </div>`
          ) 
        countImage++;
      }

      else if(selectedPage === 'Inside'){
        $(`#${selectedLayout} .page .${selectedInsidePage}`).append(
          `<div class="image-holder" id=default-image-input-holder-${countImage}>
            <i class="fa fa-trash delete-gcard-image"></i>
            <img src=${imgUrl} id=user-image-${countImage} class="user-image">
          </div>`
        )
        countImage++;
      }

      else if(selectedPage === 'Back-Page'){
        $('#back-page-content').append(
          `<div class="image-holder" id=default-image-input-holder-${countImage}>
            <i class="fa fa-trash delete-gcard-image"></i>
            <img src=${imgUrl} id=user-image-${countImage} class="user-image">
          </div>`
        )
        countImage++;
      }
    })
    reader.readAsDataURL(file)
  }

  addImageEditor()
})

//mobile
$("#mobile-view-image-input").change(function(e){

  if(cardOrientation === 'landscape'){
    $('.layout-tab-wrapper-1').css('display','none')
  }else{
    $('.layout-tab-wrapper').css('display','none')
  }

  const file = e.target.files[0]
  if(file){
    const reader = new FileReader();
    reader.addEventListener('load',function(e){
      const imgUrl = e.target.result
      if(selectedPage === 'Front-Page'){
        $('#front-page-content').append(
          `<div class="image-holder" id=default-image-input-holder-${countImage}>
            <i class="fa fa-trash delete-gcard-image"></i>
            <img src=${imgUrl} id=user-image-${countImage} class="user-image">
          </div>`
          ) 
        countImage++;
      }

      else if(selectedPage === 'Inside'){
        $(`#${selectedLayout} .page .${selectedInsidePage}`).append(
          `<div class="image-holder" id=default-image-input-holder-${countImage}>
            <i class="fa fa-trash delete-gcard-image"></i>
            <img src=${imgUrl} id=user-image-${countImage} class="user-image">
          </div>`
        )
        countImage++;
      }

      else if(selectedPage === 'Back-Page'){
        $('#back-page-content').append(
          `<div class="image-holder" id=default-image-input-holder-${countImage}>
            <i class="fa fa-trash delete-gcard-image"></i>
            <img src=${imgUrl} id=user-image-${countImage} class="user-image">
          </div>`
        )
        countImage++;
      }
    })
    reader.readAsDataURL(file)
  }

  addImageEditor()
})

//add local image in gcard default slots

$('label').on('click',function(event){
  if(cardOrientation === 'landscape'){
    $('.layout-tab-wrapper-1').css('display','none')
  }else{
    $('.layout-tab-wrapper').css('display','none')
  }

  event.stopPropagation()
  let selectedInputId = $(this).attr('for') 
  let parent = $(this).parent()
  let grandParent = parent.parent()
  let grandParentClasses = grandParent.attr('class')
  let imageType =  grandParentClasses.slice(16,)

  $(`#${selectedInputId}`).change(function(e){
    const file = e.target.files[0]

    if(file){
    const reader = new FileReader();

    reader.addEventListener('load',function(e){
      const imgUrl = e.target.result
      
      $(`.${imageType} > .add-image`).css("display","none")
      $(`.${imageType} > .image-box`).css("display","inline-block")
      $(`.${imageType} > .image-box > img`).attr("src",imgUrl)
    })
    reader.readAsDataURL(file)  
  }
})
})

//select a particular text and call editing function

$('#gcard-editor-window').on('click','textarea',function(event){
  event.stopPropagation()
  const selectedTextId = $(this).attr('id');
  const countOfText = selectedTextId.slice(19,)

  $('.desktop-view-tool-box').css('display','none')
  $('.layout-tab-wrapper').css('display','none')
  $('.layout-tab-wrapper-1').css('display','none')
  
  if(countOfText > 14){
    const selectedTextHolder = $(this).parent()
    const selectedTextHolderId = selectedTextHolder.attr('id')
    
    $('.mobile-view-tool-position-text').css('display','flex')
    $(".user-image").removeClass("image-focused");
    $(".user_text").removeClass("text-area-active");
    $(".text-holder").removeClass("text-holder-active");
    $(`#${selectedTextId}`).addClass("text-area-active");
    $(`#${selectedTextHolderId}`).addClass("text-holder-active");
    
    $(`#${selectedTextId}`).on('keyup input',function(){
    {
      $(this).css('height','auto')
      $(this).css('height',this.scrollHeight+"px");
      $(`#${selectedTextHolderId}`).css('height','auto')
      $(`#${selectedTextHolderId}`).css('height',this.scrollHeight+"px");
      $(`#${selectedTextHolderId}`).css('height','auto')
    }
  })

  resizerFunction(`#${selectedTextId}`)
  draggerFunction(`#${selectedTextHolderId}`)
  editCSSProperties(selectedTextId,selectedTextHolderId);
}else{
  $('.mobile-view-tool-position-text').css('display','none')
  editCSSProperties(selectedTextId);
}

  if($(window).width()>767){
    $('.mobile-view-text-font-size').css('display','flex')
    $('.mobile-view-text-font-family').css('display','flex')
    $('.mobile-view-text-font-color').css('display','block')
    $('.mobile-view-text-font-alignment').css('display','flex')
  }

  $('.mobile-view-tool-box-1').css('display','none');
  $('.mobile-view-tool-box-2').css('display','flex');
  $('.tools-2').css('display','flex')
  $('.tools-3').css('display','none')
  $('.mobile-view-tool-box-3').css('display','none')  

  $('.text-tools').css("display","none")
  $(`#customize-text-pop-up-${selectedTextId.slice(19,)}`).css("display","flex")

})

//select a particular image and call editing function

$('#gcard-editor-window').on('click','img',function(event){
  event.stopPropagation()
  const selectedImageId = $(this).attr('id')
  const selectedImageHolder = $(this).parent()
  const selectedImageHolderId = selectedImageHolder.attr('id')
  
  const countOfSelectedImage = selectedImageId.slice(11,)

  $(".user-image").removeClass("image-focused");
  $(".image-tools").css('display','none')
  $(".text-tools").css('display','none')
  if($(window).width()<=786){
    $(`#customize-image-pop-up-${countOfSelectedImage}`).css('display','flex')

  }
  
  if(countOfSelectedImage < 11){
    draggerFunction(`#${selectedImageId}`)
    resizerFunction(`#${selectedImageId}`)
    editImageProperties(selectedImageId)
    $('.tools-2').css('display','none')
    $('.tools-3').css('display','flex')
    $('.mobile-view-tool-box-1').css('display','none');
    $('.mobile-view-tool-box-2').css('display','none');
    $('.mobile-view-tool-box-3').css('display','flex')
  }

  else if(selectedImageId !== "card-default-image" && countOfSelectedImage >=11)
  {
    resizerFunction(`#${selectedImageHolderId}`)
    draggerFunction(`#${selectedImageHolderId}`)
    $('.mobile-view-tool-box-1').css('display','none');
    $('.mobile-view-tool-box-2').css('display','none');
    $('.mobile-view-tool-box-3').css('display','flex')
    $('.tools-2').css('display','none')
    $('.tools-3').css('display','flex')
    $(`#${selectedImageId}`).addClass("image-focused");
    editImageProperties(selectedImageHolderId)
  }
  else{
    $('.mobile-view-tool-box-1').css('display','flex');
    $('.mobile-view-tool-box-2').css('display','none');
    $('.mobile-view-tool-box-3').css('display','none')
    $('.text-tools').css('display','none')
    $('.tools-2').css('display','none')
    $('.tools-3').css('display','none')
    if($(window).width()>767){
      $('.desktop-view-tool-box').css('display','flex')
    }
  }
  $(".user_text").removeClass("text-area-active");
  $(".text-holder").removeClass("text-holder-active");
  if($(window).width()<=767)
  {
    $('.mobile-view-text-font-size').css('display','none')
    $('.mobile-view-text-font-family').css('display','none')
    $('.mobile-view-text-font-color').css('display','none')
    $('.mobile-view-text-font-alignment').css('display','none')
  }
})

//delete gcard default slots image

$('.delete-image').on('click',function(event){
  event.stopPropagation()
  let parent = $(this).parent()
  let grandParent = parent.parent()
  let grandParentClasses = grandParent.attr('class')
  let imageType =  grandParentClasses.slice(16,)
  
  $(`.${imageType} > .image-box > img`).attr("src","")
  $(`.${imageType} > .image-box`).css("display","none")
  $(`.${imageType} > .add-image`).css("display","inline-block")
  $('input').val('')
})

//delete user added text

$('#gcard-editor-window').on('click','.delete-gcard-text',function(event){
  event.stopPropagation()
  const selectedElementHolder = $(this).parent()
  const selectedElementHolderId = selectedElementHolder.attr('id')

  const countOfSelectedText = selectedElementHolderId.slice(26,)


  $(`#customize-text-pop-up-${countOfSelectedText}`).remove()

  $(`#${selectedElementHolderId}`).remove()
  $('#image-input').val('')
  $('.mobile-view-tool-box-1').css('display','flex');
  $('.mobile-view-tool-box-2').css('display','none');
  $('.mobile-view-tool-box-3').css('display','none')
  $('.mobile-view-text-font-size').css('display','none')
  $('.mobile-view-text-font-family').css('display','none')
  $('.mobile-view-text-font-color').css('display','none')
  $('.mobile-view-text-font-alignment').css('display','none')
  $('.mobile-view-image-size').css('display','none')
  $('.tools-3').css('none')
  $('.tools-2').css('none')
  if($(window).width()>767){
    $('.desktop-view-tool-box').css('display','flex')
  }
})


//delete user added image
$('#gcard-editor-window').on('click','.delete-gcard-image',function(event){
  event.stopPropagation()
  const selectedElementHolder = $(this).parent()
  const selectedElementHolderId = selectedElementHolder.attr('id')

  const countOfSelectedImage = selectedElementHolderId.slice(27,)


  $(`#customize-image-pop-up-${countOfSelectedImage}`).remove()

  $(`#${selectedElementHolderId}`).remove()
  $('input').val('')
  $('.mobile-view-tool-box-1').css('display','flex');
  $('.mobile-view-tool-box-2').css('display','none');
  $('.mobile-view-tool-box-3').css('display','none')
  $('.mobile-view-text-font-size').css('display','none')
  $('.mobile-view-text-font-family').css('display','none')
  $('.mobile-view-text-font-color').css('display','none')
  $('.mobile-view-text-font-alignment').css('display','none')
  $('.mobile-view-image-size').css('display','none')
  $('.tools-3').css('none')
  $('.tools-2').css('none')
  if($(window).width()>767){
    $('.desktop-view-tool-box').css('display','flex')
  }
})


//for gaining original state
$('#main-display').on('click',function(){
  $(".user-image").removeClass("image-focused");
  $(".user_text").removeClass("text-area-active");
  $(".text-holder").removeClass("text-holder-active")
  $(".layout-tab-wrapper").css('display','none')
  $(".layout-tab-wrapper-1").css('display','none')
  if($(window).width()<=767){
    $('.desktop-view-tool-box').css('display','none')
    $('.mobile-view-tool-box-1').css('display','flex');
    $('.mobile-view-tool-box-2').css('display','none');
    $('.mobile-view-tool-box-3').css('display','none');
    $('.text-tools').css('display','none')
    $('.image-tools').css('display','none')
  }
  else{
    $('.desktop-view-tool-box').css('display','flex')
    $('.text-tools').css('display','none')
    $('.image-tools').css('display','none')
  }
})

$('.gcard-tool-bar').on('click',function(event){
  event.stopPropagation()
})

//preview gcard

$('#Preview-Gcard-Button').on('click',async()=>{
  $("#gcard-preview-screen").addClass("show-gcard-preview-screen")
  $('.flipbook-screen').css('display','none')
  $('#control-bar').css('display','none')
  $('#preview-screen-loader-container').css('display','flex')

  // const addImageLabel = document.querySelectorAll(`#${selectedLayout}  .page > .left-page .add-image`)
  // for(let index=0; index < addImageLabel.length;index++){
  //   console.log(index,addImageLabel[index].style.display);
  //   if(addImageLabel[index].style.display===""){
  //     console.log("true");
  //     addImageLabel[index].style.display = 'none'
  //   }
  // }

  // $(`#${selectedLayout} > .page > .left-page`).css('overflow','visible')
  // $(`#${selectedLayout} > .page > .right-page`).css('overflow','visible')
  
  $(`#${selectedLayout}  .page > .left-page`).css('overflow','visible')
  $(`#${selectedLayout}  .page > .left-page`).css('position','static')

  const InsideBtn = document.getElementById('open-inside-page-div')
  openPage('Inside', InsideBtn, 'red')
  const frontPage = document.getElementById('Front-Page')
  const leftMiddlePage = document.querySelector(`#${selectedLayout}  .page > .left-page`)
  const rightMiddlePage = document.querySelector(`#${selectedLayout}  .page > .right-page`)
  const backPage = document.getElementById('Back-Page')
  const texts = document.querySelectorAll('.gcard-textarea')

  for(let index in texts){
    if(!texts[index].value)
    texts[index].value = ' ' 
  }


  function filter (node) {
    return (node.tagName !== 'i');
  } 

  if($('#Front-Page').css('display')==='none'){
    $('#Front-Page').css('display','block')
    try{
      const dataUrl = await domtoimage.toSvg(frontPage, {filter: filter})
        $('#Front-Page').css('display','none')
        if(cardOrientation === 'landscape'){
          $("#flipbook-front-page-l > img").attr('src',dataUrl);  
        }else{
          $("#flipbook-front-page > img").attr('src',dataUrl);  
        }
    }catch(error){
              console.error('oops, something went wromg!',error);
    }  
  }
  else{
    try{
        const dataUrl = await domtoimage.toSvg(frontPage, {filter: filter})
        if(cardOrientation==='landscape'){
          alert('hello')
          $("#flipbook-front-page-l > img").attr('src',dataUrl);  
        }else{
          $("#flipbook-front-page > img").attr('src',dataUrl);  
        }
      }
      catch(error){
              console.error('oops, something went wromg!',error);
      }
  }
  
  if($('#Back-Page').css('display')==='none'){
    $('#Back-Page').css('display','block')
    try{
      const dataUrl = await domtoimage.toSvg(backPage, {filter: filter})
      $('#Back-Page').css('display','none')
      if(cardOrientation==='landscape'){
        $("#flipbook-back-page-l > img").attr('src',dataUrl);
      }else{
        $("#flipbook-back-page > img").attr('src',dataUrl);
      }
    }
    catch(error){
            console.error('oops, something went wromg!',error);
    }
  }
  else{
    try{
        const dataUrl = await domtoimage.toSvg(backPage, {filter: filter})
        if(cardOrientation==='landscape'){
          $("#flipbook-back-page-l > img").attr('src',dataUrl);
        }else{
          $("#flipbook-back-page > img").attr('src',dataUrl);
        }
      }
      catch(error){
            console.error('oops, something went wromg!',error);
      }
  }

  if($('#Inside').css('display')==='none'){
    $('#Inside').css('display','block')
    try{
      const dataUrl = await domtoimage.toSvg(leftMiddlePage, {filter: filter})
      if(cardOrientation==='landscape'){
        $("#flipbook-middle-left-page-l > img").attr('src',dataUrl);
      }else{
        $("#flipbook-middle-left-page > img").attr('src',dataUrl);
      }
    }
    catch(error){
      console.error('oops, something went wromg!',error);
    }

    try{
      const dataUrl1 = await domtoimage.toSvg(rightMiddlePage, {filter: filter})
      $('#Inside').css('display','none')
      if(cardOrientation==='landscape'){
        $("#flipbook-middle-right-page-l > img").attr('src',dataUrl1);
      }else{
        $("#flipbook-middle-right-page > img").attr('src',dataUrl1);
      }
    }
    catch(error){
      console.error('oops, something went wromg!',error);
    }
  }

  else{
    try{
      const dataUrl = await domtoimage.toSvg(leftMiddlePage, {filter: filter})
      if(cardOrientation==='landscape'){
        $("#flipbook-middle-left-page-l > img").attr('src',dataUrl);
      }else{
        $("#flipbook-middle-left-page > img").attr('src',dataUrl);
      }
    }
    catch(error){
      console.error('oops, something went wromg!',error);
    }

    try{
      const dataUrl1 = await domtoimage.toSvg(rightMiddlePage, {filter: filter})
      if(cardOrientation==='landscape'){
        $("#flipbook-middle-right-page-l > img").attr('src',dataUrl1);
      }else{
        $("#flipbook-middle-right-page > img").attr('src',dataUrl1);
      }
    }
    catch(error){
      console.error('oops, something went wromg!',error);
    }
  }
  $('#preview-screen-loader-container').css('display','none')
  $('.flipbook-screen').css('display','flex')
  $('#control-bar').css('display','flex')
  if($(window).width()>1000){
    $('#flipbook-forward-button-1').css('display','flex')
    $('#flipbook-backward-button-1').css('display','flex')
  }
  else if($(window).width()<=1000){
    $('#flipbook-forward-button-0').css('display','flex')
    $('#flipbook-backward-button-0').css('display','flex')
  }
})


//hide preview screen

$('#hide-gcard-preview-screen').on('click',function(){
  const texts = document.querySelectorAll('.gcard-textarea')
  for(let index in texts){
    if(texts[index].value===' ')
     texts[index].value='' 
  }

  $(`#${selectedLayout}  .page > .left-page`).css('overflow','hidden')
  $(`#${selectedLayout}  .page > .left-page`).css('position','relative')
  // $(`#${selectedLayout}  .page > .right-page`).css('overflow','hidden')

  $("#gcard-preview-screen").removeClass("show-gcard-preview-screen")
  $('.flipbook-forward-button').css('display','none')
  $('.flipbook-backward-button').css('display','none')
})

//desktop-view-tools

$('#tool-change-layout').on('click',function(event){
  event.stopPropagation()
  $('.desktop-view-tool-box').css('display','none')
  if(cardOrientation === 'landscape'){
    $('.layout-tab-wrapper-1').css('display','flex')
    $('.layout-tab-1').css('display','flex')
  }
  else{
    $('.layout-tab-wrapper').css('display','flex')
    $('.layout-tab').css('display','flex')
  }
})

//mobile view edit text

$('.mobile-view-tool-resize-text').on('click',function(){
  $('.mobile-view-text-font-size').css('display','flex')
  $('.mobile-view-text-font-family').css('display','none')
  $('.mobile-view-text-font-color').css('display','none')
  $('.mobile-view-text-font-alignment').css('display','none')
  $('.mobile-view-text-position').css('display','none')
})

$('.mobile-view-tool-font-text').on('click',function(){
  $('.mobile-view-text-font-size').css('display','none')
  $('.mobile-view-text-font-family').css('display','flex')
  $('.mobile-view-text-font-color').css('display','none')
  $('.mobile-view-text-font-alignment').css('display','none')
  $('.mobile-view-text-position').css('display','none')

})

$('.mobile-view-tool-color-text').on('click',function(){
  $('.mobile-view-text-font-size').css('display','none')
  $('.mobile-view-text-font-family').css('display','none')
  $('.mobile-view-text-font-color').css('display','block')
  $('.mobile-view-text-font-alignment').css('display','none')
  $('.mobile-view-text-position').css('display','none')

})

$('.mobile-view-tool-align-text').on('click',function(){
  $('.mobile-view-text-font-size').css('display','none')
  $('.mobile-view-text-font-family').css('display','none')
  $('.mobile-view-text-font-color').css('display','none')
  $('.mobile-view-text-font-alignment').css('display','flex')
  $('.mobile-view-text-position').css('display','none')
})

$('.mobile-view-tool-resize-image').on('click',function(){
  $('.mobile-view-image-size').css('display','flex')
  $('.mobile-view-image-position').css('display','none')
})

$('.mobile-view-tool-position-image').on('click',function(){
  $('.mobile-view-image-size').css('display','none')
  $('.mobile-view-image-position').css('display','flex')
})

$('.mobile-view-tool-change-layout').on('click',function(){
  if(cardOrientation === 'landscape'){
    $('.layout-tab-wrapper-1').css('display','flex')
    $('.layout-tab-1').css('display','flex')
  }else{
    $('.layout-tab-wrapper').css('display','flex')
    $('.layout-tab').css('display','flex')
  }
})

$('.mobile-view-tool-position-text').on('click',function(){
  $('.mobile-view-text-font-size').css('display','none')
  $('.mobile-view-text-font-family').css('display','none')
  $('.mobile-view-text-font-color').css('display','none')
  $('.mobile-view-text-font-alignment').css('display','none')
  $('.mobile-view-text-position').css('display','flex')
})

//to make textareas to resize automatically

$('.right-page > .text-container > .inner-block > textarea').on('keyup input',function(){
  {
    $(this).css('height','auto')
    $(this).css('height',this.scrollHeight+"px");
  }
})

$('#layout4 > .page > .right-page > .inner-block > .text-container > .inner-block > textarea').on('keyup input',function(){
  {
    $(this).css('height','auto')
    $(this).css('height',this.scrollHeight+"px");
  }
})

$('#layout1 > .page > .left-page > .text-container > .inner-block > textarea').on('keyup input',function(){
  {
    $(this).css('height','auto')
    $(this).css('height',this.scrollHeight+"px");
  }
})

$('#layout2 > .page > .left-page > .text-container > .inner-block > textarea').on('keyup input',function(){
  {
    $(this).css('height','auto')
    $(this).css('height',this.scrollHeight+"px");
  }
})

$('#layout3 > .page  > .left-page > .inner-block > .text-container > .inner-block > textarea').on('keyup input',function(){
  {
    $(this).css('height','auto')
    $(this).css('height',this.scrollHeight+"px");
  }
})

$('#layout4 > .page > .left-page >  .inner-block > .text-container > .inner-block > textarea').on('keyup input',function(){
  {
    $(this).css('height','auto')
    $(this).css('height',this.scrollHeight+"px");
  }
})

$('#layout6 > .page > .left-page > .inner-block > #upper-block >.text-container > .inner-block > textarea').on('keyup input',function(){
  {
    $(this).css('height','auto')
    $(this).css('height',this.scrollHeight+"px");
  }
})

$('#layout6 > .page > .left-page > .inner-block > #middle-block > .text-container > .inner-block > textarea').on('keyup input',function(){
  {
    $(this).css('height','auto')
    $(this).css('height',this.scrollHeight+"px");
  }
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

//continue button

$('#continue-button').on('click',async function(){
  $(".user_text").removeClass("text-area-active")
  $(".user-image").removeClass("image-focused");
  $('.flipbook-screen').css('display','none')
  $('#control-bar').css('display','none')
  $('.flipbook-backward-button').css('display','none')
  $('.flipbook-forward-button').css('display','none')
  $('#preview-screen-loader-container').css('display','flex')


  let dataUrl1
  let dataUrl2
  let dataUrl3
  let dataUrl4
  
  const frontPage = document.getElementById('Front-Page')
  const leftMiddlePage = document.querySelector(`#${selectedLayout}  .page > .left-page`)
  const rightMiddlePage = document.querySelector(`#${selectedLayout}  .page > .right-page`)
  const backPage = document.getElementById('Back-Page')

  if($('#Front-Page').css('display')==='none'){
    $('#Front-Page').css('display','block')  
    try{
      dataUrl1 = await domtoimage.toJpeg(frontPage, { quality: 1 })
      localStorage.setItem('gcard-image-link-0',dataUrl1)
      $('#Front-Page').css('display','none')  
    }catch(err){
      console.error(err);
    }
  }else{
    try{
      dataUrl1 = await domtoimage.toJpeg(frontPage, { quality: 1 })
      localStorage.setItem('gcard-image-link-0',dataUrl1)
    }catch(err){
      console.error(err);
    }
  }

  if($('#Inside').css('display')==='none'){
    $('#Inside').css('display','block')
    try{
      dataUrl2 = await domtoimage.toJpeg(leftMiddlePage, { quality: 1 })
      localStorage.setItem('gcard-image-link-1',dataUrl2)
      $('#Inside').css('display','none')
    }catch(err){
      localStorage.setItem('gcard-image-link-1','')
      console.error(err);
    }
  }else{
    try{
      dataUrl2 = await domtoimage.toJpeg(leftMiddlePage, { quality: 1 })
      localStorage.setItem('gcard-image-link-1',dataUrl2)
    }catch(err){
      localStorage.setItem('gcard-image-link-1',' ')
      console.error(err);
    }
  }

  
  if($('#Inside').css('display')==='none'){
    $('#Inside').css('display','block')
    try{
      dataUrl3 = await domtoimage.toJpeg(rightMiddlePage, { quality: 1 })
      localStorage.setItem('gcard-image-link-2',dataUrl3)
      $('#Inside').css('display','none')
    }catch(err){
      localStorage.setItem('gcard-image-link-2',' ')
      console.error(err);
    }
  }else{
    try{
      dataUrl3 = await domtoimage.toJpeg(rightMiddlePage, { quality: 1 })
      localStorage.setItem('gcard-image-link-2',dataUrl3)
    }catch(err){
      localStorage.setItem('gcard-image-link-2',' ')
      console.error(err);
    }
  }

  if($('#Back-Page').css('display')==='none'){
    $('#Back-Page').css('display','block')
    try{
      dataUrl4 = await domtoimage.toJpeg(backPage, { quality: 1 })   
      localStorage.setItem('gcard-image-link-3',dataUrl4)
      $('#Back-Page').css('display','none')
    }catch(err){
      console.error(err);
    }
  }else{
    try{
      dataUrl4 = await domtoimage.toJpeg(backPage, { quality: 1 })   
      localStorage.setItem('gcard-image-link-3',dataUrl4)
    }catch(err){
      console.error(err);
    }
  }
  
  if(cardOrientation==='landscape'){
    localStorage.setItem('card-type','gcard-l')
  }else{
    localStorage.setItem('card-type','gcard-p')
  }

  window.location.href = `../sharePage/sharePage.html?cardCategory=${cardCategory}&cardSubCategory=${cardSubCategory}&cardPosition=${cardPosition}`

})

//tracing which page is clicked by user
$(".left-page").on('click',function(){
  selectedInsidePage = "left-page"
})

$(".right-page").on('click',function(){
  selectedInsidePage = "right-page"
})

//for listening the window resizing dynamically

$(window).on("resize",function(){
  if($(window).width()<=767){
    $('.desktop-view-tool-box').css('display','none')
  }else{
    // $('.desktop-view-tool-box').css('display','flex')
  }
})

