---
title: CSV to table
date: 2014-06-03 18:00 UTC
tags: programming, opensource
published: false
---

A few days ago we publish an article with a table at the [TexasTribune](http://texastribune.org). We usually work with tables in format `CSV` and then we publish them in `HTML`. In that case I used a random csv to html that I found on the web. That was usually pretty straightforward, but then we needed to customize with classes and data attributes. The last task was really terrible.

We use [tablesift.js](https://github.com/rdmurphy/tablesift.js) for adding sorting options, so we need the `siftable` at the headers, we add a `data-title` attribute to every `td` in order to have a responsive table as described in [here](http://blog.apps.npr.org/2014/05/09/responsive-data-tables.html). Finally, it's really common to add classes to every cell to improve readability of strings, integers or float numbers. All of this is a lot of work, specially if the table is big.

After that experience I came out with [CSV to table](http://csv.codingnews.info/) which is an easy too for converting `csv` documentos into `HTML` tables, and has the capability of editing the classes once, so they can be replicated in every cell dinamically. It's built with [underscore.js](http://underscorejs.org/) and [papa.parse](http://papaparse.com/), everything on top of [middleman](http://middlemanapp.com/) which is the same tool I'm using for this blog.

**Special Disclaimer:** Since this is a tool *journalist oriented* I **really** don't store anything anywhere. This webapp works **only** on the client side, so nothing that you can paste on it can be sent to any server. The only thing I'm tracking is the page access with Google Analytics, but it has nothing to do with the content.