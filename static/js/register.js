// console.log('register');


const apiUrl = "http://localhost/med_Hachami_HelpDesk_Ticketing_Sys/";




function register(ev){
    ev.preventDefault();
    console.log('clickeMe');
    let email = document.getElementById("email").value;
    let full_Name = document.getElementById("full_Name").value;
    let password = document.getElementById("password").value;
    let confirm_password = document.getElementById("confirm_password").value;

    let email_error =  document.getElementById("email_error");
    let full_Name_error = document.getElementById("full_Name_error");
    let password_error = document.getElementById("password_error");
    let confirm_password_error = document.getElementById("pass_confirm_eror");


    email_error.textContent = '';
    full_Name_error.textContent = '';
    password_error.textContent = '';
    confirm_password_error.textContent = '';


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

        
        
        if(email_error.textContent === '' && full_Name_error.textContent === '' && password_error.textContent === '' && confirm_password_error.textContent === ''){
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
            
            console.log(data);

            fetch(`${apiUrl}` + 'Users/register',requestOptions)
            .then(response => {
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                
                return response.json();
            })
            .then(data => {
                if(data.message_1){
                    let alert = document.getElementById("alert1");
                    alert.textContent = data.message_1;
                    alert.classList.add('show');
                    setTimeout(() => {
                        alert.classList.remove('show');
                    }, 4000);
                    console.log('Response:', data);
                }else{
                    let alert = document.getElementById("alert2");
                    alert.textContent = data.message_2;
                    alert.classList.add('show');
                    
                    setTimeout(() => {
                        alert.classList.remove('show');
                    }, 4000);
                     email.value = ''
                     full_Name.value ='';
                     password.value = ''
                     confirm_password.value =''
                    console.log('Response:', data);
                }
                
                
            })
            .catch(error => {
                // Handle errors
                console.log('Error:'+ error.message);
            });
        //     alert(data);
        }
}
