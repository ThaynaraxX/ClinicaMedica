
let consultas = [];

// Carregar a lista de consultas no carregamento da página
document.addEventListener('DOMContentLoaded', function () {
    // Recupera as consultas salvas do localStorage
    const savedConsultas = JSON.parse(localStorage.getItem('consultas')) || [];
    consultas = savedConsultas;
    renderConsultas();
});

//  renderizar as consultas na tabela
function renderConsultas() {
    const consultaList = document.getElementById('consultaList');
    consultaList.innerHTML = '';

    consultas.forEach((consulta, index) => {
        const row = document.createElement('tr');

        // Data e Hora formatada
        const data = new Date(consulta.dataHorario);
        const dataFormatted = `${data.toLocaleDateString()} ${data.toLocaleTimeString()}`;

        row.innerHTML = `
            <td>${dataFormatted}</td>
            <td>${consulta.sintomas}</td>
            <td>${consulta.eRetorno ? 'Sim' : 'Não'}</td>
            <td>${consulta.estaAtiva ? 'Sim' : 'Não'}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editConsulta(${index})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteConsulta(${index})">Excluir</button>
            </td>
        `;
        consultaList.appendChild(row);
    });
}

// salvar a consulta no localStorage
document.getElementById('consultaForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const dataHorario = document.getElementById('dataHorario').value;
    const sintomas = document.getElementById('sintomas').value;
    const eRetorno = document.getElementById('eRetorno').value === 'true';
    const estaAtiva = document.getElementById('estaAtiva').value === 'true';

    // Verificando se já existe uma consulta no mesmo dia e horário
    const isConflict = consultas.some(consulta => 
        new Date(consulta.dataHorario).toLocaleString() === new Date(dataHorario).toLocaleString()
    );

    if (isConflict) {
        showAlert('Não é possível marcar a consulta, pois já existe uma consulta marcada para o mesmo dia e horário.', 'danger');
        return;
    }

    // Adicionando nova consulta
    consultas.push({
        dataHorario,
        sintomas,
        eRetorno,
        estaAtiva
    });

    // Salvando no localStorage
    localStorage.setItem('consultas', JSON.stringify(consultas));

    showAlert('Consulta cadastrada com sucesso!', 'success');
    document.getElementById('consultaForm').reset();
    renderConsultas();
});

// excluir consulta
function deleteConsulta(index) {
    consultas.splice(index, 1);
    localStorage.setItem('consultas', JSON.stringify(consultas));
    renderConsultas();
}

//  editar consulta
function editConsulta(index) {
    const consulta = consultas[index];
    document.getElementById('dataHorario').value = consulta.dataHorario;
    document.getElementById('sintomas').value = consulta.sintomas;
    document.getElementById('eRetorno').value = consulta.eRetorno.toString();
    document.getElementById('estaAtiva').value = consulta.estaAtiva.toString();

    deleteConsulta(index);
}

// alerta de erro ou sucesso
function showAlert(message, type) {
    const alertDiv = document.getElementById('alert');
    alertDiv.classList.remove('d-none', 'alert-success', 'alert-danger');
    alertDiv.classList.add(`alert-${type}`);
    alertDiv.textContent = message;
}
