/*const url = "http://localhost:3000/api/teddies";*/
const url = "https://projet5oc.herokuapp.com/api/teddies";


let memory = JSON.parse(localStorage.getItem('article'));
let totalCommand = 0;

if (!memory) {
    infoCart.innerHTML = "Votre panier Oriteddy est vide";
    row.innerHTML = "";
    document.getElementById('clearCart').innerHTML = "";
    second.innerHTML = "";
}

memory.forEach(element => {
   
    fetch(url + "/" + element.id)
        .then(resp => resp.json())
        .then(data => {

            let rowCommand = document.createElement('div');
            let nameCommand = document.createElement('p');
            let colorCommand = document.createElement('p');
            let quantityCommand = document.createElement('p')
            let priceCommand = document.createElement('p');

            rowCommand.setAttribute('class', 'rowCommand');
            nameCommand.innerHTML = data.name;
            colorCommand.innerHTML = element.color;
            quantityCommand.innerHTML = element.quantity;
            priceCommand.innerHTML = (data.price * 0.01 * element.quantity) + ".00 €";
            command.appendChild(rowCommand).appendChild(nameCommand);
            command.appendChild(rowCommand).appendChild(colorCommand);
            command.appendChild(rowCommand).appendChild(quantityCommand);
            command.appendChild(rowCommand).appendChild(priceCommand);
            totalCommand = (data.price * 0.01 * element.quantity) + totalCommand;
            document.getElementById('total').innerHTML = "Montant total : " + totalCommand + ".00 €";
        })

    // *** Données renseignées par utilisateur *** 
    let firstNameInput = document.getElementById('firstName');
    let lastNameInput = document.getElementById('lastName');
    let addressInput = document.getElementById('address');
    let cityInput = document.getElementById('city');
    let emailInput = document.getElementById('email');


    // *** vider le panier ***
    function clearCart() {
        memory = [];
        localStorage.clear();
        command.innerHTML = "";
        infoCart.innerHTML = "Votre panier Oriteddy est vide";
        document.getElementById('total').innerHTML = "";
        row.innerHTML = "";
        document.getElementById('clearCart').innerHTML = "";
        second.innerHTML = "";
    };

    document.getElementById('clearCart').addEventListener('click', clearCart)


    // *** tableau des id pour requête POST ***
    let memoryId = [];
    memory.forEach(element => {
        memoryId.push(element.id)
    })
 
// *** Passer commande ***
    function orderConfirm() {

        
        // *** Vérification que les champs soient renseignés ***
        if (
            !firstNameInput.value ||
            !lastNameInput.value ||
            !addressInput.value ||
            !cityInput.value ||
            !emailInput.value
        ) {
            //erreur
            alert("Vous devez renseigner tous les champs  pour valider votre commande");
        } 

        if(!emailInput.validity.valid) {
            document.getElementById('email').classList.add('badEmail');
            emailInput.value = "";
        }
        
        
        if(
            firstNameInput.validity.valid &&
            lastNameInput.validity.valid &&
            addressInput.validity.valid &&
            cityInput.validity.valid &&
            emailInput.validity.valid
        ) {
            // *** création objet { valeur des inputs et id des produits }
          
            const request = {
                contact: {
                    firstName: firstNameInput.value,
                    lastName: lastNameInput.value,
                    address: addressInput.value,
                    city: cityInput.value,
                    email: emailInput.value,
                },
                products: memoryId,
            };
            /* *** Requête POST pour récupérer et envoyer : (orderId et prix total de la commande)
                   à la page confiramtion.html *** */
            fetch(url + "/order", {
                method: 'POST',
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(rep => rep.json())
                .then(value => {
                    console.log(value)
                    localStorage.clear();
                    localStorage.setItem('cont', JSON.stringify(request.contact));
                    localStorage.setItem("orderId", value.orderId);
                    localStorage.setItem('orderPrice', totalCommand);
                    document.location.href = "confirmation.html";
                })
        } else {
            
                //erreur
                alert("Vous devez renseigner des données valides");
            
        }
    }
    document.getElementById('submit').addEventListener('click', orderConfirm);
});