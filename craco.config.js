const path = require('path');

const resolvePath = p => path.resolve(__dirname, p)

module.exports = {
    // ...
    webpack: {
        alias: {
            '@store': resolvePath('./src/feature/store.js'),
            '@userSlice': resolvePath('./src/feature/userSlice/userSlice.js'),
            '@fire': resolvePath('./src/feature/firebase/fire.js'),
            '@assets': resolvePath('./src/assets'),
            //'@productslice': resolvePath('./src/features/items/productSlice.js'),
            //'@filteredSlice': resolvePath('./src/features/items/filteredSlice.js')
        }
    },
  // ...
}