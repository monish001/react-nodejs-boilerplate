## Design
API calls are coded in below layers.
1. `app.js` -  Entry point for the APIs
1. `routes/<entity>` - Routes for each entity
2. `crud/<entity>` -  1 file per entity for its DB operations
3. `/adaptors/crud.js` - Adaptors directory contains modules following adaptor pattern. `crud.js` is adaptor pattern implemented for dynamo-db.