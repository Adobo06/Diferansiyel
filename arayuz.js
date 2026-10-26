// arayuz.py dosyasinin sade web arayuzu: form, grafik ve veri tablosu.
const form=document.getElementById("cozum-formu");
const hataKutusu=document.getElementById("hata");
const canvas=document.getElementById("grafik");
const govde=document.getElementById("tablo-govdesi");
const aciklama=document.getElementById("tablo-aciklama");
let sonCozum=null;
function tabloSayisi(n){
  if(n!==0&&(Math.abs(n)>=1e9||Math.abs(n)<1e-6))return n.toExponential(8);
  return n.toFixed(8);
}
function tabloyuDoldur(xs,ys){
  govde.replaceChildren();
  const frag=document.createDocumentFragment();
  for(let i=0;i<xs.length;i++){
    const tr=document.createElement("tr");
    for(const value of [String(i),tabloSayisi(xs[i]),tabloSayisi(ys[i])]){
      const td=document.createElement("td");
      td.textContent=value;
      tr.append(td);
    }
    frag.append(tr);
  }
  govde.append(frag);
  aciklama.textContent=(xs.length-1)+" adim hesaplandi. Baslangic noktasi ile toplam "+xs.length+" satir.";
}
function etiket(n){
  if(Math.abs(n)>=10000 || (n!==0&&Math.abs(n)<0.001)) return n.toExponential(2);
  return Number(n.toFixed(4)).toString();
}
function grafigiCiz(xs=null,ys=null,yontem=""){
  const w=Math.max(280,canvas.clientWidth),h=Math.max(260,canvas.clientHeight),dpr=window.devicePixelRatio||1;
  canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);
  const c=canvas.getContext("2d");c.setTransform(dpr,0,0,dpr,0,0);
  c.fillStyle="#fff";c.fillRect(0,0,w,h);
  const left=w<=500?56:67,right=25,top=48,bottom=56;
  const gw=w-left-right,gh=h-top-bottom;
  let xmin=xs?Math.min(...xs):0,xmax=xs?Math.max(...xs):1;
  let ymin=ys?Math.min(...ys):0,ymax=ys?Math.max(...ys):1;
  if(xmin===xmax){xmin-=1;xmax+=1;}
  if(ymin===ymax){ymin-=1;ymax+=1;}
  const pad=(ymax-ymin)*0.07;ymin-=pad;ymax+=pad;
  const px=x=>left+(x-xmin)/(xmax-xmin)*gw;
  const py=y=>top+gh-(y-ymin)/(ymax-ymin)*gh;
  c.font="12px Arial";c.strokeStyle="#dadada";c.fillStyle="#333";c.lineWidth=1;
  for(let i=0;i<=5;i++){
    const gx=left+gw*i/5,gy=top+gh*i/5;
    c.beginPath();c.moveTo(gx,top);c.lineTo(gx,top+gh);c.stroke();
    c.beginPath();c.moveTo(left,gy);c.lineTo(left+gw,gy);c.stroke();
    c.textAlign="center";c.fillText(etiket(xmin+(xmax-xmin)*i/5),gx,top+gh+20);
    c.textAlign="right";c.fillText(etiket(ymax-(ymax-ymin)*i/5),left-9,gy+4);
  }
  c.strokeStyle="#333";c.strokeRect(left,top,gw,gh);
  c.font="14px Arial";c.textAlign="center";
  c.fillText("x",left+gw/2,h-14);
  c.save();c.translate(16,top+gh/2);c.rotate(-Math.PI/2);c.fillText("y(x)",0,0);c.restore();
  if(xs&&ys){
    c.fillText("Sayisal cozum - "+yontem,left+gw/2,25);
    c.beginPath();c.moveTo(px(xs[0]),py(ys[0]));
    for(let i=1;i<xs.length;i++)c.lineTo(px(xs[i]),py(ys[i]));
    c.strokeStyle="#1f77b4";c.lineWidth=1.6;c.stroke();
    c.fillStyle="#1f77b4";
    for(let i=0;i<xs.length;i++){
      c.beginPath();c.arc(px(xs[i]),py(ys[i]),1.7,0,2*Math.PI);c.fill();
    }
  }
}
form.addEventListener("submit",event=>{
  event.preventDefault();hataKutusu.hidden=true;
  try{
    const f=denklem_olustur(document.getElementById("denklem").value.trim());
    const xi=Number(document.getElementById("x0").value),yi=Number(document.getElementById("y0").value);
    const xmax=Number(document.getElementById("xb").value);
    const nos=Number(document.getElementById("adim").value);
    const key=Number(document.getElementById("yontem").value);
    if(![xi,yi,xmax].every(Number.isFinite))throw new Error("Degerler sonlu sayilar olmali.");
    if(!Number.isInteger(nos)||nos<1||nos>10000)throw new Error("Adim sayisi 1 ile 10000 arasinda olmali.");
    const [xs,ys]=coz(f,xi,yi,xmax,nos,key);
    const yontem=document.getElementById("yontem").selectedOptions[0].text;
    sonCozum={xs,ys,yontem};
    grafigiCiz(xs,ys,yontem);tabloyuDoldur(xs,ys);
  }catch(err){hataKutusu.textContent="Girdi hatasi: "+(err.message||String(err));hataKutusu.hidden=false;}
});
window.addEventListener("resize",()=>sonCozum?grafigiCiz(sonCozum.xs,sonCozum.ys,sonCozum.yontem):grafigiCiz());
grafigiCiz();