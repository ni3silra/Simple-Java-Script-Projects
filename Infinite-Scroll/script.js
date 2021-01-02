const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

//let responsePhotoArray = [{"id":"7_EIFr2xWLA","created_at":"2020-11-05T08:07:01-05:00","updated_at":"2020-12-02T05:40:13-05:00","promoted_at":"2020-11-05T13:00:01-05:00","width":5133,"height":7952,"color":"#DEE7EF","blur_hash":"LI9aaGt7M{WB.TofRjWCM_ayofof","description":null,"alt_description":null,"urls":{"raw":"https://images.unsplash.com/photo-1604581614699-7298b22abfbf?ixid=MXwxODc2NDF8MHwxfHJhbmRvbXx8fHx8fHx8\u0026ixlib=rb-1.2.1","full":"https://images.unsplash.com/photo-1604581614699-7298b22abfbf?crop=entropy\u0026cs=srgb\u0026fm=jpg\u0026ixid=MXwxODc2NDF8MHwxfHJhbmRvbXx8fHx8fHx8\u0026ixlib=rb-1.2.1\u0026q=85","regular":"https://images.unsplash.com/photo-1604581614699-7298b22abfbf?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MXwxODc2NDF8MHwxfHJhbmRvbXx8fHx8fHx8\u0026ixlib=rb-1.2.1\u0026q=80\u0026w=1080","small":"https://images.unsplash.com/photo-1604581614699-7298b22abfbf?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MXwxODc2NDF8MHwxfHJhbmRvbXx8fHx8fHx8\u0026ixlib=rb-1.2.1\u0026q=80\u0026w=400","thumb":"https://images.unsplash.com/photo-1604581614699-7298b22abfbf?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MXwxODc2NDF8MHwxfHJhbmRvbXx8fHx8fHx8\u0026ixlib=rb-1.2.1\u0026q=80\u0026w=200"},"links":{"self":"https://api.unsplash.com/photos/7_EIFr2xWLA","html":"https://unsplash.com/photos/7_EIFr2xWLA","download":"https://unsplash.com/photos/7_EIFr2xWLA/download","download_location":"https://api.unsplash.com/photos/7_EIFr2xWLA/download"},"categories":[],"likes":60,"liked_by_user":false,"current_user_collections":[],"sponsorship":null,"user":{"id":"q6JFpYhUuao","updated_at":"2020-12-02T03:49:12-05:00","username":"mathieubigard","name":"Mathieu Bigard","first_name":"Mathieu","last_name":"Bigard","twitter_username":"MathieuBigard","portfolio_url":null,"bio":"Des histoires à raconter.\r\n\r\nhttps://www.instagram.com/mathieubigard/?hl=fr","location":"France","links":{"self":"https://api.unsplash.com/users/mathieubigard","html":"https://unsplash.com/@mathieubigard","photos":"https://api.unsplash.com/users/mathieubigard/photos","likes":"https://api.unsplash.com/users/mathieubigard/likes","portfolio":"https://api.unsplash.com/users/mathieubigard/portfolio","following":"https://api.unsplash.com/users/mathieubigard/following","followers":"https://api.unsplash.com/users/mathieubigard/followers"},"profile_image":{"small":"https://images.unsplash.com/profile-1556787943128-0b68752ddd13?ixlib=rb-1.2.1\u0026q=80\u0026fm=jpg\u0026crop=faces\u0026cs=tinysrgb\u0026fit=crop\u0026h=32\u0026w=32","medium":"https://images.unsplash.com/profile-1556787943128-0b68752ddd13?ixlib=rb-1.2.1\u0026q=80\u0026fm=jpg\u0026crop=faces\u0026cs=tinysrgb\u0026fit=crop\u0026h=64\u0026w=64","large":"https://images.unsplash.com/profile-1556787943128-0b68752ddd13?ixlib=rb-1.2.1\u0026q=80\u0026fm=jpg\u0026crop=faces\u0026cs=tinysrgb\u0026fit=crop\u0026h=128\u0026w=128"},"instagram_username":"mathieu.bigard","total_collections":0,"total_likes":3,"total_photos":76,"accepted_tos":true},"exif":{"make":"SONY","model":"ILCE-7RM2","exposure_time":"1/500","aperture":"11","focal_length":"16.0","iso":200},"location":{"title":null,"name":null,"city":null,"country":null,"position":{"latitude":null,"longitude":null}},"views":219299,"downloads":1304}];
//let responsePhotoArray = [];

// Unsplash API 
const count =5;
const apiKey = `jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek`;
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;


// counter for loaded images 

let imageLoaded =0;
let totalImages = 0;
let ready = false;

// get Photos from API
async function loadDatafromAPIandAddInWebPage() {

    try{
    const response = await fetch(apiUrl);
    const data = await response.json(); 
    totalImages += data.length;
    // create Elements <a> ,  <img> and put inside image container
    data.forEach((photo) => {
       const item = createElementAndSetAttributes('a',{
            href:photo.links.html,
            target:'_blank'
        });
      const img =  createElementAndSetAttributes('img',{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description
        });

        // check if load is cmpleted 
        img.addEventListener('load',imageLoader);

        // put <img> inside <a> and thhen <a> inside <imageContainer>
        item.appendChild(img);
        imageContainer.appendChild(item);
        
    });

    }catch(error){
        loader.hidden = false;
        console.log('UnsPlash API has some issue',error);
    }
 }

// check if image loaded 
function imageLoader (){
    console.log('image Loaded' ,imageLoaded);
    console.log('Total image Loaded' ,totalImages);

    if(imageLoaded < 1 ){
        loader.hidden = false;
    }else {
        loader.hidden = true;
    }

    // const item = createElementAndSetAttributes('a',{
    //     href:'',
    //     target:'_blank',
    //     id : 'customLoding'
    // });
    // const img =  createElementAndSetAttributes('img',{
    //     src: 'resources/svg/loader.svg',
    //     alt:'Loading...',
    //     title:'Loading...'
    // });

    // item.appendChild(img);
    // imageContainer.appendChild(item);

    imageLoaded++;
    if(imageLoaded === totalImages){
        ready = true;
        loader.hidden=true;
        count = 25;
        apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
 
    }
}

// helper function for creating element and setting Attribute
function createElementAndSetAttributes(tag, attributes){
    const element = document.createElement(tag);
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
    return element;
}


// check to see if we are at the end of laded images
window.addEventListener('scroll',()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight -1000&&ready){
        console.log('Load More photos');
        loadDatafromAPIandAddInWebPage();
        ready = false;
    }
});


// onLoad 
loadDatafromAPIandAddInWebPage();
