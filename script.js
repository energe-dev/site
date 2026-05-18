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

// Blog Preview slider support on mobile
const blogGrid = document.querySelector('.blog-grid');
const bp = document.getElementById('bp');
const bn = document.getElementById('bn');
if (blogGrid && bp && bn) {
  let bIsDown = false, bStartX, bScrollLeft;
  blogGrid.addEventListener('mousedown', e => {
    if (window.innerWidth > 768) return;
    bIsDown = true;
    bStartX = e.pageX - blogGrid.offsetLeft;
    bScrollLeft = blogGrid.scrollLeft;
  });
  blogGrid.addEventListener('mouseleave', () => bIsDown = false);
  blogGrid.addEventListener('mouseup', () => bIsDown = false);
  blogGrid.addEventListener('mousemove', e => {
    if (!bIsDown || window.innerWidth > 768) return;
    e.preventDefault();
    blogGrid.scrollLeft = bScrollLeft - (e.pageX - blogGrid.offsetLeft - bStartX) * 1.4;
  });
  
  let bTouchX;
  blogGrid.addEventListener('touchstart', e => {
    if (window.innerWidth > 768) return;
    bTouchX = e.touches[0].pageX;
    bScrollLeft = blogGrid.scrollLeft;
  }, {passive: true});
  blogGrid.addEventListener('touchmove', e => {
    if (bTouchX === undefined || window.innerWidth > 768) return;
    blogGrid.scrollLeft = bScrollLeft - (e.touches[0].pageX - bTouchX) * 1.2;
  }, {passive: true});
  
  function getBlogScrollAmount() {
    const card = blogGrid.querySelector('.bcard');
    if (!card) return 350;
    const style = window.getComputedStyle(blogGrid);
    const gap = parseFloat(style.gap) || 14;
    return card.clientWidth + gap;
  }
  
  bp.addEventListener('click', () => {
    blogGrid.scrollBy({left: -getBlogScrollAmount(), behavior: 'smooth'});
  });
  bn.addEventListener('click', () => {
    blogGrid.scrollBy({left: getBlogScrollAmount(), behavior: 'smooth'});
  });
}

// Dynamic years trajectory calculation (since June 14, 2007)
(function () {
  var startDate = new Date('2007-06-14T00:00:00');
  var diffMs = Date.now() - startDate.getTime();
  var diffYears = diffMs / (1000 * 60 * 60 * 24 * 365.25);
  var years = Math.floor(diffYears);
  
  // Set all class occurrences
  document.querySelectorAll('.dynamic-years-num').forEach(el => {
    el.textContent = years;
  });
  
  // Backward compatibility for index.html elements
  var element = document.getElementById('dynamic-years');
  if (element) {
    var isEn = document.documentElement.lang === 'en' || window.location.pathname.includes('/en/');
    element.textContent = '+' + years + (isEn ? ' YRS' : ' AÑOS');
  }
})();