let countCard=0
let cards
let docLength

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    $('.user-details-container').css('display','flex')
    $('.user-name').text(user.displayName)
    $('.user-profile-image-container img').attr('src',user.photoURL)
      $('.logout-button').css('display','block')
      $('.login-button').css('display','none')   
}
  else{
      $('.logout-button').css('display','none')
      $('.login-button').css('display','flex')
  }
});


$('.logout-button').on('click',function(){
    firebase.auth().signOut()
    $('.user-details-container').css('display','none')
    $('.user-name').text(' ')
    $(this).css('display','none')
    window.location.reload()
})

$('#loader-container').css('display','flex')

const categoryMap = {
    "dad" :["../img/birthday-dad-svg.svg","For Dad"],
    "forher" : ["../img/birthday-forher-svg.svg","For Her"],
    "forhim" : ["../img/birthday-forhim-svg.svg","For Him"],
    "friends" : ["../img/birthday-friends-svg.svg","For Friends"],
    "funnycards" : ["../img/birthday-funnycards-svg.svg","Funny Cards"],
    "generalcards" : ["../img/birthday-general-svg.svg","General Cards"],
    "kids" : ["../img/birthday-kids-svg.svg","For Kids"],
    "mom" : ["../img/birthday-mom-svg.svg","For Mom"]
}

const url = $(location).attr('href')
const parts = url.split("?")
const subParts = parts[1].split("&")
const cardCategory = subParts[0].split("=")[1]
const cardSubCategory = subParts[1].split("=")[1]

firebase.analytics().logEvent("Category", { "Category": "Birthday"});
firebase.analytics().logEvent("Sub category", { "Sub category" :  cardSubCategory});

for(let key in categoryMap){
    if(cardSubCategory === key){
        $('#category-svg').attr('src',categoryMap[key][0])
        $('#card-title').text(categoryMap[key][1])
    }
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

function addCards(Cards,pagenumber){
    $('.page-number').removeClass('active-page')
    $(`#page-${pagenumber}`).addClass('active-page')
    const begin = (pagenumber-1)*20 + 1
    const end = (begin + 19) < docLength ? (begin + 19) : docLength
    for(let key = begin;key<=end;key++)
    {
        $('#card-container').append(
            `<div class="col-6 col-md-4 col-lg-3 d-flex justify-content-center align-items-center">
                <div class="card-wrapper">
                    <div id=img-loader-container-${countCard} style="width: 100%;height: fit-content;padding:20px 0;display: flex;justify-content: center;align-items: center;border-radius: 5px;box-shadow: 0 2px 5px #666;">
                        <div id=loader-${countCard} style="width: 100px;height: 100px"></div>
                    </div>
                        <img
                            src=${Cards[key][0]} 
                            alt=""
                            onload=onImgLoaded(${countCard})
                            id=image-${countCard} 
                            data-card-id=${Cards[key][1]}
                            data-card-subcategory=${cardSubCategory}
                            data-card-preview=${Cards[key][3]}
                            data-card-position=${key-1}
                        />
                </div>
            </div>`)
            var animation = bodymovin.loadAnimation({
                container : document.getElementById(`loader-${countCard}`),
                renderer : 'svg',
                loop : true,
                autoplay : true,
                path : '../animations/loading.json'
            })
            countCard++;
    }
}

function addButtons(){
    const numberOfButtons = Math.ceil(docLength / 20)

    if(numberOfButtons>1){
        $('#page-buttons-container').css('display','block')
        for(let i=1;i<=numberOfButtons;i++){
            $('#pagination-button-container').append(`
                <span class="page-number" id=page-${i}>${i}</span>
            `)
        }
    }
}

//fetch Data

fetchData = async ()=>{
    const docRef =  firestore().doc(`celebrare/sectioncards/${cardCategory}/${cardSubCategory}`)
    try{
        const snapShot = await docRef.get()
        docLength = Object.keys(snapShot.data()).length 
        addButtons()

        if(!snapShot.exists)
        {
            console.log('Documents not exist');
        }
        else{
            cards = snapShot.data()
            addCards(cards,1)
            $('#loader-container').css('display','none')
        }  
    }
    catch(err)
    {
        console.log(err);
    }
}

fetchData();


let loaded=false

window.addEventListener("scroll", async(event) => {

    const scroll = this.scrollY;
    const height = $('#card-container').css('height').split("px")[0]
    if(scroll>=height-400&&!loaded&&cardSubCategory!=="generalcards"){
        loaded = true
        const docRef =  firestore().doc(`celebrare/sectioncards/${cardCategory}/generalcards`)
        try{
            const snapShot = await docRef.get()
            if(!snapShot.exists)
            {
                console.log('Documents not exist');
            }
            else{
                const Cards = snapShot.data()
                for(let key in Cards)
                {
                    $('#card-container').append(
                        `<div class="col-6 col-md-4 col-lg-3 d-flex justify-content-center align-items-center">
                            <div class="card-wrapper">
                                <div id=img-loader-container-${countCard} style="width: 100%;height: fit-content;padding:20px 0;display: flex;justify-content: center;align-items: center;border-radius: 5px;box-shadow: 0 2px 5px #666;">
                                    <div id=loader-${countCard} style="width: 100px;height: 100px"></div>
                                </div>
                                    <img
                                        src=${Cards[key][0]}
                                        alt=""
                                        onload=onImgLoaded(${countCard}) 
                                        id=image-${countCard} 
                                        data-card-id=${Cards[key][1]}
                                        data-card-subcategory="generalcards"
                                        data-card-preview=${Cards[key][3]}
                                        data-card-position=${key-1}
                                    />
                            </div>
                        </div>`)
                        var animation = bodymovin.loadAnimation({
                            container : document.getElementById(`loader-${countCard}`),
                            renderer : 'svg',
                            loop : true,
                            autoplay : true,
                            path : '../animations/loading.json'
                        })
                        countCard++;
                }
            }  
        }
        catch(err)
        {
            console.log(err);
        }
    }
});

$('#pagination-button-container').on('click','span',function(event){
    event.stopPropagation()
    const pageNumber = $(this).text()
    $('#card-container').empty()
    $(window).scrollTop(200);
    addCards(cards,pageNumber)
})

function onImgLoaded(element){
    $(`#img-loader-container-${element}`).css('display','none')
    $(`#image-${element}`).css('display','flex')
}

const year = new Date().getFullYear()
$('#current-year').text(`${year}.`)

