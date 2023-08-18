module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
    rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "indent": ["error", 2],
        "quotes": ["error", "single"],
        "semi": ["error", "always"],
    }
};