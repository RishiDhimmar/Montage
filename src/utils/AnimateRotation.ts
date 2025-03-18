import * as THREE from "three";
import gsap from "gsap";
export const animateRotation = (
    currentRotation: number,
    targetRotation: number,
    onUpdate: (rot: number) => void,
    onComplete: (rot: number) => void
  ) => {
    let delta = targetRotation - currentRotation;
    if (delta > Math.PI) delta -= Math.PI * 2;
    if (delta < -Math.PI) delta += Math.PI * 2;
    const duration = Math.min(0.5, (Math.abs(delta) / Math.PI) * 0.8);
    const temp = { rot: currentRotation };
  
    gsap.to(temp, {
      rot: currentRotation + delta,
      duration,
      ease: "power2.out",
      onUpdate: () => onUpdate(temp.rot),
      onComplete: () => onComplete(targetRotation),
      id: "modelRotation"
    });
  };