const categoryContainer = document.getElementById("category-container");

const cardContainer = document.getElementById("card-container");

const addtoCartContainer = document.getElementById("addto-cart-container");

let addToCards = [];

let totalPrice = 0;

//modals details
const cardDetailsModal = document.getElementById("card_details_modal");

const modalContainer = document.getElementById("modal-container");

// category loaded
const loadCategory = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
      const categories = data.categories;
      showCategory(categories);
      // all card defult home screen
      if (categories.length > 0) {
        fetch("https://openapi.programming-hero.com/api/plants")
          .then((res) => res.json())
          .then((data) => {
            showCardCategory(data.plants);
          });
      }
    });
};

// category shown
const showCategory = (categories) => {
  categories.forEach((e) => {
    categoryContainer.innerHTML += `
            <p id="${e.id}" class="text-[#1f2937] text-lg font-normal cursor-pointer hover:bg-[#15803d] hover:rounded hover:text-white p-1 hover:p-1 hover:shadow-md m-1">${e.category_name}
            </p>
        `;
  });

  const autoSelectedCategory = categoryContainer.querySelector("p");
  if (autoSelectedCategory) {
    showLoading();
    autoSelectedCategory.classList.add(
      "bg-[#15803d]",
      "text-white",
      "rounded",
      "p-1"
    );
  }

  categoryContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "P") {
      categoryContainer.querySelectorAll("p").forEach((p) => {
        p.classList.remove("bg-[#15803d]", "text-white", "rounded", "p-2");
      });
      showLoading();
      e.target.classList.add("bg-[#15803d]", "text-white", "rounded", "p-1");
      loadCard(e.target.id);
    }
  });
};

// card loaded
const loadCard = (cardId) => {
  fetch(`https://openapi.programming-hero.com/api/category/${cardId}`)
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data.plants);
      showCardCategory(data.plants);
    });
};

// Modal
const loadCardDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  showCardDetails(details.plants);
};

const showCardDetails = (plants) => {
  const cardDetailsContainer = document.getElementById(
    "card-details-container"
  );
  cardDetailsContainer.innerHTML = `
          <div class="space-y-2">
            <h2 class="font-bold text-2xl">${plants.name}</h2>
            <img class="rounded-lg h-68 w-full" src="${plants.image}" alt="">
            <p><span class="font-bold">Categorie: </span>${plants.category}</p>
            <span><span class="font-bold">Price: </span><i class="fa-solid fa-bangladeshi-taka-sign opacity-80"></i>${plants.price}</span>
            <p><span class="font-bold">Description: </span>${plants.description}</p>
          </div>
  `;
  document.getElementById("my_modal_5").showModal();
};

// card shown
const showCardCategory = (plants) => {
  cardContainer.innerHTML = "";
  plants.forEach((plant) => {
    cardContainer.innerHTML += `
      <div id="${plant.id}" class="card bg-base-100 shadow-sm p-4 transform transition duration-300 hover:scale-103 hover:shadow-xl">
              <figure class='h-[250px] w-full overflow-hidden rounded-lg'>
                <img src="${plant.image}" class='h-full w-full object-cover' alt="" />
              </figure>
              <div class="space-y-3">
                <h2 onclick="loadCardDetail(${plant.id})" class="text-2xl font-bold mt-3 text-[#1f2937] cursor-pointer">${plant.name}</h2>
                <p class="text-[#1f2937] h-27 text-sm">${plant.description}</p>
                <div class="flex justify-between items-center">
                  <div>
                    <button
                      class="px-2 py-1 cursor-pointer rounded-[400px] text-[10px] text-[#15803d] font-bold bg-[#dcfce7]"
                    >${plant.category}</button>
                  </div>
                  <div class="font-bold">
                    <p>
                      <i class="fa-solid fa-bangladeshi-taka-sign"></i
                      ><span>${plant.price}</span>
                    </p>
                  </div>
                </div>
                <div class="card-actions justify-center">
                  <button class="btn text-white w-full rounded-[999px] bg-[#15803d] hover:bg-[#105c2c] hover:shadow-lg">Add to Cart</button>
                </div>
              </div>
      </div>
    `;
  });
};

// add to cart history
cardContainer.addEventListener("click", (e) => {
  if (e.target.innerText === "Add to Cart") {
    handleAddCard(e);
  }
});

// add price
const handleAddCard = (e) => {
  const title = e.target.parentNode.parentNode.children[0].innerHTML;

  const price =
    e.target.parentNode.parentNode.children[2].children[1].innerText;

  const id = e.target.parentNode.parentNode.parentNode.id;

  alert(`${title} has been added to the cart.`);

  addToCards.push({
    id: id,
    title: title,
    price: Number(price),
  });

  totalPrice += Number(price);
  showAddCard(addToCards);
  updatePrice();
};

// Delet hostory and price
const deleteAddCard = (addCardId) => {
  const mainas = addToCards.findIndex((addCard) => addCard.id === addCardId);

  if (mainas !== -1) {
    totalPrice -= addToCards[mainas].price;

    addToCards.splice(mainas, 1);
    showAddCard(addToCards);
    updatePrice();
  }
};

const showAddCard = (addToCard) => {
  addtoCartContainer.innerHTML = "";
  addToCard.forEach((addCard) => {
    addtoCartContainer.innerHTML += `
            <div class="bg-[#f0fdf4] px-3 py-2 mt-2 rounded flex justify-between items-center">
                <div class="">
                  <h1 class="text-[#1f2937] text-sm">${addCard.title}</h1>
                  <div class="bg-[#f0fdf4] rounded">
                    <span class="text-[#1f2937] opacity-50 text-[14px] font-bold">
                      <i class="fa-solid fa-bangladeshi-taka-sign"></i>
                      <span id="total-price">${addCard.price}</span>
                    </span>
                    <span><i class="fa-solid fa-xmark opacity-50 text-[10px]"></i>
                      <span class="text-[#1f2937] opacity-50 text-[12px]"
                        id="total-items">1</span>
                    </span>
                  </div>
                </div>
                <div class="cursor-pointer text-red-500">
                  <i onclick="deleteAddCard('${addCard.id}', ${addCard.price})" class="fa-solid fa-xmark"></i>
                </div>
            </div>
    `;
  });
};

// price update function
const updatePrice = () => {
  document.getElementById("final-price").innerText = totalPrice;
};

//loading..
const showLoading = () => {
  cardContainer.innerHTML = `
            <div class="ml-80 bg-red-500">
              <span class="loading loading-dots loading-xl"><span>
            </div>
  `;
};

loadCategory();
