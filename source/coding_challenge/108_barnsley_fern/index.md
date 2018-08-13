---
layout: sketch
scripts: 
    - sketch.js
title: Coding Challenge#108 -- Barnsley Fern
use_math: true
---

* Wikipedia :: <https://en.wikipedia.org/wiki/Barnsley_fern>   
* Fractal ferns :: <http://www.home.aone.net.au/~byzantium/ferns/fractal.html>   
* Barnsley Fern generator :: <https://www.chradams.co.uk/fern/maker.html>   

Applies the affine transformation iteratively::

$$
f(x, y) = \begin{bmatrix}a & b \\ c & d \end{bmatrix} + \begin{bmatrix} e \\ f \end{bmatrix}
$$

with the fractal defined by the values, 

| w  | a     | b     | c     | d    | e | f    | p    | Portion Generated             |
|----|-------|-------|-------|------|---|------|------|-------------------------------|
| f1 | 0     | 0     | 0     | 0.16 | 0 | 0    | 0.01 | Stem                          |
| f2 | 0.85  | 0.04  | -0.04 | 0.85 | 0 | 1.60 | 0.85 | Successively smaller leaflets |
| f3 | 0.20  | -0.26 | 0.23  | 0.22 | 0 | 1.60 | 0.07 | Largest left-handed leaflet   |
| f4 | -0.15 | 0.28  | 0.26  | 0.24 | 0 | 0.44 | 0.07 | Largest right-handed leaflet  |


More mutations can be created by tweaking the values!!