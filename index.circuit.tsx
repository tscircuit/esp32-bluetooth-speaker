import { MAX98357AETE_T } from "@tsci/Abse2001.MAX98357AETE_T";
import { A_2N7002 } from "./imports/A_2N7002";
import { AMS1117_3_3 } from "./imports/AMS1117_3_3";
import { CH340C } from "./imports/CH340C";
import { ESP32_WROOM_32E_N8 } from "./imports/ESP32_WROOM_32E_N8";
import { PJ_320D } from "./imports/PJ_320D";
import { S2B_PH_K_S_LF__SN_ } from "./imports/S2B_PH_K_S_LF__SN_";
import { SS34 } from "./imports/SS34";
import { TPS630701RNMR } from "./imports/TPS630701RNMR";
import { TYPE_C_31_M_12 } from "./imports/TYPE_C_31_M_12";
import { XFL4020_152MEC } from "./imports/XFL4020_152MEC";
import { XL_1608UBC_04 } from "./imports/XL_1608UBC_04";

const buttonFootprint = "kicad:Button_Switch_SMD/SW_SPST_PTS810";

export default function BluetoothSpeaker() {
  return (
    <board
      title="ESP32 Bluetooth Speaker"
      width="62mm"
      height="44mm"
      layers={2}
      solderMaskColor="blue"
      defaultTraceWidth="0.25mm"
      minBoardEdgeClearance="0.25mm"
    >
      {/* Net-level widths preserve current capacity and audio output margins. */}
      <net name="USB_VBUS" nominalTraceWidth="0.8mm" isPowerNet />
      <net name="USB_5V_FUSED" nominalTraceWidth="0.8mm" isPowerNet />
      <net name="BAT_RAW" nominalTraceWidth="1mm" isPowerNet />
      <net name="BAT_FUSED" nominalTraceWidth="1mm" isPowerNet />
      <net name="BAT_PROTECTED" nominalTraceWidth="1mm" isPowerNet />
      <net name="BAT_5V" nominalTraceWidth="1mm" isPowerNet />
      <net name="V5" nominalTraceWidth="0.8mm" isPowerNet />
      <net name="V3V3" nominalTraceWidth="0.6mm" isPowerNet />
      <net name="GND" nominalTraceWidth="0.5mm" isGroundNet />
      <net name="SPK_POS" nominalTraceWidth="1mm" />
      <net name="SPK_NEG" nominalTraceWidth="1mm" />

      {/* Keep every copper layer clear below the ESP32 PCB antenna. */}
      <keepout
        shape="rect"
        pcbX={-27.5}
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
      <hole diameter="3.2mm" pcbX={-28} pcbY={-19.5} />
      <hole diameter="3.2mm" pcbX={28} pcbY={-19.5} />
      <hole diameter="3.2mm" pcbX={-28} pcbY={19.5} />
      <hole diameter="3.2mm" pcbX={28} pcbY={19.5} />

      {/* USB-C 5 V sink plus USB 2.0 data for the CH340C bridge. */}
      <TYPE_C_31_M_12
        name="J1"
        displayName="USB-C 5V POWER"
        pcbX={0}
        pcbY={-17.3}
        pcbRotation={0}
        schX={-14}
        schY={4}
        noConnect={["B8", "A8"]}
        connections={{
          A4B9: "net.USB_VBUS",
          B4A9: "net.USB_VBUS",
          A5: "net.USB_CC1",
          B5: "net.USB_CC2",
          A6: "net.USB_DP_CONN",
          B6: "net.USB_DP_CONN",
          A7: "net.USB_DM_CONN",
          B7: "net.USB_DM_CONN",
          A1B12: "net.GND",
          B1A12: "net.GND",
          EH1: "net.GND",
          EH2: "net.GND",
          EH3: "net.GND",
          EH4: "net.GND",
        }}
      />

      {/* USB full-speed data to 3.3 V UART. Manual BOOT/RESET buttons enter download mode. */}
      <resistor
        name="R10"
        displayName="USB D+ SERIES"
        resistance="22"
        footprint="0603"
        layer="bottom"
        pcbX={0}
        pcbY={-7.5}
        schX={-11}
        schY={0}
        connections={{
          pin1: "net.USB_DP_CONN",
          pin2: "net.USB_DP",
        }}
      />

      <resistor
        name="R11"
        displayName="USB D- SERIES"
        resistance="22"
        footprint="0603"
        layer="top"
        pcbX={0}
        pcbY={-12}
        schX={-11}
        schY={-1.5}
        connections={{
          pin1: "net.USB_DM_CONN",
          pin2: "net.USB_DM",
        }}
      />

      <CH340C
        name="U4"
        displayName="USB-UART BRIDGE"
        layer="bottom"
        pcbX={7}
        pcbY={-6}
        pcbRotation={0}
        schX={-7}
        schY={-2}
        connections={{
          GND: "net.GND",
          TXD: "net.UART_RX",
          RXD: "net.UART_TX",
          V3: "net.V3V3",
          D_POS: "net.USB_DP",
          D_NEG: "net.USB_DM",
          XI: "net.USB_UART_XI_NC",
          XO: "net.USB_UART_XO_NC",
          CTS: "net.USB_UART_CTS_NC",
          DSR: "net.USB_UART_DSR_NC",
          RI: "net.USB_UART_RI_NC",
          DCD: "net.USB_UART_DCD_NC",
          DTR: "net.USB_UART_DTR_NC",
          RTS: "net.USB_UART_RTS_NC",
          R232: "net.USB_UART_R232_NC",
          VCC: "net.V3V3",
        }}
      />

      <capacitor
        name="C8"
        displayName="USB-UART BYPASS"
        capacitance="100nF"
        footprint="0603"
        layer="bottom"
        pcbX={14}
        pcbY={-4.5}
        schX={-4}
        schY={-5}
        connections={{
          pin1: "net.V3V3",
          pin2: "net.GND",
        }}
      />

      <resistor
        name="R1"
        displayName="USB CC1 Rd"
        resistance="5.1k"
        footprint="0603"
        pcbX={-6}
        pcbY={-13}
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
        pcbX={5}
        pcbY={-10.5}
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
        pcbY={-10}
        schX={-9}
        schY={7}
        connections={{
          pin1: "net.USB_VBUS",
          pin2: "net.USB_5V_FUSED",
        }}
      />

      {/* Schottky isolation prevents the battery rail from back-feeding USB VBUS. */}
      <SS34
        name="D2"
        displayName="USB POWER OR"
        pcbX={1.5}
        pcbY={-5.5}
        schX={-5}
        schY={11}
        connections={{
          anode: "net.USB_5V_FUSED",
          cathode: "net.V5",
        }}
      />

      {/* External 4xAA pack. This board intentionally does not charge AA cells. */}
      <S2B_PH_K_S_LF__SN_
        name="J5"
        displayName="4xAA BATTERY JST-PH"
        pcbX={-22}
        pcbY={-15.3}
        pcbRotation={180}
        schX={-17}
        schY={-12}
        connections={{
          BAT_POS: "net.BAT_RAW",
          BAT_NEG: "net.GND",
        }}
      />

      <fuse
        name="F2"
        displayName="2A BATTERY PTC"
        currentRating="2A"
        voltageRating="16V"
        footprint="1812"
        layer="bottom"
        pcbX={-25}
        pcbY={-11}
        pcbRotation={90}
        schX={-14}
        schY={-12}
        connections={{
          pin1: "net.BAT_RAW",
          pin2: "net.BAT_FUSED",
        }}
      />

      <SS34
        name="D3"
        displayName="BATTERY REVERSE PROTECTION"
        layer="bottom"
        pcbX={-22}
        pcbY={-2}
        pcbRotation={90}
        schX={-11}
        schY={-12}
        connections={{
          anode: "net.BAT_FUSED",
          cathode: "net.BAT_PROTECTED",
        }}
      />

      {/* Fixed 5 V buck-boost follows TI's minimum-component application. */}
      <TPS630701RNMR
        name="U5"
        displayName="4xAA 5V BUCK-BOOST"
        layer="bottom"
        pcbX={-15}
        pcbY={-10}
        schX={-7}
        schY={-12}
        connections={{
          PS_SYNC: "net.BAT_PROTECTED",
          PG: "net.BAT_PG_NC",
          VAUX: "net.BAT_VAUX",
          GND: "net.GND",
          FB: "net.BAT_5V",
          FB2: "net.BAT_FB2_NC",
          VOUT1: "net.BAT_5V",
          VOUT2: "net.BAT_5V",
          L2: "net.BAT_SW2",
          PGND: "net.GND",
          L1: "net.BAT_SW1",
          VIN1: "net.BAT_PROTECTED",
          VIN2: "net.BAT_PROTECTED",
          EN: "net.BAT_ENABLE",
          VSEL: "net.GND",
        }}
      />

      <XFL4020_152MEC
        name="L1"
        displayName="BUCK-BOOST 1.5UH"
        layer="bottom"
        pcbX={-15}
        pcbY={-5}
        schX={-7}
        schY={-9}
        connections={{
          pin1: "net.BAT_SW1",
          pin2: "net.BAT_SW2",
        }}
      />

      <capacitor
        name="C9"
        displayName="BAT INPUT BULK 1"
        capacitance="10uF"
        footprint="0805"
        layer="bottom"
        pcbX={-20}
        pcbY={-13}
        schX={-10}
        schY={-15}
        connections={{ pin1: "net.BAT_PROTECTED", pin2: "net.GND" }}
      />
      <capacitor
        name="C10"
        displayName="BAT INPUT BULK 2"
        capacitance="10uF"
        footprint="0805"
        layer="bottom"
        pcbX={-20}
        pcbY={-10}
        schX={-8}
        schY={-15}
        connections={{ pin1: "net.BAT_PROTECTED", pin2: "net.GND" }}
      />
      <capacitor
        name="C11"
        displayName="BAT INPUT LOCAL"
        capacitance="10uF"
        footprint="0603"
        layer="bottom"
        pcbX={-20}
        pcbY={-7}
        schX={-6}
        schY={-15}
        connections={{ pin1: "net.BAT_PROTECTED", pin2: "net.GND" }}
      />

      <capacitor
        name="C12"
        displayName="BAT OUTPUT BULK 1"
        capacitance="22uF"
        footprint="0805"
        layer="bottom"
        pcbX={-10}
        pcbY={-13}
        schX={-4}
        schY={-15}
        connections={{ pin1: "net.BAT_5V", pin2: "net.GND" }}
      />
      <capacitor
        name="C13"
        displayName="BAT OUTPUT BULK 2"
        capacitance="22uF"
        footprint="0805"
        layer="bottom"
        pcbX={-10}
        pcbY={-10}
        schX={-2}
        schY={-15}
        connections={{ pin1: "net.BAT_5V", pin2: "net.GND" }}
      />
      <capacitor
        name="C14"
        displayName="BAT OUTPUT BULK 3"
        capacitance="22uF"
        footprint="0805"
        layer="bottom"
        pcbX={-10}
        pcbY={-7}
        schX={0}
        schY={-15}
        connections={{ pin1: "net.BAT_5V", pin2: "net.GND" }}
      />
      <capacitor
        name="C15"
        displayName="BAT OUTPUT LOCAL"
        capacitance="10uF"
        footprint="0603"
        layer="bottom"
        pcbX={-10}
        pcbY={-4}
        schX={2}
        schY={-15}
        connections={{ pin1: "net.BAT_5V", pin2: "net.GND" }}
      />
      <capacitor
        name="C16"
        displayName="BUCK-BOOST VAUX"
        capacitance="100nF"
        footprint="0603"
        layer="bottom"
        pcbX={-15}
        pcbY={-14.5}
        schX={-4}
        schY={-10}
        connections={{ pin1: "net.BAT_VAUX", pin2: "net.GND" }}
      />

      {/* USB VBUS turns Q1 on and disables U5, giving USB deterministic priority. */}
      <resistor
        name="R12"
        displayName="BAT ENABLE PULLUP"
        resistance="100k"
        footprint="0603"
        layer="bottom"
        pcbX={-6}
        pcbY={-8}
        schX={-8}
        schY={-17}
        connections={{ pin1: "net.BAT_PROTECTED", pin2: "net.BAT_ENABLE" }}
      />
      <resistor
        name="R13"
        displayName="USB PRIORITY GATE"
        resistance="100k"
        footprint="0603"
        layer="bottom"
        pcbX={-2.5}
        pcbY={-10}
        schX={-5}
        schY={-17}
        connections={{ pin1: "net.USB_VBUS", pin2: "net.USB_PRESENT_GATE" }}
      />
      <resistor
        name="R14"
        displayName="USB GATE PULLDOWN"
        resistance="1M"
        footprint="0603"
        layer="bottom"
        pcbX={-9}
        pcbY={-16.5}
        schX={-2}
        schY={-17}
        connections={{ pin1: "net.USB_PRESENT_GATE", pin2: "net.GND" }}
      />

      <A_2N7002
        name="Q1"
        displayName="USB PRIORITY DISABLE"
        layer="bottom"
        pcbX={-6}
        pcbY={-11}
        schX={-5}
        schY={-19}
        connections={{
          pin1: "net.USB_PRESENT_GATE",
          pin2: "net.GND",
          pin3: "net.BAT_ENABLE",
        }}
      />

      <SS34
        name="D4"
        displayName="BATTERY POWER OR"
        layer="bottom"
        pcbX={-6}
        pcbY={-3}
        pcbRotation={90}
        schX={-2}
        schY={-12}
        connections={{
          anode: "net.BAT_5V",
          cathode: "net.V5",
        }}
      />

      {/* 5 V to 3.3 V regulator for the ESP32. */}
      <AMS1117_3_3
        name="U2"
        displayName="3.3V REGULATOR"
        pcbX={-12}
        pcbY={-11}
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
        pcbY={-9}
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
        pcbX={-19}
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
        pcbX={-19}
        pcbY={-6}
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
        pcbX={-5}
        pcbY={-6}
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
        pcbX={-14}
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

      {/* Reset and boot circuitry for manual USB download-mode entry. */}
      <resistor
        name="R3"
        resistance="10k"
        footprint="0603"
        pcbX={-1}
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
        pcbX={-1}
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
        pcbX={0}
        pcbY={17.5}
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
        pcbX={4}
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
        pcbX={6}
        pcbY={17.5}
        schX={5}
        schY={-3}
        connections={{
          pin1: "net.ESP_IO0",
          pin2: "net.GND",
        }}
      />

      {/* MAX98357A mono I2S class-D amplifier. */}
      <MAX98357AETE_T
        name="U1"
        displayName="MAX98357A I2S AMP"
        pcbX={10}
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
        pcbX={5}
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
        pcbX={12}
        pcbY={0.5}
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
        pcbX={4}
        pcbY={7.5}
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
        pcbX={28}
        pcbY={-4}
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

      {/* Alternate bridge-tied output for a 3.5 mm TS speaker plug. */}
      <PJ_320D
        name="J4"
        displayName="3.5MM PASSIVE SPEAKER"
        pcbX={21.7}
        pcbY={8}
        pcbRotation={180}
        schX={18}
        schY={5}
        connections={{
          TIP: "net.SPK_POS",
          SLEEVE: "net.SPK_NEG",
          RING1: "net.JACK_RING1_NC",
          RING2: "net.JACK_RING2_NC",
        }}
      />

      {/* User controls. Firmware uses active-low buttons. */}
      <resistor
        name="R6"
        resistance="10k"
        footprint="0603"
        pcbX={8.5}
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
        pcbX={8.5}
        pcbY={-15.5}
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
        pcbX={16.5}
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
        pcbX={16.5}
        pcbY={-15.5}
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
        pcbX={22}
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
        pcbX={24.5}
        pcbY={-15.5}
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
        pcbX={7}
        pcbY={14.5}
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
        pcbX={11}
        pcbY={14.5}
        schX={11}
        schY={-1}
        connections={{
          anode: "net.STATUS_LED_ANODE",
          cathode: "net.GND",
        }}
      />

      {/* Assembly and enclosure legends. */}
      <silkscreentext
        text="ESP32 BT SPEAKER"
        pcbX={17}
        pcbY={20.5}
        fontSize="1mm"
      />
      <silkscreentext
        text="USB-C / UART"
        pcbX={0}
        pcbY={-20.5}
        fontSize="0.8mm"
      />
      <silkscreentext text="4xAA" pcbX={-20} pcbY={-19.8} fontSize="0.8mm" />
      <silkscreentext text="PLAY" pcbX={8.5} pcbY={-19} fontSize="0.7mm" />
      <silkscreentext text="VOL+" pcbX={16.5} pcbY={-19} fontSize="0.7mm" />
      <silkscreentext text="VOL-" pcbX={24.5} pcbY={-19} fontSize="0.7mm" />
      <silkscreentext
        text="BTL SPK ONLY"
        pcbX={21}
        pcbY={15}
        fontSize="0.7mm"
      />
      <silkscreentext
        text="ANTENNA - NO COPPER"
        pcbX={-27.5}
        pcbY={7}
        pcbRotation={90}
        fontSize="0.7mm"
      />
    </board>
  );
}
