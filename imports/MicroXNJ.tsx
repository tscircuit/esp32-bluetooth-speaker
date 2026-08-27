import type { ConnectorProps } from "@tscircuit/props";

const pinLabels = {
  pin1: ["VBUS"],
  pin2: ["D_NEG"],
  pin3: ["D_POS"],
  pin4: ["ID"],
  pin5: ["GND"],
  pin6: ["SH1"],
  pin7: ["SH2"],
  pin8: ["SH3"],
  pin9: ["SH4"],
} as const;

export const MicroXNJ = (props: ConnectorProps) => {
  return (
    <connector
      pinLabels={pinLabels}
      supplierPartNumbers={{
        jlcpcb: ["C404969"],
      }}
      manufacturerPartNumber="MicroXNJ"
      footprint={
        <footprint>
          <platedhole
            portHints={["pin6"]}
            pcbX="-0.869042mm"
            pcbY="2.424938mm"
            outerDiameter="1.2999974mm"
            holeDiameter="0.700024mm"
            shape="circle"
          />
          <platedhole
            portHints={["pin9"]}
            pcbX="-0.869042mm"
            pcbY="-2.424938mm"
            outerDiameter="1.2999974mm"
            holeDiameter="0.700024mm"
            shape="circle"
          />
          <platedhole
            portHints={["pin8"]}
            pcbX="1.811166mm"
            pcbY="-3.624834mm"
            holeWidth="0.700024mm"
            holeHeight="1.200023mm"
            outerWidth="1.2999974mm"
            outerHeight="1.7999964mm"
            pcbRotation="90deg"
            shape="pill"
          />
          <platedhole
            portHints={["pin7"]}
            pcbX="1.811166mm"
            pcbY="3.624834mm"
            holeWidth="0.700024mm"
            holeHeight="1.200023mm"
            outerWidth="1.2999974mm"
            outerHeight="1.7999964mm"
            pcbRotation="90deg"
            shape="pill"
          />
          <smtpad
            portHints={["pin5"]}
            pcbX="-0.861168mm"
            pcbY="1.299972mm"
            width="1.999996mm"
            height="0.3999992mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin4"]}
            pcbX="-0.861168mm"
            pcbY="0.649986mm"
            width="1.999996mm"
            height="0.3999992mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin3"]}
            pcbX="-0.861168mm"
            pcbY="0mm"
            width="1.999996mm"
            height="0.3999992mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin2"]}
            pcbX="-0.861168mm"
            pcbY="-0.649986mm"
            width="1.999996mm"
            height="0.3999992mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin1"]}
            pcbX="-0.861168mm"
            pcbY="-1.299972mm"
            width="1.999996mm"
            height="0.3999992mm"
            shape="rect"
          />
          <silkscreenpath
            route={[
              { x: 0.5294565999998895, y: -3.7454586000000063 },
              { x: -1.254004400000099, y: -3.7454586000000063 },
              { x: -1.254004400000099, y: -3.2736028000001625 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: -1.254004400000099, y: 3.273780600000009 },
              { x: -1.254004400000099, y: 3.7900863999998364 },
              { x: 0.536974999999984, y: 3.7900863999998364 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: 3.9225409999997964, y: -2.9998924000001352 },
              { x: 4.422540000000026, y: -2.9998924000001352 },
              { x: 4.452435799999876, y: 3.0900369999999384 },
              { x: 3.9225409999997964, y: 3.1000192000000197 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: 2.919317200000023, y: 3.7900863999998364 },
              { x: 3.511772199999882, y: 3.7900863999998364 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: 3.5226941999999326, y: -3.7454586000000063 },
              { x: 2.926632399999903, y: -3.7454586000000063 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: 3.9225409999997964, y: -2.9998924000001352 },
              { x: 3.942454600000019, y: -3.4499042000001054 },
              { x: 4.437627599999928, y: -3.869969400000059 },
              { x: 3.5226941999999326, y: -3.7454586000000063 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: 3.9225409999997964, y: -2.9998924000001352 },
              { x: 3.9225409999997964, y: 3.1000192000000197 },
              { x: 3.9225409999997964, y: 3.4000948000000335 },
              { x: 4.3974955999999565, y: 3.9300404000000526 },
              { x: 3.511772199999882, y: 3.8000686000000314 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: 0.4826443999999128, y: -3.7326824000000443 },
              { x: 0.30807019999997465, y: -3.731869599999982 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: 0.48299999999994725, y: -3.734917600000017 },
              { x: 0.27520259999994323, y: -3.73131079999996 },
            ]}
          />
          <silkscreencircle
            pcbX="-2.011534mm"
            pcbY="-2.049018mm"
            radius="0.127mm"
          />
          <silkscreentext
            text="{NAME}"
            pcbX="1.2033948mm"
            pcbY="5.0577262mm"
            anchorAlignment="center"
            fontSize="1mm"
          />
          <fabricationnotepath
            route={[
              { x: 3.92254099999991, y: -2.8729432000001225 },
              { x: 4.296149600000035, y: -2.8729432000001225 },
              { x: 4.324826199999961, y: 2.965424599999892 },
              { x: 3.920153400000004, y: 2.9730445999998665 },
              { x: 3.7964295041289233, y: 3.1023905703964374 },
              { x: 3.924928600000044, y: 3.2269937999999456 },
              { x: 4.454823399999896, y: 3.2170115999998643 },
              { x: 4.543300658861654, y: 3.178763172367667 },
              { x: 4.579435799999942, y: 3.08940199999995 },
              { x: 4.549540000000093, y: -3.0005782000000636 },
              { x: 4.51211879831169, y: -3.0899705475494557 },
              { x: 4.422540000000026, y: -3.126943200000028 },
              { x: 3.92254099999991, y: -3.126943200000028 },
              { x: 4.049540999999863, y: -2.999943200000075 },
              { x: 3.92254099999991, y: -2.8729432000001225 },
            ]}
            strokeWidth="0.254mm"
          />
          <courtyardoutline
            outline={[
              { x: -2.3994052000000465, y: 4.307726200000047 },
              { x: 4.8061947999999575, y: 4.307726200000047 },
              { x: 4.8061947999999575, y: -4.269473800000014 },
              { x: -2.3994052000000465, y: -4.269473800000014 },
              { x: -2.3994052000000465, y: 4.307726200000047 },
            ]}
          />
        </footprint>
      }
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C404969.obj?uuid=a2b1a9114fe84000a47b1a073321bc87",
        stepUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C404969.step?uuid=a2b1a9114fe84000a47b1a073321bc87",
        pcbRotationOffset: 90,
        modelOriginPosition: {
          x: 0.015163800000095762,
          y: -1.2809149000001319,
          z: -1.8298538000000002,
        },
      }}
      {...props}
    />
  );
};
