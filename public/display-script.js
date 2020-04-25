// Always include at top of Javascript file
"use strict";


// Get and display the current shopping list by adding nothing
getListFromServer();

// function to send a new item to the server.
// It gets back the whole list, including the new item
// Then it displays the list.
function getListFromServer() {
  let url = "display";
  
  let xhr = new XMLHttpRequest;
  // it's a GET request, it goes to URL /shoppingList
  xhr.open("GET",url);
  
  // Next, add an event listener for when the HTTP response is loaded
  xhr.addEventListener("load", function() {
      if (xhr.status == 200) {  // success? 
        console.log("success");
        let responseStr = xhr.responseText;  // get the JSON string 
        let gList = JSON.parse(responseStr);  // turn it into an object
        console.log(gList);

        display(gList);  // print it out as a string, nicely formatted
      } else { // failure? 
        console.log("fail");
        console.log(xhr.responseText);
      }
  });
  

function display(gList){

    document.querySelector(".container-1").style.background = gList.color;
    document.querySelector("#messageBox").className = gList.font;
    document.querySelector('#messageBox').textContent = gList.message;
    document.querySelector('#serverImage').src = gList.image;
}

  // Actually send request to server
  xhr.send();
}
