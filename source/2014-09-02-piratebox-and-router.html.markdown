---
title: piratebox-and-router
date: 2014-09-02 20:32 UTC
tags: piratebox, open internet, share, community
published: false
---

Alguna vez estuviste sin datos, agarraste tu teléfono y sólo viste decenas de redes WiFi cerradas? No estaría bueno encontrar una abierta de vez en cuando? Aunque sea sólo para revisar tu email o mirar mapa rapidamente?
*Que pasaría si todos comparten un poquitito de su WiFi* No estaríamos formando parte de un mejor lugar? (Aquí estoy exagerando un poquito).

## Y si abrimos nuestras redes?
NO! O no se, suena extraño y da miedito. Creo que hoy en día tenemos demasiadas cosas conectadas a nuestra WiFi que abrirla al público así como así no sería una buena idea. Pensa en una casa común, tenes una impresora, algunos teléfonos, laptops, tablets y quizás hasta el TV o una cámara de fotos. No queremos que cualquiera acceda a todo eso!

## Montando una WiFi exclusiva para compartir
Creo que es opción más fácil y segura, aunque no necesariamente la más económica. Definitivamente es la más divertida! Y con ese argumento, la que elegimos.
Empezamos por jugar con la PirateBox, por qué todos teníamos una y por que somos fans del proyecto. Para crearte tu propia PirateBox, sólo tenes que seguir estos pasos. Cómo vas a estar jugando con ella toda la tarde, te recomiendo que no le pongas un password. Al menos por ahora.

## Habilitando Internet en la PirateBox
Empezamos por lo básico, darle Internet a la PirateBox. Para esto, necesitamos saber el rango de IP de nuestra red doméstica y el IP del router de casa. En nuestro caso, nos tocó: `10.100.250.0-255` con el router en `10.100.250.1`. Buscamos el archivo `/etc/config/network` y le dejamos así:

    config interface 'loopback'
      option ifname 'lo'
      option proto 'static'
      option ipaddr '127.0.0.1'
      option netmask '255.0.0.0'

    config interface 'lan'
      option ifname 'eth0'
      option type 'bridge'
      option proto 'dhcp'
      option 'ipaddr' '10.100.250.2'
      option 'gateway' '10.100.250.1'
      option 'netmask' '255.255.255.0'
      list dns '8.8.8.8'
      list dns '8.8.4.4'

Grabamos y ejecutamos:

    /etc/init.d/network restart

Ahora sí, nos podemos conectar a la red de la PirateBox y deberíamos tener acceso a internet y a algunos de los features de la PirateBox. Para arreglar la suba de archivos vamos a `/opt/piratebox/config/piratebox.conf` y cambiamos:

    NET=192.168.1.1

por:

    NET=10.100.250.2

Ya podemos reiniciar y tendremos Internet en nuestra PirateBox.
