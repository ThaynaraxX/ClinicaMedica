let pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];

document.getElementById("cadastroForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const paciente = {
        id: document.getElementById("pacienteId") ? document.getElementById("pacienteId").value : pacientes.length + 1,  // Usando ID existente ou gerando novo
        nome: document.getElementById("nome").value,
        idade: parseInt(document.getElementById("idade").value),
        sexo: document.getElementById("sexo").value,
        cpf: document.getElementById("cpf").value,
        rua: document.getElementById("rua").value,
        numero: document.getElementById("numero").value,
        complemento: document.getElementById("complemento").value,
        bairro: document.getElementById("bairro").value,
        cidade: document.getElementById("cidade").value,
        estado: document.getElementById("estado").value,
        contato: document.getElementById("contato").value,
        email: document.getElementById("email").value,
        dataNascimento: document.getElementById("dataNascimento").value,
        convenio: document.getElementById("temConvenio").value === 'sim' ? document.getElementById("convenio").value : 'Nenhum'
    };

    // Verificar se CPF ou Email já estão cadastrados
    const cpfExistente = pacientes.some(p => p.cpf === paciente.cpf && p.id !== paciente.id);  // Não verificar o próprio paciente
    const emailExistente = pacientes.some(p => p.email === paciente.email && p.id !== paciente.id); // Não verificar o próprio paciente

    if (cpfExistente) {
        document.getElementById("cpf-alert").classList.remove("d-none");
        return;
    } else {
        document.getElementById("cpf-alert").classList.add("d-none");
    }

    if (emailExistente) {
        document.getElementById("email-alert").classList.remove("d-none");
        return;
    } else {
        document.getElementById("email-alert").classList.add("d-none");
    }

    // Se paciente já existe, atualiza, caso contrário, adiciona
    if (paciente.id <= pacientes.length) {
        pacientes = pacientes.map(p => p.id === paciente.id ? paciente : p);  // Atualiza o paciente existente
    } else {
        pacientes.push(paciente);  // Adiciona novo paciente
    }

    localStorage.setItem("pacientes", JSON.stringify(pacientes));

    document.getElementById("sucesso").classList.remove("d-none");
    setTimeout(() => {
        document.getElementById("sucesso").classList.add("d-none");
        window.location.href = "ListaPaciente.html";  // Redireciona para a página de lista após o sucesso
    }, 2000);
});

// Função para editar paciente
function carregarPaciente() {
    const urlParams = new URLSearchParams(window.location.search);
    const pacienteId = urlParams.get('id');

    if (pacienteId) {
        const paciente = pacientes.find(p => p.id == pacienteId);
        if (paciente) {
            document.getElementById("tituloFormulario").textContent = "Editar Paciente";  // Atualiza título para edição
            document.getElementById("pacienteId").value = paciente.id;
            document.getElementById("nome").value = paciente.nome;
            document.getElementById("idade").value = paciente.idade;
            document.getElementById("sexo").value = paciente.sexo;
            document.getElementById("cpf").value = paciente.cpf;
            document.getElementById("email").value = paciente.email;
            document.getElementById("rua").value = paciente.rua;
            document.getElementById("numero").value = paciente.numero;
            document.getElementById("complemento").value = paciente.complemento;
            document.getElementById("bairro").value = paciente.bairro;
            document.getElementById("cidade").value = paciente.cidade;
            document.getElementById("estado").value = paciente.estado;
            document.getElementById("contato").value = paciente.contato;
            document.getElementById("dataNascimento").value = paciente.dataNascimento;
            document.getElementById("temConvenio").value = paciente.convenio ? 'sim' : 'nao';
            if (paciente.convenio) {
                document.getElementById("convenioDiv").style.display = "block";
                document.getElementById("convenio").value = paciente.convenio;
            }
        }
    }
}

// Carregar paciente se em modo de edição
if (window.location.search.includes("id")) {
    carregarPaciente();
}

function toggleConvenio() {
    const temConvenio = document.getElementById("temConvenio").value;
    const convenioDiv = document.getElementById("convenioDiv");

    if (temConvenio === "sim") {
        convenioDiv.style.display = "block"; // Exibe a seleção de convênios
    } else {
        convenioDiv.style.display = "none"; // Esconde a seleção de convênios
    }
}


