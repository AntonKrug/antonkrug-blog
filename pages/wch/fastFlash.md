---
title: Single cycle flash is a lie
description: It really is
layout: page.liquid
permalink: "{{ libdocConfig.blogSlug }}/wch/1cycle-flash.html"
tags:
    - post
    - wch
    - hw
date: 2025-06-01
---

# Executive Summary
LT;DR: WCH can't make fast flash, but attempts to conceal this fact.

The FLASH memory behavior is deceptive. In reality, it operates as a RAM with read-only access rights. Moreover, the non-single-cycle FLASH is actually the true FLASH.

# Proof
