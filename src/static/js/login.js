const apiurl = "http://localhost/med_Hachami_HelpDesk_Ticketing_Sys/";

function login(){
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let input_error =  document.getElementById("input_error");
    
    
    input_error.textContent = '';
    

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmail = emailRegex.test(email);

    if(!email || !validEmail){
        input_error.textContent = "*Credentials not valid ! try again";
    }
    if(password.length <6){
        input_error.textContent = "*Credentials not valid ! try again";    }

    if(input_error.textContent ===''){
        const data = {
            "email": email,
            "password": password
            
        }
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                
            },
            body: JSON.stringify(data),
        };

        fetch(`${apiurl}` + 'Users/login',requestOptions)
            .then(response => {
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                
                return response.json();
            })
            .then(data => {
                    if(data.token){
                        localStorage.setItem('token', data.token);
                        window.location.href = '/';
                    }else{
                        input_error.textContent = "*Credentials not valid ! try again"; 
                    }
            })
            .catch(error => {
              
                console.log('Error:'+ error.message);
            });
    }

    console.log(email + " " + password);
}   