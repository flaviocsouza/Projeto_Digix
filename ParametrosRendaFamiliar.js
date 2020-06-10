module.exports =  (rendaTotalFamiliar, pontuacaoRenda) =>{

    parametroRendaFamiliar = {};

    parametroRendaFamiliar.rendaTotalFamiliar = rendaTotalFamiliar || 0;
    parametroRendaFamiliar.pontuacaoRenda = pontuacaoRenda || 0;
    
    return parametroRendaFamiliar;
}