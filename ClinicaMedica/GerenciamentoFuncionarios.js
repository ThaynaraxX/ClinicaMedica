document.getElementById('employeeForm').addEventListener('submit', addEmployee);

const employeeList = document.getElementById('employeeList');
const messageBox = document.getElementById('messageBox');

// Carregar funcionários ao iniciar a página
document.addEventListener('DOMContentLoaded', () => {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    employees.forEach((employee, index) => {
        displayEmployee(employee, index + 1);
    });
});

function addEmployee(event) {
    event.preventDefault(); // Evitar o envio do formulário

    const form = event.target;
    const employee = {
        nome: form.nome.value,
        idade: form.idade.value,
        sexo: form.sexo.value,
        cpf: form.cpf.value,
        rua: form.rua.value,
        numero: form.numero.value,
        complemento: form.complemento.value,
        bairro: form.bairro.value,
        cidade: form.cidade.value,
        estado: form.estado.value,
        contato: form.contato.value,
        email: form.email.value,
        dataNascimento: form.dataNascimento.value
    };

    // Carregar os dados existentes
    const employees = JSON.parse(localStorage.getItem('employees')) || [];

    // Verificar duplicidade de CPF e e-mail
    const cpfExists = employees.some(emp => emp.cpf === employee.cpf);
    const emailExists = employees.some(emp => emp.email === employee.email);

    if (cpfExists) {
        showMessage('Erro: CPF já cadastrado!', 'danger');
        return;
    }

    if (emailExists) {
        showMessage('Erro: E-mail já cadastrado!', 'danger');
        return;
    }

    // Adicionar o novo funcionário
    employees.push(employee);

    // Salvar novamente no localStorage
    localStorage.setItem('employees', JSON.stringify(employees));

    // Exibir o novo funcionário na tabela
    displayEmployee(employee, employees.length);

    // Limpar o formulário após adicionar
    form.reset();

    // Mostrar mensagem de sucesso
    showMessage('Funcionário adicionado com sucesso!', 'success');
}

function displayEmployee(employee, id) {
    const row = document.createElement('tr');
    row.innerHTML = 
        `<td>${id}</td>
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
        <td class="actions-column">
            <button class="btn btn-warning btn-sm" onclick="editEmployee(${id})">Editar</button>
            <button class="btn btn-danger btn-sm" onclick="deleteEmployee(${id})">Excluir</button>
        </td>`;
    employeeList.appendChild(row);
}

function editEmployee(id) {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const employee = employees[id - 1];

    const form = document.getElementById('employeeForm');
    form.nome.value = employee.nome;
    form.idade.value = employee.idade;
    form.sexo.value = employee.sexo;
    form.cpf.value = employee.cpf;
    form.rua.value = employee.rua;
    form.numero.value = employee.numero;
    form.complemento.value = employee.complemento;
    form.bairro.value = employee.bairro;
    form.cidade.value = employee.cidade;
    form.estado.value = employee.estado;
    form.contato.value = employee.contato;
    form.email.value = employee.email;
    form.dataNascimento.value = employee.dataNascimento;

    // Remover o funcionário antigo
    deleteEmployee(id, true);
}

function deleteEmployee(id, fromEdit = false) {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];

    // Excluir funcionário
    employees.splice(id - 1, 1);
    localStorage.setItem('employees', JSON.stringify(employees));

    // Atualizar a tabela
    updateEmployeeList();

    // Mostrar mensagem de sucesso ou erro
    if (!fromEdit) {
        showMessage('Funcionário excluído com sucesso!', 'danger');
    }
}

function updateEmployeeList() {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    employeeList.innerHTML = '';
    employees.forEach((employee, index) => {
        displayEmployee(employee, index + 1);
    });
}

function showMessage(message, type) {
    messageBox.classList.remove('d-none', 'alert-success', 'alert-danger');
    messageBox.classList.add(`alert-${type}`);
    messageBox.textContent = message;
    
    setTimeout(() => {
        messageBox.classList.add('d-none');
    }, 3000);
}

function logout() {
    // Limpar o localStorage
    localStorage.clear();
    
    // Redirecionar para a página de login
    window.location.href = 'Login.html'; // Redireciona para o login
}
