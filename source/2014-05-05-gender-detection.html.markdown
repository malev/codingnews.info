---
title: Gender detection
date: 2014-05-05 10:00 UTC
tags: programming, analysis
---

As the debate on the **Gender Wage Gap** continues across US America (and sometimes the world), we began exploring a dataset that included names and salaries of state workers. The gender column, which was necessary for our investigation, was missing.

As always, we had two options: Request the missing data or find a software solution. As programmers, we sought a software solution — even though we'd knew there would be limitations on testing the veracity of our data. But we also wanted to test some of the **gender detection** tools available on the Internet.

## The problem
Gender detection is not an easy task. Names are usually unpredictable and that makes any automatic solution difficult.

Many automated solutions use datasets that associate citizen names to gender. This association is based on how many citizens are registered with that name in a given country. Sometimes a name is given to both males and females, and in those cases, we associate a probability of how likely the name corresponds to a gender. Based on this, we have tree situations for a given name: We can predict the gender based on the name; we can use the probability of a name used for both genders and set a threshold to determine whether to accept or reject what our algorithm guesses is the correct gender; or the name isn't included in the database, and we can't make a guess.

Finally, since these solutions are based on first names, we can't use them to analyze full names that include surnames. So, "Marcos" will work, but "Marcos Vanetta" won't. That's raises another problem: We need to parse names. This problem will not be cover on this post.

After a quick search on the Internet and a popular Open Source repository we encountered several solutions, **but** we tested only four. Luckily for us, we had a control group provided by a government office.

## We tested:
* [Beauvoir](https://github.com/jeremybmerrill/beauvoir): Based on data from [Global Name Data](http://bocoup.com/weblog/global-name-data/). Only works for USA and UK and it's writen in Ruby. 
* [Sexmachine](https://github.com/bmuller/sexmachine): Based on a dictionary with over 40000 names and genders. Works on many languages but it's really slow to fire up.
* [genderPredictor](https://github.com/sholiday/genderPredictor): A wrapper around NLTK's Naive Bayes classifier for predicting the gender given a name. Works for USA names due it's database comes from the [US Social Security Administration](http://www.ssa.gov/oact/babynames/limits.html)
* [Genderize](http://genderize.io/): API with a the database that contains 86710 distinct names across 74 countries and 81 languages. **NOT open source** and with very limited access.

## Considerations  
Names are often tied to a person's country of origin. Since our control group corresponded to names in US America and all of the tools work with US American names, we set that flag on all the tools.

## Process
Nothing too fancy, we just ran each library against a test dataset. Each library was configured to use US American dictionaries because the dataset is based in US residents. The code is [here](https://gist.github.com/malev/f2e5a2d37f0fea5d4a74) and [here](https://gist.github.com/malev/af89339e581558788f06).

## Results

The result among with the test data are published [here](/gender-detection.html). From the results you can see that the assert lever of each tool is:

| Results | Beauvoir | sexMachine | Genderize | genderPredictor |
| ------- |---------:-|-----------:-|----------:-|----------------:-|
| Right  | 77.35%  | 85,68%      |90,68%    | 77,35%          |
| Wrong  | 0,238%    |  4,67%      |2,38%      | 22,61%          |
| Unknown | 22,72    |  9,52%      |6,9%      | 0%              |

### Which tool is the best?

That's up to you. If you can handle a high level of uncertainy, then maybe Beauvoir or Genderize are your best options. Also, it seems as Genderize provided the best results, using it is not usually the best experience due the API limitations. If you are considering using it and you have a big dataset, then you should consider a proxy or some type of cache in the middle.
SexMachine also had great results, but the level of wrong answers might be too high. It's of course up to you and the project you are working on.

## Conclusions

The problem with this solution is you can't be absolutely sure of the results, and you should really have this in mind before deciding to do some kind of gender detection.
Also, we found at least two errors in the test dataset. We decided to leave it like that because it was official data provided by a government office.

*Note:* To be honest, we prefer to request the data from a responsable organization rather than using any software based on guesses.

*Note:* More about the gender wage gap:

* [Gender Wage Gap Prevalent Throughout Texas Government](http://www.texastribune.org/2014/03/21/gender-wage-gap-prevalent-throughout-texas-governm/)
* [What is the gender wage gap?](http://www.vox.com/cards/gender-wage-gap-men-women-pay/what-is-the-gender-wage-gap)
* [Radriografía de la desigualdad](http://www.pagina12.com.ar/diario/sociedad/3-214963-2013-03-03.html)
* [The web](https://duckduckgo.com/?q=gender+wage+gap)