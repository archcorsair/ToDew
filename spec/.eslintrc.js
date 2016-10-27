module.exports = {
  rules: {
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: true,
      optionalDependencies: false,
      // 'prefer-allow-callback': false,
      // 'func-names': false,
      // 'no-plusplus': false,
      // 'space-before-function-paren': false,
      // 'global-require': false,
    }],
  },
  env: {
    jasmine: true,
  }
};
