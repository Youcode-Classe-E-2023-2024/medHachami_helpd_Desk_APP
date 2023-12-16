import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params){
        super(params);
        this.setTitle('Dashboard');
        const token = localStorage.getItem('token');
        if(!token){
            window.location.href = '/login';
        }

    }

    async getHtml(){
        return(
            `
        <div >
            <h1 >Dashboard</h1>
        
        </div>
        `
        )
        
    }

}