package com.irrigation.irrigation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.irrigation.irrigation.service.SmsService;

@RestController
@RequestMapping("/api/sms")
public class SmsController {

    @Autowired
    private SmsService smsService;

    @PostMapping("/send")
    public String sendSms(@RequestParam String phoneNumber, @RequestParam String message) {
        return smsService.sendSms(phoneNumber, message);
    }
}
