
const apiurl = "http://localhost/med_Hachami_HelpDesk_Ticketing_Sys/";
const token = localStorage.getItem('token');


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

// Example usage
// const ticketCreationTime = "2023-12-18 20:50:13";
// const formattedDuration = formatTimeSinceCreation(ticketCreationTime);
// console.log("Time Since Creation:", formattedDuration);




const requestOptions = {
    method: 'GET',
    headers: {
        'Authorization': token, 
        'Content-Type': 'application/json'
    }
  }
  
async function getResponse() {
    const response = await fetch(`${apiurl}` + 'Main/allTickets' ,requestOptions);
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
        // console.log(tickets);
        const ticketContainer = document.getElementById("ticketContainer");
        ticketContainer.innerHTML = "";
        // tickeId: 22, ticketTitle: 'ticket 1', ticketDesc: 'desc test 1', ticketCreatedAt: '2023-12-18 17:16:13', userId: 22,
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
                            
                            <h5 class="card-title mt-4 p-2">${ticket.ticketTitle}</h5>
                            
                            
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
        ticketContainer.innerHTML= ticketItem
       
    } catch (error) {
        console.error('Error:', error);
    }
}

fetchData();


    