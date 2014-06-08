---
title: Dealing with encoding
date: 2014-06-07 20:08 UTC
tags: programming, python
published: false
---

Encoding has always been a mess:

Recuerdo mis primero encuentros con una computadora, recuerdo haber necesitado
usar ALT+157 para dibujar una `ñ` en mi monitor, o ... para las tildes, esas que
usamos bastante en español.

Aunque problemático, se resolvía. Sabía que eso se guardaba en memoria en 8bits
encodificado en ASCII o en ASCII extendido.

Paso el tiempo y hoy eso ya es cosa del pasado, pero los problemas persisten,
ahora tenemos UNICODE, UTF-8, ISO ... y c ...
y los hermosos caracteres (?) que lo único que hacen es romper la existencia
y levantar exception como: exception1 O EXCEPTION2.

Hasta hace muy poquito resolvía todo esto con prueba y error, empezaba agregando
`# encoding: utf-8` al principio del archivo y después jugaba con encode / decode
hasta que llegaba a un good enough que me conformaba.

Todo esto sin entender nada de nada

Hace unos días con mis compañeros del TT vimos:

http://pyvideo.org/video/2625/character-encoding-and-unicode-in-python

y me dije... hora de entender. Algunas definiciones:


ASCII

UTF-8

UNICODE

Como vemos, UNICODE no tiene nada que ver con UTF-8, son incomparables! ya que 
uno es ... y el otro ...

Vamos a un ejemplo!


Links:

http://rrn.dk/the-difference-between-utf-8-and-unicode

http://blog.rayapps.com/2013/03/11/7-things-that-can-go-wrong-with-ruby-19-string-encodings/