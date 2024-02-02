/*Auteur: Michael Moreno*/
let operations = [];
let montantTotal = 0.0;
let reload = false; 


// Fonction pour soumettre le formulaire et l'afficher dans le table
function soumettreFormulaire(event) {
    event.preventDefault(); // Empêche le rechargement de la page


    // Récupère les valeurs du formulaire
    let dateOperation = document.getElementById('dateOperation').value;
    let beneficiaire = document.getElementById('beneficiaire').value;
    let libelleOperation = document.getElementById('libelleOperation').value;
    let montantOperation = parseFloat(document.getElementById('montantOperation').value);
    let justificatifOperation = document.getElementById('justificatifOperation').value;
    // Validation des champs obligatoires
    if (!dateOperation || !beneficiaire || !libelleOperation || isNaN(montantOperation)) {
        alert("Veuillez remplir tous les champs obligatoires.");
        return; // Arrête la soumission du formulaire si la validation échoue
    }
    if (montantOperation < 0) {
        alert("Le montant dois etre positif");
        return; // Arrête la soumission du formulaire si la validation échoue
    }

    let typeOpDep = document.querySelector('input[name="typeOperationDepense"]:checked');
    let typeOpProv = document.querySelector('input[name="typeOperationProvision"]:checked');
    if (typeOpDep){
        var typeOperation = "Depense";
        montantTotal -= montantOperation;
    }
    else if (typeOpProv){
        var typeOperation = "Provision";
        montantTotal += montantOperation;
    }
    document.getElementById('montantDisponible').textContent = montantTotal.toFixed(2);

    // Crée un objet pour représenter l'opération
    let nouvelleOperation = {
        date: dateOperation,
        operation: typeOperation,
        beneficiaire: beneficiaire,
        libelle: libelleOperation,
        montant: montantOperation,
        justificatif: justificatifOperation
    };

    // Ajoute l'opération au tableau d'opérations
    operations.push(nouvelleOperation);

    // Sauvegarde les opérations dans le localStorage
    sauvegarderOperations();

    // Affiche le journal mis à jour
    afficherJournalMensuel();

    // Efface le formulaire après la soumission
    document.getElementById('operationForm').reset();
}

// Fonction pour afficher le journal mensuel 
function afficherJournalMensuel() {
    // Obtient la date actuelle
    let dateActuelle = new Date();

    // Filtrer les opérations du mois courant
    let operationsDuMois = operations.filter(function (operation) {
        let dateOperation = new Date(operation.date);
        return dateOperation.getMonth() === dateActuelle.getMonth() && dateOperation.getFullYear() === dateActuelle.getFullYear();
    });

    // Trie les opérations par date
    operationsDuMois.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
    });

    // Affiche les opérations dans la table
    let tableOperations = document.querySelector('.operations');

    // Vérifie si la table a des lignes existantes
    let hasRows = tableOperations.rows.length > 0;

    // Si la table a des lignes, conserve les en-têtes de colonnes
    if (hasRows) {
        // Supprime toutes les lignes sauf la première (en-tête)
        for (let i = tableOperations.rows.length - 1; i > 0; i--) {
            tableOperations.deleteRow(i);
        }
    } else {
        // Si la table est vide, ajoute l'en-tête des colonnes
        let headerRow = tableOperations.insertRow();
        headerRow.insertCell(0).textContent = "Date";
        headerRow.insertCell(1).textContent = "Operation";
        headerRow.insertCell(2).textContent = "Bénéficiaire";
        headerRow.insertCell(3).textContent = "Libellé";
        headerRow.insertCell(4).textContent = "Montant";
        headerRow.insertCell(5).textContent = "Justificatif";
    }

    // Ajoute les nouvelles lignes
    operationsDuMois.forEach(function (operation) {
        let row = tableOperations.insertRow();
        row.insertCell(0).textContent = operation.date;
        row.insertCell(1).textContent = operation.operation;
        row.insertCell(2).textContent = operation.beneficiaire;
        row.insertCell(3).textContent = operation.libelle;
        row.insertCell(4).textContent = operation.montant;
        row.insertCell(5).textContent = operation.justificatif;
        if (operation.operation=="Depense" && reload){
            montantTotal -= operation.montant;
        }
        else if (operation.operation=="Provision"){
            montantTotal += operation.montant;
        }
        document.getElementById('montantDisponible').textContent = montantTotal.toFixed(2);
    });
    reload = false;
}

window.addEventListener('load', function() {
    // Obtient la date actuelle
    let dateActuelle = new Date();

    // Formatte la date pour correspondre au format attendu par le champ date
    let formatDate = dateActuelle.toISOString().split('T')[0];

    // Définit la valeur du champ date
    document.getElementById('dateOperation').value = formatDate;
});


/***************LOCAL STORAGE *************/
// Fonction pour sauvegarder les opérations dans le localStorage
function sauvegarderOperations() {
    localStorage.setItem('operations', JSON.stringify(operations));
}

// Fonction pour charger les opérations depuis le localStorage
function chargerOperations() {
    reload = true; 
    let operationsStored = localStorage.getItem('operations');
    if (operationsStored) {
        operations = JSON.parse(operationsStored);
        afficherJournalMensuel(); // Met à jour l'affichage après le chargement
    }
}

// Fonction pour effacer les opérations du localStorage
function effacerLocalStorage() {
    confirmer = window.confirm("Effacer TOUS les donnes? Pas possible de les recuperer!");
    if (confirmer){
        localStorage.removeItem('operations');
        operations = []; // Efface également le tableau d'opérations en mémoire
        montantTotal = 0.0;
        document.getElementById('montantDisponible').textContent = montantTotal.toFixed(2);
        afficherJournalMensuel(); // Met à jour l'affichage après la suppression
    }
    else{
        return;
    }
}

// Appelle la fonction de chargement au chargement de la page
window.addEventListener('load', chargerOperations);
