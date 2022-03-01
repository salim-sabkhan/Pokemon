const userList = [
  {
    "createdAt": "2022-02-24T07:27:58.254Z",
    "name": "Albert Nienow",
    "avatar": "https://wallpaperaccess.com/thumb/2651906.jpg",
    "id": "2"
  },
  {
    "createdAt": "2022-02-24T04:41:05.365Z",
    "name": "Terence Kertzmann",
    "avatar": "https://cdn.fakercloud.com/avatars/sawrb_128.jpg",
    "id": "3"
  },
  {
    "createdAt": "2022-02-24T01:09:52.401Z",
    "name": "Margarita Kreiger",
    "avatar": "https://cdn.fakercloud.com/avatars/ecommerceil_128.jpg",
    "id": "4"
  },
];

// function createUser() {
//  document.querySelector(".user-list").innerHTML += `
//     <div class="user-container">
//          <img
//          class="user-pic"
//          src="https://wallpaperaccess.com/thumb/2651906.jpg"
//          alt="Alberto Nienow"

//          <h3 class="user-name">Alberto Nienow</h3>
//     </div>
// `;
// }
// userList.forEach((user) => createUser(user));

function createUser({ name, avatar, createdAt }) {
  const joinDate = new Date(createdAt).toDateString();
  document.querySelector(".user-list").innerHTML += `
     <div class="user-container">
          <img
          class="user-pic"
          src="${avatar}"
          alt="${name}"
          <div>
             <h3 class="user-name">${name}</h3>
             <p class="user-join-date">${joinDate}</p>
          </div>
     </div>
 `;
}





function getUsers() {
  fetch("https://6217cd911a1ba20cba915756.mockapi.io/users")
    .then(data => data.json())
    .then((userList) => {
      userList.forEach((user) => createUser(user));
    });
}
getUsers();



function highlypopulatedcountries() {
  fetch("https://restcountries.com/v3.1/all")
    .then((data) => data.json())
    .then((countries) => countries.filter(countries => countries.population > 1_00_00_000))
    .then((countries) => countries.map(countries => countries.name.official))
    .then((result) => console.log(result));
}

//highlypopulatedcountries();


// Latest synntax - Await and Sync


async function highlypopulatedcountries() {
  try {
    const data = await fetch("https://restcountries.com/v3.1/all");
    const countries = await data.json();

    const result = countries
      .filter(countries => countries.population > 1_00_00_000)
      .map(countries => countries.name.official)

    console.log(result);
  } catch (err) {
    console.log("oh no", err);
  }
}


highlypopulatedcountries();



function createUser({ name, avatar, createdAt,id }) {
  const joinDate = new Date(createdAt).toDateString();
  document.querySelector(".user-list").innerHTML += `
     <div class="user-container">
          <img
          class="user-pic"
          src="${avatar}"
          alt="${name}"
          <div>
             <h3 class="user-name">${name}</h3>
             <p class="user-join-date">${joinDate}</p>
             <button onclick="deleteUser(${id})">❌</button>
          </div>
     </div>
 `;
}



async function getUsers() {
  const data = await fetch(
    "https://6217cd911a1ba20cba915756.mockapi.io/users",
    { method: "GET" }
  );
  const userList = await data.json();
  document.querySelector(".user-list").innerHTML = ""; //clear old data
  userList.forEach((user) => createUser(user));
}
getUsers();

// Delete user => refresh

async function deleteUser(id) {
  console.log("Deleting user...", id);
  const data = await fetch(
    `https://6217cd911a1ba20cba915756.mockapi.io/users/${id}`,
    { method: "DELETE" }
    );
  const result = await data.json();
  getUsers(); //for refreshing data
  console.log(result);
}



