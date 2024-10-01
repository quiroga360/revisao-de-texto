// CLI - COMMAND LINE INTERFACE


// importar o fs permite a leitura de arquivos diferentes de js ou json
import fs from 'fs';
import path from 'path';
import trataErros from './erros/funcoesErros.js';
import { contaPalavras } from './index.js';
import { montaSaidaArquivo } from './helpers.js';
import { Command } from 'commander';

const program = new Command();

program
    .version('0.0.1')
    .option('-t, --texto <string>', 'caminho do texto a ser processado')
    .option('-d, --destino <string>', 'caminho da pasta onde salvar o arquivo de resultados')
    .action((options) => {
        const { texto, destino } = options;
        if (!texto || !destino) {
            console.error('erro: favor inserir caminho de origem e destino')
            program.help();
            return;
        };

        const caminhoTexto = path.resolve(texto);
        const caminhoDestinho = path.resolve(destino);


        try {
            processaArquivo(caminhoTexto, caminhoDestinho);
            console.log('texto processado');

        } catch (erro) {
            console.log("ocorreu um erro no processamento");
        };
    });

program.parse();

function processaArquivo(texto, destino) {
    // ler o arquivo que está no path armazenado em link
    fs.readFile(texto, 'utf-8', (erro, texto) => {

        try {
            if (erro) throw erro;
            const resultado = contaPalavras(texto);
            criaESalvaArquivo(resultado, destino)
        } catch (erro) {
            trataErros(erro);
        };

    });
}




// exportar arquivo

async function criaESalvaArquivo(listaPalavras, endereco) {
    const arquivoNovo = `${endereco}/resultado.txt`;
    const textoPalavras = montaSaidaArquivo(listaPalavras);
    try {
        await fs.promises.writeFile(arquivoNovo, textoPalavras);
        console.log('arquivo criado');
    } catch (erro) {
        throw erro;
    };
};


// exportar arquivo
/*
function criaESalvaArquivo(listaPalavras, endereco) {
    const arquivoNovo = `${endereco}/resultado.txt`;
    const textoPalavras = JSON.stringify(listaPalavras);

    fs.promises.writeFile(arquivoNovo, textoPalavras)
        .then(() => {
            console.log("arquivo criado");

        })
        .catch((erro) => {
            throw erro;
        })
        .finally(() => {
            console.log("operação finalizada");
        });
};
*/