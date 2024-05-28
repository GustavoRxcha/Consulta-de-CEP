function consultaEndereco() {
    let cep = document.querySelector('#cep').value;

    if (cep.length !== 8) {
        alert('CEP Inválido!');
        return;
    }

    let url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url).then(function(response){
        response.json().then(mostrarEndereco);
    });
}

function mostrarEndereco(dados) {
    let resultado = document.querySelector('#resultado');
    if (dados.erro) {
        resultado.innerHTML = "Não foi possível localizar endereço!";
    } else {
        resultado.innerHTML = `<p>CEP: ${dados.cep}</p>
                               <p>Endereço: ${dados.logradouro}</p>
                               <p>Bairro: ${dados.bairro}</p>
                               <p>Cidade: ${dados.localidade} - ${dados.uf}</p>` 

        localStorage.setItem('endereco', JSON.stringify(dados));
    }
}

function carregarEndereco() {
    let enderecoSalvo = localStorage.getItem('endereco');
    if (enderecoSalvo) {
        let dados = JSON.parse(enderecoSalvo);
        mostrarEndereco(dados);
    }
}

window.onload = carregarEndereco;