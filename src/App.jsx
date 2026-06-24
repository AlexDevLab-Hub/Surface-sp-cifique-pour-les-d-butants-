import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import './App.css'

const translations = {
  "en": {
    "Intro": "Intro",
    "Surface": "Surface",
    "Pores": "Pores",
    "Adsorption": "Adsorption",
    "Conclusion": "Conclusion",
    "Comprendre l'adsorption d'azote": "Understanding nitrogen adsorption",
    "Une bille peut sembler petite, mais révéler une surface interne immense grâce à sa porosité.": "A bead may seem small, yet reveal an immense internal surface thanks to its porosity.",
    "Explorer le parcours :": "Explore the pathway:",
    "Déterminations": "Determinations",
    "Appareils": "Instruments",
    "1. L’idée de base": "1. The basic idea",
    "Ce n’est pas le volume qui compte, c’est la surface accessible.": "What matters is not the volume, but the accessible surface area.",
    "Imaginez une bille compacte : l’azote peut seulement toucher l’extérieur.": "Imagine a compact bead: nitrogen can only touch the outside.",
    "Maintenant, imaginez une bille remplie de tunnels minuscules : l’azote peut entrer et toucher beaucoup plus de parois. La surface disponible augmente fortement.": "Now imagine a bead filled with tiny tunnels: nitrogen can enter and touch many more walls. The available surface area increases sharply.",
    "Compact": "Compact",
    "Peu de surface accessible.": "Little accessible surface area.",
    "Poreux": "Porous",
    "Des cavités ajoutent de la surface interne.": "Cavities add internal surface area.",
    "Microporeux": "Microporous",
    "Beaucoup de petits pores créent une surface énorme.": "Many small pores create a huge surface area.",
    "2. Les types de pores": "2. Types of pores",
    "Micropores, mésopores et macropores.": "Micropores, mesopores and macropores.",
    "Les micropores sont très étroits, les mésopores sont intermédiaires, et les macropores sont de grandes cavités.": "Micropores are very narrow, mesopores are intermediate, and macropores are large cavities.",
    "Micropore": "Micropore",
    "Mésopore": "Mesopore",
    "Macropore": "Macropore",
    "Pore très étroit.": "Very narrow pore.",
    "Pore de taille intermédiaire.": "Intermediate-size pore.",
    "Grande cavité.": "Large cavity.",
    "3. P/P₀": "3. P/P₀",
    "Fais varier P/P₀ et observe le remplissage.": "Adjust P/P₀ and observe the filling.",
    "P représente la pression de l'azote gazeux autour du matériau analysé.": "P represents the pressure of nitrogen gas around the analyzed material.",
    "P₀ est la pression de saturation de l’azote. C'est a dire la pression à laquelle il se liquéfie.": "P₀ is the saturation pressure of nitrogen, meaning the pressure at which it liquefies.",
    "P/P₀ indique à quel point on se rapproche de cette saturation.": "P/P₀ indicates how close we are to this saturation.",
    "Pression nulle": "Zero pressure",
    "Aucune molécule d’azote n’est adsorbée. La surface du matériau est libre.": "No nitrogen molecule is adsorbed. The material surface is free.",
    "Micropores": "Micropores",
    "À très faible P/P₀, les micropores commencent déjà à se remplir.": "At very low P/P₀, micropores already begin to fill.",
    "Adsorption progressive": "Progressive adsorption",
    "Les micropores sont largement remplis. Les mésopores commencent à se remplir à leur tour.": "Micropores are largely filled. Mesopores begin to fill in turn.",
    "Condensation capillaire": "Capillary condensation",
    "Les mésopores peuvent se remplir plus fortement par condensation capillaire.": "Mesopores can fill more strongly through capillary condensation.",
    "Proche de la saturation": "Close to saturation",
    "À l’approche de la saturation, l’azote atteint progressivement les plus grandes cavités du matériau.": "As saturation is approached, nitrogen progressively reaches the largest cavities of the material.",
    "4. Séquence d’adsorption": "4. Adsorption sequence",
    "Micropores, monocouche, multicouche, puis condensation.": "Micropores, monolayer, multilayer, then condensation.",
    "L’azote ne remplit pas tout d’un coup. Il commence par les zones les plus attractives, puis forme des couches sur la surface, avant de condenser dans certains pores.": "Nitrogen does not fill everything at once. It starts with the most attractive zones, then forms layers on the surface before condensing in some pores.",
    "1. Remplissage des micropores": "1. Micropore filling",
    "Les micropores se remplissent en premier : c’est un remplissage de volume très étroit. (environ P/P0 = 0,1)": "Micropores fill first: this is the filling of a very narrow volume. (around P/P0 = 0.1)",
    "2. Monocouche": "2. Monolayer",
    "Une première couche d’azote se forme sur les parois internes accessibles. C’est a ce moment là que nous relevont la BET. (environ P/P0 = 0,3)": "A first layer of nitrogen forms on the accessible internal walls. This is when BET is measured. (around P/P0 = 0.3)",
    "3. Multicouche": "3. Multilayer",
    "À mesure que l’adsorption progresse, les molécules d’azote s’empilent et forment plusieurs couches sur la surface du matériau.": "As adsorption progresses, nitrogen molecules stack and form several layers on the material surface.",
    "4. Condensation capillaire": "4. Capillary condensation",
    "À l’approche de la pression de saturation, l’azote commence à se condenser dans les pores. La porosité accessible se remplit progressivement jusqu’à permettre l’estimation du volume poreux total. (environ P/P₀ = 0,995)": "As saturation pressure is approached, nitrogen begins to condense in the pores. The accessible porosity progressively fills until the total pore volume can be estimated. (around P/P₀ = 0.995)",
    "Étape": "Step",
    "Vue simplifiée dans un micropore": "Simplified view inside a micropore",
    "Vue simplifiée dans un mésopore": "Simplified view inside a mesopore",
    "Vue simplifiée dans un macropore": "Simplified view inside a macropore",
    "Micropore → monocouche → multicouche → condensation de l'azote": "Micropore → monolayer → multilayer → nitrogen condensation",
    "5. Conclusion": "5. Conclusion",
    "L’adsorption d’azote révèle la surface cachée des matériaux.": "Nitrogen adsorption reveals the hidden surface of materials.",
    "Toute la mesure BET consiste à estimer combien de surface est accessible aux molécules d’azote.": "The whole BET measurement consists of estimating how much surface area is accessible to nitrogen molecules.",
    "Plus les molécules peuvent accéder à des parois internes, plus la surface spécifique calculée est élevée.": "The more molecules can access internal walls, the higher the calculated specific surface area.",
    "Explorer les différentes déterminations à l'azote": "Explore the different nitrogen determinations",
    "Surface accessible limitée": "Limited accessible surface area",
    "Surface interne accessible": "Accessible internal surface area",
    "Plus les molécules accèdent à des surfaces internes, plus la surface BET calculée augmente.": "The more molecules access internal surfaces, the more the calculated BET surface area increases.",
    "Reprendre l’animation": "Resume animation",
    "Mettre l’animation en pause": "Pause animation",
    "← Retour": "← Back",
    "Des équipements adaptés à chaque niveau de caractérisation.": "Equipment suited to each level of characterization.",
    "Chaque analyse d’adsorption d’azote nécessite un équipement adapté à la précision recherchée. Notre laboratoire dispose de plusieurs instruments complémentaires permettant de réaliser des mesures de surface spécifique, de volume poreux total et de microporosité.": "Each nitrogen adsorption analysis requires equipment suited to the required precision. Our laboratory has several complementary instruments for measuring specific surface area, total pore volume and microporosity.",
    "Nos appareils de mesure": "Our measuring instruments",
    "Contrôle qualité": "Quality control",
    "Les performances de nos instruments sont régulièrement contrôlées à l’aide de références certifiées Micromeritics afin de garantir la justesse et la reproductibilité des résultats.": "The performance of our instruments is regularly checked using certified Micromeritics references to ensure the accuracy and reproducibility of the results.",
    "Nos équipements": "Our equipment",
    "Survolez un appareil pour afficher ses caractéristiques": "Hover over an instrument to display its characteristics",
    "L’ASAP 2420 est principalement dédié aux analyses de routine et à la détermination des BET. Cet instrument est privilégié pour les échantillons susceptibles de contenir des composés pouvant polluer le circuit d’analyse, notamment certains produits chlorés ou issus d’unités de raffinage.": "The ASAP 2420 is mainly dedicated to routine analyses and BET determination. This instrument is preferred for samples likely to contain compounds that could contaminate the analysis circuit, especially some chlorinated products or products from refining units.",
    "Plus récent, l’ASAP 2425 offre de meilleures performances à faible P/P₀. Il est utilisé pour la détermination des BET, VPT ainsi que pour les isothermes nécessitant une visibilité sur la fin de la microporosité. Cet instrument est réservé aux produits ne présentant aucun risque de pollution.": "More recent, the ASAP 2425 offers better performance at low P/P₀. It is used for BET and TPV determination as well as for isotherms requiring visibility at the end of the microporosity range. This instrument is reserved for products presenting no risk of contamination.",
    "Cet appareil de haute précision, capable d’atteindre des vides très profonds, est principalement utilisé pour l’analyse micropore afin d’avoir une visibilité totale de la zone microporeuse.": "This high-precision instrument, capable of reaching very deep vacuums, is mainly used for micropore analysis to provide full visibility of the microporous region.",
    "Smart VacPrep": "Smart VacPrep",
    "Dégazage sous vide de 6 échantillons simultanément, capable d’atteindre 450 °C et des niveaux de vide très profonds grâce à sa pompe turbomoléculaire.": "Vacuum degassing of 6 samples simultaneously, capable of reaching 450 °C and very deep vacuum levels thanks to its turbomolecular pump.",
    "Pompe à vide hydraulique": "Hydraulic vacuum pump",
    "Production du vide primaire utilisé lors des opérations de dégazage et d'analyse sur l'ASAP 2420.": "Production of the primary vacuum used during degassing and analysis operations on the ASAP 2420.",
    "Pompe à vide à membrane": "Diaphragm vacuum pump",
    "Production d’un vide primaire, propre et sans huile pour les opérations de dégazage et d'analyse sur l'ASAP 2425, Smart VacPrep et 3Flex.": "Production of a clean, oil-free primary vacuum for degassing and analysis operations on the ASAP 2425, Smart VacPrep and 3Flex.",
    "Pompe à vide turbomoléculaire": "Turbomolecular vacuum pump",
    "Obtention d’un vide secondaire très poussé indispensable aux analyses de haute précision. Ce type de pompe est utilisé sur l'ASAP 2425, Smart VacPrep et 3Flex.": "Obtaining a very high secondary vacuum, essential for high-precision analyses. This type of pump is used on the ASAP 2425, Smart VacPrep and 3Flex.",
    "Balance de précision 0,0001 g": "Precision balance 0.0001 g",
    "Pesée précise des échantillons afin de garantir la fiabilité des résultats.": "Precise weighing of samples to ensure the reliability of the results.",
    "Unité antistatique": "Antistatic unit",
    "Réduction des charges électrostatiques susceptibles d’influencer les opérations de pesée.": "Reduction of electrostatic charges likely to influence weighing operations.",
    "Que peut-on déterminer avec une analyse d'adsorption à l'azote ?": "What can be determined with a nitrogen adsorption analysis?",
    "L’adsorption d’azote ne sert pas uniquement à mesurer la surface spécifique BET. Différentes zones de l’isotherme permettent également d’obtenir des informations complémentaires sur la porosité du matériau analysé.": "Nitrogen adsorption is not only used to measure BET specific surface area. Different regions of the isotherm also provide additional information about the porosity of the analyzed material.",
    "Surface BET": "BET surface area",
    "Dans cette zone de l’isotherme, les molécules d’azote recouvrent progressivement la surface du matériau sous forme de monocouche. L’analyse de cinq points de mesure permet alors de calculer la surface spécifique BET.": "In this region of the isotherm, nitrogen molecules progressively cover the material surface as a monolayer. The analysis of five measurement points then allows the BET specific surface area to be calculated.",
    "Zone BET : environ P/P₀ = 0,05 à 0,30": "BET region: around P/P₀ = 0.05 to 0.30",
    "Volume poreux total": "Total pore volume",
    "Lorsque P/P0 s'approche de 1, l’azote remplit progressivement l’ensemble de la porosité. La quantité totale de gaz adsorbée permet alors d’estimer le volume poreux total du matériau.": "When P/P0 approaches 1, nitrogen progressively fills the entire porosity. The total quantity of adsorbed gas then allows the total pore volume of the material to be estimated.",
    "Lecture proche de P/P₀ = 1": "Reading close to P/P₀ = 1",
    "Isotherme": "Isotherm",
    "Au-delà de la surface spécifique BET et du volume poreux total, l’analyse de l’isotherme complet apporte des informations précieuses, notamment sur la répartition de la porosité, la taille et la forme des pores.": "Beyond BET specific surface area and total pore volume, analysis of the full isotherm provides valuable information, especially on pore distribution, size and shape.",
    "Adsorption et désorption": "Adsorption and desorption",
    "La microporosité s’observe à très faible P/P₀. Une forte adsorption dès les basses pressions indique la présence de pores très étroits. Sa mesure requiert une excellente précision de mesure et peut considérablement allonger la durée de l’analyse.": "Microporosity is observed at very low P/P₀. Strong adsorption at low pressures indicates the presence of very narrow pores. Its measurement requires excellent measurement precision and can considerably extend the analysis time.",
    "Zone micropore : P/P0 < 0,1": "Micropore region: P/P0 < 0.1",
    "Reprendre animation": "Resume animation",
    "Mettre en pause": "Pause",
    "Découvrez nos appareils de mesure et équipements": "Discover our measuring instruments and equipment",
    "Quantité adsorbée": "Adsorbed quantity",
    "Gaz dominant": "Dominant gas",
    "À très faible P/P₀, l’azote est surtout gazeux. Le mésopore n’est pas encore recouvert.": "At very low P/P₀, nitrogen is mostly gaseous. The mesopore is not yet covered.",
    "Une première couche apparaît sur les parois internes du mésopore.": "A first layer appears on the internal walls of the mesopore.",
    "Plusieurs couches se forment avant la condensation capillaire.": "Several layers form before capillary condensation.",
    "Le centre du mésopore se remplit : une phase condensée apparaît.": "The center of the mesopore fills: a condensed phase appears.",
    "Cas limite macropore": "Macropore limit case",
    "Très proche de P/P₀ = 1, les plus petits macropores peuvent commencer à se remplir.": "Very close to P/P₀ = 1, the smallest macropores may begin to fill.",
    "Mésopore : monocouche → multicouche → condensation": "Mesopore: monolayer → multilayer → condensation",
    "Petit macropore\ncas limite près de 1": "Small macropore\nlimit case near 1",
    "Dans un micropore, deux parois proches attirent la molécule en même temps.": "In a micropore, two nearby walls attract the molecule at the same time."
  }
}

const LanguageContext = createContext(null)

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem('siteLanguage') || 'fr')

  useEffect(() => {
    localStorage.setItem('siteLanguage', language)
    document.documentElement.lang = language
  }, [language])

  const tr = (text) => translations[language]?.[text] || text

  return (
    <LanguageContext.Provider value={{ language, setLanguage, tr }}>
      {children}
    </LanguageContext.Provider>
  )
}

function useLanguage() {
  return useContext(LanguageContext)
}


function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function HomePage() {
  const { tr } = useLanguage()

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
    <h1>{tr("Comprendre l'adsorption d'azote")}</h1>
    <p className="lead">
      {tr("Une bille peut sembler petite, mais révéler une surface interne immense grâce à sa porosité.")}
      </p>
      </div>
      </section>

      <section className="journeyNav">
  <span className="journeyLabel">
    {tr('Explorer le parcours :')}
  </span>

  <div className="journeyLinks">
    <Link to="/" className="journeyLink active">
      {tr('Adsorption')}
    </Link>

    <Link to="/determinations" className="journeyLink">
      {tr('Déterminations')}
    </Link>

    <Link to="/equipements" className="journeyLink">
      {tr('Appareils')}
    </Link>
  </div>
</section>

      <section id="surface" className="section">
        <TextCard
  badge={tr('1. L’idée de base')}
  title={tr('Ce n’est pas le volume qui compte, c’est la surface accessible.')}
>
  <p>
    {tr('Imaginez une bille compacte : l’azote peut seulement toucher l’extérieur.')}
  </p>
  <p>
    {tr('Maintenant, imaginez une bille remplie de tunnels minuscules : l’azote peut entrer et toucher beaucoup plus de parois. La surface disponible augmente fortement.')}
  </p>
</TextCard>

        <div className="surfaceCards">
          <InfoCard title={tr('Compact')} text={tr('Peu de surface accessible.')} type="compact" />
          <InfoCard title={tr('Poreux')} text={tr('Des cavités ajoutent de la surface interne.')} type="porous" />
          <InfoCard title={tr('Microporeux')} text={tr('Beaucoup de petits pores créent une surface énorme.')} type="micro" />
        </div>
      </section>

      <section id="pores" className="section twoCols">
        <TextCard
          badge={tr('2. Les types de pores')}
          title={tr('Micropores, mésopores et macropores.')}
        >
          <p>
            {tr('Les micropores sont très étroits, les mésopores sont intermédiaires, et les macropores sont de grandes cavités.')}
          </p>
          <p>
          </p>
        </TextCard>

        <PoreTypes />
      </section>

      <section id="pp0" className="section">
        <TextCard
          badge={tr('3. P/P₀')}
          title={tr('Fais varier P/P₀ et observe le remplissage.')}
        >
          <p>
            {tr("P représente la pression de l'azote gazeux autour du matériau analysé.")}
          </p>
          <p>
            {tr("P₀ est la pression de saturation de l’azote. C'est a dire la pression à laquelle il se liquéfie.")}
          </p>
          <p>
            {tr('P/P₀ indique à quel point on se rapproche de cette saturation.')}
          </p>

        </TextCard>

        <PP0Simulator />
      </section>

      <section id="sequence" className="section">
        <TextCard
          badge={tr('4. Séquence d’adsorption')}
          title={tr('Micropores, monocouche, multicouche, puis condensation.')}
        >
          <p>
            {tr('L’azote ne remplit pas tout d’un coup. Il commence par les zones les plus attractives, puis forme des couches sur la surface, avant de condenser dans certains pores.')}
          </p>
        </TextCard>

        <AdsorptionSequence />
      </section>

      <section id="conclusion" className="section twoCols">
  <TextCard
  badge={tr('5. Conclusion')}
  title={tr('L’adsorption d’azote révèle la surface cachée des matériaux.')}
>
  <p>
    {tr('Toute la mesure BET consiste à estimer combien de surface est accessible aux molécules d’azote.')}
  </p>

  <p>
    {tr('Plus les molécules peuvent accéder à des parois internes, plus la surface spécifique calculée est élevée.')}
  </p>

  <div className="standaloneNextButton">
    <Link className="nextPageButton" to="/determinations">
      {tr("Explorer les différentes déterminations à l'azote")}
    </Link>
  </div>
</TextCard>

  <BETConclusion />
</section>
    </main>
  )
}

function App() {
  return (
    <LanguageProvider>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/determinations" element={<DeterminationsPage />} />
        <Route path="/equipements" element={<EquipementsPage />} />
      </Routes>
    </LanguageProvider>
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
  const { tr, language, setLanguage } = useLanguage()

  return (
    <nav className="nav">
      <a href="#intro">{tr('Intro')}</a>
      <a href="#surface">{tr('Surface')}</a>
      <a href="#pores">{tr('Pores')}</a>
      <a href="#pp0">P/P₀</a>
      <a href="#sequence">{tr('Adsorption')}</a>
      <a href="#conclusion">{tr('Conclusion')}</a>
      <div className="languageSwitcher" aria-label="Language selector">
        <button
          type="button"
          className={language === 'fr' ? 'active' : ''}
          onClick={() => setLanguage('fr')}
        >
          🇫🇷 FR
        </button>
        <button
          type="button"
          className={language === 'en' ? 'active' : ''}
          onClick={() => setLanguage('en')}
        >
          🇺🇸 EN
        </button>
      </div>
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
  const { tr } = useLanguage()

  return (
    <div className="poreTypes">
      <PoreType name={tr('Micropore')} size="< 2 nm" type="micro" text={tr('Pore très étroit.')} />
      <PoreType name={tr('Mésopore')} size="2 à 50 nm" type="meso" text={tr('Pore de taille intermédiaire.')} />
      <PoreType name={tr('Macropore')} size="> 50 nm" type="macro" text={tr('Grande cavité.')} />
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
  const { tr } = useLanguage()
  const [value, setValue] = useState(0)
  const p = value / 100

  const microFill = clamp(p / 0.10, 0, 1) * 100
  const mesoFill = clamp((p - 0.11) / 0.70, 0, 1) * 100
  const macroFill = clamp((p - 0.75) / 0.30, 0, 1) * 60

  let state = tr('Pression nulle')
  let explanation = tr('Aucune molécule d’azote n’est adsorbée. La surface du matériau est libre.')

  if (p >= 0.01 && p < 0.11) {
    state = tr('Micropores')
    explanation = tr('À très faible P/P₀, les micropores commencent déjà à se remplir.')
  }

  if (p >= 0.11 && p < 0.55) {
    state = tr('Adsorption progressive')
    explanation = tr('Les micropores sont largement remplis. Les mésopores commencent à se remplir à leur tour.')
  }

  if (p >= 0.55 && p < 0.85) {
    state = tr('Condensation capillaire')
    explanation = tr('Les mésopores peuvent se remplir plus fortement par condensation capillaire.')
  }

  if (p >= 0.85) {
    state = tr('Proche de la saturation')
    explanation = tr('À l’approche de la saturation, l’azote atteint progressivement les plus grandes cavités du matériau.')
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
  const { tr } = useLanguage()
  const [step, setStep] = useState(0)
  const [replayKey, setReplayKey] = useState(0)
  const sequenceRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStep(0)
          setReplayKey((key) => key + 1)
        }
      },
      { threshold: 0.45 }
    )

    if (sequenceRef.current) {
      observer.observe(sequenceRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const steps = [
    {
      title: tr('1. Remplissage des micropores'),
      text: tr('Les micropores se remplissent en premier : c’est un remplissage de volume très étroit. (environ P/P0 = 0,1)'),
    },
    {
      title: tr('2. Monocouche'),
      text: tr('Une première couche d’azote se forme sur les parois internes accessibles. C’est a ce moment là que nous relevont la BET. (environ P/P0 = 0,3)'),
    },
    {
      title: tr('3. Multicouche'),
      text: tr('À mesure que l’adsorption progresse, les molécules d’azote s’empilent et forment plusieurs couches sur la surface du matériau.'),
    },
    {
      title: tr('4. Condensation capillaire'),
      text: tr('À l’approche de la pression de saturation, l’azote commence à se condenser dans les pores. La porosité accessible se remplit progressivement jusqu’à permettre l’estimation du volume poreux total. (environ P/P₀ = 0,995)'),
    },
  ]

  return (
    <div className="simGrid" ref={sequenceRef}>
      <div className="controlPanel sequencePanel">
        <div className="bigValue sequenceBigValue">{steps[step].title}</div>

        <input
          type="range"
          min="0"
          max="3"
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
        />

        <div className="state">{tr('Étape')} {step + 1}/4</div>
        <p>{steps[step].text}</p>
      </div>

      <div key={`${step}-${replayKey}`} className={`cleanSequence step${step}`}>
        <div className="seqTitle">
  {step === 0
    ? tr('Vue simplifiée dans un micropore')
    : step === 3
    ? tr('Vue simplifiée dans un macropore')
    : tr('Vue simplifiée dans un mésopore')}
</div>

        <div className="seqPore">
          <div className="seqWall left" />
          <div className="seqWall right" />

          <div className="seqMicroFill">
  {(step === 0 || step === 3) && (
    <div className="microStack">
      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={i}
          style={{
  '--dropDelay': `${Math.random() * 0.9}s`,
  '--fallDuration': `${2.8 + Math.random() * 0.9}s`,
  '--swayA': `${(Math.random() - 0.5) * 30}px`,
}}
        />
      ))}
    </div>
  )}
</div>

{step >= 1 && (
  <>
    <div className="seqMono left">
      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={i}
          style={{
  '--dropDelay': `${Math.random() * 0.9}s`,
  '--fallDuration': `${2.8 + Math.random() * 0.9}s`,
  '--swayA': `${(Math.random() - 0.5) * 30}px`,
}}
        />
      ))}
    </div>

    <div className="seqMono right">
      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={i}
          style={{
  '--dropDelay': `${Math.random() * 0.9}s`,
  '--fallDuration': `${2.8 + Math.random() * 0.9}s`,
  '--swayA': `${(Math.random() - 0.5) * 30}px`,
}}
        />
      ))}
    </div>
  </>
)}

{step >= 2 && (
  <>
    <div className="seqMulti left">
      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={i}
          style={{
  '--dropDelay': `${Math.random() * 0.9}s`,
  '--fallDuration': `${2.8 + Math.random() * 0.9}s`,
  '--swayA': `${(Math.random() - 0.5) * 30}px`,
}}
        />
      ))}
    </div>

    <div className="seqMulti right">
      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={i}
          style={{
  '--dropDelay': `${Math.random() * 0.9}s`,
  '--fallDuration': `${2.8 + Math.random() * 0.9}s`,
  '--swayA': `${(Math.random() - 0.5) * 30}px`,
}}
        />
      ))}
    </div>
  </>
)}

          <div className="seqCondensed" />
        </div>

        <div className="seqCaption">
          {tr("Micropore → monocouche → multicouche → condensation de l'azote")}
        </div>
      </div>
    </div>
  )
}

function CapillaryCondensation() {
  const { tr } = useLanguage()
  const [value, setValue] = useState(4)
  const p = value / 100

  const monoOpacity = clamp((p - 0.22) / 0.16, 0, 1)
  const multiOpacity = clamp((p - 0.42) / 0.18, 0, 1)
  const liquid = p < 0.68 ? 0 : clamp((p - 0.68) / 0.24, 0, 1) * 82
  const macroLimit = p < 0.96 ? 0 : clamp((p - 0.96) / 0.04, 0, 1) * 55

  let state = tr('Gaz dominant')
  let text = tr('À très faible P/P₀, l’azote est surtout gazeux. Le mésopore n’est pas encore recouvert.')

  if (p >= 0.22 && p < 0.42) {
    state = tr('Monocouche')
    text = tr('Une première couche apparaît sur les parois internes du mésopore.')
  }

  if (p >= 0.42 && p < 0.68) {
    state = tr('Multicouche')
    text = tr('Plusieurs couches se forment avant la condensation capillaire.')
  }

  if (p >= 0.68 && p < 0.96) {
    state = tr('Condensation capillaire')
    text = tr('Le centre du mésopore se remplit : une phase condensée apparaît.')
  }

  if (p >= 0.96) {
    state = tr('Cas limite macropore')
    text = tr('Très proche de P/P₀ = 1, les plus petits macropores peuvent commencer à se remplir.')
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
        <div className="capTitle">{tr('Mésopore : monocouche → multicouche → condensation')}</div>

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
          <span>{tr('Petit macropore\ncas limite près de 1').split('\n')[0]}<br />{tr('Petit macropore\ncas limite près de 1').split('\n')[1]}</span>
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
  const { tr } = useLanguage()
  const [paused, setPaused] = useState(false)
  const [replayKey, setReplayKey] = useState(0)
  const conclusionRef = useRef(null)

  useEffect(() => {
  let wasVisible = false

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !wasVisible) {
        wasVisible = true
        setPaused(false)
        setReplayKey((key) => key + 1)
      }

      if (!entry.isIntersecting) {
        wasVisible = false
      }
    },
    { threshold: 0.25 }
  )

  if (conclusionRef.current) {
    observer.observe(conclusionRef.current)
  }

  return () => observer.disconnect()
}, [])
  const smoothMolecules = [
    0.06, 0.14, 0.22, 0.30, 0.38, 0.46, 0.54, 0.62, 0.70, 0.78, 0.86, 0.94,
  ]

  const porousMolecules = [
    0.04, 0.10, 0.16, 0.22, 0.28, 0.34, 0.40, 0.46, 0.52, 0.58,
    0.64, 0.70, 0.76, 0.82, 0.88, 0.94,
  ]

  return (
    <div
  ref={conclusionRef}
  className={`betSummaryCard ${paused ? 'paused' : ''}`}
>
      <div key={replayKey} className="surfaceSceneBox">
        <button
  className="conclusionPauseButton"
  type="button"
  onClick={() => setPaused(!paused)}
  aria-label={paused ? tr('Reprendre l’animation') : tr('Mettre l’animation en pause')}
>
  {paused ? '▶' : '⏸'}
</button>
        <div className="surfaceSceneSvg">
          <svg viewBox="0 0 420 330" className="betSurfaceSvg">
            <path
              id="smoothSurfacePath"
              className="surfacePath smoothSurface"
              d="M55 185 C115 95, 305 95, 365 185"
            />

            <path
              id="porousSurfacePath"
              className="surfacePath porousSurface"
              d="M55 185 C92 130, 132 112, 168 118
                 C182 122, 188 138, 184 154
                 C178 182, 164 205, 174 220
                 C188 240, 218 238, 230 216
                 C244 190, 224 162, 236 140
                 C248 118, 282 122, 306 138
                 C330 154, 350 174, 365 185"
            />

            <g className="smoothMolecules">
  {smoothMolecules.map((p, i) => (
    <circle key={i} r="6.5" transform="translate(0 -10)">
      <animateMotion
        dur="0.01s"
        begin={`${p}s`}
        fill="freeze"
        keyPoints={`${p};${p}`}
        keyTimes="0;1"
        calcMode="linear"
      >
        <mpath href="#smoothSurfacePath" />
      </animateMotion>
    </circle>
  ))}
</g>

<g className="porousMolecules">
  <circle cx="56" cy="172" r="6.5" />
  <circle cx="74" cy="148" r="6.5" />
  <circle cx="98" cy="131" r="6.5" />
  <circle cx="121" cy="116" r="6.5" />
  <circle cx="147" cy="108" r="6.5" />

  <circle cx="170" cy="110" r="6.5" />
  <circle cx="188" cy="127" r="6.5" />
  <circle cx="190" cy="154" r="6.5" />
  <circle cx="182" cy="181" r="6.5" />
  <circle cx="178" cy="208" r="6.5" />

  <circle cx="196" cy="225" r="6.5" />
  <circle cx="222" cy="217" r="6.5" />

  <circle cx="227" cy="195" r="6.5" />
  <circle cx="225" cy="169" r="6.5" />
  <circle cx="228" cy="142" r="6.5" />

  <circle cx="250" cy="120" r="6.5" />
  <circle cx="277" cy="119" r="6.5" />
  <circle cx="307" cy="130" r="6.5" />
  <circle cx="328" cy="145" r="6.5" />
  <circle cx="350" cy="164" r="6.5" />
</g>

            <text x="210" y="315" textAnchor="middle" className="betUpText">
              BET ↑
            </text>
          </svg>

          <div className="sceneLabel limited">{tr('Surface accessible limitée')}</div>
          <div className="sceneLabel internal">{tr('Surface interne accessible')}</div>
        </div>

        <p>
          {tr('Plus les molécules accèdent à des surfaces internes, plus la surface BET calculée augmente.')}
        </p>
      </div>
    </div>
  )
}

function EnergyVisual() {
  const { tr } = useLanguage()

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
        {tr('Dans un micropore, deux parois proches attirent la molécule en même temps.')}
      </p>
    </div>
  )
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

function EquipementsPage() {
  const { tr } = useLanguage()

  return (
    <main className="page">
      <GlobalNitrogen />

      <Link className="backButton" to="/determinations">
        {tr('← Retour')}
      </Link>

      <section className="section">
        <TextCard
          title={tr('Des équipements adaptés à chaque niveau de caractérisation.')}
        >
          <p>
            {tr('Chaque analyse d’adsorption d’azote nécessite un équipement adapté à la précision recherchée. Notre laboratoire dispose de plusieurs instruments complémentaires permettant de réaliser des mesures de surface spécifique, de volume poreux total et de microporosité.')}
          </p>
        </TextCard>

        <div className="pageBadge">
          {tr('Nos appareils de mesure')}
        </div>

        <div className="equipmentCompareCard">
  <div className="pressureScale">
    <span>P/P₀ = 0</span>
    <div />
    <span>P/P₀ = 1</span>
  </div>

  <div className="deviceScale">
    <DeviceRange
      name="ASAP 2420"
      className="asap2420"
      text={tr("L’ASAP 2420 est principalement dédié aux analyses de routine et à la détermination des BET. Cet instrument est privilégié pour les échantillons susceptibles de contenir des composés pouvant polluer le circuit d’analyse, notamment certains produits chlorés ou issus d’unités de raffinage.")}
    />

    <DeviceRange
      name="ASAP 2425"
      className="asap2425"
      text={tr("Plus récent, l’ASAP 2425 offre de meilleures performances à faible P/P₀. Il est utilisé pour la détermination des BET, VPT ainsi que pour les isothermes nécessitant une visibilité sur la fin de la microporosité. Cet instrument est réservé aux produits ne présentant aucun risque de pollution.")}
    />

    <DeviceRange
      name="3Flex"
      className="threeFlex"
      text={tr("Cet appareil de haute précision, capable d’atteindre des vides très profonds, est principalement utilisé pour l’analyse micropore afin d’avoir une visibilité totale de la zone microporeuse.")}
    />
  </div>

  <p className="deviceHint">
    {tr('Survolez un appareil pour afficher ses caractéristiques')}
  </p>
</div>

        <div className="pageBadge">
          {tr('Contrôle qualité')}
        </div>

        <div className="qualityCard determinationCard">
          <p>
            {tr('Les performances de nos instruments sont régulièrement contrôlées à l’aide de références certifiées Micromeritics afin de garantir la justesse et la reproductibilité des résultats.')}
          </p>
        
        </div>

        <div className="pageBadge">
          {tr('Nos équipements')}
        </div>

        <div className="equipmentGrid">
          <EquipmentItem
            title={tr("Smart VacPrep")}
            text={tr("Dégazage sous vide de 6 échantillons simultanément, capable d’atteindre 450 °C et des niveaux de vide très profonds grâce à sa pompe turbomoléculaire.")}
          />

          <EquipmentItem
            title={tr("Pompe à vide hydraulique")}
            text={tr("Production du vide primaire utilisé lors des opérations de dégazage et d'analyse sur l'ASAP 2420.")}
          />

          <EquipmentItem
            title={tr("Pompe à vide à membrane")}
            text={tr("Production d’un vide primaire, propre et sans huile pour les opérations de dégazage et d'analyse sur l'ASAP 2425, Smart VacPrep et 3Flex.")}
          />

          <EquipmentItem
            title={tr("Pompe à vide turbomoléculaire")}
            text={tr("Obtention d’un vide secondaire très poussé indispensable aux analyses de haute précision. Ce type de pompe est utilisé sur l'ASAP 2425, Smart VacPrep et 3Flex.")}
          />

          <EquipmentItem
            title={tr("Balance de précision 0,0001 g")}
            text={tr("Pesée précise des échantillons afin de garantir la fiabilité des résultats.")}
          />

          <EquipmentItem
            title={tr("Unité antistatique")}
            text={tr("Réduction des charges électrostatiques susceptibles d’influencer les opérations de pesée.")}
          />
        </div>
      </section>
    </main>
  )
}

function DeviceRange({ name, className, text }) {
  return (
    <div className={`deviceFlip device-${className}`}>
      <div className="deviceFlipInner">
        <div className="deviceFlipFace deviceFlipFront">
          <div className={`deviceBar ${className}`}>
            <span>{name}</span>
          </div>
        </div>

        <div className="deviceFlipFace deviceFlipBack">
          <strong>{name}</strong>
          <p>{text}</p>
        </div>
      </div>
    </div>
  )
}

function EquipmentItem({ title, text }) {
  return (
    <div className="equipmentFlip">
      <div className="equipmentFlipInner">
        <div className="equipmentFlipFace equipmentFlipFront">
          <h3>{title}</h3>
        </div>

        <div className="equipmentFlipFace equipmentFlipBack">
          <p>{text}</p>
        </div>
      </div>
    </div>
  )
}

export default App

function DeterminationsPage() {
  const { tr } = useLanguage()

  return (
    <main className="page">
      <GlobalNitrogen />

      <Link className="backButton" to="/">
        {tr('← Retour')}
      </Link>

      <section className="section">
        <TextCard
          title={tr("Que peut-on déterminer avec une analyse d'adsorption à l'azote ?")}
        >
          <p>
              {tr("L’adsorption d’azote ne sert pas uniquement à mesurer la surface spécifique BET. Différentes zones de l’isotherme permettent également d’obtenir des informations complémentaires sur la porosité du matériau analysé.")}
          </p>
        </TextCard>

        <div className="determinationGrid">
          <DeterminationCard
            title={tr("Surface BET")}
            text={tr("Dans cette zone de l’isotherme, les molécules d’azote recouvrent progressivement la surface du matériau sous forme de monocouche. L’analyse de cinq points de mesure permet alors de calculer la surface spécifique BET.")}
            highlight={tr("Zone BET : environ P/P₀ = 0,05 à 0,30")}
            type="bet"
          />

          <DeterminationCard
            title={tr("Volume poreux total")}
            text={tr("Lorsque P/P0 s'approche de 1, l’azote remplit progressivement l’ensemble de la porosité. La quantité totale de gaz adsorbée permet alors d’estimer le volume poreux total du matériau.")}
            highlight={tr("Lecture proche de P/P₀ = 1")}
            type="volume"
          />

          <DeterminationCard
            title={tr("Isotherme")}
            text={tr("Au-delà de la surface spécifique BET et du volume poreux total, l’analyse de l’isotherme complet apporte des informations précieuses, notamment sur la répartition de la porosité, la taille et la forme des pores.")}
            highlight={tr("Adsorption et désorption")}
            type="isotherm"
          />
          <DeterminationCard
            title={tr("Micropore")}
            text={tr("La microporosité s’observe à très faible P/P₀. Une forte adsorption dès les basses pressions indique la présence de pores très étroits. Sa mesure requiert une excellente précision de mesure et peut considérablement allonger la durée de l’analyse.")}
            highlight={tr("Zone micropore : P/P0 < 0,1")}
            type="micro"
          />
        </div>
      </section>
    </main>
  )
}

function DeterminationCard({ title, text, highlight, type }) {
  const { tr } = useLanguage()
  const [paused, setPaused] = useState(false)

  return (
    <div className="determinationCard">
      <button
        className="graphPauseButton"
        onClick={() => setPaused(!paused)}
        aria-label={paused ? tr('Reprendre animation') : tr('Mettre en pause')}
      >
        {paused ? '▶' : '⏸'}
      </button>

      <div className={paused ? 'graphPaused' : ''}>
        <AnimatedGraph type={type} paused={paused} />
      </div>

      <h3>{title}</h3>
      <p>{text}</p>
      <span>{highlight}</span>
      {type === 'micro' && (
      <div className="equipmentButtonWrapper">
      <Link className="nextPageButton" to="/equipements">
      {tr("Découvrez nos appareils de mesure et équipements")}
    </Link>
  </div>
)}
    </div>
  )
}

function AnimatedGraph({ type, paused = false }) {
const { tr } = useLanguage()
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
      style={{ animationPlayState: paused ? 'paused' : 'running' }}
    />

    <path
      className="graphIsoReplay graphIsoDesorption"
      d={desorptionPath}
      style={{ animationPlayState: paused ? 'paused' : 'running' }}
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
  {tr('Quantité adsorbée')}
</text>
    </svg>
  )
}