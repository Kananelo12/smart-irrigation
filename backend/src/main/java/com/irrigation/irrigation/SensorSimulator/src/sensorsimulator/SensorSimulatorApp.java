/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.irrigation.irrigation.SensorSimulator.src.sensorsimulator;

/**
 *
 * @author polok
 */
public class SensorSimulatorApp {
    public static void main(String[] args) {
        while (true) {
            SensorData data = SensorSimulator.generateSensorData();
            System.out.println(data);

            try {
                Thread.sleep(5000); // Simulate a reading every 5 seconds
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
