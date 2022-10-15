'use strict';

//linking articles HTML

const optArticleSelector = '.post',
      optTitleSelector = '.post-title',
      optTitleListSelector = '.titles',
      optArticleTagsSelector = '.post-tags .list',
      optArticleAuthorSelector = '.post-author',
      optAuthorLink = '.authors',
      optTagsListSelector = '.tags-list',
      optCloudClassCount = 5,
      optCloudClassPrefix = 'tag-size-';

     
      function generateTitleLinks(customSelector = ''){

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let html = '';

    for(let article of articles){   
    const articleId = article.getAttribute('id');

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      titleList.innerHTML = titleList.innerHTML + linkHTML;
      html = html + linkHTML;
  };

  titleList.innerHTML = html;
};

generateTitleLinks();

//-----------------------------------------------------------//
//Switching articles

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;

  const activeLinks = document.querySelectorAll('.titles a.active');

for(let activeLink of activeLinks){
activeLink.classList.remove('active');
};

  clickedElement.classList.add('active');

  const activeArticles = document.querySelectorAll('.posts .active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  };

  const takenAttribute = clickedElement.getAttribute('href');
  const targetArticle = document.querySelector(takenAttribute);

  targetArticle.classList.add('active');
};

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
};

//-----------------------------------------------------------
//Linking tags HTML

function calculateTagsClass(count, params){
  
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( ( (count - params.min) / (params.max - params.min) ) * optCloudClassCount + 1 );
  const calculatedClass = optCloudClassPrefix + classNumber;
  return calculatedClass;
  console.log(calculatedClass);
};

function generateTags(){
  let allTags = {};
  const articles = document.querySelectorAll(optArticleSelector);

  for(let article of articles){

    const tagsWrapper = article.querySelector(optArticleTagsSelector);

    let html = '';
 
    const tagTaken = article.getAttribute('data-tags');
    const tagSplited = tagTaken.split(' ');
    
    for(let tag of tagSplited){

      const linkHTML = '<li><a href="#tag-' + tag + '"> '+ tag +' </a></li> ';
      html = html + linkHTML;

      if(!allTags.hasOwnProperty(tag, linkHTML)){
        
        allTags[tag]= 1;
      } else{
        allTags[tag]++;
      };
      
    };
  
    tagsWrapper.innerHTML = html;
    
  };
  console.log(allTags);
  const tagList = document.querySelector(optTagsListSelector);
  console.log(tagList);

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);

  let allTagsHTML = '';
    for (let tag in allTags){
      const tagLinkHTML = '<li><a href="#tag-' + tag + '"'+ 'class ="' + calculateTagsClass(allTags[tag], tagsParams) +'"> '+ tag +' </a></li> ';
      allTagsHTML += tagLinkHTML;
      console.log(tagLinkHTML);
    
    };
    tagList.innerHTML = allTagsHTML;
};

function calculateTagsParams(allTags){

  const params = {
    'max': 10,
    'min': 2,
  };
  console.log(params);

  for(let tag in allTags){
    
    if(allTags[tag] > params.max){
      params.max = allTags[tag];
    };

    if(allTags[tag] < params.min){
      params.min = allTags[tag];
    };
  };
  
  return params;
 
};



generateTags();

//----------------------------------------------------
// Tag clickHandler (somehow unable to make clicked tag active)

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  console.log('tag was clicked');
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for(let activeTag of activeTags){
    activeTag.classList.remove('active');
  /* remove class active */
};
  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
    const allTagLinks = document.querySelectorAll(href);
    console.log(allTagLinks);
  /* START LOOP: for each found tag link */
for(let eachTag of allTagLinks){
  eachTag.classList.add('active');
  console.log(eachTag);

    /* add class active */
  };
  /* END LOOP: for each found tag link */
  generateTitleLinks('[data-tags~="' + tag + '"]');
  /* execute function "generateTitleLinks" with article selector as argument */
}

function addClickListenersToTags(){
  /* find all links to tags */
  const links = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */
  for(let link of links){
    link.addEventListener('click', tagClickHandler);
  };
    /* add tagClickHandler as event listener for that link */

  /* END LOOP: for each link */
};

addClickListenersToTags();

//------------------------------------------------------------------------
//Generating authors

function generateAuthors(){

  const articles = document.querySelectorAll(optArticleSelector); 

  for( let article of articles){
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    const authorTaken = article.getAttribute('data-author');

  
    let html = '';
    const linkHTML = 'by <a href="#' + authorTaken + '">' + authorTaken + '</a>';
    html = html + linkHTML;
  
    authorWrapper.innerHTML = html;
  };

};

generateAuthors();

//----------------------------------------------------------------------------
//authorClickHandler


function authorClickHandler(event){
  event.preventDefault();
  
  console.log('author was clicked');
  const clickedElement = this;
  console.log(clickedElement);

  const href = clickedElement.getAttribute('href');
  console.log(href);
  
  const author = href.replace('#', '');
  console.log(author);
  
  generateTitleLinks('[data-author="' + author + '"]');
};


function addClickListenersToAuthors(){
  
  const links = document.querySelectorAll('.post-author a');

  for(let link of links){
    link.addEventListener('click', authorClickHandler);
  };

};

addClickListenersToAuthors();
//---------------------------------------------------------------------
//generate TagList



