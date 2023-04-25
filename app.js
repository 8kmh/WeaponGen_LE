// import { cursorToggle, toggleCursor } from "./btn.js";

const afficherObjetAleatoire = () => {
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

      // Générer les implicites
      const implicits = object.implicit
        .map((implicit) => {
          const value = Math.floor(
            implicit.min + Math.random() * (implicit.max - implicit.min + 1)
          );
          return `${value}${implicit.label}`;
        })
        .join("</p><p>");

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
                        <p>${implicits}</p>
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
    })
    .catch((error) => {
      console.error("Une erreur est survenue", error);
    });
};

// Appeler la fonction pour afficher un objet aléatoire
document.getElementById("lootBtn").addEventListener("click", () => {
  afficherObjetAleatoire();
});
