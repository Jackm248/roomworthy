window.dataLayer=window.dataLayer||[];
function gtag(){window.dataLayer.push(arguments);}
window.gtag=window.gtag||gtag;
gtag('js',new Date());
gtag('config','G-VHHW3KEQH3',{send_page_view:true});

document.addEventListener('click',function(event){
  const link=event.target.closest('a[href]');
  if(!link)return;
  let url;
  try{url=new URL(link.href,location.href);}catch(_){return;}
  const isAmazon=url.hostname==='amzn.to'||url.hostname==='amazon.com'||url.hostname.endsWith('.amazon.com');
  if(isAmazon){
    gtag('event','amazon_outbound_click',{
      link_url:url.href,
      link_text:(link.textContent||'').trim().slice(0,120),
      page_location:location.href
    });
    return;
  }
  if(url.origin===location.origin&&/\.html$/.test(url.pathname)&&url.pathname!==location.pathname){
    gtag('event','internal_guide_click',{
      link_url:url.href,
      link_text:(link.textContent||'').trim().slice(0,120),
      page_location:location.href
    });
  }
});

(function addRelatedGuides(){
  const guides={
    '/small-apartment-finds.html':[
      ['small-bedroom-storage.html','BEDROOM','8 small bedroom storage ideas for apartments'],
      ['renter-friendly-upgrades.html','RENTER-FRIENDLY','8 renter-friendly upgrades that do not require drilling'],
      ['small-apartment-kitchen-organization.html','KITCHEN','10 small apartment kitchen organization ideas']
    ],
    '/small-bedroom-storage.html':[
      ['small-apartment-finds.html','SMALL SPACES','10 small apartment finds that make a space look more expensive'],
      ['renter-friendly-upgrades.html','RENTER-FRIENDLY','8 renter-friendly upgrades that do not require drilling'],
      ['small-bathroom-organization.html','BATHROOM','9 small bathroom organization ideas for apartments']
    ],
    '/renter-friendly-upgrades.html':[
      ['small-bedroom-storage.html','BEDROOM','8 small bedroom storage ideas for apartments'],
      ['small-bathroom-organization.html','BATHROOM','9 small bathroom organization ideas for apartments'],
      ['small-apartment-finds.html','SMALL SPACES','10 small apartment finds that make a space look more expensive']
    ],
    '/small-bathroom-organization.html':[
      ['renter-friendly-upgrades.html','RENTER-FRIENDLY','8 renter-friendly upgrades that do not require drilling'],
      ['small-apartment-kitchen-organization.html','KITCHEN','10 small apartment kitchen organization ideas'],
      ['small-apartment-finds.html','SMALL SPACES','10 small apartment finds that make a space look more expensive']
    ],
    '/small-apartment-kitchen-organization.html':[
      ['small-bathroom-organization.html','BATHROOM','9 small bathroom organization ideas for apartments'],
      ['renter-friendly-upgrades.html','RENTER-FRIENDLY','8 renter-friendly upgrades that do not require drilling'],
      ['small-apartment-finds.html','SMALL SPACES','10 small apartment finds that make a space look more expensive']
    ]
  };
  const items=guides[location.pathname];
  const close=document.querySelector('.article-close');
  if(!items||!close)return;
  const section=document.createElement('section');
  section.className='related-guides';
  section.innerHTML='<div class="related-heading"><span class="eyebrow">KEEP READING</span><h2>More Roomworthy guides</h2></div><div class="related-grid">'+items.map(function(item){return '<a class="related-card" href="'+item[0]+'"><small>'+item[1]+'</small><h3>'+item[2]+'</h3><b>Read guide →</b></a>';}).join('')+'</div><a class="related-all" href="guide.html">Browse all Roomworthy guides →</a>';
  close.insertAdjacentElement('afterend',section);
})();
