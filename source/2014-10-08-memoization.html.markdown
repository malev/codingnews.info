---
title: Memoization
date: 2014-10-08 16:45 UTC
tags: programming, ruby, javascript, python
published: false
---

Memoization in computer programs is a really simple concept. It's an optimization technique where a computer program returns a cached result when the same input occurs again. It's essential when working with heavy calculation algorithms or time consuming functions. It basically works like this:

* Something calls a function
* Function performs calculation
* Function stores result in a cached variable
* Funciton returns result
* Someting calls the same function
* Function returns cached value instead of performing heavy calculations
* **Win!**


## Ruby

In **Ruby**, **memoization** is almost part of the language thanks to Ruby's conditional assignment (`||=`):

```ruby
def slow_function
  sleep 5
  'result'
end

def memoization
  @takes_time ||= slow_function
end

memoization()
# Wait 5 seconds
=> 'result'
memoziation()
# Inmediateley
=> 'result'
```

We can also refactor a little bit using blocks (Ruby will treat this block as a single thing):

```ruby
def slow_function
  @takes_time ||= begin
    sleep 5
    'result'
  end
end

slow_function()
# Wait 5 seconds
=> 'result'
slow_function()
# Inmediateley
=> 'result'
```

There is one caveat with this method. If `slow_function` returns `nil`, it will perform the heavy calculation every time. In that specific and annoying case we can use the [object method](http://ruby-doc.org/docs/keywords/1.9/Object.html#method-i-defined-3F) `defined?`:

```ruby
class HeavyClass
  def call
    return @call if defined?(@call)
    @call = slow_method
  end

  def slow_method
    sleep 5
    nil
  end
end

heavy_object = HeavyClass.new
heavy_object.call
# Wait 5 seconds
=> nil
heavy_object.call
# Inmediateley
=> nil
```

What if we use parameters? Simple, we will use a `Hash`. We will initialize our `Hash` with a `block`. According to the [Ruby documentation](http://www.ruby-doc.org/core-2.1.0/Hash.html) if we call our hash with an unexisting key, it will call our block as:

```ruby
hash = Hash.new do |h, key|
  h[key] = rand
end

hash[:non_existing_key]
=> 0.3884906318307012
hash[:other_non_existing_key]
=> 0.19581108461258834
hash[:non_existing_key]
=> 0.3884906318307012
```

Now, going back to our `memoization` post:

```ruby
def takes_a_while
  sleep 5
  'result'
end

def slow_method(param)
  @hash ||= Hash.new do |h, key|
    h[key] = takes_a_while
  end
  @hash[param]
end

slow_method(1)
# Wait 5 seconds
=> 'result'
slow_method(1)
# Inmediately
=> 'result'
slow_method(2)
# Wait 5 seconds
=> 'result'
```

## Python

Sadly, in Python things are not as easy as they are in Ruby, but that does not mean that they are impossible:

```python
from time import sleep

cache = {}
def slow_method(param):
    if param in cache:
        return cache[param]
    else:
        sleep(5)
        cache[param] = param
        return cache[param]
slow_method(1)
# Wait 5 seconds
=> 1
slow_method(1)
# Inmediately
=> 1
```

We can also define a `function` and use it as a `decorator` as in:

```python
from time import sleep

def memoize(f):
    memo = {}
    def helper(x):
        if x not in memo:
            memo[x] = f(x)
        return memo[x]
    return helper

@memoize
def slow_function(n):
    sleep(5)
    return n
slow_method(1)
# Wait 5 seconds
=> 1
slow_method(1)
# Inmediately
=> 1
```

If you are using **Python 3** maybe you can check `functools.lru_cache` on the [official documentation](https://docs.python.org/3/library/functools.html#functools.lru_cache) and if you are using **Django** you should also check the [django-memoize](http://pythonhosted.org/django-memoize/) library.

## Javascript

We can define a method in the `Function` prototype and use a concept very similar as the Python one:

```javascript
Function.prototype.memoize = function(){
  var self = this, cache = {};
  return function( arg ){
    if(arg in cache) {
      return cache[arg];
    } else {
      return cache[arg] = self( arg );
    }
  }
}

function slow() {
  console.log('Heavy calculation...');
  return 5;
}

var memSlow = slow.memoize();

> memSlow();
Heavy calculation...
5
> memSlow();
5
```

But if you are using [underscore](http://underscorejs.org/) (and your should!) you can use the [memoize](http://underscorejs.org/#memoize) method:

```javascript
var fibonacci = _.memoize(function(n) {
  return n < 2 ? n: fibonacci(n - 1) + fibonacci(n - 2);
});
```

Much easier! We define the function once, and we don't need to *memoize* it later.

## What is all this doing here?

Well, if you work on data journalism you might be doing some scraping and some calculations on huge data sets. I think that the **memoization** concept is really useful to optimize some of your tools or scripts. Something to have in mind.
