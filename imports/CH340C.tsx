import type { ChipProps } from "@tscircuit/props";

const pinLabels = {
  pin1: ["GND"],
  pin2: ["TXD"],
  pin3: ["RXD"],
  pin4: ["V3"],
  pin5: ["D_POS"],
  pin6: ["D_NEG"],
  pin7: ["XI"],
  pin8: ["XO"],
  pin9: ["CTS"],
  pin10: ["DSR"],
  pin11: ["RI"],
  pin12: ["DCD"],
  pin13: ["DTR"],
  pin14: ["RTS"],
  pin15: ["R232"],
  pin16: ["VCC"],
} as const;

const pinAttributes = {
  pin1: { requiresGround: true },
  pin4: { requiresPower: true },
  pin16: { requiresPower: true },
} as const;

export const CH340C = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      manufacturerPartNumber="CH340C"
      footprint="dfn16_pillpads_w7.49mm_pw0.56mm_pl1.745mm_pin1location(leftside,bottom)"
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C84681.obj?uuid=07126628bc464d5389bb996c52812f54",
        stepUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C84681.step?uuid=07126628bc464d5389bb996c52812f54",
        pcbRotationOffset: 90,
        modelOriginPosition: { x: -0.000012700000070253736, y: 0, z: 0.000575 },
      }}
      {...props}
    />
  );
};
