module.exports ={

    calculaMaiorDeIdade(stringData) {
        return calculaIdadePessoa(stringData) < 18;
    
    },   
    
    calculaIdadePessoa(stringData) {
    
        const conversorMilissegundosAnos = 3.2 * Math.pow(10, -11);
    
        let idadeMs = new Date() - new Date(stringData);
        let idade = idadeMs * conversorMilissegundosAnos;
    
        return idade;
    }

}

