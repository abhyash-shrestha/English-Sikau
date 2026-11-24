import React,{useEffect,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {tabs,primary,progressCount,type Tab,type Language} from './model';
import {currentProfile,signIn,signOut,readProgress,type Profile,type VerifiedProgress} from './account';
import {Lesson} from './screens';
import './styles.css';
const live='https://abhyash-shrestha.github.io/English-Sikau/';
function App(){
 const [tab,setTab]=useState<Tab>('home');
 const [more,setMore]=useState(false);
 const [lang,setLang]=useState<Language>('bilingual');
 const [dark,setDark]=useState(()=>matchMedia('(prefers-color-scheme: dark)').matches);
 const [done,setDone]=useState<Tab[]>([]);
 const [profile,setProfile]=useState<Profile|null>(null);
 const [progress,setProgress]=useState<VerifiedProgress|null>(null);
 const [accountOpen,setAccountOpen]=useState(false);
 const [message,setMessage]=useState('');
 const [busy,setBusy]=useState(false);
 useEffect(()=>{document.documentElement.dataset.theme=dark?'dark':'light'},[dark]);
 useEffect(()=>{let active=true;currentProfile().then(p=>{if(active)setProfile(p)}).catch(()=>{});return()=>{active=false}},[]);
 useEffect(()=>{let active=true;setProgress(null);if(profile?.paid)readProgress(profile).then(p=>{if(active)setProgress(p)}).catch(()=>{if(active)setMessage('Existing progress could not be loaded.')});return()=>{active=false}},[profile]);
 useEffect(()=>{if(!more)return;const handler=(event:KeyboardEvent)=>{if(event.key==='Escape')setMore(false)};window.addEventListener('keydown',handler);return()=>window.removeEventListener('keydown',handler)},[more]);
 function go(id:Tab){setTab(id);setMore(false);window.scrollTo({top:0,behavior:'auto'})}
 function complete(){setDone(d=>d.includes(tab)?d:[...d,tab])}
 async function login(e:React.FormEvent<HTMLFormElement>){e.preventDefault();if(busy)return;const data=new FormData(e.currentTarget);setBusy(true);setMessage('');try{setProfile(await signIn(String(data.get('email')),String(data.get('password'))));setAccountOpen(false)}catch{setMessage('Unable to sign in. Check your details or use the existing website.')}finally{setBusy(false)}}
 async function logout(){setBusy(true);setMessage('');try{await signOut();setProfile(null);setProgress(null);setDone([]);go('home')}catch{setMessage('Unable to sign out. Try again.')}finally{setBusy(false)}}
 const title=tabs.find(t=>t[0]===tab)?.[2];
 const nav=(id:Tab)=>{const item=tabs.find(t=>t[0]===id);if(!item)return null;return <button key={id} className="nav-item" aria-current={tab===id?'page':undefined} onClick={()=>go(id)}><span aria-hidden="true">{item[1]}</span><strong>{item[2]}</strong>{(lang==='bilingual'||lang==='all')&&<small lang="ne">{item[3]}</small>}</button>};
 return <>
 <header className="top"><a className="brand" href="#" onClick={e=>{e.preventDefault();go('home')}}><span>🇳🇵</span><span>English <b>Sikau</b><small>अंग्रेजी सिकौं</small></span></a><div className="top-actions"><button className="icon" aria-label={dark?'Light mode':'Dark mode'} onClick={()=>setDark(!dark)}>{dark?'☀':'☾'}</button><button className="account-button" onClick={()=>setAccountOpen(!accountOpen)}>{profile?'Account':'Sign in'}</button></div></header>
 <div className="layout"><aside className="rail" aria-label="Learning navigation">{tabs.map(t=>nav(t[0]))}</aside>
 <main id="main"><div className="preview"><span>Version 2 · development preview</span><a href={live}>Original site ↗</a></div>
 {accountOpen&&<section className="panel account"><h2>{profile?'Your account':'Sign in with your existing account'}</h2>{profile?<><p>{profile.name||profile.email} · {profile.paid?'Lifetime membership':profile.verified?'Verified email':'Email not verified'}</p><button disabled={busy} onClick={logout}>Sign out</button></>:<form onSubmit={login}><label>Email<input type="email" name="email" autoComplete="email" required/></label><label>Password<input type="password" name="password" autoComplete="current-password" required/></label><button className="action" disabled={busy}>{busy?'Signing in…':'Sign in'}</button></form>}<p><a href={live}>Registration, email codes, password reset, payment and trial access remain on the original site.</a></p></section>}
 {message&&<p role="status">{message}</p>}
 <div className="section-head"><h1>{title}</h1><label className="language"><span>Language</span><select value={lang} onChange={e=>setLang(e.target.value as Language)}><option value="en">English</option><option value="bilingual">EN + नेपाली</option><option value="roman">EN + Roman</option><option value="all">All three</option></select></label></div>
 {tab==='home'?<><section className="hero"><p>LEARN · SPEAK · GROW</p><h2>Welcome{profile?.name?' back, '+profile.name.split(' ')[0]:''} 👋</h2><p lang="ne">आज के सिक्ने?</p><p>Choose a short lesson and practice at your own pace.</p><button className="action" onClick={()=>go('coach')}>Start a conversation</button></section><div className="tiles">{tabs.filter(t=>t[0]!=='home').map(t=><button key={t[0]} onClick={()=>go(t[0])}><span>{t[1]}</span><strong>{t[2]}</strong><small>{t[3]}</small></button>)}</div></>:tab==='progress'?<section className="panel"><h2>Preview activity</h2><p className="big">{progressCount(done)} / 9</p><p>Practice activities completed during this preview session. These do not change your account.</p>{progress&&<><h2>Existing account · read only</h2><div className="stats">{Object.entries(progress).map(([k,v])=><div key={k}><strong>{v}</strong><small>{k}</small></div>)}</div></>}</section>:<Lesson key={tab} tab={tab} lang={lang} complete={complete}/>}
 </main></div>
 {more&&<><button className="scrim" aria-label="Close learning menu" onClick={()=>setMore(false)}/><section className="sheet" role="dialog" aria-label="All learning tabs"><div className="sheet-head"><h2>All learning tabs</h2><button className="icon" onClick={()=>setMore(false)} aria-label="Close">×</button></div><nav>{tabs.map(t=>nav(t[0]))}</nav></section></>}
 <nav className="dock" aria-label="Quick navigation">{primary.map(nav)}<button className="nav-item" aria-expanded={more} onClick={()=>setMore(!more)}><span>▦</span><strong>All tabs</strong></button></nav>
 </>}
createRoot(document.getElementById('root')!).render(<App/>);
