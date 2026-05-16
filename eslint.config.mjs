import nx from '@nx/eslint-plugin';

/** @type {import("eslint").Linter.FlatConfig[]} */
const config = [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist'],
  },
  {
    files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              // Apps can import shared and data-access, but NOT other apps
              sourceTag: 'scope:app',
              onlyDependOnLibsWithTags: ['scope:shared', 'scope:data-access'],
            },
            {
              // Shared libs can only depend on other shared libs
              sourceTag: 'scope:shared',
              onlyDependOnLibsWithTags: ['scope:shared'],
            },
            {
              // Data-access can depend on shared and other data-access libs
              sourceTag: 'scope:data-access',
              onlyDependOnLibsWithTags: ['scope:shared', 'scope:data-access'],
            },
            {
              // Data-access must not depend on UI
              sourceTag: 'scope:data-access',
              notDependOnLibsWithTags: ['type:ui'],
            },
          ],
        },
      ],
    },
  },
];

export default config;
