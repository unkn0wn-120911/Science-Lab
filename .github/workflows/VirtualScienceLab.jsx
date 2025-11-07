import React, { useState, useEffect } from "react";

// VirtualSciencePortal.jsx // Single-file React component (default export) for a small educational website // Features: // - Virtual Science Lab (simple color-mixing experiment + slider-controlled parameters) // - Human Body Explorer (clickable SVG body parts with short descriptions) // - Solar System Model (simple SVG animation showing orbiting planets) // // Usage: // - This file is a ready-to-use React component. Drop it into a Vite/CRA/Next project. // - Tailwind CSS utility classes are used for styling. Make sure Tailwind is configured. // - No external assets required. You can replace placeholder text/images with your own.

export default function VirtualSciencePortal() { const [tab, setTab] = useState("lab");

return ( <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 p-6 text-slate-900"> <header className="max-w-5xl mx-auto mb-8"> <h1 className="text-3xl md:text-4xl font-extrabold">Virtual Science Portal</h1> <p className="mt-2 text-slate-600">Explore experiments, the human body, and our solar system — interactive and beginner-friendly.</p> <nav className="mt-4 flex gap-2"> <TabButton active={tab === "lab"} onClick={() => setTab("lab")}>Virtual Lab</TabButton> <TabButton active={tab === "body"} onClick={() => setTab("body")}>Human Body Explorer</TabButton> <TabButton active={tab === "solar"} onClick={() => setTab("solar")}>Solar System Model</TabButton> </nav> </header>

<main className="max-w-5xl mx-auto space-y-8">
    {tab === "lab" && <VirtualLab />}
    {tab === "body" && <HumanBodyExplorer />}
    {tab === "solar" && <SolarSystemModel />}
  </main>

  <footer className="max-w-5xl mx-auto mt-12 text-sm text-slate-500">Built for learning • Modify freely for classroom or personal projects</footer>
</div>

); }

function TabButton({ children, active, onClick }) { return ( <button onClick={onClick} className={px-4 py-2 rounded-lg font-medium transition-shadow ${ active ? "bg-sky-500 text-white shadow-lg" : "bg-white text-slate-700 border" }} > {children} </button> ); }

// ---------------- Virtual Lab ---------------- function VirtualLab() { // A simple color-mixing experiment where two "solutions" mix and produce a color result const [redA, setRedA] = useState(200); const [greenA, setGreenA] = useState(50); const [blueA, setBlueA] = useState(50);

const [redB, setRedB] = useState(50); const [greenB, setGreenB] = useState(120); const [blueB, setBlueB] = useState(200);

const [ratioA, setRatioA] = useState(50); // percent of A in the mix

const mixed = mixRGB([redA, greenA, blueA], [redB, greenB, blueB], ratioA / 100);

return ( <section className="bg-white p-6 rounded-2xl shadow"> <h2 className="text-2xl font-bold">Virtual Science Lab</h2> <p className="mt-1 text-slate-600">Try mixing two colored solutions and observe the result. Adjust RGB and ratio to simulate concentration changes.</p>

<div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="space-y-4">
      <h3 className="font-semibold">Solution A</h3>
      <RGBSlider label="Red" value={redA} onChange={setRedA} />
      <RGBSlider label="Green" value={greenA} onChange={setGreenA} />
      <RGBSlider label="Blue" value={blueA} onChange={setBlueA} />
      <ColorPreview rgb={[redA, greenA, blueA]} label="A" />
    </div>

    <div className="space-y-4">
      <h3 className="font-semibold">Solution B</h3>
      <RGBSlider label="Red" value={redB} onChange={setRedB} />
      <RGBSlider label="Green" value={greenB} onChange={setGreenB} />
      <RGBSlider label="Blue" value={blueB} onChange={setBlueB} />
      <ColorPreview rgb={[redB, greenB, blueB]} label="B" />
    </div>

    <div className="space-y-4 flex flex-col items-stretch">
      <h3 className="font-semibold">Mix & Observe</h3>
      <label className="text-sm text-slate-600">Ratio: % Solution A</label>
      <input type="range" min="0" max="100" value={ratioA} onChange={(e) => setRatioA(Number(e.target.value))} />
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <div className="rounded-lg overflow-hidden border" style={{ height: 120 }}>
            <div className="h-full flex">
              <div style={{ flex: ratioA, background: `rgb(${redA},${greenA},${blueA})` }} />
              <div style={{ flex: 100 - ratioA, background: `rgb(${redB},${greenB},${blueB})` }} />
            </div>
          </div>
          <p className="mt-2 text-sm text-slate-600">Left=A, Right=B. Change sliders and ratio to experiment.</p>
        </div>
        <div className="w-36">
          <ColorPreview rgb={mixed} label={`Mix ${ratioA}% A`} large />
        </div>
      </div>

      <ExperimentNotes mixed={mixed} />
    </div>
  </div>
</section>

); }

function RGBSlider({ label, value, onChange }) { return ( <div> <label className="flex items-center justify-between text-sm text-slate-700"> <span>{label}</span> <span className="font-mono text-xs">{value}</span> </label> <input type="range" min="0" max="255" value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full" /> </div> ); }

function ColorPreview({ rgb, label, large }) { const style = { background: rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]}) }; return ( <div className={large ? "p-2" : "p-1"}> <div className={rounded-md border overflow-hidden ${large ? "h-24" : "h-12"}} style={style} /> <div className="mt-2 text-xs text-slate-600">{label}</div> </div> ); }

function ExperimentNotes({ mixed }) { const [r, g, b] = mixed.map((v) => Math.round(v)); return ( <div className="mt-4 p-3 bg-slate-50 rounded"> <strong>Observation:</strong> <p className="text-sm text-slate-700">The resulting color has RGB values <span className="font-mono">{r}, {g}, {b}</span>. In real chemistry, mixing solutions changes concentration and appearance; here we simulate color blending.</p> <p className="mt-2 text-xs text-slate-500">Try: Set one solution to bright yellow (255,230,0) and the other to blue to see complementary mixing.</p> </div> ); }

function mixRGB(a, b, ratioA) { const ratioB = 1 - ratioA; return [a[0] * ratioA + b[0] * ratioB, a[1] * ratioA + b[1] * ratioB, a[2] * ratioA + b[2] * ratioB]; }

// ---------------- Human Body Explorer ---------------- function HumanBodyExplorer() { const parts = { heart: { name: "Heart", info: "Pumps blood throughout the body. Located in the left center of the chest." }, lungs: { name: "Lungs", info: "Responsible for gas exchange (oxygen in, carbon dioxide out)." }, brain: { name: "Brain", info: "Controls the nervous system and processes information." }, stomach: { name: "Stomach", info: "Breaks down food with acids and enzymes for digestion." }, };

const [active, setActive] = useState("brain");

return ( <section className="bg-white p-6 rounded-2xl shadow"> <h2 className="text-2xl font-bold">Human Body Explorer</h2> <p className="mt-1 text-slate-600">Click an organ to learn a short fact about it.</p>

<div className="mt-6 flex flex-col md:flex-row gap-6">
    <div className="flex-1 flex justify-center">
      <svg viewBox="0 0 200 360" className="w-64 h-auto">
        {/* simplified body */}
        <g>
          <rect x="60" y="20" width="80" height="40" rx="12" fill="#f5f5f5" stroke="#e2e8f0" />
          {/* brain */}
          <ellipse cx="100" cy="40" rx="34" ry="20" fill={active === "brain" ? "#fde68a" : "#ffe"} stroke="#f59e0b" onClick={() => setActive("brain")} style={{ cursor: 'pointer' }} />

          {/* lungs */}
          <g onClick={() => setActive("lungs")} style={{ cursor: 'pointer' }}>
            <ellipse cx="75" cy="110" rx="28" ry="38" fill={active === "lungs" ? "#bfdbfe" : "#e6f0ff"} stroke="#3b82f6" />
            <ellipse cx="125" cy="110" rx="28" ry="38" fill={active === "lungs" ? "#bfdbfe" : "#e6f0ff"} stroke="#3b82f6" />
          </g>

          {/* heart */}
          <path d="M98 130c-6-8-18-8-22 0-4 7 0 18 10 28 10-10 14-21 12-28z" fill={active === "heart" ? "#fecaca" : "#ffe7e7"} stroke="#ef4444" onClick={() => setActive("heart")} style={{ cursor: 'pointer' }} transform="translate(0,4)" />

          {/* stomach */}
          <path d="M70 170c10 20 50 20 60 0 6-12-6-26-20-22-16 4-30 8-40 22z" fill={active === "stomach" ? "#fde68a" : "#fff4cc"} stroke="#f59e0b" onClick={() => setActive("stomach")} style={{ cursor: 'pointer' }} />

          {/* body outline */}
          <rect x="40" y="20" width="120" height="320" rx="36" fill="transparent" stroke="#e6e6e6" />
        </g>
      </svg>
    </div>

    <div className="md:w-1/2">
      <div className="p-4 bg-slate-50 rounded">
        <h3 className="font-semibold text-lg">{parts[active].name}</h3>
        <p className="mt-2 text-slate-700">{parts[active].info}</p>

        <div className="mt-4 text-sm text-slate-500">
          <p><strong>Try this:</strong> Ask students to click different organs and then explain their function in 1–2 sentences.</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {Object.keys(parts).map((k) => (
          <button key={k} onClick={() => setActive(k)} className={`text-left p-3 rounded border ${active===k? 'bg-white shadow' : 'bg-transparent'}`}>
            <div className="font-medium">{parts[k].name}</div>
            <div className="text-xs text-slate-500">{parts[k].info.slice(0,40)}...</div>
          </button>
        ))}
      </div>
    </div>
  </div>
</section>

); }

// ---------------- Solar System Model ---------------- function SolarSystemModel() { return ( <section className="bg-white p-6 rounded-2xl shadow"> <h2 className="text-2xl font-bold">Solar System Model</h2> <p className="mt-1 text-slate-600">A simplified scale-free animation showing planets orbiting the Sun.</p>

<div className="mt-6 flex flex-col md:flex-row gap-6 items-center">
    <div className="w-full md:w-2/3 flex justify-center">
      <div className="relative w-96 h-96">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="rounded-full w-16 h-16 flex items-center justify-center text-sm font-bold" style={{ background: 'radial-gradient(circle at 30% 30%, #ffd166, #ff8a00)' }}>Sun</div>
        </div>

        {/* orbits */}
        <Orbit radius={70} duration={8} name="Mercury" size={6} />
        <Orbit radius={98} duration={12} name="Venus" size={10} />
        <Orbit radius={130} duration={18} name="Earth" size={10} showLabel />
        <Orbit radius={160} duration={28} name="Mars" size={8} />
      </div>
    </div>

    <div className="md:w-1/3">
      <PlanetInfo />
    </div>
  </div>
</section>

); }

function Orbit({ radius, duration, name, size = 8, showLabel }) { const orbitStyle = { width: radius * 2, height: radius * 2, marginLeft: calc(50% - ${radius}px), marginTop: calc(50% - ${radius}px), animation: spin ${duration}s linear infinite, };

return ( <div style={orbitStyle} className="absolute rounded-full border border-dashed/60 flex items-center justify-center"> <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: '100%', top: '50%' }}> <div className="rounded-full" style={{ width: size, height: size, background: '#60a5fa' }} title={name}></div> {showLabel && <div className="text-xs mt-1 text-slate-600">{name}</div>} </div>

<style>{`
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  `}</style>
</div>

); }

function PlanetInfo() { const planets = [ { name: 'Mercury', fact: 'Closest planet to the Sun; very hot days and very cold nights.' }, { name: 'Venus', fact: 'Thick toxic atmosphere; surface hotter than Mercury due to greenhouse effect.' }, { name: 'Earth', fact: 'Our home — the only known planet with liquid water on the surface.' }, { name: 'Mars', fact: 'The red planet; has the largest volcano in the solar system.' }, ];

const [i, setI] = useState(2);

useEffect(() => { const t = setInterval(() => setI((s) => (s + 1) % planets.length), 3500); return () => clearInterval(t); }, []);

return ( <div className="p-4 bg-slate-50 rounded"> <h3 className="font-semibold">Planets</h3> <p className="text-sm text-slate-700 mt-2">{planets[i].name}</p> <p className="text-xs text-slate-500 mt-1">{planets[i].fact}</p>

<div className="mt-4 grid grid-cols-2 gap-2">
    {planets.map((p, idx) => (
      <button key={p.name} onClick={() => setI(idx)} className={`p-2 text-left rounded border ${idx===i? 'bg-white shadow' : ''}`}>
        <div className="font-medium">{p.name}</div>
        <div className="text-xs text-slate-500">{p.fact.slice(0,40)}...</div>
      </button>
    ))}
  </div>
</div>

); }
