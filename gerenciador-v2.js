const input = require('readline-sync');

console.log("--- GERENCIADOR FINANCEIRO V2.0 ---");

// O programa para e espera você digitar
let nome = input.question("Qual o seu nome? ");
let saldo = parseFloat(input.question(`Ola ${nome}, qual seu saldo atual? `));
let conta = parseFloat(input.question("Valor da primeira conta a pagar: "));

let resultado = saldo - conta;

console.log("-----------------------------------");
console.log(`Resumo: ${nome}`);
console.log(`Saldo final: R$ ${resultado.toFixed(2)}`);

if (resultado >= 0) {
    console.log("Status: Tudo certo! ✅");
} else {
    console.log("Status: Cuidado, saldo negativo! ⚠️");
}