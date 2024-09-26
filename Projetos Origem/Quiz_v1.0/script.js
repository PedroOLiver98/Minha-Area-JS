// Criar uma lista de perguntas
const questions = [
    {
      question: "Qual é o nome do personagem principal da série 'Friends'?",
      answer: "Rachel Green"
    },
    {
      question: "Qual é o nome da série que foi criada por J.J. Abrams?",
      answer: "Lost"
    },
    {
      question: "Qual é o nome do ator que interpreta o personagem Tony Stark na série 'Homem de Ferro'?",
      answer: "Robert Downey Jr."
    },
    // Adicione mais perguntas aqui
  ];
  
  // Embaralhar as perguntas
  questions.sort(() => Math.random() - 0.5);
  
  // Criar um contador de pontos
  let score = 0;
  
  // Selecionar os elementos HTML
  const questionElement = document.getElementById("question");
  const answerElement = document.getElementById("answer");
  const submitElement = document.getElementById("submit");
  const scoreElement = document.getElementById("score");
  
  // Criar uma função para fazer perguntas ao usuário
  function askQuestion(question) {
    // Mostrar a pergunta ao usuário
    questionElement.textContent = question.question;
    // Limpar o campo de texto
    answerElement.value = "";
    // Adicionar um evento de clique ao botão de enviar
    submitElement.addEventListener("click", () => {
      // Obter a resposta do usuário
      const userAnswer = answerElement.value.trim().toLowerCase();
      // Verificar se a resposta está correta
      if (userAnswer === question.answer.toLowerCase()) {
        score++;
        scoreElement.textContent = `Você acertou ${score} perguntas!`;
      } else {
        scoreElement.textContent = `Você acertou ${score} perguntas. A resposta correta é ${question.answer}`;
      }
      // Fazer a próxima pergunta
      askNextQuestion();
    });
  }
  
  // Criar uma função para fazer a próxima pergunta
  function askNextQuestion() {
    // Verificar se há mais perguntas
    if (questions.length > 0) {
      // Fazer a próxima pergunta
      askQuestion(questions.shift());
    } else {
      // Mostrar o resultado final
      scoreElement.textContent = `Você acertou ${score} perguntas!`;
    }
  }
  
  // Fazer a primeira pergunta
  askNextQuestion();