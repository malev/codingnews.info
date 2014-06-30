---
title: Hack Day at the MIT
date: 2014-06-30 15:50 UTC
tags: Hacking, Conferences
---

Taking advantage of the MIT-Knight Civic Media Conference, OpenNews hosted a Hack Day in Cambridge at the MIT MediaLab. I participated with all of the fellows and many other cool people. I have to say, it was amazing!

I joined a team with [Harlo](https://twitter.com/harlo), [Aurelia](https://twitter.com/auremoser), [Pudo](https://twitter.com/pudo), [Mike](https://twitter.com/mtigas) and Zeynep and we worked on a project that we called [KeyBlur](https://github.com/mozilla/keyblur). The purpose of the project is to provide a private system for free speech and infosyncing. We considered countries where you don’t have free Internet, where many sites are banned or where you don’t have access to certain services—as you can imagine, this is a big issue, a huge problem to solve. So for the purpose of the Hack Day, we focused on file syncing and on top of that, a chat tool. I can imagine you thinking, “Why the heck does the world need another chat tool?” Well, imagine for one second that you are somewhere without free internet, where your emails are being read by surveillance services and where you can’t encrypt your messages because that would raise suspicions. How do you handle a discussion with groups in the same network but that are not in the same location, and maybe are discussing things in an asynchronous way? That is the problem we tried to solve with our chat tool, [FlatChat](https://github.com/pudo/flatchat).

In order to create the “secure” network, we used the [PirateBox](http://www.piratebox.cc/) which is a small device designed to generate a WiFi network and exchange data freely under the public domain or under a free license. It’s based in a small router and a storage unit. It’s really cheap to build and super easy to install. In our case, we used a TP-Link MR304 and a USB-drive. (The building process itself was not so easy and I’ll talk about the problems we faced in a future post.)

Finally, for the file-sharing system we started trying different solutions. We tested SyncThing and BitTorrent Sync and decided on the first one, and then worked on a Python wrapper to enhance the client’s detection.

At the end of the Hack Day, we had a technology soup with some JavaScript, some Python, and a couple of hacked routers. The experience was incredible! The source code is [here](https://github.com/mozilla/keyblur) and [here](https://github.com/pudo/flatchat) and of course, we are open to suggestions and contributions.

Last note: through this project, I learned about the PirateBox project and I’m looking forward to play with my brand new PirateBox!
