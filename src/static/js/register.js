

const apiUrl = "http://localhost/med_Hachami_HelpDesk_Ticketing_Sys/";




document.addEventListener('DOMContentLoaded', () =>{
    
    const submitBtn = document.getElementById("submitBtn");
    const myForm = document.getElementById("registerForm");
    submitBtn.addEventListener('click', () =>{
    let email = document.getElementById("email").value;
    let full_Name = document.getElementById("full_Name").value;
    let password = document.getElementById("password").value;
    let confirm_password = document.getElementById("confirm_password").value;

    let email_error =  document.getElementById("email_error");
    let full_Name_error = document.getElementById("full_Name_error");
    let password_error = document.getElementById("password_error");
    let confirm_password_error = document.getElementById("pass_confirm_eror");


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const validEmail = emailRegex.test(email);
        

        if(!email || !validEmail){
            email_error.textContent = "*Please enter a valid email";
        }

        if(!full_Name){
            full_Name_error.textContent = "*Please enter a name";
        }

        if(password.length <6){
            password_error.textContent = "*Password must be at least 6 characters";
        }
        if(password !== confirm_password){
            confirm_password_error.textContent = "*Password does not match";
        }
        
        
        if(email_error ==='' && full_Name_error === '' && password_error ==='' && confirm_password_error ===''){
            const data = {
                "email": email,
                "full_name": full_Name,
                "password": password
                
            }
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    
                },
                body: JSON.stringify(data),
            };
            

            fetch(`${apiUrl}` + 'Users/register',requestOptions)
            .then(response => {
                // Check if the request was successful (status code in the range 200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                // Parse the JSON response
                return response.json();
            })
            .then(data => {
                if(data.message_1){
                    let alert = document.getElementById("alert1");
                    alert.textContent = data.message_1;
                    alert.style.display = "block";
                    setTimeout(() => {
                        alert.style.display = 'none';
                    }, 4000);
                    console.log('Response:', data);
                }else{
                    let alert = document.getElementById("alert2");
                    alert.textContent = data.message_2;
                    alert.style.display = "block";
                    setTimeout(() => {
                        alert.style.display = 'none';
                    }, 4000);
                    console.log('Response:', data);
                }
                
                
            })
            .catch(error => {
                // Handle errors
                console.log('Error:'+ error.message);
            });
        //     alert(data);
        }


        const loginBtn = document.getElementById("loginBtn");
    
        loginBtn.addEventListener('click', () =>{
            let email = document.getElementById("email").value;
            let password = document.getElementById("pwd").value;

            console.log(email , password);


        });


        

        

    
    });

    

});