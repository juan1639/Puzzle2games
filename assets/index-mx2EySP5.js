var t=Object.defineProperty,e=(e,s,o)=>(((e,s,o)=>{s in e?t(e,s,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[s]=o})(e,"symbol"!=typeof s?s+"":s,o),o);import{p as s}from"./phaser-cxBNu8M8.js";!function(){const t=document.createElement("link").relList;if(!(t&&t.supports&&t.supports("modulepreload"))){for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver((t=>{for(const s of t)if("childList"===s.type)for(const t of s.addedNodes)"LINK"===t.tagName&&"modulepreload"===t.rel&&e(t)})).observe(document,{childList:!0,subtree:!0})}function e(t){if(t.ep)return;t.ep=!0;const e=function(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),"use-credentials"===t.crossOrigin?e.credentials="include":"anonymous"===t.crossOrigin?e.credentials="omit":e.credentials="same-origin",e}(t);fetch(t.href,e)}}();const o=class t{static getTxtScore(){return t.txtScore}static getTxtTime(){return t.txtTime}static isGameOver(){return t.gameOver}static getPuntos(){return t.puntos}static getNivel(){return t.nivel}static getRecord(){return t.hi}static getAnimations(){return t.animations}static getAudio(){return t.audio}static setGameOver(e){t.gameOver=e}static setPuntos(e){t.puntos=e}static setNivel(e){t.nivel=e}static setRecord(e){t.hi=e}static setAnimationsVel(e){t.animations.vel=e}static setAudioMusic(e){t.audio.music=e}static setAudioFireWorks(e){t.audio.fireWorks=e}};e(o,"screen",{width:1024,height:768}),e(o,"tileXY",{x:150,y:150}),e(o,"gameOver",!1),e(o,"puntos",0),e(o,"nivel",1),e(o,"hi",151),e(o,"txtScore"," Score: "),e(o,"txtTime"," Time: "),e(o,"pausas",{inicial:4e3,inicialBool:!0,showBonus:3500,nivelSuperado:7e3}),e(o,"depth",{fondo:0,bloques:100,efectos:200,ui:250,marcadores:300,botones:400,textos:500,howtoplay:600}),e(o,"empty",8),e(o,"array_numbers",[[o.empty,o.empty,o.empty],[o.empty,o.empty,o.empty],[o.empty,o.empty,o.empty]]),e(o,"animations",{vel:100}),e(o,"audio",{music:null,fireWorks:null});let i=o;class a{constructor(t,e){this.relatedScene=t,this.datos=e}create(){const{x:t,y:e,txt:s,size:o,color:i,style:a,stroke:r,sizeStroke:n,shadowOsx:h,shadowOsy:l,shadowColor:d,bool1:c,bool2:g,origin:u,elastic:m,dura:p}=this.datos;this.texto=this.relatedScene.add.text(t,e,s,{fontSize:o+"px",fill:i,fontFamily:"verdana, arial, sans-serif",fontStyle:a}),this.texto.setOrigin(u[0],u[1]),this.texto.setStroke(r,n),this.texto.setShadow(h,l,d,2,c,g),this.elastic(s,m,p),console.log(this.texto)}elastic(t,e,s){s>0&&this.relatedScene.tweens.add({targets:this.texto,y:e,ease:"Elastic",duration:s})}get(){return this.texto}}class r extends s.Scene{constructor(){super("Boot")}init(){this.txt=new a(this,{x:Math.floor(this.sys.game.config.width/2),y:Math.floor(this.sys.game.config.height/2),txt:" Touch screen or \n \n  click to start... ",size:60,color:"#ffa",style:"bold",stroke:"#fa1",sizeStroke:16,shadowOsx:2,shadowOsy:2,shadowColor:"#111",bool1:!1,bool2:!0,origin:[.5,.5],elastic:!1,dura:0})}preload(){this.load.image("fondo","assets/img/bg.png")}create(){this.add.image(0,0,"fondo").setOrigin(0,0),this.txt.create(),this.input.on("pointerdown",(()=>this.scene.start("Preloader"))),console.log(this.txt)}}function n(t,e,s,o,a,r,n,h,l,d,c){const g=c.add.particles(t,e,s,{speed:o,lifespan:a,scale:r,tint:n,blendMode:"ADD"});h||c.time.delayedCall(i.pausas.inicial,(()=>g.stop())),d&&g.startFollow(l)}function h(t){let e=t.toString(),s=0,o=0;return t<10?`00:0${e}`:t>59?(s=Math.floor(t/60),o=t-60*s,o<10?s<10?`0${s}:0${o.toString()}`:`${s}:0${o.toString()}`:s<10?`0${s}:${o.toString()}`:`${s}:${o.toString()}`):`00:${e}`}function l(t,e,s){t.volume=s,t.loop=e,t.play()}class d{constructor(t,e){this.relatedScene=t,this.resolve=e}create(){this.paddingX=Math.floor(this.relatedScene.sys.game.config.width/2-i.tileXY.x*i.array_numbers[0].length/2),this.paddingY=Math.floor(this.relatedScene.sys.game.config.height/2-i.tileXY.y*i.array_numbers.length/2),this.lenArrayNumbers=i.array_numbers.length*i.array_numbers[0].length,this.drawNumbers=[],this.resolve?this.drawNumbers=[0,1,2,3,4,5,6,7]:this.set_draw(),this.puzzle_done=[],this.board=this.relatedScene.physics.add.group({key:"tiles-numbers",frame:this.drawNumbers}),Phaser.Actions.SetScale(this.board.getChildren(),i.tileXY.x/this.board.getChildren()[0].width,i.tileXY.y/this.board.getChildren()[0].height),Phaser.Actions.SetOrigin(this.board.getChildren(),0,0),Phaser.Actions.GridAlign(this.board.getChildren(),{width:i.array_numbers[0].length,height:i.array_numbers.length,cellWidth:i.tileXY.x,cellHeight:i.tileXY.y,x:this.paddingX,y:this.paddingY}),this.resolve||this.board.children.iterate(((t,e)=>{t.setInteractive(),t.on("pointerdown",(()=>{console.log("click"+t.x+t.y),this.clickHandler(t)}))})),this.sound_jump=this.relatedScene.sonido_jump,console.log(this.board)}update(){this.puzzle_done=this.check_puzzleDone()}clickHandler(t){if(i.pausas.inicialBool)return;const[e,s]=this.get_matrixIndex(t.y,t.x);this.check_neighbours(e,s,t,!0)}check_neighbours(t,e,s,o){t<2&&i.array_numbers[t+1][e]===i.empty?this.swapEmpty(t,e,1,0,s):t>0&&i.array_numbers[t-1][e]===i.empty?this.swapEmpty(t,e,-1,0,s):e<2&&i.array_numbers[t][e+1]===i.empty?this.swapEmpty(t,e,0,1,s):e>0&&i.array_numbers[t][e-1]===i.empty&&this.swapEmpty(t,e,0,-1,s)}swapEmpty(t,e,s,o,a){i.array_numbers[t+s][e+o]=i.array_numbers[t][e],i.array_numbers[t][e]=i.empty,console.log(i.array_numbers),this.relatedScene.tweens.add({targets:a,x:a.x+o*i.tileXY.x,y:a.y+s*i.tileXY.y,duration:i.animations.vel}),l(this.sound_jump,!1,.7)}get_matrixIndex(t,e){return[(t-this.paddingY)/i.tileXY.y,(e-this.paddingX)/i.tileXY.x]}set_draw(){for(let t=0;t<i.array_numbers.length;t++)for(let e=0;e<i.array_numbers[0].length;e++){if(e===i.array_numbers[0].length-1&&t===i.array_numbers.length-1)continue;let s;do{s=Phaser.Math.Between(0,this.lenArrayNumbers-2)}while(this.drawNumbers.includes(s));i.array_numbers[t][e]=s,this.drawNumbers.push(s)}console.log(i.array_numbers)}check_puzzleDone(){const t=[];let e=-1;for(let s=0;s<i.array_numbers.length;s++)for(let o=0;o<i.array_numbers[0].length;o++)o===i.array_numbers[0].length-1&&s===i.array_numbers.length-1||(e++,i.array_numbers[s][o]===e&&t.push(!0));return t}get(){return this.board}}class c{constructor(t){this.relatedScene=t}create(){const t=Math.floor(this.relatedScene.sys.game.config.width/2-i.tileXY.x*i.array_numbers[0].length/2),e=Math.floor(this.relatedScene.sys.game.config.height/2-i.tileXY.y*i.array_numbers.length/2);this.boardimg=this.relatedScene.add.image(t-4,e-4,"board"),this.boardimg.setDepth(i.depth.fondo).setOrigin(0,0),console.log(this.boardimg)}get(){return this.boardimg}}class g{constructor(t,e){this.relatedScene=t,this.datos=e}create(){const{x:t,y:e,size:s,txt:o,color:a,strokeColor:r,id:n,resuelto:h}=this.datos;let l="";0===n&&(l=`${o}`),2===n&&(l=`${o}`),this.marcador=this.relatedScene.add.text(t,e,l,{fontSize:s+"px",fill:a,fontFamily:"verdana, arial, sans-serif",fontStyle:"bold"}),this.marcador.setOrigin(0,.5).setDepth(i.depth.marcadores),this.marcador.setStroke(r,16).setShadow(2,2,"#111111",2,!1,!0),console.log(this.marcador)}update(t,e){this.marcador.setText(`${t}${e}`)}get(){return this.marcador}}class u{constructor(t,e){this.relatedScene=t,this.args=e}create(){const t=this.relatedScene.sound.add("moneda-mario"),{left:e,top:s,id:o,scX:r,scY:n,angle:h,originX:d,originY:c,texto:g,nextScene:u}=this.args;this.boton=this.relatedScene.add.sprite(e,s,o).setInteractive(),this.boton.setScale(r,n).setAngle(1).setDepth(i.depth.botones),this.txt=new a(this.relatedScene,{x:e,y:s,txt:g,size:30,color:"#ff1",style:"bold",stroke:"#1bd",sizeStroke:16,shadowOsx:2,shadowOsy:2,shadowColor:"#111111",bool1:!1,bool2:!0,origin:[.5,.5],elastic:!1,dura:0}),this.txt.create(),this.txt.get().setDepth(i.depth.textos).setAlpha(1).setScale(1),this.boton.on("pointerover",(()=>{this.boton.setScale(r+.1,n+.1)})),this.boton.on("pointerout",(()=>{this.boton.setScale(r,n)})),this.boton.on("pointerdown",(e=>{i.getAudio().fireWorks&&(i.getAudio().fireWorks.volume=0),l(t,!1,.7),this.relatedScene.scene.start(u)})),this.relatedScene.tweens.add({targets:[this.boton,this.txt.get()],angle:359,ease:"Elastic",yoyo:!0,hold:2e3,duration:3e3,repeat:-1})}get(){return this.boton}}class m{constructor(t,e){this.relatedScene=t,this.args=e}create(){const{x:t,y:e,id:s,scX:o,scY:a,ang:r}=this.args;this.boton=this.relatedScene.add.image(t,e,s).setInteractive(),this.boton.setScale(o,a),this.boton.setAngle(r).setFrame(0).setDepth(i.depth.botones),this.boton.setX(t).setY(e),this.boton.on("pointerover",(()=>{this.boton.setScale(o+.1,a+.1)})),this.boton.on("pointerout",(()=>{this.boton.setScale(o,a)})),this.boton.on("pointerdown",(()=>{this.relatedScene.scale.isFullscreen?this.relatedScene.scale.stopFullscreen():this.relatedScene.scale.startFullscreen()}))}}class p{constructor(t,e){this.relatedScene=t,this.args=e}create(){const t=this.relatedScene.sound.add("moneda-mario"),{left:e,top:s,img:o,scale:r,texto:n,id:h}=this.args;this.chooseGame=this.relatedScene.add.sprite(e,s,o).setInteractive(),this.chooseGame.setOrigin(.5,.5).setScale(r).setDepth(i.depth.botones),this.chooseGame.setData("id",h),this.txt=new a(this.relatedScene,{x:e,y:Math.floor(1.7*s),txt:n,size:45,color:"#ffa",style:"bold",stroke:h,sizeStroke:16,shadowOsx:2,shadowOsy:2,shadowColor:"#111",bool1:!1,bool2:!0,origin:[.5,.5],elastic:!1,dura:0}),this.txt.create(),this.escalaTxt=3*r,this.txt.get().setScale(this.escalaTxt),this.relatedScene.tweens.add({targets:this.txt.get(),scale:1.1,yoyo:!0,duration:1400,repeat:-1}),this.chooseGame.on("pointerover",(()=>{this.txt.get().setScale(this.escalaTxt+.1),this.chooseGame.setScale(r+.1)})),this.chooseGame.on("pointerout",(()=>{this.txt.get().setScale(this.escalaTxt),this.chooseGame.setScale(r)})),this.chooseGame.on("pointerdown",(e=>{console.log("choose game"),l(t,!1,.7),this.relatedScene.scene.start("Game")}))}get(){return this.chooseGame}}class f{constructor(t,e){this.relatedScene=t,this.args=e}create(){const t=this.relatedScene.sound.add("abucheos"),{left:e,top:s,id:o,scX:r,scY:n,angle:h,originX:d,originY:c,texto:g,nextScene:u}=this.args;this.boton=this.relatedScene.add.sprite(e,s,o).setInteractive(),this.boton.setOrigin(d,c).setScale(r,n).setAngle(h).setDepth(i.depth.botones),this.txt=new a(this.relatedScene,{x:e,y:s,txt:g,size:25,color:"#fb1",style:"bold",stroke:"#f61",sizeStroke:8,shadowOsx:2,shadowOsy:2,shadowColor:"#111111",bool1:!1,bool2:!0,origin:[.5,.5],elastic:!1,dura:0}),this.txt.create(),this.txt.get().setDepth(i.depth.botones).setAlpha(1).setScale(1),this.boton.on("pointerover",(()=>{this.boton.setScale(r+.1,n+.1)})),this.boton.on("pointerout",(()=>{this.boton.setScale(r,n)})),this.boton.on("pointerdown",(e=>{g.includes("Esc")&&(i.getAudio().music&&(i.getAudio().music.volume=0),l(t,!1,.8)),g.includes("Music")&&(i.getAudio().music.volume>0?(i.getAudio().music.volume=0,this.txt.get().setAlpha(.3)):(i.getAudio().music.volume=.6,this.txt.get().setAlpha(1))),g.includes("?")&&(this.relatedScene.bg.visible?(this.relatedScene.bg.setVisible(!1),this.relatedScene.txthowtoplay.get().setVisible(!1)):(this.relatedScene.bg.setVisible(!0),this.relatedScene.txthowtoplay.get().setVisible(!0))),""!==u&&this.relatedScene.scene.start(u)}))}get(){return this.boton}}class y extends s.Scene{constructor(){super("Game")}init(){l(i.getAudio().music,!0,.6),i.setGameOver(!1),i.array_numbers=[[i.empty,i.empty,i.empty],[i.empty,i.empty,i.empty],[i.empty,i.empty,i.empty]],this.set_initPause(3500),this.boardimg=new c(this),this.board=new d(this,!1),this.instanciar_marcadores(),this.set_txtHowToPlay()}preload(){}create(){this.imgFondo=this.add.image(0,0,"fondo1").setDepth(i.depth.fondo).setOrigin(0,0),this.imgFondo.setScale(this.sys.game.config.width/this.imgFondo.width,this.sys.game.config.height/this.imgFondo.height),this.ui.forEach((t=>t.setVisible(!0).setDepth(i.depth.ui))),this.set_sonidos(),this.boardimg.create(),this.board.create(),this.marcadorPtos.create(),this.marcadorHi.create(),this.botonfullscreen.create(),this.botonesc.create(),this.botonmusic.create(),this.botonhowtoplay.create()}update(){this.check_puzzleDone()?(console.log("hecho"),this.add.timeline([{at:110,run:()=>{i.getAudio().music&&i.getAudio().music.pause(),this.scene.start("Congratulations")}}]).play()):this.board.update()}check_puzzleDone(){return this.board.puzzle_done.length===i.array_numbers.length*i.array_numbers[0].length-1}set_initPause(t){i.pausas.inicial=t,i.pausas.inicialBool=!0,this.txtpreparado=new a(this,{x:Math.floor(this.sys.game.config.width/2),y:0,txt:" Ready! ",size:78,color:"#ffa",style:"bold",stroke:"#ea1",sizeStroke:16,shadowOsx:2,shadowOsy:2,shadowColor:"#111111",bool1:!1,bool2:!0,origin:[.5,.5],elastic:Math.floor(this.sys.game.config.height/6),dura:3e3}),this.txtpreparado.create(),this.txtpreparado.get().setDepth(i.depth.textos),this.timeline=this.add.timeline([{at:i.pausas.inicial,run:()=>{i.pausas.inicialBool=!1,this.txtpreparado.get().setVisible(!1),this.set_clock(),this.set_txtGo()}}]),this.timeline.play(),console.log(this.txtpreparado)}set_txtGo(){const t=new a(this,{x:Math.floor(this.sys.game.config.width/2),y:Math.floor(this.sys.game.config.height/6),txt:" Go! ",size:80,color:"#ffa",style:"bold",stroke:"#ea1",sizeStroke:16,shadowOsx:2,shadowOsy:2,shadowColor:"#111111",bool1:!1,bool2:!0,origin:[.5,.5],elastic:!1,dura:0});t.create(),t.get().setDepth(i.depth.textos),this.tweens.add({targets:t.get(),alpha:0,duration:2200})}set_clock(){this.playerClock=this.add.timeline([{at:1e3,run:()=>{const t=i.getPuntos(),e=i.getRecord();i.setPuntos(t+1),this.marcadorPtos.update(i.getTxtTime(),h(t)),this.marcadorHi.update(" Hi: ",h(e))}}]),this.playerClock.repeat(-1).play()}instanciar_marcadores(){const t=this.sys.game.config.width,e=this.sys.game.config.height;this.ui=[null,null],this.ui[0]=this.add.image(0,0,"ui-1").setScale(1.4,1).setOrigin(0,0).setVisible(!1),this.ui[1]=this.add.image(Math.floor(this.sys.game.config.width/2.4),0,"ui-1").setScale(1.4,1).setOrigin(0,0).setVisible(!1);const s=Math.floor(this.ui[0].height/2);this.marcadorPtos=new g(this,{x:30,y:s,size:40,txt:i.getTxtTime(),color:"#eee",strokeColor:"#f0bb10",id:0,resuelto:!1}),this.marcadorHi=new g(this,{x:Math.floor(t/2.2),y:s,size:40,txt:" Hi: ",color:"#eee",strokeColor:"#f0bb10",id:2}),this.botonfullscreen=new m(this,{x:Math.floor(t/1.1),y:s,id:"boton-fullscreen",scX:1.2,scY:.8,ang:0}),this.botonesc=new f(this,{left:Math.floor(t/1.1),top:Math.floor(e/6),id:"ui-1",scX:.5,scY:.5,angle:0,originX:.5,originY:.5,texto:" Esc ",nextScene:"PreGame"}),this.botonmusic=new f(this,{left:Math.floor(t/1.1),top:Math.floor(e/3.6),id:"ui-1",scX:.5,scY:.5,angle:0,originX:.5,originY:.5,texto:" Music ",nextScene:""}),this.botonhowtoplay=new f(this,{left:Math.floor(t/1.1),top:Math.floor(e/2.6),id:"ui-1",scX:.5,scY:.5,angle:0,originX:.5,originY:.5,texto:" ? ",nextScene:""})}set_txtHowToPlay(){this.bg=this.add.rectangle(Math.floor(this.sys.game.config.width/2),Math.floor(this.sys.game.config.height/2),Math.floor(this.sys.game.config.width/1.4),Math.floor(this.sys.game.config.height/1.4),7829367),this.bg.setDepth(i.depth.howtoplay).setStrokeStyle(2,11184810).setVisible(!1),this.txthowtoplay=new a(this,{x:Math.floor(this.sys.game.config.width/2),y:Math.floor(this.sys.game.config.height/2),txt:" Try to order the numbers \n from least to greatest. \n   1   2   3 \n   4   5   6 \n   7   8",size:40,color:"#ffa",style:"bold",stroke:"#18a",sizeStroke:16,shadowOsx:2,shadowOsy:2,shadowColor:"#111111",bool1:!1,bool2:!0,origin:[.5,.5],elastic:!1,dura:0}),this.txthowtoplay.create(),this.txthowtoplay.get().setDepth(i.depth.howtoplay).setVisible(!1)}set_sonidos(){this.sonido_jump=this.sound.add("jump"),this.sonido_monedaMario=this.sound.add("moneda-mario")}}class b extends s.Scene{constructor(){super("PreGame")}init(){i.getAudio().music.volume=0,i.setPuntos(0),i.setNivel(1),i.setGameOver(!1);const t=this.sys.game.config.width,e=this.sys.game.config.height;this.choosegame=[],this.choosegame.push(new p(this,{left:Math.floor(t/2-t/4),top:Math.floor(e/2.1),img:"img-menu-numbers",scale:.3,texto:"   Puzzle \n Numbers ",id:"#f71"})),this.choosegame.push(new p(this,{left:Math.floor(t/2+t/4),top:Math.floor(e/2.1),img:"img-menu-jewels",scale:.3,texto:" Puzzle \n Jewels ",id:"#9f1"})),this.txt=new a(this,{x:Math.floor(t/2),y:-200,txt:"         Choose your \n challenge Puzzle-game ",size:64,color:"#ffa",style:"bold",stroke:"#f41",sizeStroke:16,shadowOsx:2,shadowOsy:2,shadowColor:"#111",bool1:!1,bool2:!0,origin:[.5,.5],elastic:!1,dura:0})}create(){this.add.image(0,0,"fondo").setDepth(i.depth.fondo).setOrigin(0,0),this.choosegame.forEach((t=>t.create())),this.txt.create(),this.tweens.add({targets:this.txt.get(),y:Math.floor(this.sys.game.config.height/8),duration:1e3})}get(){return this.txt}}class x extends s.Scene{constructor(){super("MainMenu")}init(){i.setAudioMusic(this.sound.add("music-puzzle-game")),i.setAudioFireWorks(this.sound.add("fireworks")),this.botoninicio=new u(this,{left:Math.floor(this.sys.game.config.width/2),top:Math.floor(this.sys.game.config.height/1.3),id:"boton-nueva-partida",scX:.7,scY:.7,angle:1,originX:.5,originY:.5,texto:" New Game ",nextScene:"PreGame"}),this.txt=new a(this,{x:Math.floor(this.sys.game.config.width/2),y:0,txt:" Puzzle \n     2 \n games ",size:100,color:"#ffa",style:"bold",stroke:"#f51",sizeStroke:16,shadowOsx:2,shadowOsy:2,shadowColor:"#111",bool1:!1,bool2:!0,origin:[.5,.5],elastic:Math.floor(this.sys.game.config.height/3),dura:3e3})}preload(){}create(){const t=this.sys.game.config.width,e=this.sys.game.config.height;this.add.image(0,0,"fondo").setOrigin(0,0),n(t/2,e/2,"particula1",{min:120,max:220},{min:2400,max:2800},{start:1.5,end:0},1175210,!0,null,!1,this),this.txt.create(),this.add.timeline([{at:1800,run:()=>{this.botoninicio.create()}}]).play(),l(i.getAudio().music,!0,.6),console.log(this.txt)}}class w extends s.Scene{constructor(){super("Preloader")}init(){const t=this.sys.game.config.width,e=this.sys.game.config.height;this.load.image("fondo","assets/img/bg.png"),this.add.image(0,0,"fondo").setOrigin(0,0),this.txt=new a(this,{x:Math.floor(t/2),y:Math.floor(e/3.5),txt:" Loading...",size:55,color:"#ffa",style:"bold",stroke:"#f91",sizeStroke:16,shadowOsx:2,shadowOsy:2,shadowColor:"#111",bool1:!1,bool2:!0,origin:[.5,.5],elastic:!1,dura:0}),this.txt.create(),this.add.rectangle(Math.floor(t/2),Math.floor(e/2),Math.floor(t/1.5),Math.floor(e/12)).setStrokeStyle(1,16772744);const s=this.add.rectangle(Math.floor(t/2)-Math.floor(t/3)+4,Math.floor(e/2),4,Math.floor(e/14),16750865);this.load.on("progress",(e=>{s.width=Math.floor(t/1.52)*e}))}preload(){this.load.setPath("assets"),this.load.image("fondo","./img/bg.png");for(let t=1;t<4;t++)this.load.image(`fondo${t}`,`./img/fondo-mosaico${t}.jpg`);this.load.image("ui-1","./img/ui-1.png"),this.load.image("img-menu-numbers","./img/img-puzzle-numbers.png"),this.load.image("img-menu-jewels","./img/img-puzzle-numbers.png"),this.load.image("boton-nueva-partida","./img/ui-newgame.png"),this.load.spritesheet("boton-fullscreen","./img/boton-fullscreen.png",{frameWidth:64,frameHeight:64}),this.load.image("particula-tint","./img/particula-tint.png"),this.load.image("particula1","./img/particula1.png"),this.load.image("tile-blue","./img/tile-blue.png"),this.load.image("board","./img/board-puzzle.png"),this.load.spritesheet("tiles-numbers","./img/ssheet-puzzle-numbers.png",{frameWidth:150,frameHeight:150}),this.load.audio("aplausos","./audio/aplausoseagle.mp3"),this.load.audio("abucheos","./audio/boooh.mp3"),this.load.audio("fireworks","./audio/fireworks.mp3"),this.load.audio("jump","./audio/jumpbros.ogg"),this.load.audio("menu-switch","./audio/menu_switch.mp3"),this.load.audio("music-puzzle-game","./audio/music-puzzle-game1.mp3"),this.load.audio("moneda-mario","./audio/p-ping.mp3")}create(){this.scene.start("MainMenu")}}class S extends Phaser.Scene{constructor(){super({key:"Congratulations"})}init(){this.boardimg=new c(this),this.board=new d(this,!0),this.instanciar_marcadores(),this.botoninicio=new u(this,{left:Math.floor(this.sys.game.config.width/2),top:Math.floor(this.sys.game.config.height/1.3),id:"boton-nueva-partida",scX:.7,scY:.7,angle:1,originX:.5,originY:.5,texto:" Continue ",nextScene:"PreGame"})}create(){this.set_sonidos(),this.add.image(0,0,"fondo").setOrigin(0,0),n(this.sys.game.config.width/2,this.sys.game.config.height/2,"particula1",{min:90,max:320},{min:5500,max:6e3},{start:0,end:1},16763921,!0,null,!1,this),this.ui.forEach((t=>t.setVisible(!0).setDepth(i.depth.ui))),this.boardimg.create(),this.board.create(),this.marcadorPtos.create(),this.marcadorHi.create(),this.botonfullscreen.create(),this.txt=new a(this,{x:Math.floor(this.sys.game.config.width/2),y:Math.floor(this.sys.game.config.height/2.3),txt:" Congratulations! ",size:100,color:"#ffa",style:"bold",stroke:"#f71",sizeStroke:16,shadowOsx:2,shadowOsy:2,shadowColor:"#111111",bool1:!1,bool2:!0,origin:[.5,.5],elastic:!1,dura:0}),this.txt.create(),this.txt.get().setDepth(i.depth.textos).setAlpha(1).setScale(.1),this.tweens.add({targets:this.txt.get(),scale:1,duration:2500}),this.add.timeline([{at:Math.floor(3e3),run:()=>{l(i.getAudio().fireWorks,!1,.9)}},{at:6e3,run:()=>{this.botoninicio.create()}}]).play();const t=i.getPuntos(),e=i.getRecord();this.marcadorPtos.update(i.getTxtTime(),h(t)),this.marcadorHi.update(" Hi: ",h(e)),this.check_newRecord(t,e),l(this.sonido_aplausos,!1,.9),console.log(this.txt)}update(){}check_newRecord(t,e){t<=e&&(console.log("new record!"),i.setRecord(t),this.add.timeline([{at:2500,run:()=>{this.txt=new a(this,{x:Math.floor(this.sys.game.config.width/2),y:Math.floor(this.sys.game.config.height/4),txt:" You set a New Record! ",size:70,color:"#ffa",style:"bold",stroke:"#f11",sizeStroke:16,shadowOsx:2,shadowOsy:2,shadowColor:"#111111",bool1:!1,bool2:!0,origin:[.5,.5],elastic:!1,dura:0}),this.txt.create(),this.txt.get().setDepth(i.depth.textos).setAlpha(1).setScale(1),this.tweens.add({targets:this.txt.get(),angle:359,ease:"Elastic",yoyo:!0,hold:2e3,duration:3e3,repeat:-1})}}]).play())}instanciar_marcadores(){const t=this.sys.game.config.width;this.sys.game.config.height,this.ui=[null,null],this.ui[0]=this.add.image(0,0,"ui-1").setScale(1.4,1).setOrigin(0,0).setVisible(!1),this.ui[1]=this.add.image(Math.floor(this.sys.game.config.width/2.4),0,"ui-1").setScale(1.4,1).setOrigin(0,0).setVisible(!1);const e=Math.floor(this.ui[0].height/2);this.marcadorPtos=new g(this,{x:30,y:e,size:40,txt:i.getTxtTime(),color:"#eee",strokeColor:"#f0bb10",id:0,resuelto:!0}),this.marcadorHi=new g(this,{x:Math.floor(t/2.2),y:e,size:40,txt:" Record: ",color:"#eee",strokeColor:"#f0bb10",id:2}),this.botonfullscreen=new m(this,{x:Math.floor(t/1.1),y:e,id:"boton-fullscreen",scX:1.2,scY:.8,ang:0})}set_sonidos(){this.sonido_aplausos=this.sound.add("aplausos")}}const M={type:Phaser.AUTO,width:1024,height:768,parent:"game-container",backgroundColor:"#857511",physics:{default:"arcade",arcade:{debug:!1}},scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},scene:[r,w,x,y,b,S]};new Phaser.Game(M);