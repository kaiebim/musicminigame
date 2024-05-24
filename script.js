// script.js
import { letras } from './musicas.js';

let datetime = Math.floor(new Date().getTime() / (1000 * 60 * 60 * 24)) - 19867;
let insira = document.getElementById("nome");
let button = document.getElementById("button");
let musica = document.getElementById("musica").innerHTML = letras[datetime].musica
let artista = document.getElementById("artista").innerHTML = letras[datetime].artista

insira.addEventListener("keypress", function(event) {
    if ((event.key === "Enter") && (insira.value !== '')) {
        event.preventDefault();
        pog();
    }
});

let a = 0;
let strings = [];
let certa = letras[datetime].letra;  // Usando a primeira música do array letras



function pog() {
    console.log(datetime);
    
    let certo = document.getElementById("certo");
    
    let real = document.createElement("p");
    insira.placeholder = `Insira o ${a + 1}° verso`;
    strings[a] = insira.value;
    real.innerHTML = certa[a];
    checar(a, certa);
    a++;
    insira.value = '';
    
    certo.appendChild(real);
}

function checar(n, r) {
    let container = document.getElementById("inputs");
    let p = document.createElement("p");
    let str1 = strings[n].toLowerCase().replace(/[\s,!?.;:*]/g, '');
    let str2 = r[n].toLowerCase().replace(/[\s,!?.;:*]/g, '');
    let differences = findDifferences(str1, str2);
    
    if (differences.length > 0) {
        p.classList.add("errou");
    } else {
        p.classList.add("acertou");
    }
    
    p.innerHTML = insira.value;
    container.appendChild(p);
}

function findDifferences(str1, str2) {
    let differences = [];
    let length = Math.max(str1.length, str2.length);

    for (let i = 0; i < length; i++) {
        if (str1[i] !== str2[i]) {
            if (str1[i] !== undefined) differences.push(str1[i]);
            if (str2[i] !== undefined) differences.push(str2[i]);
        }
    }

    return differences;
}

window.pog = pog;
