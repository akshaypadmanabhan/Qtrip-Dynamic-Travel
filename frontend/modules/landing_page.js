import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });

  // console.log("From Landing page JS")
  
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data

  try {
    let cities = await fetch(`${config.backendEndpoint}/cities`);
    let fetchedCities = await cities.json();
    return fetchedCities;
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  //getting the main section in a variable

  let parentEle = document.getElementById("data");
  let newDiv = document.createElement("div");
  newDiv.className = "col-12 col-sm-6 col-lg-3 mb-4";

  newDiv.innerHTML = `
    <a href="pages/adventures/?city=${id}" id="${id}">
    <div class="tile ">
      <div class="tile-text text-center">
        <h5>${city}</h5>
        <p >${description}</p>
      </div>
      
    
    <img src="${image}" class="card-img rounded-lg" alt="${city}">
  </div>
</a>`;

  parentEle.appendChild(newDiv);
}

export { init, fetchCities, addCityToDOM };

// import config from "../conf/index.js";

// async function init() {
//   //Fetches list of all cities along with their images and description
//   let cities = await fetchCities();

//   //Updates the DOM with the cities
//   cities.forEach((key) => {
//     addCityToDOM(key.id, key.city, key.description, key.image);
//   });
// }

// //Implementation of fetch call
// async function fetchCities() {
//   // TODO: MODULE_CITIES
//   // 1. Fetch cities using the Backend API and return the data
//   return fetch(`${config.backendEndpoint}/cities`)
//     .then(function (data) {
//       return data.json();
//     })
//     .then(function (data) {
//       return data
//       })
//     .catch((err)=>{
//       return null
//     })
//     };

// //Implementation of DOM manipulation to add cities
// function addCityToDOM(id, city, description, image) {
//   // TODO: MODULE_CITIES
//   // 1. Populate the City details and insert those details into the DOM
//   let parent = document.getElementById("data")
//   var div = document.createElement("div")
//   div.className="col-12 col-sm-6 col-lg-3 my-3 d-flex"
//   div.innerHTML = `
//   <a href="pages/adventures/?city=${id}">
//           <div class="tile text-white border-0 rounded-lg">
//             <img
//               src="${image}"
//               class="card-img rounded-lg"
//               alt="..."
//             />
//             <div class="card-img-overlay justify-content-center">
//               <div class="place-cont">
//                 <h5 class="tile">Bengaluru</h5>
//                 <p class="tile-text">100+ places</p>
//               </div>
//             </div>
//           </div>
//         </a>`
//   parent.appendChild(div)
//   let child = document.createElement("div")
//   child.className = "col-6 col-lg-3 mb-3"
//   child.id = `${id}`
//   var a = document.createElement("a")
//   a.href = `pages/adventures/?city=${id}`
//   a.innerHTML = `
//           <div className="card adventure-card">
//             <img
//               src="${image}"
//               class="card-img-top"
//               alt="..."
//             />
//             <div class="card-body  text-center d-md-flex align-items-center justify-content-between">
//                 <h5 >${id}</h5>
//                 <p >${description}</p>
//             </div>
//           </div>
//         `
//   child.appendChild(a)
//   parent.appendChild(child)
//   console.log(parent)
// }

// export { init, fetchCities, addCityToDOM };
