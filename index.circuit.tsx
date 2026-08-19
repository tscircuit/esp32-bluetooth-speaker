import { MAX98357AETE_T } from "@tsci/Abse2001.MAX98357AETE_T"
import { AMS1117_3_3 } from "./imports/AMS1117_3_3"
import { ESP32_WROOM_32E_N8 } from "./imports/ESP32_WROOM_32E_N8"
import { TYPE_C_31_M_12 } from "./imports/TYPE_C_31_M_12"

const buttonFootprint = "kicad:Button_Switch_SMD/SW_SPST_PTS810"

export default function BluetoothSpeaker() {
  return (
    <board
      title="ESP32 Bluetooth Speaker"
      width="70mm"
      height="50mm"
      layers={2}
      solderMaskColor="blue"
      defaultTraceWidth="0.25mm"
      minBoardEdgeClearance="0.25mm"
    >
      {/* Keep every copper layer clear below the ESP32 PCB antenna. */}
      <keepout
        shape="rect"
        pcbX={-31.5}
        pcbY={7}
        width="7mm"
        height="22mm"
        layers={["top", "bottom"]}
      />

      {/* Continuous bottom return plane for RF, digital audio, and amplifier current. */}
      <copperpour
        name="GND_PLANE_BOTTOM"
        layer="bottom"
        connectsTo="net.GND"
        padMargin="0.2mm"
        traceMargin="0.2mm"
        boardEdgeMargin="0.25mm"
        useThermalReliefs
      />

      {/* Mounting holes for an enclosure or speaker baffle. */}
      <hole diameter="3.2mm" pcbX={-32} pcbY={-22} />
      <hole diameter="3.2mm" pcbX={32} pcbY={-22} />
      <hole diameter="3.2mm" pcbX={-32} pcbY={22} />
      <hole diameter="3.2mm" pcbX={32} pcbY={22} />

      {/* USB-C power input (5 V sink, no USB data). */}
      <TYPE_C_31_M_12
        name="J1"
        displayName="USB-C 5V POWER"
        pcbX={0}
        pcbY={-20.3}
        pcbRotation={180}
        schX={-14}
        schY={4}
        noConnect={["B8", "B7", "A6", "A7", "B6", "A8"]}
      />
      <resistor
        name="R1"
        displayName="USB CC1 Rd"
        resistance="5.1k"
        footprint="0603"
        pcbX={-7}
        pcbY={-15.5}
        schX={-10}
        schY={5}
      />
      <resistor
        name="R2"
        displayName="USB CC2 Rd"
        resistance="5.1k"
        footprint="0603"
        pcbX={7}
        pcbY={-15.5}
        schX={-10}
        schY={3}
      />
      <fuse
        name="F1"
        displayName="1.1A RESETTABLE FUSE"
        currentRating="1.1A"
        voltageRating="6V"
        footprint="1206"
        pcbX={0}
        pcbY={-12.5}
        schX={-9}
        schY={7}
      />

      {/* 5 V to 3.3 V regulator for the ESP32. */}
      <AMS1117_3_3
        name="U2"
        displayName="3.3V REGULATOR"
        pcbX={-13}
        pcbY={-13}
        pcbRotation={90}
        schX={-5}
        schY={7}
        internallyConnectedPins={[["VOUT1", "VOUT2"]]}
      />
      <capacitor
        name="C1"
        displayName="LDO INPUT BULK"
        capacitance="22uF"
        footprint="1206"
        pcbX={-5}
        pcbY={-11}
        schX={-5}
        schY={9}
      />
      <capacitor
        name="C2"
        displayName="LDO OUTPUT BULK"
        capacitance="22uF"
        footprint="1206"
        pcbX={-20}
        pcbY={-10}
        schX={-1}
        schY={7}
      />
      <capacitor
        name="C3"
        displayName="ESP32 BULK"
        capacitance="10uF"
        footprint="0805"
        pcbX={-17}
        pcbY={-7}
        schX={-2}
        schY={4}
      />
      <capacitor
        name="C4"
        displayName="ESP32 BYPASS"
        capacitance="100nF"
        footprint="0603"
        pcbX={-21}
        pcbY={-5}
        schX={0}
        schY={4}
      />

      {/* Bluetooth Classic / A2DP controller. */}
      <ESP32_WROOM_32E_N8
        name="U3"
        displayName="ESP32-WROOM-32E-N8"
        pcbX={-18}
        pcbY={7}
        schX={2}
        schY={1}
        internallyConnectedPins={[
          [
            "GND4",
            "pin40",
            "pin41",
            "pin42",
            "pin43",
            "pin44",
            "pin45",
            "pin46",
            "pin47",
          ],
        ]}
      />

      {/* Reset and boot circuitry plus programming header. */}
      <resistor name="R3" resistance="10k" footprint="0603" pcbX={-3} pcbY={11} schX={-1} schY={-2} />
      <capacitor name="C5" capacitance="1uF" footprint="0603" pcbX={-3} pcbY={8} schX={-1} schY={-3.5} />
      <pushbutton name="SW1" displayName="RESET" footprint={buttonFootprint} pcbX={-1} pcbY={16} schX={-4} schY={-3} />
      <resistor name="R4" resistance="10k" footprint="0603" pcbX={2} pcbY={11} schX={2} schY={-3} />
      <pushbutton name="SW2" displayName="BOOT" footprint={buttonFootprint} pcbX={5} pcbY={16} schX={5} schY={-3} />
      <pinheader
        name="J3"
        displayName="UART PROGRAM"
        pinCount={6}
        pitch="2.54mm"
        pcbOrientation="vertical"
        pcbX={-27}
        pcbY={-13}
        schX={2}
        schY={-7}
        pinLabels={{
          pin1: "3V3",
          pin2: "GND",
          pin3: "TXD0",
          pin4: "RXD0",
          pin5: "EN",
          pin6: "IO0",
        }}
        showSilkscreenPinLabels
      />

      {/* MAX98357A mono I2S class-D amplifier. */}
      <MAX98357AETE_T
        name="U1"
        displayName="MAX98357A I2S AMP"
        pcbX={16}
        pcbY={5}
        schX={12}
        schY={2}
        noConnect={["pin5", "pin6", "pin12", "pin13"]}
      />
      <capacitor
        name="C6"
        displayName="AMP BULK"
        capacitance="10uF"
        footprint="0805"
        pcbX={12}
        pcbY={1}
        schX={9}
        schY={6}
      />
      <capacitor
        name="C7"
        displayName="AMP BYPASS"
        capacitance="100nF"
        footprint="0603"
        pcbX={18}
        pcbY={1}
        schX={11}
        schY={6}
      />
      <resistor
        name="R5"
        displayName="MONO MIX / AMP ENABLE"
        resistance="634k"
        footprint="0603"
        pcbX={10}
        pcbY={8}
        schX={8}
        schY={1}
      />
      <pinheader
        name="J2"
        displayName="SPEAKER 4-8 OHM"
        pinCount={2}
        pitch="5.08mm"
        holeDiameter="1.2mm"
        platedDiameter="2.4mm"
        rightAngle
        pcbX={31}
        pcbY={5}
        pcbRotation={90}
        schX={18}
        schY={2}
        pinLabels={{ pin1: "SPK_POS", pin2: "SPK_NEG" }}
        showSilkscreenPinLabels
      />

      {/* User controls. Firmware uses active-low buttons. */}
      <resistor name="R6" resistance="10k" footprint="0603" pcbX={13} pcbY={-10} schX={8} schY={-4} />
      <pushbutton name="SW3" displayName="PLAY / PAUSE" footprint={buttonFootprint} pcbX={13} pcbY={-17} schX={8} schY={-6} />
      <resistor name="R7" resistance="10k" footprint="0603" pcbX={22} pcbY={-10} schX={12} schY={-4} />
      <pushbutton name="SW4" displayName="VOLUME +" footprint={buttonFootprint} pcbX={22} pcbY={-17} schX={12} schY={-6} />
      <resistor name="R8" resistance="10k" footprint="0603" pcbX={31} pcbY={-10} schX={16} schY={-4} />
      <pushbutton name="SW5" displayName="VOLUME -" footprint={buttonFootprint} pcbX={31} pcbY={-17} schX={16} schY={-6} />

      {/* Status LED driven by GPIO19. */}
      <resistor name="R9" resistance="1k" footprint="0603" pcbX={5} pcbY={13} schX={8} schY={-1} />
      <led name="D1" displayName="STATUS" color="blue" footprint="0603" pcbX={8} pcbY={13} schX={11} schY={-1} />

      {/* USB-C power and configuration. */}
      <trace from=".J1 > .A4B9" to="net.USB_VBUS" width="0.8mm" />
      <trace from=".J1 > .B4A9" to="net.USB_VBUS" width="0.8mm" />
      <trace from=".F1 > .pin1" to="net.USB_VBUS" width="0.8mm" />
      <trace from=".F1 > .pin2" to="net.V5" width="0.8mm" />
      <trace from=".J1 > .A5" to=".R1 > .pin1" />
      <trace from=".R1 > .pin2" to="net.GND" />
      <trace from=".J1 > .B5" to=".R2 > .pin1" />
      <trace from=".R2 > .pin2" to="net.GND" />
      <trace from=".J1 > .A1B12" to="net.GND" width="0.8mm" />
      <trace from=".J1 > .B1A12" to="net.GND" width="0.8mm" />
      <trace from=".J1 > .EH1" to="net.GND" width="0.5mm" />
      <trace from=".J1 > .EH2" to="net.GND" width="0.5mm" />
      <trace from=".J1 > .EH3" to="net.GND" width="0.5mm" />
      <trace from=".J1 > .EH4" to="net.GND" width="0.5mm" />

      {/* Power rails. */}
      <trace from=".U2 > .VIN" to="net.V5" width="0.8mm" />
      <trace from=".U2 > .GND" to="net.GND" width="0.8mm" />
      <trace from=".U2 > .VOUT1" to="net.V3V3" width="0.6mm" />
      <trace from=".U2 > .VOUT2" to="net.V3V3" width="0.6mm" />
      <trace from=".C1 > .pin1" to="net.V5" width="0.6mm" />
      <trace from=".C1 > .pin2" to="net.GND" width="0.6mm" />
      <trace from=".C2 > .pin1" to="net.V3V3" width="0.6mm" />
      <trace from=".C2 > .pin2" to="net.GND" width="0.6mm" />
      <trace from=".C3 > .pin1" to="net.V3V3" width="0.5mm" />
      <trace from=".C3 > .pin2" to="net.GND" width="0.5mm" />
      <trace from=".C4 > .pin1" to="net.V3V3" width="0.5mm" />
      <trace from=".C4 > .pin2" to="net.GND" width="0.5mm" />
      <trace from=".U3 > .3V3" to="net.V3V3" width="0.6mm" />
      <trace from=".U3 > .GND1" to="net.GND" width="0.5mm" />
      <trace from=".U3 > .GND2" to="net.GND" width="0.5mm" />
      <trace from=".U3 > .GND3" to="net.GND" width="0.5mm" />
      <trace from=".U3 > .GND4" to="net.GND" width="0.5mm" />

      {/* ESP32 reset, boot, UART, buttons, and LED. */}
      <trace from=".U3 > .EN" to="net.ESP_EN" />
      <trace from=".R3 > .pin1" to="net.V3V3" />
      <trace from=".R3 > .pin2" to="net.ESP_EN" />
      <trace from=".C5 > .pin1" to="net.ESP_EN" />
      <trace from=".C5 > .pin2" to="net.GND" />
      <trace from=".SW1 > .pin1" to="net.ESP_EN" />
      <trace from=".SW1 > .pin2" to="net.GND" />
      <trace from=".U3 > .IO0" to="net.ESP_IO0" />
      <trace from=".R4 > .pin1" to="net.V3V3" />
      <trace from=".R4 > .pin2" to="net.ESP_IO0" />
      <trace from=".SW2 > .pin1" to="net.ESP_IO0" />
      <trace from=".SW2 > .pin2" to="net.GND" />
      <trace from=".U3 > .TXD0" to="net.UART_TX" />
      <trace from=".U3 > .RXD0" to="net.UART_RX" />
      <trace from=".J3 > .pin1" to="net.V3V3" />
      <trace from=".J3 > .pin2" to="net.GND" />
      <trace from=".J3 > .pin3" to="net.UART_TX" />
      <trace from=".J3 > .pin4" to="net.UART_RX" />
      <trace from=".J3 > .pin5" to="net.ESP_EN" />
      <trace from=".J3 > .pin6" to="net.ESP_IO0" />

      <trace from=".U3 > .IO32" to="net.BTN_PLAY" />
      <trace from=".R6 > .pin1" to="net.V3V3" />
      <trace from=".R6 > .pin2" to="net.BTN_PLAY" />
      <trace from=".SW3 > .pin1" to="net.BTN_PLAY" />
      <trace from=".SW3 > .pin2" to="net.GND" />
      <trace from=".U3 > .IO33" to="net.BTN_VOL_UP" />
      <trace from=".R7 > .pin1" to="net.V3V3" />
      <trace from=".R7 > .pin2" to="net.BTN_VOL_UP" />
      <trace from=".SW4 > .pin1" to="net.BTN_VOL_UP" />
      <trace from=".SW4 > .pin2" to="net.GND" />
      <trace from=".U3 > .IO27" to="net.BTN_VOL_DOWN" />
      <trace from=".R8 > .pin1" to="net.V3V3" />
      <trace from=".R8 > .pin2" to="net.BTN_VOL_DOWN" />
      <trace from=".SW5 > .pin1" to="net.BTN_VOL_DOWN" />
      <trace from=".SW5 > .pin2" to="net.GND" />
      <trace from=".U3 > .IO19" to=".R9 > .pin1" />
      <trace from=".R9 > .pin2" to=".D1 > .anode" />
      <trace from=".D1 > .cathode" to="net.GND" />

      {/* I2S audio and MAX98357A configuration. */}
      <trace from=".U3 > .IO26" to="net.I2S_BCLK" />
      <trace from=".U3 > .IO25" to="net.I2S_LRCLK" />
      <trace from=".U3 > .IO22" to="net.I2S_DIN" />
      <trace from=".U3 > .IO23" to=".R5 > .pin1" />
      <trace from=".R5 > .pin2" to="net.AMP_SD_MODE" />
      <trace from=".U1 > .BCLK" to="net.I2S_BCLK" />
      <trace from=".U1 > .LRCLK" to="net.I2S_LRCLK" />
      <trace from=".U1 > .DIN" to="net.I2S_DIN" />
      <trace from=".U1 > .N_SD_MODE" to="net.AMP_SD_MODE" />
      <trace from=".U1 > .GAIN" to="net.GND" />
      <trace from=".U1 > .VDD" to="net.V5" width="0.8mm" />
      <trace from=".U1 > .VDD2" to="net.V5" width="0.8mm" />
      <trace from=".U1 > .GND" to="net.GND" width="0.8mm" />
      <trace from=".U1 > .GND2" to="net.GND" width="0.8mm" />
      <trace from=".U1 > .GND3" to="net.GND" width="0.8mm" />
      <trace from=".U1 > .EP" to="net.GND" width="0.8mm" />
      <trace from=".C6 > .pin1" to="net.V5" width="0.8mm" />
      <trace from=".C6 > .pin2" to="net.GND" width="0.8mm" />
      <trace from=".C7 > .pin1" to="net.V5" width="0.5mm" />
      <trace from=".C7 > .pin2" to="net.GND" width="0.5mm" />
      <trace from=".U1 > .OUTP" to=".J2 > .pin1" width="1mm" />
      <trace from=".U1 > .OUTN" to=".J2 > .pin2" width="1mm" />

      {/* Assembly and enclosure legends. */}
      <silkscreentext text="ESP32 BLUETOOTH SPEAKER" pcbX={9} pcbY={21} fontSize="1.2mm" />
      <silkscreentext text="USB-C 5V" pcbX={0} pcbY={-19} fontSize="0.9mm" />
      <silkscreentext text="PLAY" pcbX={13} pcbY={-21} fontSize="0.8mm" />
      <silkscreentext text="VOL+" pcbX={22} pcbY={-21} fontSize="0.8mm" />
      <silkscreentext text="VOL-" pcbX={31} pcbY={-21} fontSize="0.8mm" />
      <silkscreentext text="4-8 OHM" pcbX={29} pcbY={11} fontSize="0.8mm" />
      <silkscreentext text="ANTENNA - NO COPPER" pcbX={-31.5} pcbY={7} pcbRotation={90} fontSize="0.7mm" />
    </board>
  )
}
