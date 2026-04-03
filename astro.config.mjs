// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	site: 'https://api.marc27.com',
	base: '/docs',
	integrations: [
		starlight({
			title: 'MARC27',
			logo: {
				src: './public/logo_marc27.svg',
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/Darth-Hidious/marc27-core' },
			],
			customCss: ['./src/styles/custom.css'],
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Introduction', slug: 'getting-started/introduction' },
						{ label: 'Quick Start', slug: 'getting-started/quickstart' },
						{ label: 'Authentication', slug: 'getting-started/auth' },
					],
				},
				{
					label: 'Knowledge Plane',
					items: [
						{ label: 'Overview', slug: 'knowledge/overview' },
						{ label: 'Graph Search', slug: 'knowledge/graph-search' },
						{ label: 'Semantic Search', slug: 'knowledge/semantic-search' },
						{ label: 'Research Mode (RLM)', slug: 'knowledge/research-mode' },
						{ label: 'Ingestion', slug: 'knowledge/ingestion' },
					],
				},
				{
					label: 'Intelligence Plane',
					items: [
						{ label: 'LLM Service', slug: 'intelligence/llm' },
						{ label: 'Compute Tools', slug: 'intelligence/compute-tools' },
					],
				},
				{
					label: 'Compute Plane',
					items: [
						{ label: 'GPU Providers', slug: 'compute/providers' },
						{ label: 'Submitting Jobs', slug: 'compute/jobs' },
						{ label: 'PRISM Nodes', slug: 'compute/nodes' },
					],
				},
				{
					label: 'API Reference',
					items: [
						{ label: 'Endpoints', slug: 'api/endpoints' },
						{ label: 'GraphQL', slug: 'api/graphql' },
						{ label: 'Agent Guide', slug: 'api/agent-guide' },
						{ label: 'Error Handling', slug: 'api/errors' },
					],
				},
				{
					label: 'PRISM CLI',
					items: [
						{ label: 'Installation', slug: 'prism/install' },
						{ label: 'Commands', slug: 'prism/commands' },
						{ label: 'Agent Interface', slug: 'prism/agent' },
					],
				},
				{
					label: 'Self-Hosting',
					items: [
						{ label: 'Docker Compose', slug: 'self-hosting/docker' },
						{ label: 'Enterprise', slug: 'self-hosting/enterprise' },
					],
				},
			],
		}),
	],
});
