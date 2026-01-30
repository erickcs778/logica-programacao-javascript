const input = require('readline-sync');
const fs = require('fs');

console.log("\n====================================");
console.log("    GERENCIADOR FINANCEIRO PRO");
console.log("====================================\n");

// --- 1. OPÇÃO DE DELETAR (RESET) ---
if (fs.existsSync('dados.json')) {
    let desejaResetar = input.question("Deseja apagar o historico e comecar do zero? (s/n): ");
    if (desejaResetar.toLowerCase() === 's') {
        fs.unlinkSync('dados.json');
        console.log("=> Arquivo de dados deletado!");
    }
}

// --- 2. CARREGAR DADOS ---
let dados = { saldo: 1000, historico: [] };

if (fs.existsSync('dados.json')) {
    const arquivo = fs.readFileSync('dados.json', 'utf8');
    dados = JSON.parse(arquivo);
    console.log(`> Saldo Recuperado: R$ ${dados.saldo.toFixed(2)}`);
} else {
    console.log("> Iniciando novo registro (Saldo: R$ 1000.00)");
}

// --- 3. LOOP DE COMPRAS (COM VALIDAÇÃO) ---
let continuar = 's';

while (continuar.toLowerCase() === 's') {
    let nome = input.question("\nO que voce comprou? ");
    let valor;

    // Loop de Segurança: Não deixa o programa quebrar se o usuário digitar texto
    while (true) {
        let entrada = input.question(`Quanto custou o(a) ${nome}? `);
        
        // Corrige a vírgula para ponto (ex: 5,50 vira 5.50)
        valor = parseFloat(entrada.replace(',', '.'));

        // Verifica se é um número válido e positivo
        if (!isNaN(valor) && valor > 0) {
            break; // Sai da "prisão" da validação
        } else {
            console.log("❌ Valor invalido! Por favor, digite apenas numeros (ex: 12.50).");
        }
    }

    if (valor <= dados.saldo) {
        dados.saldo -= valor;
        dados.historico.push({ 
            item: nome, 
            preco: valor, 
            data: new Date().toLocaleDateString() 
        });

        // SALVA NO ARQUIVO
        fs.writeFileSync('dados.json', JSON.stringify(dados, null, 2));
        console.log("✅ Registrado com sucesso!");
    } else {
        console.log("⚠️ ERRO: Saldo insuficiente!");
    }

    continuar = input.question("Registrar outro? (s/n): ");
}

// --- 4. EXTRATO FINAL ---
console.log("\n--- SEU EXTRATO ---");
if (dados.historico.length === 0) {
    console.log("Nenhuma compra registrada.");
} else {
    dados.historico.forEach(compra => {
        console.log(`[${compra.data}] ${compra.item}: R$ ${compra.preco.toFixed(2)}`);
    });
}
console.log(`\nSALDO FINAL: R$ ${dados.saldo.toFixed(2)}`);
console.log("====================================\n");