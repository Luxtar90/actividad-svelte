<script>
	import { createEventDispatcher } from 'svelte';
	
	export let user;
	
	const dispatch = createEventDispatcher();
	
	function handleHideDetails() {
		dispatch('hideDetails');
	}
</script>

<div class="user-details">
	<div class="details-header">
		<div class="user-avatar">
			{user.name.charAt(0).toUpperCase()}
		</div>
		<div class="user-info">
			<h2>{user.name}</h2>
			<p class="user-subtitle">{user.city}</p>
		</div>
		<button class="btn-close" on:click={handleHideDetails}>
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
				<path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
			</svg>
		</button>
	</div>
	
	<div class="details-content">
		<slot>
			<div class="info-section">
				<div class="info-item">
					<div class="info-icon">
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
							<path d="M3 4L17 4M3 10L17 10M3 16L17 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
						</svg>
					</div>
					<div class="info-content">
						<span class="label">Nombre completo</span>
						<span class="value">{user.name}</span>
					</div>
				</div>
				
				<div class="info-item">
					<div class="info-icon">
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
							<path d="M3 4L17 4L15 14L5 14L3 4ZM3 4L2 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</div>
					<div class="info-content">
						<span class="label">Correo electrónico</span>
						<span class="value">{user.email}</span>
					</div>
				</div>
				
				<div class="info-item">
					<div class="info-icon">
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
							<path d="M2 3L6 7L18 7L14 3L2 3Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</div>
					<div class="info-content">
						<span class="label">Teléfono</span>
						<span class="value">{user.phone}</span>
					</div>
				</div>
				
				<div class="info-item">
					<div class="info-icon">
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
							<circle cx="10" cy="8" r="3" stroke="currentColor" stroke-width="1.5"/>
							<path d="M16 14C16 11.7909 13.3137 10 10 10C6.68629 10 4 11.7909 4 14" stroke="currentColor" stroke-width="1.5"/>
						</svg>
					</div>
					<div class="info-content">
						<span class="label">Ciudad</span>
						<span class="value">{user.city}</span>
					</div>
				</div>
			</div>
		</slot>
	</div>
	
	<div class="details-footer">
		<button class="btn-primary" on:click={handleHideDetails}>
			Cerrar
		</button>
	</div>
</div>

<style>
	.user-details {
		background: var(--color-bg-primary);
		border-radius: var(--border-radius-lg);
		padding: var(--spacing-xl);
		box-shadow: var(--shadow-xl);
		width: 100%;
		max-width: 480px;
		border: 1px solid var(--color-border);
		animation: slideIn 0.3s ease-out;
	}
	
	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateY(-20px) scale(0.95);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}
	
	.details-header {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
		margin-bottom: var(--spacing-xl);
		padding-bottom: var(--spacing-lg);
		border-bottom: 1px solid var(--color-border);
	}
	
	.user-avatar {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--color-accent-blue), var(--color-accent-purple));
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-size: 1.5rem;
		font-weight: 600;
		flex-shrink: 0;
	}
	
	.user-info {
		flex: 1;
		min-width: 0;
	}
	
	.user-info h2 {
		margin: 0 0 var(--spacing-xs) 0;
		color: var(--color-text-primary);
		font-size: 1.5rem;
		font-weight: 600;
		line-height: 1.2;
	}
	
	.user-subtitle {
		margin: 0;
		color: var(--color-text-secondary);
		font-size: 0.9rem;
		font-weight: 400;
	}
	
	.btn-close {
		background: none;
		border: none;
		cursor: pointer;
		color: var(--color-text-secondary);
		padding: var(--spacing-sm);
		border-radius: var(--border-radius-md);
		transition: all 0.2s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}
	
	.btn-close:hover {
		background: var(--color-bg-secondary);
		color: var(--color-text-primary);
		transform: scale(1.05);
	}
	
	.btn-close:active {
		transform: scale(0.95);
	}
	
	.details-content {
		margin-bottom: var(--spacing-xl);
	}
	
	.info-section {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}
	
	.info-item {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
		padding: var(--spacing-md);
		background: var(--color-bg-secondary);
		border-radius: var(--border-radius-md);
		transition: all 0.2s ease;
	}
	
	.info-item:hover {
		background: var(--color-bg-tertiary);
		transform: translateY(-1px);
	}
	
	.info-icon {
		width: 40px;
		height: 40px;
		border-radius: var(--border-radius-md);
		background: var(--color-bg-primary);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-accent-blue);
		flex-shrink: 0;
		border: 1px solid var(--color-border);
	}
	
	.info-content {
		flex: 1;
		min-width: 0;
	}
	
	.label {
		display: block;
		font-size: 0.8rem;
		font-weight: 500;
		color: var(--color-text-secondary);
		margin-bottom: 2px;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}
	
	.value {
		display: block;
		color: var(--color-text-primary);
		font-size: 0.95rem;
		font-weight: 500;
		word-break: break-word;
	}
	
	.details-footer {
		display: flex;
		justify-content: center;
		padding-top: var(--spacing-lg);
		border-top: 1px solid var(--color-border);
	}
	
	.btn-primary {
		background: var(--color-accent-blue);
		color: white;
		border: none;
		padding: var(--spacing-md) var(--spacing-xl);
		border-radius: var(--border-radius-md);
		cursor: pointer;
		font-weight: 500;
		font-size: 0.95rem;
		transition: all 0.2s ease;
		min-width: 120px;
	}
	
	.btn-primary:hover {
		background: var(--color-accent-blue-dark);
		transform: translateY(-1px);
		box-shadow: var(--shadow-md);
	}
	
	.btn-primary:active {
		transform: translateY(0);
		box-shadow: var(--shadow-sm);
	}
	
	/* Responsive */
	@media (max-width: 768px) {
		.user-details {
			padding: var(--spacing-lg);
			border-radius: var(--border-radius-md);
			max-width: none;
		}
		
		.user-avatar {
			width: 50px;
			height: 50px;
			font-size: 1.25rem;
		}
		
		.user-info h2 {
			font-size: 1.25rem;
		}
		
		.details-header {
			margin-bottom: var(--spacing-lg);
			padding-bottom: var(--spacing-md);
		}
		
		.info-item {
			padding: var(--spacing-sm) var(--spacing-md);
		}
		
		.info-icon {
			width: 36px;
			height: 36px;
		}
		
		.btn-primary {
			width: 100%;
			padding: var(--spacing-md);
		}
	}
	
	@media (max-width: 480px) {
		.user-details {
			padding: var(--spacing-md);
		}
		
		.details-header {
			gap: var(--spacing-sm);
		}
		
		.user-avatar {
			width: 44px;
			height: 44px;
			font-size: 1.1rem;
		}
		
		.user-info h2 {
			font-size: 1.1rem;
		}
		
		.user-subtitle {
			font-size: 0.85rem;
		}
		
		.info-section {
			gap: var(--spacing-sm);
		}
		
		.info-item {
			gap: var(--spacing-sm);
		}
		
		.info-icon {
			width: 32px;
			height: 32px;
		}
		
		.value {
			font-size: 0.9rem;
		}
	}
</style>

