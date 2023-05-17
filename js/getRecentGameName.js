export let recentGameName = document.querySelector("h6").innerHTML.toLowerCase();
let name = localStorage.getItem("recentGameName");
if (name == null) {
    localStorage.setItem("recentGameName", recentGameName);
}