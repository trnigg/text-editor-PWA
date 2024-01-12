// Reference to install button element
const butInstall = document.getElementById("buttonInstall");

// Listen for 'beforeinstallprompt' event on window object
// This event is fired by the browser when it thinks the app is installable
window.addEventListener("beforeinstallprompt", (event) => {
  // Store the event in 'window.deferredPrompt' so it can be used later
  // window.deferredPrompt is used to check if the app is already installed
  window.deferredPrompt = event;
  // Remove the 'hidden' class from install button to make it visible
  butInstall.classList.toggle("hidden", false);
});

// Add a click event listener to the install button
butInstall.addEventListener("click", async () => {
  // Get the stored event from 'window.deferredPrompt'
  const promptEvent = window.deferredPrompt;
  // If no stored event, exit function
  if (!promptEvent) {
    return;
  }
  // Show the install prompt to the user
  promptEvent.prompt();
  // Clear the stored event from 'window.deferredPrompt'
  window.deferredPrompt = null;
  // Add the 'hidden' class to the install button to hide it
  butInstall.classList.toggle("hidden", true);
});

// Listen for the 'appinstalled' event on the window object
window.addEventListener("appinstalled", (event) => {
  // Clear the stored event from 'window.deferredPrompt' when the app is installed
  window.deferredPrompt = null;
});
