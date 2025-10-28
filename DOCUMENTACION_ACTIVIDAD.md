# Panel Interactivo de Usuario - Documentación Completa

## Índice
1. [Introducción](#introducción)
2. [Objetivos de Aprendizaje](#objetivos-de-aprendizaje)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Componentes Desarrollados](#componentes-desarrollados)
5. [Implementación Detallada](#implementación-detallada)
6. [Características y Funcionalidades](#características-y-funcionalidades)
7. [Conceptos de Svelte Utilizados](#conceptos-de-svelte-utilizados)
8. [Guía de Uso](#guía-de-uso)
9. [Conclusiones](#conclusiones)

---

## Introducción

Este proyecto implementa un **Panel Interactivo de Usuario** utilizando Svelte, un framework moderno de JavaScript que permite crear interfaces de usuario reactivas de manera eficiente. El panel permite visualizar tarjetas de usuarios y mostrar sus detalles de forma interactiva mediante eventos personalizados y componentes reutilizables.

## Objetivos de Aprendizaje

La actividad está diseñada para cumplir los siguientes objetivos pedagógicos:

### 1. Crear componentes reutilizables en Svelte
Se han desarrollado dos componentes principales (`UserCard` y `UserDetails`) que pueden ser utilizados en diferentes contextos y con distintos datos, demostrando el principio de reutilización de código.

### 2. Usar slots para personalizar contenido
Los componentes implementan **slots** que permiten inyectar contenido personalizado desde el componente padre, proporcionando flexibilidad en la presentación de la información.

### 3. Emplear eventos personalizados con createEventDispatcher
Se utiliza `createEventDispatcher` para establecer una comunicación bidireccional entre componentes hijo y padre, permitiendo que las acciones del usuario en un componente afecten el estado global de la aplicación.

### 4. Implementar un store global
Se ha creado un **store de Svelte** para mantener un contador global de usuarios que han sido explorados, demostrando el manejo de estado compartido en la aplicación.

---

## Estructura del Proyecto

```
src/
├─ stores/
│   └─ userStore.js              ← Store global para contador
├─ components/
│   ├─ UserCard.svelte          ← Componente de tarjeta de usuario
│   └─ UserDetails.svelte       ← Componente de detalles de usuario
└─ routes/
    └─ +page.svelte             ← Página principal
```

### Descripción de archivos:

- **`userStore.js`**: Define el store reactivo que mantiene el contador de usuarios clicados.
- **`UserCard.svelte`**: Componente que muestra una tarjeta con información básica del usuario.
- **`UserDetails.svelte`**: Componente que muestra información detallada del usuario seleccionado.
- **`+page.svelte`**: Página principal que integra todos los componentes y maneja la lógica de interacción.

---

## Componentes Desarrollados

### 1. UserCard.svelte

**Propósito**: Mostrar una tarjeta visual con información básica de un usuario.

**Props (Propiedades)**:
- `user`: Objeto con la información del usuario (nombre, email, teléfono, ciudad)
- `isSelected`: Boolean que indica si el usuario está actualmente seleccionado

**Eventos Emitidos**:
- `showDetails`: Se emite cuando el usuario hace clic en "Mostrar Detalles"

**Características Especiales**:
- Cambia su diseño visual cuando está seleccionado (borde naranja, sombra especial)
- Utiliza un **slot** con nombre `info` para permitir personalización del contenido
- Animaciones suaves en hover y al seleccionar

**Código Clave**:
```svelte
const dispatch = createEventDispatcher();

function handleShowDetails() {
    dispatch('showDetails', { user });
}
```

### 2. UserDetails.svelte

**Propósito**: Mostrar información detallada del usuario seleccionado en un panel destacado.

**Props**:
- `user`: Objeto con toda la información del usuario a mostrar

**Eventos Emitidos**:
- `hideDetails`: Se emite cuando el usuario desea ocultar los detalles

**Características Especiales**:
- Utiliza un **slot** sin nombre para permitir personalización completa del contenido
- Incluye animación de entrada (slideIn)
- Dos formas de cerrar: botón de cerrar (✕) y botón "Ocultar Detalles"
- Diseño modal centrado con sombras pronunciadas

**Código Clave**:
```svelte
function handleHideDetails() {
    dispatch('hideDetails');
}
```

### 3. Store Global (userStore.js)

**Propósito**: Mantener un estado global accesible desde cualquier componente.

**Stores Exportados**:
- `clickedUsersCount`: Contador numérico de usuarios únicos explorados
- `clickedUserIds`: Set que mantiene los IDs de usuarios ya clicados

**Implementación**:
```javascript
import { writable } from 'svelte/store';

export const clickedUsersCount = writable(0);
export const clickedUserIds = writable(new Set());
```

### 4. Página Principal (+page.svelte)

**Propósito**: Integrar todos los componentes y manejar la lógica de interacción.

**Funcionalidades**:
- Define un array de 6 usuarios de ejemplo
- Maneja el estado del usuario seleccionado
- Escucha eventos personalizados de los componentes hijos
- Actualiza el store global cuando se explora un nuevo usuario
- Renderiza la grilla de tarjetas de usuario
- Muestra los detalles cuando se selecciona un usuario

---

## Implementación Detallada

### Flujo de Interacción

1. **Usuario visualiza la página**: Se muestran 6 tarjetas de usuario en una grilla responsiva.

2. **Usuario hace clic en "Mostrar Detalles"**:
   - `UserCard` emite el evento `showDetails` con los datos del usuario
   - El componente padre (`+page.svelte`) captura el evento
   - Se actualiza `selectedUser` con los datos del usuario
   - Se verifica si es la primera vez que se clickea este usuario
   - Si es nuevo, se incrementa el contador global en el store
   - Se renderiza el componente `UserDetails` con los datos

3. **Usuario visualiza los detalles**:
   - Se muestra un panel destacado con información completa
   - La tarjeta del usuario seleccionado cambia su apariencia
   - El contador global se actualiza en tiempo real

4. **Usuario oculta los detalles**:
   - El usuario puede hacer clic en la "✕" o en "Ocultar Detalles"
   - `UserDetails` emite el evento `hideDetails`
   - El componente padre establece `selectedUser = null`
   - El panel de detalles desaparece
   - Las tarjetas vuelven a su estado normal

### Manejo del Store Global

```javascript
function handleShowDetails(event) {
    const user = event.detail.user;
    selectedUser = user;
    
    // Actualizar el contador si es la primera vez
    clickedUserIds.update(ids => {
        if (!ids.has(user.id)) {
            const newIds = new Set(ids);
            newIds.add(user.id);
            clickedUsersCount.update(n => n + 1);
            return newIds;
        }
        return ids;
    });
}
```

**Explicación**:
- Se utiliza el método `update` del store para modificar su valor
- Se verifica si el ID del usuario ya existe en el Set
- Solo se incrementa el contador si es un usuario nuevo
- Esto asegura que cada usuario solo se cuenta una vez

### Uso de Slots

#### En UserCard:
```svelte
<slot name="info">
    <p class="email">{user.email}</p>
</slot>
```

**Uso desde el padre**:
```svelte
<UserCard {user}>
    <div slot="info" class="card-extra-info">
        <p>✉️ {user.email}</p>
        <p>📍 {user.city}</p>
    </div>
</UserCard>
```

#### En UserDetails:
```svelte
<slot>
    <!-- Contenido por defecto -->
</slot>
```

**Uso desde el padre**:
```svelte
<UserDetails user={selectedUser}>
    <div class="custom-details">
        <!-- Contenido personalizado -->
    </div>
</UserDetails>
```

---

## Características y Funcionalidades

### 1. Diseño Responsivo
- Grilla adaptativa que ajusta el número de columnas según el ancho de pantalla
- En móviles: 1 columna
- En tablets y escritorio: múltiples columnas (auto-fill)

### 2. Feedback Visual
- **Hover**: Las tarjetas se elevan ligeramente y aumentan su sombra
- **Selección**: La tarjeta seleccionada tiene un borde naranja y fondo con gradiente
- **Animaciones**: Transiciones suaves en todos los cambios de estado

### 3. Contador Global Persistente
- Muestra cuántos usuarios únicos han sido explorados
- Se actualiza automáticamente en tiempo real
- Diseño tipo badge destacado en el encabezado

### 4. Interfaz Moderna
- Gradiente de fondo (púrpura)
- Componentes con backdrop-filter (efecto de vidrio esmerilado)
- Iconos emoji para mejor visualización
- Sombras y bordes redondeados para profundidad

### 5. Reutilización de Componentes
- Los componentes pueden usarse con diferentes datos
- Los slots permiten personalización sin modificar el componente
- Separación clara de responsabilidades

---

## Conceptos de Svelte Utilizados

### 1. Reactividad
Svelte actualiza automáticamente el DOM cuando cambian las variables reactivas:
```javascript
let selectedUser = null; // Variable reactiva
```

### 2. Eventos Personalizados (createEventDispatcher)
```javascript
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();

dispatch('nombreEvento', { datos });
```

### 3. Stores (Estado Global)
```javascript
import { writable } from 'svelte/store';
export const contador = writable(0);

// Acceder al valor: $contador
// Actualizar: contador.update(n => n + 1)
```

### 4. Slots (Proyección de Contenido)
- **Slot con nombre**: `<slot name="info"></slot>`
- **Slot por defecto**: `<slot></slot>`
- **Contenido fallback**: contenido dentro del slot que se muestra si no se proporciona nada

### 5. Props (Propiedades de Componente)
```javascript
export let user;
export let isSelected = false; // Con valor por defecto
```

### 6. Directivas Reactivas
- `class:selected={isSelected}`: Añade la clase CSS condicionalmente
- `on:click={handler}`: Vincula evento a función
- `{#if condicion}...{/if}`: Renderizado condicional
- `{#each array as item}...{/each}`: Renderizado de listas

### 7. Acceso a Stores con $
```svelte
{$clickedUsersCount}
```
El prefijo `$` permite acceder directamente al valor del store y suscribirse a sus cambios.

---

## Guía de Uso

### Instalación y Ejecución

1. **Navegar al directorio del proyecto**:
   ```bash
   cd actividad-svelte
   ```

2. **Instalar dependencias** (si no están instaladas):
   ```bash
   pnpm install
   ```

3. **Ejecutar el servidor de desarrollo**:
   ```bash
   pnpm dev
   ```

4. **Abrir en el navegador**:
   ```
   http://localhost:5173
   ```

### Interacción con la Aplicación

1. **Explorar Usuarios**:
   - Observa las 6 tarjetas de usuario en la página principal
   - Nota el contador en "0" al inicio

2. **Ver Detalles**:
   - Haz clic en "Mostrar Detalles" de cualquier tarjeta
   - Observa cómo la tarjeta cambia de apariencia
   - Se muestra un panel con información detallada
   - El contador se incrementa a "1"

3. **Ocultar Detalles**:
   - Haz clic en la "✕" o en "Ocultar Detalles"
   - El panel desaparece y las tarjetas vuelven a la normalidad

4. **Explorar Múltiples Usuarios**:
   - Haz clic en otros usuarios
   - El contador solo aumenta para usuarios nuevos
   - Si vuelves a clickear el mismo usuario, el contador no cambia

### Personalización

#### Modificar los datos de usuarios:
Edita el array `users` en `src/routes/+page.svelte`:
```javascript
const users = [
    {
        id: 1,
        name: 'Tu Nombre',
        email: 'tu@email.com',
        phone: '+XX XXX XXX XXX',
        city: 'Tu Ciudad'
    },
    // ... más usuarios
];
```

#### Cambiar colores:
Modifica las variables CSS en los archivos `.svelte`:
```css
background: #ff3e00;  /* Color principal de Svelte */
```

#### Agregar más campos:
1. Añade propiedades al objeto usuario
2. Actualiza el slot en `UserDetails.svelte` o en `+page.svelte`
3. Muestra los nuevos campos en el HTML

---

## Conclusiones

Este proyecto demuestra de manera práctica y completa los conceptos fundamentales de Svelte:

### Logros Cumplidos:

✅ **Componentes Reutilizables**: `UserCard` y `UserDetails` pueden usarse con cualquier dato de usuario.

✅ **Slots para Personalización**: Ambos componentes permiten inyectar contenido personalizado.

✅ **Eventos Personalizados**: Comunicación eficiente entre componentes hijo-padre mediante `createEventDispatcher`.

✅ **Cambio de Diseño Dinámico**: `UserCard` cambia visualmente cuando está seleccionado.

✅ **Botón para Ocultar**: `UserDetails` emite evento para cerrar el panel.

✅ **Store Global**: Contador de usuarios clicados accesible desde toda la aplicación.

### Conceptos Aprendidos:

- **Reactividad de Svelte**: Las variables se actualizan automáticamente en el DOM
- **Comunicación entre componentes**: Mediante eventos personalizados y stores
- **Composición de componentes**: Uso de slots para mayor flexibilidad
- **Manejo de estado**: Local (variables) y global (stores)
- **Diseño responsivo**: Grillas CSS adaptativas
- **Mejores prácticas**: Separación de componentes, reutilización de código

### Aplicaciones Prácticas:

Este patrón de diseño es aplicable a:
- Catálogos de productos
- Directorios de empleados
- Galerías de proyectos
- Listas de tareas con detalles
- Sistemas de gestión de usuarios
- Dashboards administrativos

---

## Recursos Adicionales

- [Documentación Oficial de Svelte](https://svelte.dev/docs)
- [Tutorial Interactivo de Svelte](https://svelte.dev/tutorial)
- [Svelte REPL (Playground Online)](https://svelte.dev/repl)
- [Ejemplos de Svelte](https://svelte.dev/examples)

---

**Fecha de creación**: Octubre 2025  
**Framework**: Svelte + SvelteKit  
**Autor**: Actividad educativa de componentes interactivos

