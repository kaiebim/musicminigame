
let p = document.getElementById("fake");
let real = document.getElementById("real");
let diferente = document.getElementById("diferente");
let insira = document.getElementById("nome");
let label = document.getElementById("label");
let a = 1;
let strings = [];
let certa = [
    "Eu quis amar, mas tive medo",
    "E quis salvar meu coração",
    "Mas o amor sabe um segredo",
    "O medo pode matar o seu coração",
    "Água de beber",
    "Água de beber, camará",
    "Água de beber",
    "Água de beber, camará",
    "Eu nunca fiz coisa tão certa",
    "Entrei pra escola do perdão",
    "A minha casa vive aberta",
    "Abri todas as portas do coração",
    "Água de beber",
    "Água de beber, camará",
    "Água de beber",
    "Água de beber, camará",
    "Eu sempre tive uma certeza",
    "Que só me deu desilusão",
    "É que o amor é uma tristeza",
    "Muita mágoa, demais para um coração",
    "Água de beber",
    "Água de beber, camará",
    "Água de beber",
    "Água de beber, camará"
];

function pog() {
    label.innerHTML = `Insira o ${a+1}° verso`;
    strings[a] = insira.value;
    p.innerHTML += insira.value + "<br>";
    real.innerHTML += certa[a-1] + "<br>";
    checar(a, certa);
    a++;
    insira.value = '';
}

function checar(n, r) {
    let diferences = "";
    let tocheck = strings[n].toLowerCase().replace(/[\s,!?.;:*]/g, '');
    let togarant = r[n-1].toLowerCase().replace(/[\s,!?.;:*]/g, '');
    let maxLength = Math.max(tocheck.length, togarant.length);

    for (let i = 0; i < maxLength; i++) {
        if (tocheck[i] !== togarant[i]) {
            diferences += tocheck[i] || togarant[i] || '';
        }
    }
    console.log(tocheck, togarant, diferences);
    diferente.innerHTML += `Diferenças no verso ${n}: ${diferences}` + "<br>";
    return diferences;
}
