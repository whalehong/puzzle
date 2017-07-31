var time=0;
var pause=true;
var set_timer;
var d=new Array(10);
var d_direct=new Array(
	[0],
	[0,2,4,0],
	[0,3,5,1],
	[0,0,6,2],
	[1,5,7,0],
	[2,6,8,4],
	[3,0,9,5],
	[4,8,0,0],
	[5,9,0,7],
	[6,0,0,8]
);

var d_posXY=new Array(
	[0],
	[0,0],
	[150,0],
	[300,0],
	[0,150],
	[150,150],
	[300,150],
	[0,300],
	[150,300],
	[300,300]
);

d[1]=1;d[2]=2;d[3]=3;d[4]=4;d[5]=5;d[6]=6;d[7]=7;d[8]=8;d[9]=9;


var d_random=function(){
	var dRandom=parseInt(Math.random()*4);
	return dRandom;
}

function initialization(){
	
	for(i=1;i<30;++i){
		for(k=1;k<10;++k){
			if(d[k]==9)
			{  
				break;
			}
		}
		var dRandom=d_random();
		while(d_direct[k][dRandom]==0){
			dRandom=d_random();
		}
		var jDirect=d_direct[k][dRandom];
		
		dExchange(k,jDirect);
		
	}
}

function dExchange(i,j){
	document.getElementById("d9").style="left:"+d_posXY[j][0]+"px;top:"+d_posXY[j][1]+"px;";
	document.getElementById("d"+d[j]).style="left:"+d_posXY[i][0]+"px;top:"+d_posXY[i][1]+"px;";

	var temp=null;
	temp=d[i];
	d[i]=d[j];
	d[j]=temp;
}



function prepareMove(){
	if(!document.getElementById){return false;}
	if(!document.getElementsByTagName){return false;}
	var contain=document.getElementById("container");
	var links=contain.getElementsByTagName("img");
	for(i=0;i<links.length-1;++i){
			links[i].onclick=function(){
				if(!pause){
					move(this);
				}
			}
	}
	
}

function move(whichImg){
	var whichId=whichImg.getAttribute("id");
	var iNum=whichId.replace(/[^0-9]/ig,"");
	var l=1;
	for(l=1;l<10;++l){
		if(d[l]==iNum){
			break;
		}
	}
	var tar_d=whereCanTo(l);
	if(tar_d!=0){
		dExchange(tar_d,l);
	}
	var finish_flag=dJudge();
	if(finish_flag){
	setTimeout(function(){
		var imag1=document.getElementById("imag1");
		imag1.classList.add("hover");
	},501);
	clearInterval(set_timer);
	pause=true;
	}
}

function whereCanTo(cur_div){
	var j=0;
	var move_flag=false;
	for(j=0; j<d_direct[cur_div].length; ++j){
		if( d[ d_direct[cur_div][j] ] == 9 ){
			move_flag=true;
			break;
		}
	}
	if(move_flag == true){
		return d_direct[cur_div][j];
	}else{
		return 0;
	}
}

function dJudge(){
	var i=0,finish_flag=false;
	for(i=1;i<10;++i){
		if(d[i]!=i){
			return finish_flag;
			break;
		}
	}
	return finish_flag=true;
}

function setTimer(){
	time+=1;
	var min=parseInt(time/60);
	var sec=time%60;
	if(sec<10){
		document.getElementById("timer").innerHTML="用时："+min+":0"+sec;
	}else{
		document.getElementById("timer").innerHTML="用时："+min+":"+sec;
	}
}

function myStart(){
	jStart=document.getElementById("start");
	jStart.onclick=function(){
		if(pause){
			jStart.firstChild.nodeValue="暂停";
			set_timer=setInterval(setTimer,1000);
			pause=false;
		}else{
			jStart.firstChild.nodeValue="开始";
			clearInterval(set_timer);
			pause=true;
		}
	}
}

function myReset(){
	var jReset=document.getElementById("reset");
	jReset.onclick=function(){
		time=0;
		jStart1=document.getElementById("start");
		if(jStart1.firstChild.nodeValue=="暂停"){	
			jStart1.firstChild.nodeValue="开始";
			pause=true;
		}
	
		document.getElementById("timer").innerHTML="用时:0:00";
		clearInterval(set_timer);
		initialization();
		var imag1=document.getElementById("imag1");
		imag1.classList.remove("hover");
	}
}



window.onload=function()
{	initialization();
	prepareMove();
	myReset();
	myStart();
}
