// Seleção de elementos 
const generatePasswordButton = document.querySelector("#generate-password");
const generatePasswordElement = document.querySelector("#generated-password");

// Novas funcionalidades
const openCloseGeneratorbutton = document.querySelector(
    "#open-generate-password"
);

const generatePasswordContainer = document.querySelector("#generate-options");
const lengthInput = document.querySelector("#length");
const lettersInput = document.querySelector("#letters");
const nambersInput = document.querySelector("#numbers");
const symbolsInput = document.querySelector("#symbols");
const copyPasswordButton = document.querySelector("#copy-password");



// Funções 
const getLetterLowerCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const getLetterUpperCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

const getNumber = () => {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
};

const getSymbol = () => {
    const symbols = ",.;~^[]{}!@#$%&*()-+=/<>?";
    return symbols[Math.floor(Math.random() * symbols.length)];
};

const generatePassword = (getLetterLowerCase, getLetterUpperCase, getNumber, getSymbol) => {
    let password = "";

// Segunda versão

    const passwordLength = +lengthInput.value;

    const generators = [];

    if (lettersInput.checked) {
        generators.push(getLetterLowerCase, getLetterUpperCase);
    }

    if (numbersInput.checked) {
        generators.push(getNumber);
    }

    if (symbolsInput.checked) {
        generators.push(getSymbol);
    }

        console.log(generators.length);
    

    if (generators.length === 0) {
        return;   
    }

    for (i = 0; i < passwordLength; i = i + generators.length) {
        generators.forEach(() => {
            const randomValue =
             generators[Math.floor(Math.random() * generators.length)]();
            password += randomValue;
        });
    }
    password = password.slice(0, passwordLength);
    generatePasswordElement.style.display = "block";
    generatePasswordElement.querySelector("h4").innerText = password;
};

// Eventos
generatePasswordButton.addEventListener("click", () => {
    generatePassword(
    getLetterLowerCase,
        getLetterUpperCase,
        getNumber,
        getSymbol
    );
});

openCloseGeneratorbutton.addEventListener("click", () => {
    generatePasswordContainer.classList.toggle("hide");
});
