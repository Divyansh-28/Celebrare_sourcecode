var animation1 = bodymovin.loadAnimation({
    container : document.getElementById('card-preview-popup-loader'),
    renderer : 'svg',
    loop : true,
    autoplay : true,
    path : '../animations/loading.json'
})


const fetchData = async (cardId,cardSubCategory)=>{
    const docRef = await firestore().doc(`celebrare/sectioncards/${cardCategory}/allcards/${cardSubCategory}/${cardId}`)
  

    try{
        const snapShot =await docRef.get()
        if(!snapShot.exists)
        {
            console.log('Document not exist');
        }
        else{
            const cardData = snapShot.data()
            $('.preview-page-card-title').text(cardData.title)
            $('.preview-page-card-alt').text(`"${cardData.alt}."`)
           
            if(cardData.orientation=== 'l')
            {
                $('.preview-page-card-image-holder').append(`
                    <img src=${cardData.link} alt="Card Image"  class="preview-page-card-image-landscape"/>
                `)
            }
            else{
                $('.preview-page-card-image-holder').append(`
                    <img src=${cardData.link} alt="Card Image" class="preview-page-card-image-portrait"/>
                `)
            }
            $('#card-preview-popup-loader-container').css('display','none')
            $('.preview-page-container').css('display','flex')
        }  
    }
    catch(err)
    {
        console.log(err);
    }
}

const loadPreview =(cardLink) =>{
    $('.preview-page-card-image-holder').append(`
                    <img src=${cardLink} alt="Card Image"  class="preview-page-card-image"/>
                `)
}

$('#card-container').on('click','img',async function(event){
    event.stopPropagation()
    const cardId = $(this).attr('data-card-id')
    const cardSubCategory = $(this).attr('data-card-subcategory')
    const PreviewCard = $(this).attr('data-card-preview')
    const cardPosition = $(this).attr('data-card-position')

    $('#ecard-editor-button').attr('href',`../cardEditor/ecardEditorPage.html?cardCategory=${cardCategory}&cardSubCategory=${cardSubCategory}&cardID=${cardId}&cardPosition=${cardPosition}`)
    $('#gcard-editor-button').attr('href',`../cardEditor/gcardEditorPage.html?cardCategory=${cardCategory}&cardSubCategory=${cardSubCategory}&cardID=${cardId}&cardPosition=${cardPosition}`)


    $('.preview-page-container').css('display','none')
    $('#card-preview-popup-loader-container').css('display','flex')

    $('.card-preview-popup').css('display','flex')

    /*fetchData(cardId,cardSubCategory);*/
    loadPreview(PreviewCard);
    $('#card-preview-popup-loader-container').css('display','none')
    $('.preview-page-container').css('display','flex')

})

$('.card-preview-popup').on('click',function(event){
    event.stopPropagation()
    $(this).css('display','none')
    $('.preview-page-card-image-holder >img').remove()
})

$('.preview-page-container').on('click',function(event){
    event.stopPropagation()
})

$('#card-preview-popup-close-button').on('click',function(event){
    event.stopPropagation()
    $('.preview-page-card-image-holder >img').remove()
    $('.card-preview-popup').css('display','none')
})