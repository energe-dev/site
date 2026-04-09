const slider = document.getElementById('slider');
let isDown=false,startX,scrollLeft;
slider.addEventListener('mousedown',e=>{isDown=true;startX=e.pageX-slider.offsetLeft;scrollLeft=slider.scrollLeft});
slider.addEventListener('mouseleave',()=>isDown=false);
slider.addEventListener('mouseup',()=>isDown=false);
slider.addEventListener('mousemove',e=>{if(!isDown)return;e.preventDefault();slider.scrollLeft=scrollLeft-(e.pageX-slider.offsetLeft-startX)*1.4});
// Touch support
let touchX;
slider.addEventListener('touchstart',e=>{touchX=e.touches[0].pageX;scrollLeft=slider.scrollLeft},{passive:true});
slider.addEventListener('touchmove',e=>{if(touchX===undefined)return;slider.scrollLeft=scrollLeft-(e.touches[0].pageX-touchX)*1.2},{passive:true});
document.getElementById('sp').addEventListener('click',()=>slider.scrollBy({left:-420,behavior:'smooth'}));
document.getElementById('sn').addEventListener('click',()=>slider.scrollBy({left:420,behavior:'smooth'}));