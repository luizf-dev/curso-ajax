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
            
            //* Aqui começa a conversão de xml para Json
            //* O DOMParser transforma uma string contendo marcaçoes html ou xml em um 
            //* objeto que pode ser manipulado pelo javascript
            let parser = new DOMParser();

            //* O ParseFromString é um método do objeto DOMParser que analisauma sequencia de caracteres
            //* e cria um documento DOM.
            xmlFilmesParse = parser.parseFromString(xmlFilmes, 'text/xml'); 

            jsonFilmes = xmlToJson(xmlFilmesParse);

            //* Faz um laço de repetição nas informações contidas nos registros dos filmes
            for(let i in jsonFilmes['filmes']['filme']){
                let item = jsonFilmes['filmes']['filme'][i];

                //* Criando os htmls de forma dinâmica de acordo com o conteudo
                let divRow = document.createElement('div');
                divRow.className = 'row';

                let divFilmes = document.createElement('div');
                divFilmes.className = 'col-sm-12 col-md-8 divFilmes';

                let p1 = document.createElement('p');
                p1.innerHTML = '<strong>Título:</strong> ' + item['titulo']['#text'];

                let p2 = document.createElement('p');
                p2.innerHTML = '<strong>Resumo:</strong> ' + item['resumo']['#text'];

                let genero = '';
                for(let g in item.genero){
                    if(genero){
                        genero += ', ';
                    }
                    genero += item.genero[g]['#text'];
                }

                let p3 = document.createElement('p');
                p3.innerHTML = '<strong>Gênero:</strong> ' + genero ;

                let elenco = '';
                for(let e in item.elenco.ator){
                    if(elenco){
                        elenco += ', ';
                    }
                    elenco += item.elenco.ator[e]['#text'];
                }

                let p4 = document.createElement('p');
                p4.innerHTML = '<strong>Elenco:</strong> ' + elenco;

                let p5 = document.createElement('p');
                p5.innerHTML = '<strong>Data de lançamento:</strong> ' + item.dataLancamento['#text'] + 
                ' ('+ item.dataLancamento['@attributes']['pais'] +')';
                
                let hr = document.createElement('hr');

                divRow.appendChild(divFilmes);
                divFilmes.appendChild(p1);
                divFilmes.appendChild(p2);
                divFilmes.appendChild(p3);
                divFilmes.appendChild(p4);
                divFilmes.appendChild(p5);
                divFilmes.appendChild(hr);

                document.getElementById('lista').appendChild(divRow);

            
            }
        }

        if(xmlHttp.readyState == 4 && xmlHttp.status == 404){

            //
        }
    }
    //* Faz o envio da requisição com o método SEND
    xmlHttp.send()
}

