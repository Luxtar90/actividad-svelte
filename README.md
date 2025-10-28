# 🎯 Panel Interactivo de Usuario

> **Panel de usuarios interactivo con diseño Apple-style construido en Svelte**

![Svelte](https://img.shields.io/badge/Svelte-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## ✨ Características

- 🎨 **Diseño minimalista** inspirado en Apple
- 📱 **Totalmente responsivo** 
- ⚡ **Componentes reutilizables** con Svelte
- 🔄 **Estado global** con stores
- 🎭 **Animaciones suaves** y transiciones
- 📊 **Contador de usuarios explorados**

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
pnpm install

# Ejecutar servidor de desarrollo
pnpm dev

# Abrir en el navegador
http://localhost:5173
```

## 🏗️ Estructura del Proyecto

```
src/
├── stores/
│   └── userStore.js         # Estado global
├── components/
│   ├── UserCard.svelte      # Tarjeta de usuario
│   └── UserDetails.svelte   # Detalles del usuario
└── routes/
    └── +page.svelte         # Página principal
```

## 🎯 Conceptos Implementados

### 🧩 Componentes Reutilizables
- **UserCard**: Tarjeta con información básica
- **UserDetails**: Panel modal con información completa

### 🎪 Slots Personalizables
```svelte
<!-- Slot con nombre -->
<slot name="info">
    <p class="email">{user.email}</p>
</slot>

<!-- Slot por defecto -->
<slot>
    <!-- Contenido personalizable -->
</slot>
```

### 📡 Eventos Personalizados
```javascript
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();

// Emitir evento
dispatch('showDetails', { user });
```

### 🗄️ Store Global
```javascript
import { writable } from 'svelte/store';

export const clickedUsersCount = writable(0);
export const clickedUserIds = writable(new Set());
```

## 🎮 Cómo Usar

1. **Explora usuarios**: Haz clic en "Ver Detalles" en cualquier tarjeta
2. **Ve la información**: Se abre un panel con detalles completos
3. **Contador automático**: Cuenta usuarios únicos explorados
4. **Cierra detalles**: Usa la ✕ o el botón "Cerrar"

## 🎨 Personalización

### Cambiar datos de usuarios
```javascript
// En src/routes/+page.svelte
const users = [
    {
        id: 1,
        name: 'Tu Nombre',
        email: 'tu@email.com',
        phone: '+XX XXX XXX XXX',
        city: 'Tu Ciudad'
    }
];
```

### Modificar colores
```css
/* Variables CSS personalizables */
--primary-color: #007AFF;
--background-color: #F2F2F7;
--text-color: #1D1D1F;
```

## 🛠️ Tecnologías

- **Svelte** - Framework reactivo
- **SvelteKit** - Framework full-stack
- **CSS Variables** - Theming consistente
- **Flexbox & Grid** - Layout responsivo

## 📱 Responsive Design

- 📱 **Móvil**: 1 columna
- 📟 **Tablet**: 2-3 columnas  
- 🖥️ **Desktop**: 3+ columnas

## 🎯 Logros del Proyecto

✅ Componentes reutilizables  
✅ Slots para personalización  
✅ Eventos personalizados  
✅ Store global reactivo  
✅ Diseño responsivo  
✅ Animaciones fluidas  

---

**🚀 Desarrollado con Svelte + SvelteKit**

