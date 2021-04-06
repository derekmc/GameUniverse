
let canvas = null;
export function init(){
  canvas = document.createElement("canvas");
  document.body.innerHTML = "";
  canvas.style.border = "2px solid black";
  document.body.appendChild(canvas);
  console.log("paddle init();");
}

export function close(){
  console.log("paddle close();");
}