import React, { useEffect, useMemo, useState } from "react";

function CachedAPIUseMemo() {
  const [userId, setUserId] = useState(1); // example input
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Memoized cache to avoid re-fetching same userId
  const cache = useMemo(() => new Map(), []);

  useEffect(() => {
    const fetchData = async () => {
      // If cached, use it
      if (cache.has(userId)) {
        setData(cache.get(userId));
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
        );
        const result = await res.json();
        cache.set(userId, result); // store in memoized cache
        setData(result);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, cache]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Posts for User {userId}</h2>

      {/* Buttons to change input */}
      <div className="mb-4">
        <button
          onClick={() => setUserId(1)}
          className="mr-2 bg-blue-500 text-white px-3 py-1 rounded"
        >
          User 1
        </button>
        <button
          onClick={() => setUserId(2)}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          User 2
        </button>
      </div>

      {/* Loading indicator */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.map((item) => (
            <div key={item.id}>
              <h4>{item.title}</h4> {/* Cypress expects h4 */}
              <p>{item.body}</p> {/* Cypress expects p with body */}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CachedAPIUseMemo;
