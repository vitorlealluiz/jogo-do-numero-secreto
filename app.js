let listaDeNumeroSorteados = [];
let numeroLimite = 50
exibirMensagemInicial();
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTexto(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    /*Parte que se conecta com a linha 7 do HTML e permite falar */
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeElementosLista = listaDeNumeroSorteados.length;
    
    /*Verifica se a lista está cheia para inicia=la novamente*/
    if (quantidadeElementosLista == numeroLimite){
        listaDeNumeroSorteados = [];
    }

    /*A função includes vai verificar dentro da lista se 
    existe o número escolhido, para evitar repetição*/
    if (listaDeNumeroSorteados.includes(numeroEscolhido)){

        //Recursão (a função chama ela mesma)
        return gerarNumeroAleatorio();
    } else{

        /*Aqui estou adicionando o numero escolhido no 
        final da lista utilizando a função push*/
        listaDeNumeroSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo(){
    let inputChute = document.querySelector('input');
    inputChute.value = '';
}

function exibirMensagemInicial(){
    exibirTexto("h1", "Jogo do número secreto");
    exibirTexto("p", `Escolha um número de 1 a ${numeroLimite}`);
}

function verificarChute(){
    let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
    let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
    let chute = document.querySelector("input").value;
    
    if(chute == numeroSecreto){
        exibirTexto("h1", "Parabéns, você acertou");
        exibirTexto("p", mensagemTentativas);

        /*O elemento "novo jogo" vai estar habilitado, pois o usuário
        acertou o numero*/
        document.getElementById("reiniciar").removeAttribute("disabled");

    } else{
        if (chute > numeroSecreto){
            exibirTexto("h1", "O número secreto é menor");

        } else{
            exibirTexto("h1", "O número secreto é maior");
        }

        tentativas++;
        limparCampo();
    }           
}

/*É chamada no html para poder reiniciar o jogo no botao ""novo jogo*/
function reiniciarJogo(){
    exibirMensagemInicial();
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1; 
    /*Desabilita o botao de reiniciar jogo, pois o numero ainda não foi
    descoberto, então o usuário não pode reiniciar o jogo */
    document.getElementById("reiniciar").setAttribute("disabled", true);
}




