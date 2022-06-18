let botaoAtualizar = document.getElementById('atualizar-saldo');
let botaoLimpar = document.getElementById('limpar-saldo');
let soma = document.getElementById('soma') as HTMLInputElement;
let campoSaldo = document.getElementById('campo-saldo');
var saldo:number = 0;

if (campoSaldo !== null) {
    campoSaldo.innerHTML = '0'
}

function somarAoSaldo(soma:number ) {
    saldo += soma;
    if (campoSaldo !== null) {    
        campoSaldo.innerHTML = saldo.toString();
    };
}

function limparSaldo() {
    if (campoSaldo !== null) {
        campoSaldo.innerHTML = '';
    };
}

if (botaoAtualizar !== null) {
    botaoAtualizar.addEventListener('click', function () {
    
        if (soma.value !== null) {
            return somarAoSaldo(Number(soma.value));
        }
    
    });
};

if (botaoLimpar !== null) {
    botaoLimpar.addEventListener('click', function () {
        saldo = 0;
        limparSaldo();
    });
};
