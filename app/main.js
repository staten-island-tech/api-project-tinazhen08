import "./style.css";

//get data
//promise
//show data

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
            //this is unique to THIS API
            data.data.forEach((agent)=>console.log(agent.Title));
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
            data.data.forEach((agent)=>console.log(agent.title));
        }
    } catch (error) {
        alert("hey  I could not find that agent")
    }
}

getBookData();
getShortsData();

