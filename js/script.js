document.addEventListener("DOMContentLoaded", (event) => {
    fetchTotalHours();
});

const RED = "FF5A5F";
const BLUE = "5C9DFF";
const BLACK = "2A2A2A";
const WHITE = "F5F5F5";

let animeHours = document.querySelector("#animeHours");
const MODE = document.querySelector(".modePhoto");
let iconHREF = MODE.getAttribute("src");

MODE.addEventListener("click", function() {
    document.body.classList.toggle("light-theme");
    if (document.body.classList.contains("light-theme")) {
        MODE.src = "../images/DARK.png";
    }
    else {
        MODE.src = "../images/LIGHT.png";
    }
})

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

