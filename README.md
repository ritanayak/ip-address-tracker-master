# Frontend Mentor - IP Address Tracker Solution

This is a solution to the [IP Address Tracker challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

---

## Table of Contents

- [Overview](#overview)
  - [The Challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My Process](#my-process)
  - [Built With](#built-with)
  - [What I Learned](#what-i-learned)
  - [Continued Development](#continued-development)
  - [Useful Resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

---

## Overview

### The Challenge

The goal was to build a responsive **IP Address Tracker** application that:

- Shows the user's own IP address and location on initial load  
- Allows searching for any IP address or domain  
- Displays location details including city, region, country, timezone, and ISP  
- Shows the searched location on an interactive map  
- Works across mobile and desktop devices  
- Includes hover states for interactive elements  

---

### Screenshot


![alt text](<Screenshot 2026-02-03 133756.png>)
---

### Links https://rita-ip-address-tracker.netlify.app/

- Solution URL: [Your GitHub Repository](https://github.com/ritanayak/ip-address-tracker-master)  
- Live Site URL: [View Live Site](https://your-live-site-url.com)  

---

## My Process

### Built With

- HTML5 semantic markup  
- CSS3 with Flexbox and Grid for layout  
- Mobile-first responsive design  
- JavaScript (ES6 modules)  
- [LeafletJS](https://leafletjs.com/) for interactive maps  
- [IP Geolocation API by IPify](https://geo.ipify.org/)  

---

### What I Learned

During this project, I learned how to:

- Fetch and handle API data asynchronously with `async/await`  
- Update the DOM dynamically based on API responses  
- Integrate **LeafletJS** maps with custom markers  
- Validate user input for IP addresses  
- Build a **mobile-first, responsive layout**  
- Handle errors and edge cases for API requests  

Example of updating the UI with API data:

```js
function updateUI(data) {
  const { ip, isp, location } = data;
  const { city, region, country, lat, lng, timezone } = location;

  ipE1.textContent = ip;
  LocationE1.textContent = `${city}, ${region}, ${country}`;
  timeZoneE1.textContent = `UTC ${timezone}`;
  IspE1.textContent = isp;

  updateMap(lat, lng);
}
