"use client";
import {useEffect,useRef,useState} from "react";
import * as THREE from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";

const locations=[["CENTRAL BANK","Bank"],["EMPLOYMENT CENTRE","Jobs"],["CITY MARKET","Market"],["LUXURY AUTOS","Cars"],["COASTAL CAFE","Cafe"],["APARTMENTS","Home"],["AIRPORT","Travel"]];

function makePerson(skin:number,shirt:number,legs:number){
 const g=new THREE.Group();const skinMat=new THREE.MeshStandardMaterial({color:skin,roughness:.72});const shirtMat=new THREE.MeshStandardMaterial({color:shirt,roughness:.78});const trouserMat=new THREE.MeshStandardMaterial({color:legs,roughness:.82});const shoeMat=new THREE.MeshStandardMaterial({color:0x14171a,roughness:.62});const hairMat=new THREE.MeshStandardMaterial({color:0x17120f,roughness:.9});const eyeMat=new THREE.MeshStandardMaterial({color:0x17110d,roughness:.45});
 const pelvis=new THREE.Mesh(new THREE.BoxGeometry(.62,.38,.42),trouserMat);pelvis.position.y=.88;pelvis.castShadow=true;g.add(pelvis);
 const torso=new THREE.Mesh(new THREE.CapsuleGeometry(.43,.78,8,16),shirtMat);torso.position.y=1.38;torso.scale.set(1,.98,.7);torso.castShadow=true;g.add(torso);
 const neck=new THREE.Mesh(new THREE.CylinderGeometry(.13,.15,.22,12),skinMat);neck.position.y=1.91;g.add(neck);
 const head=new THREE.Mesh(new THREE.SphereGeometry(.36,20,16),skinMat);head.position.y=2.22;head.scale.set(.9,1.06,.88);head.castShadow=true;g.add(head);
 const hair=new THREE.Mesh(new THREE.SphereGeometry(.38,20,12,0,Math.PI*2,0,Math.PI*.58),hairMat);hair.position.y=2.36;hair.scale.set(.96,.95,.94);hair.castShadow=true;g.add(hair);
 for(const x of [-.145,.145]){const eye=new THREE.Mesh(new THREE.SphereGeometry(.035,10,8),eyeMat);eye.position.set(x,2.25,.315);g.add(eye)}const nose=new THREE.Mesh(new THREE.ConeGeometry(.055,.12,8),skinMat);nose.rotation.x=Math.PI/2;nose.position.set(0,2.17,.335);g.add(nose);
 for(const x of [-.36,.36]){const ear=new THREE.Mesh(new THREE.SphereGeometry(.065,10,8),skinMat);ear.position.set(x,2.2,0);g.add(ear)}
 for(const x of [-.21,.21]){const leg=new THREE.Mesh(new THREE.CapsuleGeometry(.145,.68,7,10),trouserMat);leg.position.set(x,.52,0);leg.name="leg";leg.castShadow=true;g.add(leg);const shoe=new THREE.Mesh(new THREE.BoxGeometry(.28,.15,.52),shoeMat);shoe.position.set(x,.12,.1);shoe.castShadow=true;g.add(shoe)}
 for(const x of [-.54,.54]){const arm=new THREE.Mesh(new THREE.CapsuleGeometry(.115,.64,7,10),shirtMat);arm.position.set(x,1.34,0);arm.name="arm";arm.castShadow=true;g.add(arm);const hand=new THREE.Mesh(new THREE.SphereGeometry(.12,12,10),skinMat);hand.position.set(x,1.0,0);g.add(hand)}return g;
}

function makePlayerCharacter(){
 const g=new THREE.Group();
 const skinMat=new THREE.MeshStandardMaterial({color:0x8a5a3c,roughness:.62,metalness:0});
 const skinLight=new THREE.MeshStandardMaterial({color:0x9d6a49,roughness:.58});
 const topMat=new THREE.MeshStandardMaterial({color:0x2f6f69,roughness:.72});
 const shortsMat=new THREE.MeshStandardMaterial({color:0x8b6335,roughness:.78});
 const bootMat=new THREE.MeshStandardMaterial({color:0x4a2d1d,roughness:.72});
 const hairMat=new THREE.MeshStandardMaterial({color:0x25130e,roughness:.82});
 const darkMat=new THREE.MeshStandardMaterial({color:0x17171a,roughness:.72});
 const eyeWhite=new THREE.MeshStandardMaterial({color:0xf4eee6,roughness:.4});
 const irisMat=new THREE.MeshStandardMaterial({color:0x24150e,roughness:.35});

 const pelvis=new THREE.Mesh(new THREE.CapsuleGeometry(.34,.30,8,16),shortsMat);
 pelvis.position.y=.91; pelvis.scale.set(1.12,.85,.82); pelvis.castShadow=true; g.add(pelvis);

 const waist=new THREE.Mesh(new THREE.CylinderGeometry(.30,.34,.18,16),topMat);
 waist.position.y=1.08; waist.castShadow=true; g.add(waist);

 const torso=new THREE.Mesh(new THREE.CapsuleGeometry(.38,.64,10,20),topMat);
 torso.position.y=1.42; torso.scale.set(1.05,1.02,.72); torso.castShadow=true; g.add(torso);

 const chest=new THREE.Mesh(new THREE.SphereGeometry(.34,20,14),topMat);
 chest.position.set(0,1.56,.01); chest.scale.set(1.08,.72,.68); chest.castShadow=true; g.add(chest);

 const neck=new THREE.Mesh(new THREE.CylinderGeometry(.105,.13,.20,14),skinMat);
 neck.position.y=1.91; neck.castShadow=true; g.add(neck);

 const head=new THREE.Mesh(new THREE.SphereGeometry(.34,24,18),skinLight);
 head.position.set(0,2.22,.015); head.scale.set(.91,1.10,.86); head.castShadow=true; g.add(head);

 const jaw=new THREE.Mesh(new THREE.SphereGeometry(.25,20,14),skinLight);
 jaw.position.set(0,2.08,.13); jaw.scale.set(.96,.72,.72); jaw.castShadow=true; g.add(jaw);

 const hairCap=new THREE.Mesh(new THREE.SphereGeometry(.37,24,16,0,Math.PI*2,0,Math.PI*.62),hairMat);
 hairCap.position.set(0,2.35,-.01); hairCap.scale.set(1.01,1.02,.96); hairCap.castShadow=true; g.add(hairCap);

 const pony=new THREE.Mesh(new THREE.CapsuleGeometry(.13,.52,8,12),hairMat);
 pony.position.set(-.22,2.15,-.18); pony.rotation.z=-.25; pony.castShadow=true; g.add(pony);

 for(const x of [-.145,.145]){
   const eye=new THREE.Mesh(new THREE.SphereGeometry(.045,12,10),eyeWhite);
   eye.position.set(x,2.25,.315); eye.scale.set(1,.78,.55); g.add(eye);
   const iris=new THREE.Mesh(new THREE.SphereGeometry(.021,10,8),irisMat);
   iris.position.set(x,2.25,.343); g.add(iris);
   const brow=new THREE.Mesh(new THREE.BoxGeometry(.12,.025,.025),darkMat);
   brow.position.set(x,2.315,.322); brow.rotation.z=x<0?.08:-.08; g.add(brow);
 }
 const nose=new THREE.Mesh(new THREE.ConeGeometry(.045,.105,8),skinLight);
 nose.rotation.x=Math.PI/2; nose.position.set(0,2.17,.34); g.add(nose);
 const lips=new THREE.Mesh(new THREE.SphereGeometry(.045,10,8),new THREE.MeshStandardMaterial({color:0x7f3f3c,roughness:.5}));
 lips.position.set(0,2.08,.325); lips.scale.set(1.45,.5,.45); g.add(lips);
 for(const x of [-.345,.345]){
   const ear=new THREE.Mesh(new THREE.SphereGeometry(.06,12,10),skinLight);
   ear.position.set(x,2.20,.005); ear.scale.set(.72,1.1,.7); g.add(ear);
 }

 for(const x of [-.21,.21]){
   const thigh=new THREE.Mesh(new THREE.CapsuleGeometry(.145,.40,8,12),shortsMat);
   thigh.position.set(x,.69,.005); thigh.name="leg"; thigh.castShadow=true; g.add(thigh);
   const shin=new THREE.Mesh(new THREE.CapsuleGeometry(.12,.48,8,12),skinLight);
   shin.position.set(x,.34,.02); shin.name="leg"; shin.castShadow=true; g.add(shin);
   const boot=new THREE.Mesh(new THREE.BoxGeometry(.25,.27,.46),bootMat);
   boot.position.set(x,.10,.10); boot.castShadow=true; g.add(boot);
   const sole=new THREE.Mesh(new THREE.BoxGeometry(.27,.055,.49),darkMat);
   sole.position.set(x,-.02,.10); sole.castShadow=true; g.add(sole);
 }

 for(const x of [-.48,.48]){
   const upper=new THREE.Mesh(new THREE.CapsuleGeometry(.105,.34,8,12),topMat);
   upper.position.set(x,1.48,0); upper.name="arm"; upper.castShadow=true; g.add(upper);
   const fore=new THREE.Mesh(new THREE.CapsuleGeometry(.085,.34,8,12),skinLight);
   fore.position.set(x,1.20,.01); fore.name="arm"; fore.castShadow=true; g.add(fore);
   const hand=new THREE.Mesh(new THREE.SphereGeometry(.10,12,10),skinLight);
   hand.position.set(x,1.00,.02); hand.castShadow=true; g.add(hand);
 }
 g.userData.isPlayerCharacter=true;
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
  const renderer=new THREE.WebGLRenderer({antialias:true});renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(devicePixelRatio,1.8));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.08;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;ref.current.appendChild(renderer.domElement);
  scene.add(new THREE.HemisphereLight(0xffead1,0x253b35,2.3));const sun=new THREE.DirectionalLight(0xfff0d2,3.2);sun.position.set(-80,120,60);sun.castShadow=true;scene.add(sun);
  const ground=new THREE.Mesh(new THREE.PlaneGeometry(600,600),new THREE.MeshStandardMaterial({color:0x426b4d,roughness:1}));ground.rotation.x=-Math.PI/2;ground.receiveShadow=true;scene.add(ground);
  const roadMat=new THREE.MeshStandardMaterial({color:0x25282a,roughness:.94});const sidewalk=new THREE.MeshStandardMaterial({color:0x85817a,roughness:.95});
  for(const [w,d,x,z] of [[20,600,0,0],[600,20,0,0],[14,600,62,0],[14,600,-62,0],[600,14,0,62],[600,14,0,-62],[14,600,124,0],[14,600,-124,0],[600,14,0,124],[600,14,0,-124]]){const r=new THREE.Mesh(new THREE.PlaneGeometry(w,d),roadMat);r.rotation.x=-Math.PI/2;r.position.set(x,.015,z);scene.add(r)}
  for(const [w,d,x,z] of [[24,600,0,0],[600,24,0,0],[18,600,62,0],[18,600,-62,0],[600,18,0,62],[600,18,0,-62],[18,600,124,0],[18,600,-124,0],[600,18,0,124],[600,18,0,-124]]){const r=new THREE.Mesh(new THREE.PlaneGeometry(w,d),sidewalk);r.rotation.x=-Math.PI/2;r.position.set(x,.01,z);scene.add(r)}
  const lineMat=new THREE.MeshBasicMaterial({color:0xd8c77e});for(let i=-290;i<=290;i+=12){for(const [x,z,rot] of [[0,i,0],[i,0,Math.PI/2]]){const l=new THREE.Mesh(new THREE.PlaneGeometry(.25,5),lineMat);l.rotation.x=-Math.PI/2;l.rotation.z=rot;l.position.set(x,.028,z);scene.add(l)}}
  const districtData: Array<[string,number,number,number,number]>=[["VICTORIA ISLAND",0x1d4d4a,-155,-155,110],["IKOYI",0x304d3d,155,-155,110],["CENTRAL",0x4b4031,-155,155,110],["MAINLAND",0x35444b,155,155,110]];
  for(const [name,color,x,z,size] of districtData){const zone=new THREE.Mesh(new THREE.PlaneGeometry(size,size),new THREE.MeshStandardMaterial({color,roughness:1,transparent:true,opacity:.72}));zone.rotation.x=-Math.PI/2;zone.position.set(x,0,z);scene.add(zone);
    const canvas=document.createElement("canvas");canvas.width=512;canvas.height=128;const ctx=canvas.getContext("2d")!;ctx.fillStyle="#ffffff";ctx.font="bold 34px Arial";ctx.textAlign="center";ctx.fillText(name,256,55);ctx.font="18px Arial";ctx.fillText("LAGOS DISTRICT",256,88);const tex=new THREE.CanvasTexture(canvas);const label=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,transparent:true,depthTest:false}));label.position.set(x,9,z);label.scale.set(35,9,1);scene.add(label)}
  const buildingColliders:Array<{x:number;z:number;half:number}>=[];
  const buildingMat=new THREE.MeshStandardMaterial({color:0xb58e6b,roughness:.82});const glass=new THREE.MeshStandardMaterial({color:0x315866,metalness:.35,roughness:.2});
  for(let x=-260;x<=260;x+=30)for(let z=-260;z<=260;z+=30){if(Math.abs(x)%62<24||Math.abs(z)%62<24)continue;const h=9+Math.abs((x*3+z*5)%24);const b=new THREE.Mesh(new THREE.BoxGeometry(18,h,18),Math.abs(x+z)%90===0?glass:buildingMat);b.position.set(x,h/2,z);b.castShadow=true;b.receiveShadow=true;scene.add(b);buildingColliders.push({x,z,half:9.8});
    for(let y=3;y<h-1;y+=3){for(const side of [-1,1]){const win=new THREE.Mesh(new THREE.BoxGeometry(18.05,.72,1),new THREE.MeshBasicMaterial({color:0x9bb8b7}));win.position.set(x,y,z+side*9.08);scene.add(win)}}
  }
  const treeMat=new THREE.MeshStandardMaterial({color:0x28583d});for(let i=0;i<140;i++){const a=i*2.399,r=150+(i%9)*7,t=new THREE.Group();const trunk=new THREE.Mesh(new THREE.CylinderGeometry(.18,.25,2,7),new THREE.MeshStandardMaterial({color:0x684a31}));trunk.position.y=1;t.add(trunk);const crown=new THREE.Mesh(new THREE.SphereGeometry(1.45,8,6),treeMat);crown.position.y=2.7;t.add(crown);t.position.set(Math.cos(a)*r,0,Math.sin(a)*r);scene.add(t)}
  const traffic:Array<{g:THREE.Group;axis:"x"|"z";speed:number;lane:number}>=[];
  const colors=[0x171b20,0x8c3027,0xd9d0b6,0x31586d,0x232323,0xb8a14b];
  for(let i=0;i<30;i++){const axis=i%2?"z":"x";const g=makeCar(colors[i%colors.length]);const lane=(i%4<2?-1:1)*(i%7%2?5:2.7);const speed=(9+i%5*1.4)*(i%3?1:-1);g.position.set(axis==="x"?-285:lane,.0,axis==="z"?-285:lane);if(axis==="x")g.rotation.y=speed>0?Math.PI/2:-Math.PI/2;else g.rotation.y=speed>0?0:Math.PI;scene.add(g);traffic.push({g,axis,speed,lane})}
  const npcSkins=[0x704a35,0x8a5b40,0x5c3c2e,0x9a6b4c];const npcs:THREE.Group[]=[];
  for(let i=0;i<44;i++){const n=makePerson(npcSkins[i%4],[0x263f50,0x8b4a3b,0x5d426d,0x75643f,0xeeeeea][i%5],[0x222a32,0x3c3030,0x4b3a29][i%3]);n.position.set(((i*47)%500)-250,0,((i*71)%500)-250);n.userData.v=.45+(i%4)*.12;n.userData.axis=i%2?"x":"z";npcs.push(n);scene.add(n)}
  const player=new THREE.Group();
  player.position.set(0,0,7);player.userData.isPlayer=true;scene.add(player);
  const loader=new GLTFLoader();
  const characterUrl="https://raw.githubusercontent.com/Mesh2Motion/mesh2motion-app/main/static/models-variation/human/female.glb";
  const animationUrl="https://raw.githubusercontent.com/Mesh2Motion/mesh2motion-app/main/static/animations/human-base-animations.glb";

  const setupCharacterMaterials=(root:THREE.Object3D)=>{
    const skin=new THREE.MeshStandardMaterial({color:0x9a6548,roughness:.78,metalness:0});
    const skinDark=new THREE.MeshStandardMaterial({color:0x74432f,roughness:.82,metalness:0});
    const hair=new THREE.MeshStandardMaterial({color:0x24140f,roughness:.9,metalness:0});
    const cloth=new THREE.MeshStandardMaterial({color:0x2d5e63,roughness:.78,metalness:0});
    const clothDark=new THREE.MeshStandardMaterial({color:0x3b2b22,roughness:.82,metalness:0});
    const shoe=new THREE.MeshStandardMaterial({color:0x17191c,roughness:.72,metalness:0});
    const eye=new THREE.MeshStandardMaterial({color:0x24150e,roughness:.38,metalness:0});
    const box=new THREE.Box3().setFromObject(root);
    const minY=box.min.y;
    const height=Math.max(box.max.y-box.min.y,.001);
    root.traverse((o:any)=>{
      if(!o.isMesh) return;
      o.castShadow=true;o.receiveShadow=true;
      const n=(o.name||"").toLowerCase();
      const y=(o.getWorldPosition(new THREE.Vector3()).y-minY)/height;
      if(/hair|head_hair|ponytail|braid/.test(n)) o.material=hair;
      else if(/eye|iris|pupil|brow/.test(n)) o.material=eye;
      else if(/shoe|boot|sole/.test(n)) o.material=shoe;
      else if(/shirt|top|jacket|dress|sleeve|torso|chest/.test(n)) o.material=cloth;
      else if(/short|pant|trouser|skirt|bottom/.test(n)) o.material=clothDark;
      else if(y>.78 || /head|face|neck|arm|hand|leg|foot|skin|body/.test(n)) o.material=skin;
    });
  };

  loader.load(characterUrl,(gltf)=>{
    const model=gltf.scene;
    setupCharacterMaterials(model);
    const box=new THREE.Box3().setFromObject(model);
    const size=box.getSize(new THREE.Vector3());
    const center=box.getCenter(new THREE.Vector3());
    const targetHeight=2.25;
    const scale=targetHeight/Math.max(size.y,.001);
    model.scale.setScalar(scale);
    model.position.set(-center.x*scale,-box.min.y*scale,-center.z*scale);
    player.add(model);
    player.userData.model=model;
    player.userData.mixer=new THREE.AnimationMixer(model);
    player.userData.ready=true;
    setNotice("Character loaded");
    loader.load(animationUrl,(animGltf)=>{
      const mixer=player.userData.mixer as THREE.AnimationMixer;
      const clips=animGltf.animations||[];
      const idleClip=clips.find((c)=>/idle|stand|breath/i.test(c.name));
      const walkClip=clips.find((c)=>/walk|jog|run/i.test(c.name))||clips[0];
      player.userData.idle=mixer.clipAction(idleClip||walkClip);
      player.userData.walk=mixer.clipAction(walkClip||idleClip);
      player.userData.activeAction=null;
      const idle=player.userData.idle;
      if(idle){idle.reset().fadeIn(.2).play();player.userData.activeAction=idle;}
      setNotice("Character + animation system ready");
    },undefined,()=>setNotice("Character loaded; animation library unavailable"));
  },undefined,()=>setNotice("Character asset could not load"));
  const keys:Record<string,boolean>={};const down=(e:KeyboardEvent)=>{keys[e.key.toLowerCase()]=true};const up=(e:KeyboardEvent)=>{keys[e.key.toLowerCase()]=false};addEventListener("keydown",down);addEventListener("keyup",up);
  const clock=new THREE.Clock();let raf=0;let walkTime=0;const collides=(x:number,z:number)=>buildingColliders.some(b=>Math.abs(x-b.x)<b.half+.72&&Math.abs(z-b.z)<b.half+.72);function animate(){const dt=Math.min(clock.getDelta(),.05);let dx=0,dz=0;if(keys.w||keys.arrowup)dz-=1;if(keys.s||keys.arrowdown)dz+=1;if(keys.a||keys.arrowleft)dx-=1;if(keys.d||keys.arrowright)dx+=1;const moving=dx||dz;const len=Math.hypot(dx,dz)||1;const nx=THREE.MathUtils.clamp(player.position.x+dx/len*10*dt,-285,285);const nz=THREE.MathUtils.clamp(player.position.z+dz/len*10*dt,-285,285);if(!collides(nx,player.position.z))player.position.x=nx;if(!collides(player.position.x,nz))player.position.z=nz;if(moving){player.rotation.y=Math.atan2(dx,dz);walkTime+=dt*9;const mixer=player.userData.mixer as THREE.AnimationMixer;const action=player.userData.walk;if(action&&player.userData.activeAction!==action){player.userData.activeAction?.fadeOut(.16);action.reset().fadeIn(.16).play();player.userData.activeAction=action;}}else{const action=player.userData.idle;if(action&&player.userData.activeAction!==action){player.userData.activeAction?.fadeOut(.16);action.reset().fadeIn(.16).play();player.userData.activeAction=action;}player.position.y=0}if(player.userData.mixer)player.userData.mixer.update(dt)
    for(const t of traffic){if(t.axis==="x"){t.g.position.x+=t.speed*dt;if(t.g.position.x>300)t.g.position.x=-300;if(t.g.position.x<-300)t.g.position.x=300}else{t.g.position.z+=t.speed*dt;if(t.g.position.z>300)t.g.position.z=-300;if(t.g.position.z<-300)t.g.position.z=300}}
    for(let i=0;i<npcs.length;i++){const n=npcs[i];if(n.userData.axis==="x")n.position.x+=n.userData.v*dt;else n.position.z+=n.userData.v*dt;if(n.position.x>270||n.position.x<-270)n.userData.v*=-1;if(n.position.z>270||n.position.z<-270)n.userData.v*=-1;n.rotation.y=n.userData.axis==="x"?(n.userData.v>0?Math.PI/2:-Math.PI/2):(n.userData.v>0?0:Math.PI)}
    camera.position.lerp(new THREE.Vector3(player.position.x+Math.sin(player.rotation.y)*4,5.5,player.position.z+Math.cos(player.rotation.y)*12),.09);camera.lookAt(player.position.x,1.15,player.position.z);renderer.render(scene,camera);raf=requestAnimationFrame(animate)}
  animate();const resize=()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)};addEventListener("resize",resize);
  return()=>{cancelAnimationFrame(raf);removeEventListener("keydown",down);removeEventListener("keyup",up);removeEventListener("resize",resize);renderer.dispose();ref.current?.removeChild(renderer.domElement)}
 },[]);
 const visit=(name:string)=>setNotice(name+" — location system ready for interaction");
 return <main><div ref={ref} className="scene"/><div className="hud"><div><b>BILLIONAIRE LIFE STYLE</b><small>LAGOS • OPEN WORLD • DISTRICTS</small></div><strong>₦{money.toLocaleString()}</strong></div><aside className="phone"><div className="phone-title">CITY LIFE</div>{locations.map(([n])=><button key={n} onClick={()=>visit(n)}>{n}<span>›</span></button>)}</aside><div className="status">{notice}</div><div className="hint">WASD / ARROWS • WALK / RUN &nbsp; | &nbsp; CHARACTER COLLISION ACTIVE • 4 DISTRICTS • TRAFFIC • PEDESTRIANS</div></main>
}