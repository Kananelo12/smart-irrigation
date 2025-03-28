package com.irrigation.irrigation.service;

import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import com.irrigation.irrigation.model.TwilioConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SmsService {

    private final TwilioConfig twilioConfig;

    @Autowired
    public SmsService(TwilioConfig twilioConfig) {
        this.twilioConfig = twilioConfig;
    }

    public String sendSms(String to, String message) {
        Message sms = Message.creator(
                new PhoneNumber(to), 
                new PhoneNumber(twilioConfig.getTwilioPhoneNumber()), 
                message
        ).create();

        return sms.getSid(); // Return message SID for tracking
    }
}
