// Get references to DOM elements
const body = document.querySelector('body'); // Reference to the <body> element
const modeToggle = document.getElementById('mode-toggle'); // Reference to the dark/light mode toggle button
const modeStatus = document.querySelector('.mode-status'); // Reference to the element displaying the current mode status

// Function to toggle dark/light mode
function toggleMode() {
  body.classList.toggle('dark-mode'); // Toggle the 'dark-mode' class on the body element

  // Check if modeStatus exists before updating its textContent
  if (modeStatus) {
    modeStatus.textContent = `Currently in ${body.classList.contains('dark-mode') ? 'Dark' : 'Light'} Mode`; // Update the mode status text
  }

  localStorage.setItem('dark-mode', body.classList.contains('dark-mode')); // Store the current mode in local storage
}

// Check if the mode toggle exists before adding event listener
if (modeToggle) {
  modeToggle.addEventListener('click', toggleMode); // Add click event listener to the toggle button
}

// Check the user's saved preference and set the mode accordingly
const savedDarkMode = localStorage.getItem('dark-mode') === 'true';
if (savedDarkMode) {
  body.classList.add('dark-mode'); // Apply dark mode if saved preference is true

  // Check if modeStatus exists before updating its textContent
  if (modeStatus) {
    modeStatus.textContent = 'Currently in Dark Mode'; // Update the mode status text
  }
}

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get form input values
  const fname = document.getElementById('fname').value.trim();
  const lname = document.getElementById('lname').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  // Regular expression for validating email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check if any of the required fields are empty
  if (fname === '' || lname === '' || email === '' || message === '') {
    alert('Please fill in all required fields.');
    return; // Exit the function if any field is empty
  }

  // Validate email format using the regex
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return; // Exit the function if email is invalid
  }

  // If all validation passes, show the success message and reset the form
  showSuccessMessage();
  contactForm.reset();
}

// Reference to the contact form and add event listener if the form exists
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', handleFormSubmit);
}

// Function to show a success message after form submission
function showSuccessMessage() {
  const successMessage = document.createElement('p');
  successMessage.textContent = 'Form submitted successfully!';
  successMessage.classList.add('success-message');
  contactForm.appendChild(successMessage);
  setTimeout(function () {
    successMessage.remove(); // Remove the success message after a timeout
  }, 5000); // Timeout of 5 seconds
}





// Image slider
const images = document.querySelectorAll('#image-slider img'); // Reference to the images
let currentIndex = 0; // Index of the currently displayed image
// Flag to track user interaction
let userInteracted = false;

// Function to show a specific image and hide others
function showImage(index) {
  images.forEach((image, i) => {
    if (i === index) {
      image.style.display = 'block'; // Show the image
    } else {
      image.style.display = 'none'; // Hide other images
    }
  });
}

// Function to show the next image
function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
  userInteracted = true; // User interacted with the slider
  clearInterval(timer); // Clear the timer
}

// Function to show the previous image
function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
  userInteracted = true; // User interacted with the slider
  clearInterval(timer); // Clear the timer
}

// Initialize the image slider with the first image
showImage(currentIndex);

// Image slider with navigation arrows
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', prevImage);
  nextBtn.addEventListener('click', nextImage);
}

// Function to start the image rotation
function startImageRotation() {
  if (!userInteracted) {
    // Start rotation only if the user hasn't interacted
    timer = setInterval(nextImage, 5000); // Change image every 5 seconds
  }
}

// Function to pause the image rotation
function pauseImageRotation() {
  clearInterval(timer);
}

// Start rotation when the page loads
startImageRotation();

// Fade-in and slide-in effect for project sections
const items = document.querySelectorAll('.item:not(:first-child)');
const options = {
  threshold: 0.5
}

function addSlideIn(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('slide-in');
    } else {
      entry.target.classList.remove('slide-in');
    }
  });
}

const observer = new IntersectionObserver(addSlideIn, options)

items.forEach(item => {
  observer.observe(item);
})


// Initialize the Leaflet map
function initMap() {
  // Specify the latitude and longitude for your map's initial view
  const initialLatLng = [40.748817, -73.985428]; // Replace with your desired coordinates
  const initialZoom = 13; // Set your desired zoom level

  // Create a map object and set it to the 'map' div
  const map = L.map('map').setView(initialLatLng, initialZoom);

  // Add a tile layer to your map (you can choose different map styles)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  // Add a marker to your map (optional)
  L.marker(initialLatLng).addTo(map)
    .bindPopup('Hello! This is my location.') // Replace with your custom message
    .openPopup();
}

// Call the initMap function when the page loads
document.addEventListener('DOMContentLoaded', initMap);


async function loadImages() {
  // An array of image URLs you want to preload
  const imageUrls = ['image1.jpg', 'image2.jpg', 'image3.jpg'];

  // Get the container where you want to display the images
  const imageContainer = document.getElementById('image-slider');

  // Loop through each image URL in the array
  for (const imageUrl of imageUrls) {
    // Create a new Image element for preloading
    const image = new Image();

    // Set the source URL for the image
    image.src = imageUrl;

    // Append the image to the specified container
    imageContainer.appendChild(image);

    // Use a Promise to wait for the image to load or encounter an error
    await new Promise((resolve) => {
      // Resolve the Promise when the image successfully loads
      image.onload = resolve;

      // Resolve the Promise if there's an error loading the image
      image.onerror = resolve;
    });
  }
}
