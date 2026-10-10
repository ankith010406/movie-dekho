// Shared data + helpers. Data is kept in localStorage so the admin page sees user bookings.
document.documentElement.dataset.theme=localStorage.mdk_theme||"dark";
// Real films. Ratings are approximate IMDb-style scores.
const M0=[
["RRR","Action","Telugu","3h 07m","U/A","#ff9d4d","#7a1f1f",7.8,"Two fearless revolutionaries, one with fire and one with water in his blood, become friends and then face a choice in the fight against British rule.","N. T. Rama Rao Jr., Ram Charan, Alia Bhatt, Ajay Devgn"],
["Pushpa 2: The Rule","Action","Telugu","3h 20m","U/A","#e0632b","#2a1408",6.5,"Pushpa Raj, now the king of the red sandalwood trade, defends his empire against a relentless police officer.","Allu Arjun, Rashmika Mandanna, Fahadh Faasil"],
["Kalki 2898 AD","Sci-Fi","Telugu","2h 56m","U/A","#ffc93c","#3a2a7a",7.0,"In a far future Kashi, a bounty hunter gets drawn into a battle over an unborn child who may decide the fate of the world.","Prabhas, Deepika Padukone, Amitabh Bachchan, Kamal Haasan"],
["Kantara","Drama","Kannada","2h 28m","U/A","#3dd6a0","#0f3a2a",8.2,"A rebellious villager clashes with a forest officer over land, as an ancient folk tradition of his community comes alive.","Rishab Shetty, Sapthami Gowda, Kishore"],
["3 Idiots","Comedy","Hindi","2h 50m","U","#4d8dff","#14306e",8.4,"Two friends search for their long-lost companion, and recall their engineering college days with a free-thinking genius.","Aamir Khan, R. Madhavan, Sharman Joshi, Kareena Kapoor"],
["Dangal","Drama","Hindi","2h 41m","U","#ffb347","#8a3a1a",8.3,"A former wrestler trains his daughters to become world-class champions, against the expectations of their village.","Aamir Khan, Fatima Sana Shaikh, Sanya Malhotra"],
["Jawan","Action","Hindi","2h 49m","U/A","#7a7a8c","#1c1c2a",7.0,"A man driven by a personal vendetta sets out to right the wrongs in society, with a team of women by his side.","Shah Rukh Khan, Nayanthara, Vijay Sethupathi, Deepika Padukone"],
["Vikram","Action","Tamil","2h 53m","U/A","#ff4d4d","#3a0f0f",8.3,"A black-ops agent investigates a string of masked killings, and uncovers a drug network far bigger than anyone imagined.","Kamal Haasan, Vijay Sethupathi, Fahadh Faasil"],
["Stree 2","Comedy","Hindi","2h 27m","U/A","#b48cff","#3c2a7a",7.5,"The town of Chanderi is haunted again, this time by a headless terror that targets modern women.","Rajkummar Rao, Shraddha Kapoor, Pankaj Tripathi"],
["Interstellar","Sci-Fi","English","2h 49m","U/A","#3dd6d0","#0a1a3a",8.7,"As Earth runs out of food, a former pilot leads a team of explorers through a wormhole to find humanity a new home.","Matthew McConaughey, Anne Hathaway, Jessica Chastain"],
["Oppenheimer","Drama","English","3h 00m","U/A","#ff7a3d","#1a1a1a",8.3,"The story of J. Robert Oppenheimer and the creation of the atomic bomb during World War II, and the cost that followed.","Cillian Murphy, Emily Blunt, Robert Downey Jr., Matt Damon"],
["Dune: Part Two","Sci-Fi","English","2h 46m","U/A","#e8b04d","#5a2f12",8.5,"Paul Atreides joins the Fremen on Arrakis to take revenge on the conspirators who destroyed his family.","Timothée Chalamet, Zendaya, Austin Butler, Rebecca Ferguson"],
]
 .map((a,i)=>({id:i+1,title:a[0],genre:a[1],lang:a[2],dur:a[3],rate:a[4],c:[a[5],a[6]],r:a[7],d:a[8],cast:a[9],on:1,img:[
  "https://m.media-amazon.com/images/M/MV5BNWMwODYyMjQtMTczMi00NTQ1LWFkYjItMGJhMWRkY2E3NDAyXkEyXkFqcGc@._V1_.jpg",
  "https://m.media-amazon.com/images/M/MV5BNDM3N2UzM2UtMjEwMC00NGUzLThmMmQtNGMyM2VmMDA0ZWEwXkEyXkFqcGc@._V1_.jpg",
  "https://m.media-amazon.com/images/M/MV5BMTM3ZGUwYTEtZTI5NS00ZmMyLTk2YmQtMWU4YjlhZTI3NjRjXkEyXkFqcGc@._V1_.jpg",
  "https://m.media-amazon.com/images/M/MV5BY2VkZjk5ZjMtM2ExOS00ZDA1LTg1ZDEtYTliNGZiYTc4ZWZiXkEyXkFqcGc@._V1_.jpg",
  "https://m.media-amazon.com/images/M/MV5BNzc4ZWQ3NmYtODE0Ny00YTQ4LTlkZWItNTBkMGQ0MmUwMmJlXkEyXkFqcGc@._V1_.jpg",
  "https://m.media-amazon.com/images/M/MV5BMTQ4MzQzMzM2Nl5BMl5BanBnXkFtZTgwMTQ1NzU3MDI@._V1_.jpg",
  "https://m.media-amazon.com/images/M/MV5BMGExNGI1NDktOWI2Mi00NDM3LWIxMmQtNTQxYTgzMzI0MTA1XkEyXkFqcGc@._V1_.jpg",
  "https://m.media-amazon.com/images/M/MV5BMmViYjExY2UtMzZjOS00OGQ2LWEzNWYtNGYxY2NkY2RmMDE3XkEyXkFqcGc@._V1_.jpg",
  "https://m.media-amazon.com/images/M/MV5BMTA1NmUxYzItZmVmNy00YmQxLTk4Y2UtZjVkMWUwMWQ5N2IxXkEyXkFqcGc@._V1_.jpg",
  "https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_.jpg",
  "https://m.media-amazon.com/images/M/MV5BN2JkMDc5MGQtZjg3YS00NmFiLWIyZmQtZTJmNTM5MjVmYTQ4XkEyXkFqcGc@._V1_.jpg",
  "https://m.media-amazon.com/images/M/MV5BNTc0YmQxMjEtODI5MC00NjFiLTlkMWUtOGQ5NjFmYWUyZGJhXkEyXkFqcGc@._V1_.jpg",
  "https://m.media-amazon.com/images/M/MV5BZWI5NmI2MWQtZGI1Zi00YTFkLTlkMDQtNmE3ZWRiNWZjZTM3XkEyXkFqcGc@._V1_.jpg"
][i]}));
const KM="mdk_movies_v2";
const THEATRES=[
 {name:"AMB Cinemas, Gachibowli",fmt:"Dolby Atmos · Luxury",x:1.2},
 {name:"Prasads Multiplex, Necklace Road",fmt:"IMAX · Large screen",x:1.3},
 {name:"PVR Inorbit Mall, Madhapur",fmt:"Recliner seats",x:1.1},
 {name:"INOX GVK One, Banjara Hills",fmt:"Standard · 4K",x:1}];
const TIMES=["10:00 AM","01:15 PM","04:30 PM","07:45 PM","10:50 PM"],ROWS="ABCDEFGH".split(""),COLS=10;
const price=r=>r<3?150:r<6?250:350, FEE=20;
const seatPrice=(r,t,th=0)=>Math.round((price(r)+(TIMES.indexOf(t)>=3?30:0))*THEATRES[th].x/10)*10;
const PROMOS={MOVIE10:{pct:10},FIRST50:{flat:50},FAMILY15:{pct:15}};
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const get=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))||d}catch{return d}};
const save=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const movies=()=>get(KM,M0).map(m=>({...M0.find(x=>x.id==m.id),...m})), bookings=()=>get("mdk_bookings",[]), messages=()=>get("mdk_msgs",[]);
const wish=()=>get("mdk_wish",[]);
const toggleWish=id=>{const w=wish(),h=w.includes(id);save("mdk_wish",h?w.filter(x=>x!=id):[...w,id]);toast(h?"Removed from watchlist":"Added to watchlist")};
const fmtDate=s=>new Date(s+"T00:00").toLocaleDateString("en-IN",{weekday:"short",day:"numeric",month:"short"});
const dayList=()=>[0,1,2,3,4,5,6].map(i=>{const d=new Date();d.setDate(d.getDate()+i);return d.toLocaleDateString("en-CA")});
const showAt=b=>{const[t,ap]=b.time.split(" "),[h,mi]=t.split(":").map(Number),d=new Date(b.date+"T00:00");d.setHours(h%12+(ap=="PM"?12:0),mi);return d};
const takenSeats=(mid,date,time,th=0)=>bookings().filter(b=>b.movieId==mid&&b.date==date&&b.time==time&&(b.theatre||0)==th&&b.status=="Confirmed").flatMap(b=>b.seats);
const trailer=t=>"https://www.youtube.com/results?search_query="+encodeURIComponent(t+" official trailer");
const barcode=id=>`<svg class="barcode" viewBox="0 0 ${id.length*14} 36" width="100%" height="36" preserveAspectRatio="none" aria-hidden="true">${[...id].map((c,i)=>{const n=c.charCodeAt(0);return[0,1,2,3,4,5].map(j=>n>>j&1?`<rect x="${i*14+j*2}" width="1.6" height="36" fill="currentColor"/>`:"").join("")}).join("")}</svg>`;
function toast(t){let e=$("#toast");if(!e){document.body.insertAdjacentHTML("beforeend",'<div id="toast" role="status"></div>');e=$("#toast")}e.textContent=t;e.className="show";clearTimeout(toast.t);toast.t=setTimeout(()=>e.className="",5000)}
const TMDB_KEY="";
const YR=[2022,2024,2024,2022,2009,2016,2023,2022,2024,2014,2023,2024,2008];
const PC=()=>get("mdk_posters",{});
const posterSrc=m=>m.img||PC()[m.id]||"posters/"+m.id+".jpg";
const poster=m=>`<img src="${esc(posterSrc(m))}" alt="${esc(m.title)} poster" loading="lazy" onerror="this.remove()">`;
async function fetchPosters(){
 const c=PC(),has=Object.prototype.hasOwnProperty;
 const todo=M0.filter(m=>!has.call(c,m.id));
 if(!todo.length)return;
 const key=String(TMDB_KEY||"").trim();
 if(!key){toast("TMDB key is missing. Posters will use the gradient fallback.");return}
 const bearer=key.startsWith("eyJ");
 if(!bearer&&key.length!==32){toast("TMDB key format is invalid. Use a 32-character v3 key or a v4 Read Access Token.");return}
 const results=await Promise.all(todo.map(async m=>{
  try{
   const url=new URL("https://api.themoviedb.org/3/search/movie");
   url.searchParams.set("query",m.title);
   url.searchParams.set("year",YR[m.id-1]);
   const headers={};
   if(bearer)headers.Authorization=`Bearer ${key}`;
   else url.searchParams.set("api_key",key);
   const r=await fetch(url,{headers});
   const body=await r.json();
   if(!r.ok){
    console.warn(`TMDB poster search failed for "${m.title}": HTTP ${r.status}`);
    return{id:m.id,error:true};
   }
   const p=body.results?.[0]?.poster_path;
   return{id:m.id,url:p?"https://image.tmdb.org/t/p/w500"+p:null};
  }catch(e){
   console.warn(`TMDB poster search failed for "${m.title}".`,e);
   return{id:m.id,error:true};
  }
 }));
 let changed=0,failed=0;
 results.forEach(result=>{
  if(result.error){failed++;return}
  c[result.id]=result.url;
  if(result.url)changed++;
 });
 if(results.length)save("mdk_posters",c);
 if(changed)window.dispatchEvent(new Event("mdk-posters-updated"));
 if(failed)toast(`TMDB could not load ${failed} poster search${failed==1?"":"es"}. Check your key and internet connection.`);
 else if(!changed)toast("TMDB returned no posters. Movies will keep their gradient backgrounds.");
 else if(changed<todo.length)toast(`Loaded ${changed} poster${changed==1?"":"s"}; unavailable posters keep the gradient fallback.`);
}
const movieCard=m=>`<article class="card"><a class="poster" href="movie.html?id=${m.id}" style="background:linear-gradient(160deg,${m.c[0]},${m.c[1]})"><small>${m.rate}</small><span class="poster-title">${esc(m.title)}</span>${poster(m)}</a>
<button class="heart ${wish().includes(m.id)?"on":""}" data-w="${m.id}" aria-label="Toggle watchlist for ${esc(m.title)}" aria-pressed="${wish().includes(m.id)}">♥</button>
<div class="info"><strong>${esc(m.title)}</strong><p>${m.genre} · ${m.lang} · ${m.dur}</p><p class="stars">★ ${m.r||"New"}</p><a class="btn" href="booking.html?id=${m.id}">Book tickets</a></div></article>`;
function layout(a){
 document.head.insertAdjacentHTML("beforeend",'<link rel="stylesheet" href="extra.css?v=poster-fix">');
 const L=[["index.html","Home","home"],["index.html#movies","Movies","movies"],["mybookings.html","My bookings","my"],["contact.html","Help","help"]];
 document.body.insertAdjacentHTML("afterbegin",`<header><div class="wrap"><a class="logo" href="index.html">Movie<b>Dekoo</b><span>.com</span></a><nav>${L.map(l=>`<a href="${l[0]}" class="${l[2]==a?"on":""}">${l[1]}</a>`).join("")}<button class="tt" id="tt" aria-label="Switch light or dark theme">◐</button></nav></div></header>`);
 document.body.insertAdjacentHTML("beforeend",`<footer><div class="wrap">© 2026 MovieDekoo.com · College project, payments are simulated · Posters from TMDB (not endorsed by TMDB) · <a href="admin.html">Admin</a></div></footer>`);
 $("#tt").onclick=()=>{const t=document.documentElement.dataset.theme=="dark"?"light":"dark";document.documentElement.dataset.theme=t;localStorage.mdk_theme=t};
 fetchPosters();
}