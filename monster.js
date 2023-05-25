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