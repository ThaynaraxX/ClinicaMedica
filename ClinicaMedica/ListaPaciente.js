// Função para exibir a lista de pacientes na página de lista
function exibirListaPacientes() {
    const tabelaPacientes = document.getElementById("tabelaPacientes");
    tabelaPacientes.innerHTML = "";  // Limpa a tabela antes de adicionar os novos dados

    // Carregar os pacientes salvos no localStorage
    let pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];

    // Verificar se há pacientes cadastrados
    if (pacientes.length === 0) {
        tabelaPacientes.innerHTML = "<tr><td colspan='16' class='text-center'>Nenhum paciente cadastrado.</td></tr>";
    } else {
        // Exibir todos os pacientes cadastrados
        pacientes.forEach(p => {
            const row = `
                <tr>
                    <td>${p.id}</td>
                    <td>${p.nome}</td>
                    <td>${p.idade}</td>
                    <td>${p.sexo === "M" ? "Masculino" : "Feminino"}</td>
                    <td>${p.cpf}</td>
                    <td>${p.email}</td>
                    <td>${p.rua}</td>
                    <td>${p.numero}</td>
                    <td>${p.complemento}</td>
                    <td>${p.bairro}</td>
                    <td>${p.cidade}</td>
                    <td>${p.estado}</td>
                    <td>${p.contato}</td>
                    <td>${p.dataNascimento}</td>
                    <td>${p.temConvenio ? 'Sim' : 'Não'}</td> <!-- Exibe se o paciente tem convênio -->
                    <td>${p.convenio || 'N/A'}</td> <!-- Exibe o convênio se houver -->
                    <td>
                        <!-- Botões de Ações: Excluir e Editar -->
                        <button class="btn btn-warning btn-sm" onclick="editarPaciente(${p.id})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="excluirPaciente(${p.id})">Excluir</button>
                    </td>
                </tr>
            `;
            tabelaPacientes.innerHTML += row; // Adiciona os pacientes na tabela
        });
    }
}

// Função para excluir um paciente da lista
function excluirPaciente(id) {
    let pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];  // Carrega os pacientes
    pacientes = pacientes.filter(p => p.id !== id);  // Filtra os pacientes removendo o paciente com o id fornecido
    localStorage.setItem("pacientes", JSON.stringify(pacientes));  // Atualiza o localStorage
    exibirListaPacientes();  // Recarrega a lista de pacientes na página
}

// Função para editar um paciente
function editarPaciente(id) {
    // Redireciona para a página de edição passando o id do paciente
    window.location.href = `Paciente.html?id=${id}`;
}

// Chama a função para exibir a lista ao carregar a página
document.addEventListener("DOMContentLoaded", function() {
    exibirListaPacientes();
});

