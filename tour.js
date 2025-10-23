var viewer = new Marzipano.Viewer(document.getElementById('pano'));

var scenes = [
  {
    id: "rumtek",
    title: "Rumtek Monastery",
    image: "images/rumtek.jpg",
    description: "Seat of the Karmapa, Kagyu sect."
  },
  {
    id: "tashiding",
    title: "Tashiding Monastery",
    image: "images/tashiding.jpg",
    description: "Sacred hilltop monastery, Bhumchu festival."
  },
  {
    id: "pemayangtse",
    title: "Pemayangtse Monastery",
    image: "images/pemayangtse.jpg",
    description: "Oldest Nyingma monastery, Zangdok Palri model."
  },
  {
    id: "enchey",
    title: "Enchey Monastery",
    image: "images/enchey.jpg",
    description: "Cham dance, protective deities."
  },
  {
    id: "dubdi",
    title: "Dubdi Monastery",
    image: "images/dubdi.jpg",
    description: "Oldest monastery, coronation site."
  }
];

var currentScene;

function createScene(sceneData) {
  var source = Marzipano.ImageUrlSource.fromString(sceneData.image);
  var geometry = new Marzipano.EquirectGeometry([{ width: 4000 }]);
  var view = new Marzipano.RectilinearView();
  var scene = viewer.createScene({ source, geometry, view });

  var hotspot = document.createElement("div");
  hotspot.className = "hotspot";
  hotspot.innerText = sceneData.title + ": " + sceneData.description;
  scene.hotspotContainer().createHotspot(hotspot, { yaw: 0, pitch: 0 });

  return scene;
}

function switchScene(sceneData) {
  if (currentScene) currentScene.destroy();
  currentScene = createScene(sceneData);
  currentScene.switchTo();
}

var menu = document.getElementById("sceneSelector");
scenes.forEach(function(sceneData) {
  var button = document.createElement("button");
  button.innerText = sceneData.title;
  button.onclick = function() {
    switchScene(sceneData);
  };
  menu.appendChild(button);
});

switchScene(scenes[0]);
