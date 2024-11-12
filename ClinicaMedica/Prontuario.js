// Variáveis de controle
let prontuarios = [];
let currentId = 1;

// Função para renderizar a lista de prontuários
function renderProntuarios() {
    const listaProntuarios = document.getElementById("listaProntuarios");
    listaProntuarios.innerHTML = '';

    prontuarios.forEach(prontuario => {
        const li = document.createElement("li");
        li.classList.add("list-item");

        li.innerHTML = `
            <div>
                <strong>ID:</strong> ${prontuario.id} <br>
                <strong>Receituário:</strong> ${prontuario.receituario} <br>
                <strong>Exames:</strong> ${prontuario.exames} <br>
                <strong>Observações:</strong> ${prontuario.observacoes}
            </div>
            <div>
                <button onclick="editarProntuario(${prontuario.id})">Editar</button>
                <button onclick="excluirProntuario(${prontuario.id})">Excluir</button>
            </div>
        `;

        listaProntuarios.appendChild(li);
    });
}

// Função para adicionar um novo prontuário
function adicionarProntuario(event) {
    event.preventDefault();

    const receituario = document.getElementById("receituario").value;
    const exames = document.getElementById("exames").value;
    const observacoes = document.getElementById("observacoes").value;

    const prontuario = {
        id: currentId++,
        receituario,
        exames,
        observacoes
    };

    prontuarios.push(prontuario);
    renderProntuarios();
    limparFormulario();
}

// Função para editar um prontuário
function editarProntuario(id) {
    const prontuario = prontuarios.find(p => p.id === id);
    if (prontuario) {
        document.getElementById("receituario").value = prontuario.receituario;
        document.getElementById("exames").value = prontuario.exames;
        document.getElementById("observacoes").value = prontuario.observacoes;

        // Remover o prontuário para editar
        excluirProntuario(id);
    }
}

// Função para excluir um prontuário
function excluirProntuario(id) {
    prontuarios = prontuarios.filter(p => p.id !== id);
    renderProntuarios();
}

// Função para limpar o formulário
function limparFormulario() {
    document.getElementById("formProntuario").reset();
}

// Evento de envio do formulário
document.getElementById("formProntuario").addEventListener("submit", adicionarProntuario);

// Evento de clique no botão "Sair"
document.getElementById("btnSair").addEventListener("click", () => {
    window.location.href = "index.html"; // Redireciona para a mesma página, simula saída
});

// Inicializa a lista ao carregar a página
renderProntuarios();
