import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown, ArrowLeft, ArrowRight, CalendarDays, Check, ChevronDown, Clock3, Instagram, MapPin, Menu, MessageCircle, Phone, Plus, Star, X } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import * as THREE from 'three'

const dental = ['Consultation','Implants','Braces','Crown & Bridge','Hollywood Smile','Root Canal','Extraction','Digital X-Ray']
const facial = ['Laser Hair Removal','CO2 Laser','Lip Fillers','Botox','Hydra Facial','Skin Tag Removal','Mole Removal','Body Slimming','Body Fillers','Skin Whitening Injections']
const nav = ['Home','About','Dental Services','Facial Aesthetic Services','Doctors','Gallery','Testimonials','Blog','Contact']
const whatsapp = "https://wa.me/923493737123?text=Hello%20I'd%20like%20to%20book%20an%20appointment"
const doctorImages = [
  'https://raw.githubusercontent.com/haithmkafi-droid/my-images/main/IMG_20260711_194234.jpg',
  'https://raw.githubusercontent.com/haithmkafi-droid/my-images/main/IMG_20260711_194345.jpg',
  'https://raw.githubusercontent.com/haithmkafi-droid/my-images/main/IMG_20260711_195854.jpg'
]
const artisanImage = 'https://raw.githubusercontent.com/haithmkafi-droid/my-images/main/IMG-20261112-WA0003.jpg'
const serviceImages = [
  'https://raw.githubusercontent.com/haithmkafi-droid/my-images/main/IMG_20260711_194509.jpg',
  'https://raw.githubusercontent.com/haithmkafi-droid/my-images/main/IMG_20260711_194540.jpg',
  'https://raw.githubusercontent.com/haithmkafi-droid/my-images/main/IMG_20260711_194558.jpg',
  'https://raw.githubusercontent.com/haithmkafi-droid/my-images/main/IMG_20260711_194638.jpg',
  'https://raw.githubusercontent.com/haithmkafi-droid/my-images/main/IMG_20260711_194619.jpg',
  'https://raw.githubusercontent.com/haithmkafi-droid/my-images/main/IMG_20260711_194701.jpg',
  'https://raw.githubusercontent.com/haithmkafi-droid/my-images/main/IMG_20260711_194717.jpg',
  'https://raw.githubusercontent.com/haithmkafi-droid/my-images/main/IMG_20260711_195446.jpg',
  'https://raw.githubusercontent.com/haithmkafi-droid/my-images/main/IMG_20260711_195510.jpg',
  'https://raw.githubusercontent.com/haithmkafi-droid/my-images/main/IMG_20260711_195706.jpg',
  'https://raw.githubusercontent.com/haithmkafi-droid/my-images/main/IMG_20260711_195813.jpg'
]
const promoImage = 'https://raw.githubusercontent.com/haithmkafi-droid/my-images/main/IMG-20261110-WA0000.jpg'
const technologyImage = 'https://raw.githubusercontent.com/haithmkafi-droid/my-images/main/IMG-20261110-WA0002.jpg'
const patientTreatmentImage = 'https://raw.githubusercontent.com/haithmkafi-droid/my-images/main/IMG-20261110-WA0003.jpg'
const galleryImages = [patientTreatmentImage, ...doctorImages, ...serviceImages]
const chatQuestions = [
  ['What are your working hours?','Monday to Saturday, 9 AM — 7 PM. Sunday: By appointment.'],
  ['Where is the clinic located?','Commercial Area, Near UBL Bank, Saidu Sharif Swat, Pakistan.'],
  ['How do I book an appointment?','Book via WhatsApp at: 0349-3737123'],
  ['What services do you offer?','Dental (Implants, Braces, Hollywood Smile, Root Canal, etc.) + Aesthetic (Botox, Fillers, Laser, etc.).']
]
const reviews = [
  ['“A rare balance of clinical precision and genuine warmth. The entire experience felt remarkably considered.”','Ayesha K.','SMILE DESIGN'],
  ['“From consultation to final result, every detail was calm, clear and completely personalized.”','Hamza R.','DENTAL CARE'],
  ['“Elegant surroundings, an exceptional team, and results that look beautifully natural.”','Sara N.','AESTHETICS']
]

function Particles() {
  const mount = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!mount.current) return
    const host = mount.current, scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, .1, 100)
    camera.position.z = 4
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false }); renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5)); renderer.setSize(innerWidth, innerHeight); host.appendChild(renderer.domElement)
    const geo = new THREE.BufferGeometry(), points = new Float32Array(150 * 3)
    for(let i=0;i<points.length;i++) points[i]=(Math.random()-.5)*8
    geo.setAttribute('position', new THREE.BufferAttribute(points,3))
    const cloud = new THREE.Points(geo,new THREE.PointsMaterial({color:0xc6a664,size:.012,transparent:true,opacity:.38})); scene.add(cloud)
    let frame=0; const tick=()=>{ cloud.rotation.y+=.00035; renderer.render(scene,camera); frame=requestAnimationFrame(tick)}; tick()
    const resize=()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)}; addEventListener('resize',resize)
    return()=>{cancelAnimationFrame(frame);removeEventListener('resize',resize);renderer.dispose();host.innerHTML=''}
  },[])
  return <div ref={mount} className="particles" aria-hidden />
}

function App() {
  const [loaded,setLoaded]=useState(false), [menu,setMenu]=useState(false), [booking,setBooking]=useState(false), [service,setService]=useState<string|null>(null), [zoom,setZoom]=useState<string|null>(null), [review,setReview]=useState(0), [faq,setFaq]=useState(0), [success,setSuccess]=useState(false), [date,setDate]=useState(12)
  const [chat,setChat]=useState(false), [chatAnswer,setChatAnswer]=useState<number|null>(null)
  useEffect(()=>{const t=setTimeout(()=>setLoaded(true),1900); return()=>clearTimeout(t)},[])
  useEffect(()=>{
    gsap.registerPlugin(ScrollTrigger)
    const lenis=new Lenis({duration:1.15,smoothWheel:true}); const raf=(time:number)=>{lenis.raf(time);requestAnimationFrame(raf)}; const id=requestAnimationFrame(raf)
    const ctx=gsap.context(()=>{gsap.utils.toArray<HTMLElement>('.reveal').forEach(el=>gsap.fromTo(el,{y:70,opacity:0},{y:0,opacity:1,duration:1.25,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%'}})); gsap.utils.toArray<HTMLElement>('.parallax').forEach(el=>gsap.to(el,{yPercent:10,ease:'none',scrollTrigger:{trigger:el.parentElement,start:'top bottom',end:'bottom top',scrub:true}}))})
    return()=>{cancelAnimationFrame(id);lenis.destroy();ctx.revert()}
  },[loaded])
  useEffect(()=>{const t=setInterval(()=>setReview(v=>(v+1)%reviews.length),6000);return()=>clearInterval(t)},[])
  const go=(n:string)=>{document.getElementById(n.toLowerCase().replaceAll(' ','-'))?.scrollIntoView({behavior:'smooth'});setMenu(false)}
  const submit=(e:React.FormEvent)=>{e.preventDefault();setSuccess(true);setTimeout(()=>{setSuccess(false);setBooking(false)},2400)}
  return <div className="app">
    <AnimatePresence>{!loaded&&<motion.div className="loader" exit={{opacity:0,transition:{duration:.7}}}><motion.div initial={{opacity:0,scale:.85}} animate={{opacity:1,scale:1}} className="loader-mark">D<span>+</span></motion.div><div className="loader-line"><motion.i initial={{scaleX:0}} animate={{scaleX:1}} transition={{duration:1.5}}/></div><p>DR. DENTO · SAIDU SHARIF</p></motion.div>}</AnimatePresence>
    <Particles/>
    <header className="nav"><button className="brand" onClick={()=>go('Home')}><b>DR. DENTO</b><small>DENTAL & AESTHETIC CENTER</small></button><nav>{nav.map(n=><button key={n} onClick={()=>go(n)}>{n.replace(' Services','')}</button>)}</nav><button className="gold-btn nav-book" onClick={()=>setBooking(true)}>Book appointment</button><button className="menu-btn" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></header>
    <AnimatePresence>{menu&&<motion.div className="mobile-nav" initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} exit={{opacity:0}}>{nav.map((n,i)=><motion.button initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:i*.04}} onClick={()=>go(n)}>{n}</motion.button>)}</motion.div>}</AnimatePresence>

    <main>
      <section id="home" className="hero">
        <div className="hero-glow"/><div className="hero-copy reveal"><div className="eyebrow"><i/> PRIVATE DENTISTRY · SAIDU SHARIF, SWAT</div><h1>Crafting Beautiful Smiles <em>& Timeless Confidence</em></h1><p>Premium Dental & Facial Aesthetic Care in Saidu Sharif Swat</p><div className="hero-actions"><button className="gold-btn magnetic" onClick={()=>setBooking(true)}>Book appointment <ArrowRight/></button><a className="ghost-btn magnetic" href={whatsapp} target="_blank" rel="noreferrer">WhatsApp consultation</a></div><div className="scroll-cue"><ArrowDown/><span>DISCOVER THE EXPERIENCE</span></div></div>
        <div className="doctor-wrap"><div className="doctor-halo"/><img className="doctor-img parallax" src={doctorImages[2]} alt="Dr. Asad Shafiq"/><div className="doctor-id glass"><span>FOUNDER & LEAD CLINICIAN</span><h2>Dr. Asad Shafiq</h2><p>BSD <i/> DDS <i/> C-Ortho <i/> C-Endo</p></div></div>
        <div className="hero-index">01 <i/> 05</div>
      </section>

      <section id="about" className="about section light"><div className="section-no">01 / PHILOSOPHY</div><div className="about-grid"><div className="reveal"><p className="kicker">BEYOND THE EXPECTED</p><h2>Where science meets<br/><em>the art of confidence.</em></h2></div><div className="reveal body-copy"><p>We envision care as a deeply personal craft—uniting clinical intelligence, quiet luxury and a thoughtful understanding of every individual.</p><p>This is dentistry and aesthetics reframed: calm, precise, and designed around you.</p><button className="text-link">OUR STORY <ArrowRight/></button></div></div><div className="about-media reveal"><img className="parallax" src="/images/clinic.jpg" alt="Modern clinic interior"/><div className="stats glass"><div><strong>12</strong><span>YEARS OF<br/>EXCELLENCE</span></div><div><strong>04</strong><span>ADVANCED<br/>CERTIFICATIONS</span></div></div></div></section>

      <section id="dental-services" className="services section dark"><div className="section-heading reveal"><div><p className="kicker">02 / DENTAL CARE</p><h2>Precision, shaped<br/><em>around you.</em></h2></div><p>Advanced dentistry delivered with a human touch. Every treatment begins with listening.</p></div><div className="tech-feature reveal"><div className="tech-media"><img className="parallax" src={technologyImage} alt="Doctor using advanced dental microscopy" loading="lazy" decoding="async"/><span className="glass">ADVANCED MICROSCOPY · PRECISION IN PRACTICE</span></div><div className="tech-copy"><p className="kicker">TECHNOLOGY, IN SERVICE OF CARE</p><h3>Detail is a form<br/>of <em>excellence.</em></h3><p>Advanced magnification and modern dental equipment support more accurate treatment planning, considered execution and an experience that feels calm at every step.</p><div className="tech-points"><span>Precision-led planning</span><span>Modern clinical equipment</span><span>Carefully detailed outcomes</span></div></div></div><div className="service-list">{dental.map((s,i)=><button className="service-row reveal" onClick={()=>setService(s)} key={s}><span>{String(i+1).padStart(2,'0')}</span><img className="service-thumb" src={serviceImages[i]} alt={s}/><h3>{s}</h3><p>{['Clarity from the very first conversation.','A permanent foundation for natural confidence.','Thoughtful alignment, beautifully considered.','Restoration where strength meets form.','A bespoke approach to your signature smile.','Precision care, lasting comfort.','Gentle solutions with considered aftercare.','Immediate insight with minimal exposure.'][i]}</p><ArrowRight/></button>)}</div></section>

      <section id="facial-aesthetic-services" className="aesthetics section warm"><div className="aesthetic-intro reveal"><p className="kicker">03 / FACIAL AESTHETICS</p><h2>Subtle by design.<br/><em>Distinctly you.</em></h2><p>Refined treatments grounded in anatomy, proportion, and restraint—never transformation for transformation's sake.</p></div><div className="aesthetic-stage reveal"><img className="parallax" src={serviceImages[8]} alt="Facial aesthetic care"/><div className="floating-menu glass">{facial.map((s,i)=><button key={s} onClick={()=>setService(s)}><span>{String(i+1).padStart(2,'0')}</span>{s}<Plus/></button>)}</div></div></section>

      <section id="doctors" className="team section dark"><div className="center-head reveal"><p className="kicker">04 / THE TEAM</p><h2>THE <em>ARTISANS</em></h2><p>Individual expertise. One shared standard.</p></div><div className="team-grid single-artisan"><article className="glass reveal"><img src={artisanImage} alt="Dr. Asad Shafiq"/><small>ORTHODONTICS · ENDODONTICS · HOLLYWOOD SMILE · IMPLANTOLOGY</small><h3>Dr. Asad Shafiq</h3><p className="credentials">BSD · DDS · C-Ortho · C-Endo</p><p className="doctor-bio">With twelve years of clinical mastery and certifications in both orthodontics and endodontics, Dr. Asad Shafiq leads Dr. Dento with a philosophy of precision, honesty and artistry. From complex root canals to complete smile transformations, every treatment carries his personal attention to detail.</p></article></div></section>

      <section id="gallery" className="gallery section light"><div className="section-heading reveal"><div><p className="kicker">05 / OUR WORLD</p><h2>Details define<br/><em>the experience.</em></h2></div><p>Explore the people, treatments and considered details that define Dr. Dento.</p></div><div className="masonry">{galleryImages.map((im,i)=><motion.button whileHover={{scale:.985}} onClick={()=>setZoom(im)} className="gallery-img" key={im}><img src={im} alt={`Dr. Dento gallery ${i+1}`} loading="lazy" decoding="async"/><span>{String(i+1).padStart(2,'0')} — {i===0?'PATIENT CARE':i<4?'THE ARTISANS':'CARE & AESTHETICS'}</span></motion.button>)}</div></section>

      <section id="special-offers" className="offers section warm"><div className="offers-intro reveal"><p className="kicker">SPECIAL OFFERS</p><h2>A considered<br/><em>invitation.</em></h2><p>Explore current offers and clinic information from Dr. Dento, presented with the same care and precision we bring to every visit.</p><a className="text-link" href={whatsapp} target="_blank" rel="noreferrer">ENQUIRE VIA WHATSAPP <ArrowRight/></a></div><motion.button className="offer-poster reveal" whileHover={{scale:.99}} onClick={()=>setZoom(promoImage)} aria-label="Open Dr. Dento special offers poster"><img src={promoImage} alt="Dr. Dento special offers and clinic information" loading="lazy" decoding="async"/></motion.button></section>

      <section id="testimonials" className="testimonials section dark"><p className="kicker">06 / TESTIMONIALS</p><AnimatePresence mode="wait"><motion.div key={review} initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} className="review"><div className="stars">{[1,2,3,4,5].map(x=><Star key={x} fill="currentColor"/>)}</div><blockquote>{reviews[review][0]}</blockquote><b>{reviews[review][1]}</b><span>{reviews[review][2]}</span></motion.div></AnimatePresence><div className="review-nav"><button onClick={()=>setReview((review+2)%3)}><ArrowLeft/></button><span>0{review+1} / 03</span><button onClick={()=>setReview((review+1)%3)}><ArrowRight/></button></div></section>

      <section id="blog" className="journal section light"><div className="section-heading"><div><p className="kicker">08 / INSIGHTS</p><h2>The Journal</h2></div></div><div className="articles">{[['The quiet confidence of a naturally designed smile','DENTAL DESIGN'],['A considered guide to modern facial aesthetics','AESTHETICS'],['What to expect from your first consultation','THE PRACTICE']].map((a,i)=><article className="reveal"><span>{a[1]} · 6 MIN READ</span><h3>{a[0]}</h3><button aria-label="Read article"><ArrowRight/></button></article>)}</div></section>

      <section id="faq" className="faq section warm"><div><p className="kicker">09 / QUESTIONS</p><h2>Everything you<br/>may want to <em>know.</em></h2></div><div>{['How do I book my first consultation?','What should I expect at my appointment?','Do you offer personalized treatment plans?','Where is Dr. Dento located?'].map((q,i)=><button className="faq-row" onClick={()=>setFaq(faq===i?-1:i)}><span>{q}</span><ChevronDown className={faq===i?'turn':''}/>{faq===i&&<motion.p initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}}>Every journey begins with an unhurried consultation. Contact our concierge or use the booking experience and our team will guide you personally.</motion.p>}</button>)}</div></section>

      <section id="contact" className="contact section dark"><div className="contact-copy reveal"><p className="kicker">10 / VISIT US</p><h2>Begin your<br/><em>journey.</em></h2><p>Commercial Area,<br/>Near UBL Bank, Saidu Sharif Swat</p><a href="tel:03493737123"><Phone/> 0349-3737123</a><a href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle/> WhatsApp concierge</a><p className="hours"><Clock3/> MON—SAT · 09:00 AM—07:00 PM<br/>SUNDAY · BY APPOINTMENT</p><button className="gold-btn" onClick={()=>setBooking(true)}>BOOK AN APPOINTMENT <ArrowRight/></button></div><div className="map reveal"><iframe title="Dr. Dento location map" src="https://maps.google.com/maps?q=UBL%20Bank%20Saidu%20Sharif%20Swat&t=&z=15&ie=UTF8&iwloc=&output=embed" width="100%" height="100%" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"/><div className="pin"><MapPin/><span>DR. DENTO<br/><small>SAIDU SHARIF · SWAT</small></span></div></div></section>
    </main>

    <footer><div className="brand"><b>DR. DENTO</b><small>DENTAL & AESTHETIC CENTER</small></div><p>Thoughtful care.<br/>Beautifully delivered.</p><div><a href="tel:03493737123">0349-3737123 <Phone/></a><a href="#contact">NEAR UBL BANK, SAIDU SHARIF <ArrowRight/></a></div><small>© 2025 DR. DENTO — DENTAL & AESTHETIC CENTER. ALL RIGHTS RESERVED. · PRIVACY</small></footer>
    <button className="sticky-book" onClick={()=>setBooking(true)}><CalendarDays/><span>BOOK</span></button><a className="whatsapp" href={whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp Dr. Dento"><MessageCircle/></a><button className="chat-toggle" onClick={()=>setChat(!chat)} aria-label="Open clinic assistant"><MessageCircle/></button>

    <AnimatePresence>{chat&&<motion.aside className="chatbot" initial={{opacity:0,y:20,scale:.95}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:20,scale:.95}}><div className="chat-head"><div><b>Dr. Dento Concierge</b><span>Online now</span></div><button onClick={()=>setChat(false)}><X/></button></div><div className="bot-message">Welcome to Dr. Dento. How may I help you today?</div><div className="chat-questions">{chatQuestions.map((item,i)=><button onClick={()=>setChatAnswer(i)}>{item[0]}</button>)}</div><AnimatePresence mode="wait">{chatAnswer!==null&&<motion.div key={chatAnswer} className="bot-answer" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}>{chatQuestions[chatAnswer][1]}{chatAnswer===2&&<a href={whatsapp} target="_blank" rel="noreferrer"> Open WhatsApp <ArrowRight/></a>}</motion.div>}</AnimatePresence></motion.aside>}</AnimatePresence>

    <AnimatePresence>{service&&<motion.div className="modal-back" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setService(null)}><motion.div className="service-modal" initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{type:'spring',damping:28}} onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setService(null)}><X/></button><img className="modal-service-img" src={serviceImages[[...dental,...facial].indexOf(service)%serviceImages.length]} alt={service}/><p className="kicker">BESPOKE TREATMENT</p><h2>{service}</h2><p>A personalized, clinically considered approach designed around your comfort, goals and long-term wellbeing.</p><div className="detail-grid">{[['BENEFITS','Natural, considered outcomes'],['TIMELINE','Personalized after consultation'],['RECOVERY','Guided care and support'],['FAQ','Everything explained clearly']].map(x=><div><small>{x[0]}</small><b>{x[1]}</b></div>)}</div><div className="ba-card" style={{backgroundImage:`url(${serviceImages[([...dental,...facial].indexOf(service)+1)%serviceImages.length]})`}}><span>BEFORE</span><span>AFTER</span></div><button className="gold-btn" onClick={()=>{setService(null);setBooking(true)}}>PLAN YOUR CONSULTATION <ArrowRight/></button></motion.div></motion.div>}</AnimatePresence>
    <AnimatePresence>{booking&&<motion.div className="modal-back booking-back" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><motion.form className="booking" onSubmit={submit} initial={{scale:.94,y:30}} animate={{scale:1,y:0}} exit={{scale:.94,opacity:0}}><button type="button" className="close" onClick={()=>setBooking(false)}><X/></button>{success?<motion.div className="success" initial={{scale:.5}} animate={{scale:1}}><div><Check/></div><h2>You're all set.</h2><p>Our concierge will confirm your visit shortly.</p></motion.div>:<><p className="kicker">PRIVATE APPOINTMENT</p><h2>Choose your preferred date.</h2><div className="calendar-head"><button type="button"><ArrowLeft/></button><b>December 2025</b><button type="button"><ArrowRight/></button></div><div className="calendar"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>{Array.from({length:31},(_,i)=><button type="button" className={date===i+1?'selected':''} onClick={()=>setDate(i+1)}>{i+1}</button>)}</div><div className="form-row"><input required placeholder="Your name"/><input required type="tel" placeholder="Phone / WhatsApp"/></div><label className="reminder"><input type="checkbox" defaultChecked/> Send me an appointment reminder</label><button className="gold-btn" type="submit">REQUEST APPOINTMENT <ArrowRight/></button></>}</motion.form></motion.div>}</AnimatePresence>
    <AnimatePresence>{zoom&&<motion.div className="zoom" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setZoom(null)}><button><X/></button><motion.img initial={{scale:.8}} animate={{scale:1}} src={zoom}/></motion.div>}</AnimatePresence>
  </div>
}

export default App
