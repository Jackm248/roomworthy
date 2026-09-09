(function(){
const GA_MEASUREMENT_ID='G-VHHW3KEQH3';
window.dataLayer=window.dataLayer||[];
window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};
window.gtag('js',new Date());
window.gtag('config',GA_MEASUREMENT_ID,{send_page_view:true});
if(!document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"]`)){
  const gaScript=document.createElement('script');
  gaScript.async=true;
  gaScript.src=`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(gaScript);
}

document.addEventListener('click',function(event){
  const link=event.target.closest('a[href]');
  if(!link)return;
  let url;
  try{url=new URL(link.href,location.href);}catch(_){return;}
  const isAmazon=url.hostname==='amzn.to'||url.hostname.endsWith('.amazon.com')||url.hostname==='amazon.com';
  if(!isAmazon)return;
  window.gtag('event','amazon_outbound_click',{
    link_url:url.href,
    link_text:(link.textContent||'').trim().slice(0,120),
    page_location:location.href
  });
});

const products=window.ROOMWORTHY_PRODUCTS||[];
const labels={bedroom:'Bedroom',kitchen:'Kitchen',bathroom:'Bathroom',organization:'Organization','renter-friendly':'Renter-Friendly','small-spaces':'Small Spaces',lighting:'Lighting',entryway:'Entryway',decor:'Decor'};
const shortTitles={
1:'Cordless Rechargeable Table Lamp',
2:'2-Tier Pull-Out Under-Sink Organizer',
3:'BedShelfie Wood Bedside Shelf',
4:'Vacuum Storage Bags, 20-Piece Set',
5:'Acacia-Lid Glass Spice Jar Set',
6:'Floor Lamp with 4-Tier Shelves',
7:'3-Tier Over-the-Toilet Storage Rack',
8:'Adhesive Shower Caddy, 5-Pack',
9:'Washable Vintage Area Rug, 4×6',
10:'Chunky Chenille Throw Blanket',
11:'Neutral Chenille Pillow Covers, 2-Pack',
12:'Wall Key & Mail Holder with Shelf',
13:'No-Drill Under-Desk Cable Tray',
14:'Command Display Ledges, 2-Pack',
15:'No-Drill Adjustable Curtain Rod',
16:'Peel-and-Stick White Subway Tile',
17:'Rechargeable LED Wall Sconce',
18:'Walnut Flip-Drawer Shoe Cabinet',
19:'LED Jewelry Cabinet with Mirror',
20:'Arched Tilt-Out Storage Cabinet',
21:'2-Tier Bathroom Corner Organizer',
22:'Slim Rolling Storage Cart',
23:'Natural Oak Pull-Out Trash Cabinet',
24:'Rolling Under-Bed Storage',
25:'Macrame Bedside Caddy',
26:'Macrame Over-the-Door Organizer'
};
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/\"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
function primaryLabel(p){return labels[p.categories[0]]||'Roomworthy Pick'}
function displayTitle(p){return shortTitles[p.id]||p.title}
function card(p){return `<article class="product-card"><a class="product-image-wrap" href="${p.link}" target="_blank" rel="sponsored nofollow noopener"><img class="product-image" src="${p.image}" alt="${esc(p.title)}" title="${esc(p.title)}" loading="lazy" decoding="async" onerror="this.style.display='none';this.parentElement.classList.add('image-missing')"></a><div class="product-copy"><span class="product-kicker">${esc(primaryLabel(p))}</span><h3 title="${esc(p.title)}">${esc(displayTitle(p))}</h3><p>${esc(p.description)}</p><a class="shop-button" href="${p.link}" target="_blank" rel="sponsored nofollow noopener">Shop on Amazon <span class="paid-link">(paid link)</span><span aria-hidden="true">↗</span></a></div></article>`}
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
function renderHero(){const el=document.getElementById('heroShowcase');if(!el)return;const ids=[20,1,17];const chosen=ids.map(id=>products.find(p=>p.id===id)).filter(Boolean);if(chosen.length<3)return;el.innerHTML=`<a class="hero-product hero-main" href="${chosen[0].link}" target="_blank" rel="sponsored nofollow noopener"><img src="${chosen[0].image}" alt="${esc(chosen[0].title)}" decoding="async"><span>ENTRYWAY & STORAGE</span><strong title="${esc(chosen[0].title)}">${esc(displayTitle(chosen[0]))}</strong></a><a class="hero-product hero-small one" href="${chosen[1].link}" target="_blank" rel="sponsored nofollow noopener"><img src="${chosen[1].image}" alt="${esc(chosen[1].title)}" decoding="async"><span>LIGHTING</span></a><a class="hero-product hero-small two" href="${chosen[2].link}" target="_blank" rel="sponsored nofollow noopener"><img src="${chosen[2].image}" alt="${esc(chosen[2].title)}" decoding="async"><span>LIGHTING</span></a>`;}
function renderFeatured(){const el=document.getElementById('featuredProducts');if(!el)return;const ids=[5,20,18,1,23,17];el.innerHTML=ids.map(id=>products.find(p=>p.id===id)).filter(Boolean).map(card).join('');}
function renderStory(){const el=document.getElementById('storyProducts');if(!el)return;const ids=[3,22,24];el.innerHTML=ids.map(id=>products.find(p=>p.id===id)).filter(Boolean).map(p=>`<a class="story-product" href="${p.link}" target="_blank" rel="sponsored nofollow noopener" title="${esc(p.title)}"><div><img src="${p.image}" alt="${esc(p.title)}" loading="lazy" decoding="async"></div><span>${esc(primaryLabel(p))}</span><strong>${esc(displayTitle(p))}</strong></a>`).join('');}
function renderCategory(){const el=document.getElementById('categoryProducts');if(!el)return;const params=new URLSearchParams(location.search);const room=params.get('room')||'organization';const chosen=products.filter(p=>p.categories.includes(room));const label=labels[room]||room;const canonical=`https://room-worthy.com/category.html?room=${encodeURIComponent(room)}`;const description=`Useful, elevated ${String(label).toLowerCase()} picks for apartments and small spaces.`;document.getElementById('categoryEyebrow').textContent='ROOMWORTHY / '+label.toUpperCase();document.getElementById('categoryTitle').textContent=label+' Finds';document.getElementById('categoryIntro').textContent=description;document.title=`${label} Finds | Roomworthy`;const canonicalLink=document.getElementById('canonicalLink');if(canonicalLink)canonicalLink.href=canonical;const ogTitle=document.getElementById('ogTitle');if(ogTitle)ogTitle.content=`${label} Finds | Roomworthy`;const ogDescription=document.getElementById('ogDescription');if(ogDescription)ogDescription.content=description;const ogUrl=document.getElementById('ogUrl');if(ogUrl)ogUrl.content=canonical;el.innerHTML=chosen.length?chosen.map(card).join(''):'<p>No products in this collection yet.</p>';}
function renderAll(){const el=document.getElementById('allProducts');if(el)el.innerHTML=products.map(card).join('');}
function renderEverything(){renderHero();renderFeatured();renderStory();renderCategory();renderAll();}

renderEverything();

(async function upgradeImages(){
  try{
    await loadFullQualityImages();
    renderEverything();
  }catch(err){
    console.error('Roomworthy image loader:',err);
  }
})();
})();