const baseEnv = {
  browser: true,
  node: true,
  es2022: true,
};
const jestEnv = {
  jest: true,
  'jest/globals': true,
};
const jestPlugins = [
  'jest',
  'jest-dom',
  'jest-async',
];
const playwrightEnv = {};
const playwrightPlugins = [];

const baseExtends = [
  'eslint:recommended',
  'plugin:react/recommended',
  'plugin:react/jsx-runtime',
  'plugin:react-hooks/recommended',

  // next/core-web-vitals sets some of these plugins' rules,
  // but as best I can tell, it does not actually extend their recommended rulesets. So we do that.
  'plugin:jsx-a11y/recommended',
  'plugin:import/recommended',
  'plugin:import/typescript',

  // This has to go last (next.js recommended practice)
  'plugin:@next/next/recommended',
];
const tsExtends = [
  'plugin:@typescript-eslint/recommended',
];
const jestExtends = [
  'plugin:jest/recommended',
  'plugin:jest/style',
  'plugin:jest-dom/recommended',
];
const playwrightExtends = [
  'plugin:playwright/playwright-test',
];

const baseRules = {
  // At one point I had these settings? Delete them if they don't surface in six months.
  // 'react/destructuring-assignment': 'off',
  // 'react/jsx-one-expression-per-line': 'off',
  // 'react/function-component-definition': 'off',
  // 'jsx-a11y/click-events-have-key-events': 'off',
  // 'jsx-a11y/no-noninteractive-element-interactions': 'off',
  // 'import/prefer-default-export': 'off',
  // 'brace-style': 'off', // also in typescript
  // 'implicit-arrow-linebreak': 'off',

  // We have typescript, and our supabase api is type-safe, so we don't need dynamic type checking.
  'react/prop-types': 'off',
  'react/require-default-props': 'off',

  'react/jsx-pascal-case': [2 /* error */, { allowAllCaps: true, allowLeadingUnderscore: true }],
  // 'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
  'jsx-a11y/label-has-associated-control': [2, {
    assert: 'either',
  }],
  // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/18266282424c546f47a74f842a7bf62bdde1d5e8/docs/rules/anchor-is-valid.md#case-i-use-nextjs-and-im-getting-this-error-inside-of-links
  // I think the above is no longer a problem cus <Link renders directly to an <a now
  // but if it's still a problem, disable it again
  // 'jsx-a11y/anchor-is-valid': 'off',
  'jsx-a11y/anchor-is-valid': ['error', { components: ['Link'] }],
  // Lines are limited to the width of a vscode window (no minimap) taking up half of a 1440p screen
  'max-len': ['warn', {
    code: 140,
    tabWidth: 2,
    ignoreComments: true,
    ignoreUrls: true,
  }],
  // 'arrow-body-style': ['warn', 'as-needed'],
  'object-curly-newline': ['error', { consistent: true }],
  // 'operator-linebreak': ['error', 'before', { overrides: { '=': 'after' } }],
  'spaced-comment': ['warn', 'always', { markers: ['/'], exceptions: ['/'] }],
  // The below have @typescript-eslint version overriding it in ts files.
  'no-unused-vars': 'off', // Enable this in a prod PR Github Action
  // this rule is a huge diva, wasted a bunch of time, and didn't prevent anything
  // 'import/no-extraneous-dependencies': ['error', { devDependencies: [
  //   '**/*.spec.{ts,tsx}',
  //   'jest.setup.ts',
  //   'middleware.ts',
  //   'tailwind.config.js',
  //   'playwright.config.ts',
  //   // '**/e2eTestHelpers.ts', @playwright/test is being a huge diva about this and
  //   // we seem to have previously chosen to just put it in regular 'dependencies'
  //   // so we're just going to do that now.
  // ] }],
  'semi': 'warn',
  'eol-last': ['warn', 'always'],
  'quotes': ['warn', 'single'],
  'arrow-parens': 'off', // ['warn', 'always'],
  'comma-dangle': ['warn', 'always-multiline'],
  'no-multi-spaces': 'warn',
  'react-hooks/exhaustive-deps': ['warn', { additionalHooks: '(useRecoilCallback|useRecoilTransaction_UNSTABLE)' }],
  'import/no-named-as-default': 'off',
};
const tsRules = {
  // '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/no-unused-vars': 'off', // Enable this in a prod PR Github Action
  // disabling because this is "technically safe" in React and the next.js docs use it
  // https://github.com/typescript-eslint/typescript-eslint/issues/2063#issuecomment-675156492
  // '@typescript-eslint/ban-types': [
  //   'error',
  //   {
  //     extendDefaults: true,
  //     types: {
  //       '{}': false,
  //     },
  //   },
  // ],
  // this rule is a huge diva, wasted a bunch of time, and didn't prevent anything
  // 'import/no-extraneous-dependencies': ['error', { devDependencies: [
  //   '**/*.spec.{ts,tsx}',
  //   'jest.setup.ts',
  //   'middleware.ts',
  //   'tailwind.config.js',
  //   'playwright.config.ts',
  //   // '**/e2eTestHelpers.ts', @playwright/test is being a huge diva about this and
  //   // we seem to have previously chosen to just put it in regular 'dependencies'
  //   // so we're just going to do that now.
  // ] }],
  '@typescript-eslint/no-empty-interface': ['error', { 'allowSingleExtends': true }],
  // '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
  '@typescript-eslint/no-non-null-assertion': 'off',
  '@typescript-eslint/no-empty-function': 'off',
  '@typescript-eslint/no-explicit-any': 'off',
};
const jestRules = {
  'import/first': 'off', // so we can mock modules
  'jest-async/expect-return': 'error',
  // 'jest-dom/prefer-in-document': 'off',
};
const playwrightRules = {};

module.exports = {
  ignorePatterns: ['lib/**/*.types.ts', 'node_modules/**/*'],
  env: baseEnv,
  extends: baseExtends,
  rules: baseRules,
  reportUnusedDisableDirectives: true, // report unused eslint-disable
  settings: {
    react: {
      version: 'detect',
    },
    jest: {
      version: 29,
    },
    // eslint-import-resolver-alias
    'import/resolver': {
      alias: {
        extensions: ['.ts', '.tsx'],
        map: [
          ['@', '.'],
        ],
      },
    },
  },
  parserOptions: {
    project: './tsconfig.json',
  },
  // Multiple overrides within the same config are applied in order.
  // The last override block in a config file always has the highest precedence.
  // There's nothing in the documentation about merging overriding rulesets into
  // existing rulesets, so I'm assuming eslint doesn't do it and fully crafting
  // each ruleset for each override.
  overrides: [
    {
      files: ['**/*.{ts,tsx}', '*.d.ts'],
      extends: [...baseExtends, ...tsExtends],
      rules: (() => {
        const rules = {};
        for (const rule in baseRules) {
          // with .apply this would be .apply(baseRules, [rule])
          // remember, kids! A for 'array' and C for 'comma'
          if (Object.prototype.hasOwnProperty.call(baseRules, rule)) {
            rules[rule] = baseRules[rule];
          }
        }
        for (const rule in tsRules) {
          if (Object.prototype.hasOwnProperty.call(tsRules, rule)) {
            rules[rule] = tsRules[rule];
          }
        }
        return rules;
      })(),
    },
    {
      files: ['**/*.spec.ts'],
      env: playwrightEnv,
      plugins: playwrightPlugins,
      extends: [...baseExtends, ...tsExtends, ...playwrightExtends],
      rules: (() => {
        const rules = {};
        for (const rule in baseRules) {
          if (Object.prototype.hasOwnProperty.call(baseRules, rule)) {
            rules[rule] = baseRules[rule];
          }
        }
        for (const rule in tsRules) {
          if (Object.prototype.hasOwnProperty.call(tsRules, rule)) {
            rules[rule] = tsRules[rule];
          }
        }
        for (const rule in playwrightRules) {
          if (Object.prototype.hasOwnProperty.call(playwrightRules, rule)) {
            rules[rule] = playwrightRules[rule];
          }
        }
        return rules;
      })(),
    },
    {
      files: ['**/*.test.{ts,tsx}'],
      env: jestEnv,
      plugins: jestPlugins,
      extends: [...baseExtends, ...tsExtends, ...jestExtends],
      rules: (() => {
        const rules = {};
        for (const rule in baseRules) {
          if (Object.prototype.hasOwnProperty.call(baseRules, rule)) {
            rules[rule] = baseRules[rule];
          }
        }
        for (const rule in tsRules) {
          if (Object.prototype.hasOwnProperty.call(tsRules, rule)) {
            rules[rule] = tsRules[rule];
          }
        }
        for (const rule in jestRules) {
          if (Object.prototype.hasOwnProperty.call(jestRules, rule)) {
            rules[rule] = jestRules[rule];
          }
        }
        return rules;
      })(),
    },
  ],
};
