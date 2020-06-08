import "https://dev.jspm.io/mocha"

mocha.setup('bdd');

import * as target from "./target.test.js"

target.suite(describe, it);

mocha.checkLeaks();
mocha.run();