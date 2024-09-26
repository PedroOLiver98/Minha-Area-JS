let palavraEscolhida = '';
let resposta = [];
let letra = null;
let vida = 6;
let letrasUsadas = [];

// Função para iniciar o jogo
function iniciarJogo(palavra) {
    palavra = palavra.toLowerCase(); // Normaliza a palavra para minúsculas
    let t = palavra.length; // tamanho da palavra
    resposta = [];
    vida = 6;
    letrasUsadas = [];

    // Montar caixa vazia
    for (let i = 0; i < t; i++) {
        resposta[i] = "_";  // Vai criar o campo de jogo
    }

    alert(`Bem-vindo!\nA palavra sorteada tem ${t} letras`);

    // Iniciar loop do jogo
    do {
        // Perguntar se o usuário quer adivinhar a palavra completa
        let querAdivinhar = confirm("Você quer tentar adivinhar a palavra completa?");
        if (querAdivinhar) {
            let palpite = prompt("Digite o seu palpite para a palavra completa:").toLowerCase();
            if (palpite === palavra) {
                alert("Parabéns, você adivinhou a palavra corretamente!");
                resposta = palavra.split('').map(letra => letra.toUpperCase());
                vida = 0; // Termina o jogo
            } else {
                alert("Palpite errado! Você perdeu uma vida.");
                vida--;
            }
        } else {
            letra = prompt(`Informe uma letra, você tem ${vida} vidas`).toLowerCase(); // Normaliza a letra para minúsculas

            if (letrasUsadas.includes(letra)) {
                alert('Essa letra já foi utilizada');
                continue;
            }

            letrasUsadas.push(letra);

            let acertou = false;

            for (let j = 0; j < t; j++) {
                if (letra === palavra[j]) {
                    resposta[j] = letra.toUpperCase();
                    acertou = true;
                }
            }

            if (!acertou) {
                vida--;
            }
        }

        if (vida === 0 && resposta.includes("_")) {
            alert(`Você perdeu o jogo!!! A palavra era: ${palavra.toUpperCase()}`);
        }

        if (!resposta.includes("_")) {
            alert("Parabéns, você conseguiu vencer o jogo!!!");
            vida = 0;
        }

        alert(resposta.join(" "));
    } while (vida > 0);

    window.location.reload(true);
}

// Função para buscar palavra aleatória de uma API
function buscarPalavraAleatoria() {
    fetch('https://api.dicionario-aberto.net/random')
        .then(response => response.json())
        .then(data => {
            console.log('Resposta da API:', data); // Log para depuração
            // Supondo que a palavra esteja no campo `word` da resposta
            palavraEscolhida = data.word; // Ajuste conforme a estrutura exata da resposta
            iniciarJogo(palavraEscolhida);
        })
        .catch(error => console.error('Erro ao buscar palavra:', error));
}

// Chama a função para iniciar o jogo com uma palavra aleatória
buscarPalavraAleatoria();
