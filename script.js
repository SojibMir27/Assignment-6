const categoryContainer = document.getElementById("category-container");

const cardContainer = document.getElementById("card-container");

// category
const loadCategory = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
      const categories = data.categories;
      showCategory(categories);
    })
    .catch((error) => {
      console.log(error);
    });
};

const showCategory = (categories) => {
  categories.forEach((e) => {
    categoryContainer.innerHTML += `
            <p id="${e.id}" class="text-[#1f2937] text-lg font-normal cursor-pointer hover:bg-[#15803d] hover:rounded hover:text-white p-1 hover:p-1 hover:shadow-md">${e.category_name}
            </p>
        `;
  });

  const autoSelectedCategory = categoryContainer.querySelector("p");
  if (autoSelectedCategory) {
    autoSelectedCategory.classList.add(
      "bg-[#15803d]",
      "text-white",
      "rounded",
      "p-1"
    );
  }

  categoryContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "P") {
      //   console.log(e.target.id);

      categoryContainer.querySelectorAll("p").forEach((p) => {
        p.classList.remove("bg-[#15803d]", "text-white", "rounded", "p-2");
      });

      e.target.classList.add("bg-[#15803d]", "text-white", "rounded", "p-1");
      loadCard(e.target.id);
    }
  });
};

// card
// const loadCard = (cardId) => {
//   fetch(`https://openapi.programming-hero.com/api/category/${cardId}`)
//     .then((res) => res.json())
//     .then((data) => {
//     //   console.log(data.plants);
//       showCardCategory(data.plants);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// const showCardCategory = (plants) => {
//     cardContainer.innerHTML = '';
//   plants.forEach(plant => {
//     cardContainer.innerHTML += `
//     <div class="card bg-base-100 shadow-sm p-4">
//               <figure>
//                 <img src="${plant.image}" alt="" />
//               </figure>
//               <div class="space-y-3">
//                 <h2 class="text-2xl font-bold mt-3 text-[#1f2937]">
//                   ${plant.name}
//                 </h2>
//                 <p class="text-[#1f2937] text-sm">
//                   ${plant.description}
//                 </p>
//                 <div class="flex justify-between items-center">
//                   <div>
//                     <button
//                       class="px-2 py-1 cursor-pointer rounded-[400px] text-[10px] text-[#15803d] font-bold bg-[#dcfce7]"
//                     >
//                       ${plant.category}
//                     </button>
//                   </div>
//                   <div class="font-bold">
//                     <p>
//                       <i class="fa-solid fa-bangladeshi-taka-sign"></i
//                       ><span>${plant.price}</span>
//                     </p>
//                   </div>
//                 </div>
//                 <div class="card-actions justify-center">
//                   <button
//                     class="btn text-white w-full rounded-[999px] bg-[#15803d] hover:bg-[#105c2c] hover:shadow-lg"
//                   >
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             </div>
//     `
//   });
// };

loadCategory();
