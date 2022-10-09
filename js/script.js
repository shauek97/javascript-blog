'use strict';

//linking HTML

const optArticleSelector = '.post',
      optTitleSelector = '.post-title',
      optTitleListSelector = '.titles',
      optArticleTagsSelector = '.post-tags .list';
     
      function generateTitleLinks(){

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    console.log(titleList);

    const articles = document.querySelectorAll(optArticleSelector);

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
  console.log('Link was clicked!');
  event.preventDefault();
  const clickedElement = this;

  const activeLinks = document.querySelectorAll('.titles a.active');

for(let activeLink of activeLinks){
activeLink.classList.remove('active');
};

console.log('clicked element', clickedElement);

  clickedElement.classList.add('active');

  const activeArticles = document.querySelectorAll('.posts .active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  };

  const takenAttribute = clickedElement.getAttribute('href');
  console.log(takenAttribute);
  
  const targetArticle = document.querySelector(takenAttribute);
  console.log(targetArticle);

  targetArticle.classList.add('active');
  
};

const links = document.querySelectorAll('.titles a');
console.log(links);

for(let link of links){
  link.addEventListener('click', titleClickHandler);
};

//-----------------------------------------------------------

//Tags



function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  console.log(articles);
  for(let article of articles){

    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    console.log(tagsWrapper);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const tagTaken = article.getAttribute('data-tags');
    console.log(tagTaken);
    /* split tags into array */
    const tagSplited = tagTaken.split(' ');
    console.log(tagSplited);

    /* START LOOP: for each tag */
    for(let tag of tagSplited){
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#' + tag + '"> '+ tag +' </a></li> ';
      console.log(linkHTML);

      /* add generated code to html variable */
      html = html + linkHTML;
      console.log(html)
    };
    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
  };/* END LOOP: for every article: */
}

generateTags();