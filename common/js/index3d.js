let $blob = $('.blob');

function blob() {
  if ($blob.length) {
    for (
      let i = 0, element;
      (element = document.querySelectorAll('input[type="range"]')[i++]);

    ) {
      rangeSlider.create(element, {
        polyfill: true,
      });
    }

    // Range Bar 設定
    let speedSlider = $('input[name="speed"]');
    let spikesSlider = $('input[name="spikes"]');
    let processingSlider = $('input[name="processing"]');

    //選取 canvas
    const canvas = document.querySelector('#blob');
    const renderer = new THREE.WebGLRenderer({
      canvas,
      context: canvas.getContext('webgl2'),
      antialias: true,
      alpha: true,
    });
    let simplex = new SimplexNoise();

    //場景及相機設定
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(45, 2, 0.1, 1000);

    //相機定位
    camera.position.z = 4;

    //滑鼠控制軌跡
    let controls = new THREE.OrbitControls(camera, canvas);
    controls.enableDamping = true; //拖拉慣性

    controls.campingFactor = 0.25; //拖拉慣性阻尼參數搭配enableDamping使用

    controls.enableZoom = false; //相機變焦移動

    controls.enablePan = false; //相機平移

    controls.enableRotate = true;

    //禁用水平控制單軸
    // controls.maxAzimuthAngle = 1;
    // controls.minAzimuthAngle = 1;

    //禁用垂直控制單軸
    // controls.maxPolarAngle = 1;
    // controls.minPolarAngle = 1;
    controls.update();

    //幾何球體
    let geometry = new THREE.SphereGeometry(0.8, 128, 128);

    //材質設定
    let material = new THREE.MeshPhongMaterial({
      color: 0xe4ecfa,
      shininess: 10,
    });

    //光源燈設定
    let lightTop = new THREE.DirectionalLight(0xffffff, 0.7);
    lightTop.position.set(0, 500, 200);
    lightTop.castShadow = true;
    scene.add(lightTop);

    let lightBottom = new THREE.DirectionalLight(0xffffff, 0.25);
    lightBottom.position.set(0, -500, 400);
    lightBottom.castShadow = true;
    scene.add(lightBottom);

    let ambientLight = new THREE.AmbientLight(0x798296);
    scene.add(ambientLight);

    //網面設定 = 幾何 + 材質
    let sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    //Blob數據設定
    let update = () => {
      let time =
          performance.now() *
          0.00001 *
          speedSlider.val() *
          Math.pow(processingSlider.val(), 3),
        spikes = spikesSlider.val() * processingSlider.val();

      for (let i = 0; i < sphere.geometry.vertices.length; i++) {
        let p = sphere.geometry.vertices[i];
        p.normalize().multiplyScalar(
          1 +
            0.3 *
              simplex.noise3D(p.x * spikes, p.y * spikes, p.z * spikes + time)
        );
      }

      sphere.geometry.computeVertexNormals();
      sphere.geometry.normalsNeedUpdate = true;
      sphere.geometry.verticesNeedUpdate = true;
    };

    //調整畫布大小設定
    function resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement;
      // HD-DPI 顯示優化設定
      const pixelRatio = window.devicePixelRatio;
      const width = (canvas.clientWidth * pixelRatio) | 0;
      const height = (canvas.clientHeight * pixelRatio) | 0;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    }

    //動畫執行
    function animate() {
      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }
}

blob();
