"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const ProfileSection = () => {
  // Dummy user data for now
  const user = {
    name: "Star User",
    email: "staruser@example.com",
    avatar: "https://ui-avatars.com/api/?name=Star+User&background=64ffda&color=fff&size=128"
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        background: "rgba(10, 10, 15, 0.8)",
        borderRadius: "2rem",
        padding: "0.5rem 1.25rem",
        boxShadow: "0 2px 12px 0 rgba(100,255,218,0.12)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {mounted && (
        <Image
          src={user.avatar}
          alt={user.name}
          width={40}
          height={40}
          style={{ borderRadius: "50%", boxShadow: "0 0 8px #64ffda" }}
        />
      )}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <span style={{ color: "#64ffda", fontWeight: 500, fontSize: "1.1rem" }}>{user.name}</span>
        <span style={{ color: "#fff", fontSize: "0.95rem", opacity: 0.7 }}>{user.email}</span>
      </div>
    </div>
  );
};

export default ProfileSection;
