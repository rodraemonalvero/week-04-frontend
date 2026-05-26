## Week 4 Reflection

1. What is the difference between the SQLAlchemy model and the Pydantic schema?

The SQLAlchemy model represents the database table and controls how data is stored in PostgreSQL. The Pydantic schema represents the data coming into and going out of the API, and it validates the request and response data.

2. What does `Depends(get_db)` do? Why does every endpoint need it?

`Depends(get_db)` gives each API endpoint access to a database session. The endpoint needs it so it can query, create, update, or delete records in PostgreSQL.

3. When you restarted the server and your data was still there — how does that feel compared to storing data in a Python list? What changed architecturally?

It felt more realistic because the data did not disappear after restarting the server. The architecture changed from temporary in-memory storage to persistent database storage using PostgreSQL.

4. What was the most confusing part of connecting the frontend to the backend?

The most confusing part was making sure the backend was running on the correct port and that the frontend used the correct API URL through `NEXT_PUBLIC_API_URL`.

5. When does CORS become a problem and why? In your own words.

CORS becomes a problem when the frontend and backend run on different origins, such as localhost:3000 and localhost:8000. The browser blocks requests unless the backend allows the frontend origin.

6. What is the difference between useEffect with [] and without it?

`useEffect` with `[]` runs only once when the page loads. Without `[]`, it can run after every render, which can accidentally cause repeated API calls.