import type { HtmxEvent, trigger } from "htmx.org";

setupHandlers({
  "#add-button": {
    "htmx:afterRequest"() {
      console.log("it worked");
    },
  },
});

function setupHandlers(
  selectors: Record<string, Partial<Record<HtmxEvent, () => void>>>
) {
  for (const [selector, handlers] of Object.entries(selectors)) {
    const elt = $(selector);
    for (const [event, handler] of Object.entries(handlers)) {
      console.log(event, handler);
      document.addEventListener(event, ({ detail }) => {
        console.log({ detail });
        if (detail.elt === elt) {
          handler();
        }
      });
    }
  }
}

function $(selector: string) {
  return document.querySelector(selector);
}

console.log("included");
