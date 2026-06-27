# Atlas Karla — Notas de Visión

> Ideas a futuro, registradas para no perderlas. No son tareas comprometidas;
> son la dirección hacia la que el Atlas *podría* crecer. Cada nota lleva fecha.

---

## 2026-06-27 · "Un Obsidian de astrología"

**La idea (en palabras de Karla):**
Veo Atlas Karla un poco como **Obsidian, pero de astrología**: astrocartografía,
"astro-viajes", *astro-todo*. Un sistema personal de conocimiento donde todo lo
astrológico vive enlazado.

**Por qué encaja tan bien con lo que ya existe:**
Obsidian es, en el fondo, un grafo de notas conectadas por enlaces
bidireccionales (`[[backlinks]]`), con vista de grafo, etiquetas y backlinks
("¿qué otras notas mencionan esto?"). El modelo de datos del Atlas **ya es un
grafo**: cada entidad (planeta, línea, lugar, persona, hipótesis, evidencia,
tránsito, evento) se referencia por `id`, no se duplica. Es decir, la base para
un "Obsidian astrológico" ya está puesta sin querer.

**Qué implicaría llevarlo hacia allá (futuro):**
- **Todo es una nota enlazable.** Un planeta, una línea (`Venus MC`), un lugar
  (`Lisboa`), una persona, una hipótesis, una evidencia, un tránsito — cada una
  es un nodo con su propia página.
- **Enlaces bidireccionales + backlinks.** Al abrir `Lisboa`, ver automáticamente
  "qué hipótesis, evidencias y tránsitos la mencionan". Al abrir una hipótesis,
  ver qué evidencia la apoya o refuta (esto ya está modelado en `supports` /
  `refutes`).
- **Vista de grafo.** Un mapa de conexiones de toda tu vida astrológica:
  planetas → líneas → lugares → evidencia → conclusiones. Complementaría al mapa
  geográfico (uno es geografía, el otro es la red de significado).
- **Las 4 categorías epistémicas como "tipos de nota"** (observación / hipótesis
  / evidencia / conclusión) — igual que Obsidian distingue tipos por carpeta o
  tag, pero aquí con la regla de que las observaciones no se sobrescriben.
- **Búsqueda y enlazado al escribir.** Escribir una nota de viaje y enlazar
  `[[Venus MC]]` o `[[Saturn AC]]` y que se conecte solo.
- **"Astro-viajes":** cada viaje como una nota que enlaza el lugar, las líneas
  activadas, los tránsitos de esas fechas y la evidencia que dejó.

**Relación con lo ya construido:**
- El **mapa GIS** = la capa geográfica (dónde).
- Este "Obsidian astrológico" = la capa de **red de conocimiento** (cómo se
  conecta todo). No compiten: son dos vistas del mismo grafo de datos.

**Estado:** idea futura. No construir aún. Primero estabilizar mapa + datos
reales + (eventualmente) líneas de astrocartografía calculadas.

---

## 2026-06-27 · El Atlas como "Memory Palace" (método de loci)

**La idea (en palabras de Karla):**
Que la app utilice la técnica de *memory palace* para optimizar la memoria.

**Interpretación:** optimizar **el recall humano de Karla** (no la RAM): que la
app esté diseñada para que recuerde y conecte su propia vida, usando el anclaje
espacial del método de loci. Si en algún momento se quiere también optimizar
rendimiento técnico, es un tema aparte.

**El insight clave:** Atlas Karla *ya es* un palacio de la memoria implícito.
Hacerlo intencional unifica todo el sistema:

| Memory palace | Atlas Karla |
|---|---|
| El palacio | El mapa GIS |
| Los *loci* | Cada lugar |
| Las habitaciones | Las 6 capas del lugar |
| Las imágenes vívidas (el truco mnemónico) | Las **activaciones simbólicas** (fado, azulejos, koru) |
| La ruta / "el paseo" | Timeline + historial de relocations |
| Repaso del palacio | Modo "recorre tu palacio" (recall activo) |

> Reencuadre importante: las **activaciones simbólicas** dejan de ser una
> curiosidad y se vuelven el **mecanismo de memoria** — son las imágenes vívidas
> que el método de loci necesita.

**Funciones candidatas (futuro, no construir aún):**
1. **Ancla vívida por lugar:** símbolo / imagen / color de firma por *loci*,
   alimentado por sus activaciones.
2. **Modo "Recorre tu palacio":** recorrido ordenado (cronológico o temático)
   lugar por lugar; en cada uno, recall activo ("¿qué pasó aquí, qué aprendiste?")
   + repaso espaciado. Esto es lo que literalmente optimiza la memoria.
3. **Codificación sensorial por capa:** motivo consistente por capa (música,
   arquitectura, comida) como gancho mnemónico.

**Relación con el resto:**
- Mapa GIS = geografía (*dónde*).
- Grafo tipo Obsidian = red de significado (*cómo se conecta*).
- Memory palace = método de *recall* (*cómo se recuerda*).
Las tres son vistas/usos del mismo grafo de datos.

**Estado:** principio de diseño aprobado en concepto; funciones específicas a la
espera de OK para construir.

---

<!-- Plantilla para nuevas notas:

## AAAA-MM-DD · Título corto

**La idea:**
...

**Por qué importa / cómo encaja:**
...

**Estado:** (idea futura / en discusión / aprobada para construir)
-->
