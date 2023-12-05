
let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteAllBtn = document.getElementById("delete-all-btn");
const tabBtn = document.getElementById("tab-btn");
const deleteBtn = document.getElementById("delete-btn");
const confirmBtn = document.getElementById("confirm-btn");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));



if (leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}


deleteBtn.addEventListener("click", function(){
    // add a selector next to each saved lead
    ulEl.innerHTML = ""
    for (let i = 0; i< myLeads.length; i++){
        ulEl.innerHTML += `
            <li><input type="checkbox" name="lead" value="${myLeads[i]}"><a href="${myLeads[i]}">${myLeads[i]}</a></li>
        `
    }
    
    // show confirm button and hide delete button
    deleteBtn.style.display = "none";
    confirmBtn.style.display = "inline-block";

    // when confirm button is clicked the selected leads are deleted and the delete button is displayed again
    confirmBtn.addEventListener("click", function(){
        
        // delete selected leads
        const checkboxInputsNL = document.getElementsByName('lead');
        let checkboxArray = Array.from(checkboxInputsNL);   // copy the NodeList into a new array
        for (let i=0; i<checkboxArray.length; i++){

            if (checkboxArray[i].checked){
                myLeads.splice(i, 1);       // remove element at index i from the array myLeads
                checkboxArray.splice(i,1);
                i--;
            }
        }
        


        // display the remaining leads and remove checkboxes
        ulEl.innerHTML = ""
        for (let i = 0; i< myLeads.length; i++){
            ulEl.innerHTML += `
                <li>${myLeads[i]}</li>
            `
        }
        render(myLeads);
        // buttons back to normal
        confirmBtn.style.display = "none";
        deleteBtn.style.display = "inline-block";
        
        // update local storage
        localStorage.clear();
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
    })
})

tabBtn.addEventListener("click", function(){
    
    // using Chrome API to get the url in the bar of the active tab in the current window
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    })
});

function render(leads) {
    let listItems = "";
    for (let i=0; i<leads.length; i++){
        listItems += `
        <li>
            <a target='_blank' href='${leads[i]}'>${leads[i]} </a>
        </li>`
    }
    ulEl.innerHTML = listItems;
}

// when deleteBtn is double-clicked it clears local storage and the array
deleteAllBtn.addEventListener("dblclick", function(){
    localStorage.clear();
    myLeads = [];
    ulEl.textContent = "";

})

// when save input button is clicked the value of the input is saved 
inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value);    
    inputEl.value = ""; 
    
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    
    render(myLeads);
   
})



