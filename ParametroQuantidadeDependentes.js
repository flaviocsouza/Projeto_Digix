module.exports = (quantidadeDependentes, pontuacaoQuantidadeDependentes)=>{

    parametrosQuantidadeDependentes ={};
    parametrosQuantidadeDependentes.quantidadeDependentes = quantidadeDependentes || 0;
    parametrosQuantidadeDependentes.pontuacaoQuantidadeDependentes = pontuacaoQuantidadeDependentes || 0;

    return parametrosQuantidadeDependentes;

}