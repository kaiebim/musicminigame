import { letras } from "./musicas.js";
let QualUsar = Math.floor(Math.random() * letras.length);
let QualParte = Math.floor(Math.random() * letras[QualUsar].letra.length);
let attempt = 0;
let coracoes = ['&#10084;', '&#10084;', '&#10084;', '&#10084;', '&#10084;', '&#10084;', '&#10084;', '&#10084;', '&#10084;', '&#10084;'];
let pontuacao = 0;

let v1 = document.getElementById("v1"),
    v2 = document.getElementById("v2"),
    v3 = document.getElementById("v3"),
    v4 = document.getElementById("v4");

let t1 = document.getElementById("t1"),
    t2 = document.getElementById("t2"),
    t3 = document.getElementById("t3"),
    t4 = document.getElementById("t4"),
    t5 = document.getElementById("t5"),
    t6 = document.getElementById("t6"),
    t7 = document.getElementById("t7"),
    t8 = document.getElementById("t8"),
    t9 = document.getElementById("t9"),
    t10 = document.getElementById("t10");

let qualt = t1;
let dicacase = 0;

function selecionarMusicaAleatoria() {
    QualUsar = Math.floor(Math.random() * letras.length);
    QualParte = Math.floor(Math.random() * letras[QualUsar].letra.length);
    v1.innerText = letras[QualUsar].letra[QualParte][0];
    v2.innerText = letras[QualUsar].letra[QualParte][1] || "";
    v3.innerText = letras[QualUsar].letra[QualParte][2] || "";
    v4.innerText = letras[QualUsar].letra[QualParte][3] || "";
    
    qualt = t1;
}

function resetarJogo() {
    attempt = 0;
    dicacase = 0;

    let tentativas = [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10];
    tentativas.forEach((tentativa, index) => {
        tentativa.innerHTML = "______________________";
    });
    
    v2.classList.add("nonvisible");
    v3.classList.add("nonvisible");
    v4.classList.add("nonvisible");

    v1.innerText = letras[QualUsar].letra[QualParte][0];
    v2.innerText = letras[QualUsar].letra[QualParte][1] || "";
    v3.innerText = letras[QualUsar].letra[QualParte][2] || "";
    v4.innerText = letras[QualUsar].letra[QualParte][3] || "";

    qualt = t1;

    document.querySelector(".title").scrollIntoView({ behavior: "smooth", block: "start" });
    document.getElementById("textopontuacao").innerHTML = "pontuação atual: " + pontuacao;
}

v1.innerText = letras[QualUsar].letra[QualParte][0];

let input = document.getElementById("nome");
input.addEventListener("keypress", function(event) {
    if ((event.key === "Enter") && (input.value !== '')) {
        inputed();
        input.value = '';
    }
});

function attempted() {
    switch (attempt) {
        case 1:
            qualt = t1;
            v2.classList.remove("nonvisible");
            v2.innerText = letras[QualUsar].letra[QualParte][1];
            document.getElementById("btn-dica").style.display = "block"
            break;
        case 2:
            qualt = t2;
            v3.classList.remove("nonvisible");
            v3.innerText = letras[QualUsar].letra[QualParte][2];
            break;
        case 3:
            qualt = t3;
            v4.classList.remove("nonvisible");
            v4.innerText = letras[QualUsar].letra[QualParte][3];
            break;
        case 4:
            qualt = t4;
            break;
        case 5:
            qualt = t5;
            break;
        case 6:
            qualt = t6;
            break;
        case 7:
            qualt = t7;
            break;
        case 8:
            qualt = t8;
            break;
        case 9:
            qualt = t9;
            break;
        case 10:
            qualt = t10;
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
        window.alert("Parabéns! \npontuação atual: "+pontuacao+"\nvidas: " + (coracoes.length));
        selecionarMusicaAleatoria();
        resetarJogo();
    } else {
        if (attempt < 10) {
            coracoes.pop();
            document.getElementById("hearts").innerHTML = coracoes.join('');
            document.querySelector('.tentativas').classList.add('shake');
            document.querySelector('.versos').classList.add('shake');
            document.querySelector('#hearts').classList.add('shake');
            setTimeout(() => {
                document.querySelector('.tentativas').classList.remove('shake');
                document.querySelector('.versos').classList.remove('shake');
                document.querySelector('#hearts').classList.remove('shake');
            }, 500);
        } else {
            window.alert("A música era " + letras[QualUsar].musica);
            document.getElementById("hearts").innerHTML = "VOCÊ PERDEU";
        }
    }
    
    qualt.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => {
        document.querySelector(".title").scrollIntoView({ behavior: "smooth", block: "start" });
    }, 750);
}

document.getElementById('btn-dica').addEventListener('click', function() {
    if ((attempt < 10) && (attempt > 0)) {
        exibirHintPopup();
    }
});

function exibirHintPopup() {
    let hintPopup = document.getElementById("hint-popup");
    var textoRestante = document.getElementById("dicarestante")
    textoRestante.innerHTML = "Você quer obter uma dica em troca de uma vida? <br> Você tem " + (3 - dicacase) + " dicas restantes"
    hintPopup.style.display = "block";
}

document.getElementById('hint-yes').addEventListener('click', function() {
    attempt++;
    attempted();
    qualt.innerHTML = "Dica";
    qualt.classList.add("dica");
    dicacase++;
    DICA(dicacase);
    document.getElementById('hint-popup').style.display = 'none';
    coracoes[attempt - 1] = '';
    document.getElementById("hearts").innerHTML = coracoes.join('');
    document.getElementById("hearts").innerHTML = coracoes.join('');
    document.querySelector('#hearts').classList.add('shake');
    setTimeout(() => {
        document.querySelector('#hearts').classList.remove('shake');
    }, 500);
});

document.getElementById('hint-no').addEventListener('click', function() {
    document.getElementById('hint-popup').style.display = 'none';
});

function DICA(qual) {
    let pdica = document.getElementById("dica");
    switch(qual){
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

        
    

    document.getElementById('dica').style.display = "block";
    document.getElementById('dica').scrollIntoView({ behavior: "smooth", block: "start" });
    document.getElementById('dica').classList.add('cabum');
    setTimeout(() => {
        document.getElementById('dica').classList.remove('cabum');
        document.querySelector(".title").scrollIntoView({ behavior: "smooth", block: "start" });
    }, 1000);
    if ((3 - qual) === 0){
        document.getElementById("btn-dica").style.display = "none";}
}

window.onload = function() {
    exibirPopup();
    selecionarMusicaAleatoria();
    resetarJogo();
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
