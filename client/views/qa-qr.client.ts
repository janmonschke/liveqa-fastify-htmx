import * as qr from "qrcode";

const qrElement = document.getElementById("qrcode");
const qrHeading = document.getElementById("qrurl");

const host = location.host;
const path = qrElement?.getAttribute("data-path") || "";
const url = `${location.protocol}//${host}${path}`;

qr.toCanvas(qrElement, url, {
  width: 600,
});
qrHeading!.innerText = url;
