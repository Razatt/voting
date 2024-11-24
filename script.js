function showPage(pageId) {
  // Get all page elements
  const pages = document.querySelectorAll('.page');

  // Hide all pages
  pages.forEach(page => {
    page.classList.remove('active');
  });

  // Show the selected page
  const activePage = document.getElementById(pageId);
  if (activePage) {
    activePage.classList.add('active');
  }
}let isLoggedIn = false; // Tracks if the user is logged in
let redirectToPage = null; // Tracks the page to redirect after login

// Function to show a specific page
function showPage(pageId) {
  document.querySelectorAll('.page').forEach((page) =>
    page.classList.remove('active')
  );
  document.getElementById(pageId).classList.add('active');
}

// Handle Login Form Submission
function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  // Simulate login check (replace with real authentication logic)
  if (username === "user" && password === "password") {
    isLoggedIn = true;
    document.getElementById("login-error").style.display = "none";

    // Redirect to the originally intended page
    if (redirectToPage) {
      showPage(redirectToPage);
      redirectToPage = null; // Clear redirect after successful login
    } else {
      showPage("home");
    }
  } else {
    document.getElementById("login-error").style.display = "block";
  }
}

// Handle Browse Button Click
function handleBrowseClick(event) {
  if (!isLoggedIn) {
    event.preventDefault(); // Prevent the file dialog from opening
    redirectToPage = "gallery"; // Set the intended page after login
    showPage("login"); // Redirect to login page
  }
}

// Initial Page Load
showPage("home");
















const imageContainer = document.getElementById('image-container');
const fileInput = document.getElementById('file-input');
const uploadBtn = document.getElementById('upload-btn');

// Function to add a new image card
function addImageCard(imageSrc) {
  const card = document.createElement('div');
  card.classList.add('image-card');

  card.innerHTML = `
    <img src="${imageSrc}" alt="Uploaded Image">
    <button class="vote-btn" onclick="vote(this)">Vote</button>
    <p>Votes: <span class="vote-count">0</span></p>
  `;

  imageContainer.appendChild(card);
}

document.getElementById('upload-btn').addEventListener('click', () => {
  const fileInput = document.getElementById('file-input');
  const imageContainer = document.getElementById('image-container');

  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const imageCard = document.createElement('div');
      imageCard.className = 'image-card';
      imageCard.innerHTML = `
        <img src="${e.target.result}" alt="Uploaded Image">
        <div class="vote-section">
          <div class="vote-count" data-votes="0">Votes: 0</div>
          <button class="vote-btn">Vote</button>
        </div>
      `;

      // Add voting functionality
      const voteButton = imageCard.querySelector('.vote-btn');
      const voteCount = imageCard.querySelector('.vote-count');
      voteButton.addEventListener('click', () => {
        let votes = parseInt(voteCount.getAttribute('data-votes')) || 0;
        votes += 1;
        voteCount.setAttribute('data-votes', votes);
        voteCount.textContent = `Votes: ${votes}`;
      });

      imageContainer.appendChild(imageCard);
    };

    reader.readAsDataURL(file);
    fileInput.value = ''; // Clear the input after upload
  } else {
    alert('Please select an image to upload.');
  }
});
// Function to fetch and display the user's location
function showLocation() {
  const locationElement = document.getElementById('location');

  // Check if Geolocation is supported
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Use a reverse geocoding service to get the address (optional)
        locationElement.textContent = `Latitude: ${latitude.toFixed(2)}, Longitude: ${longitude.toFixed(2)}`;

        // OPTIONAL: Use a reverse geocoding service like OpenCage or Google Maps API for a full address
        // Example:
        // reverseGeocode(latitude, longitude);
      },
      (error) => {
        locationElement.textContent = `Unable to fetch location: ${error.message}`;
      }
    );
  } else {
    locationElement.textContent = 'Geolocation is not supported by your browser.';
  }
}

// Call the function on page load
window.onload = showLocation;

// OPTIONAL: Reverse geocoding function (example with OpenCage API)
/*
async function reverseGeocode(lat, lon) {
  const apiKey = 'YOUR_API_KEY'; // Replace with your API key
  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`
  );
  const data = await response.json();
  if (data.results && data.results.length > 0) {
    document.getElementById('location').textContent = data.results[0].formatted;
  } else {
    document.getElementById('location').textContent =
      'Unable to fetch address from coordinates.';
  }
}
*/


function addComment(event) {
  event.preventDefault(); // Prevent form submission

  // Get the input value
  const commentInput = document.getElementById('commentInput');
  const commentText = commentInput.value;

  // Get the current timestamp
  const now = new Date();
  const timestamp = now.toLocaleString(); // Format: MM/DD/YYYY, HH:MM:SS

  // Create a new comment element
  const commentElement = document.createElement('div');
  commentElement.className = 'comment';
  commentElement.innerHTML = `
    <p>${commentText}</p>
    <div class="timestamp">Posted on: ${timestamp}</div>
  `;
}
