//! REQUISIÇÕES ASSÍNCRONAS SÃO EFETUADAS PELO BROWSER, PASSANDO PELO OBJETO DOS NAVEGADORES
//! XMLhttpREQUEST QUE É RESPONSÁVEL POR ENVIAR A REQUISIÇÃO PARA O SERVIDOR E GERENCIAR E DEVOLVER ESSA RESPOSTA

/* 
*READYSTATE - PROPRIEDADE DO OBJETO XMLhttpREQUEST (XHR)
*indica o estado atual da solicitação AJAX. A propriedade readyState pode ter um dos seguintes valores:

?   0 (UNSENT): A solicitação não foi inicializada.
?   1 (OPENED): A solicitação foi criada, mas ainda não foi enviada.
?   2 (HEADERS_RECEIVED): As informações de cabeçalho foram recebidas, mas o corpo da resposta ainda não está disponível.
?   3 (LOADING): A resposta está sendo recebida. Isso pode incluir dados parciais.
?   4 (DONE): A resposta foi completamente recebida e está pronta para ser usada.

*Essas são as descrições dos diferentes valores que a propriedade readyState do objeto XMLHttpRequest pode ter:

* request not initialized (estado 0): A solicitação ainda não foi inicializada.
! O objeto XMLHttpRequest foi criado, mas o método open() ainda não foi chamado.

* server connection established (estado 1): A conexão com o servidor foi estabelecida.
! O método open() foi chamado, mas o método send() ainda não foi chamado.

* request received (estado 2): O servidor recebeu a solicitação e começou a processá-la.
! Neste ponto, os cabeçalhos da resposta estão disponíveis através das propriedades getResponseHeader()
! e getAllResponseHeaders() do objeto XMLHttpRequest.

* processing request (estado 3): O servidor está processando a solicitação e enviando uma resposta.
! No entanto, a resposta ainda não está completa e ainda está sendo carregada pelo objeto XMLHttpRequest.

* request finished and response is ready (estado 4): A solicitação foi concluída e a resposta está pronta.
! A resposta pode ser acessada através das propriedades responseText, responseXML
! ou response do objeto XMLHttpRequest, dependendo do tipo de dados que estão sendo solicitados.
*/


function requisitarPagina(url){

/*
    //* REMOVE A MENSAGEM DEPOIS DE APRESENTADO O STATUS DA REQUISIÇÃO
    document.getElementById('conteudo').innerHTML = '';



    //* INCLUI O GIF DE LOADING N PÁGINA

    if (!document.getElementById('loading')) {

        let imgLoading = document.createElement('img');
        imgLoading.id = 'loading';
        imgLoading.src = 'loading.gif';
        imgLoading.className = 'rounded mx-auto d-block';

        document.getElementById('divGif').appendChild(imgLoading);
        
    }*/
    

    //* VARIÁVEL AJAX QUE CONTÉM UMA ISNTÂNCIA DO OBJETO XMLhttpREQUEST
    let ajax = new XMLHttpRequest();

    //* MÉTODO OPEN RESPONSÁVEL POR ESTABELECER UMA CONEXÃO COM O SERVIDOR E CONFIGURAR A URL QUE SERÁ REQUISITADA,
    //* NESSE CASO ATRAVÉS DO VERBO GET E PASSAR A URL QUE VAMOS UTILIZAR PARA ABRIR UMA CONEXÃO COM ALGUM SERVIDOR
    ajax.open('GET', url);

    //* ATRIBUTO DO OBJETO XMLhttpREQUEST QUE É EXECUTADO SEMPRE QUE O ESTADO DA REQUISIÇÃO É MODIFICADO, GERALMENTE
    //* ESSE ATRIBUTO RECEBE UMA FUNÇÃO, E AI ELE ACABA SE TORNANDO UM MÉTODO, INCLUSIVE PODEMOS USAR NELE A NOTAÇÃO
    //* DE ARROW FUNCTION COMO ABAIXO
    ajax.onreadystatechange = () => {

        if (ajax.readyState == 4 && ajax.status == 404) {

            document.getElementById('conteudo').innerHTML = 'ERROR: 404! Página não encontrada!';
        }

        if (ajax.readyState == 4 && ajax.status == 200) {

            document.getElementById('conteudo').innerHTML = ajax.responseText;
        }
    }

    //* MÉTODO SEND QUE DISPARA A REQUISIÇÃO PARA O SERVIDOR PARA QUE O XMLhttpREQUEST CONSIGA GERENCIAR A RESPOSTA
    ajax.send();

    //console.log(ajax);
}



