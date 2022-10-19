'use strict';

//linking articles HTML

const optArticleSelector = '.post',
      optTitleSelector = '.post-title',
      optTitleListSelector = '.titles',
      optArticleTagsSelector = '.post-tags .list',
      optArticleAuthorSelector = '.post-author',
      optAuthorLink = '.authors',
      optAuthorListSelector = '.authors-list',
      optTagsListSelector = '.tags-list',
      optCloudClassCount = 5,
      optCloudClassPrefix = 'tag-size-';
      
      
      const templates = {
        articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML), 
        tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
        tagCloud: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
        authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
        authorsLink: Handlebars.compile(document.querySelector('#template-authors-link').innerHTML)
      }

     
      function generateTitleLinks(customSelector = ''){

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let html = '';

    for(let article of articles){   
    const articleId = article.getAttribute('id');

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTML = templates.articleLink({articleId:articleId, articleTitle:articleTitle});

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

function calculateTagClass(count, params){
  
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( ( (count - params.min) / (params.max - params.min) ) * optCloudClassCount + 1 );
  const calculatedClass = optCloudClassPrefix + classNumber;
  return calculatedClass;
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

      const linkHTML = templates.tagLink({tag:tag});
      html = html + linkHTML;

      if(!allTags.hasOwnProperty(tag, linkHTML)){
        allTags[tag]= 1;
      } else{
        allTags[tag]++;
      };
    };
  
    tagsWrapper.innerHTML = html;
    
  };
  const tagList = document.querySelector(optTagsListSelector);
  const tagsParams = calculateTagsParams(allTags);

  let allTagsHTML = '';
  const allTagsData = {tags: []};
    for (let tag in allTags){
      allTagsData.tags.push({
        tag: tag,
        className: calculateTagClass(allTags[tag], tagsParams)
      });
    };
    tagList.innerHTML = templates.tagCloud(allTagsData);
};

function calculateTagsParams(allTags){
  const params = {
    'max': 10,
    'min': 2,
  };

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

  event.preventDefault();
  console.log('tag was clicked');
  const clickedElement = this;

  const href = clickedElement.getAttribute('href');
  console.log(href);
  const tag = href.replace('#tag-', '');

  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  for(let activeTag of activeTags){
    activeTag.classList.remove('active');
};
    const allTagLinks = document.querySelectorAll(href);
    console.log(allTagLinks);

for(let eachTag of allTagLinks){
  eachTag.classList.add('active');
  console.log(eachTag);
  };
 
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  const links = document.querySelectorAll('a[href^="#tag-"]');

  for(let link of links){
    link.addEventListener('click', tagClickHandler);
  };
};

addClickListenersToTags();

//------------------------------------------------------------------------
//Generating authors

function generateAuthors(){
  const allAuthors = {};
  const articles = document.querySelectorAll(optArticleSelector); 
  const authorListWrapper = document.querySelector(optAuthorListSelector);

  for( let article of articles){
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    const authorTaken = article.getAttribute('data-author');
    const authorLinkHTML = templates.authorLink({author:authorTaken});
    console.log(authorLinkHTML)
    let html = ' ';
    html = html + authorLinkHTML;
    
    if(!allAuthors.hasOwnProperty(authorTaken)){
      allAuthors[authorTaken]= 1;
    } else{
      allAuthors[authorTaken]++;
    };
    
    authorWrapper.innerHTML = html;
  };
  
  let allAuthorsHTML = '';
  const allAuthorsData = {authors: []};

  for (let author in allAuthors){
    allAuthorsData.authors.push({
      author: author,
    });
  
  };
  authorListWrapper.innerHTML = templates.authorsLink(allAuthorsData);
console.log(allAuthors);
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
  
  const links = document.querySelectorAll('.post-author a ,.author-link a');

  for(let link of links){
    link.addEventListener('click', authorClickHandler);
  };

};

addClickListenersToAuthors();
//---------------------------------------------------------------------
//generate TagList



