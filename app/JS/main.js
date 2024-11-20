import "./css/style.css";
import { DOMSelector } from "./dom";

//get data
//promise
//show data

/* async function getBookData(){
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
            //this is unique to THIS API
            data.data.forEach((book)=>console.log(book.Title));
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
            //this is unique to THIS API
            data.data.forEach((short)=>console.log(short.title));
        }
    } catch (error) {
        alert("hey  I could not find that agent")
    }
}

getBookData();
getShortsData(); */

async function bkTitle(){
    try{
        const response = await fetch ('https://stephen-king-api.onrender.com/api/books');
        if (response.status != 200) {
            throw new Error(response);
        }else{
            const data = await response.json();
            DOMSelector.container.addEventListener(click, function(event){
                event.preventDefault();
                if (event.target.classList.contains(".submit")){
                    let name = DOMSelector.bookT.value;
                    const bookTitle = data.data.filter((book) => book.Title === `${name}`)
                };
            })
        }
    } catch (error){
        alert("Couldn't find data")
    }
};

