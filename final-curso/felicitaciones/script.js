const particlesContainer = document.querySelector(".particles");

for(let i = 0; i < 40; i++){

  const particle = document.createElement("span");

  particle.classList.add("particle");

  particle.style.left = Math.random() * 100 + "vw";

  particle.style.animationDuration =
    (5 + Math.random() * 10) + "s";

  particle.style.opacity = Math.random();

  const size = 4 + Math.random() * 8;

  particle.style.width = size + "px";
  particle.style.height = size + "px";

  particlesContainer.appendChild(particle);
}