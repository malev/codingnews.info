---
title: Dealing with encoding
date: 2014-06-07 20:08 UTC
tags: programming, python
published: false
---

Encoding has always been a mess:

I still remember my first days with a computer, I remember having to use `ALT + 241` to print an `ñ` on the screen or even using `ATL + 225 (233, 237, 243 and 250)` for the vowels with the accent `á`. Even though this was crazy stupid, it was easy. I just needed to remember this combinations and that was it. Of course, and extended-ASCII table was alwasy handy.

It's been a couple of decades since those times and today in 2014 we still have problems with characters in the computer. And I have today, today we have much more complex problems. Nowadays we have **unicode**, **utf-8** and many others and of course we have some **encoding** exceptions. Remember: `invalid multibyte char (US-ASCII)`. In **Ruby** for example, you needed to type `# Encoding: utf-8` at the top o every archivo to use accents in the code. With **Ruby 2.0** you don't need that anymore.

To be honest, I didn't understand anything about encoding, even though I've been programming for some years now. Last week I saw a presentation about Unicode and python that changed my life:

http://pyvideo.org/video/2625/character-encoding-and-unicode-in-python

First, something simple, let's talk about some definitios:

## ASCII

The American Standard Code for Information Interchange is a character-encoding scheme originally based on the English alphabet that encodes 128 specified characters - the numbers 0-9, the letters a-z and A-Z, some basic punctuation symbols, etc - into the 7-bit binary integers.

# UNICODE

Unicode is a computing industry standard for the consistent encoding, representation and handling of text expressed in most of the world's writing systems. 

## UTF-8

UTF-8 is a variable-width encoding that can represent every character in the Unicode character set. 

The **very first** important thing here is that **Unicode** and **UTF-8** are two complete different things. UTF-8 is an encoding and Unicode is a character set. That said, let's talk about common situations when working with different encodings.



UTF-8

UNICODE

Como vemos, UNICODE no tiene nada que ver con UTF-8, son incomparables! ya que 
uno es ... y el otro ...

Vamos a un ejemplo!


Links:

http://rrn.dk/the-difference-between-utf-8-and-unicode

http://blog.rayapps.com/2013/03/11/7-things-that-can-go-wrong-with-ruby-19-string-encodings/

http://rrn.dk/converting-a-mysql-database-from-latin1-to-utf8