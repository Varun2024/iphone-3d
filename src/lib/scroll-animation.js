

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const scrollAnimation = (position, target, onUpdate) => {
  // ===== SOUND SECTION =====
  const soundTL = gsap.timeline({
    scrollTrigger: {
      trigger: ".sound-section",
      start: "top bottom",
      end: "top top",
      scrub: 1.7,
    },
  });

  soundTL
    .to(position, {
      x: -3.38,
      y: -10.74,
      z: -5.983,
      onUpdate,
    })
    .to(
      target,
      {
        x: 1.52,
        y: 0.77,
        z: -1.08,
        onUpdate,
      },
      0 // sync with position
    )
    .to(
      ".jumbotron-section",
      {
        opacity: 0,
      },
      0
    )
    .to(
      ".sound-section-content",
      {
        opacity: 1,
      },
      0
    );

  // ===== DISPLAY SECTION =====
  const displayTL = gsap.timeline({
    scrollTrigger: {
      trigger: ".display-section",
      start: "top bottom",
      end: "top top",
      scrub: 2,
    },
  });

  displayTL
    .to(position, {
      x: 10,
      y: 6.0,
      z: 0.011,
      onUpdate,
    })
    .to(
      target,
      {
        x: -0.55,
        y: 1.32,
        z: 0.0,
        onUpdate,
      },
      0
    );
};
