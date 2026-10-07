"use client";
import {useEffect,useRef,useState} from "react";
import * as THREE from "three";

const locations=[["CENTRAL BANK","Bank"],["EMPLOYMENT CENTRE","Jobs"],["CITY MARKET","Market"],["LUXURY AUTOS","Cars"],["COASTAL CAFE","Cafe"],["APARTMENTS","Home"],["AIRPORT","Travel"]];

function makePerson(skin:number,shirt:number,legs:number){
 const g=new THREE.Group();
 const skinMat=new THREE.MeshStandardMaterial({color:skin,roughness:.75});
 const shirtMat=new THREE.MeshStandardMaterial({color:shirt,roughness:.8});
 const trouserMat=new THREE.MeshStandardMaterial({color:legs,roughness:.8});
 const shoeMat=new THREE.MeshStandardMaterial({color:0x16191b,roughness:.65});
 const torso=new THREE.Mesh(new THREE.CapsuleGeometry(.42,.75,6,12),shirtMat); torso.position.y=1.25; torso.scale.set(1,.9,.62); torso.castShadow=true; g.add(torso);
 const head=new THREE.Mesh(new THREE.SphereGeometry(.34,16,12),skinMat); head.position.y=2.15; head.castShadow=true; g.add(head);
 const hair=new THREE.Mesh(new THREE.SphereGeometry(.36,16,10,0,Math.PI*2,0,Math.PI*.48),new THREE.MeshStandardMaterial({color:0x171311,roughness:.9})); hair.position.y=2.29; hair.castShadow=true; g.add(hair);
 for(const x of [-.2,.2]){const leg=new THREE.Mesh(new THREE.CapsuleGeometry(.13,.68,5,8),trouserMat);leg.position.set(x,0.52,0);leg.castShadow=true;g.add(leg);const shoe=new THREE.Mesh(new THREE.BoxGeometry(.25,.12,.48),shoeMat);shoe.position.set(x,.1,.08);shoe.castShadow=true;g.add(shoe)}
 for(const x of [-.55,.55]){const arm=new THREE.Mesh(new THREE.CapsuleGeometry(.11,.62,5,8),shirtMat);arm.position.set(x,1.27,0);arm.rotation.z=x>0?-0.12:0.12;arm.castShadow=true;g.add(arm)}
 return g;
}

function makeCar(color:number){
 const g=new THREE.Group(); const paint=new THREE.MeshStandardMaterial({color,metalness:.45,roughness:.3}); const glass=new THREE.MeshStandardMaterial({color:0x263b43,metalness:.2,roughness:.15});
 const base=new THREE.Mesh(new THREE.BoxGeometry(2.15,.58,4.35),paint);base.position.y=.58;base.castShadow=true;g.add(base);
 const cabin=new THREE.Mesh(new THREE.BoxGeometry(1.72,.72,2.05),glass);cabin.position.set(0,1.03,-.05);cabin.castShadow=true;g.add(cabin);
 for(const x of [-.96,.96])for(const z of [-1.35,1.35]){const w=new THREE.Mesh(new THREE.CylinderGeometry(.34,.34,.18,16),new THREE.MeshStandardMaterial({color:0x111315,roughness:.8}));w.rotation.z=Math.PI/2;w.position.set(x,.43,z);g.add(w)}
 return g;
}

export default function Home(){
 const ref=useRef<HTMLDivElement>(null); const [money,setMoney]=useState(100000); const [notice,setNotice]=useState("Explore Lagos");
 useEffect(()=>{
  if(!ref.current)return;
  const scene=new THREE.Scene();scene.background=new THREE.Color(0x92b4ba);scene.fog=new THREE.Fog(0x92b4ba,45,330);
  const camera=new THREE.PerspectiveCamera(58,innerWidth/innerHeight,.1,800);camera.position.set(0,5.8,14);
  const renderer=new THREE.WebGLRenderer({antialias:true});renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(devicePixelRatio,1.8));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;ref.current.appendChild(renderer.domElement);
  scene.add(new THREE.HemisphereLight(0xffead1,0x253b35,2.3));const sun=new THREE.DirectionalLight(0xfff0d2,3.2);sun.position.set(-80,120,60);sun.castShadow=true;scene.add(sun);
  const ground=new THREE.Mesh(new THREE.PlaneGeometry(600,600),new THREE.MeshStandardMaterial({color:0x426b4d,roughness:1}));ground.rotation.x=-Math.PI/2;ground.receiveShadow=true;scene.add(ground);
  const roadMat=new THREE.MeshStandardMaterial({color:0x25282a,roughness:.94});const sidewalk=new THREE.MeshStandardMaterial({color:0x85817a,roughness:.95});
  for(const [w,d,x,z] of [[20,600,0,0],[600,20,0,0],[14,600,62,0],[14,600,-62,0],[600,14,0,62],[600,14,0,-62],[14,600,124,0],[14,600,-124,0],[600,14,0,124],[600,14,0,-124]]){const r=new THREE.Mesh(new THREE.PlaneGeometry(w,d),roadMat);r.rotation.x=-Math.PI/2;r.position.set(x,.015,z);scene.add(r)}
  for(const [w,d,x,z] of [[24,600,0,0],[600,24,0,0],[18,600,62,0],[18,600,-62,0],[600,18,0,62],[600,18,0,-62],[18,600,124,0],[18,600,-124,0],[600,18,0,124],[600,18,0,-124]]){const r=new THREE.Mesh(new THREE.PlaneGeometry(w,d),sidewalk);r.rotation.x=-Math.PI/2;r.position.set(x,.01,z);scene.add(r)}
  const lineMat=new THREE.MeshBasicMaterial({color:0xd8c77e});for(let i=-290;i<=290;i+=12){for(const [x,z,rot] of [[0,i,0],[i,0,Math.PI/2]]){const l=new THREE.Mesh(new THREE.PlaneGeometry(.25,5),lineMat);l.rotation.x=-Math.PI/2;l.rotation.z=rot;l.position.set(x,.028,z);scene.add(l)}}
  const districtData=[["VICTORIA ISLAND",0x1d4d4a,-155,-155,110],["IKOYI",0x304d3d,155,-155,110],["CENTRAL",0x4b4031,-155,155,110],["MAINLAND",0x35444b,155,155,110]];
  for(const [name,color,x,z,size] of districtData){const zone=new THREE.Mesh(new THREE.PlaneGeometry(size,size),new THREE.MeshStandardMaterial({color,roughness:1,transparent:true,opacity:.72}));zone.rotation.x=-Math.PI/2;zone.position.set(x,0,z);scene.add(zone);
    const canvas=document.createElement("canvas");canvas.width=512;canvas.height=128;const ctx=canvas.getContext("2d")!;ctx.fillStyle="#ffffff";ctx.font="bold 34px Arial";ctx.textAlign="center";ctx.fillText(name,256,55);ctx.font="18px Arial";ctx.fillText("LAGOS DISTRICT",256,88);const tex=new THREE.CanvasTexture(canvas);const label=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,transparent:true,depthTest:false}));label.position.set(x,9,z);label.scale.set(35,9,1);scene.add(label)}
  const buildingMat=new THREE.MeshStandardMaterial({color:0xb58e6b,roughness:.82});const glass=new THREE.MeshStandardMaterial({color:0x315866,metalness:.35,roughness:.2});
  for(let x=-260;x<=260;x+=30)for(let z=-260;z<=260;z+=30){if(Math.abs(x)%62<24||Math.abs(z)%62<24)continue;const h=9+Math.abs((x*3+z*5)%24);const b=new THREE.Mesh(new THREE.BoxGeometry(18,h,18),Math.abs(x+z)%90===0?glass:buildingMat);b.position.set(x,h/2,z);b.castShadow=true;b.receiveShadow=true;scene.add(b);
    for(let y=3;y<h-1;y+=3){for(const side of [-1,1]){const win=new THREE.Mesh(new THREE.BoxGeometry(18.05,.72,1),new THREE.MeshBasicMaterial({color:0x9bb8b7}));win.position.set(x,y,z+side*9.08);scene.add(win)}}
  }
  const treeMat=new THREE.MeshStandardMaterial({color:0x28583d});for(let i=0;i<140;i++){const a=i*2.399,r=150+(i%9)*7,t=new THREE.Group();const trunk=new THREE.Mesh(new THREE.CylinderGeometry(.18,.25,2,7),new THREE.MeshStandardMaterial({color:0x684a31}));trunk.position.y=1;t.add(trunk);const crown=new THREE.Mesh(new THREE.SphereGeometry(1.45,8,6),treeMat);crown.position.y=2.7;t.add(crown);t.position.set(Math.cos(a)*r,0,Math.sin(a)*r);scene.add(t)}
  const traffic:Array<{g:THREE.Group;axis:"x"|"z";speed:number;lane:number}>=[];
  const colors=[0x171b20,0x8c3027,0xd9d0b6,0x31586d,0x232323,0xb8a14b];
  for(let i=0;i<30;i++){const axis=i%2?"z":"x";const g=makeCar(colors[i%colors.length]);const lane=(i%4<2?-1:1)*(i%7%2?5:2.7);const speed=(9+i%5*1.4)*(i%3?1:-1);g.position.set(axis==="x"?-285:lane,.0,axis==="z"?-285:lane);if(axis==="x")g.rotation.y=speed>0?Math.PI/2:-Math.PI/2;else g.rotation.y=speed>0?0:Math.PI;scene.add(g);traffic.push({g,axis,speed,lane})}
  const npcSkins=[0x704a35,0x8a5b40,0x5c3c2e,0x9a6b4c];const npcs:THREE.Group[]=[];
  for(let i=0;i<44;i++){const n=makePerson(npcSkins[i%4],[0x263f50,0x8b4a3b,0x5d426d,0x75643f,0xeeeeea][i%5],[0x222a32,0x3c3030,0x4b3a29][i%3]);n.position.set(((i*47)%500)-250,0,((i*71)%500)-250);n.userData.v=.45+(i%4)*.12;n.userData.axis=i%2?"x":"z";npcs.push(n);scene.add(n)}
  const player=makePerson(0x754f35,0x1d2734,0x252a31);player.position.set(0,0,7);scene.add(player);
  const keys:Record<string,boolean>={};const down=(e:KeyboardEvent)=>{keys[e.key.toLowerCase()]=true};const up=(e:KeyboardEvent)=>{keys[e.key.toLowerCase()]=false};addEventListener("keydown",down);addEventListener("keyup",up);
  const clock=new THREE.Clock();let raf=0;function animate(){const dt=Math.min(clock.getDelta(),.05);let dx=0,dz=0;if(keys.w||keys.arrowup)dz-=1;if(keys.s||keys.arrowdown)dz+=1;if(keys.a||keys.arrowleft)dx-=1;if(keys.d||keys.arrowright)dx+=1;const moving=dx||dz;const len=Math.hypot(dx,dz)||1;player.position.x+=dx/len*10*dt;player.position.z+=dz/len*10*dt;player.position.x=THREE.MathUtils.clamp(player.position.x,-285,285);player.position.z=THREE.MathUtils.clamp(player.position.z,-285,285);if(moving){player.rotation.y=Math.atan2(dx,dz);player.position.y=Math.abs(Math.sin(performance.now()*.012))*0.035}
    for(const t of traffic){if(t.axis==="x"){t.g.position.x+=t.speed*dt;if(t.g.position.x>300)t.g.position.x=-300;if(t.g.position.x<-300)t.g.position.x=300}else{t.g.position.z+=t.speed*dt;if(t.g.position.z>300)t.g.position.z=-300;if(t.g.position.z<-300)t.g.position.z=300}}
    for(let i=0;i<npcs.length;i++){const n=npcs[i];if(n.userData.axis==="x")n.position.x+=n.userData.v*dt;else n.position.z+=n.userData.v*dt;if(n.position.x>270||n.position.x<-270)n.userData.v*=-1;if(n.position.z>270||n.position.z<-270)n.userData.v*=-1;n.rotation.y=n.userData.axis==="x"?(n.userData.v>0?Math.PI/2:-Math.PI/2):(n.userData.v>0?0:Math.PI)}
    camera.position.lerp(new THREE.Vector3(player.position.x+Math.sin(player.rotation.y)*4,5.5,player.position.z+Math.cos(player.rotation.y)*12),.09);camera.lookAt(player.position.x,1.15,player.position.z);renderer.render(scene,camera);raf=requestAnimationFrame(animate)}
  animate();const resize=()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)};addEventListener("resize",resize);
  return()=>{cancelAnimationFrame(raf);removeEventListener("keydown",down);removeEventListener("keyup",up);removeEventListener("resize",resize);renderer.dispose();ref.current?.removeChild(renderer.domElement)}
 },[]);
 const visit=(name:string)=>setNotice(name+" — location system ready for interaction");
 return <main><div ref={ref} className="scene"/><div className="hud"><div><b>BILLIONAIRE LIFE STYLE</b><small>LAGOS • OPEN WORLD • DISTRICTS</small></div><strong>₦{money.toLocaleString()}</strong></div><aside className="phone"><div className="phone-title">CITY LIFE</div>{locations.map(([n])=><button key={n} onClick={()=>visit(n)}>{n}<span>›</span></button>)}</aside><div className="status">{notice}</div><div className="hint">WASD / ARROWS • Walk / Run &nbsp; | &nbsp; 4 DISTRICTS • TRAFFIC • PEDESTRIANS</div></main>
}