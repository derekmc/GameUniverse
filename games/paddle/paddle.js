
let Canvas = null;
let Buffer = null;
let Loop = null;
let BlurLoop = null;
let State = {
  paddle: [30,100],
};
let Horizontal = false;
let Size = null;
let StyleCache = {};
let X = 0;
let Ctx = null;
let BCtx = null;

let BodyStyles = {
  overflow: "hidden",
  background: "black"
}

const RATIO = 4/3;
const DT = 1000/10;
const ENABLE_BLUR = true;
const BLUR_DT = DT/3.1; // motion blur


export function Init(){
  Canvas = document.createElement("canvas");
  Buffer = document.createElement("canvas");

  Canvas.style.webkitFilter = "blur(5px)";
  document.body.innerHTML = "";
  Canvas.style.border = "none";
  Canvas.style.background = "white";
  //Canvas.style.margin = "-1px";
  //document.body.style.background = "black";

  let hsize = (window.innerWidth - 4)/RATIO;
  let vsize = (window.innerHeight - 4);


  Horizontal = hsize > vsize;
  Size = Horizontal? vsize : hsize;

  Canvas.width = Size*RATIO;
  Canvas.height = Size;
  Canvas.style.boxSizing = "border-box";
  Buffer.width = Size*RATIO;
  Buffer.height = Size;
  Buffer.style.boxSizing = "border-box";
  document.body.appendChild(Canvas);
  //document.body.addEventListener("click", (evt)=>{
  //  if(evt.target != Canvas) AppClose();
  //});

  for(let attr in BodyStyles){
    StyleCache[attr] = document.body.style[attr];
    document.body.style[attr] = BodyStyles[attr];
  }
  
  document.body.appendChild(Button("Back", AppClose));

  Loop = setInterval(Animate, DT);
  if(ENABLE_BLUR) BlurLoop = setInterval(Blur, BLUR_DT);
  Ctx = Canvas.getContext('2d');
  BCtx = Buffer.getContext('2d');
}

function Button(text, handler){
  let button = document.createElement("button");
  button.innerHTML = text;
  if(handler) button.addEventListener("click", handler);
  return button;
}


function Draw(){
  BCtx.fillStyle = "white";
  BCtx.fillRect(0,0,Buffer.width, Buffer.height);
  BCtx.fillStyle = "black";
  BCtx.fillRect(X,30,20,20);
  if(!ENABLE_BLUR){
    Ctx.clearRect(0,0,Canvas.width, Canvas.height);
    Ctx.drawImage(Buffer, 0, 0);
  }
}

function Animate(){
  X = X+30;
  if(X > Canvas.width) X -= Canvas.width - 10;
  Draw();
}
function Blur(){
  Ctx.globalAlpha = 0.55;
  Ctx.drawImage(Buffer, 0, 0);
}

export function Close(){
  for(let attr in BodyStyles){
    document.body.style[attr] = StyleCache[attr];
  }
  if(Loop) clearInterval(Loop);
  if(BlurLoop) clearInterval(BlurLoop);
  console.log("paddle close();");
}
