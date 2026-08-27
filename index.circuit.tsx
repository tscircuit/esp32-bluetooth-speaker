import { MAX98357AETE_T } from "@tsci/Abse2001.MAX98357AETE_T";
import type { PushButtonProps, TestpointProps } from "@tscircuit/props";
import { Fragment } from "react";
import { AMS1117_3_3 } from "./imports/AMS1117_3_3";
import { CH340C } from "./imports/CH340C";
import { ESP32_WROOM_32E_N8 } from "./imports/ESP32_WROOM_32E_N8";
import { MicroXNJ } from "./imports/MicroXNJ";
import { PJ_320D } from "./imports/PJ_320D";
import { S2B_PH_K_S_LF__SN_ } from "./imports/S2B_PH_K_S_LF__SN_";
import { SS34 } from "./imports/SS34";
import { TPS630701RNMR } from "./imports/TPS630701RNMR";
import { XFL4020_152MEC } from "./imports/XFL4020_152MEC";
import { XL_1608UBC_04 } from "./imports/XL_1608UBC_04";

const buttonSilkscreenLabels: Record<string, string> = {
  SW_RESET: "RESET",
  SW_BOOT: "BOOT",
  SW_PLAY: "PLAY",
  SW_VOL_UP: "VOL+",
  SW_VOL_DN: "VOL-",
};

/**
 * Keep the PTS810 footprint synchronous. The async KiCad footprint now maps
 * repeated pads correctly, but it causes source-trace diagnostics to run before
 * the rest of this board's connection traces have settled.
 */
const Pts810Button = (props: PushButtonProps) => (
  <pushbutton
    {...props}
    pinLabels={{
      pin1: ["pin1", "1"],
      pin2: ["pin2", "2"],
      pin3: ["pin1_alt", "1_alt"],
      pin4: ["pin2_alt", "2_alt"],
    }}
    internallyConnectedPins={[
      ["pin1", "pin1_alt"],
      ["pin2", "pin2_alt"],
    ]}
    footprint={
      <footprint>
        <smtpad
          portHints={["pin1"]}
          pcbX="-2.075mm"
          pcbY="1.075mm"
          width="1.05mm"
          height="0.65mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin1_alt"]}
          pcbX="2.075mm"
          pcbY="1.075mm"
          width="1.05mm"
          height="0.65mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin2"]}
          pcbX="-2.075mm"
          pcbY="-1.075mm"
          width="1.05mm"
          height="0.65mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin2_alt"]}
          pcbX="2.075mm"
          pcbY="-1.075mm"
          width="1.05mm"
          height="0.65mm"
          shape="rect"
        />
        <silkscreenpath
          route={[
            { x: -2.2, y: 1.7 },
            { x: 2.2, y: 1.7 },
          ]}
        />
        <silkscreenpath
          route={[
            { x: -2.2, y: -1.7 },
            { x: 2.2, y: -1.7 },
          ]}
        />
        <silkscreenpath
          route={[
            { x: -2.2, y: 0.57 },
            { x: -2.2, y: -0.57 },
          ]}
        />
        <silkscreenpath
          route={[
            { x: 2.2, y: 0.57 },
            { x: 2.2, y: -0.57 },
          ]}
        />
        <silkscreentext
          text={
            buttonSilkscreenLabels[String(props.name)] ?? String(props.name)
          }
          pcbY="2.45mm"
          anchorAlignment="center"
          fontSize="0.7mm"
        />
        <courtyardrect width="5.7mm" height="3.7mm" />
      </footprint>
    }
    cadModel={{
      stepUrl:
        "https://kicad-mod-cache.tscircuit.com/Button_Switch_SMD/SW_SPST_PTS810.step",
      wrlUrl:
        "https://kicad-mod-cache.tscircuit.com/Button_Switch_SMD/SW_SPST_PTS810.wrl",
    }}
  />
);

const GroundTestpoint = (props: TestpointProps) => (
  <testpoint
    {...props}
    footprint={
      <footprint>
        <smtpad
          portHints={["pin1"]}
          pcbX={0}
          pcbY={0}
          shape="circle"
          radius="0.5mm"
        />
        <courtyardcircle radius="0.7mm" />
      </footprint>
    }
  />
);

const sch = {
  usbInput: { schSheetName: "usb_power", schSectionName: "usb_input" },
  usbSerial: { schSheetName: "usb_power", schSectionName: "usb_serial" },
  systemRegulator: {
    schSheetName: "usb_power",
    schSectionName: "system_regulator",
  },
  batteryProtection: {
    schSheetName: "battery_power",
    schSectionName: "battery_protection",
  },
  batteryConverter: {
    schSheetName: "battery_power",
    schSectionName: "battery_converter",
  },
  powerPriority: {
    schSheetName: "battery_power",
    schSectionName: "power_priority",
  },
  esp32Core: { schSheetName: "main_audio", schSectionName: "esp32_core" },
  audioOutput: {
    schSheetName: "main_audio",
    schSectionName: "audio_output",
  },
  userControls: {
    schSheetName: "main_audio",
    schSectionName: "user_controls",
  },
} as const;

// Each ground pin gets a short fanout directly into the top-layer pour. Keeping
// these as source-only traces avoids a single 47-terminal autorouter problem.
const groundPorts = [
  ".J1 > .GND",
  ".J1 > .SH1",
  ".J1 > .SH2",
  ".J1 > .SH3",
  ".J1 > .SH4",
  ".U4 > .GND",
  ".C8 > .pin2",
  ".J5 > .BAT_NEG",
  ".U5 > .GND",
  ".U5 > .PGND",
  ".U5 > .VSEL",
  ".C9 > .pin2",
  ".C10 > .pin2",
  ".C11 > .pin2",
  ".C12 > .pin2",
  ".C13 > .pin2",
  ".C14 > .pin2",
  ".C15 > .pin2",
  ".C16 > .pin2",
  ".U2 > .GND",
  ".C1 > .pin2",
  ".C2 > .pin2",
  ".C3 > .pin2",
  ".C4 > .pin2",
  ".U3 > .GND1",
  ".U3 > .GND2",
  ".U3 > .GND3",
  ".U3 > .GND4",
  ".C5 > .pin2",
  ".SW_RESET > .pin2",
  ".SW_BOOT > .pin2",
  ".U1 > .GAIN",
  ".U1 > .GND",
  ".U1 > .GND2",
  ".U1 > .GND3",
  ".U1 > .EP",
  ".C6 > .pin2",
  ".C7 > .pin2",
  ".SW_PLAY > .pin2",
  ".SW_VOL_UP > .pin2",
  ".SW_VOL_DN > .pin2",
  ".D1 > .cathode",
] as const;

const groundStubs = [
  [".J1 > .GND", ".J1 > .SH1"],
  [".J1 > .SH2", ".J1 > .SH1"],
  [".J1 > .SH4", ".J1 > .SH3"],
  [".J1 > .SH3", ".TP1 > .pin1"],
  [".U4 > .GND", ".TP2 > .pin1"],
  [".J5 > .BAT_NEG", ".TP3 > .pin1"],
  [".U5 > .PGND", ".TP4 > .pin1"],
  [".C11 > .pin2", ".C9 > .pin2"],
  [".C13 > .pin2", ".C12 > .pin2"],
  [".C14 > .pin2", ".C13 > .pin2"],
  [".C15 > .pin2", ".C14 > .pin2"],
  [".C16 > .pin2", ".U5 > .GND"],
  [".C1 > .pin2", ".TP5 > .pin1"],
  [".U2 > .GND", ".TP19 > .pin1"],
  [".C2 > .pin2", ".TP20 > .pin1"],
  [".C4 > .pin2", ".C3 > .pin2"],
  [".C5 > .pin2", ".SW_RESET > .pin2"],
  [".SW_RESET > .pin2", ".TP24 > .pin1"],
  [".D1 > .cathode", ".TP6 > .pin1"],
  [".SW_PLAY > .pin2", ".TP7 > .pin1"],
  [".SW_VOL_UP > .pin2", ".TP8 > .pin1"],
  [".SW_VOL_DN > .pin2", ".TP11 > .pin1"],
  [".U3 > .GND4", ".U3 > .GND2"],
  [".U3 > .GND3", ".TP16 > .pin1"],
  [".U1 > .GND2", ".U1 > .EP"],
  [".U1 > .GND", ".U1 > .EP"],
  [".U1 > .GND3", ".U1 > .EP"],
  [".U1 > .GAIN", ".U1 > .GND"],
  [".C6 > .pin2", ".C7 > .pin2"],
  [".C7 > .pin2", ".TP23 > .pin1"],
] as const;

const createNoopAutorouter = async (input: unknown) => {
  const completeListeners: Array<(event: unknown) => void> = [];

  return {
    input,
    isRouting: false,
    start() {
      queueMicrotask(() => {
        for (const listener of completeListeners) {
          listener({ type: "complete", traces: [] });
        }
      });
    },
    stop() {},
    on(event: string, listener: (event: unknown) => void) {
      if (event === "complete") completeListeners.push(listener);
    },
    solveSync() {
      return [];
    },
  };
};

export default function BluetoothSpeaker() {
  return (
    <board
      title="ESP32 Bluetooth Speaker"
      width="68mm"
      height="48mm"
      layers={1}
      autorouter={{
        preset: "auto_jumper",
        availableJumperTypes: ["1206x4"],
      }}
      autorouterEffortLevel="10x"
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
      <net
        name="GND"
        nominalTraceWidth="0.5mm"
        isGroundNet
        routingPhaseIndex={-1}
      />
      {/* Route short local nets before board-spanning signals and power trees. */}

      {/* The top pour is the physical GND interconnect; this phase intentionally
          leaves its source-only fanout traces to the pour renderer. */}
      <autoroutingphase
        name="ground-pour"
        phaseIndex={-1}
        autorouter={{
          local: true,
          groupMode: "subcircuit",
          algorithmFn: createNoopAutorouter as any,
        }}
      />

      <schematicsheet
        name="usb_power"
        displayName="USB & SYSTEM POWER"
        sheetIndex={1}
      >
        <schematicsection name="usb_input" displayName="MICRO-USB INPUT" />
        <schematicsection name="usb_serial" displayName="USB-UART" />
        <schematicsection name="system_regulator" displayName="3.3 V RAIL" />
      </schematicsheet>

      <schematicsheet
        name="battery_power"
        displayName="4×AA BATTERY POWER"
        sheetIndex={2}
      >
        <schematicsection name="battery_protection" displayName="AA INPUT" />
        <schematicsection
          name="battery_converter"
          displayName="5 V CONVERTER"
        />
        <schematicsection name="power_priority" displayName="POWER OR" />
      </schematicsheet>

      <schematicsheet
        name="main_audio"
        displayName="CONTROLLER, AUDIO & USER INTERFACE"
        sheetIndex={3}
      >
        <schematicsection name="esp32_core" displayName="ESP32 CORE" />
        <schematicsection name="audio_output" displayName="AUDIO OUTPUT" />
        <schematicsection
          name="user_controls"
          displayName="CONTROLS & STATUS"
        />
      </schematicsheet>

      {/* Keep top copper clear below the ESP32 PCB antenna. */}
      <keepout
        shape="rect"
        pcbX={-30.5}
        pcbY={10}
        width="7mm"
        height="22mm"
        layers={["top"]}
      />

      {/* A same-side ground pour provides the return path on this one-layer board. */}
      <copperpour
        name="GND_PLANE_TOP"
        layer="top"
        connectsTo="net.GND"
        padMargin="0.2mm"
        traceMargin="0.2mm"
        boardEdgeMargin="0.25mm"
        useThermalReliefs
      />

      {/* Mounting holes for an enclosure or speaker baffle. */}
      <hole diameter="3.2mm" pcbX={-31.5} pcbY={-21.5} />
      <hole diameter="3.2mm" pcbX={31} pcbY={-21} />
      <hole diameter="3.2mm" pcbX={-31.5} pcbY={22} />
      <hole diameter="3.2mm" pcbX={31} pcbY={21} />

      {/* A five-pin Micro-B receptacle keeps USB 2.0 data routable on one
          copper layer without losing cable-orientation support. */}
      <MicroXNJ
        {...sch.usbInput}
        name="J1"
        displayName="MICRO-USB POWER / DATA"
        pcbX={3}
        pcbY={-21}
        pcbRotation={270}
        schX={-9}
        schY={2}
        schHeight={1}
        noConnect={["ID"]}
        internallyConnectedPins={[["SH1", "SH2", "SH3", "SH4"]]}
        connections={{
          VBUS: "net.USB_VBUS",
        }}
      />

      {/* USB full-speed data to 3.3 V UART. Manual BOOT/RESET buttons enter download mode. */}
      <resistor
        {...sch.usbSerial}
        name="R10"
        displayName="USB D+ SERIES"
        resistance="22"
        footprint="0603"
        layer="top"
        pcbX={14.8}
        pcbY={-11}
        pcbRotation={0}
        schX={-5}
        schY={-3}
        connections={{}}
      />

      <resistor
        {...sch.usbSerial}
        name="R11"
        displayName="USB D- SERIES"
        resistance="22"
        footprint="0603"
        layer="top"
        pcbX={9.8}
        pcbY={-15.2}
        pcbRotation={270}
        schX={-5}
        schY={-4.5}
        connections={{}}
      />

      <CH340C
        {...sch.usbSerial}
        name="U4"
        displayName="USB-UART BRIDGE"
        layer="top"
        pcbX={3.4}
        pcbY={-14}
        pcbRotation={0}
        schX={-1.5}
        schY={-3.5}
        connections={{}}
      />

      <trace
        name="USB_DP_CONNECTOR_TO_SERIES"
        from=".J1 > .D_POS"
        to=".R10 > .pin1"
        schDisplayLabel="USB_D+"
      />
      <trace
        name="USB_DP_SERIES_TO_UART"
        from=".R10 > .pin2"
        to=".U4 > .D_POS"
        schDisplayLabel="USB_D+"
      />
      <trace
        name="USB_DM_CONNECTOR_TO_SERIES"
        from=".J1 > .D_NEG"
        to=".R11 > .pin1"
        schDisplayLabel="USB_D-"
      />
      <trace
        name="USB_DM_SERIES_TO_UART"
        from=".R11 > .pin2"
        to=".U4 > .D_NEG"
        schDisplayLabel="USB_D-"
      />

      <capacitor
        {...sch.usbSerial}
        name="C8"
        displayName="USB-UART BYPASS"
        capacitance="100nF"
        maxDecouplingTraceLength="20mm"
        footprint="0603"
        layer="top"
        pcbX={9.6}
        pcbY={-11.5}
        pcbRotation={270}
        schX={2.5}
        schY={-4.5}
        schOrientation="vertical"
        connections={{}}
      />

      <fuse
        {...sch.usbInput}
        name="F1"
        displayName="1.1A RESETTABLE FUSE"
        currentRating="1.1A"
        voltageRating="6V"
        footprint="1206"
        pcbX={-3}
        pcbY={-18.5}
        pcbRotation={270}
        schX={-6.14}
        schY={5}
        connections={{
          pin1: "net.USB_VBUS",
          pin2: "net.USB_5V_FUSED",
        }}
      />

      {/* Schottky isolation prevents the battery rail from back-feeding USB VBUS. */}
      <SS34
        {...sch.usbInput}
        name="D2"
        displayName="USB POWER OR"
        pcbX={-5.8}
        pcbY={-18.5}
        pcbRotation={90}
        schX={-2.86}
        schY={5}
        connections={{ anode: "net.USB_5V_FUSED" }}
      />

      {/* External 4xAA pack. This board intentionally does not charge AA cells. */}
      <S2B_PH_K_S_LF__SN_
        {...sch.batteryProtection}
        name="J5"
        displayName="4xAA BATTERY JST-PH"
        pcbX={-22}
        pcbY={-22.7}
        pcbRotation={180}
        schX={-15.75}
        schY={4}
        connections={{
          BAT_POS: "net.BAT_RAW",
        }}
      />

      <fuse
        {...sch.batteryProtection}
        name="F2"
        displayName="2A BATTERY PTC"
        currentRating="2A"
        voltageRating="16V"
        footprint="1812"
        layer="top"
        pcbX={-26}
        pcbY={-17.5}
        pcbRotation={90}
        schX={-12}
        schY={4}
        connections={{
          pin1: "net.BAT_RAW",
          pin2: "net.BAT_FUSED",
        }}
      />

      <SS34
        {...sch.batteryProtection}
        name="D3"
        displayName="BATTERY REVERSE PROTECTION"
        layer="top"
        pcbX={-22}
        pcbY={-17}
        pcbRotation={90}
        schX={-7.75}
        schY={4}
        connections={{
          anode: "net.BAT_FUSED",
          cathode: "net.BAT_PROTECTED",
        }}
      />

      {/* Fixed 5 V buck-boost follows TI's minimum-component application. */}
      <TPS630701RNMR
        {...sch.batteryConverter}
        name="U5"
        displayName="4xAA 5V BUCK-BOOST"
        layer="top"
        pcbX={-17.5}
        pcbY={-16.5}
        pcbRotation={0}
        schX={0}
        schY={3.48}
        schHeight={1.6}
        connections={{
          VAUX: "net.BAT_VAUX",
          FB: "net.BAT_5V",
          VOUT1: "net.BAT_5V",
          VOUT2: "net.BAT_5V",
          L2: "net.BAT_SW2",
          L1: "net.BAT_SW1",
          VIN1: "net.BAT_PROTECTED",
        }}
      />

      <XFL4020_152MEC
        {...sch.batteryConverter}
        name="L1"
        displayName="BUCK-BOOST 1.5UH"
        layer="top"
        pcbX={-24}
        pcbY={-9.5}
        pcbRotation={0}
        schX={0}
        schY={6}
        connections={{
          pin1: "net.BAT_SW1",
          pin2: "net.BAT_SW2",
        }}
      />

      <capacitor
        {...sch.batteryConverter}
        name="C9"
        displayName="BAT INPUT BULK 1"
        capacitance="10uF"
        footprint="0805"
        layer="top"
        pcbX={-29}
        pcbY={-13}
        pcbRotation={0}
        schX={-4.5}
        schY={0}
        schOrientation="vertical"
        connections={{ pin1: "net.BAT_PROTECTED" }}
      />
      <capacitor
        {...sch.batteryConverter}
        name="C10"
        displayName="BAT INPUT BULK 2"
        capacitance="10uF"
        footprint="0805"
        layer="top"
        pcbX={-25.4}
        pcbY={-12.8}
        pcbRotation={0}
        schX={-2}
        schY={0}
        schOrientation="vertical"
        connections={{ pin1: "net.BAT_PROTECTED" }}
      />
      <capacitor
        {...sch.batteryConverter}
        name="C11"
        displayName="BAT INPUT LOCAL"
        capacitance="10uF"
        footprint="0603"
        layer="top"
        pcbX={-29}
        pcbY={-10}
        pcbRotation={0}
        schX={0.5}
        schY={0}
        schOrientation="vertical"
        connections={{ pin1: "net.BAT_PROTECTED" }}
      />

      <capacitor
        {...sch.batteryConverter}
        name="C12"
        displayName="BAT OUTPUT BULK 1"
        capacitance="22uF"
        footprint="0805"
        layer="top"
        pcbX={-12.5}
        pcbY={-19.5}
        pcbRotation={0}
        schX={3.25}
        schY={0}
        schOrientation="vertical"
        connections={{ pin1: "net.BAT_5V" }}
      />
      <capacitor
        {...sch.batteryConverter}
        name="C13"
        displayName="BAT OUTPUT BULK 2"
        capacitance="22uF"
        footprint="0805"
        layer="top"
        pcbX={-12.5}
        pcbY={-16.5}
        pcbRotation={0}
        schX={6}
        schY={0}
        schOrientation="vertical"
        connections={{ pin1: "net.BAT_5V" }}
      />
      <capacitor
        {...sch.batteryConverter}
        name="C14"
        displayName="BAT OUTPUT BULK 3"
        capacitance="22uF"
        footprint="0805"
        layer="top"
        pcbX={-12.5}
        pcbY={-13.5}
        pcbRotation={0}
        schX={9.5}
        schY={0}
        schOrientation="vertical"
        connections={{ pin1: "net.BAT_5V" }}
      />
      <capacitor
        {...sch.batteryConverter}
        name="C15"
        displayName="BAT OUTPUT LOCAL"
        capacitance="10uF"
        footprint="0603"
        layer="top"
        pcbX={-12.5}
        pcbY={-10.5}
        pcbRotation={0}
        schX={13}
        schY={0}
        schOrientation="vertical"
        connections={{ pin1: "net.BAT_5V" }}
      />
      <capacitor
        {...sch.batteryConverter}
        name="C16"
        displayName="BUCK-BOOST VAUX"
        capacitance="100nF"
        footprint="0603"
        layer="top"
        pcbX={-16.5}
        pcbY={-21}
        pcbRotation={0}
        schX={3}
        schY={5}
        schOrientation="vertical"
        connections={{ pin1: "net.BAT_VAUX" }}
      />

      <trace
        name="BAT_ENABLE_TO_PROTECTED_INPUT"
        from=".U5 > .EN"
        to=".U5 > .VIN1"
        schDisplayLabel="BAT_ENABLE"
      />
      <trace
        name="BAT_PROTECTED_VIN2_TO_VIN1"
        from=".U5 > .VIN2"
        to=".U5 > .VIN1"
      />
      <trace
        name="BAT_PROTECTED_PS_SYNC_TO_VIN1"
        from=".U5 > .PS_SYNC"
        to=".U5 > .VIN1"
      />

      <SS34
        {...sch.powerPriority}
        name="D4"
        displayName="BATTERY POWER OR"
        layer="top"
        pcbX={-9}
        pcbY={-11.5}
        pcbRotation={270}
        schX={6}
        schY={-5}
        schRotation={180}
        connections={{ anode: "net.BAT_5V" }}
      />

      {/* 5 V to 3.3 V regulator for the ESP32. */}
      <AMS1117_3_3
        {...sch.systemRegulator}
        name="U2"
        displayName="3.3V REGULATOR"
        pcbX={20}
        pcbY={-7}
        pcbRotation={90}
        schX={2}
        schY={3.48}
        internallyConnectedPins={[["VOUT1", "VOUT2"]]}
        connections={{}}
      />

      <capacitor
        {...sch.systemRegulator}
        name="C1"
        displayName="LDO INPUT BULK"
        capacitance="22uF"
        maxDecouplingTraceLength="25mm"
        footprint="1206"
        pcbX={31}
        pcbY={-13}
        pcbRotation={180}
        schX={2}
        schY={5}
        schOrientation="vertical"
        connections={{}}
      />

      {/* The one-layer 5 V backbone is intentionally expressed as pairwise
          branches. A single four-terminal net invites an autorouter shortcut
          through the I2S amplifier and its bridge-tied speaker outputs. */}
      <trace
        name="V5_USB_TO_LDO"
        from=".R15 > .pin2"
        to=".R28 > .pin2"
        schDisplayLabel="V5"
        thickness="0.8mm"
      />
      <trace
        name="V5_SIGNAL_CROSSOVER_TO_LDO"
        from=".R28 > .pin2"
        to=".U2 > .VIN"
        schDisplayLabel="V5"
        thickness="0.8mm"
      />
      <trace
        name="V5_BATTERY_TO_LDO"
        from=".D4 > .cathode"
        to=".R29 > .pin2"
        schDisplayLabel="V5"
        thickness="0.8mm"
      />
      <trace
        name="V5_BATTERY_RAIL_CROSSOVER"
        from=".R29 > .pin1"
        to=".R28 > .pin1"
        schDisplayLabel="V5"
        thickness="0.8mm"
      />
      <trace
        name="V5_LDO_INPUT_BULK"
        from=".U2 > .VIN"
        to=".C1 > .pin1"
        schDisplayLabel="V5"
        thickness="0.8mm"
      />
      <trace
        name="V5_USB_TO_AMP_LINK"
        from=".D2 > .cathode"
        to=".R15 > .pin1"
        schDisplayLabel="V5"
        thickness="0.8mm"
      />

      {/* Dedicated 0-ohm rail links keep the 3.3 V distribution planar while
          the control, UART, and power lanes remain on the top copper layer. */}
      <resistor
        {...sch.systemRegulator}
        name="R19"
        displayName="3V3 / 5V CROSSOVER"
        resistance="0"
        footprint="2512"
        layer="top"
        pcbX={11.2}
        pcbY={-2.4}
        pcbRotation={0}
        schX={-1}
        schY={7}
        connections={{}}
      />
      <resistor
        {...sch.esp32Core}
        name="R18"
        displayName="ESP 3V3 CROSSOVER"
        resistance="0"
        footprint="1206"
        layer="top"
        pcbX={-18}
        pcbY={-3}
        pcbRotation={0}
        schX={-9}
        schY={6}
        connections={{}}
      />
      <resistor
        {...sch.usbSerial}
        name="R21"
        displayName="USB 3V3 CONTROL CROSSOVER"
        resistance="0"
        footprint="2512"
        layer="top"
        pcbX={5.2}
        pcbY={-1.2}
        pcbRotation={270}
        schX={7}
        schY={-6}
        connections={{}}
      />
      <resistor
        {...sch.usbSerial}
        name="R22"
        displayName="UART TX CROSSOVER"
        resistance="0"
        footprint="2512"
        layer="top"
        pcbX={1.3}
        pcbY={-1.2}
        pcbRotation={270}
        schX={3.5}
        schY={-8}
        connections={{}}
      />
      <resistor
        {...sch.usbSerial}
        name="R23"
        displayName="UART RX CROSSOVER"
        resistance="0"
        footprint="2512"
        layer="top"
        pcbX={-2.7}
        pcbY={-1.2}
        pcbRotation={270}
        schX={6.3}
        schY={-8}
        connections={{}}
      />
      <resistor
        {...sch.esp32Core}
        name="R24"
        displayName="BOOT SIGNAL CROSSOVER"
        resistance="0"
        footprint="1206"
        layer="top"
        pcbX={-5}
        pcbY={16}
        pcbRotation={90}
        schX={-5.16}
        schY={-4}
        connections={{}}
      />
      <resistor
        {...sch.usbSerial}
        name="R26"
        displayName="UART RX RAIL CROSSOVER"
        resistance="0"
        footprint="1206"
        layer="top"
        pcbX={-2.7}
        pcbY={-7.5}
        pcbRotation={270}
        schX={11.9}
        schY={-8}
        connections={{}}
      />
      <resistor
        {...sch.usbSerial}
        name="R27"
        displayName="UART TX RAIL CROSSOVER"
        resistance="0"
        footprint="1206"
        layer="top"
        pcbX={1.3}
        pcbY={-7.5}
        pcbRotation={270}
        schX={14.7}
        schY={-8}
        connections={{}}
      />
      <resistor
        {...sch.systemRegulator}
        name="R28"
        displayName="5V SIGNAL CROSSOVER"
        resistance="0"
        footprint={
          <footprint>
            <smtpad
              portHints={["pin1"]}
              pcbX="-1.4625mm"
              width="1.1mm"
              height="1.2mm"
              shape="rect"
            />
            <smtpad
              portHints={["pin2"]}
              pcbX="1.4625mm"
              width="1.1mm"
              height="1.2mm"
              shape="rect"
            />
            <silkscreenrect width="4.05mm" height="1.25mm" />
            <courtyardrect width="4.05mm" height="1.25mm" />
          </footprint>
        }
        layer="top"
        pcbX={11.2}
        pcbY={-5.15}
        pcbRotation={0}
        schX={17.5}
        schY={-8}
        connections={{}}
      />
      <resistor
        {...sch.powerPriority}
        name="R29"
        displayName="5V RAIL CROSSOVER"
        resistance="0"
        footprint="1206"
        layer="top"
        pcbX={-6.2}
        pcbY={-7.8}
        pcbRotation={270}
        schX={9}
        schY={-5}
        schRotation={180}
        connections={{}}
      />

      <trace
        name="V3_LDO_OUTPUT_TO_BULK"
        from=".U2 > .VOUT2"
        to=".C2 > .pin1"
        schDisplayLabel="V3V3"
        thickness="0.6mm"
        pcbPathRelativeTo=".U2 > .VOUT2"
        pcbPath={[
          { x: -3.009957, y: 0 },
          { x: -3.009957, y: -4.5375 },
          { x: 0, y: -4.5375 },
        ]}
      />
      <trace
        name="V3_LDO_TO_5V_CROSSOVER"
        from=".U2 > .VOUT2"
        to=".R19 > .pin2"
        schDisplayLabel="V3V3"
        thickness="0.6mm"
        pcbPathRelativeTo=".U2 > .VOUT2"
        pcbPath={[
          { x: -3.009957, y: 0 },
          { x: -3.009957, y: -4 },
          { x: 4.6, y: -4 },
          { x: 4.6, y: 5.8375 },
        ]}
      />
      <trace
        name="V3_5V_CROSSOVER_TO_ESP_CROSSOVER"
        from=".R19 > .pin1"
        to=".R18 > .pin2"
        schDisplayLabel="V3V3"
        thickness="0.6mm"
      />
      <trace
        name="V3_ESP_CROSSOVER_TO_LOCAL_BYPASS"
        from=".R18 > .pin1"
        to=".R17 > .pin1"
        schDisplayLabel="V3V3"
        thickness="0.6mm"
        pcbPathRelativeTo=".R18 > .pin1"
        pcbPath={[
          { x: -1.4625, y: 0 },
          { x: -1.4625, y: -4.8 },
          { x: 26.2375, y: -4.8 },
        ]}
      />
      <trace
        name="V3_LOCAL_BYPASS_TO_BULK"
        from=".C4 > .pin1"
        to=".C3 > .pin1"
        schDisplayLabel="V3V3"
        thickness="0.6mm"
      />
      <trace
        name="V3_LOCAL_BULK_TO_ESP"
        from=".C3 > .pin1"
        to=".U3 > .3V3"
        schDisplayLabel="V3V3"
        thickness="0.6mm"
      />
      <trace
        name="V3_ESP_TO_RESET_PULLUP"
        from=".U3 > .3V3"
        to=".R3 > .pin2"
        schDisplayLabel="V3V3"
        thickness="0.25mm"
      />
      <trace
        name="V3_LDO_TO_USB_CROSSOVER"
        from=".R19 > .pin1"
        to=".R21 > .pin2"
        schDisplayLabel="V3V3"
        thickness="0.6mm"
      />
      <trace
        name="V3_USB_CROSSOVER_TO_LOCAL_RAIL"
        from=".R21 > .pin2"
        to=".R17 > .pin1"
        schDisplayLabel="V3V3"
        thickness="0.25mm"
      />
      <trace
        name="V3_LOCAL_RAIL_TO_UART_V3"
        from=".R17 > .pin1"
        to=".U4 > .V3"
        schDisplayLabel="V3V3"
        thickness="0.25mm"
      />
      <trace
        name="V3_UART_V3_TO_BYPASS"
        from=".U4 > .V3"
        to=".C8 > .pin1"
        schDisplayLabel="V3V3"
      />
      <trace
        name="V3_USB_CROSSOVER_TO_UART_VCC"
        from=".R17 > .pin1"
        to=".U4 > .VCC"
        schDisplayLabel="V3V3"
        thickness="0.25mm"
      />
      <trace
        name="V3_USB_CROSSOVER_TO_BOOT_PULLUP"
        from=".R21 > .pin1"
        to=".R4 > .pin2"
        schDisplayLabel="V3V3"
        thickness="0.25mm"
      />

      <trace
        name="UART_TX_ESP_TO_CROSSOVER"
        from=".U3 > .TXD0"
        to=".R22 > .pin1"
        schDisplayLabel="UART_TX"
      />
      <trace
        name="UART_TX_TO_LANE_CROSSOVER"
        from=".R22 > .pin2"
        to=".R27 > .pin1"
        schDisplayLabel="UART_TX"
        pcbStraightLine
      />
      <trace
        name="UART_TX_LANE_CROSSOVER_TO_USB_BRIDGE"
        from=".R27 > .pin2"
        to=".U4 > .RXD"
        schDisplayLabel="UART_TX"
      />
      <trace
        name="UART_RX_USB_BRIDGE_TO_ESP"
        from=".U3 > .RXD0"
        to=".R23 > .pin1"
        schDisplayLabel="UART_RX"
      />
      <trace
        name="UART_RX_CROSSOVER_TO_USB_BRIDGE"
        from=".R23 > .pin2"
        to=".R26 > .pin1"
        schDisplayLabel="UART_RX"
        pcbStraightLine
      />
      <trace
        name="UART_RX_RAIL_CROSSOVER_TO_USB_BRIDGE"
        from=".R26 > .pin2"
        to=".U4 > .TXD"
        schDisplayLabel="UART_RX"
      />

      <capacitor
        {...sch.systemRegulator}
        name="C2"
        displayName="LDO OUTPUT BULK"
        capacitance="22uF"
        maxDecouplingTraceLength="10mm"
        footprint="1206"
        pcbX={26}
        pcbY={-7}
        pcbRotation={0}
        schX={5}
        schY={3}
        schOrientation="vertical"
        connections={{}}
      />

      <capacitor
        {...sch.esp32Core}
        name="C3"
        displayName="ESP32 BULK"
        capacitance="10uF"
        maxDecouplingTraceLength="12mm"
        footprint="0805"
        pcbX={-30}
        pcbY={-2}
        pcbRotation={180}
        schX={-10.5}
        schY={4}
        schOrientation="vertical"
        connections={{}}
      />

      <capacitor
        {...sch.esp32Core}
        name="C4"
        displayName="ESP32 BYPASS"
        capacitance="100nF"
        maxDecouplingTraceLength="45mm"
        footprint="0603"
        pcbX={-26}
        pcbY={-2}
        pcbRotation={180}
        schX={-7.8}
        schY={4}
        schOrientation="vertical"
        connections={{}}
      />

      {/* Bluetooth Classic / A2DP controller. */}
      <ESP32_WROOM_32E_N8
        {...sch.esp32Core}
        name="U3"
        displayName="ESP32-WROOM-32E-N8"
        pcbX={-17}
        pcbY={10}
        pcbRotation={0}
        schX={-5.5}
        schY={1}
        schHeight={4.8}
        internallyConnectedPins={[
          [
            "GND1",
            "GND2",
            "GND3",
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
        connections={{}}
      />

      <trace
        name="GND_U3_LOWER_TO_C3"
        from=".U3 > .GND1"
        to=".C3 > .pin2"
        pcbPathRelativeTo=".U3 > .GND1"
        pcbPath={[
          { x: -9.290018, y: -9.000109 },
          { x: -9.290018, y: -12 },
          { x: -13.9125, y: -12 },
        ]}
        routingPhaseIndex={-1}
      />
      <trace
        name="GND_USB_UART_BYPASS_ESCAPE"
        from=".C8 > .pin2"
        to=".TP21 > .pin1"
        schDisplayLabel="GND"
        pcbStraightLine
        routingPhaseIndex={-1}
      />

      <trace
        name="GND_BUCK_BOOST_VSEL"
        from=".U5 > .VSEL"
        to=".U5 > .GND"
        schDisplayLabel="GND"
        pcbPathRelativeTo=".U5 > .VSEL"
        pcbPath={[
          { x: -1.450086, y: -0.753466 },
          { x: -2.1, y: -1.9 },
          { x: 0.749938, y: -1.9 },
          { x: 0.750062, y: -1.203808 },
        ]}
        routingPhaseIndex={-1}
      />

      {/* Reset and boot circuitry for manual USB download-mode entry. */}
      <resistor
        {...sch.esp32Core}
        name="R3"
        resistance="10k"
        footprint="0603"
        pcbX={-23}
        pcbY={-2}
        pcbRotation={90}
        schX={-9}
        schY={-2}
        connections={{}}
      />

      <capacitor
        {...sch.esp32Core}
        name="C5"
        capacitance="1uF"
        footprint="0603"
        pcbX={-23}
        pcbY={-5.5}
        pcbRotation={270}
        schX={-9}
        schY={-4}
        schOrientation="vertical"
      />

      <Pts810Button
        {...sch.esp32Core}
        name="SW_RESET"
        displayName="RESET"
        pcbX={-30.8}
        pcbY={-5.5}
        pcbRotation={0}
        schX={-7.66}
        schY={-3.37}
      />

      {/* Split the four-terminal reset net into simple two-terminal traces so the
          single-layer router can use the narrow escape channel beside U3. */}
      <trace
        name="ESP_EN_U3_TO_C5"
        from=".U3 > .EN"
        to=".C5 > .pin1"
        schDisplayLabel="ESP_EN"
        pcbPathRelativeTo=".U3 > .EN"
        pcbPath={[
          { x: -6.750018, y: -9.000109 },
          { x: -6.750018, y: -12.825 },
          { x: -6, y: -12.825 },
          { x: -6, y: -14.675 },
        ]}
      />
      <trace
        name="ESP_EN_R3_TO_C5"
        from=".R3 > .pin1"
        to=".C5 > .pin1"
        pcbStraightLine
      />
      <trace
        name="ESP_EN_C5_TO_SW1"
        from=".C5 > .pin1"
        to=".SW_RESET > .pin1"
        pcbPathRelativeTo=".SW_RESET > .pin1"
        pcbPath={[
          { x: -2.075, y: 1.075 },
          { x: 7.8, y: 1.075 },
          { x: 7.8, y: 0.825 },
        ]}
      />

      <resistor
        {...sch.esp32Core}
        name="R4"
        resistance="10k"
        footprint="0603"
        pcbX={-2}
        pcbY={18.5}
        pcbRotation={0}
        schX={-3}
        schY={-2}
        connections={{}}
      />

      <Pts810Button
        {...sch.esp32Core}
        name="SW_BOOT"
        displayName="BOOT"
        pcbX={-3}
        pcbY={21.5}
        pcbRotation={180}
        schX={-1.19}
        schY={-4}
      />

      <trace
        name="ESP_IO0_U3_TO_CROSSOVER"
        from=".U3 > .IO0"
        to=".R24 > .pin1"
        schDisplayLabel="ESP_IO0"
        pcbStraightLine
      />
      <trace
        name="ESP_IO0_CROSSOVER_TO_SW2"
        from=".R24 > .pin2"
        to=".SW_BOOT > .pin1"
        pcbStraightLine
      />
      <trace
        name="ESP_IO0_PULLUP_TO_SW2"
        from=".R4 > .pin1"
        to=".SW_BOOT > .pin1"
        pcbStraightLine
      />

      {/* MAX98357A mono I2S class-D amplifier. */}
      <MAX98357AETE_T
        {...sch.audioOutput}
        name="U1"
        displayName="MAX98357A I2S AMP"
        pcbX={14}
        pcbY={8}
        pcbRotation={0}
        schX={3}
        schY={2}
        schHeight={1.2}
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
        internallyConnectedPins={[["GND", "GND2", "GND3", "EP"]]}
        connections={{}}
      >
        <courtyardrect width="3.6mm" height="3.6mm" />
      </MAX98357AETE_T>

      {/* Preserve the one-layer ordering of the adjacent I2S pins with a
          parallel escape bundle before the traces approach the amplifier. */}
      <trace
        name="I2S_BCLK"
        from=".U3 > .IO27"
        to=".U1 > .BCLK"
        schDisplayLabel="I2S_BCLK"
        pcbPathRelativeTo=".U3 > .IO27"
        pcbPath={[
          { x: 4.679982, y: -9.000109 },
          { x: 4.679982, y: -9.7 },
          { x: 10.5, y: -9.7 },
          { x: 10.5, y: -3.5 },
          { x: 28.2, y: -3.5 },
          { x: 29.500003, y: -2.747903 },
        ]}
      />
      <trace
        name="I2S_LRCLK"
        from=".U3 > .IO14"
        to=".U1 > .LRCLK"
        schDisplayLabel="I2S_LRCLK"
        pcbPathRelativeTo=".U3 > .IO14"
        pcbPath={[
          { x: 5.949982, y: -9.000109 },
          { x: 5.949982, y: -9.2 },
          { x: 11, y: -9.2 },
          { x: 11, y: -2.8 },
          { x: 28.2, y: -2.8 },
          { x: 29.500003, y: -1.747905 },
        ]}
      />
      <trace
        name="I2S_DIN"
        from=".U3 > .IO26"
        to=".U1 > .DIN"
        schDisplayLabel="I2S_DIN"
        pcbPathRelativeTo=".U3 > .IO26"
        pcbPath={[
          { x: 3.409982, y: -9.000109 },
          { x: 3.409982, y: -10.2 },
          { x: 10, y: -10.2 },
          { x: 10, y: -4.2 },
          { x: 28.2, y: -4.2 },
          { x: 30.251589, y: -3.499997 },
        ]}
      />
      <capacitor
        {...sch.audioOutput}
        name="C6"
        displayName="AMP BULK"
        capacitance="10uF"
        maxDecouplingTraceLength="15mm"
        footprint="0805"
        pcbX={17.5}
        pcbY={4.5}
        pcbRotation={270}
        schX={1}
        schY={5}
        schOrientation="vertical"
        connections={{}}
      />

      <capacitor
        {...sch.audioOutput}
        name="C7"
        displayName="AMP BYPASS"
        capacitance="100nF"
        maxDecouplingTraceLength="15mm"
        footprint="0603"
        pcbX={20}
        pcbY={4.5}
        pcbRotation={270}
        schX={3}
        schY={5}
        schOrientation="vertical"
        connections={{}}
      />

      <resistor
        {...sch.audioOutput}
        name="R15"
        displayName="AMP 5V LINK"
        resistance="0"
        footprint="1206"
        pcbX={19}
        pcbY={10.5}
        pcbRotation={270}
        schX={5}
        schY={5}
        connections={{}}
      />

      <trace name="AMP_V5_C6_TO_VDD2" from=".C6 > .pin1" to=".U1 > .VDD2" />
      <trace name="AMP_V5_VDD2_TO_VDD" from=".U1 > .VDD2" to=".U1 > .VDD" />
      <trace name="AMP_V5_R15_TO_C7" from=".R15 > .pin2" to=".C7 > .pin1" />
      <trace name="AMP_V5_C7_TO_C6" from=".C7 > .pin1" to=".C6 > .pin1" />

      <resistor
        {...sch.audioOutput}
        name="R5"
        displayName="MONO MIX / AMP ENABLE"
        resistance="634k"
        footprint="0603"
        pcbX={10.5}
        pcbY={4}
        pcbRotation={90}
        schX={0.3}
        schY={1}
        connections={{}}
      />

      <trace
        name="AMP_MODE_GPIO"
        from=".U3 > .IO25"
        to=".R5 > .pin1"
        schDisplayLabel="AMP_MODE_GPIO"
      />
      <trace
        name="AMP_SD_MODE"
        from=".R5 > .pin2"
        to=".U1 > .N_SD_MODE"
        schDisplayLabel="AMP_SD_MODE"
      />

      <pinheader
        {...sch.audioOutput}
        name="J2"
        displayName="SPEAKER 4-8 OHM"
        pinCount={2}
        pitch="5.08mm"
        holeDiameter="1.2mm"
        platedDiameter="2.4mm"
        rightAngle
        pcbX={32.5}
        pcbY={0}
        pcbRotation={90}
        schX={9}
        schY={2}
        pinLabels={{ pin1: "SPK_POS", pin2: "SPK_NEG" }}
        showSilkscreenPinLabels
        connections={{}}
      />

      {/* Alternate bridge-tied output for a 3.5 mm TS speaker plug. */}
      <PJ_320D
        {...sch.audioOutput}
        name="J4"
        displayName="3.5MM PASSIVE SPEAKER"
        pcbX={28.15}
        pcbY={12}
        pcbRotation={180}
        schX={9}
        schY={5}
        pinAttributes={{
          pin2: { doNotConnect: true },
          pin3: { doNotConnect: true },
        }}
        connections={{}}
      />

      <trace
        name="SPEAKER_POS_AMP_TO_JACK"
        from=".U1 > .OUTP"
        to=".J4 > .pin4"
        schDisplayLabel="SPK_POS"
        thickness="0.25mm"
      />
      <trace
        name="SPEAKER_POS_JACK_TO_HEADER"
        from=".J4 > .pin4"
        to=".J2 > .pin1"
        schDisplayLabel="SPK_POS"
        thickness="0.25mm"
      />
      <trace
        name="SPEAKER_NEG_AMP_TO_JACK"
        from=".U1 > .OUTN"
        to=".J4 > .pin1"
        schDisplayLabel="SPK_NEG"
        thickness="0.25mm"
      />
      <trace
        name="SPEAKER_NEG_JACK_TO_HEADER"
        from=".J4 > .pin1"
        to=".J2 > .pin2"
        schDisplayLabel="SPK_NEG"
        thickness="0.25mm"
      />

      {/* User controls. Firmware uses active-low buttons. */}
      <resistor
        {...sch.userControls}
        name="R6"
        resistance="10k"
        footprint="0603"
        pcbX={13}
        pcbY={-16.5}
        pcbRotation={180}
        schX={0}
        schY={-5}
        connections={{}}
      />

      <Pts810Button
        {...sch.userControls}
        name="SW_PLAY"
        displayName="PLAY / PAUSE"
        pcbX={13}
        pcbY={-21}
        pcbRotation={0}
        schX={0}
        schY={-7}
      />

      <resistor
        {...sch.userControls}
        name="R7"
        resistance="10k"
        footprint="0603"
        pcbX={19}
        pcbY={-16.5}
        pcbRotation={180}
        schX={4}
        schY={-5}
        connections={{}}
      />

      <Pts810Button
        {...sch.userControls}
        name="SW_VOL_UP"
        displayName="VOLUME +"
        pcbX={19}
        pcbY={-21}
        pcbRotation={0}
        schX={4}
        schY={-7}
      />

      <resistor
        {...sch.userControls}
        name="R8"
        resistance="10k"
        footprint="0603"
        pcbX={25}
        pcbY={-16.5}
        pcbRotation={180}
        schX={8}
        schY={-5}
        connections={{}}
      />

      <Pts810Button
        {...sch.userControls}
        name="SW_VOL_DN"
        displayName="VOLUME -"
        pcbX={25}
        pcbY={-21}
        pcbRotation={0}
        schX={8}
        schY={-7}
      />

      <resistor
        {...sch.userControls}
        name="R17"
        displayName="CONTROL 3V3 LINK"
        resistance="0"
        footprint="2512"
        layer="top"
        pcbX={11.2}
        pcbY={-7.8}
        pcbRotation={0}
        schX={-2}
        schY={-5}
        connections={{}}
      />
      <trace
        name="CONTROL_3V3_TO_LINK"
        from=".C4 > .pin1"
        to=".R17 > .pin1"
        schDisplayLabel="V3V3"
      />
      <trace
        name="CONTROL_3V3_LINK_TO_PLAY_PULLUP"
        from=".R17 > .pin2"
        to=".R6 > .pin1"
        schDisplayLabel="CONTROL_V3V3"
        pcbPathRelativeTo=".R17 > .pin2"
        pcbPath={[
          { x: 2.9625, y: 0 },
          { x: 4.5, y: 0 },
          { x: 4.5, y: -8.7 },
          { x: 2.625, y: -8.7 },
        ]}
      />
      <trace
        name="CONTROL_3V3_PLAY_TO_VOL_UP"
        from=".R6 > .pin1"
        to=".R7 > .pin1"
        pcbStraightLine
      />
      <trace
        name="CONTROL_3V3_VOL_UP_TO_VOL_DOWN"
        from=".R7 > .pin1"
        to=".R8 > .pin1"
        pcbStraightLine
      />

      {[
        {
          name: "BTN_PLAY",
          gpio: ".U3 > .IO34",
          resistor: ".R6 > .pin2",
          button: ".SW_PLAY > .pin1_alt",
          switchPath: [
            { x: 2.075, y: 1.075 },
            { x: 2.075, y: 3 },
            { x: -0.825, y: 3 },
            { x: -0.825, y: 4.5 },
          ],
          routePath: [
            { x: -2.940018, y: -9.000109 },
            { x: -2.940018, y: -11.6 },
            { x: 27.5, y: -11.6 },
            { x: 27.5, y: -19.5 },
            { x: 29.175, y: -26.5 },
          ],
        },
        {
          name: "BTN_VOL_UP",
          gpio: ".U3 > .IO35",
          resistor: ".R7 > .pin2",
          button: ".SW_VOL_UP > .pin1_alt",
          switchPath: [
            { x: 2.075, y: 1.075 },
            { x: 2.075, y: 3 },
            { x: -0.825, y: 3 },
            { x: -0.825, y: 4.5 },
          ],
          routePath: [
            { x: -1.670018, y: -9.000109 },
            { x: -1.670018, y: -11.2 },
            { x: 28.2, y: -11.2 },
            { x: 28.2, y: -19.5 },
            { x: 35.175, y: -26.5 },
          ],
        },
        {
          name: "BTN_VOL_DOWN",
          gpio: ".U3 > .IO32",
          resistor: ".R8 > .pin2",
          button: ".SW_VOL_DN > .pin1_alt",
          switchPath: [
            { x: 2.075, y: 1.075 },
            { x: 2.075, y: 3 },
            { x: -0.825, y: 3 },
            { x: -0.825, y: 4.5 },
          ],
          routePath: [
            { x: -0.400018, y: -9.000109 },
            { x: -0.400018, y: -10.8 },
            { x: 28.9, y: -10.8 },
            { x: 28.9, y: -19.5 },
            { x: 41.175, y: -26.5 },
          ],
        },
      ].map(
        ({ name, gpio, resistor, button, routePath, switchPath }, index) => (
          <Fragment key={name}>
            <trace
              name={`${name}_GPIO_TO_SWITCH`}
              from={gpio}
              to={resistor}
              schDisplayLabel={name}
              pcbPathRelativeTo={gpio}
              pcbPath={routePath}
            />
            <trace
              name={`${name}_SWITCH_TO_PULLUP`}
              from={button}
              to={resistor}
              pcbPathRelativeTo={button}
              pcbPath={switchPath}
            />
          </Fragment>
        ),
      )}

      {/* Status LED driven by GPIO19. */}
      <resistor
        {...sch.userControls}
        name="R9"
        resistance="1k"
        footprint="1206"
        pcbX={3.5}
        pcbY={18}
        pcbRotation={0}
        schX={1.8}
        schY={-2.5}
        connections={{}}
      />

      <XL_1608UBC_04
        {...sch.userControls}
        name="D1"
        displayName="STATUS"
        color="blue"
        pcbX={3.5}
        pcbY={21.2}
        pcbRotation={180}
        schX={5.2}
        schY={-2.5}
        schRotation={180}
        connections={{}}
      />

      <trace
        name="STATUS_LED_GPIO"
        from=".U3 > .IO19"
        to=".R9 > .pin1"
        schDisplayLabel="STATUS_LED_GPIO"
      />
      <trace name="STATUS_LED_ANODE" from=".R9 > .pin2" to=".D1 > .anode" />

      {/* Accessible ground pads also provide short escapes from same-layer
          copper islands around dense packages and edge connectors. */}
      <GroundTestpoint
        {...sch.usbInput}
        name="TP1"
        displayName="USB SHIELD GND"
        pcbX={8.5}
        pcbY={-22.5}
        schX={3}
        schY={-7}
        connections={{ pin1: "net.GND" }}
      />
      <GroundTestpoint
        {...sch.usbSerial}
        name="TP2"
        displayName="USB-UART GND"
        pcbX={-3.5}
        pcbY={-14}
        schX={4}
        schY={-7}
        connections={{ pin1: "net.GND" }}
      />
      <GroundTestpoint
        {...sch.systemRegulator}
        name="TP19"
        displayName="LDO TAB GND"
        pcbX={25}
        pcbY={-12}
        schX={9}
        schY={7}
        connections={{ pin1: "net.GND" }}
      />
      <GroundTestpoint
        {...sch.systemRegulator}
        name="TP20"
        displayName="LDO OUTPUT CAP GND"
        pcbX={29}
        pcbY={-7}
        schX={11}
        schY={5}
        connections={{ pin1: "net.GND" }}
      />
      <GroundTestpoint
        {...sch.usbSerial}
        name="TP21"
        displayName="USB-UART BYPASS GND"
        pcbX={12}
        pcbY={-12}
        schX={6}
        schY={-9}
        connections={{ pin1: "net.GND" }}
      />
      <GroundTestpoint
        {...sch.esp32Core}
        name="TP24"
        displayName="RESET GND"
        pcbX={-31.5}
        pcbY={-9}
        schX={-13}
        schY={-4}
        connections={{ pin1: "net.GND" }}
      />
      <GroundTestpoint
        {...sch.audioOutput}
        name="TP23"
        displayName="AMP BYPASS GND"
        pcbX={23}
        pcbY={3}
        schX={7}
        schY={6}
        connections={{ pin1: "net.GND" }}
      />
      <GroundTestpoint
        {...sch.userControls}
        name="TP11"
        displayName="VOLUME DOWN GND"
        pcbX={23.5}
        pcbY={-18}
        schX={9}
        schY={-9}
        connections={{ pin1: "net.GND" }}
      />
      <GroundTestpoint
        {...sch.esp32Core}
        name="TP16"
        displayName="ESP32 UPPER GND"
        pcbX={-26}
        pcbY={22.5}
        schX={-11}
        schY={2}
        connections={{ pin1: "net.GND" }}
      />
      <GroundTestpoint
        {...sch.batteryProtection}
        name="TP3"
        displayName="BATTERY GND"
        pcbX={-26.5}
        pcbY={-22.5}
        schX={-10}
        schY={1}
        connections={{ pin1: "net.GND" }}
      />
      <GroundTestpoint
        {...sch.batteryConverter}
        name="TP4"
        displayName="PGND ESCAPE"
        pcbX={-19}
        pcbY={-12.7}
        schX={0}
        schY={-7}
        connections={{ pin1: "net.GND" }}
      />
      <GroundTestpoint
        {...sch.systemRegulator}
        name="TP5"
        displayName="LDO GND"
        pcbX={23}
        pcbY={-14}
        schX={7}
        schY={5}
        connections={{ pin1: "net.GND" }}
      />
      <GroundTestpoint
        {...sch.userControls}
        name="TP6"
        displayName="STATUS GND"
        pcbX={6.5}
        pcbY={21.2}
        schX={7}
        schY={-4}
        connections={{ pin1: "net.GND" }}
      />
      <GroundTestpoint
        {...sch.userControls}
        name="TP7"
        displayName="PLAY GND"
        pcbX={10}
        pcbY={-18}
        schX={1}
        schY={-9}
        connections={{ pin1: "net.GND" }}
      />
      <GroundTestpoint
        {...sch.userControls}
        name="TP8"
        displayName="VOLUME GND"
        pcbX={17.5}
        pcbY={-18}
        schX={5}
        schY={-9}
        connections={{ pin1: "net.GND" }}
      />

      {groundPorts.map((port, index) => (
        <Fragment key={port}>
          <trace
            name={`GND_POUR_${index + 1}`}
            from={port}
            to="net.GND"
            thickness="0.5mm"
            schDisplayLabel="GND"
            routingPhaseIndex={-1}
          />
        </Fragment>
      ))}

      {groundStubs.map(([from, to], index) => (
        <Fragment key={`${from}-${to}`}>
          <trace
            name={`GND_STUB_${index + 1}`}
            from={from}
            to={to}
            thickness="0.25mm"
            schDisplayLabel="GND"
            pcbStraightLine
          />
        </Fragment>
      ))}

      <trace
        name="GND_BOOT_SWITCH_ESCAPE"
        from=".SW_BOOT > .pin2"
        to=".D1 > .cathode"
        thickness="0.25mm"
        schDisplayLabel="GND"
        pcbStraightLine
      />

      {/* Assembly and enclosure legends. */}
      <silkscreentext
        text="ESP32 BT SPEAKER"
        pcbX={17}
        pcbY={20.5}
        fontSize="1mm"
      />
      <silkscreentext
        text="MICRO-USB / UART"
        pcbX={0}
        pcbY={-20.5}
        fontSize="0.8mm"
      />
      <silkscreentext text="4xAA" pcbX={-22} pcbY={-19.5} fontSize="0.8mm" />
      <silkscreentext
        text="BTL SPK ONLY"
        pcbX={21}
        pcbY={15}
        fontSize="0.7mm"
      />
      <silkscreentext
        text="ANTENNA - NO COPPER"
        pcbX={-33}
        pcbY={10}
        pcbRotation={90}
        fontSize="0.55mm"
      />
    </board>
  );
}
