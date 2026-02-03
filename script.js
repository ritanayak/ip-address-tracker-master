import { API_KEY } from "./secret.js";

const ipE1 = document.getElementById("ip");
const LocationE1 = document.getElementById("location");
const timeZoneE1 = document.getElementById("timezone");
const IspE1 = document.getElementById("isp");
const input = document.getElementById("SearchInput");
const form = document.getElementById("SearchForm");

//Initialize map
const map = L.map("map").setView([0, 0], 2)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

let marker;

//Fetch IP data
async function fetchIPData(query = "" ) {
        const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${query}`
        const res = await fetch(url);
        if (!res.ok) throw new Error ("API request failed");
        return res.json();
    }
 

 // Update map
function updateMap(lat, lng) {
    
    map.setView( [lat, lng], 13);


if (marker) {
    marker.setLatLng([lat, lng]);
} else {
    marker = L.marker([lat, lng]). addTo(map);
}
}

// Update UI

function updateUI (data) {
    const { ip, isp, location } = data;
    const { city, region, country, lat, lng, timezone } = location;

    ipE1.textContent = ip;
    LocationE1.textContent = `${city}, ${region}, ${country}`;
    timeZoneE1.textContent =  `UTC ${timezone}`;
    IspE1. textContent = isp;

    updateMap(lat, lng);

}


//Validate IP
function isIP (value) {
   return /^(?:\d{1,3}\.){3}\d{1,3}$/.test(value); 
}

// Search
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const value = input.value.trim();

  try {
    const data = await fetchIPData(value);
    updateUI(data);
  } catch (err) {
    alert("Invalid IP address or domain");
    console.error(err);
  }
});

// Initial load – user's IP
(async function init() {
  try {
    const data = await fetchIPData();
    updateUI(data);
  } catch (err) {
    console.error(err);
    alert("Failed to fetch your IP information");
  }
})();
