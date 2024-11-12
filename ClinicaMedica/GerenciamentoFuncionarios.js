let employees = []; // Armazenar funcionários

document.getElementById('employeeForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const employeeData = Object.fromEntries(formData.entries());

    if (employeeData.id) {
        updateEmployee(employeeData); // Atualiza um funcionário
    } else {
        addEmployee(employeeData); // Adiciona um novo funcionário
    }
});

function addEmployee(employeeData) {
    // Verifica se o CRM já está cadastrado
    const existingEmployee = employees.find(emp => emp.crm === employeeData.crm);
    if (existingEmployee) {
        showAlert('CRM já cadastrado. Por favor, insira um CRM único.', 'danger');
        return;
    }

    // Adiciona o funcionário na lista
    employeeData.id = Date.now(); // Usando o timestamp como id
    employees.push(employeeData);
    showAlert('Funcionário adicionado com sucesso!', 'success');
    clearForm();
    renderEmployees();
}

function updateEmployee(employeeData) {
    // Atualiza os dados do funcionário
    const index = employees.findIndex(emp => emp.id === employeeData.id);
    if (index !== -1) {
        employees[index] = employeeData;
        showAlert('Funcionário atualizado com sucesso!', 'success');
        clearForm();
        renderEmployees();
    }
}

function deleteEmployee(id) {
    // Exclui um funcionário
    employees = employees.filter(emp => emp.id !== id);
    showAlert('Funcionário excluído com sucesso!', 'success');
    renderEmployees();
}

function editEmployee(id) {
    // Preenche o formulário com os dados do funcionário para edição
    const employee = employees.find(emp => emp.id === id);
    if (employee) {
        document.getElementById('nome').value = employee.nome;
        document.getElementById('idade').value = employee.idade;
        document.getElementById('sexo').value = employee.sexo;
        document.getElementById('cpf').value = employee.cpf;
        document.getElementById('rua').value = employee.rua;
        document.getElementById('numero').value = employee.numero;
        document.getElementById('complemento').value = employee.complemento;
        document.getElementById('bairro').value = employee.bairro;
        document.getElementById('cidade').value = employee.cidade;
        document.getElementById('estado').value = employee.estado;
        document.getElementById('contato').value = employee.contato;
        document.getElementById('email').value = employee.email;
        document.getElementById('dataNascimento').value = employee.dataNascimento;
        document.getElementById('crm').value = employee.crm || '';
        document.getElementById('especialidade').value = employee.especialidade || '';
        document.getElementById('tipoFuncionario').value = employee.crm ? 'medico' : 'atendente';
        document.getElementById('submitBtn').textContent = 'Atualizar Funcionário';

        // Armazena o id para saber que estamos editando
        document.getElementById('employeeForm').setAttribute('data-edit-id', employee.id);
    }
}

function renderEmployees() {
    const tbody = document.getElementById('employeeList').querySelector('tbody');
    tbody.innerHTML = ''; // Limpar a tabela antes de repopular

    employees.forEach(employee => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.nome}</td>
            <td>${employee.idade}</td>
            <td>${employee.sexo}</td>
            <td>${employee.cpf}</td>
            <td>${employee.rua}</td>
            <td>${employee.numero}</td>
            <td>${employee.complemento}</td>
            <td>${employee.bairro}</td>
            <td>${employee.cidade}</td>
            <td>${employee.estado}</td>
            <td>${employee.contato}</td>
            <td>${employee.email}</td>
            <td>${employee.dataNascimento}</td>
            <td>${employee.crm || ''}</td>
            <td>${employee.especialidade || ''}</td>
            <td>
                <button class="btn btn-warning" onclick="editEmployee(${employee.id})">Editar</button>
                <button class="btn btn-danger" onclick="deleteEmployee(${employee.id})">Excluir</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function clearForm() {
    document.getElementById('employeeForm').reset();
    document.getElementById('submitBtn').textContent = 'Adicionar Funcionário';
    document.getElementById('employeeForm').removeAttribute('data-edit-id');
}

function showAlert(message, type) {
    const alertBox = document.getElementById('messageBox');
    alertBox.textContent = message;
    alertBox.className = `alert alert-${type}`;
    alertBox.classList.remove('d-none');
    setTimeout(() => alertBox.classList.add('d-none'), 3000); // Esconde após 3 segundos
}

function toggleFields() {
    const tipoFuncionario = document.getElementById('tipoFuncionario').value;
    const medicoFields = document.getElementById('medicoFields');
    if (tipoFuncionario === 'medico') {
        medicoFields.classList.remove('d-none');
    } else {
        medicoFields.classList.add('d-none');
    }
}

function logout() {
    // Limpar o localStorage
    localStorage.clear();
    
    // Redirecionar para a página de login
    window.location.href = 'Administrativo.html'; // Redireciona para o login
}

