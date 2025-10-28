<script>
	import { page } from '$app/state';
</script>

<header>
	<div class="brand">
		<h2>Panel de Usuario</h2>
	</div>

	<nav>
		<ul>
			<li>
				<a href="/" class:active={page.url.pathname === '/'}>
					Inicio
				</a>
			</li>
			<li>
				<a href="/about" class:active={page.url.pathname === '/about'}>
					Acerca de
				</a>
			</li>
			<li>
				<a href="/sverdle" class:active={page.url.pathname.startsWith('/sverdle')}>
					Juego
				</a>
			</li>
		</ul>
	</nav>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--spacing-lg) var(--spacing-xl);
		background-color: var(--color-bg-primary);
		border-bottom: 1px solid rgba(0, 0, 0, 0.06);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
	}

	.brand h2 {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--color-text-primary);
		margin: 0;
	}

	nav ul {
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;
		gap: var(--spacing-lg);
	}

	nav a {
		display: block;
		padding: var(--spacing-sm) var(--spacing-md);
		color: var(--color-text-secondary);
		text-decoration: none;
		font-weight: 500;
		font-size: 0.9rem;
		border-radius: var(--radius-md);
		transition: all 0.2s ease;
		position: relative;
	}

	nav a:hover {
		color: var(--color-text-primary);
		background-color: var(--color-accent-light-gray);
	}

	nav a.active {
		color: var(--color-accent-blue);
		background-color: rgba(0, 122, 255, 0.1);
	}

	@media (max-width: 768px) {
		header {
			padding: var(--spacing-md) var(--spacing-lg);
		}

		.brand h2 {
			font-size: 1.1rem;
		}

		nav ul {
			gap: var(--spacing-md);
		}

		nav a {
			padding: var(--spacing-xs) var(--spacing-sm);
			font-size: 0.85rem;
		}
	}
</style>
