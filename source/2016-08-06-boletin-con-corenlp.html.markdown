---
title: Boletin oficial analizado con CoreNLP
date: 2016-08-06 22:49 UTC
tags:
---

En el [post anterior]() analizamos los documentos extraidos del boletín oficial
con una herramienta llamada Freeling. En este post vamos a repetir el mismo
análisis, pero usando [CoreNLP](http://stanfordnlp.github.io/CoreNLP/).

CoreNLP es la suite de NLP desarrollada en Stanford. Por suerte para nosotros,
cuenta con [modelos en Español](http://stanfordnlp.github.io/CoreNLP/index.html#human-languages-supported)
que si bien no son de lo más completos, nos van a permitir experimentar un
poco.

## Instalación

CoreNLP esta basado en Java (versión 8), es decir que vamos a necesitar tener
Java instalado. Luego bajamos CoreNLP del [sitio de descargas](http://stanfordnlp.github.io/CoreNLP/index.html#download)
y bajamos los archivos de los modelos en Español de la misma página.

CoreNLP cuenta con una API RESTful, pero no es muy fácil de usar por lo que
aquí vamos a usar un wrapper basado en NodeJS. Podemos encontrar el wrapper
[aquí](https://github.com/hiteshjoshi/node-stanford-corenlp). La API va a ser
una simple app basada en ExpressJS. Los principales snippets (recortes)
estan aquí:

```javascript
//...
var NLPconfig = {
  nlpPath: nlpPath,
  version: '3.6.0',
  annotators: ['tokenize', 'lemma', 'ner', 'parse'],
  language: {
    jar: nlpPath + '/stanford-spanish-corenlp-2015-10-14-models.jar',
    properties: 'StanfordCoreNLP-spanish.properties',
  },
};
//..
var sendJSONresponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

var processAPI = function (req, res) {
  var txt = req.body.txt || '';
  console.log('Processing:', txt.slice(0, 10));
  app.coreNLP.process(txt, function (err, result) {
    sendJSONresponse(res, 200, result);
  });
};

router.post('/process', processAPI);
//...
```

Necesitamos la ubicación de CoreNLP y un archivo de configuración
`StanfordCoreNLP-spanish.properties` cuyo contenido eso:

```
annotators = tokenize, ssplit, pos, ner, regexner

tokenize.language = es

pos.model = edu/stanford/nlp/models/pos-tagger/spanish/spanish-distsim.tagger

ner.model = edu/stanford/nlp/models/ner/spanish.ancora.distsim.s512.crf.ser.gz
ner.applyNumericClassifiers = false
ner.useSUTime = false

parse.model = edu/stanford/nlp/models/lexparser/spanishPCFG.ser.gz
```

Puse toda la app en un Docker container que se puede encontrar en mi [dockerhub](https://hub.docker.com/r/malev/corenlp/).
Usar un único container puede ser muy limitante, por lo que decidimos lanzar 4
container y un Nginx actuando como load balancer. El archivo de docker-compose
usado es el siguiente:

```yaml
version: '2'
services:
  app1:
    build: .
    image: malev/corenlp
    hostname: app1
    ports:
      - 3001:3001
    environment:
      PORT: 3001
    restart: always
#...
loadbalancer:
    image: nginx
    ports:
        - 8080:80
    volumes:
        - ./corenlp.conf:/etc/nginx/conf.d/default.conf:ro
```

## Analizando documentos

Desde el otro lado, vamos a usar un simple script python para enviar uno a uno
los documentos del boletín oficial y vamos a almacenar los resultados en una
base de datos Mongo.

```python
import os
import sys
import json
import requests
from pymongo import MongoClient

client = MongoClient()
db = client.corenlp

filename = sys.argv[1]
corenlp_url = os.environ.get('CORENLP_URL', 'localhost:8080')

print("Working with {}".format(filename))


def get_tokens(data):
    tokens = []
    r = requests.post(
        "http://{}/api/process".format(corenlp_url),
        data={'txt': data['parsedText'].encode('utf-8')}
    )
    payload = json.loads(r.text)
    for sentence in payload['document']['sentences']['sentence']:
        for token in sentence['tokens']['token']:
            if type(token) == dict:
                token['idTramite'] = data['idTramite']
                token['sentenceId'] = sentence['$']['id']
                token['tokenId'] = token['$']['id']
                del token['$']
                tokens.append(token)
    return tokens


def already_in_db(id_tramite):
    return db.tokens.find_one({'idTramite': id_tramite})


def store_tokens(tokens):
    for token in tokens:
        db.tokens.insert_one(token)


with open(filename) as dfile:
    for element in dfile:
        try:
            data = json.loads(element)
            if not already_in_db(data['idTramite']):
                print("Working on {}".format(data['idTramite']))
                store_tokens(get_tokens(data))
        except Exception, e:
            print("Error in {}. {}".format(data['idTramite'], e.message))
            continue

print("Done!")
```

Para acelerar los trámites, podemos partir el archivo en partes y correr el
script con cada una de ellas en un proceso nuevo:

```
split -n 20000 output.dat
python tokens.py output.0.dat
# En otra terminarl:
python tokens.py output.1.dat
```

Y a esperar. La verdad que CoreNLP resultó ser muy lento. Al menos con la
configuración que usamos aquí. Una vez que terminó de procesar todo podemos
exportar los datos con:

```
mongoexport --db corenlp --collection tokens --out tokens.json
```

El problema de `mongoexport` es que va a incluir el `_id` que es específico de
mongo e innecesario ara nosotros. Lo vamos a eliminar usando [ramda-cli](https://github.com/raine/ramda-cli):

```
npm install -g ramda-cli
cat tokens.json | ramda-cli 'omit ["_id"]' -c > tokens_without_id.json
```

El código del proyecto se encuentra en [Github](https://github.com/malev/devops/tree/master/corenlp-api)
y los resultados se pueden bajar de [aquí](http://example.org). Seguiremos
analizando el Boletín Oficial en futuros posts.
