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

  // Attendre que les deux fichiers soient chargés
  Promise.all([bootsPromise, beltPromise, glovesPromise])
    .then(([bootsData, beltData, glovesData]) => {
      // Récupérer les objets de type "Boots" et "Belt"
      const boots = bootsData.boots;
      const belts = beltData.belt;
      const gloves = glovesData.gloves;

      // Concaténer les objets dans un seul tableau
      const objects = boots.concat(belts, gloves);

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
                        <p>Type: ${object.type}</p>
                        <p>Implicits:</p>
                        <p>${implicits}</p>
                        <p>Requires: Level ${object.requirements.level}</p>
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
