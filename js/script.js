document.addEventListener("DOMContentLoaded", () => {
    fetchTotalHours();
});

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

//DARK MODE LOCAL STORAGE STUFF
const currentTheme = localStorage.getItem("theme")
const MODE = document.querySelector(".modePhoto");
const ROOTHREF = "https://aredmondd.github.io/pursuitofthebacklog/";

if (currentTheme == "light") {
  document.body.classList.add("light-theme");
  MODE.src = ROOTHREF + "images/DARK.png";
}

MODE.addEventListener("click", function () {
    document.body.classList.toggle("light-theme");

    let theme = "dark";
    if (document.body.classList.contains("light-theme")) {
        MODE.src = ROOTHREF + "images/DARK.png";
        theme = "light";
    }
    else {
        MODE.src = ROOTHREF + "images/LIGHT.png";
    }   
  localStorage.setItem("theme", theme);
});