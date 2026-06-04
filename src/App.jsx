import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import './App.css'

function App() {
  return (
    <main className="page">
      <Nav />

      <section id="intro" className="section hero">
        <div className="heroText">
          <p className="badge">Cours interactif · Surface spécifique</p>
          <h1>Comprendre la surface spécifique.</h1>
          <p className="lead">
            Une poudre peut sembler petite, mais cacher une surface interne immense grâce à ses pores.
          </p>
        </div>

        <PremiumPoreVisual />
      </section>

      <section id="surface" className="section">
        <TextCard
          badge="1. L’idée de base"
          title="La surface utile est souvent cachée à l’intérieur."
        >
          <p>
            La surface spécifique correspond à toute la surface accessible dans un matériau.
            Plus il y a de pores, plus l’azote peut entrer et toucher de parois.
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
            Les micropores se remplissent très tôt car leurs parois sont très proches.
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
            P₀ est la pression de saturation de l’azote. P/P₀ indique à quel point
            on se rapproche de cette saturation.
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

      <section id="azote" className="section">
        <TextCard
          badge="5. Condensation capillaire"
          title="Dans un mésopore, l’azote peut finir par former un liquide."
        >
          <p>
            À faible P/P₀, l’azote est surtout gazeux. À forte P/P₀, il peut condenser
            dans les pores comme dans de minuscules capillaires.
          </p>
        </TextCard>

        <CapillaryCondensation />
      </section>

      <section id="energie" className="section twoCols">
        <TextCard
          badge="6. Énergie de surface"
          title="Pourquoi les micropores se remplissent avant le reste ?"
        >
          <p>
            Sur une surface externe, l’azote est attiré par une seule paroi.
            Dans un micropore, deux parois proches attirent la molécule en même temps.
          </p>
          <p>
            Cette attraction renforcée explique le remplissage très précoce des micropores.
          </p>
        </TextCard>

        <EnergyVisual />
      </section>
    </main>
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
      <a href="#azote">Condensation</a>
      <a href="#energie">Énergie</a>
    </nav>
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
      <PoreType name="Micropore" size="< 2 nm" type="micro" text="Très étroit : remplissage très précoce." />
      <PoreType name="Mésopore" size="2 à 50 nm" type="meso" text="Tunnel intermédiaire : adsorption puis condensation possible." />
      <PoreType name="Macropore" size="> 50 nm" type="macro" text="Grande cavité : surtout visible à forte P/P₀." />
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
  const [value, setValue] = useState(8)
  const p = value / 100

  const microFill = clamp(p / 0.12, 0, 1) * 100
  const mesoFill = clamp((p - 0.22) / 0.48, 0, 1) * 100
  const macroFill = clamp((p - 0.72) / 0.26, 0, 1) * 100

  let state = 'Micropores'
  let explanation = 'À très faible P/P₀, les micropores commencent déjà à se remplir.'

  if (p >= 0.15 && p < 0.55) {
    state = 'Adsorption progressive'
    explanation = 'Les micropores sont largement remplis. Les mésopores commencent à participer.'
  }

  if (p >= 0.55 && p < 0.85) {
    state = 'Condensation capillaire'
    explanation = 'Les mésopores peuvent se remplir plus fortement par condensation capillaire.'
  }

  if (p >= 0.85) {
    state = 'Proche saturation'
    explanation = 'Les grandes cavités et espaces entre particules deviennent plus visibles.'
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
        className="poreFill"
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
      title: '1. Micropores',
      text: 'Les micropores se remplissent en premier car les parois sont très proches.',
    },
    {
      title: '2. Monocouche',
      text: 'Une première couche de molécules se forme sur les surfaces accessibles.',
    },
    {
      title: '3. Multicouche',
      text: 'De nouvelles molécules viennent se déposer sur la première couche.',
    },
    {
      title: '4. Condensation',
      text: 'À forte P/P₀, l’azote peut condenser dans les mésopores.',
    },
  ]

  return (
    <div className="sequenceGrid">
      <div className="controlPanel">
        <div className="bigValue">{steps[step].title}</div>
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

      <div className={`adsorptionVisual step${step}`}>
        <div className="surfacePlate topPlate" />
        <div className="surfacePlate bottomPlate" />

        <div className="microSlot">
          <div className="microLiquid" />
        </div>

        <div className="monoLayer">
          {Array.from({ length: 18 }).map((_, i) => <span key={i} />)}
        </div>

        <div className="multiLayer">
          {Array.from({ length: 15 }).map((_, i) => <span key={i} />)}
        </div>

        <div className="capillarySlot">
          <div className="capillaryLiquid" />
        </div>
      </div>
    </div>
  )
}

function CapillaryCondensation() {
  const [value, setValue] = useState(20)
  const p = value / 100
  const fill = p < 0.68 ? 0 : clamp((p - 0.68) / 0.32, 0, 1) * 88

  let state = 'Gaz + adsorption'
  let text = 'L’azote est surtout gazeux. Quelques molécules s’accrochent aux parois.'

  if (p >= 0.35 && p < 0.68) {
    state = 'Couches adsorbées'
    text = 'Les parois du mésopore se couvrent progressivement de molécules.'
  }

  if (p >= 0.68) {
    state = 'Condensation capillaire'
    text = 'Le centre du pore se remplit : une phase condensée apparaît dans le mésopore.'
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

      <div className="capillaryVisual">
        <div className="tubeWall leftTube" />
        <div className="tubeWall rightTube" />

        <div className="adsorbedDots leftDots">
          {Array.from({ length: 12 }).map((_, i) => <span key={i} />)}
        </div>

        <div className="adsorbedDots rightDots">
          {Array.from({ length: 12 }).map((_, i) => <span key={i} />)}
        </div>

        <motion.div
          className="condensedLiquid"
          animate={{ height: `${fill}%` }}
          transition={{ duration: 0.4 }}
        />

        <div className="meniscus" style={{ bottom: `${fill}%`, opacity: fill > 4 ? 1 : 0 }} />
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