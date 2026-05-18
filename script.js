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
function getScrollAmount() {
  const card = slider.querySelector('.pc');
  if (!card) return 350;
  const style = window.getComputedStyle(slider);
  const gap = parseFloat(style.gap) || 20;
  return card.clientWidth + gap;
}

document.getElementById('sp').addEventListener('click',()=>slider.scrollBy({left:-getScrollAmount(),behavior:'smooth'}));
document.getElementById('sn').addEventListener('click',()=>slider.scrollBy({left:getScrollAmount(),behavior:'smooth'}));