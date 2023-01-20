import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const URLparams = new URLSearchParams(search);

  const adventureId = URLparams.get("adventure");
  // console.log(adventureId)
  return adventureId;

  // Place holder for functionality to work in the Stubs
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let data = await fetch(
      config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`
    );
    let adventureDetails = await data.json();

    return adventureDetails;
  } catch (e) {
    console.log(e);
    return null;
  }

  // Place holder for functionality to work in the Stubs
  // return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let name = document.getElementById("adventure-name");
  name.textContent = adventure.name;
  let subtitle = document.getElementById("adventure-subtitle");
  subtitle.textContent = adventure.subtitle;

  adventure.images.forEach((image, imageIndex) => {
    let carouselItemDiv = document.createElement("div");
    carouselItemDiv.className = `carousel-item ${
      imageIndex === 0 ? " active" : ""
    }`;
    carouselItemDiv.innerHTML = `<img class="activity-card-image" src=${image}/>`;
    document.getElementById("photo-gallery").appendChild(carouselItemDiv);
  });

  let content = document.getElementById("adventure-content");
  content.textContent = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let photoGallery = document.getElementById("photo-gallery");

  photoGallery.innerHTML = `<div id="carouselExampleFade" class="carousel slide carousel-fade">
<div class="carousel-inner" id="carousel-inner">
 
  
</div>
<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Next</span>
</button>
</div>`;

  images.forEach((image, imageIndex) => {
    let carouselItemDiv = document.createElement("div");
    carouselItemDiv.className = `carousel-item ${
      imageIndex === 0 ? " active" : ""
    }`;
    carouselItemDiv.innerHTML = `<img class="activity-card-image" src=${image}/>`;
    document.getElementById("carousel-inner").appendChild(carouselItemDiv);
  });
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if (adventure.available) {
    document.getElementById("reservation-panel-sold-out").style.display =
      "none";
    document.getElementById("reservation-panel-available").style.display =
      "block";
    document.getElementById(
      "reservation-person-cost"
    ).innerHTML = `${adventure.costPerHead}`;
  } else {
    document.getElementById("reservation-panel-available").style.display =
      "none";
    document.getElementById("reservation-panel-sold-out").style.display =
      "block";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

  const totalCost = document.getElementById("reservation-cost");
  totalCost.textContent = `${adventure.costPerHead * persons}`;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  var form = document.querySelector("#myForm")
  form.addEventListener("submit", (click) => {
    click.preventDefault()
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)
    data["adventure"] = adventure.id

    var responce =  fetch(`${config.backendEndpoint}/reservations/new`,{
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data)
    })
    .then(responce => {
      if(responce.status == 200) {alert ("Success!")}
      else{alert("Failed!")}
      
    })
    
})
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't

  if (adventure.reserved == true) {
    document.getElementById("reserved-banner").style.display = "block";
  } else {
    document.getElementById("reserved-banner").style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
