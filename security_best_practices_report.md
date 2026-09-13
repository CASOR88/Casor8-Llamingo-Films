# Informe de seguridad de Llamingo Films

Fecha de revisión: 31 de agosto de 2026  
Alcance: aplicación Next.js/Vinext, configuración de Sites/Cloudflare, dependencias, árbol Git local y artefacto `llamingo-site.tar.gz`.

## Resumen ejecutivo

Llamingo Films es actualmente un sitio público sin autenticación, base de datos, API, Server Actions ni secretos. No se encontraron claves API, tokens o llaves privadas reconocibles en el árbol actual o en el historial Git disponible. El archivo comprimido revisado contiene artefactos de compilación y no incluye nombres sensibles como `.env`, certificados o llaves.

No se identificaron vulnerabilidades críticas, altas ni medias activas en el código actual. Quedan dos medidas preventivas de prioridad baja: verificar las cabeceras de seguridad en el alojamiento de Sites y evitar que el paquete de despliegue se incorpore accidentalmente al repositorio. El formulario de brief no transmite ni guarda información; por tanto hoy no expone datos, pero debe diseñarse con backend seguro y aviso de privacidad antes de volverlo funcional.

## Hallazgos

### LLA-001 — Baja — Cabeceras de seguridad no definidas en el repositorio

- **Ubicación:** `next.config.ts:1-5`; `.openai/hosting.json:1-5`.
- **Evidencia:** la configuración de Next está vacía y la configuración de Sites solo identifica el proyecto; no existen reglas versionadas para CSP, `nosniff`, clickjacking, referencia o permisos.
- **Impacto:** si la plataforma no las añade, el sitio pierde defensas en profundidad frente a XSS futuro, carga de recursos no autorizados, framing y filtración de referencias. La aplicación actual no procesa contenido no confiable, por lo que la exposición inmediata es baja.
- **Corrección:** comprobar las respuestas de la URL publicada y configurar en Sites/Cloudflare una CSP compatible, `X-Content-Type-Options: nosniff`, `frame-ancestors`, `Referrer-Policy` y una `Permissions-Policy` mínima. No activar HSTS sin confirmar antes el alcance HTTPS de todo el dominio.
- **Nota de falso positivo:** estas cabeceras pueden existir en la infraestructura aunque no sean visibles en el checkout.

### LLA-002 — Baja — Paquete de despliegue sin regla de exclusión Git

- **Ubicación:** `.gitignore:32-38`; archivo local `llamingo-site.tar.gz`.
- **Evidencia:** el archivo comprimido está sin seguimiento y no existe una regla para `*.tar.gz` o para su nombre concreto.
- **Impacto:** un paquete compilado puede incorporarse por error, aumentar el repositorio, duplicar código generado o conservar configuración obsoleta. El paquete actual no contiene nombres de archivos sensibles detectables.
- **Corrección:** mantener los artefactos fuera de Git, añadir una regla de exclusión y generarlos únicamente durante el despliegue.

## Riesgo futuro — formulario de brief

`app/page.tsx:152` únicamente cambia el estado visual a “enviado”; `app/page.tsx:186` recoge nombre, empresa, correo y descripción, pero no los transmite ni persiste. Antes de conectarlo:

- crear un endpoint server-side con validación de esquema, límites de longitud, rate limiting y protección anti-spam;
- no incluir credenciales del proveedor de correo/CRM en el frontend;
- enviar únicamente a destinos fijos y autorizados;
- mostrar aviso de privacidad, finalidad y retención antes de recopilar datos;
- responder con mensajes genéricos y evitar registrar el contenido completo del brief.

## Controles positivos observados

- `.gitignore:29-30` excluye todas las variantes `.env*`.
- Las versiones directas principales están fijadas y existe `pnpm-lock.yaml`.
- No se encontraron APIs, Server Actions, cookies, almacenamiento web, `dangerouslySetInnerHTML`, evaluación dinámica o ejecución de comandos.
- Los enlaces externos que abren nuevas pestañas usan `rel="noreferrer"` (`app/page.tsx:163,184`).
- TypeScript terminó sin errores; ESLint terminó sin errores y solo informó advertencias de rendimiento de imágenes.
- La compilación de producción Vinext terminó correctamente.
- Next.js 16 pertenece actualmente a la línea Active LTS; el proyecto declara `next` 16.2.6.

## Límites y controles externos pendientes

- El remoto configurado es Sites, no GitHub; no se puede confirmar protección de ramas, MFA, escaneo de secretos o Dependabot para un repositorio GitHub porque no existe un remoto GitHub en este checkout.
- No se verificaron las cabeceras de una URL publicada ni controles de la cuenta de Sites/Cloudflare.
- La ausencia de coincidencias de secretos reduce el riesgo, pero no garantiza que nunca se haya compartido una credencial por otro canal.

## Orden recomendado

1. Verificar las cabeceras en la URL publicada.
2. Excluir `llamingo-site.tar.gz` y otros archivos comprimidos del repositorio.
3. Activar MFA/passkey y revisar las personas con acceso a la cuenta de alojamiento.
4. Diseñar el backend seguro y el aviso de privacidad antes de hacer funcional el brief.
