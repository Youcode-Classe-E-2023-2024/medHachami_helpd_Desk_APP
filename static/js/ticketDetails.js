const urlParams = new URLSearchParams(window.location.search);
const ticketId = urlParams.get('ticketId');
let displayData=false;
let ticket = [];



async function getResponse() {
    const response = await fetch(`${apiurl}` + 'Main/ticketById/'+ `${ticketId}` ,{
        method: 'GET',
        headers: {
            'Authorization': token, 
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    return data;
}
async function getCommentResponse() {
    const response = await fetch(`${apiurl}` + 'Main/comments/'+ `${ticketId}` ,{
        method: 'GET',
        headers: {
            'Authorization': token, 
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    return data;
}

async function fetchData() {
    try {
        const dataComm = await getCommentResponse();
        
        const shortComment = dataComm.slice(0,2).map((comm)=>{
            return(
                `
                <div class="ms-2 ml-6 d-flex gap-2  align-items-center" style="height: 55px;">
                    <img src="${imgStore}${comm.imgUrl}" class="w-px-30 h-auto rounded-circle" alt="" srcset="">
                    <div class="comment">
                        <h5>${comm.full_name}</h5>
                        <p>${comm.text}</p>
                    </div>
                                     
                </div>
                
                `
            )
        })

        const allComments = dataComm.map((comm)=>{
            return(
                `
                <div class="ms-2 ml-6 d-flex gap-2  align-items-center" style="height: 55px;">
                    <img src="${imgStore}${comm.imgUrl}" class="w-px-30 h-auto rounded-circle" alt="" srcset="">
                    <div class="comment">
                        <h5>${comm.full_name}</h5>
                        <p>${comm.text}</p>
                    </div>
                                     
                </div>
                
                `
            )
        })
        const data = await getResponse();
        ticket = data;
        // console.log(ticket);
        const ticketContainer = document.getElementById("ticketContainer");
        
        ticketContainer.innerHTML = "";
        const ticketItem = ticket.map((ticket) => {
            const tags = ticket.tags.split(',');
            const assignedTo = ticket.assignedUserImg.split(',');
           
            return (
                `
                <div class="col-xl" >   
                    <div class="card">
                        <div class="card-body d-flex flex-column gap-4">
                                <div class="d-flex gap-2">
                                    <img src="${imgStore}${ticket.creatorImg}" class="w-px-40 h-auto rounded-circle" alt="" srcset="">
                                    <h5 class="mt-2 text-dark">${ticket.creatorName}</h5>
                                </div>
                                <p class="card-text">${ticket.ticketTitle}</p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item "><p>${ticket.ticketDesc}</p></li>
                            
                        </ul>
                        <div class="card-body d-flex justify-content-around gap-2">
                            <img src="${imgStore}${img}" class="w-px-40 h-auto rounded-circle" alt="" srcset="">
                            <input
                                    id="commentInput"
                                    type="text"
                                    class="form-control"
                                    placeholder="Add a comment"
                                    aria-describedby="basic-icon-default-fullname2" ><i class='bx bxs-arrow-to-top sendIcon' onclick="addComment('${ticket.tickeId}')" ></i></input>
                                    
                            
                        </div>
                        <div class="d-flex flex-column commentContainer" id="commentContainer">
                            ${displayData ? `<p class="seeAll" onclick="seeAll(event)">Collapse</p>`:`<p class="seeAll" onclick="seeAll(event)">See All</p>`}
                            
                            ${!displayData ? shortComment : allComments}
                        </div>
                    </div>
                </div> 
                <div class="col-xl" >
                <div class="col-xl" id="ticketDetails">
                    <div class="card mb-4">
                    
                        <div class="card-body">
                            <div class="mb-3 d-flex justify-content-between align-items-center">
                                <p class="mt-1 text-dark" for="basic-icon-default-company"><i class='bx bx-caret-right'></i> Status</p>
                                <div>
                                    <button class="btn btn-outline-info">${ticket.status}</button>
                                    
                                </div>
                            </div>
                        
                            <div class="mb-3 d-flex justify-content-between align-items-center">
                            <p class="mt-1 text-dark" for="basic-icon-default-company"><i class='bx bx-caret-right'></i> Priority</p>
                                <div>
                                    <button class="btn btn-outline-danger">${ticket.priority}</button>
                                    
                                </div>
                            </div>
                            <div class="mb-3 d-flex justify-content-between align-items-center">
                            <p class="mt-1 text-dark" for="basic-icon-default-company"><i class='bx bx-caret-right'></i> Tags</p>
                                <div>
                                    ${
                                        tags.map((tag)=>{
                                            return(
                                                `
                                                <button class="btn btn-outline-dark">${tag}</button>
                                                `
                                            )
                                        }).join('')
                                    }
                                    
                                </div>
                            </div>
                            <div class="mb-3 d-flex justify-content-between align-items-center">
                                <p class="mt-1 text-dark" for="basic-icon-default-company"><i class='bx bx-caret-right'></i> Assigned To</p>
                                <div>
                                    ${
                                        assignedTo.map((userImg)=>{
                                            return(
                                                `
                                                <img src="${imgStore}${userImg}" class="w-px-40 h-auto rounded-circle" alt="" srcset="">
                                                `
                                            )
                                        }).join('')
                                    }
                                    
                                </div>
                            </div>
                        </div>
                        
                        
                    </div>
                       
                </div>
                </div>
                </div>
                </div>
                `
            )   
        })
        ticketContainer.innerHTML= ticketItem
       
    } catch (error) {
        console.error('Error:', error);
    }
}

function addComment(tickeId){
    // event.preventDefault();
    const commentInput = document.getElementById("commentInput");
    let comment = commentInput.value 
    data = {
        comment: comment
    }
    
    fetch(`${apiurl}` + 'Main/addComment/'+tickeId, {
        method:'POST',
        headers: {
            'Authorization': token, 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
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
            commentInput.value ='';
          }

          fetchData();
          
      })
      .catch(error => {
          console.log("Error fetching status options:"+ error);
          
      });
   
}

function seeAll(event){
    event.preventDefault();
   
   
    if(displayData){
        
        displayData = false;
        
    }else{
        displayData = true;
    }
    fetchData();
    
    
    
}


fetchData();