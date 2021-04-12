const urlParts = $(location).attr("href").split("?")
const subParts = urlParts[1].split("&")
const cardCategory = subParts[0].split("=")[1]
const cardSubCategory = subParts[1].split("=")[1]
const cardPosition = subParts[2].split("=")[1]

const socialTitleMap = {
    "love":"Love You",
    "sorry": "I am Sorry",
    "wedding": "Congratulations!",
    "getwellsoon": "Get Well Soon",
    "congrats": "Congratulations!",
    "missyou": "Miss You",
    "thankyou":"Thanks a lot",
    "birthday": "Happy Birthday",
    "anniversary": "Anniversary cheers!"
}

const socialDescriptionMap = {
    "love" : "I am happiest when I’m right next to you.",
    "sorry" : "I messed up I know, I'm really sorry.",
    "wedding" :"Best wishes on this wonderful journey.",
    "getwellsoon" :"I pray you return to full health soon.",
    "congrats" :"You have made us all Proud.",
    "missyou" :"I miss you more than anything.",
    "thankyou":"Thank you for being the reason I smile.",
    "birthday" :"You gotta smile. It’s your Birthday.",
    "anniversary" :"Always knew you two had something special."
}

let docId;
let uId;
let finalLink;
let cardImageLink;
let orientation
let cardType1

const API_KEY = 'AIzaSyCDxKDwu7q_PV7n1JWghRt_dOPxB8TRcds'
const cardType = localStorage.getItem('card-type')

const key = cardCategory === "feelings" ? cardSubCategory : cardCategory
const socialTitle = socialTitleMap[key]
const socialDescription = socialDescriptionMap[key]

if(cardType === 'ecard-p'){
    orientation = 'p';
    cardType1 = 'ecard';
}else if(cardType === 'ecard-l'){
    orientation = 'l';
    cardType1 = 'ecard';
}else if(cardType==='gcard-p'){
    orientation = 'p';
    cardType1 = 'gcard';
}else if(cardType === 'gcard-l'){
    orientation = 'l';
    cardType1 = 'gcard';
}

const musicName = localStorage.getItem('music-name')
if(musicName!==' ')
{
    $('.music-name').text(musicName)
    $('#add-music-button').text('CHANGE MUSIC')
}else{
    $('#add-music-button').text('ADD MUSIC')
}

if(cardType==='ecard-l'||cardType==='ecard-p')
{
    $('.download-option-container').css('display','block')
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      uId = user.uid
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

var animation1 = bodymovin.loadAnimation({
    container : document.getElementById('changing-person'),
    renderer : 'svg',
    loop : true,
    autoplay : true,
    path : '../animations/Changing-Illustration.json'
})

var animation2 = bodymovin.loadAnimation({
    container : document.getElementById('loader'),
    renderer : 'svg',
    loop : true,
    autoplay : true,
    path : '../animations/postbox.json'
})

$('.login-container').on('click',function(){
    $(this).css('display','none')
}) 


//uploading user card image and music to storage and db 

async function uploader(){

    //rating
    const washingtonRef = firebase.firestore().doc(`rating/allrating/${cardCategory}/${cardSubCategory}`);
    try{
        washingtonRef.update(`${cardPosition}`,firebase.firestore.FieldValue.increment(1));
    }catch(err){
        console.log(err);
    }
    //rating

    const date = new Date()
    const timeStamp = date.getTime()
    const musicLink = localStorage.getItem('music-link')?localStorage.getItem('music-link'):' '

    let images=[]
    if(cardType==='ecard-l'|| cardType==='ecard-p')
    {

        const dataUrl = localStorage.getItem('ecard-image')
        const file = await fetch(dataUrl);
        const blob = await file.blob();

        const ref = firebase.storage().ref(`users/${uId}/sharedcards/${timeStamp}.jpg`)
        await ref.put(blob);
    
        const downloadUrl =await ref.getDownloadURL()
        const imageURI = downloadUrl.toString()
        images.push(imageURI)

    }else{
        const dataUrl1 = localStorage.getItem('gcard-image-link-0')
        const dataUrl2 = localStorage.getItem('gcard-image-link-1')
        const dataUrl3 = localStorage.getItem('gcard-image-link-2')
        const dataUrl4 = localStorage.getItem('gcard-image-link-3')

        const file1 = await fetch(dataUrl1);
        const blob1 = await file1.blob();
        const ref1 = firebase.storage().ref(`users/${uId}/sharedcards/g0-${timeStamp}.jpg`)
        await ref1.put(blob1);
        const downloadUrl1 = await ref1.getDownloadURL()
        const imageURI1 = downloadUrl1.toString()
        images.push(imageURI1)

        const file2 = await fetch(dataUrl2);
        const blob2 = await file2.blob();
        const ref2 = firebase.storage().ref(`users/${uId}/sharedcards/g1-${timeStamp}.jpg`)
        await ref2.put(blob2);
        const downloadUrl2 =await ref2.getDownloadURL()
        const imageURI2 = downloadUrl2.toString()
        images.push(imageURI2)

        const file3 = await fetch(dataUrl3);
        const blob3 = await file3.blob();
        const ref3 = firebase.storage().ref(`users/${uId}/sharedcards/g2-${timeStamp}.jpg`)
        await ref3.put(blob3);
        const downloadUrl3 =await ref3.getDownloadURL()
        const imageURI3 = downloadUrl3.toString()
        images.push(imageURI3)

        const file4 = await fetch(dataUrl4);
        const blob4 = await file4.blob();
        const ref4 = firebase.storage().ref(`users/${uId}/sharedcards/g3-${timeStamp}.jpg`)
        await ref4.put(blob4);
        const downloadUrl4 =await ref4.getDownloadURL()
        const imageURI4 = downloadUrl4.toString()
        images.push(imageURI4)
    }

    try{
        const response = await firebase.firestore().collection(`users/${uId}/sharedcards`).add({
            date:timeStamp,
            imagelink:images,
            music:musicLink,
            type:cardType1,
            orientation : orientation
        })
        docId = response.id
    }catch(err){
        console.error(err);
    }

    try{
        const res = await fetch(`https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${API_KEY}`,{
          method : 'POST',
          headers : {
            "Content-Type" : 'application/json'
          },
          body : JSON.stringify({
            "dynamicLinkInfo": {
                "domainUriPrefix": "https://celebrare.in/linkscelebrare",
                "link": `https://www.celebrare.in/receiverPreviewPage/receiverPreviewPage.html?docId=${docId}&uid=${uId}`,
                "androidInfo": {
                    "androidPackageName": "com.enjoy.celebrare"
                },
                "socialMetaTagInfo": {
                    "socialTitle": `${socialTitle}`,
                    "socialDescription": `${socialDescription}`,
                    "socialImageLink": `${images[0]}`,
                },
                "navigationInfo": {
                    "enableForcedRedirect": "1",
                },
            }  
        })
        })
        const resBody = await res.json()
        const shortLink = resBody.shortLink
        finalLink = shortLink
        $('#link').text(finalLink)      
      }catch(err){
        console.log(err);
      }


}

//uploading user card image and music to storage and db 


//handling share option after authenticating the user

$('.share-link-button').on('click',async function(event){
    event.stopPropagation()
    firebase.auth().onAuthStateChanged(async function(user){
        if (user) {
            $('.loader-container').css('display','flex')
            await uploader()
            $('.loader-container').css('display','none')
            $('.sharing-option-popup-container').css('display','flex')
        }
        else{
          $('.login-container').css('display','flex')
        }
    });
})

$('.sharing-option-popup-container').on('click',function(event){
    event.stopPropagation()
    $('.copy-link-button').text('Copy Link')
    $(this).css('display','none')
})

$('.sharing-option-popup').on('click',function(event){
    event.stopPropagation()
})

$('#close-sharing-option-popup-container').on('click',function(event){
    event.stopPropagation()
    $('.copy-link-button').text('Copy Link')
    $('.sharing-option-popup-container').css('display','none')
})

$('#facebook-share-button').on('click',function(event){
    firebase.analytics().logEvent("Mode of using card", { "Mode": "Share using link" });
    window.open(`http://www.facebook.com/dialog/send?app_id=564571797575539&amp;link=${finalLink}&amp;redirect_uri=https://www.celebrare.in/`,'_blank')
})

$('#whatsapp-share-button').on('click',function(event){
    firebase.analytics().logEvent("Mode of using card", { "Mode": "Share using link" });
    window.open(`whatsapp://send?text=${finalLink}`,'_blank')
})

$('.copy-link-button').on('click',function(event){
    event.stopPropagation()
    firebase.analytics().logEvent("Mode of using card", { "Mode": "Share using link" });
    var range = document.createRange();
    range.selectNode(document.getElementById("link"));
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges()
    $(this).text('Copied')
})

$('.download-button').on('click',async function(){
    firebase.analytics().logEvent("Mode of using card", { "Mode": "Download" });
    const dataUrl = localStorage.getItem('ecard-image')
    var link = document.createElement('a');
    link.download = 'Image.jpeg';
    link.href = dataUrl;
    link.click();
})

//showing login popup if user not logedin 

//login handler
$("#facebookLogIn").on("click", function (event) {
    event.stopPropagation()
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(async(result)=> {
          uid = result.user.uid
            $('.login-container').css('display','none')
            $('.loader-container').css('display','flex')
            await uploader()
            $('.loader-container').css('display','none')
            $('.sharing-option-popup-container').css('display','flex')
        })
      .catch(function (error) {
        const errCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
        console.log(error.code,error.message);
      });
  });
  
  $("#googleLogIn").on("click", function (event) {
    event.stopPropagation()
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(async (result)=>{
        uid = result.user.uid
        const token = await result.credential.accessToken;
        const user  = await result.user;
        $('.login-container').css('display','none')
        $('.loader-container').css('display','flex')
        await uploader()
        $('.loader-container').css('display','none')
        $('.sharing-option-popup-container').css('display','flex')
    })
      .catch(function (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
        console.log(error.code,error.message);
      });
  });

//showing login popup if user not logedin 

