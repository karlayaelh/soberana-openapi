# Cómo mover Atlas Karla a su propio repo (`karlayaelh/atlas`)

Atlas Karla vive hoy **dentro de `soberana-openapi`**, en la rama
`claude/atlas-karla-architecture-4nkyt5`. Debe vivir en su **propio repo**:
`karlayaelh/atlas`. Este documento explica cómo trasladarlo limpio.

> **Por qué no se pudo hacer en la sesión original:** cada sesión de Claude se
> abre con acceso fijo a un conjunto de repos, elegido al arrancar. La sesión que
> construyó Atlas solo tenía acceso a `soberana-openapi`, y ese candado no se
> puede ampliar a mitad de camino. Por eso el traslado necesita una sesión (o un
> equipo local) con acceso a **ambos** repos.

Qué se mueve: **todo el proyecto Atlas** (código, datos, docs).
Qué NO se mueve: `gmail-openapi.yaml` (no es de Atlas), `node_modules/`, `dist/`.

---

## Opción A — Con una nueva sesión de Claude (recomendada)

1. Abre una **sesión nueva** de Claude Code (web) e incluye en la selección de
   repos **los dos**: `soberana-openapi` **y** `atlas`.
2. Pega este mensaje:

   > Copia el proyecto Atlas Karla desde el repo `soberana-openapi`, rama
   > `claude/atlas-karla-architecture-4nkyt5`, hacia el repo `atlas` en la rama
   > `main`. Mueve **todo menos** `gmail-openapi.yaml`. Preserva la estructura de
   > carpetas tal cual (`src/`, `docs/`, `public/`, configs y `README.md`). No
   > copies `node_modules/` ni `dist/`. Al terminar, verifica que `npm install`
   > y `npm run build` funcionan en `atlas`.

3. Cuando confirme que quedó, vuelve a la sesión de `soberana` (o pídeselo a la
   nueva si también tiene acceso a soberana) para **borrar la rama**
   `claude/atlas-karla-architecture-4nkyt5` y dejar soberana limpio.

---

## Opción B — Local, con git en tu compu

Requiere tener `git` instalado y estar autenticada con GitHub.

```bash
# 1. Clona soberana y sitúate en la rama de Atlas
git clone https://github.com/karlayaelh/soberana-openapi.git
cd soberana-openapi
git checkout claude/atlas-karla-architecture-4nkyt5

# 2. Copia el contenido de Atlas a una carpeta nueva (sin gmail ni .git)
cd ..
mkdir atlas && cd atlas
# copia todo menos gmail-openapi.yaml, .git y node_modules:
rsync -av --exclude='.git' --exclude='node_modules' --exclude='dist' \
      --exclude='gmail-openapi.yaml' ../soberana-openapi/ ./

# 3. Inicia un repo nuevo y súbelo a karlayaelh/atlas
git init
git add -A
git commit -m "Atlas Karla: initial import from soberana-openapi"
git branch -M main
git remote add origin https://github.com/karlayaelh/atlas.git
git push -u origin main
```

> Si `atlas` se creó con un README, el push puede requerir `git pull --rebase
> origin main` antes del `git push`, o hacer `git push -f` si prefieres
> sobrescribir ese README inicial.

---

## Verificación (en cualquiera de las dos opciones)

En el repo `atlas` ya movido:

```bash
npm install
npm run build      # debe compilar sin errores
npm run dev        # abre el mapa; en un navegador normal se ven las tiles
```

## Después del traslado

- Borrar la rama en soberana:
  `git push origin --delete claude/atlas-karla-architecture-4nkyt5`
- (Opcional) quitar de soberana cualquier archivo de Atlas que hubiera quedado
  en otras ramas.
- Actualizar `atlas` como el repo de trabajo de aquí en adelante.

## Inventario de lo que se mueve

```
README.md
MIGRATION.md            (este archivo — opcional, puede quedarse o borrarse)
index.html
package.json  package-lock.json
vite.config.ts  tsconfig*.json
.gitignore
public/atlas.svg
docs/            (MASTER_ARCHITECTURE.md, VISION_NOTES.md, capturas .png)
src/             (types, data, lib, components, pages, App, main, index.css)
```
