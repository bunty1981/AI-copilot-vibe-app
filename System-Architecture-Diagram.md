# High Level System Architecture Diagram

```mermaid
graph TD
    A[User] --> B[Web Browser]
    B --> C[Frontend Application<br/>React.js]
    C --> D[Backend API<br/>Node.js + Express]
    D --> E[Authentication Service<br/>JWT]
    D --> F[Calendar Service]
    D --> G[File Upload Service]
    F --> H[Database<br/>PostgreSQL]
    G --> I[File Storage<br/>AWS S3]
    H --> J[(User Data<br/>Events<br/>Permissions)]
    I --> K[(Excel Files)]
```