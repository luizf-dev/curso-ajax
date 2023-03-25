//* FUNÇÃO QUE É ENCARREGADA DE CONVERTER O XML PARA JSON
function xmlToJson(xml) {    

    var obj = {}, i, j, attribute, item, nodeName, old;

    if (xml.nodeType === 1) { //* element
        //* do attributes
        if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
            for (j = 0; j < xml.attributes.length; j = j + 1) {
                attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType === 3) { // text
        obj = xml.nodeValue.trim();
    }

    //* do children
    if (xml.hasChildNodes()) {
        for (i = 0; i < xml.childNodes.length; i = i + 1) {
            item = xml.childNodes.item(i);
            nodeName = item.nodeName;
            if ((obj[nodeName]) === undefined) {
                obj[nodeName] = xmlToJson(item);
            } else {
                if ((obj[nodeName].push) === undefined) {
                    old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item));
            }
        }
    }
    return obj;
};
//*-------------------------------------------------------------------**//



//* Função que receberá o catalogo de filmes 
function getFilmes(){

    //* Instanciando o método httpRequest do browser
    let xmlHttp = new XMLHttpRequest();

    //* Chama o método OPEN e passa o verbo que será utilizado, e a URL que será requisitada
    xmlHttp.open('GET', 'http://localhost/Curso-Ajax/filmes.XML');

    //* Faz o controle e verifica os estado e o Status da requisição
    xmlHttp.onreadystatechange = () => {

        if(xmlHttp.readyState == 4 && xmlHttp.status == 200){

            let xmlFilmes = xmlHttp.responseText;
            
            let parser = new DOMParser();

            xmlFilmesParse = parser.parseFromString(xmlFilmes, 'text/xml');
           


            jsonFilmes = xmlToJson(xmlFilmesParse);

            

            


            /*<div class="col-sm-12 col-md-8 div-filmes">
                <p><strong>Título:</strong> Titulo do filme</p>
                <p><strong>Resumo:</strong> Resumo do filme</p>
                <p><strong>Gênero:</strong> Gênero do filme</p>
                <p><strong>Elenco:</strong> Elenco do filme</p>
                <p><strong>Data de lançamento:</strong> Data de lançamento do filme</p>
                <hr>
            </div>*/
        }

        if(xmlHttp.readyState == 4 && xmlHttp.status == 404){

            //
        }
    }
    //* Faz o envio da requisição com o método SEND
    xmlHttp.send()
}

