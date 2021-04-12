let countTextArea=0;
let countImage = 0;
let node1 = document.getElementById('div4')
let node2 = $('#div4')
let cardOrientation
let imageDownloadLink;

const urlParts = $(location).attr("href").split("?")
const subParts = urlParts[1].split("&")
const cardCategory = subParts[0].split("=")[1]
const cardSubCategory = subParts[1].split("=")[1]
const cardId = subParts[2].split("=")[1]
const cardPosition = subParts[3].split("=")[1]

var animation = bodymovin.loadAnimation({
  container : document.getElementById('loader-1'),
  renderer : 'svg',
  loop : true,
  autoplay : true,
  path : '../animations/loading.json'
})

firebase.analytics().logEvent("Card", {"Card" : cardId});
firebase.analytics().logEvent("Card type", {"Card type": "Gcard"});

localStorage.setItem('ecard-image',' ')

//rgb-to-hex

var rgbToHex = function (rgb) { 
  var hex = Number(rgb).toString(16);
  if (hex.length < 2) {
       hex = "0" + hex;
  }
  return hex;
};

var fullColorHex = function(r,g,b) {   
  var red = rgbToHex(r);
  var green = rgbToHex(g);
  var blue = rgbToHex(b);
  return red+green+blue;
};

function addImageEditor(){
  $("#tools-wrapper").append(`
    <div class="image-tools" id=customize-image-pop-up${countImage}>
      <div class="tools-3">
        <div class="mobile-view-image-size" >
          <span id=image-width-value${countImage}>Width : 200</span>
          <input type="range" min="10" max="500" value="200"  class="font-size-slider" id=image-width${countImage}>
          <span id=image-height-value${countImage}>Height : 200</span>
          <input type="range" min="10" max="800" value="200"  class="font-size-slider" id=image-height${countImage}>
        </div>
        <div class="mobile-view-image-position" >
          <span id=image-xposition-value${countImage}>X : 0</span>
          <input type="range" min="0" max="520" value="0"  class="font-size-slider" id=image-xposition${countImage}>
          <span id=image-yposition-value${countImage}>Y : 0</span>
          <input type="range" min="0" max="800" value="0"  class="font-size-slider" id=image-yposition${countImage}>
        </div>
      </div>
    </div>
  `)
}

function addTextEditor(){
  $("#tools-wrapper").append(`
    <div class="text-tools" id=customize-text-pop-up${countTextArea}>
      <div class="tools-2">

        <div class="mobile-view-text-font-size" >
          <div>
            <span class="font-size-title">Size : </span>
            <span id=font-size-value${countTextArea}>20</span>
          </div>
          <input type="range" min="10" max="200" value="20"  class="font-size-slider" id=font-size${countTextArea}>
        </div>

        <div class="mobile-view-text-font-alignment">
            <div class="font-alignment-title">
              Alignment :
            </div>
            <div style="width:100%;display:flex;justify-content:space-around">
              <i class="fa fa-align-left icon" id=icon1${countTextArea}></i>
              <i class="fa fa-align-center icon" id=icon2${countTextArea}></i>
              <i class="fa fa-align-right icon" id=icon3${countTextArea}></i>
            </div>
        </div>

            <div class="font-family-title">
              Typefaces : 
            </div>
            <div class="mobile-view-text-font-family" id=font-style${countTextArea}>
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

        <div class="mobile-view-text-font-color change-font-color${countTextArea}">
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
          <span id=text-xposition-value${countTextArea}>X : 0</span>
          <input type="range" min="0" max="520" value="0"  class="font-size-slider" id=text-xposition${countTextArea}>
          <span id=text-yposition-value${countTextArea}>Y : 0</span>
          <input type="range" min="0" max="800" value="0"  class="font-size-slider" id=text-yposition${countTextArea}>
        </div>
    </div>

  </div>`)
}

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

//fetch Data

fetchData = async ()=>{
    $('#loader-container').css('display','flex')
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
          // $('#div4').css('backgroundImage',`url('${cardDetails.imageUrl})`)
          $('#card-default-image').attr('src',cardDetails.imageUrl)
          if(cardDetails.orientation === 'l')
          {
            cardOrientation = 'landscape'
            $('#div4').addClass('div4-landscape')
            // $('#card-default-image').addClass('div4-landscape')
          }
          else{
            cardOrientation = 'portrait'
            $('#div4').addClass('div4-portrait')
            // $('#card-default-image').addClass('div4-portrait')
          }

          for(let index in cardDetails.texts){
            $('#div4').append(`
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
                      width : ${cardDetails.texts[index].width}px;
                      height : ${cardDetails.texts[index].height}px;
                      text-align: ${cardDetails.texts[index].alignment};
                      color : #${cardDetails.texts[index].color};
                      font-family : ${cardDetails.texts[index].fontFamily};
                      font-size : ${cardDetails.texts[index].fontSize}px;              
                  '"
                  >${cardDetails.texts[index].value}</textarea>
                </div>
            `)
            addTextEditor()
            ++countTextArea;
          }
        $('#loader-container').css('display','none')
        }  
    }
    catch(err)
    {
        console.log(err);
    }
}

fetchData();

//extract card text info and update it in db

$('.extract-card-text-css').on('click',async()=>{
  let texts = [];
  $('#div4').children('.text-holder').each(function(){
    let id = $(this).attr('id')
    let childId = $(`#${id} > textarea`).attr('id')

    let value = $(`#${childId}`).val();
    let width = parseInt($(`#${childId}`).css('width').split('px')[0])
    let height = parseInt($(`#${childId}`).css('height').split('px')[0])
    let fontSize = parseInt($(`#${childId}`).css('font-size').split('px')[0])
    let color = $(`#${childId}`).css('color')
    let fontFamily = $(`#${childId}`).css('font-family')
    let alignment = $(`#${childId}`).css('text-align')
    let initialLeft = $(`#${id}`).css('left').split("px")
    let initialTop = $(`#${id}`).css('top').split("px")
    let initialLeftInt = parseInt(initialLeft[0])
    let initialTopInt = parseInt(initialTop[0])
    let transformedX =  parseInt($(`#${id}`).attr('data-x'))
    let transformedY = parseInt($(`#${id}`).attr('data-y'))
    let left = transformedX ? initialLeftInt + transformedX : initialLeftInt
    let top = transformedY ?initialTopInt + transformedY : initialTopInt


    const parts = color.split(',')

    const r = parts[0].split('(')[1]
    const g = parts[1].split(' ')[1]
    const bParts = parts[2].split(' ')[1]
    const b = bParts.split(')')[0]    

    console.log(width,height);

    let text = {
      width : width,
      height : height,
      value : value,
      fontSize : fontSize,
      fontFamily : fontFamily,
      color : fullColorHex(r,g,b),
      alignment : alignment,
      left : left,
      top : top
    }

    texts.push(text)
  })

  const docRef = firestore().doc(`Celebrare/SectionCards/Birthday/AllCards/Card/${cardId}`)
  
  try{
    const response = await docRef.update({texts : texts})
  }
  catch(error){
    console.log(error);
  }
})

//function to change all css properties of a particular text

function editCSSProperties(id,parentId){
  const pos = id.slice(9,)

  $(`#font-style${pos}`).on('click','span',function(event){
    event.stopPropagation()
    $(`#font-style${pos} > span`).css("color","black")
    $(this).css("color","rgb(8, 185, 96)")
    $(`#${id}`).css("font-family",$(this).css('font-family'))
  })
  
  $(`#font-size${pos}`).on('input',function(event){
    event.stopPropagation()
    const value = $(this).val()
    $(`#font-size-value${pos}`).text(`${value}`)
    $(`#${id}`).css("height",'auto')
    $(`#${id}`).css('height',document.getElementById(`${id}`).scrollHeight+"px");
    $(`#${id}`).css("font-size",value+"px")
  })

  $(`.change-font-color${pos}`).on('click','div',function(event){
    event.stopPropagation()
    const color = $(this).css("background-color");
    if(color !== "rgba(0, 0, 0, 0)")
    {
      $(`.color`).css("box-shadow","")
      $(this).css("box-shadow","1px 1px 10px 1px rgba(0, 0, 0, .8)")      
      $(`#${id}`).css("color",color)    
    }
  })

  $(`#icon1${pos}`).on("click",function(event){
    event.stopPropagation()
    $(`#icon1${pos}`).addClass("icon-active")
    $(`#icon2${pos}`).removeClass("icon-active")
    $(`#icon3${pos}`).removeClass("icon-active")
    $(`#${id}`).css("text-align","left")
  })
   
  $(`#icon2${pos}`).on("click",function(event){
    event.stopPropagation()
    $(`#icon2${pos}`).addClass("icon-active")
    $(`#icon1${pos}`).removeClass("icon-active")
    $(`#icon3${pos}`).removeClass("icon-active")
    $(`#${id}`).css("text-align","center")
  })
  
  $(`#icon3${pos}`).on("click",function(event){
    event.stopPropagation()
    $(`#icon3${pos}`).addClass("icon-active")
    $(`#icon2${pos}`).removeClass("icon-active")
    $(`#icon1${pos}`).removeClass("icon-active")
    $(`#${id}`).css("text-align","right")
  }) 
  
  $(`#text-xposition${pos}`).on('input',function(event){
    event.stopPropagation()
    const value = $(this).val()
    $(`#text-xposition-value${pos}`).text(`X : ${value}`)
    $(`#${parentId}`).css("left",value+"px")
    // $(`#${parentId}`).css("transform",`translate(${value}px,${0})`)
  })

  $(`#text-yposition${pos}`).on('input',function(event){
    event.stopPropagation()
    const value = $(this).val()
    $(`#text-yposition-value${pos}`).text(`Y : ${value}`)
    $(`#${parentId}`).css("top",value+"px")
    // $(`#${parentId}`).css("transform",`translate(${0},${value}px)`)

  })
}

//function to change props of an image
function editImageProperties(id){
  const pos = id.slice(13,)
  $(`#image-width${pos}`).on('input',function(event){
    event.stopPropagation()
    const value = $(this).val()
    $(`#image-width-value${pos}`).text(`Width : ${value}`)
    $(`#${id}`).css("width",value+"px")
  })

  $(`#image-height${pos}`).on('input',function(event){
    event.stopPropagation()
    const value = $(this).val()
    $(`#image-height-value${pos}`).text(`Height : ${value}`)
    $(`#${id}`).css("height",value+"px")
  })

  $(`#image-xposition${pos}`).on('input',function(event){
    event.stopPropagation()
    const value = $(this).val()
    $(`#image-xposition-value${pos}`).text(`X : ${value}`)
    $(`#${id}`).css("left",value+"px")
  })

  $(`#image-yposition${pos}`).on('input',function(event){
    event.stopPropagation()
    const value = $(this).val()
    $(`#image-yposition-value${pos}`).text(`Y : ${value}`)
    $(`#${id}`).css("top",value+"px")
  })
}

// function to make an element draggable and resizable

function resizerFunction(id){
interact(id)
.resizable({
    // resize from all edges and corners
    edges: { left: false, right: true, bottom: true, top: false },

    listeners: {
    move (event) {
        event.stopPropagation()
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
        min: { width: 100, height: 45 }
    })
    ],

    inertia: true
})
}

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
        event.stopPropagation()
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
  event.stopPropagation()
  var target = event.target

  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // translate the element
  target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
}
}

//add custom text and corresponding editor

$(".tool-add-text").on("click",function(){
  console.log(countTextArea);
  $("#div4").append(
    `<div class="text-holder text-holder-active" id=text-holder-${countTextArea}>
      <i class="fa fa-trash delete-ecard-text"></i>
      <textarea spellcheck="false" class="user_text text-area-active" id=text_area${countTextArea} placeholder="Add Text"></textarea>
    </div>`    
    )

  addTextEditor()
  ++countTextArea;
})

//mobile view add text
$(".mobile-view-tool-add-text").on("click",function(){
  $("#div4").append(
    `<div class="text-holder text-holder-active" id=text-holder-${countTextArea}>
      <i class="fa fa-trash delete-ecard-text"></i>
      <textarea spellcheck="false" class="user_text text-area-active" id=text_area${countTextArea} placeholder="Add Text"></textarea>
    </div>`    
    )

  addTextEditor()
  ++countTextArea;
})


//add local image

$("#image-input").change(function(e){
  const file = e.target.files[0]
  
  if(file){
    const reader = new FileReader();

    reader.addEventListener('load',function(e){
      const imgUrl = e.target.result
      
      $("#div4").append(`
        <div class="image-holder" id=image-holder-${countImage}>
          <i class="fa fa-trash delete-ecard-image"></i>
          <img src=${imgUrl} id=image${countImage} class="user-image">
        </div>`)
      addImageEditor()
      ++countImage;
    })
    reader.readAsDataURL(file)
  }
})

//mobile view add image

$("#mobile-view-image-input").change(function(e){
  const file = e.target.files[0]
  
  if(file){
    const reader = new FileReader();

    reader.addEventListener('load',function(e){
      const imgUrl = e.target.result
      
      $("#div4").append(`
        <div class="image-holder" id=image-holder-${countImage}>
          <i class="fa fa-trash delete-ecard-image"></i>
          <img src=${imgUrl} id=image${countImage} class="user-image">
        </div>`)
      addImageEditor()
      ++countImage;
    })
    reader.readAsDataURL(file)
  }
})

//edit text 

$('#div4').on('click','textarea',function(event){
  event.stopPropagation()
  const selectedTextId = $(this).attr('id');
  const selectedTextHolder = $(this).parent()
  const selectedTextHolderId = selectedTextHolder.attr('id')

  $('.desktop-view-tool-box').css('display','none')
  $('.image-tools').css('display','none')
  $(".user-image").removeClass("image-focused");

  if($(window).width()>767){
    $('.mobile-view-text-font-size').css('display','flex')
    $('.mobile-view-text-font-family').css('display','flex')
    $('.mobile-view-text-font-color').css('display','block')
    $('.mobile-view-text-font-alignment').css('display','flex')
  }

  $(`#${selectedTextId}`).on('keyup input',function(){
    {
      $(this).css('height','auto')
      $(this).css('height',this.scrollHeight+"px");
      $(`#${selectedTextHolderId}`).css('height','auto')
      $(`#${selectedTextHolderId}`).css('height',this.scrollHeight+"px");
      $(`#${selectedTextHolderId}`).css('height','auto')
    }
  })

  $('.tools-3').css('display','none')
  $('.mobile-view-tool-box-1').css('display','none');
  $('.mobile-view-tool-box-2').css('display','flex');
  $('.mobile-view-tool-box-3').css('display','none')

  $(".user_text").removeClass("text-area-active");
  $(".text-holder").removeClass("text-holder-active");
  $(`#${selectedTextId}`).addClass("text-area-active");
  $(`#${selectedTextHolderId}`).addClass("text-holder-active");
  $('.text-tools').css("display","none")
  $('.tools-2').css('display','flex')
  $(`#customize-text-pop-up${selectedTextId.slice(9,)}`).css("display","flex")

  editCSSProperties(selectedTextId,selectedTextHolderId);
  if($(window).width()>767){
    resizerFunction(`#${selectedTextId}`)
    draggerFunction(`#${selectedTextHolderId}`)
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

$('.mobile-view-tool-position-text').on('click',function(){
  $('.mobile-view-text-font-size').css('display','none')
  $('.mobile-view-text-font-family').css('display','none')
  $('.mobile-view-text-font-color').css('display','none')
  $('.mobile-view-text-font-alignment').css('display','none')
  $('.mobile-view-text-position').css('display','flex')
})

$('.mobile-view-tool-resize-image').on('click',function(){
  $('.mobile-view-image-size').css('display','flex')
  $('.mobile-view-image-position').css('display','none')
})

$('.mobile-view-tool-position-image').on('click',function(){
  $('.mobile-view-image-size').css('display','none')
  $('.mobile-view-image-position').css('display','flex')
})
// edit image

$('#div4').on('click','img',function(event){
  event.stopPropagation()
  const selectedImageId = $(this).attr('id')
  const selectedImageHolder = $(this).parent()
  const selectedImageHolderId = selectedImageHolder.attr('id')

  const selectedImageCount = selectedImageId.slice(5,)

  $(".user-image").removeClass("image-focused");
  $(".image-tools").css('display','none')
  $(`#customize-image-pop-up${selectedImageCount}`).css('display','flex')

  if(selectedImageId !== "card-default-image")
  {
    $(`#${selectedImageId}`).addClass("image-focused");
    resizerFunction(`#${selectedImageHolderId}`)
    draggerFunction(`#${selectedImageHolderId}`)
    $('.mobile-view-tool-box-1').css('display','none');
    $('.mobile-view-tool-box-2').css('display','none');
    $('.mobile-view-tool-box-3').css('display','flex')
    $('.tools-2').css('display','none')
    $('.tools-3').css('display','flex')
    editImageProperties(selectedImageHolderId)
  }
  else{
    $('.mobile-view-tool-box-1').css('display','flex');
    $('.mobile-view-tool-box-2').css('display','none');
    $('.mobile-view-tool-box-3').css('display','none')
    $('.text-tools').css('display','none')
    $('.tools-2').css('display','none')
    if($(window).width()>767){
      $('.desktop-view-tool-box').css('display','flex')
    }
    $('.tools-3').css('display','none')
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

//delete element

$('#div4').on('click','i',function(event){
  event.stopPropagation()
  const selectedElementHolder = $(this).parent()
  const selectedElementHolderId = selectedElementHolder.attr('id')
  const selectedElementHolderClass = selectedElementHolder.attr('class')
  if(selectedElementHolderClass.slice(0,11) == 'text-holder'){
    $(`#customize-text-pop-up${selectedElementHolderId.slice(12,)}`).remove()
  }
  if(selectedElementHolderClass == 'image-holder')
  {
    $(`#customize-image-pop-up${selectedElementHolderId.slice(13,)}`).remove()
  }
  // console.log();
  $(`#${selectedElementHolderId}`).remove()
  $('#image-input').val('')
  $('#mobile-view-image-input').val('')
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

$("#div4").on('click',function(event){
  event.stopPropagation()
  // $(".user_text").removeClass("text-area-active")
  // $(".text-holder").removeClass("text-holder-active");
  // $(".user-image").removeClass("image-focused");
  // $('.mobile-view-tool-box-1').css('display','flex');
  // $('.mobile-view-tool-box-2').css('display','none');
  // $('.mobile-view-tool-box-3').css('display','none')
  // $('.mobile-view-text-font-size').css('display','none')
  // $('.mobile-view-text-font-family').css('display','none')
  // $('.mobile-view-text-font-color').css('display','none')
  // $('.mobile-view-text-font-alignment').css('display','none')
})

$('.div4-wrapper').on('click',function(event){
  event.stopPropagation()
  $(".user_text").removeClass("text-area-active");
  $(".text-holder").removeClass("text-holder-active");
  if($(window).width()>767){
    $('.text-tools').css('display','none')
    $('.desktop-view-tool-box').css('display','flex')
  }
})

$('.editing-screen').on('click',function(){
  $(".user-image").removeClass("image-focused");
  $(".user_text").removeClass("text-area-active");
  $(".text-holder").removeClass("text-holder-active")
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

$('#tools-wrapper').on('click',function(event){
  event.stopPropagation()
})

// hide ecard preview screen

$('#hide-ecard-preview-screen').on('click',function(){
  $('#watermark').css('display','none')
  $("#ecard-preview-screen").removeClass("show-ecard-preview-screen")
  $("#preview-ecard-image > img").remove()
})

// show ecard preview screen

$('document').ready(function(){

  $("#Preview-Ecard-Image-Button").on("click", function () {
    var node = document.getElementById('capture-card-image')

    $("#preview-ecard-image").css('display','none');
    $('#control-bar').css('display','none')
    $('#preview-screen-loader-container').css('display','flex')   


    $('#watermark').css('display','block')
    $(".user_text").removeClass("text-area-active")
    $(".text-holder").removeClass("text-holder-active")
    $(".user-image").removeClass("image-focused");
    $("#ecard-preview-screen").addClass("show-ecard-preview-screen")
    $("#water-mark").css("display","flex")  

    function filter (node) {
      return (node.tagName !== 'i');
    } 
  
    domtoimage.toSvg(node, {filter: filter})
      .then(function (dataUrl) {
        var img = new Image()
        img.src = dataUrl
        img.id = `ecard-${cardOrientation}-image`
        $("#preview-ecard-image").append(img);
        $('#preview-screen-loader-container').css('display','none')
      $('#control-bar').css('display','flex')
        $("#preview-ecard-image").css('display','flex');
      })
      .catch(function(error){
              console.error('oops, something went wromg!',error);
      })
})
})

$('#continue-button').on('click',async function(){
  $("#preview-ecard-image").css('display','none');
  $('#control-bar').css('display','none')
  $('#preview-screen-loader-container').css('display','flex')   
  const node = document.getElementById('capture-card-image')


  const dataUrl = await domtoimage.toJpeg(node,{quality:1})
  localStorage.setItem('ecard-image',dataUrl)
  // localStorage.setItem('card-position')
  if(cardOrientation === 'l'){
    localStorage.setItem('card-type','ecard-l')
  }else{
    localStorage.setItem('card-type','ecard-p')
  }

  window.location.href = `../sharePage/sharePage.html?cardCategory=${cardCategory}&cardSubCategory=${cardSubCategory}&cardPosition=${cardPosition}`
})


$(window).on('resize',function(){
  if($(window).width()<=767){
    $('.desktop-view-tool-box').css('display','none')
  }
})

$(window).on('resize',function(){
  if($(window).width()<=630 && cardOrientation === 'l'){
    $(".div4-wrapper").css('justify-content','flex-start')
    $(".div4-wrapper").css('padding','10px')
  }
})

if($(window).width()<=630 && cardOrientation === 'l'){
  $(".div4-wrapper").css('justify-content','flex-start')
  $(".div4-wrapper").css('padding','10px')
}

//Cache Ecard-Type 
localStorage.setItem('cardCategory',cardCategory)
localStorage.setItem("subCategory",cardSubCategory)