# ESP32 Bluetooth Speaker

A compact dual-powered mono Bluetooth speaker PCB built with tscircuit. An ESP32-WROOM-32E receives Bluetooth Classic A2DP audio and sends I2S to a MAX98357A filterless class-D amplifier. The board can run from USB-C or an external four-AA battery pack.

![3D board preview](__snapshots__/index.circuit-3d.snap.png)

## What is included

- 62 mm × 44 mm, two-layer PCB with four 3.2 mm mounting holes
- ESP32-WROOM-32E-N8 with a full-height, all-layer antenna keepout
- MAX98357A I2S mono amplifier for a 4–8 Ω speaker
- PJ-320D 3.5 mm jack plus a 5.08 mm header for alternate passive-speaker connections
- USB-C 5 V input with USB 2.0 data, dual 5.1 kΩ CC sink resistors, and a 1.1 A resettable fuse
- CH340C USB-to-UART bridge connected directly to the ESP32 programming UART
- JST-PH battery input for an external four-AA pack
- TPS630701 fixed-5 V buck-boost supply, 1.5 µH inductor, input/output filtering, battery PTC, and reverse-polarity protection
- Automatic USB power priority and Schottky isolation between the USB and battery supplies
- AMS1117-3.3 supply, local bulk/bypass capacitors, and a bottom GND plane
- Reset and boot buttons for manual ESP32 download-mode entry
- Play/pause, volume-up, and volume-down buttons plus a status LED
- Three-sheet schematic with labeled USB/system-power, battery-power, controller, audio, and user-interface sections
- Routed PCB, schematic, circuit JSON, 3D render, and regression snapshots

## Power architecture

USB-C VBUS passes through `F1` and `D2` to the board supply. The four-AA input passes through `F2`, reverse-polarity diode `D3`, the TPS630701 buck-boost stage, and isolation diode `D4`. When USB VBUS is present, `Q1` pulls the buck-boost enable pin low so USB has deterministic priority and the battery converter is not left running.

The battery connector is intended for an external holder containing four matched AA alkaline or NiMH cells. The PCB does **not** charge batteries. Never connect the battery input to rechargeable lithium cells, and never attempt to charge installed AA cells through USB-C.

Use a regulated 5 V USB-C source rated for at least 1.5 A, or a four-cell AA pack with a keyed JST-PH mating lead. Observe the `BAT+` and `BAT-` markings even though the input includes series reverse-polarity protection.

## USB programming

The CH340C is powered at 3.3 V and crosses its UART signals correctly: CH340C TXD drives ESP32 RXD0, and ESP32 TXD0 drives CH340C RXD. USB D+ and D− include 22 Ω series resistors.

Programming mode is manual:

1. Hold `BOOT`.
2. Press and release `RESET`.
3. Release `BOOT`.
4. Flash the ESP32 through the USB-C serial port.

## Firmware pin map

| Function                    | ESP32 GPIO | Direction / behavior                 |
| --------------------------- | ---------: | ------------------------------------ |
| I2S BCLK                    |         26 | Output                               |
| I2S LRCLK / WS              |         25 | Output                               |
| I2S audio data              |         22 | Output to MAX98357A DIN              |
| Amplifier enable / mono mix |         23 | Drive high to enable; low shuts down |
| Play / pause                |         32 | Active-low input                     |
| Volume up                   |         33 | Active-low input                     |
| Volume down                 |         27 | Active-low input                     |
| Status LED                  |         19 | Active-high output                   |
| UART TX                     |       TXD0 | To CH340C RXD                        |
| UART RX                     |       RXD0 | From CH340C TXD                      |

Use the ESP-IDF Bluetooth Classic A2DP sink API. Configure I2S for the pin map above and drive GPIO23 high after I2S is ready. The 634 kΩ series resistor selects the MAX98357A left/2 + right/2 mono mode at a 3.3 V logic-high level. GAIN is tied to GND for 12 dB gain.

## Connectors

The `J5` battery input uses a keyed JST-PH two-pin connector. Pin 1 is `BAT+`; pin 2 is `BAT-`/GND. Use a PHR-2-compatible mating housing and verify the cable polarity before connecting a battery holder.

The speaker output is bridge-tied. Connect the speaker only between `SPK_POS` and `SPK_NEG`; neither terminal may be connected to ground. Use a 4–8 Ω speaker rated for at least 3 W. The 3.5 mm jack uses tip for `SPK_POS` and sleeve for `SPK_NEG`; its ring contacts are intentionally unconnected. It is a passive-speaker output, not a ground-referenced headphone or line-level output.

## Build and inspect

```sh
bun install
bun run typecheck
npx tsci check index.circuit.tsx
npx tsci build index.circuit.tsx --all-images
npx tsci snapshot index.circuit.tsx --update --3d
```

Generated artifacts are in `dist/index/`; checked snapshots are in `__snapshots__/`.

Published package: [seveibar/esp32-bluetooth-speaker](https://tscircuit.com/seveibar/esp32-bluetooth-speaker)

## Design files

- `index.circuit.tsx` — complete circuit, schematic placement, PCB placement, and routing
- `imports/` — exact footprints and 3D models for the ESP32, USB-C, CH340C, battery connector, buck-boost components, audio jack, LED, and regulator
- `BOM.csv` — prototype bill of materials and sourcing notes
- `dist/index/circuit.json` — generated tscircuit circuit JSON
- `dist/index/pcb.svg` — routed PCB preview
- `dist/index/schematic.svg` — schematic preview
- `dist/index/3d.png` — 3D assembly preview

## Prototype notes

- The design passes TypeScript and tscircuit checks with zero errors and zero warnings.
- The TPS630701 stage follows the fixed-5 V application using a 1.5 µH inductor, two 10 µF input capacitors plus a local 10 µF capacitor, three 22 µF output capacitors plus a local 10 µF capacitor, and a 100 nF VAUX capacitor.
- Verify the selected AMS1117 clone's output-capacitor ESR requirement. For production, a modern low-dropout regulator is preferable for additional 3.3 V headroom after the power-OR Schottky diode.
- Keep the ESP32 antenna region clear of copper, batteries, the speaker magnet, enclosure metal, and wiring.
- Keep speaker leads short and route them away from the ESP32 antenna. Add ferrite filtering if enclosure/cable EMI testing requires it.
- Before fabrication, run the PCB vendor's DFM check and verify the USB-C, JST-PH, audio jack, speaker connector, buttons, and enclosure against physical samples.

Reference datasheets: [TPS63070/TPS630701](https://www.ti.com/lit/ds/symlink/tps63070.pdf) and [CH340C](https://datasheet.lcsc.com/lcsc/2304140030_WCH-Jiangsu-Qin-Heng-CH340C_C84681.pdf).
