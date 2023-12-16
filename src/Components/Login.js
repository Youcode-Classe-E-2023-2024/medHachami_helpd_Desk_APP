import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params){
        super(params);
        this.setTitle('Login');
    }

    async getHtml(){
        return(
            `
            <section class="ftco-section">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-6 col-lg-4">
                            <div class="login-wrap py-5">
                          <h3 class="text-center mb-0">Welcome</h3>
                          <p class="text-center m-2">To Help Desk App</p>
                          <span class="text-danger  p-1 mb-10" id="input_error" ></span>

                          <form action="#" class="login-form">
                              <div class="form-group ">
                                  <div class="icon d-flex align-items-center justify-content-center"><span class="fa fa-user"></span></div>
                                  <input type="text" id="email" class="form-control" placeholder="Email" required>
                              </div>
                            <div class="form-group ">
                                <div class="icon d-flex align-items-center justify-content-center"><span class="fa fa-lock"></span></div>
                            <input type="password" id="password" class="form-control" placeholder="Password" required>
                            </div>
                            
                            
                            
                            <div class="form-group mt-4">
                                <button type="submit" onclick="login()" id="loginBtn" class="btn form-control btn-primary rounded submit px-3">Sign In</button>
                            </div>
                            </form>
                            <div class="w-100 text-center mt-4 text">
                                <p class="mb-0">Don't have an account?</p>
                                <a href="/register" class="text-decoration-none link" data-link >Sign Up</a>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </section>
        `
        )
        
    }

}

