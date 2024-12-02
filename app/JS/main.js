import "../css/style.css";
import { DOMSelector } from "./dom";

//get data
//promise
//show data

function card(x) {
  x.forEach((item) =>
    DOMSelector.container.insertAdjacentHTML(
      "beforeend",
      `<div class="card">
          <h2 class="card-header">${item.Title}</h2>
          <p class="publisher">${item.Publisher}</p>
          <p class="release">${item.Year}</p>
          <h6 class="pages">$${item.Pages}</h6>
          <button class="text-lg" id="choose">Choose Book</button>
        </div>`
    )
  );
}

async function getBookData(){
    try {
        //returns a promise 
        const response = await fetch ('https://stephen-king-api.onrender.com/api/books');
        //guard clause 
        if (response.status != 200) {
            throw new Error(response);
        }else{
            //convert promise to json
            const data = await response.json();
            console.log(data.data);
            card(data.data);
        }
    } catch (error) {
        alert("hey  I could not find that agent")
    }
};

async function getShortsData(){
    try {
        //returns a promise 
        const response = await fetch ('https://stephen-king-api.onrender.com/api/shorts');
        //guard clause 
        if (response.status != 200) {
            throw new Error(response);
        }else{
            //convert promise to json
            const data = await response.json();
            console.log(data.data);
        }
    } catch (error) {
        alert("hey  I could not find that agent")
    }
}

getBookData();
getShortsData();

async function btTitle() {
  const response = await fetch("https://stephen-king-api.onrender.com/api/books")
  const data = await response.json();
  DOMSelector.bookF.addEventListener("submit", function (event) {
    event.preventDefault();
    DOMSelector.container.innerHTML = ""
    let name = DOMSelector.bookT.value;
    const bookTitle = Array.from(
      data.data.filter((book) => book.Title === `${name}`)
    );
    card(bookTitle); 
    DOMSelector.bookT.value = "";
  });
};

btTitle();

function chooseBk(){
  DOMSelector.card.addEventListener('clikc', function(event){
    event.preventDefault();
    DOMSelector.container.innerHTML = ""
  })
}