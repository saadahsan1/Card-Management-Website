var selectedrow = null;

// Display Alerts
function showalerts(message, classname)
{
    const div = document.createElement("div");
    div.className = `alert alert-${classname}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div,main);

    setTimeout(() => document.querySelector(".alert").remove(),3000);
}

//Clear Fields
function clearField(){
    document.querySelector("#Name").value = "";
    document.querySelector("#Date").value = "";
    document.querySelector("#Title").value = "";
    document.querySelector("#Description").value = "";
    document.querySelector("#Place").value = "";
}

// Add Fuctionality

document.querySelector("#bussiness-form").addEventListener("submit",(e) =>{
    e.preventDefault();


    //Getting values
    const Name = document.querySelector("#Name").value;
    const Date = document.querySelector("#Date").value;
    const Title = document.querySelector("#Title").value;
    const Description= document.querySelector("#Description").value;
    const Place = document.querySelector("#Place").value;

    //Validation
    if(Name =="" || Date == "" || Title =="" || Description =="" || Place ==""){
        showalerts("Kindly Fill th Data in all Fields","danger");
    }
    else{
        if(selectedrow == null){
            const list = document.querySelector("#card-body");
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${Name}</td>
                <td>${Date}</td>
                <td>${Title}</td>
                <td>${Description}</td>
                <td>${Place}</td>
                <td>
                <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
            `;
            list.appendChild(row);
            selectedrow = null;
            showalerts("User Data Added","success");
        }
        else{
            selectedrow.children[0].textContent = Name;
            selectedrow.children[1].textContent = Date;
            selectedrow.children[2].textContent = Title;
            selectedrow.children[3].textContent = Description;
            selectedrow.children[4].textContent = Place;
            selectedrow = null;
            showalerts("User Information Edited","info");
        }

        clearField();
    }
});


//Edit Functionality
document.querySelector("#card-body").addEventListener("click", (e) =>{
    target = e.target;
    if(target.classList.contains("edit")){
        selectedrow = target.parentElement.parentElement;
        document.querySelector("#Name").value = selectedrow.children[0].textContent;
        document.querySelector("#Date").value = selectedrow.children[1].textContent;
        document.querySelector("#Title").value = selectedrow.children[2].textContent;
        document.querySelector("#Description").value = selectedrow.children[3].textContent;
        document.querySelector("#Place").value = selectedrow.children[4].textContent;
    }
});


// Delete Fuctionality

document.querySelector("#card-body").addEventListener("click",(e)=>{
    target = e.target;
    if(target.classList.contains("delete")){
        target.parentElement.parentElement.remove();
        showalerts("User Data Deleted", "danger");
    }
});


// Delete All Functionality
document.querySelector("#deleteAllBtn").addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all card records?")) {
        document.querySelectorAll("#card-body tr").forEach(row => {
            row.remove();
        });
        showalerts("All card records deleted", "danger");
    }
});


// Function to filter cards based on search input and specific filters
function filterCards() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const dateFilter = document.getElementById('dateFilter').value.toLowerCase();
    const titleFilter = document.getElementById('titleFilter').value.toLowerCase();
    const descriptionFilter = document.getElementById('DescriptionFilter').value.toLowerCase();
    const placeFilter = document.getElementById('PlaceFilter').value.toLowerCase();
  
    const cards = document.querySelectorAll('#card-body tr');
  
    cards.forEach(card => {
      const cardText = card.textContent.toLowerCase();
      const dateText = card.children[1].textContent.toLowerCase();
      const titleText = card.children[2].textContent.toLowerCase();
      const descriptionText = card.children[3].textContent.toLowerCase();
      const placeText = card.children[4].textContent.toLowerCase();
  
      const matchesSearchInput = cardText.includes(searchInput);
      const matchesDateFilter = dateText.includes(dateFilter);
      const matchesTitleFilter = titleText.includes(titleFilter);
      const matchesDescriptionFilter = descriptionText.includes(descriptionFilter);
      const matchesPlaceFilter = placeText.includes(placeFilter);
  
      if (matchesSearchInput && matchesDateFilter && matchesTitleFilter && matchesDescriptionFilter && matchesPlaceFilter) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }
  
  // Event listeners for input fields
  document.getElementById('searchInput').addEventListener('input', filterCards);
  document.getElementById('dateFilter').addEventListener('input', filterCards);
  document.getElementById('titleFilter').addEventListener('input', filterCards);
  document.getElementById('DescriptionFilter').addEventListener('input', filterCards);
  document.getElementById('PlaceFilter').addEventListener('input', filterCards);
  

// Function to apply theme based on user selection
function applyTheme() {
  const theme = document.getElementById('themeSelect').value;
  const themeStyles = document.getElementById('themeStyles');

  switch (theme) {
    case 'default':
      themeStyles.innerHTML = `
        /* Default theme styles */
        body {
          font-family: Arial, sans-serif;
          color: white;
          background-color: #1d2630;
          margin: 0;
        }
      `;
      break;
    case 'cool':
      themeStyles.innerHTML = `
        /* Cool theme styles */
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #3366cc;
          background-color: #f0f0f0;
          margin: 20px;
        }
      `;
      break;
    case 'funny':
      themeStyles.innerHTML = `
        /* Funny theme styles */
        body {
          font-family: 'Comic Sans MS', cursive, sans-serif;
          color: #ff007f;
          background-color: #ffcc00;
          margin: 10px;
        }
      `;
      break;
    case 'sad':
      themeStyles.innerHTML = `
        /* Sad theme styles */
        body {
          font-family: 'Times New Roman', Times, serif;
          color: #333333;
          background-color: #666666;
          margin: 30px;
        }
      `;
      break;
  }
}

// Event listener for theme selection
document.getElementById('themeSelect').addEventListener('change', applyTheme);

