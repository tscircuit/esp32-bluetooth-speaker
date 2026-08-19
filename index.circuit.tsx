import { MAX98357AETE_T } from "@tsci/Abse2001.MAX98357AETE_T";
import { AMS1117_3_3 } from "./imports/AMS1117_3_3";
import { ESP32_WROOM_32E_N8 } from "./imports/ESP32_WROOM_32E_N8";
import { TYPE_C_31_M_12 } from "./imports/TYPE_C_31_M_12";
import { XL_1608UBC_04 } from "./imports/XL_1608UBC_04";

const buttonFootprint = "kicad:Button_Switch_SMD/SW_SPST_PTS810";

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
      {/* Net-level widths preserve current capacity and audio output margins. */}
      <net name="USB_VBUS" nominalTraceWidth="0.8mm" isPowerNet />
      <net name="V5" nominalTraceWidth="0.8mm" isPowerNet />
      <net name="V3V3" nominalTraceWidth="0.6mm" isPowerNet />
      <net name="GND" nominalTraceWidth="0.5mm" isGroundNet />
      <net name="SPK_POS" nominalTraceWidth="1mm" />
      <net name="SPK_NEG" nominalTraceWidth="1mm" />

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
        pcbRotation={0}
        schX={-14}
        schY={4}
        noConnect={["B8", "B7", "A6", "A7", "B6", "A8"]}
        connections={{
          A4B9: "net.USB_VBUS",
          B4A9: "net.USB_VBUS",
          A5: "net.USB_CC1",
          B5: "net.USB_CC2",
          A1B12: "net.GND",
          B1A12: "net.GND",
          EH1: "net.GND",
          EH2: "net.GND",
          EH3: "net.GND",
          EH4: "net.GND",
        }}
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
        connections={{
          pin1: "net.USB_CC1",
          pin2: "net.GND",
        }}
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
        connections={{
          pin1: "net.USB_CC2",
          pin2: "net.GND",
        }}
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
        connections={{
          pin1: "net.USB_VBUS",
          pin2: "net.V5",
        }}
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
        connections={{
          VIN: "net.V5",
          GND: "net.GND",
          VOUT1: "net.V3V3",
          VOUT2: "net.V3V3",
        }}
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
        connections={{
          pin1: "net.V5",
          pin2: "net.GND",
        }}
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
        connections={{
          pin1: "net.V3V3",
          pin2: "net.GND",
        }}
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
        connections={{
          pin1: "net.V3V3",
          pin2: "net.GND",
        }}
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
        connections={{
          pin1: "net.V3V3",
          pin2: "net.GND",
        }}
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
        connections={{
          "3V3": "net.V3V3",
          GND1: "net.GND",
          GND2: "net.GND",
          GND3: "net.GND",
          GND4: "net.GND",
          EN: "net.ESP_EN",
          IO0: "net.ESP_IO0",
          TXD0: "net.UART_TX",
          RXD0: "net.UART_RX",
          IO32: "net.BTN_PLAY",
          IO33: "net.BTN_VOL_UP",
          IO27: "net.BTN_VOL_DOWN",
          IO19: "net.STATUS_LED_GPIO",
          IO26: "net.I2S_BCLK",
          IO25: "net.I2S_LRCLK",
          IO22: "net.I2S_DIN",
          IO23: "net.AMP_MODE_GPIO",
        }}
      />

      {/* Reset and boot circuitry plus programming header. */}
      <resistor
        name="R3"
        resistance="10k"
        footprint="0603"
        pcbX={-3}
        pcbY={11}
        schX={-1}
        schY={-2}
        connections={{
          pin1: "net.V3V3",
          pin2: "net.ESP_EN",
        }}
      />

      <capacitor
        name="C5"
        capacitance="1uF"
        footprint="0603"
        pcbX={-3}
        pcbY={8}
        schX={-1}
        schY={-3.5}
        connections={{
          pin1: "net.ESP_EN",
          pin2: "net.GND",
        }}
      />

      <pushbutton
        name="SW1"
        displayName="RESET"
        footprint={buttonFootprint}
        pcbX={-1}
        pcbY={16}
        schX={-4}
        schY={-3}
        connections={{
          pin1: "net.ESP_EN",
          pin2: "net.GND",
        }}
      />

      <resistor
        name="R4"
        resistance="10k"
        footprint="0603"
        pcbX={2}
        pcbY={11}
        schX={2}
        schY={-3}
        connections={{
          pin1: "net.V3V3",
          pin2: "net.ESP_IO0",
        }}
      />

      <pushbutton
        name="SW2"
        displayName="BOOT"
        footprint={buttonFootprint}
        pcbX={5}
        pcbY={16}
        schX={5}
        schY={-3}
        connections={{
          pin1: "net.ESP_IO0",
          pin2: "net.GND",
        }}
      />

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
        connections={{
          pin1: "net.V3V3",
          pin2: "net.GND",
          pin3: "net.UART_TX",
          pin4: "net.UART_RX",
          pin5: "net.ESP_EN",
          pin6: "net.ESP_IO0",
        }}
      />

      {/* MAX98357A mono I2S class-D amplifier. */}
      <MAX98357AETE_T
        name="U1"
        displayName="MAX98357A I2S AMP"
        pcbX={16}
        pcbY={5}
        schX={12}
        schY={2}
        pinAttributes={
          {
            pin3: { requiresGround: true },
            pin7: { requiresPower: true },
            pin8: { requiresPower: true },
            pin11: { requiresGround: true },
            pin15: { requiresGround: true },
            pin17: { requiresGround: true },
          } as any
        }
        noConnect={["pin5", "pin6", "pin12", "pin13"]}
        connections={{
          BCLK: "net.I2S_BCLK",
          LRCLK: "net.I2S_LRCLK",
          DIN: "net.I2S_DIN",
          N_SD_MODE: "net.AMP_SD_MODE",
          GAIN: "net.GND",
          VDD: "net.V5",
          VDD2: "net.V5",
          GND: "net.GND",
          GND2: "net.GND",
          GND3: "net.GND",
          EP: "net.GND",
          OUTP: "net.SPK_POS",
          OUTN: "net.SPK_NEG",
        }}
      >
        <courtyardrect width="3.6mm" height="3.6mm" />
      </MAX98357AETE_T>
      <capacitor
        name="C6"
        displayName="AMP BULK"
        capacitance="10uF"
        footprint="0805"
        pcbX={12}
        pcbY={1}
        schX={9}
        schY={6}
        connections={{
          pin1: "net.V5",
          pin2: "net.GND",
        }}
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
        connections={{
          pin1: "net.V5",
          pin2: "net.GND",
        }}
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
        connections={{
          pin1: "net.AMP_MODE_GPIO",
          pin2: "net.AMP_SD_MODE",
        }}
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
        connections={{
          pin1: "net.SPK_POS",
          pin2: "net.SPK_NEG",
        }}
      />

      {/* User controls. Firmware uses active-low buttons. */}
      <resistor
        name="R6"
        resistance="10k"
        footprint="0603"
        pcbX={13}
        pcbY={-10}
        schX={8}
        schY={-4}
        connections={{
          pin1: "net.V3V3",
          pin2: "net.BTN_PLAY",
        }}
      />

      <pushbutton
        name="SW3"
        displayName="PLAY / PAUSE"
        footprint={buttonFootprint}
        pcbX={13}
        pcbY={-17}
        schX={8}
        schY={-6}
        connections={{
          pin1: "net.BTN_PLAY",
          pin2: "net.GND",
        }}
      />

      <resistor
        name="R7"
        resistance="10k"
        footprint="0603"
        pcbX={22}
        pcbY={-10}
        schX={12}
        schY={-4}
        connections={{
          pin1: "net.V3V3",
          pin2: "net.BTN_VOL_UP",
        }}
      />

      <pushbutton
        name="SW4"
        displayName="VOLUME +"
        footprint={buttonFootprint}
        pcbX={22}
        pcbY={-17}
        schX={12}
        schY={-6}
        connections={{
          pin1: "net.BTN_VOL_UP",
          pin2: "net.GND",
        }}
      />

      <resistor
        name="R8"
        resistance="10k"
        footprint="0603"
        pcbX={31}
        pcbY={-10}
        schX={16}
        schY={-4}
        connections={{
          pin1: "net.V3V3",
          pin2: "net.BTN_VOL_DOWN",
        }}
      />

      <pushbutton
        name="SW5"
        displayName="VOLUME -"
        footprint={buttonFootprint}
        pcbX={31}
        pcbY={-17}
        schX={16}
        schY={-6}
        connections={{
          pin1: "net.BTN_VOL_DOWN",
          pin2: "net.GND",
        }}
      />

      {/* Status LED driven by GPIO19. */}
      <resistor
        name="R9"
        resistance="1k"
        footprint="0603"
        pcbX={5}
        pcbY={13}
        schX={8}
        schY={-1}
        connections={{
          pin1: "net.STATUS_LED_GPIO",
          pin2: "net.STATUS_LED_ANODE",
        }}
      />

      <XL_1608UBC_04
        name="D1"
        displayName="STATUS"
        color="blue"
        pcbX={9.5}
        pcbY={13}
        schX={11}
        schY={-1}
        connections={{
          anode: "net.STATUS_LED_ANODE",
          cathode: "net.GND",
        }}
      />

      {/* Assembly and enclosure legends. */}
      <silkscreentext
        text="ESP32 BLUETOOTH SPEAKER"
        pcbX={9}
        pcbY={21}
        fontSize="1.2mm"
      />
      <silkscreentext text="USB-C 5V" pcbX={0} pcbY={-19} fontSize="0.9mm" />
      <silkscreentext text="PLAY" pcbX={13} pcbY={-21} fontSize="0.8mm" />
      <silkscreentext text="VOL+" pcbX={22} pcbY={-21} fontSize="0.8mm" />
      <silkscreentext text="VOL-" pcbX={31} pcbY={-21} fontSize="0.8mm" />
      <silkscreentext text="4-8 OHM" pcbX={29} pcbY={11} fontSize="0.8mm" />
      <silkscreentext
        text="ANTENNA - NO COPPER"
        pcbX={-31.5}
        pcbY={7}
        pcbRotation={90}
        fontSize="0.7mm"
      />
    </board>
  );
}
