'use strict';

function titleClickHandler(event){
    console.log('Link was clicked!');
    event.preventDefault();
    const clickedElement = this;
  
    const activeLinks = document.querySelectorAll('.titles a.active');

for(let activeLink of activeLinks){
  activeLink.classList.remove('active');
}

    /* add class 'active' to the clicked link */
    console.log('clicked element', clickedElement);

    clickedElement.classList.add('active');
  
    /* remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts .active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active')
    }
  
    /* get 'href' attribute from the clicked link */

    const takenAttribute = clickedElement.getAttribute('href')
    console.log(takenAttribute)
    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(takenAttribute)
    console.log(targetArticle)
    /* add class 'active' to the correct article */
    targetArticle.classList.add('active')
    
  }
  
  const links = document.querySelectorAll('.titles a');
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }