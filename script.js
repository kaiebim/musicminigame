import { letras } from "./musicas.js";
let QualUsar = Math.floor(Math.random() * letras.length);
let QualParte = Math.floor(Math.random() * letras[QualUsar].letra.length);
let attempt = 0;
let coracoes = ['&#10084;', '&#10084;', '&#10084;', '&#10084;', '&#10084;', '&#10084;', '&#10084;', '&#10084;', '&#10084;', '&#10084;'];
let pontuacao = 0;

let v = [elemento("v1"), elemento("v2"), elemento("v3"), elemento("v4")];

let t = [elemento("t1"), elemento("t2"), elemento("t3"), elemento("t4"), elemento("t5"), elemento("t6"), elemento("t7"), elemento("t8"), elemento("t9"), elemento("t10")]

let qualt = t[0];
let dicacase = 0;
let pdica = elemento("dica");

//FERRAMENTAS
function elemento(qual){
    return document.getElementById(qual);
}

function formatar(oque){
    return oque.toLocaleLowerCase().replace(/[\s,-\/]/g, '').replace(/[ãáàâä]/g, "a").replace(/[éêèë]/g, "e").replace(/[íìîï]/g, "i").replace(/[ôõóòö]/g, "o").replace(/[ûúùü]/g, "u").replace(/[ç]/g, "c");
}

//GAMEPLAY
function selecionarMusicaAleatoria() {
    QualUsar = Math.floor(Math.random() * letras.length);
    QualParte = Math.floor(Math.random() * letras[QualUsar].letra.length);
    v[0].innerText = letras[QualUsar].letra[QualParte][0];
}

function resetarJogo() {
    attempt = 0;
    dicacase = 0;
    pdica.innerText = null;
    pdica.style.display = "none";

    t.forEach((t) => {
        t.innerHTML = "______________________";
        t.classList.remove("dica");
    });
    v.forEach((v) => {
        v.innerHTML = "•••••••••••••••••••••••••••••••••••••••••••••";
        if (v!==elemento("v1")){
            v.classList.add("nonvisible");
        }
    })
    elemento("btn-dica").style.display = "none";


    v[0].innerText = letras[QualUsar].letra[QualParte][0];

    qualt = t[0];

    document.querySelector(".title").scrollIntoView({ behavior: "smooth", block: "start" });
    elemento("textopontuacao").innerHTML = "pontuação atual: " + pontuacao;
}

v[0].innerText = letras[QualUsar].letra[QualParte][0];
let input = elemento("nome");

input.addEventListener("keypress", function (event) {
    if ((event.key === "Enter") && (input.value !== '')) {
        inputed();
        input.value = '';
    }
});

function attempted() {
    qualt = t[attempt-1];
    if (attempt <= 3){ 
        v[attempt].classList.remove("nonvisible")
        v[attempt].innerText = letras[QualUsar].letra[QualParte][attempt]
    }
    if (attempt === 1) elemento("btn-dica").style.display = "block";
}

function inputed() {
    let responseInput = formatar(input.value);
    let responseMusica = formatar(letras[QualUsar].musica);
    console.log(responseInput, responseMusica);
    attempt += 1;
    attempted();
    qualt.innerHTML = input.value;
    if (responseInput === responseMusica) {
        pontuacao++;
        window.alert("Parabéns! \npontuação atual: " + pontuacao + "\nvidas: " + (coracoes.length));
        selecionarMusicaAleatoria();
        resetarJogo();
    }
    else {
        if (coracoes.length > 1) {
            errou();
        }
        else {
            window.alert("A música era " + letras[QualUsar].musica);
            window.location.reload();
            elemento("hearts").innerHTML = "VOCÊ PERDEU";
        }
    }

    qualt.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => {
        document.querySelector(".title").scrollIntoView({ behavior: "smooth", block: "start" });
    }, 750);
}

function errou(){
    coracoes.pop();
    elemento("hearts").innerHTML = coracoes.join('');
    let toanime = [document.querySelector('.tentativas'),document.querySelector('.versos'),
        document.querySelector('#hearts'),pdica,elemento("textopontuacao"),
        document.querySelector('.title')]
    toanime.forEach((i)=>{
        i.classList.add('shake');
    })
    
    setTimeout(() => {
        toanime.forEach((i)=>{
            i.classList.remove('shake');
        })
    }, 500);

}

//DICA

function DICA(qual) {
    pdica.style.display = "none";
    switch (qual) {
        case 1:
            pdica.innerHTML += "Autor da música: " + letras[QualUsar].artista + "<br>";
            break;
        case 2:
            var nomeMusica = letras[QualUsar].musica.toLocaleLowerCase().replace(/[,-abcdefghijklmnopqrstuvwxyzãáàâäéêèëíìîïôõóòöûúùü]/g, "•");
            pdica.innerHTML += "Letras da música: " + nomeMusica + "<br>";
            break;
        case 3:
            console.log(letras[QualUsar].musica)
            var nomeMusica = letras[QualUsar].musica.toLocaleLowerCase().replace(/[^\s,-/aeiouáéíóúàèìòùâêîôûäëïöüãõ]/g, "•");
            console.log(letras[QualUsar].musica.toLocaleLowerCase().replace(/[^,-/aeiouáéíóúàèìòùâêîôûäëïöüãõ]/g, "•"));
            pdica.innerHTML += "Vogais da música: " + nomeMusica.replace(/\s/g, "&nbsp;") + "<br>";
            break;
    }




    pdica.style.display = "block";
    pdica.scrollIntoView({ behavior: "smooth", block: "start" });
    pdica.classList.add('cabum');
    setTimeout(() => {
        pdica.classList.remove('cabum');
        document.querySelector(".title").scrollIntoView({ behavior: "smooth", block: "start" });
    }, 1000);
    if (qual === 3) {
        elemento("btn-dica").style.display = "none";
    }
}

elemento('btn-dica').addEventListener('click', function () {
    if ((attempt < 10) && (attempt > 0)) {
        exibirHintPopup();
    }
});

function exibirHintPopup() {
    let hintPopup = elemento("hint-popup");
    var textoRestante = elemento("dicarestante")
    textoRestante.innerHTML = "Você quer obter uma dica em troca de uma vida? <br> Você tem " + (3 - dicacase) + " dicas restantes"
    hintPopup.style.display = "block";
}

elemento('hint-yes').addEventListener('click', function () {
    elemento('hint-popup').style.display = 'none';
    attempt += 1;
    attempted();
    qualt.innerHTML = "Dica";
    qualt.classList.add("dica");
    dicacase++;
    DICA(dicacase);
    if (coracoes.length > 1) {
        errou();
    }
    else {
        window.alert("A música era " + letras[QualUsar].musica);
        window.location.reload();
        elemento("hearts").innerHTML = "VOCÊ PERDEU";
    }
});

elemento('hint-no').addEventListener('click', function () {
    elemento('hint-popup').style.display = 'none';
});


// INICIO
window.onload = function () {
    exibirPopup();
    selecionarMusicaAleatoria();
    resetarJogo();
};

function exibirPopup() {
    let popup = elemento('popup');
    popup.style.display = 'block';
}

let btnOk = document.querySelector('#popup button');
btnOk.addEventListener('click', function () {
    let popup = elemento('popup');
    popup.style.display = 'none';
});
