function displayCookies(cookies) {
    const cookiesContainer = document.querySelector('#cookies');
    cookiesContainer.innerHTML = '';

    for(cookie of cookies) {
        const authElem = document.createElement('p');
        authElem.innerHTML = cookie.auth;
        const valueElem = document.createElement('p');
        valueElem.innerHTML = cookie.value;
        cookiesContainer.append(authElem);
        cookiesContainer.append(valueElem);
    }
}

async function getCookies() {
    const url = 'http://localhost:9000/api/cookies/get';

    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();

    displayCookies(data);
}



async function postCookie(cookie) {
    const url = `http://localhost:9000/api/cookies/add?auth=${cookie[0]}&value=${cookie[1]}`;

    const response = await fetch(url, { method: 'POST' });
    const data = await response.json();
    
    getCookies();
}


function getCookie() {
    const cookie = window.location.search.replace('/?', '').replace('?', '').split('=');

    postCookie(cookie);
};

getCookie();