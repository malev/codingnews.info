---
title: City of Austin Employee Data Analysis
date: 2016-05-19 21:22 UTC
tags: open-data, pandas, analysis
---

The city of Austin has a very nice [Open Data Portal](https://data.austintexas.gov/).
After digging a little bit I found that the most popular datasets in the portal
are related to dogs, which it is not a surprise, we are talking about the city of Austin.
The truth is that there is a lot of data available, but for this example, I'm going
to be using the [City of Austin Employee Detail Information](https://data.austintexas.gov/Business/City-of-Austin-Employee-Detail-Information/853s-zeff)
for two reasons. One, it's always interesting to see salaries and two, because I can
try to reproduce the analysis that the people from the [Texas Tribune](https://salaries.texastribune.org/austin/)
are doing with the same data set.

## Getting started

Obviously I'm going to be using Python with Anaconda. You can find the installer
and the instructions at the [Continuum Analytics's website](https://www.continuum.io/downloads).
Once [Anaconda](https://www.continuum.io/downloads) has been installed, we are ready to go,
all the libraries are already part of the distribution.

We will start by importing `pandas`, `numpy` and `matplotlib`:

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
```

Then we will load the CSV file into pandas. And since the `Annual Salary` data type is a `dtype('O')`
we will need to convert it into a `float`. As you can imagine, the problem is the **$** sign:

```python
df = pd.read_csv('City_of_Austin_Employee_Detail_Information.csv')
df[['Emp ID', 'Last', 'Annual Salary']][0:10]
```

```table
| index  | Emp ID   | Last            | Annual Salary |
|--------|----------|-----------------|---------------|
| 0      | 10000003 | Turner          | $62608.00     |
| 1      | 10000008 | Michael         | $146101.28    |
| 2      | 10000015 | Greco           | $96345.60     |
| 3      | 10000022 | Wiswell-DeCampo | $45676.80     |
| 4      | 10000026 | White           | $109867.68    |
| 5      | 10000039 | Candoli         | $100800.96    |
| 6      | 10000066 | Mason           | $126349.60    |
| 7      | 10000084 | Lynch           | $94203.20     |
| 8      | 10000127 | Wosky           | $93977.52     |
| 9      | 10000132 | Ringuette       | $75487.36     |
```

We will create a new column called `annual_salary` with a parsed value from `Annual Salary`, so we can
do some math to that delicious column of data:

```python
df['annual_salary'] = df['Annual Salary'].map(lambda x: float(x.strip('$')))
```

The rest of the analysis is nothing but pandas standard and you can check the jupyter notebook [here](https://github.com/malev/codingnews.info/blob/master/notebooks/austin_employees.ipynb).
You can also play with it using Binder [here](http://mybinder.org/repo/malev/codingnews.info) (find it under the notebooks directory).
