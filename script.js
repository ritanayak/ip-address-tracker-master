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