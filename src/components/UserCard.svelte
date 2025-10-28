<script>
	import { createEventDispatcher } from 'svelte';
	
	export let user;
	export let isSelected = false;
	
	const dispatch = createEventDispatcher();
	
	function handleShowDetails() {
		dispatch('showDetails', { user });
	}
</script>

<div class="user-card" class:selected={isSelected}>
	<div class="card-content">
		<div class="user-avatar">
			{user.name.charAt(0).toUpperCase()}
		</div>
		<div class="user-info">
			<h3>{user.name}</h3>
			<slot name="info">
				<p class="email">{user.email}</p>
			</slot>
		</div>
		<button class="btn-primary" on:click={handleShowDetails}>
			Ver Detalles
		</button>
	</div>
</div>

<style>
	.user-card {
		background-color: var(--color-surface);
		border-radius: var(--radius-lg);
		padding: var(--spacing-lg);
		box-shadow: var(--shadow-sm);
		border: 1px solid rgba(0, 0, 0, 0.04);
		transition: all 0.3s ease;
		cursor: pointer;
	}
	
	.user-card:hover {
		box-shadow: var(--shadow-md);
		transform: translateY(-4px);
		border-color: rgba(0, 122, 255, 0.2);
	}
	
	.user-card.selected {
		border-color: var(--color-accent-blue);
		box-shadow: 0 8px 24px rgba(0, 122, 255, 0.15);
		background-color: rgba(0, 122, 255, 0.02);
	}
	
	.card-content {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
		align-items: center;
		text-align: center;
	}
	
	.user-avatar {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--color-accent-blue), #5ac8fa);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
		font-weight: 600;
		color: white;
		margin-bottom: var(--spacing-sm);
	}
	
	.user-info {
		flex: 1;
		width: 100%;
	}
	
	h3 {
		margin: 0 0 var(--spacing-xs) 0;
		color: var(--color-text-primary);
		font-size: 1.125rem;
		font-weight: 600;
		line-height: 1.3;
	}
	
	.email {
		margin: 0;
		color: var(--color-text-secondary);
		font-size: 0.875rem;
		font-weight: 400;
	}
	
	.btn-primary {
		background-color: var(--color-accent-blue);
		color: white;
		border: none;
		padding: var(--spacing-sm) var(--spacing-lg);
		border-radius: var(--radius-md);
		cursor: pointer;
		font-weight: 500;
		font-size: 0.875rem;
		transition: all 0.2s ease;
		width: 100%;
		margin-top: var(--spacing-sm);
	}
	
	.btn-primary:hover {
		background-color: var(--color-accent-blue-hover);
		transform: translateY(-1px);
	}
	
	.btn-primary:active {
		transform: translateY(0);
	}
	
	@media (max-width: 768px) {
		.user-card {
			padding: var(--spacing-md);
		}
		
		.user-avatar {
			width: 50px;
			height: 50px;
			font-size: 1.25rem;
		}
		
		h3 {
			font-size: 1rem;
		}
	}
</style>

