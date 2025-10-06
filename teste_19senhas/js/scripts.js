
document.addEventListener('DOMContentLoaded', function () {
    // Elementos do DOM
    const openGeneratePassword = document.getElementById('open-generate-password');
    const generateOptions = document.getElementById('generate-options');
    const generateButton = document.getElementById('generate');
    const generatedPassword = document.getElementById('generated-password');
    const passwordResult = document.getElementById('password-result');
    const copyPasswordButton = document.getElementById('copy-password');
    const passwordField = document.getElementById('password');
    const registrationForm = document.getElementById('registration-form');

    // Alternar visibilidade das opções de geração de senha
    openGeneratePassword.addEventListener('click', function () {
        generateOptions.classList.toggle('active');
    });

    // Gerar senha
    generateButton.addEventListener('click', function () {
        const length = parseInt(document.getElementById('length').value);
        const includeLetters = document.getElementById('letters').checked;
        const includeNumbers = document.getElementById('numbers').checked;
        const includeSymbols = document.getElementById('symbols').checked;

        const password = generatePassword(length, includeLetters, includeNumbers, includeSymbols);
        passwordResult.textContent = password;
        generatedPassword.classList.add('active');

        // Preencher automaticamente o campo de senha
        passwordField.value = password;
    });

    // Copiar senha para a área de transferência
    copyPasswordButton.addEventListener('click', function () {
        const password = passwordResult.textContent;
        if (password) {
            navigator.clipboard.writeText(password).then(function () {
                alert('Senha copiada para a área de transferência!');
            }).catch(function (err) {
                console.error('Erro ao copiar a senha: ', err);
            });
        }
    });

    // Função para gerar senha
    function generatePassword(length, letters, numbers, symbols) {
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const nums = '0123456789';
        const syms = '!@#$%^&*()_+-=[]{}|;:,.<>?';

        let characters = '';
        let password = '';

        if (letters) characters += lowercase + uppercase;
        if (numbers) characters += nums;
        if (symbols) characters += syms;

        // Garantir que pelo menos um caractere de cada tipo selecionado seja incluído
        if (letters) password += getRandomChar(lowercase) + getRandomChar(uppercase);
        if (numbers) password += getRandomChar(nums);
        if (symbols) password += getRandomChar(syms);

        // Preencher o restante da senha
        for (let i = password.length; i < length; i++) {
            password += getRandomChar(characters);
        }

        // Embaralhar a senha para evitar padrões previsíveis
        return shuffleString(password);
    }

    function getRandomChar(string) {
        return string[Math.floor(Math.random() * string.length)];
    }

    function shuffleString(string) {
        const array = string.split('');
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array.join('');
    }

    // Validação do formulário
    registrationForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmpassword').value;

        if (password !== confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }

        // Aqui você normalmente enviaria os dados para o servidor
        alert('Cadastro realizado com sucesso!');
        registrationForm.reset();
        generateOptions.classList.remove('active');
        generatedPassword.classList.remove('active');
    });
});
