
var quantiaTotal = "0,00"

function removeProduct(event){
    const removerProduto = document.getElementsByClassName("botao-remover")
    for (var i = 0; i < removerProduto.length; i++){
        removerProduto[i].addEventListener("click", function(event){
            event.target.parentElement.parentElement.remove()
            updateTotal()
        
        
        })
    }
}






const quantidadeInput = document.getElementsByClassName("produto-qtd-input")
for (var i = 0; i < quantidadeInput.length; i++) {
    quantidadeInput[i].addEventListener("change", checkIfInputIsNull)
}

const addToCarrinho = document.getElementsByClassName("botao-adicionar")
for (var i = 0; i < addToCarrinho.length; i++) {
    addToCarrinho[i].addEventListener("click", addProductCart)
}

const botaoCompra = document.getElementsByClassName("botao-compra")[0]
botaoCompra.addEventListener("click", makefinalizar)

function makefinalizar() {
    if(quantiaTotal == "0,00") {
        alert("Seu carrinho está vazio!")
    } else {
        alert(
            `
            Obrigada pela sua compra!
            Valor do pedido: R$${quantiaTotal}
            Volte sempre!
            `
        )
    }

    document.querySelector(".cart-table tbody").innerHTML = ""
    updateTotal()
}

function checkIfInputIsNull(event) {
     if (event.target.value == "0") {
        event.target.parentElement.parentElement.remove()
     }
    updateTotal()
}

function addProductCart(event){
    const button = event.target
    const productInfos = button.parentElement.parentElement
    const productImagem = productInfos.getElementsByClassName("foto-produto")[0].src
    const tituloProduto = productInfos.getElementsByClassName("titulo-produto")[0].innerText
    const precoProduto = productInfos.getElementsByClassName("preco-produto")[0].innerText
    const productCartName = document.getElementsByClassName("cart-produto-title")
    for (var i = 0; i < productCartName.length; i++){
        if(productCartName[i].innerText == tituloProduto) {
            productCartName[i].parentElement.parentElement.getElementsByClassName("produto-qtd-input")[0].value++
            return
        }
    }

    let newCartProduct = document.createElement("tr")
    newCartProduct.classList.add("cart-product")
    newCartProduct.innerHTML = 
    `
    <td class="identificacao-produto">
        <img src="${productImagem}" alt="${tituloProduto}" class="cart-produto-imagem"><strong class="cart-produto-title">${tituloProduto}</strong>
    </td>
    <td>
        <span class="cart-produto-preco">${precoProduto}</span>
    </td>
    <td>
        <input type="number" value="1" min="0" class="produto-qtd-input"><button type="button" class="botao-remover">Remover</button>
    </td>

    `

    const tableBody = document.querySelector(".cart-table tbody")
    tableBody.append(newCartProduct)

    updateTotal()
    newCartProduct.getElementsByClassName("produto-qtd-input")[0].addEventListener("change", checkIfInputIsNull)
    newCartProduct.getElementsByClassName("botao-remover")[0].addEventListener("click", removeProduct)
}

function updateTotal() {

    quantiaTotal = 0
    const cartProducts = document.getElementsByClassName("cart-product")
    for (var i = 0; i < cartProducts.length; i++) {
        const precoProduto = cartProducts[i].getElementsByClassName("cart-produto-preco")[0].innerText.replace("R$", "").replace(",", ".")
        const quantidadeProduto = cartProducts[i].getElementsByClassName("produto-qtd-input")[0].value
    
        quantiaTotal = quantiaTotal + (precoProduto * quantidadeProduto)
    
    }
    quantiaTotal = quantiaTotal.toFixed(2)
    quantiaTotal = quantiaTotal.replace(".", ",")
    document.querySelector(".cart-total span").innerText = "R$" + quantiaTotal
}



