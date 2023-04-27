import { cursorToggle } from "./btn.js";

let selectedObject = null;

const afficherObjetAleatoire = (callback) => {
  // Charger les fichiers JSON
  const bootsPromise = fetch("data/boots.json").then((response) =>
    response.json()
  );
  const beltPromise = fetch("data/belt.json").then((response) =>
    response.json()
  );
  const glovesPromise = fetch("data/gloves.json").then((response) =>
    response.json()
  );
  const helmetPromise = fetch("data/helmet.json").then((response) =>
    response.json()
  );

  // Attendre que les fichiers soient chargés
  Promise.all([bootsPromise, beltPromise, glovesPromise, helmetPromise])
    .then(([bootsData, beltData, glovesData, helmetPromise]) => {
      // Récupérer les objets de type "Boots" et "Belt"
      const boots = bootsData.boots;
      const belts = beltData.belt;
      const gloves = glovesData.gloves;
      const helmet = helmetPromise.helmet;
      const spriteSheetUrl = "assets/spriteSheet.webp";

      // Concaténer les objets dans un seul tableau
      const objects = boots.concat(belts, gloves, helmet);

      // Choisir un objet aléatoire
      const randomIndex = Math.floor(Math.random() * objects.length);
      const object = objects[randomIndex];

      selectedObject = object;
      // Générer les implicites
      const implicits = object.implicit
        .map((implicit) => {
          const value = Math.floor(
            implicit.min + Math.random() * (implicit.max - implicit.min + 1)
          );
          return `${value}${implicit.label}`;
        })
        .join("</p><p>");

      // ------------------------------------------------------------- Affichage des range Implicit
      let implicitValueRange = "";
      // Itérer sur les implicites de l'objet sélectionné
      for (let i in object.implicit) {
        const implicit = object.implicit[i];
        implicitValueRange += `<span class="implicit-range">${implicit.label} min: ${implicit.min} max: ${implicit.max}</span>`;
      }
      // --------------------------------------------------------------------------------------------

      // Créer une chaîne de caractères pour afficher l'objet
      const output = `<div class="object-card">
                  <h2>${object.name}</h2>
                  ${
                    object.imagePosition
                      ? `<div class="object-image" style="background-image: url('${spriteSheetUrl}'); background-position: -${object.imagePosition.x}px -${object.imagePosition.y}px; width: ${object.imagePosition.width}px; height: ${object.imagePosition.height}px;"></div>`
                      : ""
                  }
                  <p>Type: ${object.type}</p>
                  <p>Implicits:</p>
                  <div class="implicits-container">
                    <p>${implicits}</p>
                    <p> ${implicitValueRange}</p>
                  </div>
                  <p>Requires Level: ${object.requirements.level}</p>
                  ${
                    object.requirements.class
                      ? `<p>Requires Class: ${object.requirements.class}</p>`
                      : ""
                  }
                </div>`;

      // Afficher l'objet dans l'élément HTML avec la classe "test"
      const loot = document.querySelector(".item");
      loot.innerHTML = output;
      if (callback) {
        callback();
      }
    })
    .catch((error) => {
      console.error("Une erreur est survenue", error);
    });
};

// Appeler la fonction pour afficher un objet aléatoire
document.getElementById("lootBtn").addEventListener("click", () => {
  afficherObjetAleatoire(() => {
    const objectCard = document.querySelector(".object-card");
    if (objectCard) {
      objectCard.addEventListener("click", changeImplicit);
    } else {
      console.error("'object-card' is undefined");
    }
  });
});

const changeImplicit = () => {
  if (cursorToggle === true) {
    if (selectedObject) {
      // Générer un nouvel implicit pour l'objet sélectionné
      const newImplicits = selectedObject.implicit
        .map((implicit) => {
          // Vérifier si min et max sont égaux, si oui, utiliser la valeur min comme implicit
          if (implicit.min === implicit.max) {
            return `<p>${implicit.min}${implicit.label}</p>`;
          } else {
            const value = Math.floor(
              implicit.min + Math.random() * (implicit.max - implicit.min + 1)
            );
            return `<p>${value}${implicit.label}</p>`;
          }
        })
        .join("");

      // Trouvez le conteneur spécifique des implicites
      const implicitsContainer = document.querySelector(".implicits-container");

      // Mettez à jour le conteneur des implicites avec les nouveaux implicites générés
      if (implicitsContainer) {
        implicitsContainer.innerHTML = newImplicits;
      } else {
        console.error("Le conteneur d'implicites n'a pas été trouvé");
      }
    } else {
      console.error("Aucun objet sélectionné");
    }
  } else {
    console.error(
      "cursorToggle is false click, choose a component if you want to change the value of an item"
    );
  }
};
