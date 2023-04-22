const afficherObjetAleatoire = () => {
  // Charger les fichiers JSON
  const bootsPromise = fetch("data/boots.json").then((response) =>
    response.json()
  );
  const beltPromise = fetch("data/belt.json").then((response) =>
    response.json()
  );

  // Attendre que les deux fichiers soient chargés
  Promise.all([bootsPromise, beltPromise])
    .then(([bootsData, beltData]) => {
      // Récupérer les objets de type "Boots" et "Belt"
      const boots = bootsData.boots;
      const belts = beltData.belt;

      // Concaténer les objets dans un seul tableau
      const objects = boots.concat(belts);

      // Choisir un objet aléatoire
      const randomIndex = Math.floor(Math.random() * objects.length);
      const object = objects[randomIndex];

      // ...

      // Vérifier si l'objet est une paire de bottes ou une ceinture
      let additionalImplicitString = "";
      let extraString = "";
      if (object.type === "Boots") {
        const implicit = object.implicit[1];
        if (
          implicit.hasOwnProperty("min") &&
          implicit.hasOwnProperty("max") &&
          implicit.hasOwnProperty("label")
        ) {
          const minSpeed = implicit.min;
          const maxSpeed = implicit.max;
          const speed = Math.floor(
            minSpeed + Math.random() * (maxSpeed - minSpeed + 1)
          );
          additionalImplicitString = `<p>${speed}${implicit.label}</p>`;
        }
        if (object.implicit.length > 2) {
          const extra = object.implicit[2];
          if (
            extra.hasOwnProperty("min") &&
            extra.hasOwnProperty("max") &&
            extra.hasOwnProperty("label")
          ) {
            const minExtra = extra.min;
            const maxExtra = extra.max;
            const extraValue = Math.floor(
              minExtra + Math.random() * (maxExtra - minExtra + 1)
            );
            extraString = `<p>${extraValue}${extra.label}</p>`;
          }
        }
      }

      // Créer une chaîne de caractères pour afficher l'objet
      const output = `<div class="object-card">
                  <h2>${object.name}</h2>
                  <p>Type: ${object.type}</p>
                  <p>Implicits:</p>
                  <p>${object.implicit[0]}</p>
                  ${additionalImplicitString}
                  ${extraString}
                  <p>Requirements: Level ${object.requirements.level}</p>
                </div>`;

      // ...

      // Afficher l'objet dans l'élément HTML avec la classe "test"
      const testDiv = document.querySelector(".item");
      testDiv.innerHTML = output;
    })
    .catch((error) => {
      console.error("Une erreur est survenue", error);
    });
};

// Appeler la fonction pour afficher un objet aléatoire
afficherObjetAleatoire();
