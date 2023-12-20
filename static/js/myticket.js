



function diffTime(dateString) {
    const dateObject = new Date(dateString);
    const currentTime = new Date();

    const timeDifference = currentTime - dateObject; 
    const timeInMinutes = timeDifference / (1000 * 60);

    if (timeInMinutes < 60) {
        return `${Math.floor(timeInMinutes)} minute${Math.floor(timeInMinutes) !== 1 ? 's' : ''}`;
    } else {
        const hours = Math.floor(timeInMinutes / 60);
        const remainingMinutes = Math.floor(timeInMinutes % 60);
        const hoursText = hours > 1 ? 'hours' : 'hour';
        const minutesText = remainingMinutes > 0
            ? `${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}`
            : '';

        return `${hours} ${hoursText}${minutesText ? ` and ${minutesText}` : ''}`;
    }
}





const requestOptions = {
    method: 'GET',
    headers: {
        'Authorization': token, 
        'Content-Type': 'application/json'
    }
  }
  
async function getResponse() {
    const response = await fetch(`${apiurl}` + 'Main/myTicket/'+ `${id}` ,requestOptions);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    return data;
}
let tickets = [];
async function fetchData() {
    try {
        const data = await getResponse();
        tickets = data;
        
        const ticketContainer = document.getElementById("ticketContainer");
        ticketContainer.innerHTML = "";
        const ticketItem = tickets.map((ticket) => {
           let tags = ticket.tags.split(',');
           
           let assignedUserImg = ticket.assignedUserImg.split(',');
          
            return (
                `
                <div class="col-sm-6 col-lg-5 mb-4">
                    <div class="card">
                      <div class="card-body">
                        <div class="d-flex  align-items-center">
                            <div class="avatar-online">
                                <img src="${imgStore}${ticket.creatorImg}" alt class="w-px-40 h-auto rounded-circle" />
                               
                            </div>
                            <div class="d-flex upd-del-Btn" >
                                <button
                                type="button"
                                class="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#smallModal"
                                onclick="insertDataModal(${ticket.tickeId}, '${ticket.ticketTitle}');"
                                style="background-color: transparent;width: 20px;"
                                >
                                    <i class='bx bxs-dashboard' ></i>
                                </button>
                                <button
                                type="button"
                                class="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#deletModal"
                                onclick="insertDataModal2(${ticket.tickeId});"
                                style="background-color: transparent;width: 20px;"
                                >
                                <i class='bx bx-trash-alt' ></i>
                                </button>

                            </div>
                            
                            <h5 class="card-title mt-4 p-2" onclick="navigateTo('${ticket.tickeId}')" style="cursor: pointer;" >${ticket.ticketTitle}</h5>
                            
                            
                        </div>
                        <p class="card-text">
                        ${ticket.ticketDesc}
                        </p>
                        <div class="d-flex ">
                            ${
                                tags.map((tag)=>{
                                    return`
                                    <span class="badge bg-label-dark ms-2">${tag}</span>
                                    `
                                }).join('')
                            }
                            
                        </div>
                        <div class="d-flex justify-content-between">
                            <div class="align-items-bottom">
                                <p class="card-text mt-2"><small class="text-muted">${diffTime(ticket.ticketCreatedAt)}</small></p>
                            </div>
                            <div class="d-flex align-items-center gap-2">
                            <div class="avatar-online">
                            ${
                                assignedUserImg.map((img)=>{
                                    return `
                                    <img src="${imgStore}${img}" alt="" class="w-px-30 h-auto rounded-circle" />
                                    `
                                }).join('')
                            }
                            </div>
                            </div>
                        </div>
                      </div>
                    </div>
                    
                    </div>
                
                `
            )   
        })
        if(tickets.length === 0) {
            let nodata = document.createElement("h2");
            nodata.textContent = "You have no tickets";
            nodata.classList.add("text-dark"); 
            ticketContainer.appendChild(nodata);
            
            
        }else{
            ticketContainer.innerHTML= ticketItem;
        }
        
       
    } catch (error) {
        console.error('Error:', error);
    }
}



function insertDataModal(tickeId,title){
    const ticketName =document.getElementById("title");
    ticketName.innerHTML = title;
    var status = document.getElementById("status").value;
    
    let saveBtn = document.getElementById("saveBtn");
    
    saveBtn.addEventListener('click' ,(event)=>{
        event.preventDefault();
        let smallModal = document.getElementById("smallModal");
        let fade = document.querySelector(".modal-backdrop");
        fade.style.display = "none";
        smallModal.style.display = 'none';

        updateTicket(status , tickeId);
    });
    
}

function insertDataModal2(tickeId){
    let saveBtn = document.getElementById("deleteSaveBtn");
   
    saveBtn.addEventListener('click' ,(event)=>{
        event.preventDefault();
        let smallModal = document.getElementById("deletModal");
        let fade = document.querySelector(".modal-backdrop ");
        fade.style.display = "none";
        smallModal.style.display = 'none';

        deleteTicket(tickeId);
        
    });
}

function updateTicket(status , tickeId){
    
    fetch(`${apiurl}` + 'Main/editTicketStatus/'+ `${status}`+ '/' +`${tickeId}`,{
        method: 'PUT',
        headers: {
            'Authorization': token, 
            'Content-Type': 'application/json'
        }
    })
    .then(response =>{
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return response.json();
    })
    .then(data => {
    console.log(data);
        if(data.message){
        
        // let closeBtn = document.getElementById("close");
        // closeBtn.addEventListener('click', function() {
        //     let model =document.getElementById('smallModal');
        //     model.setAttribute("aria-hidden",false);
        //   });
       
        
        let alert = document.getElementById("alert1");
        alert.textContent = "Updated successfully" ;
        alert.classList.add('show');
        setTimeout(() => {
            alert.classList.remove('show');
        }, 4000);
        console.log('Response:', data);
        }

        
        
    })
    .catch(error => {
        console.log("Error fetching status options:"+ error);
        
    });
}

function deleteTicket(ticketId){
    fetch(`${apiurl}` + 'Main/deleteTicket/'+`${ticketId}`,{
        method: 'DELETE',
        headers: {
            'Authorization': token, 
            'Content-Type': 'application/json'
        }
    })
    .then(response =>{
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return response.json();
    })
    .then(data => {
    console.log(data);
        if(data.message){
        
        let alert = document.getElementById("alert2");
        alert.textContent = "Deleted successfully" ;
        alert.classList.add('show');
        setTimeout(() => {
            alert.classList.remove('show');
        }, 4000);
        fetchData();
        
        }

        
        
    })
    .catch(error => {
        console.log("Error fetching status options:"+ error);
        
    });
}

fetchData();