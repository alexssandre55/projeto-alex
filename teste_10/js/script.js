// 1 - adicionando eventos
const btn = document.querySelector("#my-button")

btn.addEventListener("click", function () {
    console.log("Clicou aqui");
});

// 2 - removendo evento
const secondBtn = document.querySelector("#btn")

function imprimirMensagem() {
    console.log("Teste")
}

secondBtn.addEventListener("click", imprimirMensagem);

const thirdBtn = document.querySelector("#other-btn")

thirdBtn.addEventListener("click", () => {
    console.log("Evento removido");
    secondBtn.removeEventListener("click", imprimirMensagem);
});

// 3 - argumento do evento
const myTitle = document.querySelector("#my-title");

myTitle.addEventListener("click", (event) => {
    console.log(event);
    console.log(event.srcElement);
    console.log(event.offsetX);
    console.log(event.poiterType);
    console.log(event.target);
});

// 4 - propagação
const containerBtn = document.querySelector("#btn-container");

const btnInsideContainer = document.querySelector("#div-btn");

containerBtn.addEventListener("click", () => {
    console.log("Evento 1");
});

btnInsideContainer.addEventListener("click", (e) => {
    e.stopPropagation();
    console.log("Evento 2");
});

// 5 - removendo evento padrão
const a = document.querySelector("a");

a.addEventListener("click", (e) => {

    e.preventDefault();

    console.log("Não alterou a página");
});

// 6 - evento de tecla
document.addEventListener("keyup", (e) => {
    console.log(`Soltou a tecla ${e.key}`);
});

document.addEventListener("keydown", (e) => {
    console.log(`Apertou a tecla ${e.key}`);
});

// 7 - eventos de mouse
const mouseEvntos = document.querySelector("#mouse")

mouseEvntos.addEventListener("mousedown", () => {
    console.log("Precionou o botão");
});

mouseEvntos.addEventListener("mouseup", () => {
    console.log("Solta o botão");
});

mouseEvntos.addEventListener("dblclick", () => {
    console.log("Clique duplo");
});

//8 - movimento do mouse
document.addEventListener("mousemove", (e) => {
    // console.log(`No eixo X: ${e.x}`);
    // console.log(`No eixo Y: ${e.y}`);
});

// 9 - evento de scroll
window.addEventListener("scroll", (e) => {
    if (window.pageYOffset > 200) {
        console.log("Passamos de 200px");
    }
});

// 10 -evento de focus/blur
const input = document.querySelector("#my-input");

input.addEventListener("focus", (e) => {
    console.log("Entrou no input");
});

input.addEventListener("blur", (e) => {
    console.log("Saiu no input");
});

// 11 - evento de carregamento
window.addEventListener("load", () => {
    console.log("A pagina carregou!");
});

window.addEventListener("beforeunload", (e) => {
    e.preventDefault();
    e.returnValue = "teste";
});

// 12 - debounce
const debounce = (f, delay) => {

    let timeout

    return (...arguments) => {
        if(timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            f.aplly(arguments);
        }, delay);
    };
};

window.addEventListener("mousemove", debounce (() => {
    console.log("Executando a cada 400ms");
}, 400)
);