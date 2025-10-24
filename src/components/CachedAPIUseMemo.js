import React, { useEffect, useMemo, useState } from "react";

function CachedAPIUseMemo() {
    const [userId, setUserId] = useState(1);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const cache = useMemo(() => new Map(), []);
    console.log(cache, "Cache")

    const fetchData = async () => {
        if (cache.has(userId)) {
            setData(cache.get(userId));
            return;
        }


        setLoading(true);
        const res = await fetch(
            `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
        );
        const result = await res.json();
        cache.set(userId, result);
        setData(result);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [userId, cache]);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-2">Posts for User {userId}</h2>

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

            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {data.map((item) => (
                        <div key={item.id}>
                            <h4 className="font-bold">{item.title}</h4>
                            <p>{item.body}</p>
                        </div>
                    ))}
                </ul>
            )}
        </div>


    );
}

export default CachedAPIUseMemo;
