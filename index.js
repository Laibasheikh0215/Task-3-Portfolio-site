// Parallax Scrolling Effect
document.addEventListener("DOMContentLoaded", function () {
  // Parallax effect on scroll
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".parallax-bg");

    parallaxElements.forEach(function (element) {
      const speed = 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translate3d(0, ${yPos}px, -100px) scale(2)`;
    });
  });

  // Smooth scrolling for navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // 3D Card Hover Effects
  const cards = document.querySelectorAll(".card-3d");
  cards.forEach((card) => {
    card.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = (x - centerX) / 25;
      const rotateX = (centerY - y) / 25;

      this.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform =
        "translateY(0) rotateX(0) rotateY(0) translateZ(0)";
    });
  });

  // Form Submission
  const contactForm = document.getElementById("contactForm");
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Show success message with 3D effect
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.innerHTML =
      '<i class="fas fa-check-circle me-2"></i> Message Sent!';
    submitBtn.style.background =
      "linear-gradient(45deg, var(--neon-green), var(--neon-blue))";
    submitBtn.style.transform = "translateZ(20px)";

    // Reset form
    setTimeout(() => {
      contactForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.style.background =
        "linear-gradient(45deg, var(--neon-blue), var(--neon-purple))";
      submitBtn.style.transform = "translateZ(0)";
    }, 3000);
  });

  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateZ(0)";
      }
    });
  }, observerOptions);

  // Observe all 3D elements
  document
    .querySelectorAll(".card-3d, .portfolio-item-3d, .flip-card-3d")
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateZ(50px)";
      el.style.transition = "opacity 0.8s, transform 0.8s";
      observer.observe(el);
    });

  // Mouse move parallax for hero
  document.addEventListener("mousemove", function (e) {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

    document.querySelector(
      ".hero-title-3d"
    ).style.transform = `translateZ(50px) translateX(${moveX}px) translateY(${moveY}px)`;

    const cubes = document.querySelectorAll(".floating-cube");
    cubes.forEach((cube, index) => {
      const speed = 0.02 * (index + 1);
      cube.style.transform += ` translateX(${
        moveX * speed * 10
      }px) translateY(${moveY * speed * 10}px)`;
    });
  });
});
