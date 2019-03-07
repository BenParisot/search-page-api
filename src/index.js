import loadArticles from './make-article-list.js';
import updateSearchTerm from './search-component.js';
import { queryToObject } from './hash-query.js';
import { makeSearchArticlesURL } from './make-search-api-url.js';
import { updatePaging } from './pagination-component.js';
import './pagination-component.js';
import { mailPage } from './mail-to-friend-component.js';
import './sort-component.js';

updateSearchTerm();

window.addEventListener('hashchange', () => {
    const query = window.location.hash.slice(1);
    const queryOptions = queryToObject(query);
    const URL = makeSearchArticlesURL(queryOptions);
    console.log('url', URL);
    console.log('query options', queryOptions);
    fetch(URL)
        .then(response => response.json())
        .then(response => {
            loadArticles(response.articles);
            updatePaging(queryOptions.page, response.totalResults);
        });
});

mailPage();