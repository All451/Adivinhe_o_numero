// Variáveis principais do jogo
let numeroSecreto = Math.trunc(Math.random() * 20) + 1;
let pontuacao = 20;
let recorde = 0;

// Selecionando elementos do DOM uma vez para melhorar a performance
const corpo = document.body;
const numeroDisplay = document.querySelector('.numero');
const pontuacaoDisplay = document.querySelector('.pontuacao');
const recordeDisplay = document.querySelector('.recorde');
const mensagemDisplay = document.querySelector('.mensagem');
const palpiteInput = document.querySelector('.palpite');
const verificarBtn = document.querySelector('.verificar');
const novamenteBtn = document.querySelector('.novamente');

// Função para atualizar a mensagem de feedback
function mostrarMensagem(mensagem, tipo = 'info') {
  mensagemDisplay.textContent = mensagem;
  mensagemDisplay.className = `mensagem alert-${tipo}`; // Usando classes Bootstrap para feedback visual
}

// Função para atualizar a pontuação no DOM
function atualizarPontuacao() {
  pontuacaoDisplay.textContent = pontuacao;
}

// Função para resetar estilos e reiniciar o jogo
function reiniciarJogo() {
  pontuacao = 20;
  numeroSecreto = Math.trunc(Math.random() * 20) + 1;

  mostrarMensagem('Comece a adivinhar...', 'info');
  pontuacaoDisplay.textContent = pontuacao;
  numeroDisplay.textContent = '?';
  palpiteInput.value = '';
  
  // Resetando estilos visuais
  corpo.style.backgroundColor = '#222';
  numeroDisplay.classList.remove('bg-success', 'text-white');
  numeroDisplay.classList.add('bg-white', 'text-dark');
}

// Função para processar o palpite do usuário
function processarPalpite() {
  const palpite = Number(palpiteInput.value);

  if (!palpite) {
    mostrarMensagem('⛔ Por favor, insira um número!', 'danger');

  } else if (palpite === numeroSecreto) {
    mostrarMensagem('🎉 Parabéns! Número correto!', 'success');
    numeroDisplay.textContent = numeroSecreto;
    corpo.style.backgroundColor = '#60b347';
    numeroDisplay.classList.add('bg-success', 'text-white');

    if (pontuacao > recorde) {
      recorde = pontuacao;
      recordeDisplay.textContent = recorde;
    }

  } else {
    if (pontuacao > 1) {
      mostrarMensagem(palpite > numeroSecreto ? '📈 Muito alto!' : '📉 Muito baixo!', 'warning');
      pontuacao--;
      atualizarPontuacao();
    } else {
      mostrarMensagem('💥 Você perdeu o jogo!', 'danger');
      pontuacaoDisplay.textContent = 0;
    }
  }
}

// Event Listeners
verificarBtn.addEventListener('click', processarPalpite);
novamenteBtn.addEventListener('click', reiniciarJogo);
