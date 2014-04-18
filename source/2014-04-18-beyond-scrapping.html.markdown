---
title: Beyond Scrapping
date: 2014-04-18 21:39 UTC
tags: scrapping, dev
---

*tl;dr*

>If you want to scrape a single page, don’t read this post, don’t even write a scraper, just go with the popular  Copy-Paste

So, let’s say you have to scrape something more than a single page. The first thing that pops into your mind is: That’s easy! Most scraping situations involve simple downloading and parsing. 

However, when you have to scrape thousands or millions of pages, downloading can take lots of time. Follow these guides when scraping lots of data:

##1) Store your first file
When you start scraping, you will probably have lots of attempts and failures. That’s ok! But It’s always a good idea to fine-tune your scraper with an HTML version stored on your own computer instead of hitting the remote server on every attempt. This will save you time.

##2) Store the rest
If you ever need to change your scraper, you can avoid downloading again by keeping the original files.

##3) Where are you storing?
There are infinite options for storage. You can store in plain files, databases or even the memory (don’t do that). In data-journalism, there is a good chance that a journalist needs to access by him/her self, so I think a SQL database is the best solution. Also if you are planning to scrape from multiple computers, a database that allows multiple connection works well.

##4) Bulking
Sometimes you need to store a huge amount of data in different rows/documents/whatever. Think about storing data in of bulks. This is going to save you tons of connections with the database and it’s going to be a more than fair improvement.

##5) Threads and his friends
If you need to scrape thousands or millions of documents in the web you definitely want to use threads. And remember, since this is not a CPU task, you don’t have to limit yourself by the amount of cores your computer has. Also, to avoid hitting the server with a single IP you might consider using some VPS (they are not that expensive nowadays). If this is your solution, a database with multiple connections is handy.

##6) Feedback
Scraping multiple files is going to take a while, and if you don’t want your anxiety to kill you, you really need to have some feedback. You can print your progress on the screen, use some kind of fancy progressbar or my personal favorite, use log files. The last one is the recommended solution, because you can analyze them later.

##7) Store the failures
Whether you get a timeout, 500 or even a 404, you want to store that somewhere. Maybe the server went down for a while and that is causing the timeouts. If you know where your scraper failed, you can just scrape those particular pages again in order to complete your dataset.

##8) Don’t scrape it all again
You need to keep track of which files has already been downloaded so you don’t have to download them again. You don’t want to send useless requests to the server and for sure you don’t want to waste time re-downloading documents.

##9) Environments
Having different work environments can be really handy when you have started to scrape some pages and at the same time you are still tuning up your app. You don’t want to mess with the database at that point.

##10) Hide your tracks
There is a chance that the administrator of the site you are scraping will notice the tons of request you are sending and will ban your IP address. No worries, Tor to the rescue. You can use the torify solution from the Tor project.

Sounds like too much work? Yes, maybe. But with all the available libraries out there, handling these issues requires just a couple of lines of code and some configuration files.
Hope this is useful for you as it was for me.
