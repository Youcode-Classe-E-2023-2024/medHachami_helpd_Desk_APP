let selectedUserIds = [];
const apiurl = "http://localhost/med_Hachami_HelpDesk_Ticketing_Sys/";
const token = localStorage.getItem('token');
function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  const draggedUserData = JSON.parse(event.dataTransfer.getData("text/plain"));
  // console.log("Dragged User Data:", draggedUserData);

  const draggedUserId = draggedUserData.userId;
  // console.log(draggedUserId);

  const selectedUsersList = document.getElementById("selected-users");

  // Check if the user is not already in the list
  if (!isUserInList(selectedUsersList, draggedUserId)) {
    // Create a new list item for the selected user
    const selectedUserItem = document.createElement("li");
    selectedUserItem.classList.add("user");
    
    // Create an image element
    const userImage = document.createElement("img");
    userImage.src = draggedUserData.userSrc;
    userImage.alt = "User";
    userImage.classList.add("w-px-40", "h-auto", "rounded-circle");

    // Create a paragraph element for the user name
    const userNameParagraph = document.createElement("p");
    userNameParagraph.textContent = draggedUserData.userName;
    userNameParagraph.classList.add("username");

    // Add delete button
    const deleteButton = document.createElement("span");
    deleteButton.classList.add("delete-user");
    deleteButton.textContent = " ❌";
    deleteButton.onclick = function () {
      selectedUsersList.removeChild(selectedUserItem);
      removeUserId(draggedUserId);
    };

    // Append the elements to the selected user item
    selectedUserItem.appendChild(userImage);
    selectedUserItem.appendChild(userNameParagraph);
    selectedUserItem.appendChild(deleteButton);

    // Append the selected user item to the list
    selectedUsersList.appendChild(selectedUserItem);

    // Store the user ID
    selectedUserIds.push(draggedUserId);

    // console.log(selectedUserIds);
  }
}

function isUserInList(list, userId) {
  return selectedUserIds.includes(userId);
}

function removeUserId(userId) {
  selectedUserIds = selectedUserIds.filter(id => id !== userId);
}

document.addEventListener("DOMContentLoaded", function () {
  

  // status dropdown
  const statusDropDown = document.getElementById("status");
  const tagDropDown = document.getElementById("tag");
  const priorityDropDown = document.getElementById("priority");
  
  const requestOptions = {
    method: 'GET',
    headers: {
        'Authorization': token, 
        'Content-Type': 'application/json'
       
    }
  }
  fetch(`${apiurl}` + 'Main/allStatus', requestOptions)
    .then(response => response.json())
    .then(data => {
        // console.log(data); 
        statusDropDown.innerHTML = "";

        data.forEach(option => {
            const optionElement = document.createElement("option");
            optionElement.value = option.id; 
            optionElement.text = option.Name;   
            statusDropDown.appendChild(optionElement);
        }); 
    })
    .catch(error => {
        console.log("Error fetching status options:"+ error);
        
    });

    fetch(`${apiurl}` + 'Main/allTags', requestOptions)
    .then(response => response.json())
    .then(data => {
        // console.log(data); 
        tagDropDown.innerHTML = "";

        data.forEach(option => {
            const optionElement = document.createElement("option");
            optionElement.value = option.id; 
            optionElement.text = option.Name;   
            tagDropDown.appendChild(optionElement);
        }); 
    })
    .catch(error => {
        console.log("Error fetching status options:"+ error);
        
    });

    fetch(`${apiurl}` + 'Main/allPriorities', requestOptions)
    .then(response => response.json())
    .then(data => {
        // console.log(data); 
        priorityDropDown.innerHTML = "";

        data.forEach(option => {
            const optionElement = document.createElement("option");
            optionElement.value = option.id; 
            optionElement.text = option.Name;   
            priorityDropDown.appendChild(optionElement);
        }); 
    })
    .catch(error => {
        console.log("Error fetching status options:"+ error);
        
    });

    //fetching users

    const userListContainer = document.getElementById("userList");

            
      fetch(`${apiurl}` + 'Users/allUsers', requestOptions)
      .then(response => response.json())
      .then(users => {
          // console.log(users);
          usersData = users;
          usersData.forEach(user => {
              const userItem = document.createElement("li");
              userItem.classList.add("user-item", "d-flex", "mb-4", "pb-1");
              userItem.setAttribute("draggable", "true");
              userItem.setAttribute("data-user-id", user.id);
            
              userItem.innerHTML = `
                  <div class="avatar flex-shrink-0 me-3">
                      <img src="${user.imgUrl}"  alt="${user.full_name}" class="rounded" />
                  </div>
                  <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                      <div class="me-2">
                          <h6 class="mb-0">${user.full_name}</h6>
                      </div>
                  </div>
              `;

              // console.log(userItem);
              userListContainer.appendChild(userItem);
              const userItems = document.querySelectorAll(".user-item");
            
            userItems.forEach(function (item) {
              item.addEventListener("dragstart", function (event) {
                const userId = item.dataset.userId;
                const userSrc = item.querySelector("img").getAttribute("src");
                const userName = item.querySelector("h6").textContent;
                // const imgUrl = item.querySelector("img").getAttribute("src");
          
                // console.log("Dragged User ID:", userId);
                // console.log("Dragged User Src:", userSrc);
                // console.log("Dragged User Name:", userName);
              
                event.dataTransfer.setData("text/plain", JSON.stringify({ userId, userSrc, userName }));
              });
             });
      });
      })
      .catch(error => {
          console.error("Error fetching user data:", error);
      });

      
            

});




function addTicket(ev){
  ev.preventDefault(); 
  const ticketName = document.getElementById("name").value;
  const tag = document.getElementById("tag").value; 
  const status = document.getElementById("status").value; 
  const priority = document.getElementById("priority").value; 
  const description = document.getElementById("description").value; 

  let ticketName_error =  document.getElementById("ticketName_error");
  let description_error = document.getElementById("description_error");
  let assignedUsers_error = document.getElementById("assignedUsers_error");


    ticketName_error.textContent = '';
    description_error.textContent = '';

  if(!ticketName){
    ticketName_error.textContent = "*Ticket Name required";
  }

  if(!description){
    description_error.textContent = "*description required";
  }
  if(selectedUserIds.length == 0){
    assignedUsers_error.textContent = "*Assigning ticket requires";
  }
  if(ticketName_error.textContent === '' && description_error.textContent === '' && assignedUsers_error.textContent === ''){

    
    const data ={
      "title": ticketName,
      "description":description ,
      "priority":priority,
      "tag":tag,
      "creatordId":localStorage.getItem('id'),
      "assignedTo":selectedUserIds
    }

    const requestOptions = {
      method: 'POST',
      headers: {
          'Authorization': token, 
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    }
    fetch(`${apiurl}` + 'Main/newTicket', requestOptions)
      .then(response =>{
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        return response.json();
      })
      .then(data => {
        console.log(data);
          if(data.message){
            let alert = document.getElementById("alert1");
            alert.textContent = data.message  ;
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

  
  // console.log(selectedUserIds);
}

