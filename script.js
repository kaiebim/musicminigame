import { letras } from "./musicas.js";
let QualUsar = Math.floor(Math.random() * letras.length);
let QualParte = Math.floor(Math.random() * letras[QualUsar].letra.length);
let attempt = 0;
let coracoes = ['&#10084;', '&#10084;', '&#10084;', '&#10084;', '&#10084;', '&#10084;', '&#10084;', '&#10084;', '&#10084;', '&#10084;'];
let pontuacao = 0;

let v1 = elemento("v1"),
    v2 = elemento("v2"),
    v3 = elemento("v3"),
    v4 = elemento("v4");

let t1 = elemento("t1"),
    t2 = elemento("t2"),
    t3 = elemento("t3"),
    t4 = elemento("t4"),
    t5 = elemento("t5"),
    t6 = elemento("t6"),
    t7 = elemento("t7"),
    t8 = elemento("t8"),
    t9 = elemento("t9"),
    t10 = elemento("t10");

let qualt = t1;
let dicacase = 0;
let pdica = elemento("dica");

//FERRAMENTAS
function elemento(qual){
    return document.getElementById(qual);
}

//GAMEPLAY
function selecionarMusicaAleatoria() {
    QualUsar = Math.floor(Math.random() * letras.length);
    QualParte = Math.floor(Math.random() * letras[QualUsar].letra.length);
    v1.innerText = letras[QualUsar].letra[QualParte][0];

    qualt = t1;
}

function resetarJogo() {
    attempt = 0;
    dicacase = 0;
    pdica.innerText = null;
    pdica.style.display = "none";

    let tentativas = [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10];
    tentativas.forEach((tentativa) => {
        tentativa.innerHTML = "______________________";
        tentativa.classList.remove("dica");
    });
    let v = [v2, v3, v4]
    v.forEach((v) => {
        v.innerHTML = "•••••••••••••••••••••••••••••••••••••••••••••"
    })

    v2.classList.add("nonvisible");
    v3.classList.add("nonvisible");
    v4.classList.add("nonvisible");
    elemento("btn-dica").style.display = "none";


    v1.innerText = letras[QualUsar].letra[QualParte][0];

    qualt = t1;

    document.querySelector(".title").scrollIntoView({ behavior: "smooth", block: "start" });
    elemento("textopontuacao").innerHTML = "pontuação atual: " + pontuacao;
}

v1.innerText = letras[QualUsar].letra[QualParte][0];

let input = elemento("nome");
input.addEventListener("keypress", function (event) {
    if ((event.key === "Enter") && (input.value !== '')) {
        inputed();
        input.value = '';
    }
});

function attempted() {
    let t = [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10]
    qualt = t[attempt - 1];
    switch (attempt) {
        case 1:
            v2.classList.remove("nonvisible");
            v2.innerText = letras[QualUsar].letra[QualParte][1];
            elemento("btn-dica").style.display = "block"
            break;
        case 2:
            v3.classList.remove("nonvisible");
            v3.innerText = letras[QualUsar].letra[QualParte][2];
            break;
        case 3:
            v4.classList.remove("nonvisible");
            v4.innerText = letras[QualUsar].letra[QualParte][3];
            break;
    }
}

function inputed() {
    let responseInput = input.value.toLocaleLowerCase().replace(/[\s,-\/]/g, '').replace(/[ãáàâä]/g, "a").replace(/[éêèë]/g, "e").replace(/[íìîï]/g, "i").replace(/[ôõóòö]/g, "o").replace(/[ûúùü]/g, "u");
    let responseMusica = letras[QualUsar].musica.toLocaleLowerCase().replace(/[\s,-\/]/g, '').replace(/[ãáàâä]/g, "a").replace(/[éêèë]/g, "e").replace(/[íìîï]/g, "i").replace(/[ôõóòö]/g, "o").replace(/[ûúùü]/g, "u");
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
    errou();
});

elemento('hint-no').addEventListener('click', function () {
    elemento('hint-popup').style.display = 'none';
});

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
    if ((3 - qual) === 0) {
        elemento("btn-dica").style.display = "none";
    }
}

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
