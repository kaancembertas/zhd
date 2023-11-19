module.exports = {
    root: true,
    parserOptions: {
        project: './tsconfig.json',
    },
    env: {
        jest: true,
    },
    extends: ['plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['prettier', '@typescript-eslint'],
    rules: {
        'prettier/prettier': [
            'warn',
            {
                endOfLine: 'auto',
            },
        ],
        'no-restricted-imports': [
            'error',
            {
                patterns: ['.ts', '.tsx', '.d.ts'],
            },
        ],
        semi: ['off'],
        '@typescript-eslint/no-empty-function': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        '@typescript-eslint/ban-ts-comment': 'off',
        'no-extra-boolean-cast': 'off',
        curly: 'off',
    },
};
