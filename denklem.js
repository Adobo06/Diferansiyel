// Sadece arayuz.py icinde izin verilen matematiksel ifadeleri kabul eder.
function denklem_olustur(metin) {
  const fonksiyonlar = {sin:Math.sin,cos:Math.cos,tan:Math.tan,exp:Math.exp,log:Math.log,sqrt:Math.sqrt,abs:Math.abs};
  if (!metin.trim() || metin.length > 500) throw new Error("Denklemi giriniz.");
  const tokenler=[];
  const re=/\s+|(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?|[a-zA-Z_]+|\*\*|[+\-*/^()]/y;
  let konum=0;
  while(konum<metin.length){
    re.lastIndex=konum;
    const m=re.exec(metin);
    if(!m) throw new Error("Denklemde izin verilmeyen bir ifade var.");
    if(!/^\s+$/.test(m[0])) tokenler.push(m[0]);
    konum=re.lastIndex;
    if(tokenler.length>300) throw new Error("Denklem cok uzun.");
  }
  let i=0,derinlik=0;
  const bak=()=>tokenler[i];
  const al=()=>tokenler[i++];
  function hata(){throw new Error("Denklem ifadesi hatali.");}
  function ifade(){
    let sol=carpim();
    while(bak()==="+"||bak()==="-"){
      const op=al(),sag=carpim(),eski=sol;
      sol=op==="+"?(x,y)=>eski(x,y)+sag(x,y):(x,y)=>eski(x,y)-sag(x,y);
    }
    return sol;
  }
  function carpim(){
    let sol=isaret();
    while(bak()==="*"||bak()==="/"){
      const op=al(),sag=isaret(),eski=sol;
      sol=op==="*"?(x,y)=>eski(x,y)*sag(x,y):(x,y)=>eski(x,y)/sag(x,y);
    }
    return sol;
  }
  function isaret(){
    if(bak()==="+"){al();return isaret();}
    if(bak()==="-"){al();const a=isaret();return (x,y)=>-a(x,y);}
    return us();
  }
  function us(){
    let sol=temel();
    if(bak()==="**"||bak()==="^"){
      al();const sag=isaret(),eski=sol;
      sol=(x,y)=>Math.pow(eski(x,y),sag(x,y));
    }
    return sol;
  }
  function temel(){
    if(++derinlik>100) hata();
    const t=al();
    let sonuc;
    if(t==="("){sonuc=ifade();if(al()!==")")hata();}
    else if(t!==undefined && /^(?:\d|\.)/.test(t)){
      const sayi=Number(t);
      if(!Number.isFinite(sayi)) hata();
      sonuc=()=>sayi;
    }
    else if(t==="x") sonuc=(x,y)=>x;
    else if(t==="y") sonuc=(x,y)=>y;
    else if(t==="pi") sonuc=()=>Math.PI;
    else if(t==="e") sonuc=()=>Math.E;
    else if(Object.prototype.hasOwnProperty.call(fonksiyonlar,t)){
      if(al()!=="(")hata();
      const a=ifade();if(al()!==")")hata();
      sonuc=(x,y)=>fonksiyonlar[t](a(x,y));
    } else hata();
    derinlik--;
    return sonuc;
  }
  const hesapla=ifade();if(i!==tokenler.length)hata();
  return (x,y)=>{const z=hesapla(x,y);if(!Number.isFinite(z))throw new Error("Fonksiyon sonlu bir deger uretmedi.");return z;};
}