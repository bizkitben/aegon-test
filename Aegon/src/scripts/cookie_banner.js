var dropCookie = true;                      // false disables the Cookie, allowing you to style the banner
var cookieDuration = 14;                    // Number of days before the cookie expires, and the banner reappears
var cookieName = 'complianceCookie';        // Name of our cookie
var cookieValue = 'on';                     // Value of cookie

function createDiv() {
    var headertag = document.getElementsByTagName('header')[0];
    var div = document.createElement('div');
    div.setAttribute('id', 'cookie-law');
    div.setAttribute('class', 'row justify-content-between alert alert-info cookie-banner');
    div.setAttribute('role', 'alert');
    //div.innerHTML = '<p>Our website uses cookies. By continuing we assume your permission to deploy cookies, as detailed in our <a href="/privacy-cookies-policy/" rel="nofollow" title="Privacy &amp; Cookies Policy">privacy and cookies policy</a>. <a class="close-cookie-banner" href="javascript:void(0);" onclick="removeMe();"><span>X</span></a></p>';
    div.innerHTML = "<div class='col'>Cookies are used to make this site simpler. <a href='#' rel='nofollow' title='Find out more about our cookie policy'>Find out more</a></div><div class='col text-right'><a href='javascript:void(0);' onclick='removeCookieBanner();'>Close (Esc) <img src='images/close.svg' alt='Close the cookie banner' /></a></div>";
    // Be advised the Close Banner 'X' link requires jQuery

    // headertag.appendChild(div); // Adds the Cookie Law Banner just before the closing </header> tag
    // or
    headertag.insertBefore(div, headertag.firstChild); // Adds the Cookie Law Banner just after the opening <header> tag

    document.getElementsByTagName('header')[0].className += ' cookiebanner'; //Adds a class tothe <header> tag when the banner is visible

    createCookie(window.cookieName, window.cookieValue, window.cookieDuration); // Create the cookie
}


function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    if (window.dropCookie) {
        document.cookie = name + "=" + value + expires + "; path=/";
    }
}

function checkCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

window.onload = function () {
    if (checkCookie(window.cookieName) != window.cookieValue) {
        createDiv();
    }
}

function removeCookieBanner() {
    var element = document.getElementById('cookie-law');
    element.parentNode.removeChild(element);
}