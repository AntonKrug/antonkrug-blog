---
title: Home landing page
permalink: index.html
date: false
author: false
eleventyImport:
  collections: ["post"]
---

<p style="margin-top: 0px;">
<img src="/assets/slides/slide_jtag.jpg" width="900" height="300">
<img src="/assets/slides/drones-small.jpg" width="896" height="406">
</p>

{% assign non_wch_posts = collections.post | reject: 'data["wch_post_type"]', "true" %}
{% assign non_wch_cpp_posts = non_wch_posts | reject: 'data["cpp_post_type"]', "true" %}

<aside class="widget widget-iconCard">
    <p class="d-flex gap-5 | p-5 m-0 | brad-3 bc-neutral-100 bwidth-1 bstyle-dashed bcolor-neutral-500">
        <span class="icon-pen fs-10 | c-primary-500" fs-8="xs"></span>
        <span class="d-flex fd-column gap-1">
            <strong class="fvs-wght-700 fs-6">Recent blog posts</strong>
            <span>
                {%- for post in non_wch_posts reversed -%}
                    {% if forloop.index <= 3     %}
                        <a href="{{ post.url }}">{{ post.data.title }}</a><br/>
                    {%- endif -%}
                {%- endfor -%}
                <br/>
                <a href="/posts">All blog posts ...</a>
            </span>
        </span>
    </p>
</aside>

<aside class="widget widget-iconCard">
    <p class="d-flex gap-5 | p-5 m-0 | brad-3 bc-neutral-100 bwidth-1 bstyle-dashed bcolor-neutral-500">
        <span class="icon-faders fs-10 | c-primary-500" fs-8="xs"></span>
        <span class="d-flex fd-column gap-1">
            <strong class="fvs-wght-700 fs-6">Recent WCH RISC-V ecosystem posts</strong>
            <span>
                {%- for post in collections.wch reversed -%}
                    {% if forloop.index <= 3     %}
                        <a href="{{ post.url }}">{{ post.data.title }}</a><br/>
                    {%- endif -%}
                {%- endfor -%}
                <br/>
                <a href="/tags/wch/">More WCH RISC-V posts ...</a>
            </span>
        </span>
    </p>
</aside>

<aside class="widget widget-iconCard">
    <p class="d-flex gap-5 | p-5 m-0 | brad-3 bc-neutral-100 bwidth-1 bstyle-dashed bcolor-neutral-500">
        <span class="icon-code fs-10 | c-primary-500" fs-8="xs"></span>
        <span class="d-flex fd-column gap-1">
            <strong class="fvs-wght-700 fs-6">Recent C++ posts</strong>
            <span>
                {%- for post in collections.cpp reversed -%}
                    {% if forloop.index <= 3     %}
                        <a href="{{ post.url }}">{{ post.data.title }}</a><br/>
                    {%- endif -%}
                {%- endfor -%}
                <br/>
                <a href="/tags/wch/">More C++ posts ...</a>
            </span>
        </span>
    </p>
</aside>

Want to learn more [about me](/about)?


This site was generated using [11ty](https://www.11ty.dev/) and [libDoc](https://github.com/ita-design-system/eleventy-libdoc)theme.