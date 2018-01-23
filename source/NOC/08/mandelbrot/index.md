---
layout: sketch
scripts: 
    - sketch.js
title: Basic Mandelbrot Set
---

Simple rendering of the Mandelbrot set   
```
c = a + bi
Iterate z = z^2 + c, i.e.
z(0) = 0
z(1) = 0*0 + c
z(2) = c*c + c
z(3) = (c*c + c) * (c*c + c) + c
etc.

c*c = (a+bi) * (a+bi) = a^2 - b^2 + 2abi
```
