let selectedUserIds = [];

let usersData ;

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
      let numOfTags = 0;
        data.forEach(option => {
          
            const optionElement = document.createElement("option");
            optionElement.value = option.id; 
            optionElement.text = option.Name;   
            tagDropDown.appendChild(optionElement);
            numOfTags += 1;
        }); 
        $(tagDropDown).chosen();
        tagDropDown.setAttribute("tabindex", numOfTags);
        


        // console.log(numOfTags);
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

   

      
            

});




function addTicket(ev){
  ev.preventDefault(); 
  const ticketName = document.getElementById("name").value;

  const tagDropDown = document.getElementById("tag");
  const tagValues = $(tagDropDown).val(); 

  const status = document.getElementById("status").value; 
  const priority = document.getElementById("priority").value; 
  const description = document.getElementById("description").value; 

  let ticketName_error =  document.getElementById("ticketName_error");
  let description_error = document.getElementById("description_error");
  let assignedUsers_error = document.getElementById("assignedUsers_error");
  let tags_error = document.getElementById("tags_error");

  

    ticketName_error.textContent = '';
    description_error.textContent = '';
    tags_error.textContent = '';
    assignedUsers_error.textContent = '';

  if(!ticketName){
    ticketName_error.textContent = "*Ticket Name required";
  }

  if(!description){
    description_error.textContent = "*description required";
  }
  if(selectedUserIds.length == 0){
    assignedUsers_error.textContent = "*Assigning ticket requires";
  }
  if(tagValues.length == 0){
    tags_error.textContent = "*Tags are required";
  }
  console.log(tagValues);
  console.log(tagValues.length);
  if(ticketName_error.textContent === '' && description_error.textContent === '' && assignedUsers_error.textContent === '' && tags_error.textContent === ''){

    console.log('inside addticket');
    const data ={
      "title": ticketName,
      "description":description ,
      "priority":priority,
      "tags":tagValues,
      "creatordId":localStorage.getItem('id'),
      "assignedTo":selectedUserIds
    }
    console.log(data);
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

          windowlocation.href = 'index.html';
          
      })
      .catch(error => {
          console.log("Error fetching status options:"+ error);
          
      });
  
    
  }else{
    console.log('outside');
  }

  

}

 //fetching users
          
//  let usersData = [];
const userInputSearch = document.getElementById("userInputSearch");
userInputSearch.addEventListener('keyup', function (event) {
  event.preventDefault();
  const usernameToSearch = event.target.value.trim().toLowerCase();
  const foundUser = usersData.filter(user => user.full_name.toLowerCase().includes(usernameToSearch));
  displayUsers(foundUser);
});
async function getUsersData() {
  const response = await fetch(apiurl + 'Users/allUsers',{
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



async function fetchAndStoreUserData() {
  try {
    const data = await getUsersData();
    usersData = data;
    displayUsers(usersData);
  } catch (error) {
    console.error('Error:', error);
  }
}

 function displayUsers(users) {
   const userListContainer = document.getElementById("userList");
   userListContainer.innerHTML = ""; 
 
   users.forEach(user => {
     const userItem = document.createElement("li");
     userItem.classList.add("user-item", "d-flex", "mb-4", "pb-1");
     userItem.setAttribute("draggable", "true");
     userItem.setAttribute("data-user-id", user.id);
 
     userItem.innerHTML = `
         <div class="avatar flex-shrink-0 me-3">
             <img src="${imgStore}${user.imgUrl}" alt="${user.full_name}" class="rounded" />
         </div>
         <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
             <div class="me-2">
                 <h6 class="mb-0">${user.full_name}</h6>
             </div>
         </div>
     `;
 
     userListContainer.appendChild(userItem);
   });
 
   const userItems = document.querySelectorAll(".user-item");
 
   userItems.forEach(function (item) {
     item.addEventListener("dragstart", function (event) {
       const userId = item.dataset.userId;
       const userSrc = item.querySelector("img").getAttribute("src");
       const userName = item.querySelector("h6").textContent;
 
       event.dataTransfer.setData("text/plain", JSON.stringify({ userId, userSrc, userName }));
     });
   });
 }
 
 
 
 
 fetchAndStoreUserData();
 
