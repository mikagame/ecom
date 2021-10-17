/*import {up} from './index';
window.onscroll = function() {up()};*/

/*const url = "http://localhost:3000/api/teddies";    // *** URL API projet OC *** */
const url = "https://projet5oc.herokuapp.com/api/teddies"; // *** URL API sur heroku ***

// *** Récupération id ***

const searchParams = window.location.search;
const urlParams = new URLSearchParams(searchParams);
const id = urlParams.get("id");

function oneProduct(data) {
    only.innerHTML =
        `<img src="${data.imageUrl}" alt="#"/>
        <div id="text">
            <p>${data.name}</p>
            <p>${data.price / 100}.00 €</p>
            <p>${data.description}</p>
            <label for="color">Couleur :
                <select id="selectColor"></select>
            </label>
            <label for="quantity">Quantité
                <input id="quantity" type="number" min="1" value="1">
            </label>
            <div id="btnZone">
                <p id="addTeddy">Ajouter</p>
                <a href="../index.html">Accueil</a>
            </div>
        </div>`

    data.colors.forEach(element => {
        const choiceColor = document.createElement('option');
        choiceColor.innerHTML = element;
        document.getElementById('selectColor').appendChild(choiceColor)
    });
}

// *** Création ourson choisi ***
fetch(url + "/" + id)
    .then(response => response.json())
    .then(data => {
        oneProduct(data);
        // *** ajouter au panier ***
        function addCart() {
            let quantity = document.getElementById('quantity');
            let color = document.getElementById('selectColor');

            // *** converti les données JSON en objet JS ***
            let memory = JSON.parse(localStorage.getItem('article')); 

            // *** création objet teddy (id, quantité, couleur) ***
            let teddyObject = {
                id: data._id,
                quantity: quantity.value,
                color: color.value
            };

            // *** popup ajout au panier ***
            document.getElementById('info').classList.add('new');
            setTimeout(function () {
                info.classList.remove('new');
            }, 2500);

            // *** si localStorage contient un objet => ajout du nouvel objet au tableau ***
            
            let c = 0;
            if (memory) {
                memory.forEach((element, index) => {

            // *** et si id && couleur existe déjà => remplacer ligne existante pour màj quantité ***
                    if (element.id == teddyObject.id && element.color == teddyObject.color) {
                        let a = JSON.parse(element.quantity);
                        let b = JSON.parse(teddyObject.quantity);
                        c = index + 1;
                        element.quantity = 0;
                        teddyObject.quantity = a + b;
                    }
                }

                );
                if (c > 0) {
                    memory.splice(c - 1, 1, teddyObject)
                    localStorage.setItem('article', JSON.stringify(memory));
                } else {
                    memory.push(teddyObject);
                    localStorage.setItem('article', JSON.stringify(memory));
                }
                // *** si localStorage vide : création tableau & ajout objet teddy ***
            } else {
                memory = [];
                memory.push(teddyObject);
                localStorage.setItem("article", JSON.stringify(memory));
            }
        };
        // addTeddy.addEventListener('click', addCart); 
        document.getElementById('addTeddy').addEventListener('click', addCart);

    })
.catch(function(error) {
  const err = document.createElement('div');
  err.setAttribute('id', 'erreur');
  err.innerHTML = "Une erreur est survenue à la récupération des données";
  only.appendChild(err);
});

             




