const users = {
    'medico': { password: 'medico123', role: 'medico' },
    'Rh': { password: 'rh123', role: 'Rh' },
    'atendente': { password: 'atendente123', role: 'atendente' }
};

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const alertBox = document.getElementById('loginAlert');

    if (users[username] && users[username].password === password) {
        if (users[username].role === 'medico') {
            window.location.href = 'Medico.html';
        } else if (users[username].role === 'Rh') {
            window.location.href = 'ClinicaMedica\GerenciamentoFuncionarios.html';  // Página para RH
        } else if (users[username].role === 'atendente') {
            window.location.href = 'Atendente.html';
        }
    } else {
        alertBox.textContent = 'Usuário ou senha incorretos!';
        alertBox.className = 'alert alert-danger';
        alertBox.style.display = 'block';
    }
});

document.getElementById('submitNewAccount').addEventListener('click', function() {
    const username = document.getElementById('newUsername').value;
    const defaultPassword = document.getElementById('defaultPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const alertBox = document.getElementById('createAlert');
    const passwordRequirements = document.getElementById('passwordRequirements');
    
    // Determinar o papel (role) com base no e-mail
    let role;
    if (username.includes('.atendente')) {
        role = 'atendente';
    } else if (username.includes('.medico')) {
        role = 'medico';
    } else if (username.includes('.rh')) {  // Verificação do papel Rh
        role = 'Rh';
    }

    // Limpar alerta anterior
    alertBox.style.display = 'none';
    passwordRequirements.style.display = 'none'; // Esconder requisitos inicialmente

    // Função para validar a nova senha
    const isValidPassword = (password) => {
        const lengthValid = password.length >= 10;
        const uppercaseValid = /[A-Z]/.test(password);
        const numberValid = (password.match(/\d/g) || []).length >= 3;
        const specialCharValid = (password.match(/[!@#$%^&*]/g) || []).length >= 2;

        return lengthValid && uppercaseValid && numberValid && specialCharValid;
    };

    if (role) {
        // Validar a senha padrão
        const expectedPassword = role === 'medico' ? 'medico123' : role === 'atendente' ? 'atendente123' : 'rh123';
        if (defaultPassword === expectedPassword) {
            if (isValidPassword(newPassword)) {
                users[username] = { password: newPassword, role: role };
                alertBox.textContent = 'Conta criada com sucesso! Agora você pode fazer login.';
                alertBox.className = 'alert alert-success';
                alertBox.style.display = 'block';

                // Fechar o modal após a criação da conta
                setTimeout(() => {
                    document.getElementById('newUsername').value = '';
                    document.getElementById('defaultPassword').value = '';
                    document.getElementById('newPassword').value = '';
                    alertBox.style.display = 'none';
                    const modal = bootstrap.Modal.getInstance(document.getElementById('createAccountModal'));
                    modal.hide();
                }, 2000);
            } else {
                passwordRequirements.style.display = 'block'; // Mostrar requisitos
                alertBox.textContent = 'A nova senha não atende aos requisitos.';
                alertBox.className = 'alert alert-danger';
                alertBox.style.display = 'block';
            }
        } else {
            alertBox.textContent = 'Senha padrão incorreta!';
            alertBox.className = 'alert alert-danger';
            alertBox.style.display = 'block';
        }
    } else {
        alertBox.textContent = 'E-mail inválido. Use .atendente, .medico ou .rh no final do seu e-mail.';
        alertBox.className = 'alert alert-danger';
        alertBox.style.display = 'block';
    }
});

document.getElementById('togglePassword').addEventListener('click', function() {
    const passwordInput = document.getElementById('password');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.textContent = type === 'password' ? 'Ver' : 'Ocultar';
});
