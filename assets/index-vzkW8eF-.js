var t=Object.defineProperty,e=(e,s,i)=>(((e,s,i)=>{s in e?t(e,s,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[s]=i})(e,"symbol"!=typeof s?s+"":s,i),i);import{p as s}from"./phaser-cxBNu8M8.js";!function(){const t=document.createElement("link").relList;if(!(t&&t.supports&&t.supports("modulepreload"))){for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver((t=>{for(const s of t)if("childList"===s.type)for(const t of s.addedNodes)"LINK"===t.tagName&&"modulepreload"===t.rel&&e(t)})).observe(document,{childList:!0,subtree:!0})}function e(t){if(t.ep)return;t.ep=!0;const e=function(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),"use-credentials"===t.crossOrigin?e.credentials="include":"anonymous"===t.crossOrigin?e.credentials="omit":e.credentials="same-origin",e}(t);fetch(t.href,e)}}();const i=class t{static getTxtScore(){return t.txtScore}static getTxtTime(){return t.txtTime}static isGameOver(){return t.gameOver}static getPuntos(){return t.puntos}static getNivel(){return t.nivel}static getRecord(){return t.hi}static getAnimations(){return t.animations}static getAudio(){return t.audio}static setGameOver(e){t.gameOver=e}static setPuntos(e){t.puntos=e}static setNivel(e){t.nivel=e}static setRecord(e){t.hi=e}static setAnimationsVel(e){t.animations.vel=e}static setAudioMusic(e){t.audio.music=e}static setAudioFireWorks(e){t.audio.fireWorks=e}};e(i,"screen",{width:1024,height:768}),e(i,"tileXY",{x:150,y:150}),e(i,"gameOver",!1),e(i,"puntos",0),e(i,"nivel",1),e(i,"hi",151),e(i,"txtScore"," Score: "),e(i,"txtTime"," Time: "),e(i,"pausas",{inicial:4e3,inicialBool:!0,showBonus:3500,nivelSuperado:7e3}),e(i,"depth",{fondo:0,bloques:100,efectos:200,ui:250,marcadores:300,botones:400,textos:500,howtoplay:600}),e(i,"empty",8),e(i,"array_numbers",[[i.empty,i.empty,i.empty],[i.empty,i.empty,i.empty],[i.empty,i.empty,i.empty]]),e(i,"animations",{vel:100}),e(i,"audio",{music:null,fireWorks:null});let o=i;class a{constructor(t,e){this.relatedScene=t,this.datos=e}create(){const{x:t,y:e,txt:s,size:i,color:o,style:a,stroke:r,sizeStroke:n,shadowOsx:h,shadowOsy:l,shadowColor:d,bool1:c,bool2:g,origin:m,elastic:u,dura:p}=this.datos;this.texto=this.relatedScene.add.text(t,e,s,{fontSize:i+"px",fill:o,fontFamily:"verdana, arial, sans-serif",fontStyle:a}),this.texto.setOrigin(m[0],m[1]),this.texto.setStroke(r,n),this.texto.setShadow(h,l,d,2,c,g),this.elastic(s,u,p),console.log(this.texto)}elastic(t,e,s){s>0&&this.relatedScene.tweens.add({targets:this.texto,y:e,ease:"Elastic",duration:s})}get(){return this.texto}}class r extends s.Scene{constructor(){super("Boot")}init(){this.txt=new a(this,{x:Math.floor(this.sys.game.config.width/2),y:Math.floor(this.sys.game.config.height/2),txt:" Touch screen or \n \n  click to start... ",size:60,color:"#ffa",style:"bold",stroke:"#fa1",sizeStroke:16,shadowOsx:2,shadowOsy:2,shadowColor:"#111",bool1:!1,bool2:!0,origin:[.5,.5],elastic:!1,dura:0})}preload(){this.load.image("fondo","assets/img/bg.png")}create(){this.add.image(0,0,"fondo").setOrigin(0,0),this.txt.create(),this.input.on("pointerdown",(()=>this.scene.start("Preloader"))),console.log(this.txt)}}function n(t,e,s,i,a,r,n,h,l,d,c){const g=c.add.particles(t,e,s,{speed:i,lifespan:a,scale:r,tint:n,blendMode:"ADD"});h||c.time.delayedCall(o.pausas.inicial,(()=>g.stop())),d&&g.startFollow(l)}function h(t){let e=t.toString(),s=0,i=0;return t<10?`00:0${e}`:t>59?(s=Math.floor(t/60),i=t-60*s,i<10?s<10?`0${s}:0${i.toString()}`:`${s}:0${i.toString()}`:s<10?`0${s}:${i.toString()}`:`${s}:${i.toString()}`):`00:${e}`}function l(t,e,s){t.volume=s,t.loop=e,t.play()}let d=class{constructor(t,e){this.relatedScene=t,this.resolve=e}create(){this.paddingX=Math.floor(this.relatedScene.sys.game.config.width/2-o.tileXY.x*o.array_numbers[0].length/2),this.paddingY=Math.floor(this.relatedScene.sys.game.config.height/2-o.tileXY.y*o.array_numbers.length/2),this.lenArrayNumbers=o.array_numbers.length*o.array_numbers[0].length,this.drawNumbers=[],this.resolve?this.drawNumbers=[0,1,2,3,4,5,6,7]:this.set_draw(),this.puzzle_done=[],this.board=this.relatedScene.physics.add.group({key:"tiles-numbers",frame:this.drawNumbers}),Phaser.Actions.SetScale(this.board.getChildren(),o.tileXY.x/this.board.getChildren()[0].width,o.tileXY.y/this.board.getChildren()[0].height),Phaser.Actions.SetOrigin(this.board.getChildren(),0,0),Phaser.Actions.GridAlign(this.board.getChildren(),{width:o.array_numbers[0].length,height:o.array_numbers.length,cellWidth:o.tileXY.x,cellHeight:o.tileXY.y,x:this.paddingX,y:this.paddingY}),this.resolve||this.board.children.iterate(((t,e)=>{t.setInteractive(),t.on("pointerdown",(()=>{console.log("click"+t.x+t.y),this.clickHandler(t)}))})),this.sound_jump=this.relatedScene.sonido_jump,console.log(this.board)}update(){this.puzzle_done=this.check_puzzleDone()}clickHandler(t){if(o.pausas.inicialBool)return;const[e,s]=this.get_matrixIndex(t.y,t.x);this.check_neighbours(e,s,t)}check_neighbours(t,e,s){t<o.array_numbers.length-1&&o.array_numbers[t+1][e]===o.empty?this.swapEmpty(t,e,1,0,s):t>0&&o.array_numbers[t-1][e]===o.empty?this.swapEmpty(t,e,-1,0,s):e<o.array_numbers[0].length-1&&o.array_numbers[t][e+1]===o.empty?this.swapEmpty(t,e,0,1,s):e>0&&o.array_numbers[t][e-1]===o.empty&&this.swapEmpty(t,e,0,-1,s)}swapEmpty(t,e,s,i,a){o.array_numbers[t+s][e+i]=o.array_numbers[t][e],o.array_numbers[t][e]=o.empty,console.log(o.array_numbers),this.relatedScene.tweens.add({targets:a,x:a.x+i*o.tileXY.x,y:a.y+s*o.tileXY.y,duration:o.animations.vel}),l(this.sound_jump,!1,.7)}get_matrixIndex(t,e){return[(t-this.paddingY)/o.tileXY.y,(e-this.paddingX)/o.tileXY.x]}set_draw(){for(let t=0;t<o.array_numbers.length;t++)for(let e=0;e<o.array_numbers[0].length;e++){if(e===o.array_numbers[0].length-1&&t===o.array_numbers.length-1)continue;let s;do{s=Phaser.Math.Between(0,this.lenArrayNumbers-2)}while(this.drawNumbers.includes(s));o.array_numbers[t][e]=s,this.drawNumbers.push(s)}console.log(o.array_numbers)}check_puzzleDone(){const t=[];let e=-1;for(let s=0;s<o.array_numbers.length;s++)for(let i=0;i<o.array_numbers[0].length;i++)i===o.array_numbers[0].length-1&&s===o.array_numbers.length-1||(e++,o.array_numbers[s][i]===e&&t.push(!0));return t}get(){return this.board}};class c{constructor(t){this.relatedScene=t}create(){const t=Math.floor(this.relatedScene.sys.game.config.width/2-o.tileXY.x*o.array_numbers[0].length/2),e=Math.floor(this.relatedScene.sys.game.config.height/2-o.tileXY.y*o.array_numbers.length/2);this.boardimg=this.relatedScene.add.image(t-4,e-4,"board"),this.boardimg.setDepth(o.depth.fondo).setOrigin(0,0),3===o.array_numbers.length?this.boardimg.setScale(1):this.boardimg.setScale(.89),this.draw_rectangles(t,e),console.log(this.boardimg)}draw_rectangles(t,e){let s=[];for(let i=0;i<o.array_numbers.length;i++)for(let a=0;a<o.array_numbers[0].length;a++)s.push(this.relatedScene.add.rectangle(t+o.tileXY.x*a,e+o.tileXY.y*i,o.tileXY.x-2,o.tileXY.y-2,7693568));s.forEach((t=>{t.setOrigin(0,0)}))}get(){return this.boardimg}}class g{constructor(t,e){this.relatedScene=t,this.datos=e}create(){const{x:t,y:e,size:s,txt:i,color:a,strokeColor:r,id:n,resuelto:h}=this.datos;let l="";0===n&&(l=`${i}`),2===n&&(l=`${i}`),this.marcador=this.relatedScene.add.text(t,e,l,{fontSize:s+"px",fill:a,fontFamily:"verdana, arial, sans-serif",fontStyle:"bold"}),this.marcador.setOrigin(0,.5).setDepth(o.depth.marcadores),this.marcador.setStroke(r,16).setShadow(2,2,"#111111",2,!1,!0),console.log(this.marcador)}update(t,e){this.marcador.setText(`${t}${e}`)}get(){return this.marcador}}class m{constructor(t,e){this.relatedScene=t,this.args=e}create(){const t=this.relatedScene.sound.add("moneda-mario"),{left:e,top:s,id:i,scX:r,scY:n,angle:h,originX:d,originY:c,texto:g,nextScene:m}=this.args;this.boton=this.relatedScene.add.sprite(e,s,i).setInteractive(),this.boton.setScale(r,n).setAngle(1).setDepth(o.depth.botones),this.txt=new a(this.relatedScene,{x:e,y:s,txt:g,size:30,color:"#ff1",style:"bold",stroke:"#1bd",sizeStroke:16,shadowOsx:2,shadowOsy:2,shadowColor:"#111111",bool1:!1,bool2:!0,origin:[.5,.5],elastic:!1,dura:0}),this.txt.create(),this.txt.get().setDepth(o.depth.textos).setAlpha(1).setScale(1),this.boton.on("pointerover",(()=>{this.boton.setScale(r+.1,n+.1)})),this.boton.on("pointerout",(()=>{this.boton.setScale(r,n)})),this.boton.on("pointerdown",(e=>{o.getAudio().fireWorks&&(o.getAudio().fireWorks.volume=0),l(t,!1,.7),this.relatedScene.scene.start(m)})),this.relatedScene.tweens.add({targets:[this.boton,this.txt.get()],angle:359,ease:"Elastic",yoyo:!0,hold:2e3,duration:3e3,repeat:-1})}get(){return this.boton}}class u{constructor(t,e){this.relatedScene=t,this.args=e}create(){const{x:t,y:e,id:s,scX:i,scY:a,ang:r}=this.args;this.boton=this.relatedScene.add.image(t,e,s).setInteractive(),this.boton.setScale(i,a),this.boton.setAngle(r).setFrame(0).setDepth(o.depth.botones),this.boton.setX(t).setY(e),this.boton.on("pointerover",(()=>{this.boton.setScale(i+.1,a+.1)})),this.boton.on("pointerout",(()=>{this.boton.setScale(i,a)})),this.boton.on("pointerdown",(()=>{this.relatedScene.scale.isFullscreen?this.relatedScene.scale.stopFullscreen():this.relatedScene.scale.startFullscreen()}))}}class p{constructor(t,e){this.relatedScene=t,this.args=e}create(){const t=this.relatedScene.sound.add("moneda-mario"),{left:e,top:s,img:i,scale:r,texto:n,id:h,nextScene:d}=this.args;this.chooseGame=this.relatedScene.add.sprite(e,s,i).setInteractive(),this.chooseGame.setOrigin(.5,.5).setScale(r).setDepth(o.depth.botones),this.chooseGame.setData("id",h),this.txt=new a(this.relatedScene,{x:e,y:Math.floor(1.7*s),txt:n,size:45,color:"#ffa",style:"bold",stroke:h,sizeStroke:16,shadowOsx:2,shadowOsy:2,shadowColor:"#111",bool1:!1,bool2:!0,origin:[.5,.5],elastic:!1,dura:0}),this.txt.create(),this.escalaTxt=3*r,this.txt.get().setScale(this.escalaTxt),this.relatedScene.tweens.add({targets:this.txt.get(),scale:1.1,yoyo:!0,duration:1400,repeat:-1}),this.chooseGame.on("pointerover",(()=>{this.txt.get().setScale(this.escalaTxt+.1),this.chooseGame.setScale(r+.1)})),this.chooseGame.on("pointerout",(()=>{this.txt.get().setScale(this.escalaTxt),this.chooseGame.setScale(r)})),this.chooseGame.on("pointerdown",(e=>{console.log("choose game"),l(t,!1,.7),this.relatedScene.scene.start(d)}))}get(){return this.chooseGame}}class y{constructor(t,e){this.relatedScene=t,this.args=e}create(){const t=this.relatedScene.sound.add("abucheos"),{left:e,top:s,id:i,scX:r,scY:n,angle:h,originX:d,originY:c,texto:g,nextScene:m}=this.args;this.boton=this.relatedScene.add.sprite(e,s,i).setInteractive(),this.boton.setOrigin(d,c).setScale(r,n).setAngle(h).setDepth(o.depth.botones),this.txt=new a(this.relatedScene,{x:e,y:s,txt:g,size:25,color:"#fb1",style:"bold",stroke:"#f61",sizeStroke:8,shadowOsx:2,shadowOsy:2,shadowColor:"#111111",bool1:!1,bool2:!0,origin:[.5,.5],elastic:!1,dura:0}),this.txt.create(),this.txt.get().setDepth(o.depth.botones).setAlpha(1).setScale(1),this.boton.on("pointerover",(()=>{this.boton.setScale(r+.1,n+.1)})),this.boton.on("pointerout",(()=>{this.boton.setScale(r,n)})),this.boton.on("pointerdown",(e=>{g.includes("Esc")&&(o.getAudio().music&&(o.getAudio().music.volume=0),l(t,!1,.8)),g.includes("Music")&&(o.getAudio().music.volume>0?(o.getAudio().music.volume=0,this.txt.get().setAlpha(.3)):(o.getAudio().music.volume=.6,this.txt.get().setAlpha(1))),g.includes("?")&&(this.relatedScene.bg.visible?(this.relatedScene.bg.setVisible(!1),this.relatedScene.txthowtoplay.get().setVisible(!1)):(this.relatedScene.bg.setVisible(!0),this.relatedScene.txthowtoplay.get().setVisible(!0))),""!==m&&this.relatedScene.scene.start(m)}))}get(){return this.boton}}class f extends s.Scene{constructor(){super("Game")}init(){this.set_sonidos(),o.setGameOver(!1),o.tileXY={x:150,y:150},o.array_numbers=[[o.empty,o.empty,o.empty],[o.empty,o.empty,o.empty],[o.empty,o.empty,o.empty]],this.set_initPause(3500),this.boardimg=new c(this),this.board=new d(this,!1),this.instanciar_marcadores(),this.set_txtHowToPlay()}preload(){}create(){this.imgFondo=this.add.image(0,0,"fondo1").setDepth(o.depth.fondo).setOrigin(0,0),this.imgFondo.setScale(this.sys.game.config.width/this.imgFondo.width,this.sys.game.config.height/this.imgFondo.height),this.ui.forEach((t=>t.setVisible(!0).setDepth(o.depth.ui))),this.boardimg.create(),this.board.create(),this.marcadorPtos.create(),this.marcadorHi.create(),this.botonfullscreen.create(),this.botonesc.create(),this.botonmusic.create(),this.botonhowtoplay.create()}update(){this.check_puzzleDone()?(console.log("puzzle Done!"),this.add.timeline([{at:110,run:()=>{o.getAudio().music&&o.getAudio().music.pause(),this.scene.start("Congratulations")}}]).play()):this.board.update()}check_puzzleDone(){return this.board.puzzle_done.length===o.array_numbers.length*o.array_numbers[0].length-1}set_initPause(t){l(this.sonido_getReady,!1,.9),o.pausas.inicial=t,o.pausas.inicialBool=!0,this.txtpreparado=new a(this,{x:Math.floor(this.sys.game.config.width/2),y:0,txt:" Ready! ",size:100,color:"#ffa",style:"bold",stroke:"#4f1",sizeStroke:16,shadowOsx:2,shadowOsy:2,shadowColor:"#111111",bool1:!1,bool2:!0,origin:[.5,.5],elastic:Math.floor(this.sys.game.config.height/2),dura:3e3}),this.txtpreparado.create(),this.txtpreparado.get().setDepth(o.depth.textos),this.timeline=this.add.timeline([{at:o.pausas.inicial-200,run:()=>{l(this.sonido_gooo,!1,.9)}},{at:o.pausas.inicial,run:()=>{o.pausas.inicialBool=!1,this.txtpreparado.get().setVisible(!1),l(o.getAudio().music,!0,.6),this.set_clock(),this.set_txtGo()}}]),this.timeline.play(),console.log(this.txtpreparado)}set_txtGo(){const t=new a(this,{x:Math.floor(this.sys.game.config.width/2),y:Math.floor(this.sys.game.config.height/2),txt:" Go! ",size:110,color:"#ffa",style:"bold",stroke:"#4f1",sizeStroke:16,shadowOsx:2,shadowOsy:2,shadowColor:"#111111",bool1:!1,bool2:!0,origin:[.5,.5],elastic:!1,dura:0});t.create(),t.get().setDepth(o.depth.textos),this.tweens.add({targets:t.get(),alpha:0,duration:2200})}set_clock(){this.playerClock=this.add.timeline([{at:1e3,run:()=>{const t=o.getPuntos(),e=o.getRecord();o.setPuntos(t+1),this.marcadorPtos.update(o.getTxtTime(),h(t)),this.marcadorHi.update(" Hi: ",h(e))}}]),this.playerClock.repeat(-1).play()}instanciar_marcadores(){const t=this.sys.game.config.width,e=this.sys.game.config.height;this.ui=[null,null],this.ui[0]=this.add.image(0,0,"ui-1").setScale(1.4,1).setOrigin(0,0).setVisible(!1),this.ui[1]=this.add.image(Math.floor(this.sys.game.config.width/2.4),0,"ui-1").setScale(1.4,1).setOrigin(0,0).setVisible(!1);const s=Math.floor(this.ui[0].height/2);this.marcadorPtos=new g(this,{x:30,y:s,size:40,txt:o.getTxtTime(),color:"#eee",strokeColor:"#f0bb10",id:0,resuelto:!1}),this.marcadorHi=new g(this,{x:Math.floor(t/2.2),y:s,size:40,txt:" Hi: ",color:"#eee",strokeColor:"#f0bb10",id:2}),this.botonfullscreen=new u(this,{x:Math.floor(t/1.1),y:s,id:"boton-fullscreen",scX:1.2,scY:.8,ang:0}),this.botonesc=new y(this,{left:Math.floor(t/1.1),top:Math.floor(e/6),id:"ui-1",scX:.5,scY:.5,angle:0,originX:.5,originY:.5,texto:" Esc ",nextScene:"PreGame"}),this.botonmusic=new y(this,{left:Math.floor(t/1.1),top:Math.floor(e/3.6),id:"ui-1",scX:.5,scY:.5,angle:0,originX:.5,originY:.5,texto:" Music ",nextScene:""}),this.botonhowtoplay=new y(this,{left:Math.floor(t/1.1),top:Math.floor(e/2.6),id:"ui-1",scX:.5,scY:.5,angle:0,originX:.5,originY:.5,texto:" ? ",nextScene:""})}set_txtHowToPlay(){this.bg=this.add.rectangle(Math.floor(this.sys.game.config.width/2),Math.floor(this.sys.game.config.height/2),Math.floor(this.sys.game.config.width/1.4),Math.floor(this.sys.game.config.height/1.4),7829367),this.bg.setDepth(o.depth.howtoplay).setStrokeStyle(2,11184810).setVisible(!1),this.txthowtoplay=new a(this,{x:Math.floor(this.sys.game.config.width/2),y:Math.floor(this.sys.game.config.height/2),txt:" Try to order the numbers \n from least to greatest. \n   1   2   3 \n   4   5   6 \n   7   8",size:40,color:"#ffa",style:"bold",stroke:"#18a",sizeStroke:16,shadowOsx:2,shadowOsy:2,shadowColor:"#111111",bool1:!1,bool2:!0,origin:[.5,.5],elastic:!1,dura:0}),this.txthowtoplay.create(),this.txthowtoplay.get().setDepth(o.depth.howtoplay).setVisible(!1)}set_sonidos(){this.sonido_jump=this.sound.add("jump"),this.sonido_monedaMario=this.sound.add("moneda-mario"),this.sonido_getReady=this.sound.add("get-ready"),this.sonido_gooo=this.sound.add("gooo")}}class b{constructor(t,e){this.relatedScene=t,this.resolve=e}create(){this.paddingX=Math.floor(this.relatedScene.sys.game.config.width/2-o.tileXY.x*o.array_numbers[0].length/2),this.paddingY=Math.floor(this.relatedScene.sys.game.config.height/2-o.tileXY.y*o.array_numbers.length/2),this.lenArrayNumbers=o.array_numbers.length*o.array_numbers[0].length,this.drawNumbers=[],this.resolve?this.drawNumbers=[0,1,2,3,4,5,6,7]:this.set_draw(),this.puzzle_done=!1,this.board=this.relatedScene.physics.add.group({key:"tiles-jewels",frame:this.drawNumbers}),Phaser.Actions.SetScale(this.board.getChildren(),o.tileXY.x/this.board.getChildren()[0].width,o.tileXY.y/this.board.getChildren()[0].height),Phaser.Actions.SetOrigin(this.board.getChildren(),0,0),Phaser.Actions.GridAlign(this.board.getChildren(),{width:o.array_numbers[0].length,height:o.array_numbers.length,cellWidth:o.tileXY.x,cellHeight:o.tileXY.y,x:this.paddingX,y:this.paddingY}),this.resolve||this.board.children.iterate(((t,e)=>{t.setInteractive(),t.on("pointerdown",(()=>{console.log("click"+t.x+t.y),this.clickHandler(t)}))})),this.sound_jump=this.relatedScene.sonido_jump,console.log(this.board)}update(){this.puzzle_done=this.check_puzzleDone()}clickHandler(t){if(o.pausas.inicialBool)return;const[e,s]=this.get_matrixIndex(t.y,t.x);this.check_neighbours(e,s,t)}check_neighbours(t,e,s){t<o.array_numbers.length-1&&o.array_numbers[t+1][e]===o.empty?this.swapEmpty(t,e,1,0,s):t>0&&o.array_numbers[t-1][e]===o.empty?this.swapEmpty(t,e,-1,0,s):e<o.array_numbers[0].length-1&&o.array_numbers[t][e+1]===o.empty?this.swapEmpty(t,e,0,1,s):e>0&&o.array_numbers[t][e-1]===o.empty&&this.swapEmpty(t,e,0,-1,s)}swapEmpty(t,e,s,i,a){o.array_numbers[t+s][e+i]=o.array_numbers[t][e],o.array_numbers[t][e]=o.empty,console.log(o.array_numbers),this.relatedScene.tweens.add({targets:a,x:a.x+i*o.tileXY.x,y:a.y+s*o.tileXY.y,duration:o.animations.vel}),l(this.sound_jump,!1,.7)}get_matrixIndex(t,e){return[(t-this.paddingY)/o.tileXY.y,(e-this.paddingX)/o.tileXY.x]}set_draw(){const t=["diamond_0000","diamond_0000","diamond_0000","diamond_0000","prism_0000","prism_0000","prism_0000","prism_0000","ruby_0000","ruby_0000","ruby_0000","ruby_0000","square_0000","square_0000","square_0000"],e=[];for(let s=0;s<o.array_numbers.length;s++)for(let i=0;i<o.array_numbers[0].length;i++){if(i===o.array_numbers[0].length-1&&s===o.array_numbers.length-1)continue;let a;do{a=Phaser.Math.Between(0,this.lenArrayNumbers-2)}while(e.includes(a));const r=t[a];o.array_numbers[s][i]=r,this.drawNumbers.push(r),e.push(a)}console.log(o.array_numbers)}check_puzzleDone(){const t=[[1,0],[1,1],[1,2],[1,3]];return"diamond_0000"===o.array_numbers[t[0][0]][t[0][1]]&&"diamond_0000"===o.array_numbers[t[1][0]][t[1][1]]&&"diamond_0000"===o.array_numbers[t[2][0]][t[2][1]]&&"diamond_0000"===o.array_numbers[t[3][0]][t[3][1]]}get(){return this.board}}class x extends s.Scene{constructor(){super("Game2")}init(){this.set_sonidos(),o.setGameOver(!1),o.tileXY={x:100,y:100},o.array_numbers=[[o.empty,o.empty,o.empty,o.empty],[o.empty,o.empty,o.empty,o.empty],[o.empty,o.empty,o.empty,o.empty],[o.empty,o.empty,o.empty,o.empty]],this.set_initPause(3500),this.boardimg=new c(this),this.board=new b(this,!1),this.instanciar_marcadores(),this.set_txtHowToPlay()}preload(){}create(){this.imgFondo=this.add.image(0,0,"fondo1").setDepth(o.depth.fondo).setOrigin(0,0),this.imgFondo.setScale(this.sys.game.config.width/this.imgFondo.width,this.sys.game.config.height/this.imgFondo.height),this.ui.forEach((t=>t.setVisible(!0).setDepth(o.depth.ui))),this.boardimg.create(),this.board.create(),this.marcadorPtos.create(),this.marcadorHi.create(),this.botonfullscreen.create(),this.botonesc.create(),this.botonmusic.create(),this.botonhowtoplay.create()}update(){this.check_puzzleDone()?(console.log("puzzle Done!"),this.add.timeline([{at:110,run:()=>{o.getAudio().music&&o.getAudio().music.pause(),this.scene.start("Congratulations")}}]).play()):this.board.update()}check_puzzleDone(){return this.board.puzzle_done}set_initPause(t){l(this.sonido_clickRepeat,!1,.8),this.animaSorteo=this.add.sprite(Math.floor(this.sys.game.config.width/7),Math.floor(this.sys.game.config.height/1.5)),this.animaSorteo.setDepth(o.depth.efectos),this.anims.create({key:"anima-sorteo",frames:this.anims.generateFrameNumbers("jewels-ssheet",{frames:[0,1,2,4]}),frameRate:5,repeat:5}),this.animaSorteo.play("anima-sorteo",!0),this.target=Phaser.Math.Between(0,2),this.anims.create({key:"set-sorteo",frames:this.anims.generateFrameNames("tiles-jewels",{prefix:["diamond_","prism_","ruby_"][this.target],end:15,zeroPad:4}),frameRate:20,repeat:-1}),o.pausas.inicial=t,o.pausas.inicialBool=!0,this.timeline=this.add.timeline([{at:o.pausas.inicial-300,run:()=>{l(this.sonido_gooo,!1,.9),this.sonido_clickRepeat.volume=0,this.animaSorteo.play("set-sorteo",!0)}},{at:o.pausas.inicial,run:()=>{o.pausas.inicialBool=!1,l(o.getAudio().music,!0,.6),this.set_clock(),this.set_txtGo()}}]),this.timeline.play(),console.log(this.txtpreparado)}set_txtGo(){const t=new a(this,{x:Math.floor(this.sys.game.config.width/2),y:Math.floor(this.sys.game.config.height/2),txt:" Go! ",size:110,color:"#ffa",style:"bold",stroke:"#4f1",sizeStroke:16,shadowOsx:2,shadowOsy:2,shadowColor:"#111111",bool1:!1,bool2:!0,origin:[.5,.5],elastic:!1,dura:0});t.create(),t.get().setDepth(o.depth.textos),this.tweens.add({targets:t.get(),alpha:0,duration:2200})}set_clock(){this.playerClock=this.add.timeline([{at:1e3,run:()=>{const t=o.getPuntos(),e=o.getRecord();o.setPuntos(t+1),this.marcadorPtos.update(o.getTxtTime(),h(t)),this.marcadorHi.update(" Hi: ",h(e))}}]),this.playerClock.repeat(-1).play()}instanciar_marcadores(){const t=this.sys.game.config.width,e=this.sys.game.config.height;this.ui=[null,null],this.ui[0]=this.add.image(0,0,"ui-1").setScale(1.4,1).setOrigin(0,0).setVisible(!1),this.ui[1]=this.add.image(Math.floor(this.sys.game.config.width/2.4),0,"ui-1").setScale(1.4,1).setOrigin(0,0).setVisible(!1);const s=Math.floor(this.ui[0].height/2);this.marcadorPtos=new g(this,{x:30,y:s,size:40,txt:o.getTxtTime(),color:"#eee",strokeColor:"#f0bb10",id:0,resuelto:!1}),this.marcadorHi=new g(this,{x:Math.floor(t/2.2),y:s,size:40,txt:" Hi: ",color:"#eee",strokeColor:"#f0bb10",id:2}),this.botonfullscreen=new u(this,{x:Math.floor(t/1.1),y:s,id:"boton-fullscreen",scX:1.2,scY:.8,ang:0}),this.botonesc=new y(this,{left:Math.floor(t/1.1),top:Math.floor(e/6),id:"ui-1",scX:.5,scY:.5,angle:0,originX:.5,originY:.5,texto:" Esc ",nextScene:"PreGame"}),this.botonmusic=new y(this,{left:Math.floor(t/1.1),top:Math.floor(e/3.6),id:"ui-1",scX:.5,scY:.5,angle:0,originX:.5,originY:.5,texto:" Music ",nextScene:""}),this.botonhowtoplay=new y(this,{left:Math.floor(t/1.1),top:Math.floor(e/2.6),id:"ui-1",scX:.5,scY:.5,angle:0,originX:.5,originY:.5,texto:" ? ",nextScene:""})}set_txtHowToPlay(){this.bg=this.add.rectangle(Math.floor(this.sys.game.config.width/2),Math.floor(this.sys.game.config.height/2),Math.floor(this.sys.game.config.width/1.4),Math.floor(this.sys.game.config.height/1.4),7829367),this.bg.setDepth(o.depth.howtoplay).setStrokeStyle(2,11184810).setVisible(!1),this.txthowtoplay=new a(this,{x:Math.floor(this.sys.game.config.width/2),y:Math.floor(this.sys.game.config.height/2),txt:" Try to order the numbers \n from least to greatest. \n   1   2   3 \n   4   5   6 \n   7   8",size:40,color:"#ffa",style:"bold",stroke:"#18a",sizeStroke:16,shadowOsx:2,shadowOsy:2,shadowColor:"#111111",bool1:!1,bool2:!0,origin:[.5,.5],elastic:!1,dura:0}),this.txthowtoplay.create(),this.txthowtoplay.get().setDepth(o.depth.howtoplay).setVisible(!1)}set_sonidos(){this.sonido_jump=this.sound.add("jump"),this.sonido_monedaMario=this.sound.add("moneda-mario"),this.sonido_clickRepeat=this.sound.add("click-repeat"),this.sonido_gooo=this.sound.add("gooo")}}class w extends s.Scene{constructor(){super("PreGame")}init(){o.getAudio().music.volume=0,o.setPuntos(0),o.setNivel(1),o.setGameOver(!1);const t=this.sys.game.config.width,e=this.sys.game.config.height;this.choosegame=[],this.choosegame.push(new p(this,{left:Math.floor(t/2-t/4),top:Math.floor(e/2.1),img:"img-menu-numbers",scale:.3,texto:"   Puzzle \n Numbers ",id:"#f71",nextScene:"Game"})),this.choosegame.push(new p(this,{left:Math.floor(t/2+t/4),top:Math.floor(e/2.1),img:"img-menu-jewels",scale:.3,texto:" Puzzle \n Jewels ",id:"#9f1",nextScene:"Game2"})),this.txt=new a(this,{x:Math.floor(t/2),y:-200,txt:"         Choose your \n challenge Puzzle-game ",size:64,color:"#ffa",style:"bold",stroke:"#f41",sizeStroke:16,shadowOsx:2,shadowOsy:2,shadowColor:"#111",bool1:!1,bool2:!0,origin:[.5,.5],elastic:!1,dura:0})}create(){this.add.image(0,0,"fondo").setDepth(o.depth.fondo).setOrigin(0,0),this.choosegame.forEach((t=>t.create())),this.txt.create(),this.tweens.add({targets:this.txt.get(),y:Math.floor(this.sys.game.config.height/8),duration:1e3})}get(){return this.txt}}class _ extends s.Scene{constructor(){super("MainMenu")}init(){o.setAudioMusic(this.sound.add("music-puzzle-game")),o.setAudioFireWorks(this.sound.add("fireworks")),this.botoninicio=new m(this,{left:Math.floor(this.sys.game.config.width/2),top:Math.floor(this.sys.game.config.height/1.3),id:"boton-nueva-partida",scX:.7,scY:.7,angle:1,originX:.5,originY:.5,texto:" New Game ",nextScene:"PreGame"}),this.txt=new a(this,{x:Math.floor(this.sys.game.config.width/2),y:0,txt:" Puzzle \n     2 \n games ",size:100,color:"#ffa",style:"bold",stroke:"#f51",sizeStroke:16,shadowOsx:2,shadowOsy:2,shadowColor:"#111",bool1:!1,bool2:!0,origin:[.5,.5],elastic:Math.floor(this.sys.game.config.height/3),dura:3e3})}preload(){}create(){const t=this.sys.game.config.width,e=this.sys.game.config.height;this.add.image(0,0,"fondo").setOrigin(0,0),n(t/2,e/2,"particula1",{min:120,max:220},{min:2400,max:2800},{start:1.5,end:0},1175210,!0,null,!1,this),this.txt.create(),this.add.timeline([{at:1800,run:()=>{this.botoninicio.create()}}]).play(),l(o.getAudio().music,!0,.6),console.log(this.txt)}}class S extends s.Scene{constructor(){super("Preloader")}init(){const t=this.sys.game.config.width,e=this.sys.game.config.height;this.load.image("fondo","assets/img/bg.png"),this.add.image(0,0,"fondo").setOrigin(0,0),this.txt=new a(this,{x:Math.floor(t/2),y:Math.floor(e/3.5),txt:" Loading...",size:55,color:"#ffa",style:"bold",stroke:"#f91",sizeStroke:16,shadowOsx:2,shadowOsy:2,shadowColor:"#111",bool1:!1,bool2:!0,origin:[.5,.5],elastic:!1,dura:0}),this.txt.create(),this.add.rectangle(Math.floor(t/2),Math.floor(e/2),Math.floor(t/1.5),Math.floor(e/12)).setStrokeStyle(1,16772744);const s=this.add.rectangle(Math.floor(t/2)-Math.floor(t/3)+4,Math.floor(e/2),4,Math.floor(e/14),16750865);this.load.on("progress",(e=>{s.width=Math.floor(t/1.52)*e}))}preload(){this.load.setPath("assets"),this.load.image("fondo","./img/bg.png");for(let t=1;t<4;t++)this.load.image(`fondo${t}`,`./img/fondo-mosaico${t}.jpg`);this.load.image("ui-1","./img/ui-1.png"),this.load.image("img-menu-numbers","./img/img-puzzle-numbers.png"),this.load.image("img-menu-jewels","./img/img-puzzle-numbers.png"),this.load.image("boton-nueva-partida","./img/ui-newgame.png"),this.load.spritesheet("boton-fullscreen","./img/boton-fullscreen.png",{frameWidth:64,frameHeight:64}),this.load.image("particula-tint","./img/particula-tint.png"),this.load.image("particula1","./img/particula1.png"),this.load.image("tile-blue","./img/tile-blue.png"),this.load.image("board","./img/board-puzzle.png"),this.load.spritesheet("tiles-numbers","./img/ssheet-puzzle-numbers.png",{frameWidth:150,frameHeight:150}),this.load.atlas("tiles-jewels","./img/jewels.png","./img/jewels.json"),this.load.spritesheet("jewels-ssheet","./img/jewels-ssheet.png",{frameWidth:64,frameHeight:64}),this.load.audio("aplausos","./audio/aplausoseagle.mp3"),this.load.audio("abucheos","./audio/boooh.mp3"),this.load.audio("fireworks","./audio/fireworks.mp3"),this.load.audio("jump","./audio/jumpbros.ogg"),this.load.audio("menu-switch","./audio/menu_switch.mp3"),this.load.audio("music-puzzle-game","./audio/music-puzzle-game1.mp3"),this.load.audio("moneda-mario","./audio/p-ping.mp3"),this.load.audio("get-ready","./audio/get-ready.mp3"),this.load.audio("gooo","./audio/gooo.mp3"),this.load.audio("click-repeat","./audio/click-repeat.mp3")}create(){this.scene.start("MainMenu")}}class M extends Phaser.Scene{constructor(){super({key:"Congratulations"})}init(){this.boardimg=new c(this),this.board=new d(this,!0),this.instanciar_marcadores(),this.botoninicio=new m(this,{left:Math.floor(this.sys.game.config.width/2),top:Math.floor(this.sys.game.config.height/1.3),id:"boton-nueva-partida",scX:.7,scY:.7,angle:1,originX:.5,originY:.5,texto:" Continue ",nextScene:"PreGame"})}create(){this.set_sonidos(),this.add.image(0,0,"fondo").setOrigin(0,0),n(this.sys.game.config.width/2,this.sys.game.config.height/2,"particula1",{min:90,max:320},{min:5500,max:6e3},{start:0,end:1},16763921,!0,null,!1,this),this.ui.forEach((t=>t.setVisible(!0).setDepth(o.depth.ui))),this.boardimg.create(),this.board.create(),this.marcadorPtos.create(),this.marcadorHi.create(),this.botonfullscreen.create(),this.txt=new a(this,{x:Math.floor(this.sys.game.config.width/2),y:Math.floor(this.sys.game.config.height/2.3),txt:" Congratulations! ",size:100,color:"#ffa",style:"bold",stroke:"#f71",sizeStroke:16,shadowOsx:2,shadowOsy:2,shadowColor:"#111111",bool1:!1,bool2:!0,origin:[.5,.5],elastic:!1,dura:0}),this.txt.create(),this.txt.get().setDepth(o.depth.textos).setAlpha(1).setScale(.1),this.tweens.add({targets:this.txt.get(),scale:1,duration:2500}),this.add.timeline([{at:Math.floor(3e3),run:()=>{l(o.getAudio().fireWorks,!1,.9)}},{at:6e3,run:()=>{this.botoninicio.create()}}]).play();const t=o.getPuntos(),e=o.getRecord();this.marcadorPtos.update(o.getTxtTime(),h(t)),this.marcadorHi.update(" Hi: ",h(e)),this.check_newRecord(t,e),l(this.sonido_aplausos,!1,.9),console.log(this.txt)}update(){}check_newRecord(t,e){t<=e&&(console.log("new record!"),o.setRecord(t),this.add.timeline([{at:2500,run:()=>{this.txt=new a(this,{x:Math.floor(this.sys.game.config.width/2),y:Math.floor(this.sys.game.config.height/4),txt:" You set a New Record! ",size:70,color:"#ffa",style:"bold",stroke:"#f11",sizeStroke:16,shadowOsx:2,shadowOsy:2,shadowColor:"#111111",bool1:!1,bool2:!0,origin:[.5,.5],elastic:!1,dura:0}),this.txt.create(),this.txt.get().setDepth(o.depth.textos).setAlpha(1).setScale(1),this.tweens.add({targets:this.txt.get(),angle:359,ease:"Elastic",yoyo:!0,hold:2e3,duration:3e3,repeat:-1})}}]).play())}instanciar_marcadores(){const t=this.sys.game.config.width;this.sys.game.config.height,this.ui=[null,null],this.ui[0]=this.add.image(0,0,"ui-1").setScale(1.4,1).setOrigin(0,0).setVisible(!1),this.ui[1]=this.add.image(Math.floor(this.sys.game.config.width/2.4),0,"ui-1").setScale(1.4,1).setOrigin(0,0).setVisible(!1);const e=Math.floor(this.ui[0].height/2);this.marcadorPtos=new g(this,{x:30,y:e,size:40,txt:o.getTxtTime(),color:"#eee",strokeColor:"#f0bb10",id:0,resuelto:!0}),this.marcadorHi=new g(this,{x:Math.floor(t/2.2),y:e,size:40,txt:" Record: ",color:"#eee",strokeColor:"#f0bb10",id:2}),this.botonfullscreen=new u(this,{x:Math.floor(t/1.1),y:e,id:"boton-fullscreen",scX:1.2,scY:.8,ang:0})}set_sonidos(){this.sonido_aplausos=this.sound.add("aplausos")}}const k={type:Phaser.AUTO,width:1024,height:768,parent:"game-container",backgroundColor:"#857511",physics:{default:"arcade",arcade:{debug:!1}},scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},scene:[r,S,_,f,x,w,M]};new Phaser.Game(k);