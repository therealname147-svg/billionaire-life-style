"use client";
import {useEffect,useRef,useState} from "react";
import * as THREE from "three";

const locations=[["CENTRAL BANK","Bank"],["EMPLOYMENT CENTRE","Jobs"],["CITY MARKET","Market"],["LUXURY AUTOS","Cars"],["COASTAL CAFE","Cafe"],["APARTMENTS","Home"],["AIRPORT","Travel"]];
export default function Home(){
 const ref=useRef<HTMLDivElement>(null); const [money,setMoney]=useState(100000); const [notice,setNotice]=useState("Explore the city");
 useEffect(()=>{
  if(!ref.current)return;
  const scene=new THREE.Scene();scene.background=new THREE.Color(0x88aeb6);scene.fog=new THREE.Fog(0x88aeb6,35,250);
  const camera=new THREE.PerspectiveCamera(58,innerWidth/innerHeight,.1,600);camera.position.set(0,6,13);
  const renderer=new THREE.WebGLRenderer({antialias:true});renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(devicePixelRatio,1.8));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;ref.current.appendChild(renderer.domElement);
  scene.add(new THREE.HemisphereLight(0xffedcf,0x30473e,2.2));const sun=new THREE.DirectionalLight(0xfff2cf,3.1);sun.position.set(-60,90,40);sun.castShadow=true;scene.add(sun);
  const ground=new THREE.Mesh(new THREE.PlaneGeometry(500,500),new THREE.MeshStandardMaterial({color:0x416b4d,roughness:1}));ground.rotation.x=-Math.PI/2;ground.receiveShadow=true;scene.add(ground);
  const roadMat=new THREE.MeshStandardMaterial({color:0x25292a,roughness:.95});const lineMat=new THREE.MeshBasicMaterial({color:0xd9c88b});
  for(const [w,d,x,z] of [[18,500,0,0],[500,18,0,0],[12,500,52,0],[12,500,-52,0],[500,12,0,52],[500,12,0,-52]] as const){const r=new THREE.Mesh(new THREE.PlaneGeometry(w,d),roadMat);r.rotation.x=-Math.PI/2;r.position.set(x,.015,z);scene.add(r)}
  for(let i=-240;i<=240;i+=12){for(const [x,z,rot] of [[0,i,0],[i,0,Math.PI/2]] as const){const l=new THREE.Mesh(new THREE.PlaneGeometry(.25,5),lineMat);l.rotation.x=-Math.PI/2;l.rotation.z=rot;l.position.set(x,.025,z);scene.add(l)}}
  const buildingMat=new THREE.MeshStandardMaterial({color:0xb28d68,roughness:.8});const glass=new THREE.MeshStandardMaterial({color:0x365b66,metalness:.3,roughness:.25});
  for(let x=-112;x<=112;x+=28)for(let z=-112;z<=112;z+=28){if(Math.abs(x)<22||Math.abs(z)<22)continue;const h=8+Math.abs((x*3+z*5)%18);const b=new THREE.Mesh(new THREE.BoxGeometry(17,h,17),Math.abs(x+z)%56===0?glass:buildingMat);b.position.set(x,h/2,z);b.castShadow=true;b.receiveShadow=true;scene.add(b);
    for(let y=3;y<h-1;y+=3){const win=new THREE.Mesh(new THREE.BoxGeometry(17.05,.7,1),new THREE.MeshBasicMaterial({color:0x9cb4ad}));win.position.set(x,y,z+8.55);scene.add(win)}
  }
  const treeMat=new THREE.MeshStandardMaterial({color:0x28583d});for(let i=0;i<80;i++){const a=i*2.399,r=90+(i%7)*6,t=new THREE.Group();const trunk=new THREE.Mesh(new THREE.CylinderGeometry(.18,.25,2,7),new THREE.MeshStandardMaterial({color:0x684a31}));trunk.position.y=1;t.add(trunk);const crown=new THREE.Mesh(new THREE.SphereGeometry(1.4,8,6),treeMat);crown.position.y=2.6;t.add(crown);t.position.set(Math.cos(a)*r,0,Math.sin(a)*r);scene.add(t)}
  const carColors=[0x151b20,0x8b2e25,0xddd4b5,0x31546a,0x202020];for(let i=0;i<18;i++){const c=new THREE.Mesh(new THREE.BoxGeometry(2.1,1,4.2),new THREE.MeshStandardMaterial({color:carColors[i%carColors.length],metalness:.35,roughness:.35}));const horizontal=i%2===0;c.position.set(horizontal?-120+i*13:(i%3)*3-3,.7,horizontal?(i%3)*3-3:-120+i*13);c.rotation.y=horizontal?Math.PI/2:0;c.castShadow=true;scene.add(c)}
  const npcMat=new THREE.MeshStandardMaterial({color:0x6b4737});for(let i=0;i<24;i++){const n=new THREE.Group();const body=new THREE.Mesh(new THREE.CapsuleGeometry(.28,.7,5,8),new THREE.MeshStandardMaterial({color:[0x273f50,0x80513d,0x5b3e6c,0x77663d][i%4]}));body.position.y=.8;n.add(body);const head=new THREE.Mesh(new THREE.SphereGeometry(.2,10,8),npcMat);head.position.y=1.45;n.add(head);n.position.set(((i*37)%180)-90,0,((i*61)%180)-90);n.userData.v=(i%2?1:-1)*(.4+i%3*.12);scene.add(n)}
  const player=new THREE.Group();const body=new THREE.Mesh(new THREE.CapsuleGeometry(.55,1.05,6,12),new THREE.MeshStandardMaterial({color:0x2c3440}));body.position.y=1.15;body.castShadow=true;player.add(body);const head=new THREE.Mesh(new THREE.SphereGeometry(.37,16,12),new THREE.MeshStandardMaterial({color:0x754f35}));head.position.y=2.05;head.castShadow=true;player.add(head);player.position.set(0,0,7);scene.add(player);
  const keys:Record<string,boolean>={};const down=(e:KeyboardEvent)=>{keys[e.key.toLowerCase()]=true},up=(e:KeyboardEvent)=>{keys[e.key.toLowerCase()]=false};addEventListener("keydown",down);addEventListener("keyup",up);
  const clock=new THREE.Clock();let raf=0;function animate(){const dt=Math.min(clock.getDelta(),.05);let dx=0,dz=0;if(keys.w||keys.arrowup)dz-=1;if(keys.s||keys.arrowdown)dz+=1;if(keys.a||keys.arrowleft)dx-=1;if(keys.d||keys.arrowright)dx+=1;const len=Math.hypot(dx,dz)||1;player.position.x+=dx/len*9*dt;player.position.z+=dz/len*9*dt;player.position.x=THREE.MathUtils.clamp(player.position.x,-238,238);player.position.z=THREE.MathUtils.clamp(player.position.z,-238,238);if(dx||dz)player.rotation.y=Math.atan2(dx,dz);
    scene.traverse(o=>{if(o.userData.v){o.position.x+=o.userData.v*dt;if(o.position.x>100||o.position.x<-100)o.userData.v*=-1}});
    camera.position.lerp(new THREE.Vector3(player.position.x,5.5,player.position.z+11),.08);camera.lookAt(player.position.x,1.1,player.position.z);renderer.render(scene,camera);raf=requestAnimationFrame(animate)}
  animate();const resize=()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)};addEventListener("resize",resize);
  return()=>{cancelAnimationFrame(raf);removeEventListener("keydown",down);removeEventListener("keyup",up);removeEventListener("resize",resize);renderer.dispose();ref.current?.removeChild(renderer.domElement)}
 },[]);
 const visit=(name:string)=>{setNotice(name+" — coming alive soon");setMoney(v=>v)};
 return <main><div ref={ref} className="scene"/><div className="hud"><div><b>BILLIONAIRE LIFE STYLE</b><small>LAGOS • PERSISTENT CITY</small></div><strong>₦{money.toLocaleString()}</strong></div><aside className="phone"><div className="phone-title">CITY LIFE</div>{locations.map(([n])=><button key={n} onClick={()=>visit(n)}>{n}<span>›</span></button>)}</aside><div className="status">{notice}</div><div className="hint">WASD / ARROWS • Explore &nbsp; | &nbsp; Click a location to plan your next move</div></main>
}