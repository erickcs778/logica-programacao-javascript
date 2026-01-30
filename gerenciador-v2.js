const input = require('readline-sync');
const fs = require('fs');

// Configurações Iniciais
let dados = { saldo: 1000, historico: [] };
const ARQUIVO = 'dados.json';

// --- FUNÇÕES DE APOIO (O que os recrutadores amam ver) ---

function carregarDados() {
    if (fs.existsSync(ARQUIVO)) {
        const conteudo = fs.readFileSync(ARQUIVO, 'utf8');
        dados = JSON.parse(conteudo);
    }
}

function salvarDados() {
    fs.writeFileSync(ARQUIVO, JSON.stringify(dados, null, 2));
}

function exibirSaldo() {
    console.log(`\n💰 SALDO ATUAL: R$ ${dados.saldo.toFixed(2)}`);
}

function registrarCompra() {
    let nome = input.question("\nO que voce comprou? ");
    let valor;

    while (true) {
        let entrada = input.question(`Quanto custou o(a) ${nome}? `);
        valor = parseFloat(entrada.replace(',', '.'));

        if (!isNaN(valor) && valor > 0) break;
        console.log("❌ Valor invalido!");
    }

    if (valor <= dados.saldo) {
        dados.saldo -= valor;
        dados.historico.push({ item: nome, preco: valor, data: new Date().toLocaleDateString() });
        salvarDados();
        console.log("✅ Compra registrada!");
    } else {
        console.log("⚠️ Saldo insuficiente!");
    }
}

function exibirExtrato() {
    console.log("\n--- EXTRATO DETALHADO ---");
    if (dados.historico.length === 0) {
        console.log("Nenhuma movimentacao encontrada.");
    } else {
        dados.historico.forEach(c => {
            console.log(`[${c.data}] ${c.item}: R$ ${c.preco.toFixed(2)}`);
        });
    }
    exibirSaldo();
}

// --- LOOP PRINCIPAL (O CORAÇÃO DO SISTEMA) ---

function iniciarSistema() {
    carregarDados();
    let rodando = true;

    while (rodando) {
        console.log("\n--- MENU FINANCEIRO ---");
        console.log("1. Registrar Compra");
        console.log("2. Ver Extrato");
        console.log("3. Resetar Dados");
        console.log("4. Sair");
        
        let opcao = input.question("Escolha uma opcao: ");

        switch (opcao) {
            case '1': registrarCompra(); break;
            case '2': exibirExtrato(); break;
            case '3': 
                if (input.question("Tem certeza? (s/n): ") === 's') {
                    dados = { saldo: 1000, historico: [] };
                    salvarDados();
                }
                break;
            case '4': 
                console.log("Saindo... Ate logo!");
                rodando = false; 
                break;
            default: console.log("Opcao invalida!");
        }
    }
}

iniciarSistema();