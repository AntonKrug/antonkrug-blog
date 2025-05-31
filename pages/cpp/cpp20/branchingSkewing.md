---
title: Improving performance of branching
description: By annotating the code (2min read)
permalink: "{{ libdocConfig.blogSlug }}/cpp/20/likely.html"
tags:
    - cpp
    - cpp20
date: 2025-06-07
ogImageUrl: https://images.weserv.nl/?url=https://raw.githubusercontent.com/antonkrug/antonkrug-blog/refs/heads/main/assets/cpp/likely-og.jpg
---
{% img "assets/cpp/likely-og.jpg" %}


# Executive summary

If we understand which parts of a condition are more likely to occur, we can decorate our code to communicate that certain scenarios to the toolchain to be prioritized, allowing it run faster for most probable outcomes.

{% alert "This works even on low-end devices. However, this is not completely a guarantee. If the target architecture lacks instructions with predictable and consistently reliable execution times, which differ depending on the taken branch, then there isn't much to optimize.", 'success', 'Note:' %}

# C++20 if conditions

Used Microchip's Atmel 8-bit AVR architecture in these examples to demonstrate C++20 on low-end embedded devices. All examples compiled with `AVR gcc v12.2.0` toolchain through the [Godbolt API](https://godbolt.org) and with `gcc -O1 -std=c++20` arguments. Each C/C++ snippet has a corresponding assembly snippet below it. All snippets are trimmed for sake of brevity just to contain the necessary code, not the necessary scaffolding to make them compiling.

For those unfamiliar with AVR assembly, the `brlt` (branch if less than) and `brge` (branch if greater or equal to) instructions mentioned below take:
- 2 cycles when the branch is taken and a jump is invoked.
- 1 cycle when the branch is not taken and the jump is omitted.

Depending on which instruction we use, and in what scenario it is most frequently recurring, we could potentially save up to 1 CPU cycle. Previously, often we had to opt-in to use inline assembly to get these micro optimizations, but here C++ shows yet again how much better it is and how more optimized code it can produce compared to C.


## 'Likely' scenario

When a branch is annotated with `[[likely]]` at line `2`, then the `brlt` instruction in the assembly at line `3` will invoke jump to the `ldi r24,lo8(-1)` aka `return -1` scenario and allows the `lsl r24` aka `return num + num;` scenario to be executed without jumping overhead.



```cpp/1
int8_t foo(int8_t num) {
    if (num>3) { [[likely]] 
        return num + num;
    } else {
        return -1;
    }
}
```

```asmatmel/2
foo(signed char):
        cpi r24,lo8(4)
        brlt .L3
        lsl r24
        ret
.L3:
        ldi r24,lo8(-1)
        ret
```

## 'Unlikely' scenario

Observe how the annotation change from `[[likely]]` to `[[unlikely]]` at line `2` affected the branch in assembly at line `3` and the branching instruction `brlt` was changed to `brge`. Additionally, the `lsl r24` block was swapped with the `ldi r24,lo8(-1)` block. This allows the `return -1` scenario to execute without a jump overhead.

``` cpp/1
int8_t foo(int8_t num) {
    if (num>3) { [[unlikely]] 
        return num + num;
    } else {
        return -1;
    }
}
```

``` asmatmel/2
foo(signed char):
        cpi r24,lo8(4)
        brge .L4
        ldi r24,lo8(-1)
        ret
L4:
        lsl r24
        ret
```

## Cycle count summary

In this snippet, there's a 12% performance improvement in the best case scenario compared to the worst case scenario. Of course, the toolchain might achieve the same result "accidentally", but with our approach, we have explicit control over it.

| Input of the function | [[likely]] (brlt) snippet | [[unlikely]] (brge) snippet |
| --------------------- | ------------------------- | --------------------------- |
| >3                    | 7 cycles                  | 8 cycles                    |
| <=3                   | 8 cycles                  | 7 cycles                    |

# C if conditions

Even using C++20 standard is most elegant way, there is a way to use older C++ or even C itself. But losing portability and depending on a specific toolchain implementation, `gcc` has `__builtin_expect(condition, expected_result)`

This depends on GCC’s __builtin_expect(condition, expected_result) feature and it’s not as pretty, it’s not portable between the toolchains. However, C++ 20 is here to rescue and now it’s part of the standard, now users can annotate the code with attributes which might help the toolchain to make decisions how to organize the branches.


# References

- [cppreference.com likely](https://en.cppreference.com/w/cpp/language/attributes/likely)

- [AVR conditional branching](https://onlinedocs.microchip.com/oxy/GUID-0B644D8F-67E7-49E6-82C9-1B2B9ABE6A0D-en-US-23/GUID-38931E58-9CEC-40B0-AE87-4A97EF329AB8.html)

- [Cycles for each AVR flow change instruction](https://onlinedocs.microchip.com/oxy/GUID-0B644D8F-67E7-49E6-82C9-1B2B9ABE6A0D-en-US-23/GUID-BA59618D-4850-490B-B176-0BCC3D9438A1.html#GUID-BA59618D-4850-490B-B176-0BCC3D9438A1__TABLE_E51_SZJ_ZW) Scroll table 5-3 to see all branching instructions