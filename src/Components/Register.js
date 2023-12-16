import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
     constructor(params) {
        super(params);
       

        this.setTitle('Register');
    }

    
     
    async getHtml(){

        
        
        
             
        return(
            `
            <div class="alert alert-danger" id="alert1"></div>
            <div class="alert alert-success" id="alert2"></div>
            <section class="vh-100 login">
                <div class="container py-5 h-100">
                  <div class="row d-flex align-items-center justify-content-center h-100">
                    <div class="d-flex flex-column justify-content-center col-lg-7 col-xl-6">
                        <h1 class="text-center register-title">HELP DESK </h1>
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                        class="img-fluid" alt="Phone image">
                    </div>
                    <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                      <form id="registerForm" onsubmit="submitted()" >
                        <!-- Email input -->
                        <div class="form-outline mb-2">
                            <span class="text-danger  p-1 mb-10" id="email_error" ></span>
                          <input type="email" id="email" class="form-control form-control-lg mt-2"  />
                          <label class="form-label" for="form1Example13">Email address</label>
                        </div>
                        <div class="form-outline mb-2">
                            <span class="text-danger  p-1 mb-10" id="full_Name_error" ></span>
                            <input type="text" id="full_Name" class="form-control form-control-lg" />
                            <label class="form-label" for="form1Example13">Full Name</label>
                        </div>
                        
              
                        <!-- Password input -->
                        <div class="form-outline mb-2">
                            <span class="text-danger  p-1 mb-10" id="password_error" ></span>
                          <input type="password" id="password" class="form-control form-control-lg" />
                          <label class="form-label" for="form1Example23">Password</label>
                        </div>
                        <div class="form-outline mb-2">
                            <span class="text-danger  p-1 mb-10" id="pass_confirm_eror" > </span>  
                            <input type="password" id="confirm_password" class="form-control form-control-lg" />
                            <label class="form-label" for="form1Example23">Confirm Password</label>
                          </div>
              
                        <div class="d-flex justify-content-around align-items-center mb-4">
                          <!-- Checkbox -->
                          <div class="d-flex justify-content-between ">
                            <label class="form-check-label p-2" for="form1Example3"> Already have account </label>
                            <a href="/login" data-link class="text-decoration-none text-white p-2" >Login</a>
                          </div>
                          
                        </div>
              
                        <!-- Submit button -->
                        <button type="submit" onclick="register()" id="submitBtn" class="btn btn-primary btn-lg btn-block">Sign in</button>
                        
              
                        
              
                      </form>
                    </div>
                  </div>
                </div>
              </section> 
              
              
        
        `
        )
        
    }

}

