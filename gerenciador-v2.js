const input = require('readline-sync');

let saldo = 1000; 
let continuar = 's'; 

while (continuar === 's') {
    let conta = parseFloat(input.question("Quanto custa a conta? "));
    
    // Se o valor da conta for menor ou igual ao que eu tenho...
    if (conta <= saldo) {
        saldo = saldo - conta;
        console.log("Pago com sucesso! Saldo restante: R$ " + saldo);
    } else {
        // Se a conta for mais cara que o saldo...
        console.log("Saldo insuficiente! Voce so tem R$ " + saldo);
    }

    continuar = input.question("Quer tentar pagar outra? (s/n): ");
}

console.log("Fim do dia. Saldo final: R$ " + saldo);