module.exports = {
    "env": {
        "es6": true,
        "node": true,
        "mocha": true
    },
    "plugins": [
        "mocha"
    ],
    "extends": ["eslint:recommended"],
    "rules": {
        "mocha/no-exclusive-tests": "error",
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};