setTimeout(() => {
  console.log("Test JS");
}, 4000);

document.addEventListener("DOMContentLoaded", () => {
  const backToTopButton = document.getElementById("back-to-top-btn");

  const checkScroll = () => {
    if (window.scrollY > 100) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", checkScroll);

  backToTopButton.addEventListener("click", scrollToTop);

  //form completion message
  const form = document.getElementById('contact-form');
  const successMessage = document.getElementById('form-success-message');

  if (form && successMessage) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      form.style.display = 'none';
      successMessage.style.display = 'block';
    });
  }

  //theme toggle

  const themeToggle = document.getElementById('theme-toggle');
  const htmlTag = document.documentElement;

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      htmlTag.classList.toggle('black-and-white-mode');
      if (htmlTag.classList.contains('black-and-white-mode')) {
        localStorage.setItem('theme', 'light');
      } else {
        localStorage.removeItem('theme');
      }
    });
  }
});
