// PROJETO: Gerenciador de Finanças
// Objetivo: Aplicar lógica de ADS (Variáveis e Condicionais)

let nomeUsuario = "Erick Souza";
let saldoInicial = 2500.00;
let contaLuz = 150.00;
let contaInternet = 100.00;
let lazer = 300.00;

// O código faz os cálculos automaticamente
let totalDespesas = contaLuz + contaInternet + lazer;
let saldoFinal = saldoInicial - totalDespesas;

console.log("--- Relatório de Finanças de " + nomeUsuario + " ---");
console.log("Saldo Inicial: R$ " + saldoInicial.toFixed(2));
console.log("Total Gasto: R$ " + totalDespesas.toFixed(2));
console.log("Saldo Final: R$ " + saldoFinal.toFixed(2));

// Lógica de decisão
if (saldoFinal > 0) {
    console.log("Status: Você fechou o mês no AZUL! ✅");
} else {
    console.log("Status: Atenção, você está no VERMELHO! ⚠️");
}