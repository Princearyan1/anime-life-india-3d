const button=document.getElementById('fullscreen-button');
const help=document.getElementById('fullscreen-help');
function sync(){const full=Boolean(document.fullscreenElement);button.textContent=full?'⛶ Exit full screen':'⛶ Full screen';button.setAttribute('aria-pressed',String(full));}
button.addEventListener('click',async()=>{
 help.hidden=true;
 try{
  if(document.fullscreenElement)await document.exitFullscreen();
  else if(document.fullscreenEnabled&&document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();
  else help.hidden=false;
 }catch{help.hidden=false;}
 sync();
});
document.addEventListener('fullscreenchange',sync);
document.getElementById('fullscreen-dismiss').onclick=()=>help.hidden=true;
sync();
