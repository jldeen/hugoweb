+++
author = "jldeen"
date = 2021-01-04T19:01:49Z
description = ""
draft = true
slug = "sonos-vlans-and-unifi"
title = "Sonos, VLANs, and Unifi"
layout = "post"

+++


This post was tested on Unifi Dream Machine (Base) with firmware 1.8.5 and Network Controller Software 6.0.43.

I have two primary VLANs I want to allow traffic for Sonos:

LAN (private, untagged VLAN by default, UDM does not allow tagging of this VLAN though it does have a VLAN ID of 1) - 192.168.186.0/24

IoT (tagged 184) - 192.168.184.0/24

Guest (tagged 185) - 192.168.185.0/24

My devices, as well as all other family member devices, are on the default LAN network. Sonos lives on the IoT VLAN along with 30+ other devices including Lutron, Ring, and Philips Hue. There are zero issues communicating with any other devices, but Sonos, when using the Sonos app, of course has known issues. (It should be noted I can play any music I want on our Sonos devices with Spotify, this is really just a Sonos app specific problem).

Fix:

Ensure IGMP snooping is enabled on both desired networks (LAN and IoT in my case)

Ensure Multicast DNS (mDNS) is enabled under New Features, Advanced Gateway Settings, mDNS (This enables the mDNS reflector service on the UDM)

Ensure both ntworks have "Multicast Enhancement" enabled

Now, without any firewall rules in place, the Sonos app works perfectly. However, once you isolate traffic between LAN and IoT, you can no longer use Sonos without the following settings.

First, my LAN network can talk to any VLANs (including Guest), both Guest and IoT can respond to any request from my LAN (private), but neither can initiate. Guest is the most restrictive as the only device it can communicate with is the printer via port 9100 - it is fully isolated from even the IoT network.

Now, under Routing & Firewall (in the classic settings because it's easier and more familiar), I have the following LAN IN rules, in the following order:

Allow established and related traffic, accept, all protocols, any source, any destination.

Allow Printer from IoT to All, accept, TCP and UDP, Source: IoT group (IoT VLAN), Source: specify printer ports (9100), Destination: any.

Allow Sonos to LAN (here's where the magic happens), accept, all protocols, source Groups (sonos IP devices), destination, Private LAN with specific Sonos TCP and UDP Ports:
- 80
- 443
- 445
- 3445
- 3400-3401
- 35001-3501
- 4444
- 136-139
- 1900-1901
- 6969
- 32412-32414
- 4070
- 5353
- 43674
- 43761
- 43418

Final rule: Drop New IoT to Private LAN traffic, drop, all protocols, Source: IoT Network, Dest: Private Network.

After enabling the rules in that order, give your UDM about 30 seconds or so to refresh and retest Sonos app - you should find that your devices on your private LAN can now properly communicate with your Sonos devices on your IoT network and VLAN. This solution does not require any multicast relay or other software to run on any other devices on the network (that was a legacy hack that previously existed).



