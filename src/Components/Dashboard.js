import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params){
        super(params);
        this.setTitle('Dashboard');
    }

    async getHtml(){
        return(
            `
        <div class="text-red-950">
            <h1>Dashboard</h1>
        
        </div>
        `
        )
        
    }

}