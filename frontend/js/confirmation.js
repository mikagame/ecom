let orderId = localStorage.getItem('orderId');
let orderPrice = localStorage.getItem('orderPrice');
let infoClient = JSON.parse(localStorage.getItem('cont'));
console.log(orderId);


/*document.getElementById('confirm').innerHTML =  "Cher " + infoClient.firstName + ", nous avons le plaisir de vous confirmer votre commande";
document.getElementById('result').innerHTML =  "Voici l'id de votre commande : <br><br>"   + orderId + "<br><br> pour un montant total de : " + orderPrice + ".00 €.";
document.getElementById('thanks').innerHTML = "Toute l'équipe Orinoco vous remercie pour votre confiance, et vous dit à bientôt."*/

function textConfirm() {
    terminate.innerHTML = 
    `
        <p>Cher ${infoClient.firstName}, nous avons le plaisir de vous confirmer votre commande.</p>
        <p>Voici l'id de votre commande : </p>
        <h1>${orderId}</h1>
        <p>Pour un total de : </p>
        <h2>${orderPrice}.00 €</h2>
        <p>Toute l'équipe Orinoco vous remercie pour votre confiance, et vous dit à bientôt.</p>
    `
}

textConfirm();