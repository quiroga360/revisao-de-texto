// importar o fs permite a leitura de arquivos diferentes de js ou json
const fs = require('fs');

// process.argv retorna um array com o path dos arquivos que estão sendo executados
const caminhoArquivo = process.argv;

// queremos armazenar o path que colocamos no prompt de execução
// node -> index.js -> {{path que especificamos no cmd de execução}}
const link = caminhoArquivo[2];

// ler o arquivo que está no path armazenado em link
fs.readFile(link, 'utf-8', (erro, texto) => {
    if (erro) {
        console.log("qual é o erro?", erro.code);
        return;
    };

    contaPalavras(texto);
});

function contaPalavras(texto) {
    const paragrafos = extraiParagrafos(texto);
    const contagem = paragrafos.flatMap((paragrafo) => {
        if (!paragrafo) return [];
        return verificaPalavrasDuplicadas(paragrafo);
    });
    console.log(contagem);
};

function extraiParagrafos(texto) {
    return texto.toLowerCase().split('\n');
};



function limpaPalavras(palavraInput) {
    return palavraInput.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
};


function verificaPalavrasDuplicadas(textoInput) {
    const listaPalavras = textoInput.split(' ');
    const resultado = {};

    listaPalavras.forEach(palavra => {
        if (palavra.length >= 3) {
            const palavraLimpa = limpaPalavras(palavra);
            resultado[palavraLimpa] = (resultado[palavraLimpa] || 0) + 1;
        };
    });

    return resultado;

};
