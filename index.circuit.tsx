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
          text="{NAME}"
          pcbY="2.6mm"
          anchorAlignment="center"
          fontSize="1.2mm"
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
  ".SW1 > .pin2",
  ".SW2 > .pin2",
  ".U1 > .GAIN",
  ".U1 > .GND",
  ".U1 > .GND2",
  ".U1 > .GND3",
  ".U1 > .EP",
  ".C6 > .pin2",
  ".C7 > .pin2",
  ".SW3 > .pin2",
  ".SW4 > .pin2",
  ".SW5 > .pin2",
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
  [".C13 > .pin2", ".C12 > .pin2"],
  [".C14 > .pin2", ".C13 > .pin2"],
  [".C15 > .pin2", ".C14 > .pin2"],
  [".C16 > .pin2", ".U5 > .GND"],
  [".C1 > .pin2", ".TP5 > .pin1"],
  [".U2 > .GND", ".TP19 > .pin1"],
  [".C2 > .pin2", ".TP20 > .pin1"],
  [".C4 > .pin2", ".C3 > .pin2"],
  [".C5 > .pin2", ".SW1 > .pin2"],
  [".SW1 > .pin2", ".TP24 > .pin1"],
  [".D1 > .cathode", ".TP6 > .pin1"],
  [".SW3 > .pin2", ".TP7 > .pin1"],
  [".SW4 > .pin2", ".TP8 > .pin1"],
  [".SW5 > .pin2", ".TP11 > .pin1"],
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
      width="100mm"
      height="80mm"
      layers={1}
      solderMaskColor="blue"
      defaultTraceWidth="0.25mm"
      minBoardEdgeClearance="0.25mm"
    >
      {/* Net-level widths preserve current capacity and audio output margins. */}
      <net
        name="USB_VBUS"
        nominalTraceWidth="0.8mm"
        isPowerNet
        routingPhaseIndex={27}
      />
      <net
        name="USB_5V_FUSED"
        nominalTraceWidth="0.8mm"
        isPowerNet
        routingPhaseIndex={28}
      />
      <net
        name="BAT_RAW"
        nominalTraceWidth="1mm"
        isPowerNet
        routingPhaseIndex={29}
      />
      <net
        name="BAT_FUSED"
        nominalTraceWidth="1mm"
        isPowerNet
        routingPhaseIndex={30}
      />
      <net
        name="BAT_PROTECTED"
        nominalTraceWidth="1mm"
        isPowerNet
        routingPhaseIndex={31}
      />
      <net
        name="BAT_5V"
        nominalTraceWidth="1mm"
        isPowerNet
        routingPhaseIndex={32}
      />
      <net
        name="GND"
        nominalTraceWidth="0.5mm"
        isGroundNet
        routingPhaseIndex={-1}
      />
      {/* Route short local nets before board-spanning signals and power trees. */}
      <net name="BAT_VAUX" routingPhaseIndex={6} />
      <net name="BAT_SW1" routingPhaseIndex={7} />
      <net name="BAT_SW2" routingPhaseIndex={8} />

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
        pcbX={-46.5}
        pcbY={15}
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
      <hole diameter="3.2mm" pcbX={-46} pcbY={-36} />
      <hole diameter="3.2mm" pcbX={46} pcbY={-36} />
      <hole diameter="3.2mm" pcbX={-46} pcbY={36} />
      <hole diameter="3.2mm" pcbX={46} pcbY={36} />

      {/* A five-pin Micro-B receptacle keeps USB 2.0 data routable on one
          copper layer without losing cable-orientation support. */}
      <MicroXNJ
        {...sch.usbInput}
        name="J1"
        displayName="MICRO-USB POWER / DATA"
        pcbX={25}
        pcbY={36}
        pcbRotation={90}
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
        pcbX={20}
        pcbY={30}
        pcbRotation={270}
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
        pcbX={23}
        pcbY={30}
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
        pcbX={14}
        pcbY={29}
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
        pcbPathRelativeTo=".J1 > .D_POS"
        pcbPath={[{ x: -3.2, y: 0 }]}
        routingPhaseIndex={2}
      />
      <trace
        name="USB_DP_SERIES_TO_UART"
        from=".R10 > .pin2"
        to=".U4 > .D_POS"
        schDisplayLabel="USB_D+"
        pcbPathRelativeTo=".R10 > .pin2"
        pcbPath={[{ x: 0.825, y: -5.365 }]}
        routingPhaseIndex={2}
      />
      <trace
        name="USB_DM_CONNECTOR_TO_SERIES"
        from=".J1 > .D_NEG"
        to=".R11 > .pin1"
        schDisplayLabel="USB_D-"
        pcbPathRelativeTo=".J1 > .D_NEG"
        pcbPath={[{ x: -3.2, y: -0.65 }]}
        routingPhaseIndex={3}
      />
      <trace
        name="USB_DM_SERIES_TO_UART"
        from=".R11 > .pin2"
        to=".U4 > .D_NEG"
        schDisplayLabel="USB_D-"
        pcbPathRelativeTo=".R11 > .pin2"
        pcbPath={[{ x: 2.5, y: -7.095 }]}
        routingPhaseIndex={3}
      />

      <capacitor
        {...sch.usbSerial}
        name="C8"
        displayName="USB-UART BYPASS"
        capacitance="100nF"
        maxDecouplingTraceLength="20mm"
        footprint="0603"
        layer="top"
        pcbX={15.3}
        pcbY={23.4}
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
        pcbX={33}
        pcbY={32}
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
        pcbX={21.2}
        pcbY={21.5}
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
        pcbX={-40}
        pcbY={-36}
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
        pcbX={-36.2}
        pcbY={-31}
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
        pcbX={-30}
        pcbY={-31}
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
        pcbX={-23}
        pcbY={-28}
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
        pcbX={-23}
        pcbY={-22}
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
        pcbX={-31}
        pcbY={-22}
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
        pcbX={-27}
        pcbY={-25}
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
        pcbX={-27}
        pcbY={-22}
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
        pcbX={-18}
        pcbY={-30}
        schX={2.5}
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
        pcbX={-18}
        pcbY={-27}
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
        pcbX={-18}
        pcbY={-24}
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
        pcbX={-18}
        pcbY={-21}
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
        pcbX={-23}
        pcbY={-33}
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
        pcbStraightLine
        routingPhaseIndex={9}
      />
      <trace
        name="BAT_PROTECTED_VIN2_TO_VIN1"
        from=".U5 > .VIN2"
        to=".U5 > .VIN1"
        pcbStraightLine
        routingPhaseIndex={9}
      />
      <trace
        name="BAT_PROTECTED_PS_SYNC_TO_VIN1"
        from=".U5 > .PS_SYNC"
        to=".U5 > .VIN1"
        pcbPathRelativeTo=".U5 > .PS_SYNC"
        pcbPath={[
          { x: -2, y: -2 },
          { x: -2, y: 0.25 },
        ]}
        routingPhaseIndex={9}
      />

      <SS34
        {...sch.powerPriority}
        name="D4"
        displayName="BATTERY POWER OR"
        layer="top"
        pcbX={-12}
        pcbY={-21}
        pcbRotation={270}
        schX={6}
        schY={-5}
        connections={{ anode: "net.BAT_5V" }}
      />

      {/* 5 V to 3.3 V regulator for the ESP32. */}
      <AMS1117_3_3
        {...sch.systemRegulator}
        name="U2"
        displayName="3.3V REGULATOR"
        pcbX={-10}
        pcbY={-8}
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
        maxDecouplingTraceLength="10mm"
        footprint="1206"
        pcbX={-17}
        pcbY={-9}
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
        pcbPathRelativeTo=".R15 > .pin2"
        pcbPath={[
          { x: 2.9625, y: 1.5 },
          { x: 12.6, y: 1.5 },
        ]}
        routingPhaseIndex={33}
      />
      <trace
        name="V5_SIGNAL_CROSSOVER_TO_LDO"
        from=".R28 > .pin1"
        to=".U2 > .VIN"
        schDisplayLabel="V5"
        thickness="0.8mm"
        pcbPathRelativeTo=".R28 > .pin1"
        pcbPath={[
          { x: -15, y: 0 },
          { x: -15, y: -8.07 },
        ]}
        routingPhaseIndex={33}
      />
      <trace
        name="V5_BATTERY_TO_LDO"
        from=".D4 > .cathode"
        to=".U2 > .VIN"
        schDisplayLabel="V5"
        thickness="0.8mm"
        pcbPathRelativeTo=".D4 > .cathode"
        pcbPath={[
          { x: -6, y: -2 },
          { x: -15.92996, y: -2 },
        ]}
        routingPhaseIndex={33}
      />
      <trace
        name="V5_LDO_INPUT_BULK"
        from=".U2 > .VIN"
        to=".C1 > .pin1"
        schDisplayLabel="V5"
        thickness="0.8mm"
        pcbStraightLine
        routingPhaseIndex={33}
      />
      <trace
        name="V5_USB_TO_AMP_LINK"
        from=".D2 > .cathode"
        to=".R15 > .pin1"
        schDisplayLabel="V5"
        thickness="0.8mm"
        pcbStraightLine
        routingPhaseIndex={33}
      />

      {/* Three 0-ohm rail links make the 3.3 V distribution planar: R19
          crosses the 5 V trunk, R18 crosses the button bundle, and R20
          crosses the ordered I2S/control bundle. */}
      <resistor
        {...sch.systemRegulator}
        name="R19"
        displayName="3V3 / 5V CROSSOVER"
        resistance="0"
        footprint="2512"
        layer="top"
        pcbX={-15}
        pcbY={-1}
        schX={-1}
        schY={7}
        connections={{}}
      />
      <resistor
        {...sch.esp32Core}
        name="R18"
        displayName="ESP 3V3 CROSSOVER"
        resistance="0"
        footprint="2512"
        layer="top"
        pcbX={-33}
        pcbY={-6.5}
        schX={-9}
        schY={6}
        connections={{}}
      />
      <resistor
        {...sch.usbSerial}
        name="R20"
        displayName="USB 3V3 CROSSOVER"
        resistance="0"
        footprint="2512"
        layer="top"
        pcbX={0}
        pcbY={8.8}
        pcbRotation={270}
        schX={5}
        schY={-3}
        connections={{}}
      />
      <resistor
        {...sch.usbSerial}
        name="R21"
        displayName="USB 3V3 / 5V CROSSOVER"
        resistance="0"
        footprint="2512"
        layer="top"
        pcbX={0}
        pcbY={17.7}
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
        footprint="1206"
        layer="top"
        pcbX={0}
        pcbY={30.5}
        schX={3.5}
        schY={-8}
        connections={{}}
      />
      <resistor
        {...sch.usbSerial}
        name="R23"
        displayName="UART RX CROSSOVER"
        resistance="0"
        footprint="1206"
        layer="top"
        pcbX={0}
        pcbY={27.7}
        schX={6.3}
        schY={-8}
        connections={{}}
      />
      <resistor
        {...sch.esp32Core}
        name="R24"
        displayName="BOOT SIGNAL CROSSOVER"
        resistance="0"
        footprint="2512"
        layer="top"
        pcbX={-25.78001825}
        pcbY={29.25}
        pcbRotation={90}
        schX={-5.16}
        schY={-4}
        connections={{}}
      />
      <resistor
        {...sch.usbSerial}
        name="R25"
        displayName="UART TRUNK CROSSOVER"
        resistance="0"
        footprint="2512"
        layer="top"
        pcbX={4.5}
        pcbY={23.5}
        schX={9.1}
        schY={-8}
        connections={{}}
      />
      <resistor
        {...sch.usbSerial}
        name="R26"
        displayName="UART PIN CROSSOVER"
        resistance="0"
        footprint="1206"
        layer="top"
        pcbX={11.46}
        pcbY={23}
        schX={11.9}
        schY={-8}
        connections={{}}
      />
      <resistor
        {...sch.usbSerial}
        name="R27"
        displayName="UART LANE CROSSOVER"
        resistance="0"
        footprint="1206"
        layer="top"
        pcbX={3.8}
        pcbY={27.8}
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
        footprint="2512"
        layer="top"
        pcbX={0}
        pcbY={3}
        schX={17.5}
        schY={-8}
        connections={{}}
      />

      <trace
        name="V3_LDO_OUTPUT_TO_BULK"
        from=".U2 > .VOUT2"
        to=".C2 > .pin1"
        schDisplayLabel="V3V3"
        thickness="0.6mm"
        pcbStraightLine
        routingPhaseIndex={34}
      />
      <trace
        name="V3_LDO_TO_5V_CROSSOVER"
        from=".U2 > .VOUT2"
        to=".R19 > .pin2"
        schDisplayLabel="V3V3"
        thickness="0.6mm"
        pcbPathRelativeTo=".U2 > .VOUT2"
        pcbPath={[
          { x: -5, y: -13 },
          { x: 7, y: -13 },
        ]}
        routingPhaseIndex={34}
      />
      <trace
        name="V3_5V_CROSSOVER_TO_ESP_CROSSOVER"
        from=".R19 > .pin1"
        to=".R18 > .pin2"
        schDisplayLabel="V3V3"
        thickness="0.6mm"
        pcbPathRelativeTo=".R19 > .pin1"
        pcbPath={[{ x: -3, y: -5 }]}
        routingPhaseIndex={34}
      />
      <trace
        name="V3_ESP_CROSSOVER_TO_LOCAL_BYPASS"
        from=".R18 > .pin1"
        to=".R17 > .pin1"
        schDisplayLabel="V3V3"
        thickness="0.6mm"
        pcbPathRelativeTo=".R18 > .pin1"
        pcbPath={[{ x: -3, y: -2.675 }]}
        routingPhaseIndex={34}
      />
      <trace
        name="V3_LOCAL_BYPASS_TO_BULK"
        from=".C4 > .pin1"
        to=".C3 > .pin1"
        schDisplayLabel="V3V3"
        thickness="0.6mm"
        pcbStraightLine
        routingPhaseIndex={34}
      />
      <trace
        name="V3_LOCAL_BULK_TO_ESP"
        from=".C3 > .pin1"
        to=".U3 > .3V3"
        schDisplayLabel="V3V3"
        thickness="0.6mm"
        pcbPathRelativeTo=".C3 > .pin1"
        pcbPath={[{ x: -4.98, y: -4.5 }]}
        routingPhaseIndex={34}
      />
      <trace
        name="V3_ESP_TO_RESET_PULLUP"
        from=".U3 > .3V3"
        to=".R3 > .pin2"
        schDisplayLabel="V3V3"
        thickness="0.25mm"
        pcbPathRelativeTo=".U3 > .3V3"
        pcbPath={[{ x: -8.02001825, y: -10.5 }]}
        routingPhaseIndex={34}
      />
      <trace
        name="V3_LDO_TO_USB_CROSSOVER"
        from=".R19 > .pin2"
        to=".R20 > .pin2"
        schDisplayLabel="V3V3"
        thickness="0.6mm"
        pcbPathRelativeTo=".R19 > .pin2"
        pcbPath={[{ x: 15, y: 0 }]}
        routingPhaseIndex={34}
      />
      <trace
        name="V3_I2S_CROSSOVER_TO_5V_CROSSOVER"
        from=".R20 > .pin1"
        to=".R21 > .pin2"
        schDisplayLabel="V3V3"
        thickness="0.6mm"
        pcbStraightLine
        routingPhaseIndex={34}
      />
      <trace
        name="V3_USB_CROSSOVER_TO_UART_V3"
        from=".R21 > .pin1"
        to=".R25 > .pin1"
        schDisplayLabel="V3V3"
        thickness="0.25mm"
        pcbStraightLine
        routingPhaseIndex={34}
      />
      <trace
        name="V3_UART_TRUNK_TO_PIN_CROSSOVER"
        from=".R25 > .pin2"
        to=".R26 > .pin1"
        schDisplayLabel="V3V3"
        thickness="0.25mm"
        pcbStraightLine
        routingPhaseIndex={34}
      />
      <trace
        name="V3_UART_PIN_CROSSOVER_TO_V3"
        from=".R26 > .pin2"
        to=".U4 > .V3"
        schDisplayLabel="V3V3"
        thickness="0.25mm"
        pcbStraightLine
        routingPhaseIndex={34}
      />
      <trace
        name="V3_UART_V3_TO_BYPASS"
        from=".U4 > .V3"
        to=".C8 > .pin1"
        schDisplayLabel="V3V3"
        pcbStraightLine
        routingPhaseIndex={34}
      />
      <trace
        name="V3_USB_CROSSOVER_TO_UART_VCC"
        from=".R21 > .pin1"
        to=".U4 > .VCC"
        schDisplayLabel="V3V3"
        thickness="0.25mm"
        pcbPathRelativeTo=".R21 > .pin1"
        pcbPath={[
          { x: -15, y: 0 },
          { x: -15, y: 9.555 },
        ]}
        routingPhaseIndex={34}
      />
      <trace
        name="V3_USB_CROSSOVER_TO_BOOT_PULLUP"
        from=".R21 > .pin1"
        to=".R4 > .pin2"
        schDisplayLabel="V3V3"
        thickness="0.25mm"
        pcbPathRelativeTo=".R21 > .pin1"
        pcbPath={[
          { x: -19.5, y: 0 },
          { x: -19.5, y: -13.175 },
        ]}
        routingPhaseIndex={34}
      />

      <trace
        name="UART_TX_ESP_TO_CROSSOVER"
        from=".U3 > .TXD0"
        to=".R22 > .pin1"
        schDisplayLabel="UART_TX"
        pcbPathRelativeTo=".U3 > .TXD0"
        pcbPath={[
          { x: -5.48001825, y: 15.5 },
          { x: 31.35, y: 15.5 },
        ]}
        routingPhaseIndex={15}
      />
      <trace
        name="UART_TX_TO_LANE_CROSSOVER"
        from=".R22 > .pin2"
        to=".R27 > .pin1"
        schDisplayLabel="UART_TX"
        pcbPathRelativeTo=".R22 > .pin2"
        pcbPath={[{ x: 3.8, y: 0 }]}
        routingPhaseIndex={15}
      />
      <trace
        name="UART_TX_LANE_CROSSOVER_TO_USB_BRIDGE"
        from=".R27 > .pin2"
        to=".U4 > .RXD"
        schDisplayLabel="UART_TX"
        pcbPathRelativeTo=".R27 > .pin2"
        pcbPath={[
          { x: 3.3, y: 0 },
          { x: 9.3, y: 0 },
          { x: 9.3, y: 8.295 },
        ]}
        routingPhaseIndex={15}
      />
      <trace
        name="UART_RX_USB_BRIDGE_TO_ESP"
        from=".U3 > .RXD0"
        to=".R23 > .pin1"
        schDisplayLabel="UART_RX"
        pcbPathRelativeTo=".U3 > .RXD0"
        pcbPath={[
          { x: -4.21001825, y: 12.7 },
          { x: 31.35, y: 12.7 },
        ]}
        routingPhaseIndex={16}
      />
      <trace
        name="UART_RX_CROSSOVER_TO_USB_BRIDGE"
        from=".R23 > .pin2"
        to=".U4 > .TXD"
        schDisplayLabel="UART_RX"
        pcbPathRelativeTo=".R23 > .pin2"
        pcbPath={[
          { x: 5.2, y: 0 },
          { x: 5.2, y: -7.7 },
          { x: 10.825, y: -7.7 },
        ]}
        routingPhaseIndex={16}
      />

      <capacitor
        {...sch.systemRegulator}
        name="C2"
        displayName="LDO OUTPUT BULK"
        capacitance="22uF"
        maxDecouplingTraceLength="10mm"
        footprint="1206"
        pcbX={-3}
        pcbY={-9}
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
        pcbX={-46}
        pcbY={0}
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
        maxDecouplingTraceLength="30mm"
        footprint="0603"
        pcbX={-46}
        pcbY={-4}
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
        pcbX={-33}
        pcbY={15}
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
          { x: -9.29001825, y: -11 },
          { x: -11, y: -13 },
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

      {/* Reset and boot circuitry for manual USB download-mode entry. */}
      <resistor
        {...sch.esp32Core}
        name="R3"
        resistance="10k"
        footprint="0603"
        pcbX={-40}
        pcbY={2.5}
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
        pcbX={-40}
        pcbY={-0.5}
        pcbRotation={270}
        schX={-9}
        schY={-4}
        schOrientation="vertical"
      />

      <Pts810Button
        {...sch.esp32Core}
        name="SW1"
        displayName="RESET"
        pcbX={-40}
        pcbY={-5}
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
          { x: -6.75001825, y: -10.5 },
          { x: -5.5, y: -10.5 },
          { x: -5.5, y: -13.325 },
          { x: -7, y: -13.325 },
        ]}
        routingPhaseIndex={11}
      />
      <trace
        name="ESP_EN_R3_TO_C5"
        from=".R3 > .pin1"
        to=".C5 > .pin1"
        pcbStraightLine
        routingPhaseIndex={11}
      />
      <trace
        name="ESP_EN_C5_TO_SW1"
        from=".C5 > .pin1"
        to=".SW1 > .pin1"
        pcbPathRelativeTo=".C5 > .pin1"
        pcbPath={[
          { x: -1.5, y: 0.825 },
          { x: -3.5, y: -1 },
        ]}
        routingPhaseIndex={11}
      />

      <resistor
        {...sch.esp32Core}
        name="R4"
        resistance="10k"
        footprint="0603"
        pcbX={-14}
        pcbY={37}
        schX={-3}
        schY={-2}
        connections={{}}
      />

      <Pts810Button
        {...sch.esp32Core}
        name="SW2"
        displayName="BOOT"
        pcbX={-22}
        pcbY={36}
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
        routingPhaseIndex={12}
      />
      <trace
        name="ESP_IO0_CROSSOVER_TO_SW2"
        from=".R24 > .pin2"
        to=".SW2 > .pin1"
        pcbStraightLine
        routingPhaseIndex={12}
      />
      <trace
        name="ESP_IO0_PULLUP_TO_SW2"
        from=".R4 > .pin1"
        to=".SW2 > .pin1"
        pcbStraightLine
        routingPhaseIndex={12}
      />

      {/* MAX98357A mono I2S class-D amplifier. */}
      <MAX98357AETE_T
        {...sch.audioOutput}
        name="U1"
        displayName="MAX98357A I2S AMP"
        pcbX={7}
        pcbY={14}
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
          { x: 4.67998175, y: -12.5 },
          { x: 11.5, y: -12.5 },
          { x: 11.5, y: -7 },
          { x: 15.5, y: -6.4 },
          { x: 20.5, y: -6.4 },
          { x: 34, y: -6.4 },
          { x: 37, y: -1.747903 },
        ]}
        routingPhaseIndex={17}
      />
      <trace
        name="I2S_LRCLK"
        from=".U3 > .IO14"
        to=".U1 > .LRCLK"
        schDisplayLabel="I2S_LRCLK"
        pcbPathRelativeTo=".U3 > .IO14"
        pcbPath={[
          { x: 5.94998175, y: -11.5 },
          { x: 10, y: -11.5 },
          { x: 10, y: -6 },
          { x: 15.5, y: -5.6 },
          { x: 20.5, y: -5.6 },
          { x: 34, y: -5.6 },
          { x: 37, y: -0.747905 },
        ]}
        routingPhaseIndex={18}
      />
      <trace
        name="I2S_DIN"
        from=".U3 > .IO26"
        to=".U1 > .DIN"
        schDisplayLabel="I2S_DIN"
        pcbPathRelativeTo=".U3 > .IO26"
        pcbPath={[
          { x: 3.40998175, y: -13.5 },
          { x: 13, y: -13.5 },
          { x: 13, y: -8 },
          { x: 15.5, y: -7.2 },
          { x: 20.5, y: -7.2 },
          { x: 34, y: -7.2 },
          { x: 37.5, y: -2.5 },
        ]}
        routingPhaseIndex={19}
      />
      <capacitor
        {...sch.audioOutput}
        name="C6"
        displayName="AMP BULK"
        capacitance="10uF"
        maxDecouplingTraceLength="15mm"
        footprint="0805"
        pcbX={11}
        pcbY={11}
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
        pcbX={13.5}
        pcbY={10.5}
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
        footprint="2512"
        pcbX={16.5}
        pcbY={15.6}
        pcbRotation={270}
        schX={5}
        schY={5}
        connections={{}}
      />

      <trace
        name="AMP_V5_C6_TO_VDD2"
        from=".C6 > .pin1"
        to=".U1 > .VDD2"
        pcbStraightLine
        routingPhaseIndex={27}
      />
      <trace
        name="AMP_V5_VDD2_TO_VDD"
        from=".U1 > .VDD2"
        to=".U1 > .VDD"
        pcbStraightLine
        routingPhaseIndex={27}
      />
      <trace
        name="AMP_V5_R15_TO_C7"
        from=".R15 > .pin2"
        to=".C7 > .pin1"
        pcbStraightLine
        routingPhaseIndex={27}
      />
      <trace
        name="AMP_V5_C7_TO_C6"
        from=".C7 > .pin1"
        to=".C6 > .pin1"
        pcbStraightLine
        routingPhaseIndex={27}
      />

      <resistor
        {...sch.audioOutput}
        name="R5"
        displayName="MONO MIX / AMP ENABLE"
        resistance="634k"
        footprint="0603"
        pcbX={10}
        pcbY={7}
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
        pcbPathRelativeTo=".U3 > .IO25"
        pcbPath={[
          { x: 2.13998175, y: -14.5 },
          { x: 12.5, y: -14.5 },
          { x: 13.5, y: -13.5 },
          { x: 13.5, y: -9 },
          { x: 15.5, y: -8 },
          { x: 20.5, y: -8 },
          { x: 34, y: -8 },
          { x: 40, y: -8 },
        ]}
        routingPhaseIndex={24}
      />
      <trace
        name="AMP_SD_MODE"
        from=".R5 > .pin2"
        to=".U1 > .N_SD_MODE"
        schDisplayLabel="AMP_SD_MODE"
        pcbStraightLine
        routingPhaseIndex={13}
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
        pcbX={47}
        pcbY={8.5}
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
        pcbX={29}
        pcbY={17}
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
        pcbPathRelativeTo=".U1 > .OUTP"
        pcbPath={[
          { x: 0.75, y: 2.2 },
          { x: 18.575, y: 2.2 },
        ]}
        routingPhaseIndex={25}
      />
      <trace
        name="SPEAKER_POS_JACK_TO_HEADER"
        from=".J4 > .pin4"
        to=".J2 > .pin1"
        schDisplayLabel="SPK_POS"
        thickness="0.25mm"
        pcbPathRelativeTo=".J4 > .pin4"
        pcbPath={[
          { x: 3.425, y: 7 },
          { x: -6, y: 7 },
        ]}
        routingPhaseIndex={25}
      />
      <trace
        name="SPEAKER_NEG_AMP_TO_JACK"
        from=".U1 > .OUTN"
        to=".J4 > .pin1"
        schDisplayLabel="SPK_NEG"
        thickness="0.25mm"
        pcbPathRelativeTo=".U1 > .OUTN"
        pcbPath={[
          { x: 0.25, y: 3 },
          { x: 17.175, y: 3 },
        ]}
        routingPhaseIndex={26}
      />
      <trace
        name="SPEAKER_NEG_JACK_TO_HEADER"
        from=".J4 > .pin1"
        to=".J2 > .pin2"
        schDisplayLabel="SPK_NEG"
        thickness="0.25mm"
        pcbPathRelativeTo=".J4 > .pin1"
        pcbPath={[
          { x: -8, y: -5 },
          { x: -13, y: 2 },
        ]}
        routingPhaseIndex={26}
      />

      {/* User controls. Firmware uses active-low buttons. */}
      <resistor
        {...sch.userControls}
        name="R6"
        resistance="10k"
        footprint="0603"
        pcbX={-37}
        pcbY={-18}
        pcbRotation={90}
        schX={0}
        schY={-5}
        connections={{}}
      />

      <Pts810Button
        {...sch.userControls}
        name="SW3"
        displayName="PLAY / PAUSE"
        pcbX={-37}
        pcbY={-13}
        schX={0}
        schY={-7}
      />

      <resistor
        {...sch.userControls}
        name="R7"
        resistance="10k"
        footprint="0603"
        pcbX={-31.2}
        pcbY={-18}
        pcbRotation={90}
        schX={4}
        schY={-5}
        connections={{}}
      />

      <Pts810Button
        {...sch.userControls}
        name="SW4"
        displayName="VOLUME +"
        pcbX={-31.2}
        pcbY={-13}
        schX={4}
        schY={-7}
      />

      <resistor
        {...sch.userControls}
        name="R8"
        resistance="10k"
        footprint="0603"
        pcbX={-25.4}
        pcbY={-18}
        pcbRotation={90}
        schX={8}
        schY={-5}
        connections={{}}
      />

      <Pts810Button
        {...sch.userControls}
        name="SW5"
        displayName="VOLUME -"
        pcbX={-25.4}
        pcbY={-13}
        schX={8}
        schY={-7}
      />

      <resistor
        {...sch.userControls}
        name="R17"
        displayName="CONTROL 3V3 LINK"
        resistance="0"
        footprint="0603"
        layer="top"
        pcbX={-44}
        pcbY={-10}
        pcbRotation={270}
        schX={-2}
        schY={-5}
        connections={{}}
      />
      <trace
        name="CONTROL_3V3_TO_LINK"
        from=".C4 > .pin1"
        to=".R17 > .pin1"
        schDisplayLabel="V3V3"
        pcbStraightLine
        routingPhaseIndex={20}
      />
      <trace
        name="CONTROL_3V3_LINK_TO_PLAY_PULLUP"
        from=".R17 > .pin2"
        to=".R6 > .pin1"
        schDisplayLabel="CONTROL_V3V3"
        pcbPathRelativeTo=".R17 > .pin2"
        pcbPath={[{ x: 8.825, y: 0 }]}
        routingPhaseIndex={20}
      />
      <trace
        name="CONTROL_3V3_PLAY_TO_VOL_UP"
        from=".R6 > .pin1"
        to=".R7 > .pin1"
        pcbStraightLine
        routingPhaseIndex={20}
      />
      <trace
        name="CONTROL_3V3_VOL_UP_TO_VOL_DOWN"
        from=".R7 > .pin1"
        to=".R8 > .pin1"
        pcbStraightLine
        routingPhaseIndex={20}
      />

      {[
        {
          name: "BTN_PLAY",
          gpio: ".U3 > .IO34",
          resistor: ".R6 > .pin2",
          button: ".SW3 > .pin1_alt",
          routeHints: [
            { x: -35.94, y: 4.5 },
            { x: -34.925, y: -10 },
          ],
          routePath: [
            { x: -1, y: -17 },
            { x: -1, y: -24 },
          ],
        },
        {
          name: "BTN_VOL_UP",
          gpio: ".U3 > .IO35",
          resistor: ".R7 > .pin2",
          button: ".SW4 > .pin1_alt",
          routeHints: [
            { x: -34.67, y: 4.5 },
            { x: -29.125, y: -10 },
          ],
          routePath: [
            { x: 0, y: -17 },
            { x: 0, y: -24 },
          ],
        },
        {
          name: "BTN_VOL_DOWN",
          gpio: ".U3 > .IO32",
          resistor: ".R8 > .pin2",
          button: ".SW5 > .pin1_alt",
          routeHints: [
            { x: -33.4, y: 4.5 },
            { x: -23.325, y: -10 },
          ],
          routePath: [
            { x: 1, y: -17 },
            { x: 1, y: -24 },
          ],
        },
      ].map(
        ({ name, gpio, resistor, button, routeHints, routePath }, index) => (
          <Fragment key={name}>
            <trace
              name={`${name}_GPIO_TO_SWITCH`}
              from={gpio}
              to={button}
              schDisplayLabel={name}
              pcbRouteHints={routeHints}
              pcbPathRelativeTo={routePath ? gpio : undefined}
              pcbPath={routePath}
              routingPhaseIndex={21 + index}
            />
            <trace
              name={`${name}_SWITCH_TO_PULLUP`}
              from={button}
              to={resistor}
              pcbStraightLine
              routingPhaseIndex={21 + index}
            />
          </Fragment>
        ),
      )}

      {/* Status LED driven by GPIO19. */}
      <resistor
        {...sch.userControls}
        name="R9"
        resistance="1k"
        footprint="2512"
        pcbX={-33.40001825}
        pcbY={29.25}
        pcbRotation={90}
        schX={1.8}
        schY={-2.5}
        connections={{}}
      />

      <XL_1608UBC_04
        {...sch.userControls}
        name="D1"
        displayName="STATUS"
        color="blue"
        pcbX={-29}
        pcbY={34.2}
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
        pcbStraightLine
        routingPhaseIndex={20}
      />
      <trace
        name="STATUS_LED_ANODE"
        from=".R9 > .pin2"
        to=".D1 > .anode"
        pcbStraightLine
        routingPhaseIndex={14}
      />

      {/* Accessible ground pads also provide short escapes from same-layer
          copper islands around dense packages and edge connectors. */}
      <GroundTestpoint
        {...sch.usbInput}
        name="TP1"
        displayName="USB SHIELD GND"
        pcbX={31.5}
        pcbY={38.8}
        schX={3}
        schY={-7}
        connections={{ pin1: "net.GND" }}
      />
      <GroundTestpoint
        {...sch.usbSerial}
        name="TP2"
        displayName="USB-UART GND"
        pcbX={8}
        pcbY={30}
        schX={4}
        schY={-7}
        connections={{ pin1: "net.GND" }}
      />
      <GroundTestpoint
        {...sch.systemRegulator}
        name="TP19"
        displayName="LDO TAB GND"
        pcbX={-3}
        pcbY={-3}
        schX={9}
        schY={7}
        connections={{ pin1: "net.GND" }}
      />
      <GroundTestpoint
        {...sch.systemRegulator}
        name="TP20"
        displayName="LDO OUTPUT CAP GND"
        pcbX={0}
        pcbY={-11}
        schX={11}
        schY={5}
        connections={{ pin1: "net.GND" }}
      />
      <GroundTestpoint
        {...sch.usbSerial}
        name="TP21"
        displayName="USB-UART BYPASS GND"
        pcbX={13.5}
        pcbY={19.5}
        schX={6}
        schY={-9}
        connections={{ pin1: "net.GND" }}
      />
      <GroundTestpoint
        {...sch.esp32Core}
        name="TP24"
        displayName="RESET GND"
        pcbX={-38}
        pcbY={-2}
        schX={-13}
        schY={-4}
        connections={{ pin1: "net.GND" }}
      />
      <GroundTestpoint
        {...sch.audioOutput}
        name="TP23"
        displayName="AMP BYPASS GND"
        pcbX={16}
        pcbY={8.5}
        schX={7}
        schY={6}
        connections={{ pin1: "net.GND" }}
      />
      <GroundTestpoint
        {...sch.userControls}
        name="TP11"
        displayName="VOLUME DOWN GND"
        pcbX={-27.9}
        pcbY={-16.5}
        schX={9}
        schY={-9}
        connections={{ pin1: "net.GND" }}
      />
      <GroundTestpoint
        {...sch.esp32Core}
        name="TP16"
        displayName="ESP32 UPPER GND"
        pcbX={-42}
        pcbY={28}
        schX={-11}
        schY={2}
        connections={{ pin1: "net.GND" }}
      />
      <GroundTestpoint
        {...sch.batteryProtection}
        name="TP3"
        displayName="BATTERY GND"
        pcbX={-34}
        pcbY={-36}
        schX={-10}
        schY={1}
        connections={{ pin1: "net.GND" }}
      />
      <GroundTestpoint
        {...sch.batteryConverter}
        name="TP4"
        displayName="PGND ESCAPE"
        pcbX={-23}
        pcbY={-25.2}
        schX={0}
        schY={-7}
        connections={{ pin1: "net.GND" }}
      />
      <GroundTestpoint
        {...sch.systemRegulator}
        name="TP5"
        displayName="LDO GND"
        pcbX={-19}
        pcbY={-12}
        schX={7}
        schY={5}
        connections={{ pin1: "net.GND" }}
      />
      <GroundTestpoint
        {...sch.userControls}
        name="TP6"
        displayName="STATUS GND"
        pcbX={-29.75}
        pcbY={38.5}
        schX={7}
        schY={-4}
        connections={{ pin1: "net.GND" }}
      />
      <GroundTestpoint
        {...sch.userControls}
        name="TP7"
        displayName="PLAY GND"
        pcbX={-39.5}
        pcbY={-16.5}
        schX={1}
        schY={-9}
        connections={{ pin1: "net.GND" }}
      />
      <GroundTestpoint
        {...sch.userControls}
        name="TP8"
        displayName="VOLUME GND"
        pcbX={-33.7}
        pcbY={-16.5}
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
            routingPhaseIndex={35 + index}
          />
        </Fragment>
      ))}

      <trace
        name="GND_BOOT_SWITCH_ESCAPE"
        from=".SW2 > .pin2"
        to=".D1 > .cathode"
        thickness="0.25mm"
        schDisplayLabel="GND"
        pcbPathRelativeTo=".SW2 > .pin2"
        pcbPath={[
          { x: -2.075, y: -2.2 },
          { x: 5, y: -2.2 },
        ]}
        routingPhaseIndex={54}
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
      <silkscreentext text="4xAA" pcbX={-20} pcbY={-19.8} fontSize="0.8mm" />
      <silkscreentext text="PLAY" pcbX={-37} pcbY={-16.5} fontSize="0.7mm" />
      <silkscreentext text="VOL+" pcbX={-31.2} pcbY={-16.5} fontSize="0.7mm" />
      <silkscreentext text="VOL-" pcbX={-25.4} pcbY={-16.5} fontSize="0.7mm" />
      <silkscreentext
        text="BTL SPK ONLY"
        pcbX={21}
        pcbY={15}
        fontSize="0.7mm"
      />
      <silkscreentext
        text="ANTENNA - NO COPPER"
        pcbX={-48.5}
        pcbY={15}
        pcbRotation={90}
        fontSize="0.55mm"
      />
    </board>
  );
}
