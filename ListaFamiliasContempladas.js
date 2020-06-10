const ParametroRendaFamiliar = require('./ParametrosRendaFamiliar');
const ParametrosIdadePretentende = require('./ParametrosIdadePretentende');
const ParametrosQuantidadeDependentes = require('./ParametroQuantidadeDependentes');
const Utilitarios = require('./Utilitarios');


//Parâmetros.
/*Inicialmente a ideia é que os parametros sejam carregados de um banco de dados, 
ou outro meio externo, onde a alteração, remoção ou edição destes não implica efetuar 
nenhuma nova edição no codigo fonte*/
listaParametrosRenda = [];
listaParametrosRenda.push(ParametroRendaFamiliar(900, 5));
listaParametrosRenda.push(ParametroRendaFamiliar(1500, 3));
listaParametrosRenda.push(ParametroRendaFamiliar(2000, 1));
listaParametrosRenda.sort((paramA, paramB) => paramA.rendaTotalFamiliar - paramB.rendaTotalFamiliar);


listaParametrosIdadePretendente = [];
listaParametrosIdadePretendente.push(ParametrosIdadePretentende(45, 5));
listaParametrosIdadePretendente.push(ParametrosIdadePretentende(30, 5));
listaParametrosIdadePretendente.sort((paramA, paramB) => paramB.idadePretendente - paramA.idadePretendente);

listaParametrosQuantidadeDependentes = []
listaParametrosQuantidadeDependentes.push(ParametrosQuantidadeDependentes(3, 3));
listaParametrosQuantidadeDependentes.sort((paramA, paramB) => paramA.quantidadeDependentes - paramB.quantidadeDependentes);
//


function pontuarRendaFamilia(familia) {
    let rendaTotal = familia.rendas.reduce((valorTotal, valorPessoa) => valorTotal + valorPessoa, 0);
    let parametroEnquadrado = listaParametrosRenda.find(parametro => parametro.rendaTotalFamiliar >= rendaTotal);
    return parametroEnquadrado.pontuacaoRenda || 0;
}

function pontuarIdadePretendente(familia) {
    let pretendente = familia.pessoas.find(pessoa => pessoa.tipo == 'Pretendente');
    let parametroEnquadrado = listaParametrosIdadePretendente.find(parametro => parametro.idadePretendente <= Utilitarios.calculaIdadePessoa(pretendente.dataDeNascimento));
    return parametroEnquadrado.pontuarIdadePretendente || 1;

}

function pontuarQuantidadeDependentes(familia) {
    let quantidadeDependentes = familia.pessoas.filter(pessoa => pessoa.tipo == 'Dependente' && Utilitarios.calculaMaiorDeIdade(pessoa.dataDeNascimento)).length;
    let parametroEnquadrado = listaParametrosQuantidadeDependentes.filter(parametro => parametro.quantidadeDependentes >= quantidadeDependentes)
    return parametroEnquadrado.pontuarQuantidadeDependentes;
}

module.exports = (listaDeFamilias) => {
    let listaDeFamiliasPontuadas = listaDeFamilias.filter(familia => familia.status == 0)
        .map(familia => {

            let pontuacaoFamiliar = {};

            let pontuacao = 0;
            let quantidadeParametosAtendidos = 0;


            pontuacaoRendaFamilia = pontuarRendaFamilia(familia);
            pontuacao += pontuacaoRendaFamilia;
            if (pontuacaoRendaFamilia > 0) quantidadeParametosAtendidos++;

            pontuacaoIdadePretendente = pontuarIdadePretendente(familia);
            pontuacao += pontuacaoIdadePretendente;
            if (pontuacaoIdadePretendente > 0) quantidadeParametosAtendidos++;

            pontuacaoQuantidadeDependentes = pontuarQuantidadeDependentes(familia);
            pontuacao += pontuacaoQuantidadeDependentes;
            if (pontuacaoQuantidadeDependentes > 0) quantidadeParametosAtendidos++;

            pontuacaoFamiliar.id = familia.id;
            pontuacaoFamiliar.pontuacao = pontuacao;
            pontuacaoFamiliar.dataComtemplacao = new Date();

            return pontuacaoFamiliar;

        })
        .sort((familiaA, familiaB) => {
            return familiaA.pontuacao - familiaB.pontuacao;
        });

    return listaDeFamiliasPontuadas;
}
