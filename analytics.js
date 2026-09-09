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
  if(!isAmazon)return;
  gtag('event','amazon_outbound_click',{
    link_url:url.href,
    link_text:(link.textContent||'').trim().slice(0,120),
    page_location:location.href
  });
});
