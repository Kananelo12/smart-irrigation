package com.irrigation.irrigation.service;

import org.springframework.stereotype.Component;
import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.net.InetAddress;

import javax.jmdns.JmDNS;
import javax.jmdns.ServiceInfo;

@Component
public class MdnsPublisher {

    @PostConstruct
    public void registerService() throws IOException {
        JmDNS jmdns = JmDNS.create(InetAddress.getLocalHost());
        ServiceInfo serviceInfo = ServiceInfo.create("_http._tcp.local.", "springboot-backend", 8080, "path=/");
        jmdns.registerService(serviceInfo);
    }
}

