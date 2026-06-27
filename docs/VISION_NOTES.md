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

<!-- Plantilla para nuevas notas:

## AAAA-MM-DD · Título corto

**La idea:**
...

**Por qué importa / cómo encaja:**
...

**Estado:** (idea futura / en discusión / aprobada para construir)
-->
