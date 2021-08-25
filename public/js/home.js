const time  = document.getElementById('time');
let i = 0;
let color = ['#8ecae6','#2a9d8f','#e9c46a','#f4a261','#e76f51']

function count(){
    
    let timer = new Date();
    setTimeout(() => {
    document.body.style.backgroundColor = color[i];
    time.innerText = timer.getMinutes() + "m : " + timer.getSeconds()+"s" ;
    if (i<5) i +=1;
    else i = 0;
    
    count();
}, 2000);

}

function preventBack() {
    window.history.forward(); 
}
  
setTimeout(preventBack(), 0);
  
window.onunload = function () { null };

count();