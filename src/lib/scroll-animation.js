

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
      x: -4.52,
      y: -11.29,
      z: -6.39,
      onUpdate,
      imageRendering:false
    })
    soundTL.to(
      target,
      {
        x: 1.54,
        y: 0.05,
        z: -4.11,

        imageRendering:false
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
      x: 6.08,
      y: 1.25,
      z: -0.35,
      onUpdate,
      immediateRender: false
    })

    .to(
      target,
      {
        x: -0.96,
        y: 1.58,
        z: 0.09,
        onUpdate,
        immediateRender: false
      },
      0
    );
};
