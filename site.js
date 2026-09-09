(function(){
const products=window.ROOMWORTHY_PRODUCTS||[];
const labels={bedroom:'Bedroom',kitchen:'Kitchen',bathroom:'Bathroom',organization:'Organization','renter-friendly':'Renter-Friendly','small-spaces':'Small Spaces',lighting:'Lighting',entryway:'Entryway',decor:'Decor'};
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
function primaryLabel(p){return labels[p.categories[0]]||'Roomworthy Pick'}
function card(p){return `<article class="product-card"><a class="product-image-wrap" href="${p.link}" target="_blank" rel="sponsored nofollow noopener"><img class="product-image" src="${p.image}" alt="${esc(p.title)}" loading="lazy" onerror="this.style.display='none';this.parentElement.classList.add('image-missing')"></a><div class="product-copy"><span class="product-kicker">${esc(primaryLabel(p))}</span><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p><a class="shop-button" href="${p.link}" target="_blank" rel="sponsored nofollow noopener">Shop on Amazon <span class="paid-link">(paid link)</span><span aria-hidden="true">↗</span></a></div></article>`}
async function loadFullQualityImages(){
  if(!window.JSZip) throw new Error('JSZip did not load');
  const response=await fetch('roomworthy-product-images.zip?v=2',{cache:'force-cache'});
  if(!response.ok) throw new Error('Product image archive could not be loaded');
  const zip=await JSZip.loadAsync(await response.arrayBuffer());
  await Promise.all(products.map(async p=>{
    const filename=`assets/products/product-${String(p.id).padStart(2,'0')}.webp`;
    const file=zip.file(filename);
    if(!file)return;
    const bytes=await file.async('uint8array');
    p.image=URL.createObjectURL(new Blob([bytes],{type:'image/webp'}));
  }));
}
function renderHero(){const el=document.getElementById('heroShowcase');if(!el)return;const ids=[20,1,17];const chosen=ids.map(id=>products.find(p=>p.id===id)).filter(Boolean);if(chosen.length<3)return;el.innerHTML=`<a class="hero-product hero-main" href="${chosen[0].link}" target="_blank" rel="sponsored nofollow noopener"><img src="${chosen[0].image}" alt="${esc(chosen[0].title)}"><span>ENTRYWAY & STORAGE</span><strong>${esc(chosen[0].title)}</strong></a><a class="hero-product hero-small one" href="${chosen[1].link}" target="_blank" rel="sponsored nofollow noopener"><img src="${chosen[1].image}" alt="${esc(chosen[1].title)}"><span>LIGHTING</span></a><a class="hero-product hero-small two" href="${chosen[2].link}" target="_blank" rel="sponsored nofollow noopener"><img src="${chosen[2].image}" alt="${esc(chosen[2].title)}"><span>LIGHTING</span></a>`;}
function renderFeatured(){const el=document.getElementById('featuredProducts');if(!el)return;const ids=[5,20,18,1,23,17];el.innerHTML=ids.map(id=>products.find(p=>p.id===id)).filter(Boolean).map(card).join('');}
function renderStory(){const el=document.getElementById('storyProducts');if(!el)return;const ids=[3,22,24];el.innerHTML=ids.map(id=>products.find(p=>p.id===id)).filter(Boolean).map(p=>`<a class="story-product" href="${p.link}" target="_blank" rel="sponsored nofollow noopener"><div><img src="${p.image}" alt="${esc(p.title)}"></div><span>${esc(primaryLabel(p))}</span><strong>${esc(p.title)}</strong></a>`).join('');}
function renderCategory(){const el=document.getElementById('categoryProducts');if(!el)return;const params=new URLSearchParams(location.search);const room=params.get('room')||'organization';const chosen=products.filter(p=>p.categories.includes(room));const label=labels[room]||room;document.getElementById('categoryEyebrow').textContent='ROOMWORTHY / '+label.toUpperCase();document.getElementById('categoryTitle').textContent=label+' Finds';document.getElementById('categoryIntro').textContent=`Useful, elevated ${String(label).toLowerCase()} picks for apartments and small spaces.`;document.title=`${label} Finds | Roomworthy`;el.innerHTML=chosen.length?chosen.map(card).join(''):'<p>No products in this collection yet.</p>';}
function renderAll(){const el=document.getElementById('allProducts');if(el)el.innerHTML=products.map(card).join('');}
function renderEverything(){renderHero();renderFeatured();renderStory();renderCategory();renderAll();}
(async function init(){
  try{await loadFullQualityImages();}
  catch(err){console.error('Roomworthy image loader:',err);}
  renderEverything();
})();
})();