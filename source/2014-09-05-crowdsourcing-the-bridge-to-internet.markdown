---
title: Crowdsourcing the bridge to Internet (en)
date: 2014-09-05 11:00 UTC
tags: piratebox, open internet, share, community
---

Have you ever been trying to work, but you're in a place without data? Have you ever checked your phone and only found **closed** WiFi networks? Wouldn't it be nice if you could find at least one open network so you can quickly check your email or maybe take a look at the map?

What if everybody shares a little bit of their WiFi? Don't you think we would be helping giving access to the biggest library in the world. **Remember, sharing is good!**

## And what about opening your wireless network?
**Nope!** Or we don't know, sounds weird and scary. Nowadays we have so many devices connected to our own WiFi that  just opening the network to the public would not be a good idea. Keep in mind that at home you probably have a couple of smart phones, your laptop, maybe a printer or even a smartTV. We don't wanna give access to all of that to a random person.

## Mounting a sharing exclusive WiFi
This is an easy and safe alternative. Maybe we would have to spend a couple of bucks, but we are also going to have super fun implementing it! We start playing with with a "PirateBoxed" router (you can read about the project [here](http://codingnews.info/post/piratebox-en.html)). We choose it because we have a couple with us and beacuse we are fans of the project. If you want to make your own PirateBox you only need to follow [this](http://piratebox.cc/openwrt:diy) easy steps. Since you will be playing with it for a while, we recommend that you skip the password section. At least for now.

Piratebox uses **OpenWrt** with an installed web server to have an offline file sharing and communication system. There is a lot of documentation about openwrt in its wiki. [http://wiki.openwrt.org/].

## Enabiling Internet in your PirateBox
We start with configuring Internet in our own Piratebox. For this we need to connect, through a ethernet cable, the piratebox to the home router. And we need to know the IP range for our own home network and the router's IP. In our case, we have: `10.100.250.0-255` with the IP  `10.100.250.1`. We look for the file `/etc/config/network` in the PirateBox and we edit it to be like this:

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

For more information about each of this options you can read the network's page in Openwrt's wiki [http://wiki.openwrt.org/doc/uci/network].
We save the file and restart the network service:

    /etc/init.d/network restart

Now, we are able to connect to the Piratebox's netowork and have access to Internet. With this configuration, uploading and sharing files in the box is broken. We fix it editing the file `/opt/piratebox/config/piratebox.conf`. We change:

    NET=192.168.1.1

for:

    NET=10.100.250.2

Now we can restart and we will have Internet and a Piratebox working. But! (there is always a but) with one caveat. We need to know our router's IP address and we have to set it up by hand (boring). We could also use the router's DHCP capability (most routers have DHCP configured by default). With this we could plug the PirateBox to our router and everything will be working automatically (automagically). Sadly we would loose the capability to upload files to the PirateBox. But that is a [bug](https://github.com/PirateBox-Dev) that eventually will be fixed.

We just need to visit your `/etc/config/network` and make it look like:

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

Restart and ... DONE!

**NOTE 0:** For now we only have Internet on our device, but we are sharing the network, that is extremely insecure! So please follow the next blog post on this series to fix this issue.

**NOTA 1:** Our friend [Harlo](http://twitter.com/harlo) has published a [blog post](http://harlo.github.io/2014/09/05/how-to-unbrick-the-box.html) about how to "un-brick" your router in case you face any problems.
