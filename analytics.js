window.dataLayer=window.dataLayer||[];
function gtag(){window.dataLayer.push(arguments);}
window.gtag=window.gtag||gtag;
gtag('js',new Date());
gtag('config','G-2JWTMR6FBL',{send_page_view:true});

document.querySelectorAll('.article-note').forEach(function(note){note.textContent='Affiliate disclosure: This page contains paid Amazon links. As an Amazon Associate I earn from qualifying purchases.';});
document.querySelectorAll('.article-cta').forEach(function(link){link.textContent=link.textContent.replace(/\s*\(paid link\)/gi,'');});

document.addEventListener('click',function(event){
  const link=event.target.closest('a[href]');if(!link)return;let url;
  try{url=new URL(link.href,location.href);}catch(_){return;}
  const isAmazon=url.hostname==='amzn.to'||url.hostname==='amazon.com'||url.hostname.endsWith('.amazon.com')||url.hostname==='link.amazon';
  if(isAmazon){gtag('event','amazon_outbound_click',{link_url:url.href,link_text:(link.textContent||'').trim().slice(0,120),page_location:location.href});return;}
  if(url.origin===location.origin&&url.pathname!==location.pathname){gtag('event','internal_navigation_click',{link_url:url.href,link_text:(link.textContent||'').trim().slice(0,120),page_location:location.href});}
});
