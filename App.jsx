import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Send, Phone, Gift, Heart, Image as ImageIcon, Music, Clock, Instagram, Mail, Sparkles, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/**
 * UNDANGAN PERNIKAHAN – ELEGANT ONE-PAGE
 * --------------------------------------------------
 * • Teknologi: React (single file), Tailwind, shadcn/ui, framer-motion
 * • Fitur: Hero, Countdown, Detail Acara, Peta, RSVP (dummy), Galeri, Gift, Love Story, Guestbook, Musik BG
 * • Cara pakai:
 *    1) Ubah nilai pada konstanta "DATA" di bawah.
 *    2) Deploy ke Vercel/Netlify atau export ke proyek React kamu.
 *    3) Jika ingin RSVP tersambung ke Google Form/Formspree, ganti handleSubmit.
 */

const DATA = {
  coupleA: {
    name: "Ariana Putri",
    instagram: "arianap",
    parents: "Putra dari Bapak Anwar & Ibu Ratna",
  },
  coupleB: {
    name: "Rizky Ramadhan",
    instagram: "rizky.r",
    parents: "Putri dari Bapak Surya & Ibu Dewi",
  },
  event: {
    date: "2025-10-18T09:00:00+08:00", // ISO string with timezone
    dayName: "Sabtu, 18 Oktober 2025",
    akad: {
      time: "09.00 WITA",
      venue: "Masjid Al-Ikhlas, Jl. Mawar No. 12, Makassar",
      map: "https://maps.google.com/?q=Masjid%20Al-Ikhlas%20Makassar",
    },
    resepsi: {
      time: "11.00 – 14.00 WITA",
      venue: "Ballroom Hotel Nirwana, Jl. Bunga No. 45, Makassar",
      map: "https://maps.google.com/?q=Hotel%20Nirwana%20Makassar",
    },
  },
  hero: {
    cover: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1600&auto=format&fit=crop",
    music: "https://cdn.pixabay.com/download/audio/2022/08/09/audio_3d3d3b.mp3?filename=romantic-piano-115111.mp3",
    quote: "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan-pasangan dari jenismu sendiri... (QS Ar-Rum: 21)",
  },
  gallery: [
    "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519744346363-66f2b1700a1d?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1400&auto=format&fit=crop",
  ],
  story: [
    { year: "2019", title: "Pertemuan Pertama", desc: "Bertemu di kampus dalam sebuah kegiatan kepanitiaan." },
    { year: "2021", title: "Menjadi Pasangan", desc: "Mulai saling mengenal lebih dalam dan berkomitmen." },
    { year: "2024", title: "Lamaran", desc: "Kedua keluarga bersilaturahmi dan merencanakan hari bahagia." },
  ],
  gift: {
    note: "Doa restu adalah hadiah terbaik. Namun jika berkenan berbagi tanda kasih:",
    rekening: [
      { bank: "BCA", name: "Ariana Putri", number: "1234567890" },
      { bank: "BRI", name: "Rizky Ramadhan", number: "9876543210" },
    ],
    address: "Jl. Kenanga No. 10, Makassar 90114",
    contact: "+62 812-3456-7890",
  },
  theme: {
    primary: "from-rose-200 via-rose-100 to-amber-50",
    accent: "bg-rose-500",
  },
};

function useCountdown(targetISO) {
  const target = useMemo(() => new Date(targetISO).getTime(), [targetISO]);
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, target - now);
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { d, h, m, s, done: diff === 0 };
}

function Confetti({ trigger }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (!trigger) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = 240);
    let pieces = Array.from({ length: 120 }, () => ({
      x: Math.random() * w,
      y: Math.random() * -h,
      r: 4 + Math.random() * 6,
      vy: 2 + Math.random() * 3,
      vx: -2 + Math.random() * 4,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      pieces.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.y > h) p.y = -10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${Math.random()*360},80%,60%)`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => { w = canvas.width = window.innerWidth; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, [trigger]);
  return <canvas ref={canvasRef} className="w-full" height={240} />;
}

function SectionTitle({ icon: Icon, title, subtitle }) {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Icon className="h-5 w-5" />
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
      </div>
      {subtitle && <p className="text-muted-foreground max-w-xl mx-auto">{subtitle}</p>}
    </div>
  );
}

export default function WeddingInvitation() {
  const [playing, setPlaying] = useState(false);
  const [rsvpDone, setRsvpDone] = useState(false);
  const audioRef = useRef(null);
  const { d, h, m, s } = useCountdown(DATA.event.date);

  useEffect(() => {
    const audio = new Audio(DATA.hero.music);
    audio.loop = true;
    audioRef.current = audio;
    return () => { audio.pause(); };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) audio.pause(); else audio.play();
    setPlaying(p => !p);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());
    // TODO: Integrate with Google Form/Formspree/Airtable here.
    console.log("RSVP SUBMIT", data);
    setRsvpDone(true);
    e.currentTarget.reset();
    setTimeout(() => setRsvpDone(false), 8000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-rose-50 text-slate-900">
      {/* NAV */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 backdrop-blur bg-white/70 border shadow-sm rounded-full px-4 py-2 flex gap-3 items-center">
        <a href="#home" className="text-sm hover:underline">Home</a>
        <a href="#event" className="text-sm hover:underline">Acara</a>
        <a href="#rsvp" className="text-sm hover:underline">RSVP</a>
        <a href="#gallery" className="text-sm hover:underline">Galeri</a>
        <a href="#gift" className="text-sm hover:underline">Hadiah</a>
        <a href="#guestbook" className="text-sm hover:underline">Ucapan</a>
        <Button size="sm" variant="secondary" className="ml-2" onClick={toggleMusic}>
          <Music className="h-4 w-4 mr-2" /> {playing ? "Pause" : "Play"}
        </Button>
      </nav>

      {/* HERO */}
      <section id="home" className={`relative overflow-hidden pt-28 pb-16 bg-gradient-to-br ${DATA.theme.primary}`}>
        <div className="absolute inset-0">
          <img src={DATA.hero.cover} alt="cover" className="w-full h-full object-cover opacity-30" />
        </div>
        <div className="relative container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center">
            <p className="uppercase tracking-[0.3em] text-xs md:text-sm">Undangan Pernikahan</p>
            <h1 className="text-4xl md:text-6xl font-bold mt-3">
              {DATA.coupleA.name}
              <span className="mx-3 font-light">&</span>
              {DATA.coupleB.name}
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg opacity-90">{DATA.hero.quote}</p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow">
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">{DATA.event.dayName}</span>
            </div>
          </motion.div>

          {/* COUNTDOWN */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {[{label:'Hari',value:d},{label:'Jam',value:h},{label:'Menit',value:m},{label:'Detik',value:s}].map((it,idx)=> (
              <Card key={idx} className="rounded-2xl">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-semibold tabular-nums">{String(it.value).padStart(2,'0')}</div>
                  <div className="text-xs text-muted-foreground mt-1">{it.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* COUPLE */}
      <section className="container mx-auto px-4 py-14">
        <SectionTitle icon={Heart} title="Dengan Hormat" subtitle="Kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri hari bahagia kami." />
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[DATA.coupleA, DATA.coupleB].map((c, i) => (
            <Card key={i} className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl">{c.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground">{c.parents}</p>
                <div className="flex items-center gap-2 text-sm">
                  <Instagram className="h-4 w-4" />
                  <a className="hover:underline" href={`https://instagram.com/${c.instagram}`} target="_blank" rel="noreferrer">@{c.instagram}</a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* EVENT DETAILS */}
      <section id="event" className="container mx-auto px-4 py-14">
        <SectionTitle icon={Calendar} title="Detail Acara" subtitle="Mohon perhatikan waktu dan lokasi berikut." />
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5" /> Akad Nikah</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm">{DATA.event.dayName} • {DATA.event.akad.time}</div>
              <div className="flex items-start gap-2 text-sm"><MapPin className="h-4 w-4 mt-0.5" /> {DATA.event.akad.venue}</div>
              <div className="mt-3">
                <Button asChild variant="outline"><a href={DATA.event.akad.map} target="_blank" rel="noreferrer"><MapPin className="h-4 w-4 mr-2" />Lihat Peta</a></Button>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" /> Resepsi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm">{DATA.event.dayName} • {DATA.event.resepsi.time}</div>
              <div className="flex items-start gap-2 text-sm"><MapPin className="h-4 w-4 mt-0.5" /> {DATA.event.resepsi.venue}</div>
              <div className="mt-3">
                <Button asChild variant="outline"><a href={DATA.event.resepsi.map} target="_blank" rel="noreferrer"><MapPin className="h-4 w-4 mr-2" />Lihat Peta</a></Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* STORY */}
      <section className="container mx-auto px-4 py-14">
        <SectionTitle icon={Star} title="Our Story" subtitle="Perjalanan singkat kami hingga menuju pelaminan." />
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-rose-200" />
          <div className="space-y-8">
            {DATA.story.map((s, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`md:grid md:grid-cols-2 items-center gap-6 ${idx % 2 ? 'md:text-left' : 'md:text-right'}`}>
                <div className={`md:${idx%2? 'order-2':''} p-4`}>
                  <h3 className="text-xl font-semibold">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.year}</p>
                </div>
                <div className="p-4">
                  <p className="text-sm leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="container mx-auto px-4 py-14">
        <SectionTitle icon={ImageIcon} title="Galeri" subtitle="Sekilas momen kebersamaan kami." />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {DATA.gallery.map((src, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="aspect-[4/3] overflow-hidden rounded-2xl shadow">
              <img src={src} alt={`gallery-${i}`} className="w-full h-full object-cover hover:scale-105 transition-transform" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* RSVP */}
      <section id="rsvp" className="container mx-auto px-4 py-14">
        <SectionTitle icon={Send} title="Konfirmasi Kehadiran" subtitle="Mohon isi formulir berikut untuk membantu kami menyiapkan jamuan terbaik." />
        <div className="max-w-2xl mx-auto">
          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium">Nama</label>
                  <Input name="nama" required placeholder="Nama lengkap" />
                </div>
                <div>
                  <label className="text-sm font-medium">Jumlah Tamu</label>
                  <Input name="jumlah" type="number" min={1} max={10} required defaultValue={1} />
                </div>
                <div>
                  <label className="text-sm font-medium">Kontak (HP/Email)</label>
                  <Input name="kontak" placeholder="0812… / email" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium">Ucapan</label>
                  <Textarea name="ucapan" rows={3} placeholder="Tulis doa & pesan untuk mempelai" />
                </div>
                <div className="md:col-span-2 flex items-center justify-between gap-3">
                  <Button type="submit" className="rounded-2xl"><Send className="h-4 w-4 mr-2" />Kirim RSVP</Button>
                  <div className="text-xs text-muted-foreground">Dengan ini Anda menyetujui etika tamu & protokol tempat.</div>
                </div>
              </form>
              <AnimatePresence>
                {rsvpDone && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-6">
                    <Confetti trigger={rsvpDone} />
                    <p className="text-center font-medium">Terima kasih! RSVP Anda telah terekam.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* GIFT */}
      <section id="gift" className="container mx-auto px-4 py-14">
        <SectionTitle icon={Gift} title="Tanda Kasih" subtitle={DATA.gift.note} />
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {DATA.gift.rekening.map((r,i)=> (
            <Card key={i} className="rounded-2xl"><CardContent className="p-6 space-y-1">
              <div className="text-sm text-muted-foreground">{r.bank}</div>
              <div className="text-xl font-semibold tracking-wide">{r.number}</div>
              <div className="text-sm">a.n. {r.name}</div>
              <Button onClick={()=>navigator.clipboard.writeText(r.number)} size="sm" variant="outline" className="mt-3">Salin Nomor</Button>
            </CardContent></Card>
          ))}
          <Card className="rounded-2xl md:col-span-1"><CardContent className="p-6">
            <div className="text-sm mb-2">Alamat Pengiriman</div>
            <div className="text-sm text-muted-foreground">{DATA.gift.address}</div>
            <div className="flex items-center gap-2 text-sm mt-3"><Phone className="h-4 w-4" /> {DATA.gift.contact}</div>
          </CardContent></Card>
        </div>
      </section>

      {/* MAP EMBED */}
      <section className="container mx-auto px-4 pb-14">
        <Card className="rounded-2xl overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5" /> Lokasi Resepsi</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <iframe title="map" className="w-full h-[360px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d997.0!2d119.0!3d-5.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zLTA!5e0!3m2!1sen!2sid!4v1700000000000" />
          </CardContent>
        </Card>
      </section>

      {/* GUESTBOOK (local only) */}
      <Guestbook />

      {/* FOOTER */}
      <footer className="border-t bg-white/60">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <div>Terima kasih atas doa dan kehadiran Anda.</div>
          <div className="mt-1">© {new Date().getFullYear()} {DATA.coupleA.name} & {DATA.coupleB.name}</div>
          <div className="mt-2 inline-flex items-center gap-1 text-xs"><Sparkles className="h-3 w-3" /> Dibuat dengan cinta.</div>
        </div>
      </footer>
    </div>
  );
}

function Guestbook() {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem("guestbook") || "[]"); } catch { return []; }
  });
  const nameRef = useRef(null);
  const msgRef = useRef(null);

  useEffect(() => { localStorage.setItem("guestbook", JSON.stringify(items)); }, [items]);

  const add = (e) => {
    e.preventDefault();
    const name = nameRef.current.value.trim();
    const msg = msgRef.current.value.trim();
    if (!name || !msg) return;
    setItems([{ name, msg, at: new Date().toISOString() }, ...items]);
    nameRef.current.value = ""; msgRef.current.value = "";
  };

  return (
    <section id="guestbook" className="container mx-auto px-4 py-14">
      <SectionTitle icon={Mail} title="Buku Tamu" subtitle="Tinggalkan ucapan terbaik Anda untuk kami." />
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card className="rounded-2xl">
          <CardContent className="p-6 space-y-3">
            <div>
              <label className="text-sm font-medium">Nama</label>
              <Input ref={nameRef} placeholder="Nama Anda" />
            </div>
            <div>
              <label className="text-sm font-medium">Ucapan</label>
              <Textarea ref={msgRef} rows={3} placeholder="Tuliskan ucapan" />
            </div>
            <Button onClick={add} className="rounded-2xl"><Send className="h-4 w-4 mr-2" />Kirim Ucapan</Button>
          </CardContent>
        </Card>
        <div className="space-y-3">
          {items.length === 0 && (
            <Card className="rounded-2xl"><CardContent className="p-6 text-sm text-muted-foreground">Belum ada ucapan. Jadilah yang pertama!</CardContent></Card>
          )}
          {items.map((it, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Card className="rounded-2xl">
                <CardContent className="p-5">
                  <div className="text-sm font-medium">{it.name}</div>
                  <div className="text-sm text-muted-foreground mt-1">{new Date(it.at).toLocaleString()}</div>
                  <p className="text-sm mt-2 leading-relaxed">{it.msg}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
