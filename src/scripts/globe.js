import ThreeGlobe from "three-globe";
import {
  AmbientLight,
  Color,
  DirectionalLight,
  Fog,
  PerspectiveCamera,
  PointLight,
  Scene,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import countries from "./globe/country.json";
import countriesList from "./globe/countries.json";

let renderer, camera, scene, controls, Globe;

const container = document.getElementById("globe");

// SECTION Initializing core ThreeJS elements
function init() {
  // Initialize renderer
  renderer = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(container.clientWidth, container.clientWidth);
  renderer.domElement.style.transform = "rotateZ(-13.5deg)";

  // Initialize scene, light
  scene = new Scene();
  scene.add(new AmbientLight(0xbbbbbb, 0.3));

  // Initialize camera, light
  camera = new PerspectiveCamera();
  camera.aspect = 1;
  camera.updateProjectionMatrix();

  let dLight = new DirectionalLight(0xffffff, 1);
  dLight.position.set(-2000, 500, 1000);
  camera.add(dLight);

  let dLight2 = new PointLight(0x8566cc, 0.5);
  dLight2.position.set(-200, 500, 200);
  camera.add(dLight2);

  camera.position.z = 0;
  camera.position.x = 0;
  camera.position.y = 0;

  scene.add(camera);

  // Additional effects
  scene.fog = new Fog(0x535ef3, 400, 2000);
  document.getElementById("globe").appendChild(renderer.domElement);
}

// SECTION Globe
function initGlobe() {
  // Initialize the Globe
  Globe = new ThreeGlobe({
    waitForGlobeReady: true,
    animateIn: true,
  })
    .hexPolygonsData(countries.features)
    .hexPolygonResolution(3)
    .hexPolygonMargin(0.7)
    .showAtmosphere(true)
    .atmosphereColor("#1e1548")
    .atmosphereAltitude(0.3)
    .hexPolygonColor(() => {
      return "rgba(255,255,255, 1)";
    })
    .onGlobeReady(function () {
      connectCities();

      setTimeout(function () {
        renderer.domElement.style.opacity = "1";
      }, 1000);
    });

  const globeMaterial = Globe.globeMaterial();
  globeMaterial.color = new Color(0x1e00bb);
  globeMaterial.emissive = new Color(0x220038);
  globeMaterial.emissiveIntensity = 0;
  globeMaterial.shininess = 1;

  // NOTE Cool stuff
  //globeMaterial.wireframe = true;
  scene.add(Globe);
}

function connectCities() {
  const data = [];

  for (let i = 0; i < 25; i++) {
    const src = countriesList[Math.floor(Math.random() * countriesList.length)];
    const des = countriesList[Math.floor(Math.random() * countriesList.length)];

    if (!src.latlng || !des.latlng) {
      continue;
    }

    data.push({
      type: "flight",
      order: i + 1,
      startLat: src["latlng"][0],
      startLng: src["latlng"][1],
      endLat: des["latlng"][0],
      endLng: des["latlng"][1],
      color: "#D30D60",
    });
  }

  Globe.arcsData(data)
    .arcColor(function (e) {
      return e.color;
    })
    .arcStroke(function () {
      return 0.5;
    })
    .arcDashLength(0.9)
    .arcDashGap(4)
    .arcDashAnimateTime(1000)
    .arcsTransitionDuration(1000)
    .arcDashInitialGap((e) => (e?.order ?? 0) * 1)
    .labelDotRadius(0.3);
}

function onWindowResize() {
  camera.aspect = 1;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientWidth);
}

function animate() {
  camera.lookAt(scene.position);
  controls?.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

window.addEventListener("DOMContentLoaded", function () {
  requestAnimationFrame(function () {
    init();
  });

  setTimeout(function () {
    requestAnimationFrame(function () {
      onWindowResize();
    });

    setTimeout(function () {
      requestAnimationFrame(function () {
        initGlobe();
      });

      setTimeout(function () {
        requestAnimationFrame(function () {
          // Initialize controls
          controls = new OrbitControls(camera, renderer.domElement);
          controls.enableDamping = false;
          controls.dynamicDampingFactor = 0.01;
          controls.enablePan = false;
          controls.minDistance = 300;
          controls.maxDistance = 300;
          controls.rotateSpeed = 0.8;
          controls.zoomSpeed = 1;
          controls.autoRotate = true;
          controls.minPolarAngle = 1;
          controls.maxPolarAngle = 1;
          controls.enableZoom = false;
          window.addEventListener("resize", onWindowResize, false);
        });

        setTimeout(function () {
          requestAnimationFrame(function () {
            animate();
          });
        }, 250);
      }, 250);
    }, 250);
  }, 250);
});
