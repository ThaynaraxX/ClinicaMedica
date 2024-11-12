// Função para exibir a lista de prontuários na página de lista
function exibirListaProntuarios() {
    const tabelaProntuarios = document.getElementById("tabelaPacientes");  // A tabela de prontuários no HTML
    tabelaProntuarios.innerHTML = "";  // Limpa a tabela antes de adicionar os novos dados

    // Carregar os prontuários salvos no localStorage
    let prontuarios = JSON.parse(localStorage.getItem("prontuarios")) || [];

    // Verificar se há prontuários cadastrados
    if (prontuarios.length === 0) {
        tabelaProntuarios.innerHTML = "<tr><td colspan='3' class='text-center'>Nenhum prontuário cadastrado.</td></tr>";
    } else {
        // Exibir todos os prontuários cadastrados
        prontuarios.forEach(p => {
            const row = `
                <tr>
                    <td>${p.receituario}</td>
                    <td>${p.exames}</td>
                    <td>${p.observacoes}</td>
                    <td>
                        <!-- Botões de Ações: Editar -->
                        <button class="btn btn-warning btn-sm" onclick="editarProntuario(${p.id})">Editar</button>
                    </td>
                </tr>
            `;
            tabelaProntuarios.innerHTML += row; // Adiciona os prontuários na tabela
        });
    }
}

// Função para editar um prontuário
function editarProntuario(id) {
    // Exibe um alerta informando que o usuário está prestes a editar
    const alertMessage = document.getElementById("alertMessage");
    alertMessage.classList.remove("d-none");  // Exibe a mensagem de alerta
    
    // Redireciona para a página de edição passando o id do prontuário
    setTimeout(() => {
        window.location.href = `Prontuario.html?id=${id}`;
    }, 2000);  // Atraso de 2 segundos para a mensagem de alerta ser visível
}

// Chama a função para exibir a lista ao carregar a página
document.addEventListener("DOMContentLoaded", function() {
    exibirListaProntuarios();
});
