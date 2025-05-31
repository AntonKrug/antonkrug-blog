---
title: WCH single cycle FLASH is a lie
description: It really is a illusion (2min read)
permalink: "{{ libdocConfig.blogSlug }}/wch/1cycle-flash.html"
tags:
    - hw
date: 2025-06-01
---

# Executive Summary
{% alert 'WCH chips do not have fast FLASH and they hide this limitation by using SRAM instead.', 'success', 'LT;DR:' %}


The behavior of single-clock access "FLASH" memory is faked using SRAM with restricted (read-only) access rights to mimic FLASH. Additionally, the segment that does not operate as non-single-cycle part is indded genuine FLASH behaviour.

# Speculation behind their motivation

Economics at scale often do not make sense when viewed from a consumer viewpoint. 
I'm speculating why WCH does the things the way they do, but it's not uncommon practice.
For instance, the Lattice iCE40-HX4K-TQ144 is actually an HX8K chip inside a TQ144 package. It cannot be precisely compared to the real HX8K because the real HX8K is not packaged into TQ144 at all, but the HX4K part has many of the HX8K resources. Officially, this is hidden and locked away, but with tools like [Yosys](https://github.com/YosysHQ/icestorm/blob/master/docs/source/overview.rst#what-is-the-status-of-the-project). You can utilize the hardware fully as 8k part even though officially, it should only be a 4k part.

Why sell better parts as pseudo-low-end parts for less? Because vendors want to sell higher end parts for higher prices and still attract customers with lower budgets using lower end parts. However, making many bespoke parts is expensive because creating custom photolithography masks to produce these integrated circuits [is very expensive](https://en.wikipedia.org/wiki/Photomask#Leading_commercial_photomask_manufacturers). It's cheaper to manufacture higher end devices and produce them in larger volumes (which drives down the cost) while limiting the hardware capabilities with minor software or hardware modifications after the higher-end part is produced. This can even make higher end devices more cost effective by sharing production volume with lower end devices.

Of course, if there are significant die changes (in footprint size) or an extremely large volume is required for each part, then creating bespoke masks for each part becomes worthwhile. 

 There are numerous similiar scenarios involving various vendors that have occurred across multiple industries where making the most universal product in volume is cheaper than tool for each subproduct.

And there are also other practices where a more capable chip is sold as lower. They are not related to WCH case, but is cool tangent to mention when were on the topic. For example binning for Xeon x5650 CPUs guranteed continuous stability in server workloads at [2.66Ghz](https://www.intel.com/content/www/us/en/products/sku/47922/intel-xeon-processor-x5650-12m-cache-2-66-ghz-6-40-gts-intel-qpi/specifications.html), on surface it looked not that remarkable and I got mine used for around 20 euro from [eBay](https://www.ebay.ie/sch/i.html?_nkw=xeon+x5650). Also the binning on these Xeons had left a lot of marging for overclocking. I was running for years mine overclocked one at 4.25Ghz!


{% img "assets/wch/fastFlash/bios.jpg" %}

And in benchmarks it was beating CPUs released years later:

{% img "assets/wch/fastFlash/cinebench.jpg" %}



And I was not the onlyone, this was not fluke, others expierenced [similar results](https://www.youtube.com/watch?v=VMbUXKsMKKA).




# Affected devices

One chip can act as multiple chips with different FLASH/RAM memory configurations.

- Part numbers CH32V203RBT6 and CH32V208xBxx support 3 configurations:

    | FLASH | SRAM | Note                  |
    | ----- | ---- | --------------------- |
    | 128k  | 64k  | Default configuration |
    | 144k  | 48k  |                       |
    | 160k  | 32k  |                       |

- Part numbers CH32V303xCxx, CH32V305xCxx and CH32V307xCxx support 4 configurations:

    | FLASH | SRAM | Note                  |
    | ----- | ---- | --------------------- |
    | 288k  | 32k  |                       |
    | 256k  | 64k  | Default configuration |
    | 224k  | 96k  |                       |
    | 192k  | 128k |                       |

- Part numbers CH32V317xCxx support 5 configurations:

    | FLASH | SRAM | Note                  |
    | ----- | ---- | --------------------- |
    | 288k  | 32k  |                       |
    | 256k  | 64k  |                       |
    | 224k  | 96k  |                       |
    | 192k  | 128k |                       |
    | 128k  | 192k | Default configuration |


# Proof

There are various speculations on forums, but there is small 
