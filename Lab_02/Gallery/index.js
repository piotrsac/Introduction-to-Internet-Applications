setTimeout(() => {
    console.log('Test JS')
}, 4000)

document.addEventListener('DOMContentLoaded', () => {

  const backToTopButton = document.getElementById('back-to-top-btn');

  const checkScroll = () => {
    if (window.scrollY > 100) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  window.addEventListener('scroll', checkScroll);

  backToTopButton.addEventListener('click', scrollToTop);
});

let videos = document.querySelectorAll(".card-video");

videos.forEach( (vid) => {
  vid.volume = 0.2      //żeby uszy nie wybuchły
});

