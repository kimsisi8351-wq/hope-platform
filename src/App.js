import React, { useState, useEffect } from "react";

export default function App() {
  const [profiles, setProfiles] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    name: "",
    age: "",
    height: "",
    specialty: "",
    image: ""
  });

  useEffect(() => {
    const saved = localStorage.getItem("hope_profiles");
    if (saved) setProfiles(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("hope_profiles", JSON.stringify(profiles));
  }, [profiles]);

  const handleSubmit = () => {
    if (!form.name) return;

    setProfiles([
      ...profiles,
      { ...form, likes: 0, views: 0, id: Date.now() }
    ]);
  };

  const handleLike = (id) => {
    setProfiles(
      profiles.map((p) =>
        p.id === id ? { ...p, likes: (p.likes || 0) + 1 } : p
      )
    );
  };

  const filtered = profiles.filter((p) =>
    (p.name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>

      {/* 헤더 */}
      <div style={{ marginBottom: "30px" }}>
        <h1 style={{
          fontSize: "42px",
          background: "linear-gradient(to right, #ff7eb3, #7a5cff)",
          WebkitBackgroundClip: "text",
          color: "transparent"
        }}>
          HO✦PE
        </h1>
        <p style={{ color: "#666" }}>아이돌 지망생 플랫폼</p>
      </div>

      {/* 검색 */}
      <input
        placeholder="이름 검색..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "25px",
          borderRadius: "8px",
          border: "1px solid #ddd"
        }}
      />

      {/* 등록 카드 */}
      <div style={{
        border: "1px solid #eee",
        borderRadius: "12px",
        padding: "20px",
        marginBottom: "40px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
      }}>
        <h3>프로필 등록</h3>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input placeholder="이름" onChange={(e)=>setForm({...form,name:e.target.value})}/>
          <input placeholder="나이" onChange={(e)=>setForm({...form,age:e.target.value})}/>
          <input placeholder="키" onChange={(e)=>setForm({...form,height:e.target.value})}/>
          <input placeholder="특기" onChange={(e)=>setForm({...form,specialty:e.target.value})}/>
          <input placeholder="이미지 URL" onChange={(e)=>setForm({...form,image:e.target.value})}/>
        </div>

        <button
          onClick={handleSubmit}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            border: "none",
            background: "#7a5cff",
            color: "white",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          등록
        </button>
      </div>

      {/* 카드 리스트 */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px"
      }}>
        {filtered.map((p) => (
          <div key={p.id} style={{
            border: "1px solid #eee",
            borderRadius: "15px",
            padding: "15px",
            boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
            transition: "0.2s"
          }}>

            <img
              src={p.image || "https://via.placeholder.com/250"}
              alt="profile"
              style={{
                width: "100%",
                borderRadius: "10px",
                marginBottom: "10px"
              }}
            />

            <h3>{p.name || "이름 없음"}</h3>

            <p style={{ color: "#666" }}>
              {p.age || "-"} / {p.height || "-"}
            </p>

            <p>{p.specialty || "-"}</p>

            <p style={{ fontWeight: "bold" }}>
              👍 {p.likes || 0} 👁 {p.views || 0}
            </p>

            <button
              onClick={() => handleLike(p.id)}
              style={{
                padding: "6px 12px",
                border: "none",
                background: "#ff7eb3",
                color: "white",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              좋아요
            </button>

          </div>
        ))}
      </div>

    </div>
  );
}