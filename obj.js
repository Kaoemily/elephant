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
