import type { LedProps } from "@tscircuit/props";

const pinLabels = {
  pin1: ["cathode", "neg"],
  pin2: ["anode", "pos"],
} as const;

export const XL_1608UBC_04 = (props: LedProps) => {
  const { name = "LED1", ...restProps } = props;

  return (
    <led
      name={name}
      pinLabels={pinLabels}
      supplierPartNumbers={{
        jlcpcb: ["C965807"],
      }}
      manufacturerPartNumber="XL-1608UBC-04"
      footprint={
        <footprint>
          <smtpad
            portHints={["pin1", "cathode", "neg"]}
            pcbX="-0.7489952mm"
            pcbY="-0.003556mm"
            width="0.7999984mm"
            height="0.7999984mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin2", "anode", "pos"]}
            pcbX="0.7489952mm"
            pcbY="0.003556mm"
            width="0.7999984mm"
            height="0.7999984mm"
            shape="rect"
          />
          <silkscreenpath
            route={[
              { x: 0.2204212000000325, y: -0.32346899999993184 },
              { x: 0.210464399999978, y: -0.32346899999993184 },
              { x: -0.11958319999996547, y: 0.006578600000011647 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: 0.2204212000000325, y: 0.35656519999997727 },
              { x: 0.2204212000000325, y: 0.34658300000000963 },
              { x: -0.11958319999996547, y: 0.006578600000011647 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: 0.2204212000000325, y: 0.35656519999997727 },
              { x: 0.2204212000000325, y: -0.32346899999993184 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: 0.24046180000004824, y: 0.7566405999999688 },
              { x: 1.3904721999999765, y: 0.7566405999999688 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: 0.24046180000004824, y: -0.7434834000000592 },
              { x: 1.3904721999999765, y: -0.7434834000000592 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: 1.3904721999999765, y: 0.7565390000000889 },
              { x: 1.3904721999999765, y: -0.7233919999999898 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: -0.1395476000001281, y: -0.7457948000001124 },
              { x: -1.1896597999998448, y: -0.7457948000001124 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: -1.4896084000000656, y: -0.3457194000000072 },
              { x: -1.4896084000000656, y: -0.4457446000001255 },
              { x: -1.1896597999998448, y: -0.7457948000001124 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: -1.4896084000000656, y: 0.3542284000000109 },
              { x: -1.4896084000000656, y: -0.3457194000000072 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: -1.4896084000000656, y: 0.3542284000000109 },
              { x: -1.4896084000000656, y: 0.4543805999999222 },
              { x: -1.1896597999998448, y: 0.7543292000000292 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: -0.1395476000001281, y: 0.7543292000000292 },
              { x: -1.1896597999998448, y: 0.7543292000000292 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: 0.2204212000000325, y: 0.006578600000011647 },
              { x: -0.11958319999996547, y: 0.006578600000011647 },
            ]}
          />
          <silkscreentext
            text="{NAME}"
            pcbX="-0.0543052mm"
            pcbY="1.761238mm"
            anchorAlignment="center"
            fontSize="1mm"
          />
          <courtyardoutline
            outline={[
              { x: -1.7394051999999647, y: 1.0112380000000485 },
              { x: 1.6307948000001034, y: 1.0112380000000485 },
              { x: 1.6307948000001034, y: -0.9873619999999619 },
              { x: -1.7394051999999647, y: -0.9873619999999619 },
              { x: -1.7394051999999647, y: 1.0112380000000485 },
            ]}
          />
        </footprint>
      }
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C965807.obj?uuid=bfb81b195f37496bb30ade8d51870f96",
        stepUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C965807.step?uuid=bfb81b195f37496bb30ade8d51870f96",
        pcbRotationOffset: 0,
        modelOriginPosition: {
          x: -0.000012700000070253736,
          y: -0.00005080000005364127,
          z: -0.01,
        },
      }}
      {...restProps}
    />
  );
};
