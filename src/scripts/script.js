const cepInput = document.getElementById("cep");
const logradouroInput = document.getElementById("logradouro");
const bairroInput = document.getElementById("bairro");
const localidadeInput = document.getElementById("localidade");
const ufInput = document.getElementById("uf");
const dialog = document.getElementById("erro-dialog");
const fecharDialogBtn = document.getElementById("fechar-dialog");


// cepInput.addEventListener('input', function(){
//     let cep = this.value
//     cep = cep.replace('-', '').trim()

//     if(cep.length === 8){
//         obterEndereco(cep)
//             .then(dados => {
//                 if(dados.erro){
//                     throw Error('Cep inválido')
//                 }
//                 mostrarDados(dados)
//             })
//             .catch(err => {
//                 limparDados()
//                 mostrarErro(err)
//                 // console.log(err)
//             })
//     }
// })

// function obterEndereco(cep){
//     return fetch(`https://viacep.com.br/ws/${cep}/json/`)
//         .then( resp => {
//             if(!resp.ok){
//                 throw Error("Erro ao buscar o cep");
//             }
//             return resp.json()
//         })
// }

cepInput.addEventListener('input', async function(){
    let cep = this.value
    cep = cep.replace('-', '').trim()

    if(cep.length === 8){
        try{
            const dados = await obterEndereco(cep)
            if(dados.erro){
                throw Error('Erro ao buscar cep')
            }
            mostrarDados(dados)
        }
        catch(err){
            limparDados()
            mostrarErro(err)
            // console.log(err)
        }
    }
    else{
        limparDados()
    }
})

async function obterEndereco(cep){
    const resp = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    
    if(!resp.ok){
        throw Error("Erro ao buscar o cep");
    }
    return await resp.json()
}

function mostrarDados(dados){
    logradouroInput.value = dados.logradouro || ''
    bairroInput.value = dados.bairro || ''
    localidadeInput.value = dados.localidade || ''
    ufInput.value = dados.uf || ''
}

function limparDados(){
    logradouroInput.value = ""
    bairroInput.value = "" 
    localidadeInput.value = "" 
    ufInput.value = "" 
}

function mostrarErro(){
    dialog.showModal()
}

fecharDialogBtn.addEventListener('click', function(){
    dialog.close()
})


