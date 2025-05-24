package com.irrigation.irrigation.service;

import java.io.IOException;
import java.net.InetAddress;
import java.util.HashMap;
import java.util.Map;

import javax.jmdns.JmDNS;
import javax.jmdns.ServiceInfo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.annotation.PostConstruct;

@Component
@RestController
@RequestMapping("/api")
public class MdnsPublisher {

    private String serviceName = "springboot-backend";
    private String serviceIp = "Unavailable";
    private int servicePort = 8080;

    private static final Logger logger = LoggerFactory.getLogger(MdnsPublisher.class);

    @PostConstruct
    public void registerService() {
        try {
            InetAddress localhost = InetAddress.getLocalHost();
            JmDNS jmdns = JmDNS.create(localhost);

            ServiceInfo serviceInfo = ServiceInfo.create("_http._tcp.local.", serviceName, servicePort, "path=/");
            jmdns.registerService(serviceInfo);

            this.serviceName = serviceInfo.getName();
            this.serviceIp = localhost.getHostAddress();
            this.servicePort = serviceInfo.getPort();

            logger.info("✅ mDNS service registered successfully:");
            logger.info("   ➤ Name: {}", serviceName);
            logger.info("   ➤ Type: {}", serviceInfo.getType());
            logger.info("   ➤ Host: {}", serviceIp);
            logger.info("   ➤ Port: {}", servicePort);
        } catch (IOException e) {
            logger.error("❌ Failed to register mDNS service", e);
        }
    }

    @GetMapping("/mdns-info")
    public Map<String, Object> getMdnsInfo() {
        Map<String, Object> info = new HashMap<>();
        info.put("serviceName", serviceName);
        info.put("ip", serviceIp);
        info.put("port", servicePort);
        return info;
    }
}
