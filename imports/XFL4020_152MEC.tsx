import type { InductorProps } from "@tscircuit/props";

export const XFL4020_152MEC = (props: Omit<InductorProps, "inductance">) => {
  return (
    <inductor
      inductance="1.5uH"
      supplierPartNumbers={{
        jlcpcb: ["C3033018"],
      }}
      manufacturerPartNumber="XFL4020-152MEC"
      footprint="res_p2.3998mm_pw1mm_ph3.8mm"
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C3033018.obj?uuid=917e580a727645d0bd5a33a187108a81",
        stepUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C3033018.step?uuid=917e580a727645d0bd5a33a187108a81",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: 0.000050000000000105516, z: 0 },
      }}
      {...props}
    >
      <courtyardrect width="4.6mm" height="4.6mm" />
    </inductor>
  );
};
