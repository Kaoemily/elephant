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