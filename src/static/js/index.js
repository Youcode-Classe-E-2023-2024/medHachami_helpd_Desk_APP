import Dashboard from "../../Components/Dashboard.js";
import Posts from "../../Components/Posts.js";
import PostView from "../../Components/PostView.js";
import Login from "../../Components/Login.js";
import Register from "../../Components/Register.js";
function removeTrailingSlash(url) {
    
    if (url.charAt(url.length - 1) === '/') {
       
        return url.slice(0, -1);
    }
    
    return url;
}
const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = target => {
    console.log(target);
    if (!target.result || !Array.isArray(target.result)) {
        console.error("Invalid target", target.result);
        return {};
    }
    // const cleandeUrl = removeTrailingSlash();
    const values = target.result.slice(1);
    console.log('values ' +values);
    
    const keys = Array.from(target.route.path.matchAll(/:(\w+)/g)).map(result => removeTrailingSlash(result[1]));
    console.log('keys ' +keys);
    // Ensure the lengths match to avoid array index out of bounds
    if (keys.length !== values.length) {
        console.error("Mismatched keys and values:", keys, values);
        return {};
    }

    return Object.fromEntries(keys.map((key, i) => {
        return [key, decodeURIComponent(values[i])]; // decodeURIComponent to handle slashes
    }));
};



//Go to destination without refreshing 
const NavigateTo = (url) => {
    history.pushState(null , null , url);
    router();
}

//Router 
const router = async () =>{
    const routes = [
        // { path: '/Dashboard' , view : Dashboard},
        { path: '/login' , view : Login},
        { path: '/register' , view : Register},
        // { path: '/posts/:id' ,   view: PostView },
        

    ];

    //Test each route
    const routeExists = routes.map(route =>{
        return {
            route: route,
            result : location.pathname.match(pathToRegex(route.path))
        }
    })

    let target = routeExists.find((routeExist)=>routeExist.result !== null);

    //Not found 
    if(!target){
        target = {
            route : routes[0],
            isMatch:true,
        }
    }
    // const params = getParams(target);
    // console.log(params);
    // const view = target.route.view(params);
    const view = new target.route.view(getParams(target));
    document.querySelector("#app").innerHTML = await view.getHtml();
    
};

window.addEventListener('popstate' , router);

document.addEventListener('DOMContentLoaded', () =>{
    document.body.addEventListener('click', (ev) =>{
        ev.preventDefault();
        if(ev.target.matches("[data-link]")){
            NavigateTo(ev.target.href);
        }
    })
    router();
});

