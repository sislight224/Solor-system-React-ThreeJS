import React from "react";
import { Particles } from "react-tsparticles";

const ParticleSphere = () => {
  const particleParams = {
    particles: {
      number: {
        value: 100
      },
      size: {
        value: {
          min: 1,
          max: 5
        },
        random: true
      },
      color: {
        value: "#000000"
      },
      shape: {
        type: "circle"
      }
    },
    interactivity: {
      detectsOn: "canvas",
      events: {
        onHover: {
          enable: true,
          mode: "repulse"
        }
      }
    },
    background: {
      color: "#000000"
    }
  };

  return (
    <>
      <div>hello</div>
      <Particles options={particleParams} />
    </>
  );
};

export default ParticleSphere;
