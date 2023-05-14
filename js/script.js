fetchTotalHours();

const RED = "FF5A5F";
const BLUE = "5C9DFF";
const BLACK = "2A2A2A";
const WHITE = "F5F5F5";

let animeHours = document.querySelector("#animeHours");

async function fetchTotalHours() {
    const url = "https://api.jikan.moe/v4/users/mrredmond/statistics";
    try {
        const response = await fetch(url);
        const data = await response.json();
        let days = data["data"]["anime"]["days_watched"];
        animeHours.innerHTML = Math.round(days * 24);
        return data;
    } catch(error) {
        console.log(error);
    }
}

function darkMode() {
    let body = document.body
    let bodyColor = window.getComputedStyle(body).backgroundColor;

    if (bodyColor.includes(42)) {
        return true;
    }
    return false;
}

function modeChange() {
    if (darkMode()) {
        console.log("black to white");
        //turn the background white
        //turn all the white text black
    }
    else {
        console.log("white to black");
        //turn the background black
        //turn all the black text white
    }
}

