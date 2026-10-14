const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs');
const src='data:image/jpeg;base64,'+fs.readFileSync('logo_src.jpg').toString('base64');
(async()=>{
 const br=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
 const p=await br.newPage();
 const res=await p.evaluate(async(src)=>{
  const img=new Image(); img.src=src; await img.decode();
  const c=document.createElement('canvas'); c.width=img.width; c.height=img.height;
  const x=c.getContext('2d'); x.drawImage(img,0,0);
  const d=x.getImageData(0,0,c.width,c.height); const a=d.data;
  let minX=1e9,minY=1e9,maxX=0,maxY=0, r=0,g=0,b=0,n=0;
  for(let i=0;i<a.length;i+=4){
    const lum=(a[i]+a[i+1]+a[i+2])/3;
    // alpha from darkness: white->0, dark->255
    let al=Math.max(0,Math.min(255,(235-lum)*255/140));
    if(lum<120){r+=a[i];g+=a[i+1];b+=a[i+2];n++;}
    a[i+3]=al;
    if(al>40){const px=(i/4)%c.width,py=Math.floor(i/4/c.width);minX=Math.min(minX,px);maxX=Math.max(maxX,px);minY=Math.min(minY,py);maxY=Math.max(maxY,py);}
  }
  // set color to solid brand color for crispness
  const R=Math.round(r/n),G=Math.round(g/n),B=Math.round(b/n);
  for(let i=0;i<a.length;i+=4){a[i]=R;a[i+1]=G;a[i+2]=B;}
  x.putImageData(d,0,0);
  const w=maxX-minX+1,h=maxY-minY+1; const o=document.createElement('canvas'); o.width=w;o.height=h;
  o.getContext('2d').drawImage(c,minX,minY,w,h,0,0,w,h);
  // also white version
  const o2=document.createElement('canvas'); o2.width=w;o2.height=h; const x2=o2.getContext('2d'); x2.drawImage(o,0,0);
  x2.globalCompositeOperation='source-in'; x2.fillStyle='#fff'; x2.fillRect(0,0,w,h);
  return {color:`rgb(${R},${G},${B})`, hex:'#'+[R,G,B].map(v=>v.toString(16).padStart(2,'0')).join(''), png:o.toDataURL('image/png'), white:o2.toDataURL('image/png'), w,h};
 },src);
 fs.writeFileSync('stickers/logo_transparente.png',Buffer.from(res.png.split(',')[1],'base64'));
 fs.writeFileSync('logo_white.png',Buffer.from(res.white.split(',')[1],'base64'));
 console.log(res.hex,res.w,res.h); await br.close();
})();
