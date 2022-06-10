function montaCard(product) {

    const sessaoProduct = document.querySelector(".containerListaProdutos")

    const ul = document.createElement("ul");
    ul.className = "card"
    
    const li = document.createElement("li");
    li.className = "li-geral"
    li.appendChild(criaCardHeaderImage(product))
    li.appendChild(criaCardMainTitulo(product))
    li.appendChild(criaCardMainCategoria(product))
    li.appendChild(criaCardMainInfo(product.componentes))
    li.appendChild(criarCardFooter(product))
    
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

function criaCardMainInfo(componentes) {

    const div = document.createElement("div");
    div.className = "div-info";

    const ul = document.createElement("ul");
    ul.className = "ul-info"

    componentes.forEach((componente, index) => {
        const li =  document.createElement("li");
        li.innerText = `${index+1}. ${componente}`
        li.className = "li-info"

        ul.append(li)
        
    })
    div.append(ul)
    return div
}

function criaFooterPreco(product) {
    
    const divPreco = document.createElement("div");
    divPreco.className = "divPreco";
    
    const p = document.createElement("p");
    p.innerText = `R$${product.preco}`;
    
    divPreco.appendChild(p);

    return divPreco;
}

function criaFooterButton(product) {

    const divButton = document.createElement("div");
    divButton.className = "divButton";
    
    const button = document.createElement("button");
    button.className = "button";
    button.id = product.id;
    button.innerText = "Comprar";
    
    divButton.appendChild(button);

    return divButton;
}

function criarCardFooter(product) {

    const div = document.createElement("div");
    div.className = "div-footer"
    div.append(criaFooterPreco(product),criaFooterButton(product));

    return div;
}


function limpaTela() {

    const sessaoProduct = document.querySelector(".containerListaProdutos")
    sessaoProduct.innerHTML = "";

}

function limpaTelacarrinho() {

    const divGeral = document.querySelector(".div-corpo-carrinho");
    divGeral.innerText = "";

}

function soma(lista) {

    let somaTudo = 0;

    for(let i = 0; i < lista.length; i++) {
        somaTudo += parseInt(lista[i].preco)
    }

    return somaTudo;
}

function listaCards(arrayObject) {

    limpaTela();

    const valorSoma = soma(arrayObject);
   // alteraPreco(valorSoma);

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
        limpaCampo();
        return valorNaoEncontrado();
    }else{
        limpaCampo();
        return listaCards(value);
    }

}

function limpaCampo() {
    const campo = document.querySelector(".campoBuscaPorNome");
    campo.value = ""

    return campo;
}

function montaCarrinho() {

    limpaTelacarrinho()
    const div = document.querySelector(".div-corpo-carrinho");
    const i = document.createElement("i");
    const p = document.createElement("p")
    const tag = '<i class="fa-solid fa-bag-shopping"></i>';
    const text = 'Por enquanto não temos produtos no carrinho';
    p.innerText = text;
    i.innerHTML = tag;
    div.append(i,p);
   
    return div;
}
montaCarrinho()

function criaCardCarrinho(product) {
    

    const divCard = document.createElement("div");
    divCard.className = "div-card-carrinho";

    const figure = document.createElement("figure");
    figure.className = "figure-carrinho";

    const img = document.createElement("img");
    img.className = "img-carrinho";
    img.src = product.img;

    const divInfo = document.createElement("div");
    divInfo.className = "divInfo-card-carrinho";

    const pNome = document.createElement("p");
    pNome.className = "p-nome-carrinho";
    pNome.innerText = product.nome;

    const pCategoria = document.createElement("p");
    pCategoria.className = "p-categoria-carrinho";
    pCategoria.innerText = product.categoria;

    const pPreco = document.createElement("p");
    pPreco.className = "p-preco-carrinho";
    pPreco.innerText = product.preco;

    const button = document.createElement("button");
    button.className = "button-card-carrinho";
    button.innerHTML = '<i class="fa-solid fa-trash-can"></i>'

    divInfo.append(pNome, pCategoria, pPreco);
    figure.appendChild(img)
    divCard.append(figure, divInfo, button);

    return divCard;
}

let arrayProductNumber = [];

function montaCardCarrinho(product) {
    
    let produto = ""
    let number = 0

    product.forEach((elem, index) => {
        produtos.filter((elemDataBase) => {
            if(elemDataBase.id == product[index]) {
                produto = criaCardCarrinho(elemDataBase)
                produto.id = index+1;
                number = number + 1
            }
        }) 
    })
    arrayProductNumber.push(number)
    return produto;
}

function eventFruit() {

    const buttonFruit = document.querySelector('.estiloGeralBotoes--filtrarHortifruti')
    buttonFruit.addEventListener("click", function(event) {
        
        if(event.target.innerText.includes("Hortifruti")) {
            const secao = filtraObjeto(produtos,'Hortifruti');
            listaCards(secao);
        }
    })
}
eventFruit()

function eventLaticinio() {

    const buttonLaticinio = document.querySelector('.estiloGeralBotoes--filtrarLaticinio')
    buttonLaticinio.addEventListener("click", function(event) {
        
        if(event.target.innerText.includes("Laticínio")) {
            const secao = filtraObjeto(produtos,'Laticínio');
            listaCards(secao);
        }
    })
}
eventLaticinio()

function eventPanificadora() {

    const buttonPanificadora = document.querySelector('.estiloGeralBotoes--filtrarPanificadora')
    buttonPanificadora.addEventListener("click", function(event) {
        
        if(event.target.innerText.includes("Panificadora")) {
            const secao = filtraObjeto(produtos,'Panificadora');
            listaCards(secao);
        }
    })
}
eventPanificadora()

function eventButtonTodos() {

    const buttonTodos = document.querySelector('.estiloGeralBotoes--mostrarTodos')
    buttonTodos.addEventListener("click", function() {
    
        listaCards(produtos);
        
    })
}
eventButtonTodos()

function eventBusca() {

    const buttonBusca = document.querySelector(".estiloGeralBotoes--botaoBuscaPorNome");
    buttonBusca.addEventListener("click", function(event) {
    
        event.preventDefault();
        const caixaDeTexto = document.querySelector('.campoBuscaPorNome');
        const valor = caixaDeTexto.value
        const produtoDigitado = verificaValor(valor);
        resultadoValor(produtoDigitado);
    })
}
eventBusca()

function eventTecla() {

    const campo =  document.querySelector(".campoBuscaPorNome");
    campo.addEventListener("keyup", function(e) {

        if(e.key == "Enter") {
            const valor = campo.value
            const produtoDigitado = verificaValor(valor);
            resultadoValor(produtoDigitado);
        }

    })
}
eventTecla()

let arrayProductId = [];

function montaCardCarrinhoProdutos(divPrincipal, divCapsula, text, produto, arrayTotal) {
    
    const divQuantidade = document.createElement("div");
    divQuantidade.className = "div-quantidade-carrinho";
    
    const pTexto = document.createElement("p");
    pTexto.innerText = text;
    
    const pNumber = document.createElement("p");
    pNumber.className = "p-quantidade";
    pNumber.innerText = arrayTotal;
    
    divQuantidade.append(pTexto, pNumber)
    divCapsula.append(produto)
    divPrincipal.append(divCapsula)
    divPrincipal.append(divQuantidade)

    return divQuantidade

}

function montaTotal(divPrincipal, text) {
    
    const divQuantidade = document.createElement("div");
    divQuantidade.className = "div-quantidade-total";
    
    const pTexto = document.createElement("p");
    pTexto.innerText = text;
    
    const pNumber = document.createElement("p");
    pNumber.className = "p-total";
    pNumber.innerText = '';
    
    divQuantidade.append(pTexto, pNumber)
    divPrincipal.append(divQuantidade)

    return divQuantidade

}

let prodObject = [];

function eventButtonCompra() {

    const divGeral = document.querySelector(".div-corpo-carrinho");

    const divCapsula = document.createElement("div");
    divCapsula.className = "div-capsula-carrinho";

    
    const eventButtonCompra = document.querySelector(".containerListaProdutos");
    eventButtonCompra.addEventListener("click", function(e) {
        
        const valor = e.target;
        
        if(valor.className === "button") {
            
            limpaTelacarrinho()
            
            const productId = e.target.id;
            arrayProductId.push(productId);
            montaCardCarrinhoProdutos(divGeral, divCapsula,"Quantidade", montaCardCarrinho(arrayProductId), arrayProductNumber.length);
            montaTotal(divGeral,"Total");
            
            const pNumber = document.querySelector(".p-total");
            const prod = produtos.find(elem => elem.id == e.target.id)
            prodObject.push(prod)
            
            let soma = 0;
            prodObject.forEach(elem => soma += parseInt(elem["preco"]))
            console.log(soma)
            pNumber.innerText = `${soma}.00`;

        }
    })
}
eventButtonCompra()

function eventButtonRemover() {

    const divCapsula = document.createElement("div");
    divCapsula.className = "div-capsula-carrinho";

    const eventButtonDelete = document.querySelector(".div-corpo-carrinho");
    eventButtonDelete.addEventListener("click", function(e) {
        
        
        const valor = e.target;

        if(valor.className === "fa-solid fa-trash-can" || valor.className === "button-card-carrinho") {

            for(let i = 0; i <= arrayProductNumber.length; i++) {

                let eventCardId = e.target.parentElement.parentElement.id;
                let eventCard = e.target.parentElement.parentElement;

                if(eventCardId == arrayProductNumber[i]) {
                    let index = arrayProductNumber.indexOf(arrayProductNumber[i])
                    arrayProductNumber.splice(index, 1);
                    eventCard.remove()

                    const pNumber = document.querySelector(".p-quantidade");
                    pNumber.innerText = arrayProductNumber.length;

                    //problema no eventCardId, pois na hora que ele compara um id do database e o id ficticio das divs dos cards do carrinho.
                    //por isso funciona até certo ponto, depois apresenta problema.
                    const pTotal = document.querySelector(".p-total");

                    prodObject.forEach(elem => {
                        let soma = pTotal.innerText;
                        if(elem.id == eventCardId) {
                            let index = prodObject.indexOf(prodObject[elem])
                            prodObject.splice(index, 1);
                            soma -= elem['preco']
                            pTotal.innerText = `${soma}.00`;
                        }
                    })
                    
                    if(arrayProductNumber.length == 0) {
                        montaCarrinho()
                    }
                }
            }
        }
        
    })
}
eventButtonRemover()
