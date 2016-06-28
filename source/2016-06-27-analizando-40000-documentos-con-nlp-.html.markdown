---
title: Analizando 40.000 documentos con NLP
date: 2016-06-27 20:49 UTC
tags: python, pydata, nlp, freeling, dask
---

En un [post anterior](/post/analizando-el-boletin-oficial.html) vimos como
scrapear y extraer el texto de 40000 documentos de la sección primera del
boletín oficial argentino. Ahora vamos a analizar el texto de cada documento
para extrayendo sus entidades usando NLP (natural language processing).

## NLP

En este post vamos a realizar un análisis de **Named Entity Classification**
para detectar sujetos, adjetivos, pronombres y signos de puntuación. Al mismo
tiempo, y gracias a la herramienta que vamos a usar, vamos a detectar personas,
lugares geofráficos, organizaciones, verbos y fechas. Todo esto lo vamos a
hacer con una herramienta llamada [freeling](http://nlp.lsi.upc.edu/freeling/node/1)
que se desarrolla en la Universitat Politècnica de Catalunya. Lo bueno de esta
herramienta es que cuenta con modelos para trabajar en Español. Destaco este
punto por que la mayoría de las herramientas de NLP trabajan en Inglés casi
exclusivamente.

Vamos a empezar instalando freeling con:

```
brew install freeling
```

o, en Ubuntu 14.04:

```
sudo apt-get update -yq
sudo apt-get install libboost-regex-dev libicu-dev zlib1g-dev -yq
sudo apt-get install libboost-system-dev libboost-program-options-dev libboost-thread-dev -yq
sudo apt-get install -f

wget https://github.com/TALP-UPC/FreeLing/releases/download/4.0/freeling-4.0-trusty-amd64.deb
sudo dpkg -i freeling-4.0-trusty-amd64.deb
```

Para probarlo, necesitamos conocer la ubicación de los archivos de
configuración:

* En **osx**: `/usr/local/Cellar/freeling/4.0/share/freeling/config`
* En **Ubuntu**: `/usr/share/freeling/config/`

Luego podemos ejecutar:

```
$ export FREELINGSHARE=/usr/local/Cellar/freeling/4.0/share/freeling/
$ echo "Hola mundo" | analyzer -f /usr/local/Cellar/freeling/4.0/share/freeling/config/es.cfg
Hola hola I 1
mundo mundo NCMS000 1
```
Y como en este caso queremos el módulo `nec` de **named entity classification**,
tendremos que correr:


```
$ echo "Abuelas encontró al nieto número 114" | analyze -f \
/usr/local/Cellar/freeling/4.0/share/freeling/config/es.cfg --nec --output json
```

Nuestro output será:

```json
{
  "id": "1",
  "tokens": [
    {
      "id": "t1.1",
      "form": "Abuelas",
      "lemma": "abuelas",
      "tag": "NP00SP0",
      "ctag": "NP",
      "pos": "noun",
      "type": "proper",
      "neclass": "person",
      "nec": "PER"
    },
    {
      "id": "t1.2",
      "form": "encontr\u00f3",
      "lemma": "encontrar",
      "tag": "VMIS3S0",
      "ctag": "VMI",
      "pos": "verb",
      "type": "main",
      "mood": "indicative",
      "tense": "past",
      "person": "3",
      "num": "singular"
    },
    {
      "id": "t1.3",
      "form": "a",
      "lemma": "a",
      "tag": "SP",
      "ctag": "SP",
      "pos": "adposition",
      "type": "preposition"
    },
    {
      "id": "t1.4",
      "form": "el",
      "lemma": "el",
      "tag": "DA0MS0",
      "ctag": "DA",
      "pos": "determiner",
      "type": "article",
      "gen": "masculine",
      "num": "singular"
    },
    {
      "id": "t1.5",
      "form": "nieto",
      "lemma": "nieto",
      "tag": "NCMS000",
      "ctag": "NC",
      "pos": "noun",
      "type": "common",
      "gen": "masculine",
      "num": "singular"
    },
    {
      "id": "t1.6",
      "form": "n\u00famero",
      "lemma": "n\u00famero",
      "tag": "NCMS000",
      "ctag": "NC",
      "pos": "noun",
      "type": "common",
      "gen": "masculine",
      "num": "singular"
    },
    {
      "id": "t1.7",
      "form": "114",
      "lemma": "114",
      "tag": "Z",
      "ctag": "Z",
      "pos": "number"
    }
  ]
}
```

En este caso el resultado está en formato JSON y tiene un error ya que
**abuelas** es una organización y no una persona. Claramente el model necesita
un poco de entrenamiento en DDHH argentinos. El entrenamiento será un cuento
para otro día.

Cómo vamos a usar python, vamos a usar un wrapper de freeling para python
llamado [pyfreeling](https://github.com/malev/pyfreeling) que se usa igual
que `anlyze`, la herramienta de línea de comandos que viene con freeling.

## Map reduce

El archivo con con los 40.000 documentos pesa 325M y su estructura es la
siguiente:

* Un JSON por línea.
* Cada JSON es un documento con título, metadata y contenido en HTML.

Dado que el análisis NEC consume mucho procesador, memoria y toma mucho tiempo,
vamos a dividir el archivo en pedazos así lo podemos trabajar en varios nodos.
Como nodos vamos a usar mi laptop (i7, 3.1GHz con 16Gb de ram) y una instancia
en Digital Ocean con 32Gb de ram y 12 CPUs.

Para dividir el archivo hacemos:

```
split -n 5000 output.dat
```

Esto nos va a dar 8 archivos de 5.000 líneas cada uno. Una vez que termines con
todo el proceso haremos pondremos todo en un único archivo.

## Empezando con dask

Vamos a empezar por leer el 1ro de los ocho archivos del paso anterior. Vamos
a usar `read_text` para generar un objeto `bag` y vamos a encadenar algunas
funciones para parsear el JSON, extraer el texto del html, eliminar documentos
nulos, etc:

```python
import ujson
import dask.bag as db
from bs4 import BeautifulSoup


def extract(blob):
    return blob['dataList']


def remove_empty(data_list):
    return data_list


def valid_columns(data):
    return {
        'detalleNorma': data['detalleNorma'],
        'idTramite': data['idTramite']
    }


def extract_text(data):
    try:
        return {
            'idTramite': data['idTramite'],
            'parsedText': BeautifulSoup(data['detalleNorma'], "html.parser").\
                getText().strip()
        }
    except:
        return None

def remove_nones(data):
    return data is not None


bag = db.read_text("output.dat", blocksize=100000000)
df = bag.map(ujson.loads).map(extract).filter(remove_empty).\
    map(valid_columns).map(extract_text).filter(remove_nones)
```

Como detalle interesante, vamos a usar un `blocksize` de 100.000.000 que **Dask**
organizará en [4 workers similares](/images/dask_workers.png). Para generar esa
gráfica usamos: `from dask.dot import dot_graph; dot_graph(df.dask)`.

## Análisis de entidades

Una vez que tenemos un bag de **Dask** con los datos y los workers listos
podemos llamar a freeling con:

```python
from pyfreeling import Analyzer

def tokenize(data):
    try:
        analyzer = Analyzer(config='/usr/share/freeling/config/es-ar.cfg')
        tokens = []
        xml_root = analyzer.run(data['parsedText'].encode('utf-8'), 'nec')
        for element in xml_root.iter():
            if element.tag == 'token':
                tokens.append(dict(element.attrib))
    except Exception as e:
        print(data['idTramite'])
        print(e)

    return {'idTramite': data['idTramite'], 'tokens': tokens}
tokens = df.map(tokenize)
```

Y luego bajamos todo a disco:

```
tokens.map(ujson.dumps).to_textfiles('{}.*.dat'.format(filename))
```

Esta tarea toma varias horas y como resultado obtendremos algunos archivos
llamados: output.dat.0.dat, output.dat.1.dat, etc. Y su contenido será similiar
a:

```json
{
  "idTramite": "100000",
  "tokens": [
    {
      "ctag": "NP",
      "form": "MINISTERIO_DE_TRABAJO",
      "neclass": "organization",
      "pos": "noun",
      "nec": "ORG",
      "lemma": "ministerio_de_trabajo",
      "tag": "NP00O00",
      "type": "proper",
      "id": "t1.1"
    },
    {
      "ctag": "Fc",
      "form": ",",
      "pos": "punctuation",
      "lemma": ",",
      "tag": "Fc",
      "type": "comma",
      "id": "t1.2"
  },
  ...
  ]
}
```

En próximos posts haremos análisis de los datos obtenidos.

**Nota:** Publiqué un notebook con el código de ejemplo usado aquí.
Lamentablemente no se puede ejecutar pues Binder no tiene freeling instalado.
[Link al notebook](https://github.com/malev/codingnews.info/blob/master/notebooks/boletin_2.ipynb).
