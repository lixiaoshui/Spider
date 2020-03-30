var box=document.getElementById('box');
var slider=document.createElement('div');
slider.setAttribute('class','slider');
slider.setAttribute('id','slider');
box.appendChild(slider);
var s1=document.createElement('div');
var s2=document.createElement('div');
var s3=document.createElement('div');
var s4=document.createElement('div');
var s5=document.createElement('div');
var s6=document.createElement('div');
var s7=document.createElement('div');
s1.setAttribute('class','slide');
s2.setAttribute('class','slide');
s3.setAttribute('class','slide');
s4.setAttribute('class','slide');
s5.setAttribute('class','slide');
s6.setAttribute('class','slide');
s7.setAttribute('class','slide');
slider.appendChild(s1);
slider.appendChild(s2);
slider.appendChild(s3);
slider.appendChild(s4);
slider.appendChild(s5);
slider.appendChild(s6);
slider.appendChild(s7);
var p1=document.createElement('img');
var p2=document.createElement('img');
var p3=document.createElement('img');
var p4=document.createElement('img');
var p5=document.createElement('img');
var p6=document.createElement('img');
var p7=document.createElement('img');
p1.setAttribute('src','img/b5.png');
p2.setAttribute('src','img/b1.png');
p3.setAttribute('src','img/b2.png');
p4.setAttribute('src','img/b3.png');
p5.setAttribute('src','img/b4.png');
p6.setAttribute('src','img/b5.png');
p7.setAttribute('src','img/b1.png');
s1.appendChild(p1);
s2.appendChild(p2);
s3.appendChild(p3);
s4.appendChild(p4);
s5.appendChild(p5);
s6.appendChild(p6);
s7.appendChild(p7);
var left=document.createElement('span');
var right=document.createElement('span');
left.setAttribute('id','left');
right.setAttribute('id','right');
box.appendChild(left);
box.appendChild(right);
var nav=document.createElement('ul');
nav.setAttribute('id','navs');
nav.setAttribute('class','nav');
box.appendChild(nav);
var index=1;
var timer;
var moving=false;


for(var i=0;i<5;i++){
    var li=document.createElement('li');
    li.innerHTML=i+1;
    nav.appendChild(li);
}
var list=nav.children;

function style(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,null)[attr];
    }
}
function animate(obj,json,callback){
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        var elstop=true;
        for(var attr in json){
            var now=0;
            if(attr=='opaciyt'){
                now=parseInt(style(obj,attr)*100);
            }else{
                now=parseInt(style(obj,attr));
            }
            var v=(json[attr]-now)/8;
            v=v>0?Math.ceil(v):Math.floor(v);
            var current=now+v;
            if(attr=='opacity'){
                obj.style[attr]=current/100;
            }else{
                obj.style[attr]=current+'px';
            }
            if(json[attr]!==current){
                elstop=false;
            }
        }
        if(elstop){
            clearInterval(obj.timer);
            callback&&callback();
        }
    },50)
}
box.onmouseover=function(){
    animate(left,{opacity:80})
    animate(right,{opacity:80})
    clearInterval(timer)
}
box.onmouseout=function(){
    animate(left,{opacity:0})
    animate(right,{opacity:0})
    timer=setInterval(next,2000);
}
right.onclick=next;
left.onclick=prev;
for(var i=0;i<list.length;i++){
    list[i].index=i;
    list[i].onclick=function(){
        index=this.index+1;
        navmove();
        animate(slider,{
            left:-1200*index
        })
    }
}
function next(){
    if(moving){
        return;
    }
    moving=true;
    index++;
    navmove();
    animate(slider,{
        left:-1200*index
    },function(){
        if(index==6){
            slider.style.left='-1200px';
            index=1;
        }
        moving=false;
    })
}
function prev(){
    if(moving){
        return;
    }
    moving=true;
    index--;
    navmove();
    animate(slider,{
        left:-1200*index
    },function(){
        if(index==0){
            slider.style.left='-6000px';
            index=5;
        }
        moving=false;
    })
}
function navmove(){
    for(var i=0;i<list.length;i++){
        list[i].className='';

    }
    if(index>5){
        list[0].className='active';
    }else if(index<=0){
        list[4].className='active';
    }else{
        list[index-1].className='active';
    }
}
timer=setInterval(next,3000);