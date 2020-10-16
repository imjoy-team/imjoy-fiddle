export async function setupImJoyAPI({ editor }) {
  const imjoyRPC = await window.imjoyLoader.loadImJoyRPC({
    api_version: "0.2.3"
  });

  const api = await imjoyRPC.setupRPC({
    name: "ImJoyFiddle",
    version: "0.1.0",
    description: "ImJoyFiddle -- a playground for ImJoy plugins",
    type: "rpc-window",
    defaults: {fullscreen: true}
  });

  const service_api = {
    setup() {
      api.log("ImJoyFiddle loaded successfully.");
    },
    async run(ctx) {
      if (ctx && ctx.data && ctx.data.code) {
        editor.setValue(ctx.data.code);
      }
    }
  };
  api.export(service_api);
  return api;
}
