const AD_KEY = "5251d00b938f369c8b531c0ce3b384bb";
const AD_W = 160;
const AD_H = 600;

const buildSrcDoc = () => {
  // Sandbox the ad so:
  // - left/right slots don't fight over global `window.atOptions`
  // - it can't take over the top window navigation
  // (clicks can still open popups/new tabs).
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <style>html,body{margin:0;padding:0;background:transparent;overflow:hidden}</style>
  </head>
  <body>
    <script>
      window.atOptions = {
        key: '${AD_KEY}',
        format: 'iframe',
        height: ${AD_H},
        width: ${AD_W},
        params: {}
      };
    <\/script>
    <script data-cfasync="false" src="https://crowdsubsequentadmire.com/${AD_KEY}/invoke.js"><\/script>
  </body>
</html>`;
};

const ToolSideAd = () => {
  const srcDoc = buildSrcDoc();
  return (
    <iframe
      title="Sponsored"
      className="block"
      style={{ width: AD_W, height: AD_H, border: 0 }}
      // Allow scripts to run and clicks to open popups/new tabs,
      // but prevent top-level navigation.
      sandbox="allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
      referrerPolicy="no-referrer"
      srcDoc={srcDoc}
    />
  );
};

export default ToolSideAd;
