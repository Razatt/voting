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
}
    








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
}// Simulate a database for demo purposes
const votersDatabase = {};

// Function to generate a unique ID
function generateUniqueId() {
  return 'id-' + Math.random().toString(36).substr(2, 9);
}

// Function to add a voter and generate their unique link
function addVoter(voterName, voterPhoto) {
  const uniqueId = generateUniqueId();
  votersDatabase[uniqueId] = { name: voterName, photo: voterPhoto };

  // Generate the unique URL
  const uniqueUrl = `${window.location.origin}/vote?id=${uniqueId}`;

  // Update the input field with the unique URL
  const urlField = document.getElementById('unique-url');
  urlField.value = uniqueUrl;

  // Make the share section visible
  const shareSection = document.getElementById('share-section');
  shareSection.style.display = 'block';

  console.log('Voter added:', votersDatabase); // Debugging
}

// Function to copy the link to the clipboard
function copyToClipboard() {
  const urlField = document.getElementById('unique-url');
  urlField.select();
  urlField.setSelectionRange(0, 99999); // For mobile devices

  navigator.clipboard.writeText(urlField.value).then(() => {
    alert('Link copied to clipboard!');
  });
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
