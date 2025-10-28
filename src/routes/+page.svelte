<script>
	import UserCard from '../components/UserCard.svelte';
	import UserDetails from '../components/UserDetails.svelte';
	import { clickedUsersCount, clickedUserIds } from '../stores/userStore.js';
	
	// Datos de ejemplo de usuarios internacionales
	const users = [
		{
			id: 1,
			name: 'Sophie Chen',
			email: 'sophie.chen@techcorp.com',
			phone: '+1 415 555 0123',
			city: 'San Francisco'
		},
		{
			id: 2,
			name: 'Alessandro Rossi',
			email: 'a.rossi@designstudio.it',
			phone: '+39 06 1234 5678',
			city: 'Roma'
		},
		{
			id: 3,
			name: 'Yuki Tanaka',
			email: 'yuki.tanaka@innovate.jp',
			phone: '+81 3 9876 5432',
			city: 'Tokyo'
		},
		{
			id: 4,
			name: 'Emma Thompson',
			email: 'emma.thompson@creative.co.uk',
			phone: '+44 20 7946 0958',
			city: 'London'
		},
		{
			id: 5,
			name: 'Lucas Müller',
			email: 'lucas.mueller@engineering.de',
			phone: '+49 30 1234 5678',
			city: 'Berlin'
		},
		{
			id: 6,
			name: 'Priya Sharma',
			email: 'priya.sharma@startup.in',
			phone: '+91 98765 43210',
			city: 'Mumbai'
		}
	];
	
	let selectedUser = null;
	
	// Bloquear scroll del body cuando el modal está abierto
	$: if (typeof document !== 'undefined') {
		if (selectedUser) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}
	
	function handleShowDetails(event) {
		const user = event.detail.user;
		selectedUser = user;
		
		// Actualizar el contador si es la primera vez que se clickea este usuario
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
	
	function handleHideDetails() {
		selectedUser = null;
	}
</script>

<svelte:head>
	<title>Panel Interactivo de Usuario</title>
</svelte:head>

<div class="container">
	<header class="page-header">
		<h1>Panel de Usuario</h1>
		<p class="subtitle">Explora y gestiona información de usuarios de manera elegante</p>
		<div class="counter-badge">
			<span class="counter-label">Usuarios explorados</span>
			<span class="counter-value">{$clickedUsersCount}</span>
		</div>
	</header>
	
	<main>
		<div class="users-grid">
			{#each users as user (user.id)}
				<UserCard 
					{user} 
					isSelected={selectedUser?.id === user.id}
					on:showDetails={handleShowDetails}
				>
					<div slot="info" class="card-extra-info">
						<p class="user-email">{user.email}</p>
						<p class="user-city">{user.city}</p>
					</div>
				</UserCard>
			{/each}
		</div>
	</main>
	
	{#if selectedUser}
		<div class="modal-overlay" on:click={handleHideDetails} on:keydown={(e) => e.key === 'Escape' && handleHideDetails()} role="button" tabindex="0">
			<div class="modal-content" on:click={(e) => e.stopPropagation()} on:keydown={(e) => e.stopPropagation()} role="dialog" tabindex="-1">
				<UserDetails 
					user={selectedUser} 
					on:hideDetails={handleHideDetails}
				>
					<div class="custom-details">
						<div class="detail-card">
							<div class="icon">👤</div>
							<div class="detail-info">
								<span class="detail-label">Nombre Completo</span>
								<span class="detail-value">{selectedUser.name}</span>
							</div>
						</div>
						<div class="detail-card">
							<div class="icon">📧</div>
							<div class="detail-info">
								<span class="detail-label">Correo Electrónico</span>
								<span class="detail-value">{selectedUser.email}</span>
							</div>
						</div>
						<div class="detail-card">
							<div class="icon">📱</div>
							<div class="detail-info">
								<span class="detail-label">Teléfono</span>
								<span class="detail-value">{selectedUser.phone}</span>
							</div>
						</div>
						<div class="detail-card">
							<div class="icon">🏙️</div>
							<div class="detail-info">
								<span class="detail-label">Ciudad</span>
								<span class="detail-value">{selectedUser.city}</span>
							</div>
						</div>
					</div>
				</UserDetails>
			</div>
		</div>
	{/if}
</div>

<style>
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0;
	}
	
	.page-header {
		text-align: center;
		margin-bottom: var(--spacing-2xl);
		padding: var(--spacing-2xl) var(--spacing-lg);
		background-color: var(--color-bg-primary);
		border-radius: var(--radius-xl);
		margin: var(--spacing-lg);
		box-shadow: var(--shadow-sm);
	}
	
	.page-header h1 {
		font-size: 2.5rem;
		font-weight: 700;
		margin: 0 0 var(--spacing-sm) 0;
		color: var(--color-text-primary);
		letter-spacing: -0.02em;
	}
	
	.subtitle {
		font-size: 1.125rem;
		color: var(--color-text-secondary);
		margin: 0 0 var(--spacing-xl) 0;
		font-weight: 400;
	}
	
	.counter-badge {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-sm);
		background-color: var(--color-accent-light-gray);
		padding: var(--spacing-sm) var(--spacing-lg);
		border-radius: var(--radius-xl);
		border: 1px solid rgba(0, 0, 0, 0.06);
	}
	
	.counter-label {
		font-weight: 500;
		font-size: 0.9rem;
		color: var(--color-text-secondary);
	}
	
	.counter-value {
		background-color: var(--color-accent-blue);
		color: white;
		font-weight: 600;
		font-size: 0.875rem;
		padding: var(--spacing-xs) var(--spacing-sm);
		border-radius: var(--radius-md);
		min-width: 1.5rem;
		text-align: center;
	}
	
	main {
		width: 100%;
		padding: 0 var(--spacing-lg);
	}
	
	.users-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: var(--spacing-lg);
	}
	
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-lg);
		animation: fadeIn 0.2s ease;
		overflow-y: auto;
	}
	
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	
	.modal-content {
		max-width: 600px;
		width: 100%;
		animation: slideUp 0.3s ease;
		margin: auto;
	}
	
	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(20px) scale(0.98);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}
	
	.card-extra-info {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}
	
	.user-email, .user-city {
		margin: 0;
		font-size: 0.875rem;
		color: var(--color-text-secondary);
		font-weight: 400;
	}
	
	.custom-details {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}
	
	.detail-card {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
		padding: var(--spacing-lg);
		background-color: var(--color-surface);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-sm);
		border: 1px solid rgba(0, 0, 0, 0.04);
		transition: all 0.2s ease;
	}
	
	.detail-card:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-md);
	}
	
	.icon {
		font-size: 1.5rem;
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--color-accent-light-gray);
		border-radius: var(--radius-md);
	}
	
	.detail-info {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
		flex: 1;
	}
	
	.detail-label {
		font-size: 0.75rem;
		color: var(--color-text-tertiary);
		text-transform: uppercase;
		letter-spacing: 0.5px;
		font-weight: 600;
	}
	
	.detail-value {
		font-size: 1rem;
		color: var(--color-text-primary);
		font-weight: 500;
	}
	
	@media (max-width: 768px) {
		.page-header {
			margin: var(--spacing-md);
			padding: var(--spacing-xl) var(--spacing-md);
		}
		
		.page-header h1 {
			font-size: 2rem;
		}
		
		.subtitle {
			font-size: 1rem;
		}
		
		main {
			padding: 0 var(--spacing-md);
		}
		
		.users-grid {
			grid-template-columns: 1fr;
			gap: var(--spacing-md);
		}
		
		.modal-overlay {
			padding: var(--spacing-md);
			align-items: flex-start;
			padding-top: var(--spacing-xl);
		}
		
		.modal-content {
			max-width: 100%;
		}
	}
</style>
