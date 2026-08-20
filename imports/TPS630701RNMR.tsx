import type { ChipProps } from "@tscircuit/props";

const pinLabels = {
  pin1: ["PS_SYNC"],
  pin2: ["PG"],
  pin3: ["VAUX"],
  pin4: ["GND"],
  pin5: ["FB"],
  pin6: ["FB2"],
  pin7: ["VOUT2"],
  pin8: ["VOUT1"],
  pin9: ["L2"],
  pin10: ["PGND"],
  pin11: ["L1"],
  pin12: ["VIN2"],
  pin13: ["VIN1"],
  pin14: ["EN"],
  pin15: ["VSEL"],
} as const;

const pinAttributes = {
  pin4: { requiresGround: true },
  pin10: { requiresGround: true },
  pin12: { requiresPower: true },
  pin13: { requiresPower: true },
} as const;

export const TPS630701RNMR = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
        jlcpcb: ["C2876599"],
      }}
      manufacturerPartNumber="TPS630701RNMR"
      footprint={
        <footprint>
          <smtpad
            portHints={["pin15"]}
            pcbX="-1.450086mm"
            pcbY="-0.7534656mm"
            width="0.6999986mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin14"]}
            pcbX="-1.450086mm"
            pcbY="-0.2533396mm"
            width="0.6999986mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin13"]}
            pcbX="-1.450086mm"
            pcbY="0.2462784mm"
            width="0.6999986mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin12"]}
            pcbX="-1.450086mm"
            pcbY="0.7464044mm"
            width="0.6999986mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin11"]}
            pcbX="-0.500126mm"
            pcbY="0.8287004mm"
            width="0.2500122mm"
            height="1.4500098mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin10"]}
            pcbX="0mm"
            pcbY="0.6288024mm"
            width="0.2500122mm"
            height="1.850009mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin9"]}
            pcbX="0.499872mm"
            pcbY="0.8287004mm"
            width="0.2500122mm"
            height="1.4500098mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin8"]}
            pcbX="1.450086mm"
            pcbY="0.7464044mm"
            width="0.6999986mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin7"]}
            pcbX="1.450086mm"
            pcbY="0.2462784mm"
            width="0.6999986mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin6"]}
            pcbX="1.450086mm"
            pcbY="-0.2538476mm"
            width="0.6999986mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin5"]}
            pcbX="1.450086mm"
            pcbY="-0.7537196mm"
            width="0.6999986mm"
            height="0.2500122mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin4"]}
            pcbX="0.750062mm"
            pcbY="-1.2038076mm"
            width="0.2500122mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin3"]}
            pcbX="0.249936mm"
            pcbY="-1.2038076mm"
            width="0.2500122mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin2"]}
            pcbX="-0.25019mm"
            pcbY="-1.2038076mm"
            width="0.2500122mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin1"]}
            pcbX="-0.750062mm"
            pcbY="-1.2038076mm"
            width="0.2500122mm"
            height="0.6999986mm"
            shape="rect"
          />
          <silkscreenpath
            route={[
              { x: -0.8561577999999912, y: 1.2555473999999833 },
              { x: -1.5000223999999776, y: 1.2555473999999833 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: -1.5000223999999776, y: -1.3714475999999962 },
              { x: -1.10619539999999, y: -1.3714475999999962 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: 1.106068399999998, y: -1.3714475999999962 },
              { x: 1.4999716000000234, y: -1.3714475999999962 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: 1.4999716000000234, y: -1.3714475999999962 },
              { x: 1.4999716000000234, y: -1.2026646000000056 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: 1.4999716000000234, y: 1.1366753999999872 },
              { x: 1.4999716000000234, y: 1.2555473999999833 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: 1.4999716000000234, y: 1.2555473999999833 },
              { x: 0.8561070000000086, y: 1.2555473999999833 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: -1.5000223999999776, y: 1.2555473999999833 },
              { x: -1.5000223999999776, y: 1.1366753999999872 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: -1.5000223999999776, y: -1.2026646000000056 },
              { x: -1.5000223999999776, y: -1.3714475999999962 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: -0.6898639999999716, y: -1.821281600000006 },
              { x: -0.6932740070082843, y: -1.8471831747576886 },
              { x: -0.7032716416908613, y: -1.8713196000000067 },
              { x: -0.7191755817659669, y: -1.8920460182340264 },
              { x: -0.7399019999999865, y: -1.907949958309132 },
              { x: -0.7640384252423047, y: -1.917947592991709 },
              { x: -0.7899399999999872, y: -1.9213576000000074 },
              { x: -0.8158415747576555, y: -1.917947592991709 },
              { x: -0.8399779999999737, y: -1.907949958309132 },
              { x: -0.8607044182339934, y: -1.8920460182340264 },
              { x: -0.8766083583091131, y: -1.8713196000000067 },
              { x: -0.8866059929916901, y: -1.8471831747576886 },
              { x: -0.8900159999999886, y: -1.821281600000006 },
              { x: -0.8866059929916901, y: -1.7953800252423235 },
              { x: -0.8766083583091131, y: -1.7712436000000054 },
              { x: -0.8607044182339934, y: -1.750517181766 },
              { x: -0.8399779999999737, y: -1.7346132416908802 },
              { x: -0.8158415747576555, y: -1.7246156070083174 },
              { x: -0.7899399999999872, y: -1.7212056000000047 },
              { x: -0.7640384252423047, y: -1.7246156070083174 },
              { x: -0.7399019999999865, y: -1.7346132416908802 },
              { x: -0.7191755817659669, y: -1.750517181766 },
              { x: -0.7032716416908613, y: -1.7712436000000054 },
              { x: -0.6932740070082843, y: -1.7953800252423235 },
              { x: -0.6898639999999716, y: -1.821281600000006 },
            ]}
          />
          <silkscreentext
            text="{NAME}"
            pcbX="0.001778mm"
            pcbY="2.5579344mm"
            anchorAlignment="center"
            fontSize="1mm"
          />
          <courtyardoutline
            outline={[
              { x: -2.0516219999999947, y: 1.8079343999999793 },
              { x: 2.055178000000012, y: 1.8079343999999793 },
              { x: 2.055178000000012, y: -2.171865600000018 },
              { x: -2.0516219999999947, y: -2.171865600000018 },
              { x: -2.0516219999999947, y: 1.8079343999999793 },
            ]}
          />
        </footprint>
      }
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C2876599.obj?uuid=e3e2f5cfb5394380bfe949293a71b9a6",
        stepUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C2876599.step?uuid=e3e2f5cfb5394380bfe949293a71b9a6",
        pcbRotationOffset: 90,
        modelOriginPosition: {
          x: 0.0038227000000148337,
          y: -0.00007619999999519678,
          z: 0,
        },
      }}
      {...props}
    />
  );
};
