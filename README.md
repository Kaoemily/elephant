# elephant
# 大象射擊遊戲

## sketch.js
```javascript=
// let points = [
// [7,10],[12,6],[12,4],[9,1],[10,-2],[10,-7],[5,-10],[1,-11],[1,-13],[-3,-13],[-14,-4],[-13,4],
// [-11,9],[-12,13],[-10,16],[-8,17],[-5,13],[3,13],[7,16],[10,15],[10,13],[7,10]
// ]


// let points =[[6, -3], [5, 0], [7, 2],[7,4],[6,5],[9,5],[9,6],[8,7],[7,8],[6,8],[5,10],[4,10],[4,9],[5,8],[4,5],[0,5],[-2,4],[-4,1],[-4,-6],[-5,-7],[-10,-6],[-9,-7],[-4,-8],[-3,-7],[-1,-5],[4,4],[3,2],[3,1],[5,-3],[4,-4],[5,-4],[6,-3],[4,1],[5,2],[1,-4],[2,-5],[2,-8],[8,-8],[7,-7],[3,-7],[3,-1],[4,-1],[3,-1],[2,-3],[0,-5],[-4,-2],[-3,-4],[-1,-5],[-1,-9],[5,-10],[6,-9],[0,-8],[0,-5],[1,0],[-1,3],[5,-4],[6,-4],[7,-3],[6,1]];


let points = [[-2, 0], [-1,-1], [0, -1],[1,0],[1,2],[0,3],[-1,3],[-2,2],[-3,2],[-4,1],[-4,-2],[-5,-4],[-4,-4],[-3,-2],[-2,-1],[-2,-3], [-2,-4], [-1, -4],[0,-4],[0,-2],[2,-2],[2,-4], [4, -4],[4,1],[3,2],[1,2],[1,2]]; //list資料，
var fill_colors = "e9f5db-cfe1b9-b5c99a-97a97c-87986a-718355-d8f3dc-b7e4c7-95d5b2-74c69d-52b788-40916c-2d6a4f-1b4332-081c15".split("-").map(a=>"#"+a)
var line_colors = "ede0d4-e6ccb2-ddb892-b08968-7f5539-9c6644".split("-").map(a=>"#"+a)

//++++++設定畫points所有"點"的物件變數++++++
var ball  //目前要處理的物件，暫時放在ball(隨意取)變數內 
var balls = []  //把產生的"所有"的物件，為物件的倉庫，所有資料都在此

//++++++設定飛彈物件的變數++++++
var bullet  //"目前要處理"的物件，暫時放在bullet變數內
var bullets = []  //把產生"所有"的物件，為物件的倉庫，所有物件資料都在此

//++++++設定怪物物件的變數++++++
var monster  //"目前要處理"的物件，暫時放在monster變數內
var monsters = []  //把產生"所有"的物件，為物件的倉庫，所有物件資料都在此

//++++++設定砲台的位置++++++
var shipP

var score = 0

function preload(){  //程式碼準備執行之前，所執行的程式碼內容，比setup()更早執行
  elephant_sound = loadSound("sound/elephant.wav")
  bullet_sound = loadSound("sound/Launching wire.wav")
} 

function setup() {
  createCanvas(windowWidth,windowHeight);
  shipP = createVector(width/2,height/2)  //預設砲台的位置為(width/2,height/2)

  for(var i=0;i<20;i=i+1){  //i=0,1,2,3,4......,8,9
    ball = new Obj({})  //產生一個Obj class元件
    balls.push(ball)  //把ball的物件放入到balls陣列內
  }
  for(var i=0;i<20;i=i+1){  //i=0,1,2,3,4......,8,9
    monster = new Monster({})  //產生一個Monster class元件
    monsters.push(monster)  //把ball的物件放入到monsters陣列內
  }

}

function draw() {
  background(220);
  // for(var j=0;j<balls.length;j++){
  //   ball = balls[j]
  //   ball.draw()
  //   ball.update()
  // }

  if(keyIsPressed){
    if(key=="ArrowLeft" || key == "a"){  //按下鍵盤的往左鍵
      shipP.x = shipP.x-5
    }
    if(key=="ArrowRight" || key == "d"){  //按下鍵盤的往右鍵
      shipP.x = shipP.x+5
    }
    if(key=="ArrowUp" || key == "w"){  //按下鍵盤的往上鍵
      shipP.y = shipP.y-5
    }
    if(key=="ArrowDown" || key == "s"){  //按下鍵盤的往下鍵
      shipP.y = shipP.y+5
    }
  }
  for(let ball of balls){  //只要是陣列的方式，都可以利用此方式來做
    ball.draw()
    ball.update()
    for(let bullet of bullets){  //檢查每一個物件
      if(ball.isBallinRanger(bullet.p.x,bullet.p.y)){
        balls.splice(balls.indexOf(ball),1)  //從倉庫balls取出被滑鼠按到的物件編號(ball.indexOf(ball)只取1個
        bullets.splice(bullets.indexOf(bullet),1)
        score = score+1
        elephant_sound.play()
      }
    }
  }

  //++++++++++飛彈的顯示+++++++++
  for(let bullet of bullets){  //只要是陣列的方式，都可使用此方式處理
    bullet.draw()
    bullet.update()
  }

  //++++++++++怪物的顯示++++++++
  for(let monster of monsters)  //只要是陣列的方式，都可以利用此方式來做
      {
        if(monster.dead == true  && monster.timenum>4 ){
          monsters.splice(monsters.indexOf(monster),1)  //從倉庫monster取出，只取一個
        }
        monster.draw()
        monster.update()
        for(let bullet of bullets){  //檢查每一個物件
          if(monster.isBallInRanger(bullet.p.x,bullet.p.y)){
            //monsters.splice(monsters.indexOf(monster),1)  //從倉庫monsters取出，只取1個
            bullets.splice(bullets.indexOf(bullet),1)
            score = score+1
            monster.dead = true //
            //elephant_sound.play()
        }
       }
    }

  textSize(50)
  text(score,50,50)  //在座標為(50,50)上顯示score分數內容

  push()  //重新規劃原點(0,0)
    let dx = mouseX - width/2
    let dy = mouseY - height/2
    let angle = atan2(dy,dx)  //分子:dy 分母:dx
    translate(shipP.x,shipP.y)
    fill("#b8d0eb")
    noStroke()
    rotate(angle)
    triangle(50,0,-25,25,-25,-25) 
    //triangle(-25,25,25,25,0,-50)  //設定三個點，畫成一個三角形
    fill("#5390d9")
    ellipse(0,0,15)
  pop()  //恢復原本設定，原點(0,0)在視窗左上角
  
}



function mousePressed(){
  //++++++++++++++++++產生一個物件++++++++++++++++++++++++
  // ball = new Obj({  //在滑鼠按下產生一個新的Obj class元件
  //   p:{x:mouseX,y:mouseY}
  // }) 
  // balls.push(ball)  //把ball的物件放入到balls陣列內
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++


  //++++++在物件上按下滑鼠，物件消失不見，分數加一分+++++++
  //   for(let ball of balls){  //檢查每一個物件
  //     if(ball.isBallinRanger(mouseX,mouseY)){
  //       balls.splice(balls.indexOf(ball),1)  //從倉庫balls取出被滑鼠按到的物件編號(ball.indexOf(ball)只取1個
  //       score = score+1
  //     }
  //   }

 //++++++按一下產生一個飛彈+++++++
 bullet = new Bullet({r:20})  //在滑鼠按下的地方，產生一個新的Bullet class元件(產生一個飛彈)  //大括號內可以加上參數
 bullets.push(bullet)  //把bullet的物件放入bullets陣列內(放入倉庫)
 bullet_sound.play()
}
 //++++++++++++++++++++++++++++++++++++++++++++++++++++++


function keyPressed(){
  if(key==" "){  //按下空白鍵，發射飛彈，其實跟按下滑鼠的功能一樣
    bullet = new Bullet({r:20})  //在滑鼠按下的地方，產生一個新的Bullet class
    bullets.push(bullet)  //把bullet的物件放入到bullets陣列內(丟到倉庫)
    bullet_sound.play()
  }  
  
}
```

## monster.js
```javascript=
var colors1 = "231942-5e548e-9f86c0-be95c4-e0b1cb".split("-").map(a=>"#"+a)

class Monster{  //宣稱一個怪物類別。它稱為Monster
    constructor(args){  //預設值，基本資料(物件的顏色、移動的速度、大小、物件顯示的位置......)
        this.r = args.r || random(50,150)  //設計怪物的主體，如果傳參數args.r來設定怪物大小，沒有傳參數，就以100為主
        this.p = args.p || createVector(random(width),random(height))  //建立一個向量，(x:width/2,y:height/2)
        this.v = args.v || createVector(random(-1,1),random(-1,1))  //移動的速度，如果沒有傳參數args，就會利用亂數(-1,1)，抽出x,y軸的移動速度
        this.color = args.color || random(colors1)
        this.mode = random(["happy","bad"])
        this.dead = false  //代表活著
        this.timenum = 0 //延長時間，讓大家看到他死
      }
    draw(){  //畫出元件
        if(this.dead == false ){
       push()  //把原點(0,0)座標移到物件中心位置
           translate(this.p.x,this.p.y)
           fill(this.color)
           noStroke()
           ellipse(0,0,this.r)
           if(this.mode=="happy"){
               fill(255)
               ellipse(0,0,this.r/2)
               fill(0)
               ellipse(0,0,this.r/3)
           }else{
               fill(255)
               arc(0,0,this.r/2,this.r/2,0,PI)
               fill(0)
               arc(0,0,this.r/3,this.r/3,0,PI)
           }
           stroke(this.color)
           strokeWeight(4)
           noFill()
           //line(this.r/2,0,this.r,0)
        for(var j=0;j<8;j++){
           rotate(PI/4)
           beginShape()
           for(var i=0;i<(this.r/2);i++){
            vertex(this.r/2+i,sin(i/5+frameCount/10)*10)

           }
           endShape()
        }
    
           pop()  //恢復原點到視窗左上角
        }
        else{  //怪物死亡
            this.timenum = this.timenum + 1
        push()  //把原點(0,0)座標移到物件中心位置
           translate(this.p.x,this.p.y)
           fill(this.color)
           noStroke()
           ellipse(0,0,this.r)
           stroke(255)
           line(-this.r/2,0,this.r/2,0)
           stroke(this.color)
           strokeWeight(4)
           noFill()
           for(var j=0;j<13;j++){
              rotate(PI/4)
              line(this.r/2,0,this.r,0)
           }
        pop()
        }
    }

    update(){  //計算移動元件後的位置
        this.p.add(this.v)
        if(this.p.x<=0 || this.p.x>=width){  //x軸碰到左邊(<=0)，或是碰到右邊(>=width)
            this.v.x = -this.v.x  //把x軸方向、速度方向改變
          }
        if(this.p.y<=0 || this.p.y>=height){  //x軸碰到上邊(<=0)，或是碰到下邊(>=height)
            this.v.y = -this.v.y  //把y軸方向、速度方向改變
          }

    }
    isBallInRanger(x,y){  //功能:判斷飛彈是否在怪物範圍內
        let d = dist(x,y,this.p.x,this.p.y)  //計算兩點之間的距離，放到d變數內
        if(d<this.r/2){  
            return true  //飛彈(x,y)與物件的距離(this)
        }else{  
            return false  //飛彈(x,y)與物件的距離(this)，滑鼠與物件的距離大於物件的寬度，代表碰觸了，則傳回false的值(未碰觸)
        }
    }
}
```

## obj.js
```javascript=
//class:類別，粒子
class Obj{  //宣告一個類別，針對一個畫的圖案
    constructor(args){  //預設值，基本資料(物件的顏色，移動的速度、大小、初始值顯示位置......)
      //this.p = args.p || {x: random(width),y:random(height)}//描述為該物件的初始位置，|| (or)，當產生一個物件時，有傳給位置參數，則使用該參數，如果沒有傳參數，就以||(or)後面設定產出
      this.p = args.p || createVector(random(width),random(height))  //把原本{x:......,y:......}改成"向量"方式
      //this.v = {x: random(-1,1),y:random(-1,1)} //設定一個物件的移動速度
      this.v = createVector(random(-1,1),random(-1,1))  //把原本{x:......,y:......}改成"向量"方式
      this.size = random(10,25)  //一個物件的放大倍率
      this.color = random(fill_colors)  //充滿顏色
      this.stroke = random(line_colors)  //線條外框顏色
    }
    draw(){  //畫出單一個物件形狀
      push()  //執行push()後，依照我的設定，設定原點(0,0)的位置
        translate(this.p.x,this.p.y)  //依該物件位置為原點
        scale(this.v.x<0?1:-1,-1)  //?為否則(<0=1否則=-1) //x軸的放大倍率，如果this.v.x<0條件成立，值為1，否則為-1，y軸的-1為上下顛倒
        fill(this.color)
        stroke(this.stroke)
        strokeWeight(4)  //線的粗細
        beginShape()
          for(var k=0;k<points.length;k=k+1){
            //line(points[k][0]*this.size,points[k][1]*this.size,points[k+1][0]*this.size,points[k+1][1]*this.size)
            //vertex(points[k][0]*this.size,points[k][1]*this.size)  //只要設定一點，當指令到endShape()，會把所有的點連接再一起
            curveVertex(points[k][0]*this.size,points[k][1]*this.size)
          }
        endShape()
      pop()  //執行pop()後，原點(0,0)設定為回到整個視窗的左上角
    }
    update(){
      // this.p.x = this.p.x + this.v.x  //x軸目前位置加上x軸的移動速度
      // this.p.y = this.p.y + this.v.y  //y軸目前位置加上y軸的移動速度
      this.p.add(this.v)  //設定好向量後，使用add，就可以抵上面兩行指令
      //向量sub==> 減號
      //知道滑鼠的位置，並建立一個滑鼠的向量
      // let mouseV = createVector(mouseX,mouseY)  //把滑鼠的位置轉換成一個向量值
      // let delta = mouseV.sub(this.p).limit(this.v.mag()*2)  //sub計算出滑鼠所在位置的向量(mouseV)到物件向量(this.p)的距離，每次以3的距離
      // //this.v.mag()代表該物件的速度大小(一個向量值有大小和方向)
      // this.p.add(delta)
      
      if(this.p.x<=0 || this.p.x>=width){  //x軸碰到左邊(<=0)，或是碰到右邊(>=width)
        this.v.x = -this.v.x  //把x軸方向、速度方向改變
      }
      if(this.p.y<=0 || this.p.y>=height){  //x軸碰到上邊(<=0)，或是碰到下邊(>=height)
        this.v.y = -this.v.y  //把y軸方向、速度方向改變
      }
    }
    isBallinRanger(x,y){  //功能：判斷滑鼠按下的位置是否在物件的範圍內
      let d = dist(x,y,this.p.x,this.p.y)  //計算兩點之間的距離，放到d變數內
      if(d<4*this.size){  
        return true  //滑鼠與物件的距離小於物件的寬度，代表碰觸了，則傳回ture的值(碰觸)
      }else{  
        return false  //滑鼠與物件的距離大於物件的寬度，代表碰觸了，則傳回false的值(未碰觸)
      }

    }
}

```

## Bullet.js
```javascript=
class Bullet{
    constructor(args){  //預設值，基本資料(物件的顏色、移動的速度、大小、物件顯示的位置......)
        this.r = args.r || 10  //設計的飛彈有大有小時。就傳參數，args
        this.p = args.p || shipP.copy() //createVector(width/2,height/2)  //建立一個向量，(x:width/2,y:height/2)
        this.v = args.v || createVector(mouseX-width/2,mouseY-height/2).limit(5)  //算出方向，limit-->每次移動5
        this.color = args.color || "#a663cc"
      }
      draw(){  //繪出物件的程式碼
        push()
           translate(this.p.x,this.p.y)
           fill(this.color)
           noStroke()
           ellipse(0,0,this.r)
        pop()
  
      }
      update(){  //計算出移動後的位置
        // this.p.x = this.p.x + this.v.x  //x軸目前位置加上x軸的移動速度
        // this.p.y = this.p.y + this.v.y  //y軸目前位置加上y軸的移動速度
        this.p.add(this.v)
  
      }
    
  }
```

## index
```javascript=
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Sketch</title>

    <link rel="stylesheet" type="text/css" href="style.css">

    <script src="libraries/p5.min.js"></script>
    <script src="libraries/p5.sound.min.js"></script>
  </head>

  <body>
    <script src="sketch.js"></script>
    <script src="Bullet.js"></script>
    <script src="obj.js"></script>
    <script src="monster.js"></script>
  </body>
</html>

```
