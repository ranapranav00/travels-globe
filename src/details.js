import * as THREE from 'three';

export const addDetails = (globeElement) => {
    // If globe visible, add a rotate animation
    if (globeElement.current) {
        globeElement.current.controls().autoRotate = true;
        globeElement.current.controls().autoRotateSpeed = -0.35;
      }
  
      // Add clouds
      const CLOUDS_IMG_URL = './clouds.png'; 
      const CLOUDS_ALT = 0.004;
      const CLOUDS_ROTATION_SPEED = 0.01; // deg/frame
      const INITIAL_CLOUDS_SCALE = 0.1; // Start small
      const FINAL_CLOUDS_SCALE = 1 + CLOUDS_ALT; // Final scale
  
      new THREE.TextureLoader().load(CLOUDS_IMG_URL, cloudsTexture => {
        const clouds = new THREE.Mesh(
          new THREE.SphereGeometry(globeElement.current.getGlobeRadius() * FINAL_CLOUDS_SCALE, 75, 75),
          new THREE.MeshPhongMaterial({ map: cloudsTexture, transparent: true, opacity: 0.4 })
        );
        clouds.scale.set(INITIAL_CLOUDS_SCALE, INITIAL_CLOUDS_SCALE, INITIAL_CLOUDS_SCALE); // Start small
        globeElement.current.scene().add(clouds);
  
        // Animate clouds scale
        const animateClouds = () => {
          const elapsed = (Date.now() - startTime) / 450; // seconds
          const scale = Math.min(INITIAL_CLOUDS_SCALE + (FINAL_CLOUDS_SCALE - INITIAL_CLOUDS_SCALE) * elapsed / 2, FINAL_CLOUDS_SCALE);
          clouds.scale.set(scale, scale, scale);
          if (scale < FINAL_CLOUDS_SCALE) {
            requestAnimationFrame(animateClouds);
          }
        };
  
        const startTime = Date.now();
        animateClouds();
  
        // Rotate clouds
        (function rotateClouds() {
          clouds.rotation.y += CLOUDS_ROTATION_SPEED * Math.PI / 180;
          requestAnimationFrame(rotateClouds);
        })();
      });
};