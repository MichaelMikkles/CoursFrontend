function ajouter(event){
    event.preventDefault();
    let table = document.getElementById("annuaire");
    let nom=document.getElementById("Nom").value;
    let prenom=document.getElementById("Prenom").value;
    let tel=document.getElementById("Telephone").value;
    let mail=document.getElementById("Mail").value;
    let row = table.insertRow(1);

    let cellNom = row.insertCell(0);
    let cellPrenom = row.insertCell(1);
    let cellTel = row.insertCell(2);
    let cellMail = row.insertCell(3);
    let cellMod = row.insertCell(4);
    let cellSuppr = row.insertCell(5);
    
    cellNom.innerHTML = nom;
    cellPrenom.innerHTML = prenom;
    cellTel.innerHTML = tel;
    cellMail.innerHTML = mail;

    cellMod.classList.add("mod");

    let buttonMod = document.createElement("button");
    buttonMod.innerHTML = "Modifier";
    buttonMod.addEventListener("click", function(){
        console.log("holi");
    });

    cellSuppr.classList.add("elim");

    let buttonSuppr = document.createElement("button");
    buttonSuppr.innerHTML = "Supprimer";
    buttonSuppr.addEventListener("click", function(){
        supprimerLigne(this);
    });

    cellMod.appendChild(buttonMod);
    cellSuppr.appendChild(buttonSuppr);
}

function supprimerLigne(button){
    var row = button.parentNode.parentNode;

    var table = document.getElementById("annuaire");

    var rowIndex = row.rowIndex;
    table.deleteRow(rowIndex);
}

/*********** LOCAL STORAGE ***********/
function guardarFilaEnLocalStorage(){

}

function cargarFilaLocalStorage(){

}
 /************ FIN LOCAL STORAGE  ***********/

document.getElementById('adder').addEventListener('click', function() {
    //Montrer ou cacher le formulaire pour envoyer les donnes
    var form = document.querySelector('form');
    form.style.display = (form.style.display === 'none' || form.style.display === '') ? 'flex' : 'none';
});

