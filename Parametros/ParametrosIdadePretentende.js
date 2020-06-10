module.exports = (idadePretendente, valorPontuacaoIdadePretendente) =>{

    let parametroIdadePretendente = {}
    parametroIdadePretendente.idadePretendente = idadePretendente || 0;
    parametroIdadePretendente.valorPontuacaoIdadePretendente = valorPontuacaoIdadePretendente  || 0;
    
    return parametroIdadePretendente;

}