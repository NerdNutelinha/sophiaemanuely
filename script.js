
/* ==========================================
   🧜‍♀️ ANIVERSÁRIO DA SOPHIA - 4 ANINHOS
   Script principal do site
========================================== */

/* ==========================================
   1. NAVEGAÇÃO ENTRE AS CENAS
========================================== */

const cenas = document.querySelectorAll(".scene");

function mostrarCena(id) {
    cenas.forEach(cena => {
        cena.classList.remove("active");
    });

    const destino = document.getElementById(id);

    if (destino) {
        destino.classList.add("active");
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}

/* ==========================================
   2. BOTÕES DE NAVEGAÇÃO
========================================== */

document.querySelectorAll("[data-next]").forEach(botao => {
    botao.addEventListener("click", () => {
        const destino = botao.getAttribute("data-next");
        mostrarCena(destino);
    });
});

/* ==========================================
   3. EFEITOS DE ESTRELAS E BOLHAS
========================================== */

function criarEstrelas() {
    const quantidade = 18;

    for (let i = 0; i < quantidade; i++) {
        const estrela = document.createElement("div");

        estrela.className = "star";
        estrela.textContent = "✨";

        estrela.style.left = Math.random() * 100 + "vw";
        estrela.style.top = Math.random() * 100 + "vh";
        estrela.style.animationDelay = Math.random() * 3 + "s";

        document.body.appendChild(estrela);
    }
}

function criarBolhas() {
    const quantidade = 12;

    for (let i = 0; i < quantidade; i++) {
        const bolha = document.createElement("div");

        bolha.className = "bubble";

        bolha.style.left = Math.random() * 100 + "vw";
        bolha.style.animationDuration = (5 + Math.random() * 7) + "s";
        bolha.style.animationDelay = Math.random() * 8 + "s";

        document.body.appendChild(bolha);
    }
}

criarEstrelas();
criarBolhas();

/* ==========================================
   4. CONCHINHAS COM MENSAGENS SECRETAS
========================================== */

const mensagensSecretas = [
    "Você é uma estrelinha que ilumina o mundo! ⭐",
    "O oceano inteiro está em festa por você! 🧜‍♀️",
    "Que seus sonhos sejam sempre mágicos! ✨",
    "Você é muito amada, princesinha! ❤️",
    "Nunca deixe de sorrir e brincar! 🌸",
    "Hoje é o seu dia especial! 🎂"
];

document.querySelectorAll(".shell").forEach((concha, indice) => {
    concha.addEventListener("click", () => {
        const mensagem = mensagensSecretas[
            indice % mensagensSecretas.length
        ];

        let caixa = concha.parentElement.querySelector(".secret-message");

        if (!caixa) {
            caixa = document.createElement("div");
            caixa.className = "secret-message";
            concha.parentElement.appendChild(caixa);
        }

        caixa.textContent = mensagem;
        caixa.style.display = "block";

        tocarSomMagico();

        caixa.animate(
            [
                { transform: "scale(0.7)", opacity: 0 },
                { transform: "scale(1)", opacity: 1 }
            ],
            {
                duration: 450,
                easing: "ease-out"
            }
        );
    });
});

/* ==========================================
   5. SONS MÁGICOS
========================================== */

let audioContext = null;
let somAmbienteAtivo = false;
let osciladorOceano = null;
let ganhoOceano = null;

function obterAudioContext() {
    if (!audioContext) {
        const AudioContextClass =
            window.AudioContext || window.webkitAudioContext;

        if (!AudioContextClass) {
            return null;
        }

        audioContext = new AudioContextClass();
    }

    if (audioContext.state === "suspended") {
        audioContext.resume();
    }

    return audioContext;
}

function tocarTom(frequencia, duracao = 0.2, volume = 0.12) {
    const contexto = obterAudioContext();

    if (!contexto) return;

    const oscilador = contexto.createOscillator();
    const ganho = contexto.createGain();

    oscilador.type = "sine";
    oscilador.frequency.value = frequencia;

    ganho.gain.setValueAtTime(volume, contexto.currentTime);
    ganho.gain.exponentialRampToValueAtTime(
        0.001,
        contexto.currentTime + duracao
    );

    oscilador.connect(ganho);
    ganho.connect(contexto.destination);

    oscilador.start();
    oscilador.stop(contexto.currentTime + duracao);
}

function tocarSomMagico() {
    tocarTom(660, 0.18, 0.1);

    setTimeout(() => {
        tocarTom(880, 0.25, 0.1);
    }, 100);
}

function tocarSomEstouro() {
    tocarTom(180, 0.12, 0.15);

    setTimeout(() => {
        tocarTom(440, 0.18, 0.08);
    }, 70);
}

function iniciarSomOceano() {
    const contexto = obterAudioContext();

    if (!contexto || somAmbienteAtivo) return;

    osciladorOceano = contexto.createOscillator();
    ganhoOceano = contexto.createGain();

    osciladorOceano.type = "sine";
    osciladorOceano.frequency.value = 90;

    ganhoOceano.gain.value = 0.025;

    osciladorOceano.connect(ganhoOceano);
    ganhoOceano.connect(contexto.destination);

    osciladorOceano.start();

    somAmbienteAtivo = true;
}

function pararSomOceano() {
    if (osciladorOceano) {
        osciladorOceano.stop();
        osciladorOceano = null;
        ganhoOceano = null;
    }

    somAmbienteAtivo = false;
}

/* ==========================================
   6. BOTÃO DE SOM
========================================== */

const botaoSom = document.querySelector(".sound-button");

if (botaoSom) {
    botaoSom.addEventListener("click", () => {
        if (somAmbienteAtivo) {
            pararSomOceano();
            botaoSom.textContent = "🔇";
        } else {
            iniciarSomOceano();
            botaoSom.textContent = "🔊";
        }
    });
}

/* ==========================================
   7. ENTRADA NO REINO DAS SEREIAS
========================================== */

const botoesOceano = document.querySelectorAll(
    '[data-next="mermaid"]'
);

botoesOceano.forEach(botao => {
    botao.addEventListener("click", () => {
        iniciarSomOceano();

        if (botaoSom) {
            botaoSom.textContent = "🔊";
        }
    });
});

/* ==========================================
   8. JOGO DOS BALÕES
========================================== */

const baloes = document.querySelectorAll(".balloon");

let baloesEstourados = 0;

const mensagemProgresso = document.querySelector(".progress-message");

const presente = document.querySelector(".gift-button");

if (presente) {
    presente.style.display = "none";
}

if (baloes.length > 0) {
    baloes.forEach((balao, indice) => {
        balao.addEventListener("click", () => {

            if (balao.classList.contains("popped")) {
                return;
            }

            balao.classList.add("popped");

            baloesEstourados++;

            tocarSomEstouro();
            criarFogos(
                balao.getBoundingClientRect().left +
                balao.offsetWidth / 2,
                balao.getBoundingClientRect().top +
                balao.offsetHeight / 2
            );

            if (mensagemProgresso) {
                mensagemProgresso.textContent =
                    `Você já estourou ${baloesEstourados} de ${baloes.length} balões! ❤️`;
            }

            if (baloesEstourados === baloes.length) {
                finalizarJogo();
            }
        });
    });
}

/* ==========================================
   9. FINALIZAÇÃO DO JOGO
========================================== */

function finalizarJogo() {
    if (mensagemProgresso) {
        mensagemProgresso.textContent =
            "EEEEEEEEEEEEBAAAAAAA! TODOS OS BALÕES ESTOURARAM! 🎉❤️";
    }

    setTimeout(() => {
        if (presente) {
            presente.style.display = "inline-block";

            presente.animate(
                [
                    { transform: "scale(0)", opacity: 0 },
                    { transform: "scale(1.2)", opacity: 1 },
                    { transform: "scale(1)", opacity: 1 }
                ],
                {
                    duration: 900,
                    easing: "ease-out"
                }
            );
        }

        criarGrandeFesta();
    }, 800);
}

/* ==========================================
   10. FOGOS DE ARTIFÍCIO
========================================== */

function criarFogos(x, y) {
    for (let i = 0; i < 8; i++) {
        const fogo = document.createElement("div");

        fogo.className = "firework";

        fogo.style.left = x + "px";
        fogo.style.top = y + "px";

        document.body.appendChild(fogo);

        setTimeout(() => {
            fogo.remove();
        }, 1000);
    }
}

function criarGrandeFesta() {
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight * 0.7;

            criarFogos(x, y);
            tocarSomMagico();
        }, i * 250);
    }
}

/* ==========================================
   11. ABRIR O PRESENTE E MOSTRAR O VÍDEO
========================================== */

if (presente) {
    presente.addEventListener("click", () => {
        mostrarCena("final");

        tocarSomMagico();

        const video = document.querySelector(".video-container video");

        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    });
}

/* ==========================================
   12. BOTÃO DE RECOMEÇAR
========================================== */

const botaoRecomecar = document.querySelector("#recomecar");

if (botaoRecomecar) {
    botaoRecomecar.addEventListener("click", () => {

        baloesEstourados = 0;

        baloes.forEach(balao => {
            balao.classList.remove("popped");
        });

        if (mensagemProgresso) {
            mensagemProgresso.textContent =
                "Vamos estourar todos os balões, Sophia! 🎈";
        }

        if (presente) {
            presente.style.display = "none";
        }

        pararSomOceano();

        mostrarCena("balloon-game");
    });
}

/* ==========================================
   13. INÍCIO DO SITE
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const primeiraCena = document.querySelector(".scene.active");

    if (!primeiraCena && cenas.length > 0) {
        cenas[0].classList.add("active");
    }

    console.log(
        "🧜‍♀️ O reino mágico da Sophia está pronto! ❤️"
    );
});
