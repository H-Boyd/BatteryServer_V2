#include <Arduino.h>
#include <HTTPClient.h>
#include <WiFi.h>
#include <heltec.h>

#define Led1 21
#define Button1 22

// WiFi credentials
#include "DeploymentID.h"
#include "wifiCredentials.h"

const int charge_threshold = 35;
bool is_below_threshold;
bool notification_led_value;
long SnoozedTill;
int SnoozedTimeInMillis = 3600000;
bool NeverSnoozed = 1;

void setup() {
    Serial.begin(115200);
    pinMode(Led1, OUTPUT);
    pinMode(Button1, INPUT_PULLUP);

    Heltec.begin(true /*DisplayEnable Enable*/, false /*LoRa Disable*/, true /*Serial Enable*/);
    Heltec.display->setTextAlignment(TEXT_ALIGN_LEFT);
    Heltec.display->setFont(ArialMT_Plain_10);
    Heltec.display->clear();
    Heltec.display->display();

    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
}

void loop() {
    if (WiFi.status() == WL_CONNECTED) {
        HTTPClient http;

        String URL = secret_url;
        http.begin(URL.c_str());
        http.setFollowRedirects(HTTPC_STRICT_FOLLOW_REDIRECTS);
        int httpCode = http.GET();
        String payload;
        if (httpCode > 0) {
            payload = http.getString();
            payload.toLowerCase();
            Heltec.display->clear();
            Heltec.display->drawString(0, 0, payload);
            Heltec.display->display();
            digitalWrite(Led1, (payload == "TRUE"));
            http.end();

            Serial.println(payload);

            int StringLength = payload.length();
            int elementsFound = 0;
            int lastCommaLocation = 0;
            String Names[3];
            int Values[3];

            for (int i = 0; i <= StringLength; i++) {
                if (payload[i] == ',') {
                    if (!(elementsFound & 1)) {
                        Names[elementsFound >> 1] = payload.substring(lastCommaLocation + (!!elementsFound), i);
                    } else {
                        Values[elementsFound >> 1] = payload.substring(lastCommaLocation + (!!elementsFound), i).toInt();
                    }

                    lastCommaLocation = i;
                    elementsFound += 1;
                }
                Values[2] = payload.substring(lastCommaLocation + 1).toInt();
            }
            for (int L = 0; L < (10 * 30); L++) {
                if (!(digitalRead(Button1))) {
                    SnoozedTill = millis() + SnoozedTimeInMillis;
                    NeverSnoozed = 0;
                }
                is_below_threshold = (Values[0] <= charge_threshold);
                notification_led_value = ((millis() > SnoozedTill) || NeverSnoozed) & is_below_threshold;

                Heltec.display->clear();
                if (is_below_threshold) {
                    Heltec.display->drawString(0, 0, "Need to charge " + Names[0] + ",\nit is on " + Values[0] + "%.");
                } else {
                    Heltec.display->drawString(0, 0, "Nothing needs charging\n" + Names[0] + " is on " + Values[0] + "%.");
                }

                if (millis() < SnoozedTill) {
                    int timeLeft = (SnoozedTill - millis()) / 1000;
                    Heltec.display->drawString(0, 32, "Snoozing for " + String(timeLeft) + " seconds.");
                }

                Heltec.display->drawString(0, 48, payload);
                Heltec.display->display();

                digitalWrite(Led1, notification_led_value);

                delay(100);
            }
        }
    }
}
