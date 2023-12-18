function hasToken() {
    const token = localStorage.getItem('token');
    return token !== null && token !== undefined;
}
function isTokenExpired() {
    const token = localStorage.getItem('token');
    const decodedToken = decodeJWT(token);

    return decodedToken && decodedToken.exp && decodedToken.exp * 1000 < Date.now();
}


function redirectToLogin() {
    window.location.href = 'login.html';
}


if (!hasToken() || isTokenExpired()) {
    redirectToLogin();
}

function logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('fullName');
    localStorage.removeItem('email');
    localStorage.removeItem('image');
    window.location.href = '/login.html';
}

function decodeJWT(token) {
    
    const [header, payload, signature] = token.split('.');
    const decodedPayload = JSON.parse(atob(payload));
  
    
    return decodedPayload;
}