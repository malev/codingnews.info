---
title: DataBootCamp con sabor a chile
date: 2014-10-06 19:34 UTC
published: false
tags: Community, DataBootCamp, Workshop
---

Centro de Cultura Digital, México DF. Un grupo de aproximadamente 60 personas, entre los cuales se distinguía periodistas, diseñadores, programadores y curiosos. El **DataBootCamp**, organizado por [SocialTic](http://socialtic.org) y la comunidad de la [escuela de datos](http://schoolofdata.org), al que fui invitado a conversar sobre extracción y limpieza de datos. Más de 3 horas duraron en total los talleres que tenía preparados. Me basé en el [modelo](http://schoolofdata.org/handbook/) del **data pipeline** que comprende: **Extracción**, **Limpieza**, **Análisis** y **Presentación**. Yo sólo ataque las primeras dos etapas del modelo y con la colaboración del público, vimos y usamos herramientas como [Kimono](http://kimonolabs.com/), [Tabula](http://tabula.nerdpower.org/), [analice.me](http://analice.me) y Fusion Tables. Empezamos bien por el principio, desde la definición de un dato, los distintos tipos de datos y dónde encontrarlos. Algunos participantes mostraron **datasets** con los que ya venían trabajando, yo compartí una encuesta que hizo el gran [Mati](http://twitter.com/matikalwill) sobre el uso de biciletas en la ciudad de Carmelo y entre todos identificamos los distintos tipos de datos, su formato y buscamos técnicas para extraerlos de la forma más práctica posible. También hicimos un pequeño experimento con **Tabula** y hasta creo que le encontramos un bug. Al final de la primera mitad, todos y todas teníamos varios archivos **CSV** abiertos en una planilla de cálculo listos para ser limpiados en el segundo taller.

Durante la segunda parte de la jornada conversamos sobre la limpieza de datos, buscamos sus limitaciones y nos enfocamos en algunos cuidados a tomar:

* Conocer valores máximos y mínimos permitidos de cada columna.
* **None** no es lo mismo que 0.
* Rangos de fechas posibles en los campos de fecha.
* En caso de datos georeferenciados o direcciones, conocer sus límites geográficos.

Usando los datasets de ejemplos buscamos si algún valor escapaba de su rango o límite y discutimos posibles soluciones a tomar cuando encontrabamos algún dato rebelde. También hicimos un poco de limpieza manual y conversamos sobre cuándo era necesaria y sus limitaciones. Jugamos por unos minutos con [OpenRefine](http://openrefine.org/), dónde los más valientes se animaron a experimentar con **expresiones regulares** simples. Otra vez concluímos con unos archivos **CSV**, pero esta vez sentíamos que podíamos confiar en su contenido y que estabamos listos para empezar a analizar.

Honestamente disfruté mucho el taller y la calidez de la comunidad mexicana. Costó un poquito que los participantes se soltaran y relajaran, pero creo que eso se debía a que venían agotados de la mañana y a los efectos post-almuerzo. Y, modestia aparte, me encató ver como varias de las herramientas que discutimos fueron usadas en el Hackathon del 2do día del **DataBootCamp**.

**Dejo aquí los links a las presentaciones:**

* [Extracción de datos](/slides/data-extraction.html)
* [Limpieza de datos](/slides/data-cleaning.html)
