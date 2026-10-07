"use client";
import {useEffect,useRef} from "react";
import * as THREE from "three";

export default function Home(){
 const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  if(!ref.current)return;
  const scene=new THREE.Scene(); scene.background=new THREE.Color(0x8eb7c2); scene.fog=new THREE.Fog(0x8eb7c2,45,260);
  const camera=new THREE.PerspectiveCamera(60,innerWidth/innerHeight,.1,500); camera.position.set(0,7,14);
  const renderer=new THREE.WebGLRenderer({antialias:true}); renderer.setSize(innerWidth,innerHeight); renderer.setPixelRatio(Math.min(devicePixelRatio,2)); renderer.shadowMap.enabled=true; ref.current.appendChild(renderer.domElement);
  scene.add(new THREE.HemisphereLight(0xfff1d0,0x345044,2.2)); const sun=new THREE.DirectionalLight(0xffffff,3); sun.position.set(40,70,20); sun.castShadow=true; scene.add(sun);
  const ground=new THREE.Mesh(new THREE.PlaneGeometry(500,500),new THREE.MeshStandardMaterial({color:0x3f704f,roughness:1})); ground.rotation.x=-Math.PI/2; ground.receiveShadow=true; scene.add(ground);
  const roadMat=new THREE.MeshStandardMaterial({color:0x292d2e}); const road=new THREE.Mesh(new THREE.PlaneGeometry(18,500),roadMat); road.rotation.x=-Math.PI/2; road.position.y=.01; scene.add(road); const road2=road.clone(); road2.geometry=new THREE.PlaneGeometry(500,18); scene.add(road2);
  const buildings:THREE.Mesh[]=[]; const mat=new THREE.MeshStandardMaterial({color:0xb58c61,roughness:.8}); for(let i=-4;i<=4;i++){for(let j=-4;j<=4;j++){if(Math.abs(i)+Math.abs(j)<2)continue; const h=6+((Math.abs(i*13+j*7)%9)); const b=new THREE.Mesh(new THREE.BoxGeometry(8,h,8),mat); b.position.set(i*14,h/2,j*14); b.castShadow=true;b.receiveShadow=true;scene.add(b);buildings.push(b)}}
  const carMat=new THREE.MeshStandardMaterial({color:0x202b32,metalness:.4}); const car=new THREE.Mesh(new THREE.BoxGeometry(2.1,1,4),carMat); car.position.set(7,.7,7); car.castShadow=true; scene.add(car);
  const player=new THREE.Group(); const body=new THREE.Mesh(new THREE.CapsuleGeometry(.55,1.1,6,12),new THREE.MeshStandardMaterial({color:0xd8b36b})); body.position.y=1.25; body.castShadow=true; player.add(body); const head=new THREE.Mesh(new THREE.SphereGeometry(.38,16,12),new THREE.MeshStandardMaterial({color:0x754f35})); head.position.y=2.15; head.castShadow=true; player.add(head); player.position.set(0,0,5); scene.add(player);
  const keys:Record<string,boolean>={}; const down=(e:KeyboardEvent)=>keys[e.key.toLowerCase()]=true,up=(e:KeyboardEvent)=>keys[e.key.toLowerCase()]=false; addEventListener('keydown',down);addEventListener('keyup',up);
  let raf=0; const clock=new THREE.Clock(); function animate(){const dt=Math.min(clock.getDelta(),.05); const speed=8*dt; if(keys.w||keys.arrowup)player.position.z-=speed;if(keys.s||keys.arrowdown)player.position.z+=speed;if(keys.a||keys.arrowleft)player.position.x-=speed;if(keys.d||keys.arrowright)player.position.x+=speed; const target=new THREE.Vector3(player.position.x,4.5,player.position.z+11); camera.position.lerp(target,.09); camera.lookAt(player.position.x,1.2,player.position.z); renderer.render(scene,camera);raf=requestAnimationFrame(animate)} animate();
  const resize=()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)};addEventListener('resize',resize);
  return()=>{cancelAnimationFrame(raf);removeEventListener('keydown',down);removeEventListener('keyup',up);removeEventListener('resize',resize);renderer.dispose();ref.current?.removeChild(renderer.domElement)}
 },[]);
 return <main><div ref={ref} className="scene"/><div className="hud"><b>BILLIONAIRE LIFE STYLE</b><span>Lagos • Open World</span><strong>₦100,000</strong></div><div className="hint">WASD / arrows — move &nbsp; • &nbsp; 3D world foundation</div></main>
}