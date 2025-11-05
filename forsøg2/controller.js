import * as model from "./model.js";
import * as view from "./view.js";

function startController() {
  view.registerEventHandlers();
  window.model = { getModel };
}



startController();
