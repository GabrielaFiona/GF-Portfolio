// 1. Scroll Reveal Animation
// This uses IntersectionObserver to detect when elements enter the screen
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        // Optional: Stop observing once revealed so it doesn't animate again
        // observer.unobserve(entry.target); 
      }
    });
  },
  {
    root: null,
    threshold: 0.15, // Trigger when 15% of the element is visible
    rootMargin: "0px 0px -50px 0px",
  }
);

revealElements.forEach((el) => revealObserver.observe(el));

// 2. Typewriter Effect for Hero Section
const words = ["solve problems.", "help small businesses.", "organize chaos."];
let i = 0;
let timer;

function typeWriter() {
  const heading = document.getElementById("typewriter");
  if (!heading) return;
  
  const currentWord = words[i];
  
  // Logic to delete word then type new one could go here, 
  // but for simplicity/cleanliness, we will just swap text with a fade logic
  // or a simple character loop.
  
  // Let's do a simple character loop replacement:
  let charIndex = 0;
  let isDeleting = false;
  
  function loop() {
    const currentText = words[i];
    
    if (isDeleting) {
      heading.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      heading.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
      // Pause at end of word
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      i = (i + 1) % words.length;
      typeSpeed = 500;
    }

    setTimeout(loop, typeSpeed);
  }
  
  loop();
}

// Start Typewriter on load
document.addEventListener("DOMContentLoaded", () => {
  typeWriter();
});
