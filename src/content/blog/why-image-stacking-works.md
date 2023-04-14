---
author: Joy Paulsen
pubDatetime: 2023-03-06T00:00:00Z
title: Image Stacking in Astronomy
postSlug: image-stacking
featured: true
draft: false
tags:
  - beginners
ogImage: ""
description: How images are formed.
---

$$f(x)$$

$f(x)$

$$
f(x) = 2
$$

## Faint Signals

Astronomical imaging has many unique challenges that separate it from most photography here on Earth but the one aspect that truly sets it apart is that the siginals of interest, the light reaching the image sensor, are very faint. This forces us to use long exposures, on the order of minutes instead of a fraction of a second, in order to collect enough photons. On top of this, the magintude of noise in the resulting image can be a huge issue. When the magintude of noise is comparable to the magintude of the signal, it can be impossible to make out the object of interest, even with advanced image processing techniques.

Is the situation hopeless then? No! The solution, which is used by amatuers and professionals alike, is image stacking. At it's core, this method is not much more than an application of one of the most fundamental principles from statistics. When we are interested in a certain quantity mu but we only are able to obtain noisy measurments, we can simply take many individual measurements x1, x2, ..., xn and estimate mu with a _statistic_ such as the sample mean x_bar.

## Simulation

Before we look at some mathematical justification, let's see this in action visually.

### Photon Shot Noise

## Why This Works

More complicated but I think this builds some helpful intuition.

X ~ Poisson(lambda)

### CLT

## Preview of a More Complex Situtation

Hot pixels can throw off mean

Kappa sigma clipping
