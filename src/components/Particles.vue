<template>
  <div class="particles">
    <div
      id="particles-js"
      style="background-color: rgb(255, 255, 255); background-image: url('https://firebasestorage.googleapis.com/v0/b/noble-red-9d387.appspot.com/o/website_graphics%2Flogos%2Fnoblered%20logo.png?alt=media&token=2ba1676f-c745-4b98-88e4-708183efdcb7'); background-size: 30%; background-repeat: no-repeat; background-position: 50% 50%;"
    ></div>
  </div>
</template>

<script>
import "particles.js";
export default {
  name: "particles",
  mounted() {
    this.initParticles();
  },
  methods: {
    initParticles() {
      window.particlesJS("particles-js", {
        particles: {
          number: {
            value: 360,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: "#b71c1c"
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#000000"
            },
            polygon: {
              nb_sides: 5
            }
          },
          opacity: {
            value: 1,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0,
              sync: false
            }
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: false,
              speed: 4,
              size_min: 0.3,
              sync: false
            }
          },
          line_linked: {
            enable: false,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 600
            }
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: false,
              mode: "bubble"
            },
            onclick: {
              enable: true,
              mode: "repulse"
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 400,
              line_linked: {
                opacity: 1
              }
            },
            bubble: {
              distance: 250,
              size: 0,
              duration: 2,
              opacity: 0,
              speed: 3
            },
            repulse: {
              distance: 400,
              duration: 0.4
            },
            push: {
              particles_nb: 4
            },
            remove: {
              particles_nb: 2
            }
          }
        },
        retina_detect: true
      });
    }
  }
};
</script>

<style scoped>
#particles-js {
  background: white;
  height: 100%;
  width: 100%;
}

#inside {
  position: absolute;
  z-index: 100;
  margin: 0 auto;
  margin-left: 300px;
}
</style>
