function montaCard(product) {

    const sessaoProduct = document.querySelector(".containerListaProdutos")

    const ul = document.createElement("ul");
    ul.className = "card"
    
    const li = document.createElement("li");
    li.appendChild(criaCardHeaderImage(product))
    li.appendChild(criaCardMainTitulo(product))
    li.appendChild(criaCardMainCategoria(product))
    li.appendChild(criaFooterPreco(product))
    
    ul.appendChild(li)

    sessaoProduct.appendChild(ul)

    return ul
}

function criaCardHeaderImage(product) {

    const divImg = document.createElement("div");
    divImg.className = "divImg";
    
    const figure = document.createElement("figure");
    
    const imgProd = document.createElement("img");
    imgProd.src = product.img;

    
    divImg.appendChild(figure);
    figure.appendChild(imgProd);
    
    return divImg;

}

function criaCardMainTitulo(product) {

    const divTitulo = document.createElement("div");
    divTitulo.className = "divTitulo";
    
    const titulo = document.createElement("h3");
    titulo.innerText = product.nome;
    
    divTitulo.appendChild(titulo);
    
    return divTitulo;

}

function criaCardMainCategoria(product) {

    const divCategoria = document.createElement("div");
    divCategoria.className = "divCategoria";
    
    const tituloCategoria = document.createElement("h5");
    tituloCategoria.innerText = product.secao;
    
    divCategoria.appendChild(tituloCategoria);

    return divCategoria;

}

function criaFooterPreco(product) {
    
    const divPreco = document.createElement("div");
    divPreco.className = "divPreco";
    
    const p = document.createElement("p");
    p.innerHTML = `R$${product.preco}.00`;
    
    divPreco.appendChild(p);

    return divPreco;
}

function limpaTela() {

    const sessaoProduct = document.querySelector(".containerListaProdutos")
    sessaoProduct.innerHTML = "";

}

function soma(lista) {

    let somaTudo = 0;

    for(let i = 0; i < lista.length; i++) {
        somaTudo += lista[i].preco
    }

    return somaTudo;
}

function alteraPreco(value) {

    const precoAtual = document.querySelector("#precoTotal");
    precoAtual.innerText = value;

}

function listaCards(arrayObject) {

    limpaTela();

    const valorSoma = soma(arrayObject);
    alteraPreco(valorSoma);

    for(let i = 0; i < arrayObject.length; i++) {
        montaCard(arrayObject[i]);
    }

}

listaCards(produtos);

function filtraObjeto(dataBase,string) {

    const arrayFiltrado = dataBase.filter(item => item.secao === string)
    return arrayFiltrado;
}

function valorNaoEncontrado() {

    limpaTela()

    const divContainer = document.querySelector(".containerListaProdutos");

    const div = document.createElement("div");
    div.className = "div-produto-nao-encontrado"

    const p = document.createElement("p");

    div.appendChild(p);
    divContainer.appendChild(div);

    p.innerText = "Produto não encontrado";

    alteraPreco("00")

    return divContainer;
}

function verificaValor(string) {

    let apoio = []

    for(let i = 0; i < produtos.length; i++) {
        if(string.toLowerCase() === produtos[i].nome.toLowerCase()) {
            apoio.push(produtos[i])
        }else if(string.toLowerCase() === produtos[i].categoria.toLowerCase()) {
            apoio.push(produtos[i])
        }else if(string.toLowerCase() === produtos[i].secao.toLowerCase()) {
            apoio.push(produtos[i])
        }
    }

    return apoio;
}

function resultadoValor(value) {

    const arrayApoio = []

    if(value.length === arrayApoio.length) {
        return valorNaoEncontrado();
    }else{
        return listaCards(value);
    }

}

function limpaCampo() {
    const campo = document.querySelector(".campoBuscaPorNome");
    campo.value = ""

    return campo;
}

const buttonFruit = document.querySelector('.estiloGeralBotoes--filtrarHortifruti')
buttonFruit.addEventListener("click", function(event) {
    
    if(event.target.innerText.includes("Hortifruti")) {
        const secao = filtraObjeto(produtos,'Hortifruti');
        listaCards(secao);
    }
})

const buttonLaticinio = document.querySelector('.estiloGeralBotoes--filtrarLaticinio')
buttonLaticinio.addEventListener("click", function(event) {
    
    if(event.target.innerText.includes("Laticínio")) {
        const secao = filtraObjeto(produtos,'Laticínio');
        listaCards(secao);
    }
})

const buttonPanificadora = document.querySelector('.estiloGeralBotoes--filtrarPanificadora')
buttonPanificadora.addEventListener("click", function(event) {
    
    if(event.target.innerText.includes("Panificadora")) {
        const secao = filtraObjeto(produtos,'Panificadora');
        listaCards(secao);
    }
})

const buttonTodos = document.querySelector('.estiloGeralBotoes--mostrarTodos')
buttonTodos.addEventListener("click", function() {

    listaCards(produtos);
    
})

const buttonBusca = document.querySelector(".estiloGeralBotoes--botaoBuscaPorNome");
buttonBusca.addEventListener("click", function(event) {

    event.preventDefault();
    const caixaDeTexto = document.querySelector('.campoBuscaPorNome');
    const valor = caixaDeTexto.value
    const produtoDigitado = verificaValor(valor);
    resultadoValor(produtoDigitado);
    limpaCampo();

})