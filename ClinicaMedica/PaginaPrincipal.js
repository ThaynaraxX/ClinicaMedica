let currentIndex = 0;

function changeImage(direction) {
    const images = document.querySelectorAll('.slider-img');
    
    // Remove a classe 'active' da imagem atual
    images[currentIndex].classList.remove('active');
    
    // Atualiza o índice da imagem
    currentIndex = (currentIndex + direction + images.length) % images.length;
    
    // Adiciona a classe 'active' à próxima imagem
    images[currentIndex].classList.add('active');

    console.log("Imagem alterada para o índice: " + currentIndex); // Debug
}

// Inicializar o slider para mostrar a primeira imagem
document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll('.slider-img');
    images[0].classList.add('active');  // Exibe a primeira imagem ao carregar a página
});

document.addEventListener("DOMContentLoaded", () => {
    const especialidadeBoxes = document.querySelectorAll('.especialidade-box');

    // Para cada box de especialidade
    especialidadeBoxes.forEach(box => {
        const saibaMaisBtn = box.querySelector('.saiba-mais');
        
        // Mostra o botão "Saber Mais" quando o mouse entra
        box.addEventListener('mouseenter', () => {
            saibaMaisBtn.style.display = 'inline-block';  // Exibe o botão
        });

        // Esconde o botão "Saber Mais" quando o mouse sai
        box.addEventListener('mouseleave', () => {
            saibaMaisBtn.style.display = 'none';  // Esconde o botão
        });
    });
});

