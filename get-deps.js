const glob = require('glob');



const deps = glob.sync('./node_modules/*').map(dep => dep.replace('./node_modules/', ''));

console.log(deps)