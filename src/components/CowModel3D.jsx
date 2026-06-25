import React, { useRef, Suspense } from "react";
import { motion, useInView } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Float, Stars } from "@react-three/drei";

// ── Procedural Cow ────────────────────────────────────────────────
function CowMesh() {
  const group = useRef();

  // Gentle idle bob
  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.elapsedTime * 0.25;
  });

  const body = (
    <meshStandardMaterial color="#D4B896" roughness={0.75} metalness={0.05} />
  );
  const spot = (
    <meshStandardMaterial color="#5C3D2E" roughness={0.8} metalness={0.0} />
  );
  const horn = (
    <meshStandardMaterial color="#EDE0C4" roughness={0.5} metalness={0.1} />
  );
  const nose = (
    <meshStandardMaterial color="#C88B8B" roughness={0.7} metalness={0.0} />
  );
  const eye = (
    <meshStandardMaterial color="#1A0A00" roughness={0.3} metalness={0.1} />
  );
  const hoof = (
    <meshStandardMaterial color="#2D1B0E" roughness={0.9} metalness={0.0} />
  );
  const udder = (
    <meshStandardMaterial color="#C8907A" roughness={0.6} metalness={0.0} />
  );
  const tail = (
    <meshStandardMaterial color="#7A5C4A" roughness={0.8} metalness={0.0} />
  );
  const grass = (
    <meshStandardMaterial color="#4CAF50" roughness={0.9} metalness={0.0} />
  );

  // Legs layout: [x, z] pairs
  const legPositions = [
    [0.62, 0.5],
    [0.62, -0.5],
    [-0.62, 0.5],
    [-0.62, -0.5],
  ];

  return (
    <group ref={group} position={[0, 0.1, 0]} scale={0.78}>
      {/* ── Ground disc ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.28, 0]}>
        <circleGeometry args={[3.2, 48]} />
        {grass}
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.27, 0]}>
        <ringGeometry args={[3.2, 3.6, 48]} />
        <meshStandardMaterial color="#388E3C" roughness={0.9} />
      </mesh>

      {/* ── Main Body ── */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.6, 1.3, 1.5]} />
        {body}
      </mesh>

      {/* Brown body spot */}
      <mesh position={[0.3, 0.45, 0.76]}>
        <boxGeometry args={[1.0, 0.7, 0.02]} />
        {spot}
      </mesh>
      <mesh position={[-0.5, 0.2, 0.76]}>
        <boxGeometry args={[0.5, 0.4, 0.02]} />
        {spot}
      </mesh>

      {/* ── Neck ── */}
      <mesh position={[1.25, 0.25, 0]} rotation={[0, 0, -0.35]}>
        <cylinderGeometry args={[0.32, 0.36, 0.75, 12]} />
        {body}
      </mesh>

      {/* ── Head ── */}
      <mesh position={[1.8, 0.75, 0]}>
        <boxGeometry args={[0.95, 0.82, 0.9]} />
        {body}
      </mesh>

      {/* Forehead spot */}
      <mesh position={[1.8, 1.0, 0.46]}>
        <boxGeometry args={[0.4, 0.25, 0.02]} />
        {spot}
      </mesh>

      {/* ── Snout / Muzzle ── */}
      <mesh position={[2.35, 0.6, 0]}>
        <boxGeometry args={[0.2, 0.4, 0.62]} />
        {nose}
      </mesh>

      {/* Nostrils */}
      {[0.18, -0.18].map((z, i) => (
        <mesh key={i} position={[2.46, 0.6, z]}>
          <sphereGeometry args={[0.055, 8, 8]} />
          <meshStandardMaterial color="#8B4040" roughness={0.7} />
        </mesh>
      ))}

      {/* ── Eyes ── */}
      {[0.46, -0.46].map((z, i) => (
        <React.Fragment key={i}>
          {/* White of eye */}
          <mesh position={[2.28, 0.82, z]}>
            <sphereGeometry args={[0.1, 10, 10]} />
            <meshStandardMaterial color="#F5F0E0" roughness={0.4} />
          </mesh>
          {/* Pupil */}
          <mesh position={[2.38, 0.82, z]}>
            <sphereGeometry args={[0.055, 8, 8]} />
            {eye}
          </mesh>
        </React.Fragment>
      ))}

      {/* ── Ears ── */}
      {[0.55, -0.55].map((z, i) => (
        <mesh
          key={i}
          position={[1.85, 1.18, z]}
          rotation={[0, 0, i === 0 ? 0.4 : -0.4]}
        >
          <sphereGeometry args={[0.16, 10, 8]} />
          {body}
        </mesh>
      ))}

      {/* ── Horns ── */}
      {[0.32, -0.32].map((z, i) => (
        <mesh
          key={i}
          position={[1.95, 1.35, z]}
          rotation={[i === 0 ? -0.3 : 0.3, 0, 0.3]}
        >
          <coneGeometry args={[0.055, 0.52, 10]} />
          {horn}
        </mesh>
      ))}

      {/* ── Legs ── */}
      {legPositions.map(([x, z], i) => (
        <React.Fragment key={i}>
          {/* Upper leg */}
          <mesh position={[x, -0.62, z]}>
            <cylinderGeometry args={[0.18, 0.16, 0.72, 10]} />
            {body}
          </mesh>
          {/* Lower leg */}
          <mesh position={[x, -1.1, z]}>
            <cylinderGeometry args={[0.14, 0.13, 0.36, 10]} />
            {body}
          </mesh>
          {/* Hoof */}
          <mesh position={[x, -1.32, z]}>
            <boxGeometry args={[0.24, 0.14, 0.28]} />
            {hoof}
          </mesh>
        </React.Fragment>
      ))}

      {/* ── Udder ── */}
      <mesh position={[-0.1, -0.55, 0]}>
        <sphereGeometry args={[0.28, 10, 10]} />
        {udder}
      </mesh>
      {/* Teats */}
      {[
        [0.12, 0.12],
        [0.12, -0.12],
        [-0.12, 0.12],
        [-0.12, -0.12],
      ].map(([dx, dz], i) => (
        <mesh key={i} position={[-0.1 + dx, -0.82, dz]}>
          <cylinderGeometry args={[0.035, 0.025, 0.12, 8]} />
          {udder}
        </mesh>
      ))}

      {/* ── Tail ── */}
      <mesh position={[-1.38, 0.2, 0]} rotation={[0, 0, 0.5]}>
        <cylinderGeometry args={[0.045, 0.03, 0.9, 8]} />
        {tail}
      </mesh>
      {/* Tail tuft */}
      <mesh position={[-1.75, -0.2, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        {spot}
      </mesh>
    </group>
  );
}

// ── Scene ─────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <Stars radius={80} depth={30} count={600} factor={3} fade speed={1} />
      <ambientLight intensity={0.6} color="#FFF5E4" />
      <directionalLight
        position={[6, 10, 6]}
        intensity={1.2}
        color="#FFFAF0"
        castShadow
      />
      <directionalLight
        position={[-4, 4, -4]}
        intensity={0.3}
        color="#A8D8A8"
      />
      <pointLight
        position={[0, 5, 0]}
        intensity={0.5}
        color="#F4A261"
        distance={15}
      />

      <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
        <CowMesh />
      </Float>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 4}
        autoRotate={false}
        dampingFactor={0.05}
        enableDamping
      />

      <Environment preset="forest" />
    </>
  );
}

// ── Section ───────────────────────────────────────────────────────
export default function CowModel3D() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const features = [
    {
      icon: "🌿",
      title: "Organic Fodder",
      desc: "All cows receive seasonal green fodder, hay, and mineral supplements.",
    },
    {
      icon: "💊",
      title: "Veterinary Care",
      desc: "Full-time in-house vets and tie-ups with animal hospitals for critical cases.",
    },
    {
      icon: "🧼",
      title: "Hygiene & Grooming",
      desc: "Daily cleaning routines keep each animal healthy, comfortable and stress-free.",
    },
    {
      icon: "☀️",
      title: "Open Pastures",
      desc: "Large open grazing areas allow natural movement and sunlight exposure.",
    },
  ];

  return (
    <section
      id="cow3d"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0d3320 0%, #1B4332 50%, #14532d 100%)",
      }}
    >
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-saffron/40 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-saffron/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold tracking-widest uppercase text-saffron mb-3">
            Interactive 3D
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Meet Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron-light to-saffron">
              Sacred Cow
            </span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-lg">
            Drag to rotate • Every cow in our care receives this level of loving
            attention
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Canvas frame */}
            <div
              className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
              style={{
                height: "480px",
                background:
                  "linear-gradient(180deg, #0d2b1a 0%, #1a4a2e 50%, #0d2b1a 100%)",
              }}
            >
              <Canvas
                camera={{ position: [0, 1.5, 6], fov: 50 }}
                shadows
                gl={{ antialias: true, alpha: true }}
              >
                <Suspense fallback={null}>
                  <Scene />
                </Suspense>
              </Canvas>

              {/* Interaction hint */}
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/40 backdrop-blur-sm text-white/70 text-xs px-4 py-2 rounded-full"
              >
                <span>🖱️</span> Drag to rotate
              </motion.div>
            </div>

            {/* Glow effect */}
            <div className="absolute -inset-4 bg-saffron/5 rounded-3xl blur-2xl -z-10 pointer-events-none" />
          </motion.div>

          {/* Feature list */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col gap-6"
          >
            <div className="mb-4">
              <h3 className="font-serif text-3xl font-bold text-white mb-3">
                How We Care For
                <br />
                <span className="text-saffron">Every Soul</span>
              </h3>
              <p className="text-white/60 leading-relaxed">
                Our gaushalas are designed around the natural needs of cows —
                from spacious shelter to holistic healthcare.
              </p>
            </div>

            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                whileHover={{ x: 6 }}
                className="flex gap-5 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-saffron/30 hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-3xl flex-shrink-0 mt-0.5">{f.icon}</div>
                <div>
                  <h4 className="text-white font-semibold mb-1">{f.title}</h4>
                  <p className="text-white/55 text-sm leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            ))}

            <motion.a
              href="#donate"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-4 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-saffron-dark to-saffron text-white font-semibold shadow-lg hover:shadow-saffron/30 hover:shadow-2xl transition-shadow duration-300"
            >
              <span>🐄</span> Adopt a Cow Today
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
