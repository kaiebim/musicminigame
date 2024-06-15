import { letras } from "./musicas.js";
let QualUsar = Math.floor(Math.random() * letras.length);
let QualParte = Math.floor(Math.random() * letras[QualUsar].letra.length);
let attempt = 0;
let coracoes = ['&#10084;','&#10084;','&#10084;','&#10084;','&#10084;'];

let v1 = document.getElementById("v1"),
    v2 = document.getElementById("v2"),
    v3 = document.getElementById("v3"),
    v4 = document.getElementById("v4"),
    v5 = document.getElementById("v5");

let t1 = document.getElementById("t1"),
    t2 = document.getElementById("t2"),
    t3 = document.getElementById("t3"),
    t4 = document.getElementById("t4"),
    t5 = document.getElementById("t5");

v1.innerText = letras[QualUsar].letra[QualParte][0];

let input = document.getElementById("nome");
input.addEventListener("keypress",function(event){
    if ((event.key === "Enter")&&(input.value !== '')){
        inputed();
        input.value = '';
    }
})

function inputed(){
    let responseInput = input.value.toLocaleLowerCase().replace(/[\s,-\/]/g,'').replace(/[ãáàâä]/g,"a").replace(/[éêèë]/g,"e").replace(/[íìîï]/g,"i").replace(/[ôõóòö]/g,"o").replace(/[ûúùü]/g,"u");
    let responseMusica = letras[QualUsar].musica.toLocaleLowerCase().replace(/[\s,-\/]/g,'').replace(/[ãáàâä]/g,"a").replace(/[éêèë]/g,"e").replace(/[íìîï]/g,"i").replace(/[ôõóòö]/g,"o").replace(/[ûúùü]/g,"u");
    console.log(responseInput,responseMusica);
    attempt += 1
    console.log(attempt)
    if (responseInput === responseMusica)
        window.alert("ACERTOUOUOUOUOU")
    else{
        if (attempt < 5){
        coracoes[attempt - 1] = ''
        document.getElementById("hearts").innerHTML = (coracoes[0]+coracoes[1]+coracoes[2]+coracoes[3]+coracoes[4])
        }
        else
            document.getElementById("hearts").innerHTML = "VOCÊ PERDEU";
    }
    switch (attempt){
        case 1:
            t1.innerHTML = input.value;
            t1.scrollIntoView({ behavior: "smooth", block: "start" });
            v2.classList.remove("nonvisible");
            v2.innerText = letras[QualUsar].letra[QualParte][1];
            break;
        case 2:
            t2.innerHTML = input.value;
            t2.scrollIntoView({ behavior: "smooth", block: "start" });
            v3.classList.remove("nonvisible");
            v3.innerText = letras[QualUsar].letra[QualParte][2];
            break;
        case 3:
            t3.innerHTML = input.value;
            t3.scrollIntoView({ behavior: "smooth", block: "start" });
            v4.classList.remove("nonvisible");
            v4.innerText = letras[QualUsar].letra[QualParte][3];
            break;
        case 4:
            t4.innerHTML = input.value;
            t4.scrollIntoView({ behavior: "smooth", block: "start" });
            v5.classList.remove("nonvisible");
            v5.innerText = letras[QualUsar].artista;
            break;
        case 5:
            t5.scrollIntoView({ behavior: "smooth", block: "start" });
            t5.innerHTML = input.value;
            break;
    }
}

window.onload = function() {
    exibirPopup();
};
function exibirPopup() {
    let popup = document.getElementById('popup');
    popup.style.display = 'block';
}

let btnOk = document.querySelector('#popup button');
btnOk.addEventListener('click', function() {
    let popup = document.getElementById('popup');
    popup.style.display = 'none';
});

