import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import './App.css'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function HomePage() {
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="page">
      <GlobalNitrogen />
      <Nav />

      <section id="intro" className="section hero heroFull">
  <NitrogenField />

  <div className="heroText heroTextWide">
    <h1>Comprendre l'adsorption d'azote</h1>
    <p className="lead">
      Une bille peut sembler petite, mais révéler une surface interne immense grâce à sa porosité.
      </p>
      </div>
      </section>

      <section id="surface" className="section">
        <TextCard
  badge="1. L’idée de base"
  title="Ce n’est pas le volume qui compte, c’est la surface accessible."
>
  <p>
    Imaginez une bille compacte : l’azote peut seulement toucher l’extérieur.
  </p>
  <p>
    Maintenant, imaginez une bille remplie de tunnels minuscules : l’azote peut entrer
    et toucher beaucoup plus de parois. La surface disponible augmente fortement.
  </p>
</TextCard>

        <div className="surfaceCards">
          <InfoCard title="Compact" text="Peu de surface accessible." type="compact" />
          <InfoCard title="Poreux" text="Des cavités ajoutent de la surface interne." type="porous" />
          <InfoCard title="Microporeux" text="Beaucoup de petits pores créent une surface énorme." type="micro" />
        </div>
      </section>

      <section id="pores" className="section twoCols">
        <TextCard
          badge="2. Les types de pores"
          title="Micropores, mésopores et macropores."
        >
          <p>
            Les micropores sont très étroits, les mésopores sont intermédiaires,
            et les macropores sont de grandes cavités.
          </p>
          <p>
          </p>
        </TextCard>

        <PoreTypes />
      </section>

      <section id="pp0" className="section">
        <TextCard
          badge="3. P/P₀"
          title="Fais varier P/P₀ et observe le remplissage."
        >
          <p>
            P représente la pression de l'azote gazeux autour du matériau analysé.
          </p>
          <p>
            P₀ est la pression de saturation de l’azote. C'est a dire la pression à laquelle il se liquéfie.
          </p>
          <p>
            P/P₀ indique à quel point on se rapproche de cette saturation.
          </p>

        </TextCard>

        <PP0Simulator />
      </section>

      <section id="sequence" className="section">
        <TextCard
          badge="4. Séquence d’adsorption"
          title="Micropores, monocouche, multicouche, puis condensation."
        >
          <p>
            L’azote ne remplit pas tout d’un coup. Il commence par les zones les plus attractives,
            puis forme des couches sur la surface, avant de condenser dans certains pores.
          </p>
        </TextCard>

        <AdsorptionSequence />
      </section>

      <section id="conclusion" className="section twoCols">
  <TextCard
    badge="5. Conclusion"
    title="L’adsorption d’azote révèle la surface cachée des matériaux."
  >
    <p>
      Toute la mesure BET consiste à estimer combien de surface est accessible aux molécules d’azote.
    </p>
    <p>
      Plus les molécules peuvent accéder à des parois internes, plus la surface spécifique calculée est élevée.
    </p>

    <Link className="nextPageButton" to="/determinations">
  Explorer les autres analyses à l’azote
</Link>
  </TextCard>

  <BETConclusion />
</section>
    </main>
  )
}

function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/determinations" element={<DeterminationsPage />} />
      </Routes>
    </>
  )
}

function GlobalNitrogen() {
  const molecules = useMemo(() => {
    return Array.from({ length: 95 }, (_, i) => ({
      id: i,
      left: -45 + Math.random() * 190,
      top: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 5 + Math.random() * 7,
      size: 5 + Math.random() * 7,
    }))
  }, [])

  return (
    <div className="globalNitrogen">
      {molecules.map((m) => (
        <span
          key={m.id}
          style={{
            left: `${m.left}%`,
            top: `${m.top}%`,
            width: `${m.size}px`,
            height: `${m.size}px`,
            animationDelay: `${m.delay}s`,
            animationDuration: `${m.duration}s`,
          }}
        />
      ))}
    </div>
  )
}

function Nav() {
  return (
    <nav className="nav">
      <a href="#intro">Intro</a>
      <a href="#surface">Surface</a>
      <a href="#pores">Pores</a>
      <a href="#pp0">P/P₀</a>
      <a href="#sequence">Adsorption</a>
      <a href="#conclusion">Conclusion</a>
    </nav>
  )
}
function NitrogenField() {
  const molecules = useMemo(() => {
    return Array.from({ length: 90 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 6,
      duration: 5 + Math.random() * 6,
      size: 5 + Math.random() * 7,
    }))
  }, [])

  return (
    <div className="nitrogenField">
      {molecules.map((m) => (
        <span
          key={m.id}
          style={{
            left: `${m.left}%`,
            top: `${m.top}%`,
            width: `${m.size}px`,
            height: `${m.size}px`,
            animationDelay: `${m.delay}s`,
            animationDuration: `${m.duration}s`,
          }}
        />
      ))}
    </div>
  )
}

function TextCard({ badge, title, children }) {
  return (
    <motion.div
      className="textCard"
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.35 }}
      transition={{ duration: 0.65 }}
    >
      <p className="badge">{badge}</p>
      <h2>{title}</h2>
      <div>{children}</div>
    </motion.div>
  )
}

function PremiumPoreVisual() {
  const molecules = useMemo(() => {
    return Array.from({ length: 34 }, (_, i) => ({
      id: i,
      left: 8 + Math.random() * 84,
      top: 8 + Math.random() * 84,
      delay: Math.random() * 4,
    }))
  }, [])

  return (
    <motion.div
      className="premiumVisual"
      initial={{ opacity: 0, y: 60, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.9 }}
    >
      <div className="rockSlice">
        <div className="tunnel tunnel1" />
        <div className="tunnel tunnel2" />
        <div className="tunnel tunnel3" />
        <div className="microCrack crack1" />
        <div className="microCrack crack2" />
        <div className="microCrack crack3" />
      </div>

      {molecules.map((m) => (
        <span
          key={m.id}
          className="floatingDot"
          style={{
            left: `${m.left}%`,
            top: `${m.top}%`,
            animationDelay: `${m.delay}s`,
          }}
        />
      ))}

      <div className="caption">
        Coupe simplifiée d’un matériau poreux : l’azote explore les cavités internes.
      </div>
    </motion.div>
  )
}

function InfoCard({ title, text, type }) {
  return (
    <motion.div className="infoCard" whileHover={{ y: -8 }}>
      <div className={`sphere ${type}`} />
      <h3>{title}</h3>
      <p>{text}</p>
    </motion.div>
  )
}

function PoreTypes() {
  return (
    <div className="poreTypes">
      <PoreType name="Micropore" size="< 2 nm" type="micro" text="Pore très étroit." />
      <PoreType name="Mésopore" size="2 à 50 nm" type="meso" text="Pore de taille intermédiaire." />
      <PoreType name="Macropore" size="> 50 nm" type="macro" text="Grande cavité." />
    </div>
  )
}

function PoreType({ name, size, type, text }) {
  return (
    <motion.div
      className="poreType"
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ duration: 0.55 }}
    >
      <div className={`poreIcon ${type}`}>
        <span />
      </div>
      <div>
        <h3>{name}</h3>
        <b>{size}</b>
        <p>{text}</p>
      </div>
    </motion.div>
  )
}

function PP0Simulator() {
  const [value, setValue] = useState(0)
  const p = value / 100

  const microFill = clamp(p / 0.10, 0, 1) * 100
  const mesoFill = clamp((p - 0.11) / 0.70, 0, 1) * 100
  const macroFill = clamp((p - 0.75) / 0.30, 0, 1) * 60

  let state = 'Pression nulle'
  let explanation = 'Aucune molécule d’azote n’est adsorbée. La surface du matériau est libre.'

  if (p >= 0.01 && p < 0.11) {
    state = 'Micropores'
    explanation = 'À très faible P/P₀, les micropores commencent déjà à se remplir.'
  }

  if (p >= 0.11 && p < 0.55) {
    state = 'Adsorption progressive'
    explanation = 'Les micropores sont largement remplis. Les mésopores commencent à se remplir à leur tour.'
  }

  if (p >= 0.55 && p < 0.85) {
    state = 'Condensation capillaire'
    explanation = 'Les mésopores peuvent se remplir plus fortement par condensation capillaire.'
  }

  if (p >= 0.85) {
    state = 'Proche de la saturation'
    explanation = 'À l’approche de la saturation, l’azote atteint progressivement les plus grandes cavités du matériau.'
  }

  return (
<div className="simGrid">
  <div className="controlPanel">
    <div className="bigValue">
  P/P₀ = {p.toFixed(2)}
</div>

    <input
      type="range"
      min="0"
      max="100"
      value={value}
      onChange={(e) => setValue(Number(e.target.value))}
    />

    <div className="state">{state}</div>
    <p>{explanation}</p>
  </div>

  <div className="poreMachine">
    <PoreShape className="microPore a" fill={microFill} />
    <PoreShape className="microPore b" fill={microFill} />
    <PoreShape className="microPore c" fill={microFill} />
    <PoreShape className="mesoPore a" fill={mesoFill} />
    <PoreShape className="mesoPore b" fill={mesoFill} />
    <PoreShape className="macroPore a" fill={macroFill} />
  </div>
</div>
  )
}

function PoreShape({ className, fill }) {
  return (
    <div className={`poreShape ${className}`}>
      <motion.div
        className={`poreFill ${fill > 95 ? 'full' : ''}`}
        animate={{ height: `${fill}%` }}
        transition={{ duration: 0.35 }}
      />
    </div>
  )
}

function AdsorptionSequence() {
  const [step, setStep] = useState(0)

  const steps = [
    {
      title: '1. Remplissage des micropores',
      text: 'Les micropores se remplissent en premier : c’est un remplissage de volume très étroit. (environ P/P0 = 0,1)',
    },
    {
      title: '2. Monocouche',
      text: 'Une première couche d’azote se forme sur les parois internes accessibles. C’est a ce moment là que nous relevont la BET. (environ P/P0 = 0,3)',
    },
    {
      title: '3. Multicouche',
      text: 'À mesure que l’adsorption progresse, les molécules d’azote s’empilent et forment plusieurs couches sur la surface du matériau.',
    },
    {
      title: '4. Condensation capillaire',
      text: 'À l’approche de la pression de saturation, l’azote commence à se condenser dans les pores. La porosité accessible se remplit progressivement jusqu’à permettre l’estimation du volume poreux total. (environ P/P₀ = 0,995)',
    },
  ]

  return (
    <div className="simGrid">
      <div className="controlPanel sequencePanel">
        <div className="bigValue sequenceBigValue">{steps[step].title}</div>

        <input
          type="range"
          min="0"
          max="3"
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
        />

        <div className="state">Étape {step + 1}/4</div>
        <p>{steps[step].text}</p>
      </div>

      <div className={`cleanSequence step${step}`}>
        <div className="seqTitle">Vue simplifiée dans un pore</div>

        <div className="seqPore">
          <div className="seqWall left" />
          <div className="seqWall right" />

          <div className="seqMicroFill">
  {step === 0 && (
    <div className="microStack">
      {Array.from({ length: 12 }).map((_, i) => (
        <span key={i} />
      ))}
    </div>
  )}
</div>

          <div className="seqMono left">
            {Array.from({ length: 10 }).map((_, i) => <span key={i} />)}
          </div>
          <div className="seqMono right">
            {Array.from({ length: 10 }).map((_, i) => <span key={i} />)}
          </div>

          <div className="seqMulti left">
            {Array.from({ length: 8 }).map((_, i) => <span key={i} />)}
          </div>
          <div className="seqMulti right">
            {Array.from({ length: 8 }).map((_, i) => <span key={i} />)}
          </div>

          <div className="seqCondensed" />
        </div>

        <div className="seqCaption">
          Micropore → monocouche → multicouche → condensation de l'azote
        </div>
      </div>
    </div>
  )
}

function CapillaryCondensation() {
  const [value, setValue] = useState(4)
  const p = value / 100

  const monoOpacity = clamp((p - 0.22) / 0.16, 0, 1)
  const multiOpacity = clamp((p - 0.42) / 0.18, 0, 1)
  const liquid = p < 0.68 ? 0 : clamp((p - 0.68) / 0.24, 0, 1) * 82
  const macroLimit = p < 0.96 ? 0 : clamp((p - 0.96) / 0.04, 0, 1) * 55

  let state = 'Gaz dominant'
  let text = 'À très faible P/P₀, l’azote est surtout gazeux. Le mésopore n’est pas encore recouvert.'

  if (p >= 0.22 && p < 0.42) {
    state = 'Monocouche'
    text = 'Une première couche apparaît sur les parois internes du mésopore.'
  }

  if (p >= 0.42 && p < 0.68) {
    state = 'Multicouche'
    text = 'Plusieurs couches se forment avant la condensation capillaire.'
  }

  if (p >= 0.68 && p < 0.96) {
    state = 'Condensation capillaire'
    text = 'Le centre du mésopore se remplit : une phase condensée apparaît.'
  }

  if (p >= 0.96) {
    state = 'Cas limite macropore'
    text = 'Très proche de P/P₀ = 1, les plus petits macropores peuvent commencer à se remplir.'
  }

  return (
    <div className="simGrid">
      <div className="controlPanel">
        <div className="bigValue">P/P₀ = {p.toFixed(2)}</div>
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        />
        <div className="state">{state}</div>
        <p>{text}</p>
      </div>

      <div className="cleanCapillary">
        <div className="capTitle">Mésopore : monocouche → multicouche → condensation</div>

        <div className="capPore">
          <div className="capWall left" />
          <div className="capWall right" />

          <div className="capMono left" style={{ opacity: monoOpacity }}>
            {Array.from({ length: 12 }).map((_, i) => <span key={i} />)}
          </div>
          <div className="capMono right" style={{ opacity: monoOpacity }}>
            {Array.from({ length: 12 }).map((_, i) => <span key={i} />)}
          </div>

          <div className="capMulti left" style={{ opacity: multiOpacity }}>
            {Array.from({ length: 10 }).map((_, i) => <span key={i} />)}
          </div>
          <div className="capMulti right" style={{ opacity: multiOpacity }}>
            {Array.from({ length: 10 }).map((_, i) => <span key={i} />)}
          </div>

          <motion.div
            className="capLiquid"
            animate={{ height: `${liquid}%` }}
            transition={{ duration: 0.4 }}
          />
          <motion.div
            className="capMeniscus"
            animate={{ bottom: `${liquid}%`, opacity: liquid > 4 ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <div className="smallMacro">
          <span>Petit macropore<br />cas limite près de 1</span>
          <div className="smallMacroTube">
            <motion.div
              className="smallMacroFill"
              animate={{ height: `${macroLimit}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function BETConclusion() {
  const [level, setLevel] = useState(0)

  const steps = [
    {
      label: 'Compact',
      value: 2,
      text: 'Peu de surface accessible.',
    },
    {
      label: 'Poreux',
      value: 85,
      text: 'Les pores ajoutent de la surface interne.',
    },
    {
      label: 'Très poreux',
      value: 250,
      text: 'L’azote atteint beaucoup plus de parois.',
    },
    {
      label: 'Énormément poreux',
      value: 500,
      text: 'La surface accessible devient immense.',
    },
  ]

  const current = steps[level]

  return (
    <div className="betVisual">
      <div className={`betParticle betLevel${level}`}>
<span className="betPore p1" />
<span className="betPore p2" />
<span className="betPore p3" />
<span className="betPore p4" />
<span className="betPore p5" />

<span className="betPore p6" />
<span className="betPore p7" />

<span className="betPore p8" />
<span className="betPore p9" />

        {Array.from({ length: 30 }).map((_, i) => (
          <span key={i} className={`betNitrogen n${i}`} />
        ))}
      </div>

      <div className="betCounter">
        <span>{current.label}</span>
        <strong>{current.value} m²/g</strong>
        <p>{current.text}</p>

        <input
          type="range"
          min="0"
          max="3"
          value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
        />
      </div>
    </div>
  )
}

function EnergyVisual() {
  return (
    <div className="energyBox">
      <div className="wall left" />
      <div className="wall right" />
      <motion.div
        className="centralMolecule"
        animate={{ y: [0, -18, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      />
      <motion.div
        className="force leftForce"
        animate={{ opacity: [0.3, 1, 0.3], scaleX: [0.6, 1, 0.6] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      />
      <motion.div
        className="force rightForce"
        animate={{ opacity: [0.3, 1, 0.3], scaleX: [0.6, 1, 0.6] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      />
      <p>
        Dans un micropore, deux parois proches attirent la molécule en même temps.
      </p>
    </div>
  )
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

export default App

function DeterminationsPage() {
  return (
    <main className="page">
      <GlobalNitrogen />

      <Link className="backButton" to="/">
        ← Retour
      </Link>

      <section className="section">
        <TextCard
          badge="Analyses à l’azote"
          title="Que peut-on déterminer avec une isotherme d’adsorption ?"
        >
          <p>
            L’adsorption d’azote ne sert pas seulement à mesurer la surface BET.
            La forme complète de l’isotherme permet aussi d’estimer le volume poreux
            et de comprendre le comportement poreux du matériau.
          </p>
        </TextCard>

        <div className="determinationGrid">
          <DeterminationCard
            title="Surface BET"
            text="La zone linéaire de l’isotherme permet d’estimer la surface spécifique."
            highlight="Zone BET : environ P/P₀ = 0,05 à 0,30"
            type="bet"
          />

          <DeterminationCard
            title="Volume poreux total"
            text="À très forte pression relative, la quantité adsorbée permet d’estimer le volume poreux total."
            highlight="Lecture proche de P/P₀ = 0,99"
            type="volume"
          />

          <DeterminationCard
            title="Forme de l’isotherme"
            text="La forme globale de la courbe renseigne sur la nature de la porosité et l’hystérèse."
            highlight="Adsorption et désorption"
            type="isotherm"
          />
          <DeterminationCard
            title="Microporosité"
            text="La microporosité s’observe à très faible P/P₀. Une forte adsorption dès les basses pressions indique la présence de pores très étroits."
            highlight="Zone micropore : très faibles P/P₀"
            type="micro"
          />
        </div>
      </section>
    </main>
  )
}

function DeterminationCard({ title, text, highlight, type }) {
  const [paused, setPaused] = useState(false)

  return (
    <div className="determinationCard">
      <button
        className="graphPauseButton"
        onClick={() => setPaused(!paused)}
        aria-label={paused ? 'Reprendre animation' : 'Mettre en pause'}
      >
        {paused ? '▶' : '⏸'}
      </button>

      <div className={paused ? 'graphPaused' : ''}>
        <AnimatedGraph type={type} />
      </div>

      <h3>{title}</h3>
      <p>{text}</p>
      <span>{highlight}</span>
    </div>
  )
}

function AnimatedGraph({ type }) {
const adsorptionPath =
type === 'micro'
    ? 'M40 182 C40 120, 42 110, 55 108 C75 108, 95 108, 118 108 C170 108, 210 108, 226 72 C242 38, 266 36, 290 34'
    : 'M40 182 C70 126, 104 112, 142 112 C180 112, 214 98, 236 70 C258 42, 274 34, 290 34'

const desorptionPath =
  type === 'micro'
    ? 'M290 34 C248 34, 228 36, 212 44 C190 58, 184 92, 160 108'
    : 'M290 34 C245 34, 225 36, 210 44 C188 58, 182 92, 160 110'

  return (
    <svg className={`animatedGraph ${type}`} viewBox="0 0 320 220">
      <line x1="38" y1="185" x2="292" y2="185" />
      <line x1="38" y1="185" x2="38" y2="28" />

<path
  className="graphLine graphAdsorption curveBlue"
  d={adsorptionPath}
/>

<path
  className="graphLine graphDesorption curveBlue"
  d={desorptionPath}
/>
{type === 'isotherm' && (
  <>
    <path
      className="graphIsoReplay graphIsoAdsorption"
      d={adsorptionPath}
    />

    <path
      className="graphIsoReplay graphIsoDesorption"
      d={desorptionPath}
    />
  </>
)}
      {type === 'bet' && (
  <path
    className="graphBetZone"
    d="M62 142 C82 124, 106 114, 142 112"
  />
)}

      {type === 'micro' && (
  <path
    className="graphMicroZone"
    d="M40 182 C40 122, 42 112, 50 108"
  />
)}

      {type === 'volume' && (
        <circle className="graphPoint" cx="288" cy="31" r="8" />
      )}
<text
  x="160"
  y="203"
  className="graphAxisLabel"
>
  P/P₀
</text>

<text
  x="-30"
  y="108"
  className="graphAxisLabel graphAxisLabelY"
>
  Quantité adsorbée
</text>
    </svg>
  )
}