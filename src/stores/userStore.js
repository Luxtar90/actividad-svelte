import { writable } from 'svelte/store';

// Store para contar cuántos usuarios han sido clicados
export const clickedUsersCount = writable(0);

// Store para llevar registro de qué usuarios han sido clicados
export const clickedUserIds = writable(new Set());

