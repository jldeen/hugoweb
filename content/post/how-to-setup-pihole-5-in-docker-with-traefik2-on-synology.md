+++
author = "jldeen"
date = 2020-10-06T22:37:40Z
description = ""
draft = true
slug = "how-to-setup-pihole-5-in-docker-with-traefik2-on-synology"
title = "How to setup Pihole 5 with Traefik2 using Docker Compose on Synology DSM 6"

+++


My environment:

Subnet 192.168.186.x
Router: Amplifi Alien
Synology IP: 192.168.186.133

Pihole IP: 192.168.186.199

Links used:

https://www.smarthomebeginner.com/synology-docker-media-server/

https://www.travisgeis.com/2020/07/05/homeassistant-in-docker-on-synology-nas/

https://github.com/pi-hole/docker-pi-hole/issues/536

https://community.amplifi.com/topic/859/override-isp-dns-settings/10

http://tonylawrence.com/posts/unix/synology/free-your-synology-ports/

Configuration:

- Traefik 2 using Cloudflare (replaces apache2)
- Pihole using Traefik

Both using Oauth with Google, for added security

Networking setup:

Two networks - 
- 1 for Traefik to see your pihole service and route accordingly
- 1 for Pihole to receive an actual IP address and mac address so it's visible on your network

My network names and info:
- t2_proxy 192.168.90.0/24
- pihole_network 192.168.186.192/28

Traefik is connected to t2_proxy.
Pihole is connected to both networks: t2_proxy with a dedicated ipv4 addr 192.168.90.16 and pihole_network with a dedicated ipv4 addr of 192.168.186.199.

You will need to create macvlan network in Docker, which allows you to make pihole appear as though it's connected to a physical network interface (even though it's not). 

You can do this in docker-compose (I did this in docker-compose version 3.8, but couldn't find official docs stating it was supported in v3 - most docs claim it only works in v2).

```
networks:
  pihole_network:
    driver: macvlan
    driver_opts:
      parent: bond0
    ipam:
      config:
        - subnet: 192.168.186.0/24            # <-- Update
          gateway: 192.168.186.1              # <-- Update
          ip_range: 192.168.186.192/28 
```

You can also do it with a standalone command, if you prefer.

`docker network create -d macvlan --gateway=192.168.186.1 --subnet 192.168.186.0/24 --ip-range=192.168.186.192/28 -o parent=bond0 pihole_network`

Once the macvlan network is created, verify:

`docker network ls | grep pihole_network`

Now you need to create a route for your synology to see the macvlan you created in Docker.
```
sudo ip link add macvlan link bond0 type macvlan mode bridge # adds a bridge between bond0 an macvlan
sudo ip addr add 192.168.186.133/24 dev macvlan # adds a block of addresses to be used for allocation
sudo ip link set macvlan up # brings the link up
sudo ip route add 192.168.186.192/28 dev macvlan # creates the route to the new macvlan link previously created
```

Once you have the networking in place, you can stand up your services:

```
services:
  traefik:
    container_name: traefik
    image: traefik:picodon
    restart: unless-stopped
    command: # CLI arguments
      - --global.checkNewVersion=true
      - --global.sendAnonymousUsage=true
      - --entryPoints.http.address=:80
      - --entryPoints.https.address=:443
      # Allow these IPs to set the X-Forwarded-* headers - Cloudflare IPs: https://www.cloudflare.com/ips/
      - --entrypoints.https.forwardedHeaders.trustedIPs=173.245.48.0/20,103.21.244.0/22,103.22.200.0/22,103.31.4.0/22,141.101.64.0/18,108.162.192.0/18,190.93.240.0/20,188.114.96.0/20,197.234.240.0/22,198.41.128.0/17,162.158.0.0/15,104.16.0.0/12,172.64.0.0/13,131.0.72.0/22
      - --entryPoints.traefik.address=:8080
      # - --api=true
      - --api.insecure=true
      # - --serversTransport.insecureSkipVerify=true
      - --log=true
      - --log.level=DEBUG # (Default: error) DEBUG, INFO, WARN, ERROR, FATAL, PANIC
      - --accessLog=true
      - --accessLog.filePath=/traefik.log
      - --accessLog.bufferingSize=100 # Configuring a buffer of 100 lines
      - --accessLog.filters.statusCodes=400-499
      - --providers.docker=true
      - --providers.docker.endpoint=unix:///var/run/docker.sock
      # - --providers.docker.defaultrule=HostHeader(`{{ index .Labels "com.docker.compose.service" }}.$DOMAINNAME`)
      - --providers.docker.exposedByDefault=false
      # Add dns-cloudflare as default certresolver for all services. Also enables TLS and no need to specify on individual services.
      - --entrypoints.https.http.tls.certresolver=dns-cloudflare # Comment out after first run; enables wildcard cert
      - --entrypoints.https.http.tls.domains[0].main=$DOMAINNAME
      - --entrypoints.https.http.tls.domains[0].sans=*.$DOMAINNAME
      # - --entrypoints.https.http.tls.domains[1].main=$DOMAIN # Pulls main cert for second domain
      # - --entrypoints.https.http.tls.domains[1].sans=*.$DOMAIN # Pulls wildcard cert for second domain
      - --providers.docker.network=t2_proxy
      - --providers.docker.swarmMode=false
      - --providers.file.directory=/rules # Load dynamic configuration from one or more .toml or .yml files in a directory.
      # - --providers.file.filename=/path/to/file # Load dynamic configuration from a file.
      - --providers.file.watch=true # Only works on top level files in the rules folder
      # - --certificatesResolvers.dns-cloudflare.acme.caServer=https://acme-staging-v02.api.letsencrypt.org/directory # LetsEncrypt Staging Server - uncomment when testing
      - --certificatesResolvers.dns-cloudflare.acme.email=$CLOUDFLARE_EMAIL
      - --certificatesResolvers.dns-cloudflare.acme.storage=/acme.json
      - --certificatesResolvers.dns-cloudflare.acme.dnsChallenge.provider=cloudflare
      - --certificatesResolvers.dns-cloudflare.acme.dnsChallenge.resolvers=1.1.1.1:53,1.0.0.1:53
    networks:
      t2_proxy:
        ipv4_address: 192.168.90.254
    security_opt:
      - no-new-privileges:true
    ports:
      - "80:80"
      - "443:443"
      - "8080:8080"
    dns:
      - 192.168.186.199 # point to pihole ip address
      - 192.168.186.1
    volumes:
      - $DOCKERDIR/traefik2/rules:/rules # file provider directory
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - $DOCKERDIR/traefik2/acme/acme.json:/acme.json # cert location - you must touch this file and change permissions to 600
      - $DOCKERDIR/traefik2/traefik.log:/traefik.log # for fail2ban - make sure to touch file before starting the container
      - $DOCKERDIR/shared:/shared
    environment:
      - CF_API_EMAIL=$CLOUDFLARE_EMAIL
      - CF_API_KEY=$CLOUDFLARE_API_KEY
    labels:
      - "traefik.enable=true"
      ## HTTP-to-HTTPS Redirect
      - "traefik.http.routers.http-catchall.entrypoints=http"
      - "traefik.http.routers.http-catchall.rule=HostRegexp(`{host:.+}`)"
      - "traefik.http.routers.http-catchall.middlewares=redirect-to-https"
      - "traefik.http.middlewares.redirect-to-https.redirectscheme.scheme=https"
      ## HTTP Routers
      - "traefik.http.routers.traefik-rtr.entrypoints=https"
      - "traefik.http.routers.traefik-rtr.rule=HostHeader(`traefik.$DOMAINNAME`)"
      ## Services - API
      - "traefik.http.routers.traefik-rtr.service=api@internal"
      ## Middlewares
      - "traefik.http.routers.traefik-rtr.middlewares=chain-oauth@file" 


  # Pi Hole
  pihole:
    container_name: pihole
    image: pihole/pihole:latest
    hostname: pihole
    domainname: $DOMAINNAME
    networks:
      pihole_network:
        ipv4_address: 192.168.186.199 # pihole ip address
      t2_proxy:
        ipv4_address: 192.168.90.16
    dns:
      - 127.0.0.1
      - 1.1.1.1 
    restart: unless-stopped
    security_opt:
      - no-new-privileges:false
    ports:
      - 443/tcp
      - 53/tcp
      - 53/udp
      - 67/udp
      - 80/tcp
    volumes:
      - $DOCKERDIR/pihole/etc-pihole/:/etc/pihole/
      - $DOCKERDIR/pihole/etc-dnsmasq.d/:/etc/dnsmasq.d/
      # run `touch ./pihole.log` first unless you like errors
      - $DOCKERDIR/pihole/pihole.log:/var/log/pihole.log
    environment:
      ServerIP: 192.168.186.199 # pihole ip address
      DNSMASQ_LISTENING: local
      PROXY_LOCATION: pihole
      VIRTUAL_HOST: pihole.$DOMAINNAME
      VIRTUAL_PORT: 80
      TZ: 'America/Los_Angeles'
      WEBPASSWORD: $PIHOLE_PASS
    labels:
      - "traefik.enable=true"
      - "traefik.docker.network=pi_net"
      - "traefik.frontend.rule=HostRegexp:pihole.$DOMAINNAME,{catchall:.*}"
      - "traefik.frontend.priority=1"
      - "traefik.backend=pihole"
      - "traefik.port=80"
      - "traefik.port=443"
    #   ## HTTP Routers
      - "traefik.http.routers.pihole-rtr.entrypoints=https"
      - "traefik.http.routers.pihole-rtr.rule=HostHeader(`pihole.$DOMAINNAME`)"
    #   ## Middlewares
      - "traefik.http.routers.pihole-rtr.middlewares=chain-oauth@file"
    #   ## HTTP Services
    #   - "traefik.http.routers.pihole-rtr.service=pihole-svc"
      - "traefik.http.services.pihole-svc.loadbalancer.server.port=80"
```



