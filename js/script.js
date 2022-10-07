'use strict';

//linking HTML function 

const optArticleSelector = '.post',
      optTitleSelector = '.post-title',
      optTitleListSelector = '.titles';


      function generateTitleLinks(){

    /* remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    console.log(titleList);

    /* for each article */

    const articles = document.querySelectorAll(optArticleSelector);

    let html = '';

    for(let article of articles){
      
       /* get the article id */

      const articleId = article.getAttribute('id');
      
    /* find the title element */
    
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log(articleTitle);

    /* get the title from the title element */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    console.log(linkHTML);

    /* create HTML of the link */

      titleList.innerHTML = titleList.innerHTML + linkHTML;

    /* insert link into titleList */

    html = html + linkHTML;

    console.log(html);
  };

  titleList.innerHTML = html;

};

generateTitleLinks();

//-----------------------------------------------------------//

//switching articles function 

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
console.log(links)

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}