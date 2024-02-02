
function factoriel(event) {
    event.preventDefault();
    let introduced = document.getElementById("numerito").value;

    if(introduced >0){
        let factors = introduced-1;
        while (factors > 0){
            introduced *= factors;
            factors-=1;
        }
        document.getElementById("result").innerHTML=introduced;
    }
    else{
        document.getElementById("result").innerHTML="Nombre doit etre plus que 0";
    }
}
