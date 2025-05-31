---
title: About me
permalink: about.html
eleventyNavigation:
    key: About me
    order: 900
---


I’m Anton, and this is my blog. I've been living in Ireland since 2007. For the first ten years, I stayed in Waterford where I graduated from SETU and got involved in many volunteering events over many years. This includes South East Makerspace events and workshops as well as Springboard higher diploma in science in computing courses, and various other initiatives. In 2017, I moved to Dublin and now it's the city that I call my home.

I enjoy engaging in various activities, and my hobbies are quite diverse across a wide range of projects and domains. I've created this website as a means to partly document my hobbies and ongoing projects; nevertheless, it is evident that I am falling behind in consistently updating it.

However, over the time I was trying to improve and instead of doing everything at once I started focusing on specific things at the time and only later to move to different topics and interests. This way I still get to experience a lot of cool things and play with lots of technologies.

My taste in my hobbies changed slightly over the time. In the past I enjoyed doing a lot of things around networking, managed my own Linux mini-distribution which was targeting routers and gateways. I was curious about IoT and thought that it should use very cheap hardware. It’s easy to use powerful but expensive hardware, but it I wanted the IoT devices on the edge to be as cheap as possible. Chips like ESP32-C3 didn’t exist back then, so this was a much bigger deal than it sounds nowadays. To keep the cost low, I used a low-end microcontroller, designed and hand etched my ethernet dev board, and write my own TCP/IP stack. I have chosen a low-end microcontroller on purpose, to keep the cost low and to give me a challenge as I really enjoy squeezing the most from existing hardware. Proving something is doable even when it might seem as impossible gives me big satisfaction. How low-end? It was using AVR Mega8 which has only 8KB ROM and 1KB RAM, yet handles ethernet transmission units 1500 bytes big. Benefits from doing these things are manifolds, first it’s a great feeling of achievements and a lot of things I learned in the process. Got to practice a PCB layout, to etch PCB with chemicals, to hand solder small components and then to develop drivers, TCP/IP stack and even small web server application on top. I was aiming for 2KB footprint or lower as I wanted to make it into a bootloader and be competition to Arduino devices. I got very close to the target, but didn’t reach it completely. Despite missing that goal, the whole project was great fun.



In 2016, I was in the college and wanted to make my final year project about affordable IoT ecosystem. Where I heard this idea before? Hehe, but this time I did things slightly differently. This time I ditched the Ethernet and moved to WiFi, ESP8266 was a great low-cost chip exactly for this task. The ESP32 released soon after, but it was not cheap yet and therefore I stayed with ESP8266. Used LUA scripting to run on the edge devices and TypeScript backend to run on the central node (running on x86 or on Raspberry Pi).

When finishing the project, I had many small IoT edge nodes (just bare PCBs), and wanted to make them more presentable, but how? We were fixing a 3D printer in my makerspace over the summer and I wondered if it could be used to 3D print cases. Soon after I built my own 3D printer, it was heavily ‘inspired’ by Prusa mk2. As next I learned how to model in SolidWorks and made my own cases for the college project. The whole experience was great fun and I keep this hobby to this day. I try to publish some of my creations on Thingiverse from time to time. Cases for FPGA dev boards, household items and random trinkets are published here:
https://www.thingiverse.com/truhlik_fredy/designs

It’s a great time for makers to be alive when you can make your PCB, make the firmware and even the case for the project completely yourself. I could do a lot in my home and was wondering what hobby I should do as next. I had a 3D printer and knew how to make PCBs with chemicals, but was wondering if I could make PCBs without chemicals just with a DIY CNC. To my delight I found exactly a project doing that, Cyclone PCB, it’s a small CNC from mostly 3D printed parts and designed to handle light/small workloads, just enough to manufacture PCBs.



After many iterations and a few changes to the 3D parts, it produced PCBs at quality I was happy with:



Later, my interests expanded to drones and got to build a few of them. It’s a great hobby, but it’s easy to spiral out and building one more and one more. I made a few small tools which helped me to balance the motors, got to experiment with writing my own On-Screen-Display firmware. However, a handful of work-in-progress drones had to be donated as I was moving from Waterford to a smaller apartment in Dublin. Had less space to build them and not much chances to fly them and eventually parked this hobby. On the internet are very impressive videos where the drones do ambitious stunts, but for me, the very first time flying my own creation and even hovering 50cm above the ground was very rewarding. Overall drone building hobby is a very nice hobby and I would recommend it to everybody who is curious or considering it.









In recent years, I rediscovered my passion for C++ and mostly focusing on how some of the C++ 14/17 features that are very suitable in an embedded context. Myths and rumours spread between engineers, claiming C++ being bloated and not suitable for embedded targets, it’s a sad. Yet many of the features can make the applications faster, safer, smaller and sometimes even easier to read than C. I would like self-publish a book in the future about my views on C++, but so far I’m just collecting notes and running various experiments.

If you are curious to know more about me, then please visit me on LinkedIn.

And you can have a look at my GitHub accounts. Originally, the idea was to have one account for college/hobby repositories and one account for professional work. However, I blurred the lines when I started doing hobby things in my free time, which I intended to use later in the work. And now there is no proper separation between the accounts:

GitHub/truhlikfredy

GitHub/AntonKrug