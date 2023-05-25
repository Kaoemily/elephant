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