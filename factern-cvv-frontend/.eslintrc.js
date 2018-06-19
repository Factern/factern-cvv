module.exports = {
  "env": {
    "browser": true,
    "node": true,
    "jasmine": true
  },
  "parser": "babel-eslint",
  "extends": "airbnb",
  "rules": {
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
    "max-len": ["error", {"code": 120}],
    "jsx-a11y/label-has-for": [2, {"required": {"every": ["id"]}}],
    "react/forbid-prop-types": 0,
    "jsx-a11y/anchor-is-valid": ["error", {
      components: ['Link'],
      specialLink: ['to'],
      aspects: ['noHref', 'invalidHref', 'preferButton'],
    }]
  }
};
