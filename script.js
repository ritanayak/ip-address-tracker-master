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

//Fetch IP data
async function fetchIPData(query ='' ) {
        const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${query}`
        const res = await fetch(url);
        if (!res.ok) throw new Error ("API request failed");
        return res.json();
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

// Update UI

function updateUI (data) {
    const { ip, isp, location } = data;
    const { city, region, country, lat, lng, timezone } = location;

    ip.textContent = ip;
    location.textContent = `${city}, ${region}, ${country}`;
    timezone.textContent =  `UTC ${timezone}`;
    isp. textContent = isp;

    updateMap(lat, lng);

}


//Validate IP
function isIP (value) {
   return /^(?:\d{1,3}\.){3}\d{1,3}$/.test(value); 
}

