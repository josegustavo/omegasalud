# Guía para Crear Contenido de Productos - OmegaSalud

## Instrucciones para IA (System Prompt)

Copia esto como **instrucciones del sistema** o **custom instructions** en tu IA:

---

```
Eres un copywriter experto en e-commerce de productos naturales y saludables para el mercado peruano/latinoamericano.

Tu trabajo es crear contenido COMPLETO para productos de una tienda online llamada OmegaSalud.

DATOS DE ENTRADA (el usuario SIEMPRE proporcionará):
- URL del fabricante/proveedor (OBLIGATORIO)
- Imagen(es) del producto adjuntas (OBLIGATORIO)
- Datos básicos: nombre, marca, presentación, precio

PROCESO DE TRABAJO:

1. ANALIZA LA URL: Visita el link del fabricante y extrae:
   - Descripción oficial del producto
   - Ingredientes o composición
   - Beneficios mencionados
   - Certificaciones (orgánico, vegano, etc.)
   - Información nutricional si aplica
   - Usos recomendados

2. ANALIZA LAS IMÁGENES ADJUNTAS: Observa las fotos del producto para:
   - Identificar el tipo de envase (botella, frasco, bolsa, etc.)
   - Ver el color y textura del producto
   - Leer información visible en la etiqueta
   - Entender el contexto visual para los prompts de imagen

3. GENERA EL YAML: Combina toda la información para crear contenido único y optimizado.

4. GENERA LOS PROMPTS DE IMAGEN: Basándote en las imágenes reales adjuntas, crea prompts específicos para Nanobanana. Los prompts deben hacer referencia a lo que VES en las imágenes adjuntas.

---

ESPECIFICACIONES DE IMÁGENES (todas en ratio 1:1 cuadrado):

**IMAGEN PRINCIPAL (main):**
- FONDO TRANSPARENTE (no blanco) - La tienda tiene modo claro y oscuro
- Solo el producto recortado, sin sombras ni elementos adicionales
- Formato PNG con transparencia
- El producto debe verse bien sobre cualquier color de fondo
- USOS: cards de categoría, listados, carrito de compras, miniaturas

**IMAGEN PRINCIPAL DECORADA (mainDecorated):**
- FONDO TRANSPARENTE - igual que main
- Producto centrado CON ingredientes o elementos decorativos sutiles alrededor
- Los elementos deben estar: pequeños, desenfocados, en las esquinas/bordes
- NO deben confundir sobre qué se está vendiendo (el producto es el foco)
- Ingredientes relevantes: semillas, hojas, flores, especias según el producto
- USOS: hero de la página de producto (imagen grande principal)

**GALERÍA (gallery):**
- Producto en contexto de uso (cocina, mesa, desayuno, etc.)
- Muestra cómo se usa el producto en la vida real
- 1-4 imágenes según complejidad del producto

**IMAGEN SOCIAL (social):**
- Para compartir en redes sociales y WhatsApp
- Estilo promocional/marketing con beneficios destacados
- Fondo con color/degradado, texto con beneficios, iconos
- Similar a las imágenes que usan las marcas en Instagram

---

ESTRUCTURA EXACTA DEL YAML:

**1. NAME (name):**
- Incluir variante o característica principal (Ej: "Aceite de Coco Virgen", "Miel de Abeja Pura")
- Máximo 50 caracteres

**2. BRAND (brand):**
- Nombre de la marca tal como se proporcionó

**3. PRESENTATION (presentation):**
- Presentación tal como se proporcionó

**4. PRICE (price):**
- Número decimal (ej: 49.9)

**5. ORIGINAL PRICE (originalPrice):**
- Solo si tiene descuento, número decimal
- Omitir si no tiene descuento

**6. PRODUCTIMAGES (productImages):**

La estructura de imágenes está organizada por tipo/uso. Solo incluir `src`, `alt` y `title` en el YAML (los prompts van después, fuera del YAML):

```yaml
productImages:
  # IMAGEN PRINCIPAL (obligatoria) - Producto solo, fondo transparente
  main:
    src: /images/uploads/[producto]-principal.png
    alt: "[Producto] en [envase] [tamaño] - Vista frontal del producto"
    title: "[Producto] [Marca] [Tamaño]"
  
  # IMAGEN PRINCIPAL DECORADA (opcional) - Para hero de página de producto
  mainDecorated:
    src: /images/uploads/[producto]-decorada.png
    alt: "[Producto] con [ingredientes] - Composición artística"
    title: "[Producto] [Marca] - Vista Decorada"
  
  # GALERÍA (opcional, 1-4 imágenes) - Producto en contexto de uso
  gallery:
    - src: /images/uploads/[producto]-uso.png
      alt: "[Producto] siendo usado en [contexto: desayuno/cocina/etc]"
      title: "[Producto] - [Tipo de uso]"
  
  # IMAGEN SOCIAL (opcional) - Promocional para redes sociales
  social:
    src: /images/uploads/[producto]-social.png
    alt: "[Producto] [Marca] - [Beneficio principal] - OmegaSalud"
    title: "[Producto] - Comprar en OmegaSalud"
```

**CUÁNTAS IMÁGENES DE GALERÍA INCLUIR:**
- **Productos simples** (sal, stevia): 1 imagen de contexto
- **Productos versátiles** (aceites, vinagres): 2-3 imágenes (usos diferentes)
- **Productos premium** (miel especial, aceite de oliva): 3-4 imágenes (detalle, origen, usos)

**TIPOS DE IMÁGENES:**

| Tipo | Uso | Ratio | Características |
|------|-----|-------|------------------|
| **main** | Cards, listados, carrito | **1:1** | Fondo TRANSPARENTE, solo producto |
| **mainDecorated** | Hero página de producto | **1:1** | Fondo TRANSPARENTE, producto + ingredientes sutiles |
| **gallery** | Página de producto | **1:1** | Producto en contexto de uso real |
| **social** | Redes sociales, WhatsApp | **1:1** | Promocional con texto y beneficios |

**7. CATEGORIES (categories):**
- Lista de categorías donde aparecerá el producto
- Opciones válidas: aceites, miel, vinagres, condimentos, endulzantes
- Puede tener múltiples categorías si aplica

**8. TAGS (tags):**
- 2-4 etiquetas relevantes
- Ejemplos: Orgánico, Vegano, Sin Gluten, Premium, Artesanal, Sin Azúcar, Sin Refinar, Con Madre, Keto Friendly

**9. DESCRIPTION (description):**
- MÁXIMO 160 caracteres (esto es lo que Google muestra)
- Incluir: nombre del producto + beneficio principal + diferenciador
- Terminar con "Envíos a todo el Perú." si cabe
- Usar palabras que la gente busca en Google

**10. PROPERTIES (properties):**
- Lista de 6-8 características técnicas
- Empezar cada una con minúscula
- Cortas y escaneables (máximo 6 palabras cada una)
- Incluir: origen, proceso, certificaciones, envase, lo que NO tiene

**11. BENEFITS (benefits):**
- Formato: texto multilínea con |
- Escribir para el CLIENTE, no sobre el producto
- Usar "tu/tus" en vez de "usted"
- Empezar con frase gancho en negritas usando **texto**
- 4-6 beneficios con título en negritas + explicación práctica
- AGRUPAR por tipo: primero cocina/alimentación, luego salud, luego belleza (no intercalar)
- Lenguaje simple, evitar términos médicos complejos
- SIN EMOJIS

**12. USAGE (usage):**
- Formato: texto multilínea con |
- Dividir en 2 secciones con ## (encabezados sin emojis)
- 3-4 usos por sección con viñetas
- Título en negritas + instrucción específica y práctica
- Incluir cantidades o tiempos cuando sea posible
- SIN EMOJIS

---

**REGLAS DE ESTILO:**
- Tono: cercano, confiable, como un amigo que sabe del tema
- Evitar: "nuestro", "le ofrecemos", "adquiera", lenguaje corporativo
- Usar: "tu", "ideal para", "perfecto para", verbos de acción
- SIN EMOJIS en ningún campo - el contenido debe verse escrito por humanos
- NO inventar propiedades medicinales
- NO hacer claims de salud exagerados (evitar: "cura", "elimina", "garantizado")

---

**DESPUÉS DEL YAML (separado, NO dentro)**, incluir una sección de **PROMPTS PARA GENERAR IMÁGENES**.

IMPORTANTE: Los prompts van como texto normal o comentarios DESPUÉS de cerrar el YAML, nunca dentro del bloque YAML.

Los prompts deben estar en ESPAÑOL y diseñados para usar con Nanobanana (se adjunta foto del producto como referencia). NO incluir tamaños en el prompt (el tamaño se selecciona en la herramienta).

**Formato de cada prompt:**
- Asumir que YA SE ADJUNTA una foto del producto como referencia
- Describir QUÉ CAMBIOS o AGREGACIONES hacer a la imagen base
- Ser específico sobre: fondo, iluminación, elementos a agregar, composición
- Indicar qué mantener del producto original y qué modificar del entorno
- Generar SOLO los prompts necesarios según el número de imágenes de galería definido

**Estructura de la sección de prompts (va DESPUÉS del YAML):**

```
---
PROMPTS PARA GENERAR IMÁGENES (Nanobanana)
Adjuntar la foto del producto antes de usar cada prompt
---

IMAGEN PRINCIPAL (main) - Ratio 1:1
Archivo: [nombre]-principal.png
Prompt: "[instrucciones para recortar producto con fondo transparente]"

IMAGEN PRINCIPAL DECORADA (mainDecorated) - Ratio 1:1
Archivo: [nombre]-decorada.png
Prompt: "[instrucciones para producto con ingredientes sutiles alrededor, fondo transparente]"

GALERÍA - Imagen 1: [descripción del tipo] - Ratio 1:1
Archivo: [nombre]-[tipo].png  
Prompt: "[instrucciones específicas en español]"

[Agregar más imágenes de galería solo si se definieron en el YAML]

IMAGEN SOCIAL - Ratio 1:1
Archivo: [nombre]-social.png
Prompt: "[instrucciones para crear imagen promocional con beneficios]"

---
Nombre de archivo sugerido: [producto-keyword].yml
```

No incluyas explicaciones adicionales fuera del YAML y los prompts.
```

---

## Ejemplo de Resultado Esperado

El prompt generará un archivo YAML completo como este:

```yaml
name: Vinagre de Sidra de Manzana Orgánico
brand: Valle Natural
presentation: Botella de Vidrio 500ml
price: 28.9
originalPrice: 35
productImages:
  main:
    src: /images/uploads/vinagre-sidra-principal.png
    alt: Botella de vinagre de sidra de manzana orgánico 500ml - Vista frontal
    title: Vinagre de Sidra Orgánico Valle Natural 500ml
  mainDecorated:
    src: /images/uploads/vinagre-sidra-decorada.png
    alt: Vinagre de sidra con manzanas y hojas de menta - Composición artística
    title: Vinagre de Sidra Orgánico Valle Natural - Vista Decorada
  gallery:
    - src: /images/uploads/vinagre-sidra-uso.png
      alt: Vinagre de sidra siendo vertido sobre yogurt con frutas - Desayuno saludable
      title: Vinagre de Sidra - Uso en Desayuno
    - src: /images/uploads/vinagre-sidra-ensalada.png
      alt: Vinagre de sidra siendo vertido sobre ensalada fresca de hojas verdes
      title: Vinagre de Sidra - Uso en Ensaladas
  social:
    src: /images/uploads/vinagre-sidra-social.png
    alt: Vinagre de Sidra Orgánico - Con madre activa, sin gluten, con fibra - OmegaSalud
    title: Vinagre de Sidra Orgánico - Comprar Online
categories:
  - vinagres
tags:
  - Orgánico
  - Con Madre
  - Sin Filtrar
description: >-
  Vinagre de manzana orgánico con madre, sin filtrar ni pasteurizar. Ideal para digestión y ensaladas. Envase de vidrio. Envíos a todo el Perú.
properties:
  - 100% orgánico certificado
  - con madre activa (probióticos)
  - sin filtrar ni pasteurizar
  - fermentación natural
  - envase de vidrio oscuro
  - sin conservantes artificiales
  - acidez 5%
benefits: |
  Tu aliado natural para **sentirte ligero y con energía**:

  - **Digestión feliz:** Una cucharada antes de comer ayuda a tu estómago a procesar mejor los alimentos. Menos hinchazón, más comodidad.

  - **Energía sin café:** Combate el cansancio de la tarde de forma natural. Un shot diluido en agua y listo.

  - **Limpieza natural:** Diluido en agua es un limpiador multiusos ecológico para tu cocina.

  - **Cabello brillante:** Como enjuague final deja tu pelo suave, sin residuos de shampoo y con brillo natural.
usage: |
  ## En tu alimentación

  - **Aderezo express:** 1 parte vinagre + 3 partes aceite de oliva + sal = ensaladas gourmet en segundos.

  - **Shot matutino:** 1 cucharada en un vaso de agua tibia, en ayunas. Espera 15 min antes de desayunar.

  - **Marinadas:** Ablanda carnes y realza sabores. Mezcla con ajo, hierbas y deja reposar 30 min.

  ## Para tu belleza

  - **Enjuague capilar:** Mezcla 2 cucharadas en 1 litro de agua. Aplica después del shampoo, no enjuagues.

  - **Tónico facial:** Diluye 1:4 con agua. Aplica con algodón para equilibrar el pH de tu piel.
```

---
PROMPTS PARA NANOBANANA
(Basados en las imágenes adjuntas del producto)
Todos los prompts usan ratio 1:1 (cuadrado)
---

**IMAGEN PRINCIPAL** - Ratio **1:1** - Formato PNG
Archivo: `vinagre-sidra-principal.png`

> Tomando la botella de vidrio oscuro que se ve en la imagen adjunta, elimina completamente el fondo dejándolo TRANSPARENTE (no blanco). Recorta el producto con bordes limpios y precisos. Sin sombras. La botella debe quedar perfectamente aislada para usarse sobre fondos claros y oscuros.

---

**IMAGEN PRINCIPAL DECORADA** - Ratio **1:1** - Formato PNG
Archivo: `vinagre-sidra-decorada.png`

> Usando la botella de la imagen adjunta sobre FONDO TRANSPARENTE. Mantén el producto centrado y en foco. Agrega elementos decorativos sutiles en las esquinas y bordes: rodajas de manzana, hojas de menta fresca y ramitas de canela, todos PEQUEÑOS y DESENFOCADOS. Los ingredientes deben verse claramente decorativos, no como parte del producto. El producto es el protagonista absoluto.

---

**GALERÍA - Imagen 1: Uso en desayuno** - Ratio **1:1**
Archivo: `vinagre-sidra-uso.png`

> Usando la botella de la imagen adjunta, crea una escena de desayuno saludable. Muestra el vinagre siendo vertido con una cuchara sobre un vaso de yogurt. Agrega galletas y frutas alrededor. Fondo de cocina cálida desenfocado. Iluminación natural suave. Transmitir bienestar y alimentación saludable.

---

**GALERÍA - Imagen 2: Uso en ensalada** - Ratio **1:1**
Archivo: `vinagre-sidra-ensalada.png`

> Muestra la botella de la imagen adjunta siendo inclinada, vertiendo vinagre sobre una ensalada fresca de hojas verdes. La botella debe verse parcialmente con su etiqueta visible. Foco en el chorro de vinagre. Iluminación natural, colores vibrantes.

---

**IMAGEN SOCIAL** - Ratio **1:1** (para redes sociales y WhatsApp)
Archivo: `vinagre-sidra-social.png`

> Crea una imagen promocional cuadrada estilo marketing. Fondo degradado suave color crema/durazno. En la esquina inferior izquierda, un bowl de madera con trozos de manzana. A la derecha, coloca el producto de la imagen adjunta. En la parte superior, deja espacio para agregar el nombre del producto. En el lado derecho, deja espacio para 3 iconos circulares con beneficios (recolección a mano, con fibra, sin gluten). Estilo limpio y profesional como las imágenes de marcas en Instagram.

Beneficios sugeridos para los iconos:
- Recolección a mano
- Con fibra  
- Sin gluten

---
Nombre de archivo sugerido: `vinagre-sidra-manzana-organico.yml`

---

## Mensaje Inicial (lo que escribes en el chat)

Una vez configuradas las instrucciones, envía un mensaje con:
1. Los datos del producto
2. El link del fabricante
3. Las imágenes adjuntas del producto (OBLIGATORIO)

**Ejemplo de mensaje:**

```
Producto: Aceite de Coco Virgen
Marca: Coco Natural
Presentación: Frasco de vidrio 500ml
Precio: S/ 45.90
Precio original: S/ 52.00
Categoría: aceites

Link: https://ejemplo.com/aceite-coco-virgen

[Adjuntar 1-3 fotos del producto]
```

La IA debería:
1. ✅ Visitar el link y extraer información del fabricante
2. ✅ Analizar las imágenes adjuntas del producto
3. ✅ Generar el YAML completo
4. ✅ Generar los prompts para imágenes basados en lo que VE en las fotos

**Si la IA no visita el link**, prueba:
- "Revisa el link que te di para obtener información del producto"
- O copia/pega la información relevante de la página

**Si la IA no describe bien las imágenes**, prueba:
- "Describe las imágenes que te adjunté y usa esa descripción en los prompts"

---

### Cómo usar el resultado:

1. Copia todo el YAML generado
2. Crea un archivo nuevo en `src/data/products/` con el nombre sugerido (ej: `vinagre-sidra-manzana-organico.yml`)
3. Pega el contenido
4. Genera las imágenes con Nanobanana usando los prompts
5. Sube las imágenes a `public/images/uploads/`
6. Listo, el producto aparecerá en la tienda

### Sobre las URLs (importante para SEO):

El nombre del archivo `.yml` se convierte en la URL del producto:

| Archivo | URL generada |
|---------|--------------|
| `aceite-coco-virgen.yml` | `/aceites/aceite-coco-virgen` |
| `miel-abeja-pura-organica.yml` | `/miel/miel-abeja-pura-organica` |
| `sal-maras-gourmet.yml` | `/condimentos/sal-maras-gourmet` |

**Tips para nombres de archivo SEO:**
- Usar palabras que la gente busca (ej: "aceite coco virgen" no "aceite-coco-olivos-del-sur")
- Incluir características clave (orgánico, virgen, puro, natural)
- Evitar marcas en la URL (la marca va en el contenido, no en la URL)
- Máximo 4-5 palabras separadas por guiones
- Todo en minúsculas, sin tildes ni ñ

---

## Guía para Generar Imágenes con Nanobanana

### Flujo de Trabajo

1. **Tomar foto base** del producto con celular (buena luz, fondo neutro)
2. **Abrir Nanobanana** y adjuntar la foto como referencia
3. **Seleccionar ratio 1:1** (cuadrado) - Es el mismo para todas las imágenes
4. **Escribir prompt en español** describiendo cambios específicos
5. **Generar y descargar** la imagen resultante

### Importante sobre los Prompts

❌ **NO hacer esto:**
```
Fotografía de producto de vinagre de manzana en botella de vidrio
```
(Nanobanana inventará un producto genérico)

✅ **SÍ hacer esto:**
```
Usando la foto del producto adjunta, elimina el fondo y 
reemplázalo con fondo blanco puro. Mantén la botella y 
etiqueta exactamente igual.
```
(Nanobanana modificará TU producto real)

### Plantillas de Prompts por Tipo de Imagen

#### IMAGEN PRINCIPAL (main) - Fondo limpio
```
Usando la foto del producto adjunta, elimina completamente el fondo 
y reemplázalo con fondo blanco puro. El producto debe quedar 
perfectamente recortado con bordes limpios. Iluminación suave de 
estudio. No modifiques el producto ni su etiqueta.
```

#### GALERÍA - Escena de cocina
```
Usando la foto del producto adjunta, coloca el producto sobre 
[superficie: mesa de madera rústica / encimera de mármol / 
mantel de lino]. Agrega [elementos relacionados: manzanas / 
limones / hojas verdes / miel en panal]. Luz natural de ventana 
entrando desde la izquierda. Ambiente de cocina cálida y acogedora.
```

#### GALERÍA - Producto en uso
```
Usando la foto del producto adjunta, muestra el producto siendo 
utilizado: [acción específica: vertiendo aceite sobre ensalada / 
agregando miel a una taza de té / espolvoreando sal sobre un plato].
El producto debe verse parcialmente en la escena. Colores vibrantes 
y apetitosos.
```

#### GALERÍA - Ingrediente destacado
```
Usando la foto del producto adjunta, crea una composición donde 
se vea el producto junto a su ingrediente principal en estado 
natural: [cocos frescos / manzanas / abejas y flores / 
cristales de sal de maras]. Fondo con tonos [verdes / dorados / 
tierra]. Iluminación natural lateral.
```

#### IMAGEN SOCIAL - Promocional para redes
```
Usando la foto del producto adjunta, crea una imagen promocional 
cuadrada estilo marketing. Fondo degradado suave de [color según 
categoría]. En un lado, coloca el producto. Deja espacio para 
agregar texto con el nombre del producto y 2-3 beneficios 
principales con iconos. Estilo limpio y profesional como las 
imágenes que usan las marcas en Instagram.
```

### Tamaños a Seleccionar en Nanobanana

Todas las imágenes usan ratio **1:1** (cuadrado):

| Tipo de imagen | Ratio | Para qué sirve |
|----------------|-------|----------------|
| Main (principal) | **1:1** | Cards, listados, carrito |
| Gallery (galería) | **1:1** | Página de producto |
| Social (redes) | **1:1** | WhatsApp, Instagram, Facebook |

### Colores de Fondo Sugeridos por Categoría

| Categoría | Degradado sugerido | Sensación |
|-----------|-------------------|-----------|
| Aceites | Dorado a crema (#FFF8E1 → #FFFFFF) | Premium, mediterráneo |
| Miel | Ámbar a blanco (#FFE082 → #FFFFFF) | Dulce, natural |
| Vinagres | Verde menta a blanco (#E8F5E9 → #FFFFFF) | Fresco, saludable |
| Condimentos | Tierra a crema (#EFEBE9 → #FFFFFF) | Artesanal, gourmet |
| Endulzantes | Blanco a verde claro (#FFFFFF → #F1F8E9) | Puro, ligero |

### Post-procesamiento Recomendado

Después de generar las imágenes en Nanobanana:

1. **Comprimir** con TinyPNG o Squoosh (máximo 300kb por imagen)
2. **Agregar texto a Social** en Canva si Nanobanana no lo generó bien (nombre, beneficios, iconos)
3. **Verificar** que el producto se vea fiel al real
4. **Renombrar** archivos con nombres SEO: `producto-descripcion-tipo.png`

---

## Checklist Antes de Publicar

- [ ] Descripción tiene menos de 160 caracteres
- [ ] El nombre incluye la variante/tipo del producto  
- [ ] Las propiedades empiezan con minúscula
- [ ] Los beneficios hablan del cliente, no del producto
- [ ] El modo de uso tiene instrucciones específicas (cantidades, tiempos)
- [ ] No hay claims médicos exagerados
- [ ] Se incluyen keywords relevantes (buscar en Google "producto + Perú")
- [ ] El tono es cercano y usa "tu/tus"

---

## Keywords por Categoría (para SEO)

### Aceites
- aceite de coco virgen, aceite de oliva extra virgen, aceite de sésamo, aceite para cocinar, aceite natural, aceite prensado en frío

### Miel
- miel de abeja pura, miel orgánica, miel sin procesar, miel natural, miel peruana, miel cruda

### Vinagres  
- vinagre de manzana con madre, vinagre orgánico, vinagre de sidra, vinagre natural

### Condimentos
- sal de maras, sal rosada, especias naturales, condimentos sin químicos

### Endulzantes
- stevia natural, stevia sin químicos, endulzante natural, azúcar de coco, sin azúcar añadida

---

## Tips Adicionales

1. **Investiga antes de escribir:** Busca el producto en Google Perú y mira qué palabras usa la competencia

2. **Lee reseñas en Mercado Libre o tiendas locales:** Los comentarios de clientes revelan qué beneficios valoran más

3. **Menos es más:** Un beneficio bien explicado vale más que 10 superficiales

4. **Prueba el producto:** Si es posible, úsalo antes de escribir. El contenido auténtico se nota

5. **Actualiza periódicamente:** Revisa qué productos se venden más y mejora su contenido primero


---

## Guía Completa de Imágenes por Tipo

### 1. Imagen Principal (main) - OBLIGATORIA

**Propósito:** Cards de producto, listados, carrito, resultados de búsqueda

**Especificaciones:**
| Característica | Valor |
|----------------|-------|
| Ratio | **1:1** en Nanobanana |
| Fondo | TRANSPARENTE (no blanco) |
| Formato | PNG con transparencia |
| Peso máximo | 200KB (comprimir después) |
| Contenido | SOLO el producto, centrado |

**Prompt para Nanobanana:**
```
Usando la foto del producto adjunta, elimina completamente el fondo 
dejándolo TRANSPARENTE. El producto debe quedar perfectamente 
recortado con bordes limpios. Sin sombras. El producto debe verse 
bien sobre fondos claros y oscuros.
```

---

### 2. Galería (gallery) - RECOMENDADA

**Propósito:** Página de detalle del producto, ayudar a decidir la compra

**Cuántas imágenes:** 2-4 imágenes adicionales

**Tipos de imágenes para galería:**

| Tipo | Prompt en Nanobanana |
|------|----------------------|
| **Contexto** | "Usando la foto adjunta, coloca el producto sobre mesa de madera con [ingredientes relacionados]..." |
| **En uso** | "Usando la foto adjunta, muestra el producto siendo [vertido/usado/servido]..." |
| **Close-up** | "Usando la foto adjunta, haz un acercamiento a [característica específica]..." |
| **Lifestyle** | "Usando la foto adjunta, crea una escena de [desayuno/cocina/bienestar]..." |

**Especificaciones:**
| Característica | Valor |
|----------------|-------|
| Ratio | **1:1** en Nanobanana |
| Fondo | Contextual (cocina, mesa, etc.) |
| Formato | JPG o WebP |
| Peso máximo | 400KB |

---

### 3. Imagen Social (social) - MUY RECOMENDADA

**Propósito:** Compartir en WhatsApp, Instagram, Facebook. Estilo promocional/marketing.

**Especificaciones:**
| Característica | Valor |
|----------------|-------|
| Ratio | **1:1** en Nanobanana |
| Formato | JPG o PNG |
| Peso máximo | 300KB |
| Contenido | Producto + beneficios + estilo marketing |

**Prompt para Nanobanana:**
```
Usando la foto del producto adjunta, crea una imagen promocional 
cuadrada estilo marketing. Fondo degradado suave de [color según 
categoría]. Coloca el producto a un lado. Incluye elementos 
decorativos relacionados (frutas, ingredientes). Deja espacio 
para agregar texto con beneficios e iconos. Estilo profesional 
como las imágenes de marcas en Instagram.
```

**Estructura de la imagen Social:**

```
┌─────────────────────────────────────┐
│  ┌─────┐  NOMBRE DEL PRODUCTO       │
│  │LOGO │  ═══════════════════       │
│  └─────┘                            │
│                                     │
│   ┌──────────┐    ○ Beneficio 1     │
│   │          │    ○ Beneficio 2     │
│   │ PRODUCTO │    ○ Beneficio 3     │
│   │          │                      │
│   └──────────┘                      │
│  🍎 ingredientes decorativos        │
│                                     │
│  [Fondo gradiente suave]            │
└─────────────────────────────────────┘
```

**Agregar en Canva si Nanobanana no lo genera bien:**
1. Logo de la marca/tienda
2. Nombre del producto
3. 2-3 beneficios con iconos
4. Elementos decorativos

---

### Flujo de Trabajo Completo

```
1. FOTO BASE DEL PRODUCTO (celular, buena luz)
   │
   ├──► Nanobanana (1:1) → IMAGEN PRINCIPAL
   │    Prompt: eliminar fondo, dejar transparente
   │
   ├──► Nanobanana (1:1) → GALERÍA (1-2 imágenes)
   │    Prompts: producto en uso (desayuno, cocina, etc.)
   │
   └──► Nanobanana (1:1) → IMAGEN SOCIAL
        │
        └──► (Opcional) Canva → Agregar texto/iconos
```

**Herramientas:**

| Tarea | Herramienta |
|-------|-------------|
| Generar imágenes | **Nanobanana** (adjuntar foto base) |
| Agregar texto/iconos | Canva (gratis) |
| Comprimir imágenes | TinyPNG o Squoosh |

---

### Nombres de Archivo SEO

**Formato:** `[producto]-[tipo].png`

**Ejemplos:**
```
aceite-coco-virgen-principal.png      ← main
aceite-coco-virgen-uso-cocina.png     ← gallery
aceite-coco-virgen-social.png         ← social
```

