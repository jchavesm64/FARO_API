## Basic Data Flow for GraphQL Queries

### 1. First looks for cached data in MongoDB
::: mermaid
graph LR
    Client[Client] -->|Query data| Resolver[GraphQL Resolver]
    Resolver -->|Query cached data| MongoDB[Channex API] 
    MongoDB[(MongoDB)] -->|Return cached data| Resolver --> |Return cached data| Client
:::
When a client initiates a query, the system first checks the MongoDB cache for any fresh data. If the data is found and is up-to-date, it is returned to the client, ensuring quick response times and reduced load on the external API.

### 2. If no fresh data found in cache, fetch fresh data from Channex API
::: mermaid
graph LR
    Client[Client] -->|Query data| Resolver[GraphQL Resolver]
    Resolver -->|Fetch fresh data| ChannexAPI
    ChannexAPI[Channex API] --> |Return fresh data| Resolver --> |Return fresh data| Client
:::
In cases where the cache does not contain fresh data, the resolver fetches the required data from the Channex API. This ensures that the client always receives the most current information available.

## Detailed Sequence Diagram for GraphQL Queries
::: mermaid
sequenceDiagram
    participant C as Client
    participant R as Resolver
    participant M as MongoDB
    participant E as Channex API

    C->>R: Query Entity
    R->>M: Query cached Entity (filter: syncStatus = FRESH, lastSyncedAt >= cutoff)
    alt Fresh data found in cache
        M-->>R: Return cached data
        R->>C: Return transformed data
    else No fresh data available
        R->>E: Fetch fresh Entity
        E-->>R: Return fresh data
        R->>M: BulkWrite update (updateOne with upsert: transform data, set lastSyncedAt & syncStatus = FRESH)
        R->>M: (Optional) Query updated Entity
        M-->>R: Return updated data
        R->>C: Return transformed data
    end
    Note over R,M: Fallback: if Channex API fails, retrieve any cached (stale) data
:::
This sequence diagram provides a detailed view of the query process. It highlights the decision-making process between using cached data and fetching fresh data from the Channex API. The fallback mechanism ensures that even if the API fails, the client can still receive potentially stale but useful data from the cache.

## Basic Data Flow for GraphQL Mutations
::: mermaid
graph LR
    Client[Client] -->|Mutation request| Resolver[GraphQL Resolver]
    Resolver -->|Forward mutation| ChannexAPI --> |Return API response| Resolver --> |Update local cache| MongoDB
    MongoDB[(MongoDB)] 
    Resolver -->|Mutation response| Client
    ChannexAPI[Channex API]
:::
For mutations, the client sends a request to the resolver, which forwards it to the Channex API. Upon receiving the response, the resolver updates the local cache to ensure consistency and then returns the response to the client.

## Detailed Sequence Diagram for GraphQL Mutations
::: mermaid
sequenceDiagram
    participant C as Client
    participant R as Resolver
    participant E as Channex API
    participant M as MongoDB

    C->>R: Mutation Request (e.g., create/update/deactivate Entity)
    R->>E: Forward mutation to Channex API
    E-->>R: Return API response
    R->>M: Update local cache (updateOne with upsert: transform mutation data)
    R->>C: Return combined mutation response
:::
This sequence diagram illustrates the mutation process in detail. It shows how mutation requests are handled, forwarded to the Channex API, and how the local cache is updated to reflect the changes. This ensures that the system remains consistent and up-to-date with the latest data.
