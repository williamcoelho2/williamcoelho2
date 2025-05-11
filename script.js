const numbersContainer = document.getElementById('numbersContainer');
const whatsappNumber = '5562981897524';
const initialText = 'Que a sorte floresça neste Dia das Mães! 🌸💖 Escolhi os seguintes números da sorte: ';
const whatsappMessageElement = document.getElementById('whatsappMessage');
const messageContainer = document.getElementById('message-container');
const legendVendidos = document.getElementById('legend-vendidos');
const verMaisBtn = document.getElementById('verMaisBtn');

const totalNumeros = 1000;
const numerosPorCarregamento = 500; // Quantos números mostrar por vez
let numerosCarregados = 0;

// Função para verificar se há números repetidos em um array
function verificarNumerosRepetidos(array) {
  const seen = {};
  for (let i = 0; i < array.length; i++) {
    const numero = array[i];
    if (seen[numero]) {
      return true; // Encontrou um número repetido
    }
    seen[numero] = true;
  }
  return false; // Nenhum número repetido encontrado
}

// Lista de números já vendidos (você precisará atualizar esta lista)
const numerosVendidos = [1, 4, 14, 20, 42, 52, 85, 87, 91, 100, 30, 36, 59, 10, 11, 6, 12, 23, 33, 81, 2, 3, 29, 8, 15, 16, 24, 27, 28, 31, 99, 13 ,21 ,25, 32, 34, 35, 38, 39, 40, 44, 47, 49, 54, 55,58, 67, 77, 5, 7, 17, 18, 43, 46, 22, 45, 71, 300, 50, 51, 53, 56, 57, 92, 93, 94, 95, 96, 9, 19, 26, 37, 48, 66, 69, 80, 82, 83, 90, 177, 60, 65, 70, 114, 313, 41, 61, 62, 63, 64, 68, 76, 78, 79, 84, 112, 137, 74, 159, 168, 97, 98, 73, 72, 75, 86, 88, 89, 101, 111, 116, 120, 124, 102, 108, 110, 139, 162, 282, 523, 526, 530, 533, 534, 536, 540, 546, 586, 600, 113, 190, 200, 252, 699, 711, 713, 731, 741, 757, 765, 777, 797, 799, 121, 123, 126, 130, 132, 134, 202, 224, 232, 235, 238, 122, 144, 155, 157, 161, 166, 171, 180, 188, 199, 208, 211, 221, 222, 233, 244, 251, 255, 266, 277, 280, 107, 197, 207, 482, 483, 484, 485, 486, 487, 488, 489, 499, 500, 119, 163, 106, 109, 131, 151, 156, 160, 167, 182, 203, 212, 214, 103, 104, 127, 138, 142, 152, 170, 174, 219, 223, 254, 258, 307, 311, 374, 378, 476, 479, 480, 290, 295, 309, 105, 115, 117, 118, 125, 128, 129, 133, 135, 136, 140, 141, 143, 145, 146, 147, 148, 150, 153, 154, 158, 164, 165, 169, 172, 173, 175, 176, 178, 179, 181, 183, 184, 185, 186, 187, 189, 191, 192, 193, 194, 195, 196, 198, 201, 204, 205, 206, 209, 210, 213, 215, 149, 216, 217, 218, 225, 226, 227, 228, 220, 240, 260, 256, 257, 259, 261, 262, 263, 264, 265, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 279, 278, 284, 285, 287, 291, 294, 299, 302, 477, 478, 481, 490, 491, 492, 493, 494, 495, 496, 497, 498, 992, 994, 995, 996, 997, 998, 999, 1000, 229, 237, 243, 245, 250, 283, 298, 310, 319, 322, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 431, 432, 434, 435, 436, 437, 439, 440, 441, 442, 448, 450, 454, 457, 462, 464, 465, 467, 469, 470];

// Verifica se há números repetidos na lista de vendidos e loga no console
if (verificarNumerosRepetidos(numerosVendidos)) {
  console.error("ALERTA: Existem números repetidos na lista de números vendidos!");
} else {
  console.log("Não há números repetidos na lista de números vendidos.");
}

// Informa o número de números vendidos
console.log(`Total de números vendidos: ${numerosVendidos.length}`);


// Função para marcar os números vendidos
function marcarNumerosVendidos(listaVendidos) {
    if (listaVendidos.length > 0) {
        legendVendidos.style.display = 'block';
    }
    listaVendidos.forEach(numero => {
        const checkbox = document.getElementById(`number-${numero}`);
        const label = document.querySelector(`label[for="number-${numero}"]`);
        const numberItem = checkbox ? checkbox.parentNode : null;

        if (checkbox && label && numberItem) {
            checkbox.disabled = true;
            numberItem.classList.add('vendido');
        }
    });
}

function carregarMaisNumeros() {
    const proximoLimite = numerosCarregados + numerosPorCarregamento;
    const totalPagarElement = document.getElementById('total-a-pagar');
    const precoPorNumero = 0.49; // Valor por número

    for (let i = numerosCarregados + 1; i <= Math.min(proximoLimite, totalNumeros); i++) {
        const numberItem = document.createElement('div');
        numberItem.classList.add('number-item');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = i;
        checkbox.id = `number-${i}`;

        const label = document.createElement('label');
        label.textContent = i;
        label.setAttribute('for', `number-${i}`);

        numberItem.appendChild(checkbox);
        numberItem.appendChild(label);
        numbersContainer.appendChild(numberItem);

        // Adiciona o event listener para atualizar o total ao mudar o estado do checkbox
        checkbox.addEventListener('change', function() {
            const selectedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked:not(:disabled)');
            const totalSelecionado = (selectedCheckboxes.length * precoPorNumero).toFixed(2).replace('.', ',');
            totalPagarElement.textContent = `Valor pelos seus numéros da sorte: R$ ${totalSelecionado}`;
        });
    }
    numerosCarregados = proximoLimite;

    // Esconde o botão "Ver Mais" se todos os números foram carregados
    if (numerosCarregados >= totalNumeros) {
        verMaisBtn.style.display = 'none';
    }

    // Marca os números vendidos APÓS carregar a primeira parte
    marcarNumerosVendidos(numerosVendidos);

    // Inicializa o valor total na tela
    const initialSelectedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked:not(:disabled)');
    const initialTotal = (initialSelectedCheckboxes.length * precoPorNumero).toFixed(2).replace('.', ',');
    totalPagarElement.textContent = `Valor pelos seus numéros da sorte: R$ ${initialTotal}`;
}

// Carregar os primeiros números
carregarMaisNumeros();

// Adicionar evento de clique ao botão "Ver Mais"
verMaisBtn.addEventListener('click', carregarMaisNumeros);

function enviarParaWhatsApp() {
    const precoPorNumero = 0.49; // Valor por número (pode ser alterado)
    const selectedNumbers = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked:not(:disabled)');
    const totalPagarElement = document.getElementById('total-a-pagar');

    checkboxes.forEach(checkbox => {
        selectedNumbers.push(checkbox.value);
    });

    const totalAPagar = (selectedNumbers.length * precoPorNumero).toFixed(2).replace('.', ',');
    totalPagarElement.textContent = `Valor pelos seus numéros da sorte: R$ ${totalAPagar}`; // Atualiza o elemento HTML

    if (selectedNumbers.length > 0) {
        const numbersText = selectedNumbers.join(', ');
        const mensagem = `${initialText}${numbersText}\nValor pelos seus numéros da sorte: R$ ${totalAPagar}`;
        const fullText = encodeURIComponent(mensagem);
        const whatsappLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${fullText}`;

        window.open(whatsappLink, '_blank');
        whatsappMessageElement.textContent = mensagem;
        messageContainer.style.display = 'block'; // Mostrar a mensagem na tela
    } else {
        alert('Selecione pelo menos um número para comprar.');
    }
}