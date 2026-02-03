import { update } from "lodash";
import { API_KEY } from "./secret.js";

const ip = document.getElementById("ip");
const Location = document.getElementById("location");
const TimeZone = document.getElementById("timeZone");
const Isp = document.getElementById("isp");
const input = document.getElementById("SearchInput");
const Form = document.getElementById("SearchForm");

//Initialize map
const map = Location.map("map").setView([0, 0], 2)
Location.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

let marker;

//Fetch user's IP info on load
async function fetchIP(ip ='' ) {
    try {
        const res = await fetch (`https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${ip}`)
        const data = await res.json();
        updateInfo(data);
        updateMap(data);
    } catch (err) {

        console.error(err);
        alert("Failed to fetch IP information");
    }
}

function updateInfo(data) {
    document.getElementById("ip").innerText = `IP: ${data.ip}`;
    document.getElementById("location").innerText = `Location: ${data.location.city}, ${data.location.country}`;
    document.getElementById("isp").innerText = `ISP: ${data.isp}`;
}
 // Update map
function updateMap(data, lng) {
    
    map.setView( [lat, lng], 13);


if (marker) {
    marker.setLatLng([lat, lng]);
} else {
    marker = l.marker([lat, lng]). addTo(map);
}
}