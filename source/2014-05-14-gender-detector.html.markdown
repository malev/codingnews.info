---
title: Gender Detector (for python)
date: 2014-05-14 15:54 UTC
tags: programming, python
---

If you have seen my [previous post](/post/gender-detection.html) you might know that I'm interested in automating gender detection. Luckly I'm not alone and we have many options to solve this problem. Oddly, there is only one alternative in python and it's not the best one.

That's why I decided to come out with a new one. It didn't make sense to build one from scratch because there are so many open source options, so I based my solution on the Ruby gem [Beauvoir](https://github.com/jeremybmerrill/beauvoir). I used the statistical approaches (based on Agresti-Coull estimated value and binomial confidence interval). I used a dataset from [GenderTracker](https://github.com/OpenGenderTracking/GenderTracker), a solution created by the [OpenGenderTracking Project](http://opengendertracking.org/).
And I made some performance improvements with an index based on the [position of the words](https://github.com/malev/gender-detector/blob/master/gender_detector/index.py) in the file.

Finally I added support for Spanish names in Argentina and Uruguay. I used the data from [names query](http://www.buenosaires.gob.ar/areas/registrocivil/nombres/busqueda/buscador_nombres.php?menu_id=16082) of the city of Buenos Aires and the [civil registry](https://catalogodatos.gub.uy/dataset/partidas-de-registro-civil-de-montevideo) in Montevideo. The main problem with these datasets is that they are based on cities and not the whole country. I'm trying to get the data from Argentina but haven't have luck so far. The code I've used to get this data is [here](https://gist.github.com/malev/40cc453e1c6c15db102f) and [here](https://gist.github.com/malev/8598692a40023a1ef422).

The code of the GenderDetection tool for python is [here](https://github.com/malev/gender-detector) and of course, it's open source. Hope you find it useful! If you find any bugs, don't hesitate on letting me know!

