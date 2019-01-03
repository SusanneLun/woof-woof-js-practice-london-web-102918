document.addEventListener("DOMContentLoaded", () => {
  console.log("%c DOM Content Loaded and Parsed!", "color: magenta");

  const dogInfo = document.querySelector("#dog-info");
  const dogBar = document.querySelector("#dog-bar");

  dogApi = `http://localhost:3000/pups`;
  updateDogApi = `http://localhost:3000/pups/:id/`;

  const fetchPups = () => {
    fetch(dogApi)
      .then(resp => resp.json())
      .then(renderPups);
  };

  const renderPups = pupArray => {
    pupArray.forEach(renderSinglePup);
  };

  const renderSinglePup = pup => {
    let pupName = document.createElement("span");
    pupName.innerHTML = `${pup.name}`;
    pupName.setAttribute("data-id", `${pup.id}`);
    dogBar.appendChild(pupName);

    const showPup = event => {
      dogInfo.innerHTML = `
    <img src=${pup.image}>
    <h2>${pup.name}</h2>
    <button id='dog-btn' type='button' name='button'>${
      pup.isGoodDog ? "Good Dog!" : "Bad Dog!"
    }</button>
    `;
      const dogButton = document.querySelector("#dog-btn");
      dogButton.addEventListener("click", changeStatus);
    };
    pupName.addEventListener("click", showPup);

    // const dogButton = document.selectElementById('#dog-btn')

    const changeStatus = () => {
      let dogButton = dogInfo.children[2];
      if (dogButton.innerText.includes("Good")) {
        dogButton.innerText = "Bad Dog!";
        updateStatus(pup.id, false);
      } else {
        dogButton.innerText = "Good Dog!";
        updateStatus(pup.id, true);
      }
    };
  };

  const updateStatus = (dogId, data) => {
    let dogurl = dogApi + '/' + dogId
    console.log(data)
    fetch(dogurl, {
      method: 'PATCH',
      headers:
      {
        "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify({
    isGoodDog: data
  })
}).then(res => res.json())
  }


  fetchPups();
});
