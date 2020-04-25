// Always include at top of Javascript file
"use strict";

//CHANGE FONTS
const diamond = "&#11046;";
const cross = "&#10070;";

let currentFontIcon = document.querySelector("li span");
// console.log(currentFontIcon);

document.querySelectorAll("li input").forEach(i => {
  i.addEventListener("change", () => {
    // console.log(i);
    if (i.checked) {
      // console.log("checked");
      i.previousElementSibling.innerHTML = cross;
      currentFontIcon.innerHTML = diamond;
      currentFontIcon = i.previousElementSibling;
      document.querySelector("#messageBox").className = i.value;
    }
  });
});


//change background color of the postcard
const boxs = document.querySelectorAll(".color-box");
const box_border = "black solid 1px"
// console.log(boxs);
const colors = [
    "#e6e2cf",
    "#dbcaac",
    "#c9cbb3",
    "#bbc9ca",
    "#a6a5b5",
    "#b5a6ab",
    "#eccfcf",
    "#eceeeb",
    "#bab9b5"
  ];

let cur_box = boxs.item(0);
// console.log(cur_box);
cur_box.style.border = box_border;

boxs.forEach((box,i)=>{

    box.addEventListener("click",()=>{
        cur_box.style.border = "none";
        box.style.border = box_border;
        cur_box = box;
        document.querySelector(".container-1").style.background = colors[i];
    })
});


// UPLOAD IMAGE using a post request
// Called by the event listener that is waiting for a file to be chosen
function uploadFile() {
  
    // get the file chosen by the file dialog control
    const selectedFile = document.getElementById('fileChooser').files[0];
    // store it in a FormData object
    const formData = new FormData();
    // name of field, the file itself, and its name
    formData.append('newImage',selectedFile, selectedFile.name);
    console.log(selectedFile);
    // build a browser-style HTTP request data structure
    const xhr = new XMLHttpRequest();
    // it will be a POST request, the URL will this page's URL+"/upload" 
    xhr.open("POST", "https://postcard-ka.glitch.me/upload", true);
  
    // callback function executed when the HTTP response comes back
    xhr.onloadend = function(e) {
        // Get the server's response body
        console.log(xhr.responseText);
        // now that the image is on the server, we can display it!
        let newImage = document.getElementById("serverImage");
        newImage.src = "https://postcard-ka.glitch.me/images/"+selectedFile.name;
        newImage.style.display = "block";
        
        let button = document.querySelector("#chooseButton");
        button.innerHTML = "Replace Image";
        console.log(button.classList);
        button.classList.add("button");
      
        document.querySelector(".imageUpload").style.justifyContent = "space-between";
        document.querySelector(".imageUpload").style.border = "none";
      
        
        
    }
  
    // actually send the request
    xhr.send(formData);
}


//save button
document.querySelector('#share').addEventListener('click', () => {
  
  let message = document.querySelector('#messageBox');
  let img = document.querySelector('#serverImage');
  let color = document.querySelector(".container-1")
  let data = {
    image: img.src,
    color: cur_box.style.backgroundColor,
    font: message.className,
    message: message.textContent
  }
  var xmlhttp = new XMLHttpRequest();   
  xmlhttp.open("POST", "/share");
  xmlhttp.setRequestHeader("Content-Type","application/json");
  
  
  xmlhttp.onloadend = function() {
    console.log("onload");
    window.location = window.location.href+"postcard-display.html";
  }
  
  xmlhttp.send(JSON.stringify(data));
})




// Add event listener to the file input element
document.getElementById("fileChooser").addEventListener("change",uploadFile);



