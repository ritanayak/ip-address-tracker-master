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


//Validate IP
function isIP (value) {
   return /^(?:\d{1,3}\.){3}\d{1,3}$/.test(value); 
}

// Validate domain
function isDomain(value) {
  return /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
}

// Format timezone string
function formatTimezone(tz) {
  return tz.startsWith("-") || tz.startsWith("+") ? `UTC${tz}` : `UTC+${tz}`;
}

//Fetch IP data
async function fetchIPData(query = "" ) {
        const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${query}`
        try {
        const res = await fetch(url);

        if (!res.ok) {
           throw new Error (`API returned status ${res.status}`);
        }
        const data = await res.json();

        if (!data.ip || !data.location)  {
          throw new Error("Incomplete data received from API");
      } 
      return data;
    }
      catch (err) {
        console.error("Fetch IP Data Error:", err);
        throw err;
    }
  
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



// Handle form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const value = input.value.trim();

  if (!value) return;

  if (!isIP(value) && !isDomain(value)) {
    alert("Please enter a valid IP address or domain.");
    return;
  }

  try {
    const data = await fetchIPData(value);
    updateUI(data);
  } catch (err) {
    if (err.message.includes("Failed to fetch")) {
      alert("Network error: Check your internet connection.");
    } else if (err.message.includes("Incomplete data")) {
      alert("Data error: Unable to fetch IP information.");
    } else {
    alert("Invalid IP address or domain");
  }
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