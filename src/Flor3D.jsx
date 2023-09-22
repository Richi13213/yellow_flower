import React, { useEffect, useState } from 'react';
import * as THREE from 'three';

function Flor3D() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Configuración de la escena
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, windowSize.width / windowSize.height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(windowSize.width, windowSize.height);
    document.body.appendChild(renderer.domElement);

    // Creación del tallo
    const talloGeometry = new THREE.CylinderGeometry(0.03, 0.03, 1.5, 8);
    const talloMaterial = new THREE.MeshBasicMaterial({ color: 0x228B22 }); // Color verde
    const tallo = new THREE.Mesh(talloGeometry, talloMaterial);
    scene.add(tallo);

    // Creación del círculo en el centro de la flor (pistilo)
    const pistiloGeometry = new THREE.CircleGeometry(0.1, 32);
    const pistiloMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 }); // Color café
    const pistilo = new THREE.Mesh(pistiloGeometry, pistiloMaterial);
    pistilo.position.y = 1.5; // Ajusta la posición vertical
    pistilo.rotation.x = -Math.PI / 2; // Gira el círculo para que esté en posición horizontal
    scene.add(pistilo);

    // Creación de los pétalos alargados
    const petaloGeometry = new THREE.ConeGeometry(0.2, 1.2, 5); // Aumenta la altura de los pétalos
    const petaloMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFF00 }); // Amarillo

    // Creación de la flor completa
    const flor = new THREE.Group();

    for (let i = 0; i < 6; i++) {
      const petalo = new THREE.Mesh(petaloGeometry, petaloMaterial);
      petalo.position.y = 1.25;
      petalo.rotation.x = Math.PI / 3 * i;
      flor.add(petalo);
    }

    scene.add(flor);

    // Configuración de la cámara
    camera.position.z = 3;

    // Función para manejar el cambio de tamaño de la ventana
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      setWindowSize({ width: newWidth, height: newHeight });

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animación
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotar la flor
      flor.rotation.y += 0.005;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.removeChild(renderer.domElement);
    };
  }, [windowSize]);

  return <div />;
}

export default Flor3D;
