// Lien de données JSON
const json_data = 'https://api.themoviedb.org/3/movie/upcoming?language=fr-FR&region=FR&include_adult=false&api_key=a9d73722dee06410f25de86c66ef1722';

// Div parent
const bigcontainer = document.getElementById('big-container');

fetch(json_data)
    .then(response => response.json())
    .then(data => {
        // Parcours de nos données JSON avec forEach
        data.results.forEach(film => {
            // On exclut les films sans description et sans image
            if (film.overview !== "" && film.poster_path !== "" && film.original_title !== "" && film.poster_path.complete !== 0) {

                // Stocker les données qui nous intéressent dans des variables
                const description = film.overview;
                const image = film.poster_path;
                const titre = film.original_title;

                // Création d'une nouvelle div enfant
                const Container = document.createElement('div');
                // Ajouter la classe 'container' à ce Container
                Container.classList.add('container')
                // Création de la balise image
                const imageElement = document.createElement('img');
                // Pour contourner les CROSS sans proxy ( uniquement en hebergement)
                imageElement.crossOrigin = 'anonymous';
                // Ajouter un src (chemin) et un alt
                imageElement.src = `https://image.tmdb.org/t/p/w400/${image}`;
                imageElement.alt = titre;
                // Ajouter la classe 'affiche' à l'image
                imageElement.classList.add('poster');

                // On commence par charger l'image puis on va vérifier !
                imageElement.addEventListener('load', handleImageLoad);

                // Vérifions que l'image s'est bien chargée
                if (imageElement.complete && imageElement.naturalHeight !== 0) {
                  // Code à exécuter si l'image est déjà chargée
                  handleImageLoad();
                }

                function handleImageLoad() {
                  // Code à exécuter lorsque l'image est chargée avec succès
                  console.log('L\'image s\'est chargée correctement.');
                  // Autres actions à effectuer après le chargement de l'image
                
                // Utilisation de Color Thief pour extraire les couleurs de l'image , on instancie l'object avec le mot clé new
                const colorThief = new ColorThief();


                // if (imageElement.complete && imageElement.naturalHeight !== 0) {
                  // fonction qui va ecouté le load , quand l'image se charge !
                  imageElement.addEventListener('load', () => {

                          const dominantColor = colorThief.getColor(imageElement); // Couleur dominante
                          const palette = colorThief.getPalette(imageElement, 3); // Palette de couleurs (3 couleurs)

                         
                  // Appliquer les couleurs aux éléments de la carte en mode  :

                          // Fond de la carte
                          Container.style.backgroundColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
                          // Contour de la carte
                          Container.style.borderColor = `rgb(${palette[1][0]}, ${palette[1][1]}, ${palette[1][2]})`;
                          // Titre du film
                          titleElement.style.color = `rgb(${palette[1][2]}, ${palette[1][0]}, ${palette[1][1]})`;
                          // Description du film
                          texteElement.style.color = `rgb(${palette[1][2]}, ${palette[1][0]}, ${palette[1][1]})`;
                    });
                  }
                 

                // Création d'une div avec la classe 'description' qui regroupera une balise titre H1 et une balise paragraphe (que nous allons créer également)
                const informationDiv = document.createElement('div');
                informationDiv.classList.add('information');

                // Création du titre H1
                const titleElement = document.createElement('h1');
                titleElement.classList.add('title');
                // titleElement.style.color = '#282823';
                titleElement.textContent = titre;

                // Création du paragraphe
                const texteElement = document.createElement('p');
                texteElement.classList.add('texte');
                // texteElement.style.color = '#282823';
                texteElement.textContent = description;

                // utilisation de la fonction appendChild pour ajouter le titre H1 et le paragraphe à notre div 'description'
                informationDiv.appendChild(titleElement);
                informationDiv.appendChild(texteElement);
                // ajouter la div 'description' et l'image contenant la classe 'affiche' à notre div enfant 'filmContainer'
                Container.appendChild(imageElement);
                Container.appendChild(informationDiv);
                // ajouter le tout à notre div parent qui a pour class 'big-container'
                bigcontainer.appendChild(Container);
            }
        });
    })
    .catch(error => console.error(error));