---
title: Un paso para más Internet en las calles (es)
date: 2014-09-05 20:32 UTC
tags: piratebox, open internet, share, community
---

Alguna  vez estuviste sin datos, agarraste tu teléfono y sólo viste decenas de redes WiFi **cerradas**? No estaría bueno encontrar una red wireless abierta de vez en cuando? Aunque sea sólo para revisar tu email o mirar un mapa rápidamente?

Que pasaría si todos comparten un poquitito de su WiFi? No estaríamos ayudando a  mejorar el acceso a la mayor librería de la historia? **Recuerda, compartir es bueno!**

## Y si abrimos nuestras redes?
**NO!** O no se, suena extraño y da miedito. Creo que hoy en día tenemos  demasiadas cosas conectadas a nuestra WiFi que abrirla al público así como así no sería una buena idea. Pensá que seguramente tenes una impresora, algunos teléfonos, laptops, tablets y quizás hasta el TV o una cámara de fotos en tu casa. No queremos que cualquier persona que no conozcamos acceda a todo eso!

## Montando una WiFi exclusiva para compartir
Creo que es una opción más fácil y segura, aunque no necesariamente la más económica. Definitivamente es la más divertida! Y con este argumento, la que elegimos.

Empezamos por jugar con un router que tiene PirateBox instalado,  por qué todos teníamos una y por que somos fans del proyecto. Para  crearte tu propia PirateBox, sólo tenes que seguir estos pasos. Cómo vas  a estar jugando con ella toda la tarde, te recomiendo que no le pongas  un password. Al menos no por ahora.
Piratebox  es una modificación de Openwrt para tener un servidor web donde se  pueden subir archivos y chatear por fuera de Internet. Hay muchisima  documentación en el wiki de Openwrt.

## Habilitando Internet en tu PirateBox
Empezamos por lo básico, darle Internet a nuestro Piratebox. Para esto, necesitamos saber el rango de IP de nuestra red doméstica y el IP del router que da Internet de la casa.  En nuestro caso, nos tocó: `10.100.250.0-255` con el router en  `10.100.250.1`. Buscamos el archivo `/etc/config/network` y le dejamos  así:

    config interface 'loopback'
      option ifname 'lo'
      option proto 'static'
      option ipaddr '127.0.0.1'
      option netmask '255.0.0.0'
    config interface 'lan'
      option ifname 'eth0'
      option type 'bridge'
      option proto 'static'
      option 'ipaddr' '10.100.250.2'
      option 'gateway' '10.100.250.1'
      option 'netmask' '255.255.255.0'
      list dns '8.8.8.8'
      list dns '8.8.4.4'

Todas estas opciones estan muy bien explicadas en el [wiki](http://wiki.openwrt.org/doc/uci/network) de openwrt en la sección de network.
Grabamos el archivo y para reiniciar el servidio de red ejecutamos:

    /etc/init.d/network restart

Ahora  sí, nos podemos conectar a la red de la PirateBox y deberíamos tener  acceso a Internet y a algunos de los features de la PirateBox. Para arreglar la suba de archivos vamos a `/opt/piratebox/config/piratebox.conf` y cambiamos:

    NET=192.168.1.1

por:

    NET=10.100.250.2

Ya podemos reiniciar y tendremos Internet en nuestra PirateBox. Pero! (siempre hay un pero), con esta solución, tenemos la dificultad de necesitar conocer la IP de nuestro router y configurarla a mano. También podríamos usar DHCP (la mayoría de los routers cuentan con esta funcionalidad) y así contar con un dispositivo que apenas lo conectamos ya se encuentra compartiendo Internet. El problema (por ahora) es que perderíamos la habilidad de subir archivos a la piratebox cuando no se tiene IP fija. Esto es un bug de [Piratebox](https://github.com/PirateBox-Dev) que está en la lista de cosas para arreglar del proyecto.
Vamos a nuestro `/etc/config/network` y lo cambiamos por:

    config interface 'loopback'
      option ifname 'lo'
      option proto 'static'
      option ipaddr '127.0.0.1'
      option netmask '255.0.0.0'
    config interface 'lan'
      option ifname 'eth0'
      option type 'bridge'
      option proto 'dhcp'
      list dns '8.8.8.8'
      list dns '8.8.4.4'

Reiniciamos y listo!
**NOTA 0:** Por ahora, sólo hemos habilitado Internet en nuestro PirateBox, pero todavía estamos en la misma red y por lo tanto es muy inseguro! En un próximo post vamos a explorar otras alternativas más seguras.

**NOTA 2:** Este post también está publicado en el [blog](http://gaba.stayover.org/2014/09/05/229/) de [Gaba](https://twitter.com/gaba).

**NOTA 2:** Nuestra amiga [Harlo](https://twitter.com/harlo) estuvo experimentando con nosotros el PirateBox y escribio un [articulo](http://harlo.github.io/2014/09/05/how-to-unbrick-the-box.html) (en ingles) de como recuperar tu PirateBox cuando muere.
