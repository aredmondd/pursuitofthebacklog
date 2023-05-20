//updating the home page stuff
document.addEventListener("DOMContentLoaded", () => {
    fetchTotalHours();
    if (window.innerWidth <= 1440) {
        document.location = "mobile-index.html";
    }
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
const currentTheme = localStorage.getItem("theme");
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


//INDEX HOVER ANIMATION
let interval;
let resetWordIndex = 0;
let resetWord = newResetWord(resetWordIndex);

const element = document.querySelector("#things");

function randomInt(max) {
    return Math.floor(Math.random() * max);
}
function randomFromArray(array) {
    return array[randomInt(array.length)];
}
function scrambleText(text) {
    const chars = '*?><[]&@#)(.%$-_:/;?!AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890'.split('');
    return text.split('').map(x => randomInt(75) > 1 ? randomFromArray(chars) : x).join('');
}

element.addEventListener('mouseover', () => {
    interval = setInterval(() => element.innerText = scrambleText(resetWord), 75);
})

element.addEventListener('mouseout', () => {
    clearInterval(interval);
    element.innerText = resetWord;
    resetWordIndex++;
    resetWord = newResetWord(resetWordIndex);
    if(resetWordIndex == 4) {
        resetWordIndex = -1;
    }
})

function newResetWord(index) {
    let words = ["coding", "drawing", "running", "gaming", "reading"];
    return words[index];
}



//AJAX TO GET THE MOST RECENT TITLE FROM REVIEWS
let xhr = typeof XMLHttpRequest != 'undefined' ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
xhr.open('get', ROOTHREF + 'html/reviews.html', true);
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) { 
        //get all the text from "reviews.html"
        reviewsHTML = xhr.responseText;

        //find the most recent title
        let firstIndex = reviewsHTML.indexOf('<h6 class="cardHeader">');
        let secondIndex = reviewsHTML.indexOf("</h6>");

        //update the title
        let title = reviewsHTML.substring(firstIndex+23, secondIndex).toLowerCase();
        document.querySelector("#recentGame").innerHTML = title;
    } 
}
xhr.send();

//mobile update
console.log("width: " + window.innerWidth);
console.log("height: " + window.innerHeight);

