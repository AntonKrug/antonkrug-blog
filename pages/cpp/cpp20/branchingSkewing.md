---
title: Improving performance of branching
description: By providing intent to the toolchain (2min read)
permalink: "{{ libdocConfig.blogSlug }}/cpp/20/likely.html"
tags:
    - cpp
    - cpp20
date: 2025-06-07
---

# Executive summary

Branching can be skewed

# Background

[AVR conditional branching](https://onlinedocs.microchip.com/oxy/GUID-0B644D8F-67E7-49E6-82C9-1B2B9ABE6A0D-en-US-23/GUID-38931E58-9CEC-40B0-AE87-4A97EF329AB8.html)

# C++ 20 if conditions

Compiled with `gcc -O1 -std=c++20`

```cpp
int8_t foo(int8_t num) {
    if (num>3) { [[likely]] 
        return num + num;
    } else {
        return -1;
    }
}
```

```avrasm
foo(signed char):
        cpi r24,lo8(4)
        brlt .L3
        lsl r24
        ret
.L3:
        ldi r24,lo8(-1)
        ret
```

# C if conditions
