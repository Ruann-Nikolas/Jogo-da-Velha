// Emojis dos jogadores
const jogadores = {
  X: "😎",
  O: "🤖"
};

// Estado do jogo
let tabuleiro = ["", "", "", "", "", "", "", "", ""];
let jogadorAtual = "X";
let jogoAtivo = true;

// Inicia o jogo
function iniciarJogo() {

  const tabuleiroDiv = document.getElementById("tabuleiro");
  tabuleiroDiv.innerHTML = "";

  tabuleiro.forEach((_, index) => {

    const celula = document.createElement("div");
    celula.classList.add("celula");

    celula.addEventListener("click", () => jogar(index));

    tabuleiroDiv.appendChild(celula);
  });

  atualizarStatus();
}


function jogar(index) {

  if (tabuleiro[index] !== "" || !jogoAtivo) return;

  tabuleiro[index] = jogadorAtual;

  atualizarTela();

  const resultado = verificarVitoria();

  if (resultado) {
    document.getElementById("status").innerText =
      `Jogador ${jogadores[jogadorAtual]} venceu!`;
    jogoAtivo = false;
    return;
  }

  if (!tabuleiro.includes("")) {
    document.getElementById("status").innerText = "Empate!";
    jogoAtivo = false;
    return;
  }

  jogadorAtual = jogadorAtual === "X" ? "O" : "X";

  atualizarStatus();
}

// Verifica vitória
function verificarVitoria() {

  const combinacoes = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (let comb of combinacoes) {

    const [a,b,c] = comb;

    if (
      tabuleiro[a] &&
      tabuleiro[a] === tabuleiro[b] &&
      tabuleiro[a] === tabuleiro[c]
    ) {
      return true;
    }
  }

  return false;
}

// Atualiza tela
function atualizarTela() {

  const celulas = document.querySelectorAll(".celula");

  celulas.forEach((celula, index) => {
    celula.innerText = jogadores[tabuleiro[index]] || "";
  });
}

// Atualiza status
function atualizarStatus() {
  document.getElementById("status").innerText =
    `Vez do jogador: ${jogadores[jogadorAtual]}`;
}

// Reinicia
function reiniciar() {
  tabuleiro = ["", "", "", "", "", "", "", "", ""];
  jogadorAtual = "X";
  jogoAtivo = true;
  iniciarJogo();
}

// Inicia automaticamente
iniciarJogo();