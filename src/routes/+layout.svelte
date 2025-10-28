<script>
	import Header from './Header.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<div class="app">
	<Header />

	<main>
		{@render children()}
	</main>

	<footer>
		<p class="text-secondary">
			Construido con <a href="https://svelte.dev/docs/kit">SvelteKit</a>
		</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background-color: var(--color-bg-secondary);
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: var(--spacing-xl) var(--spacing-lg);
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
	}

	footer {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: var(--spacing-xl);
		background-color: var(--color-bg-primary);
		border-top: 1px solid rgba(0, 0, 0, 0.06);
	}

	footer p {
		font-size: 0.875rem;
		margin: 0;
	}

	footer a {
		font-weight: 500;
		transition: opacity 0.2s ease;
	}

	footer a:hover {
		opacity: 0.8;
	}

	@media (max-width: 768px) {
		main {
			padding: var(--spacing-lg) var(--spacing-md);
		}
		
		footer {
			padding: var(--spacing-lg);
		}
	}
</style>
