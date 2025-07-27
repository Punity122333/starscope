"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const user = {
  firstName: "Star",
  lastName: "User",
  email: "staruser@example.com",
  city: "Cosmic City",
  avatar: "https://ui-avatars.com/api/?name=Star+User&background=64ffda&color=fff&size=128"
};

const ProfilePageSection = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section
      className="profile-section"
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 8rem)",
        margin: "0",
        paddingTop: "5.5rem",
        paddingBottom: "1.5rem",
        animation: "fadeInUp 0.7s cubic-bezier(.5,1.6,.4,.7)",
        fontFamily: "inherit",
      }}
    >
      <div
        style={{
          background: "rgba(10, 10, 15, 0.99)",
          borderRadius: "2rem",
          boxShadow: "0 4px 48px 0 rgba(100,255,218,0.28)",
          border: "2px solid #64ffda33",
          padding: "3.5rem 3rem 2.5rem 3rem",
          maxWidth: "540px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          fontFamily: "inherit",
        }}
      >
        {mounted && (
          <div style={{
            position: "absolute",
            top: "-60px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#10101b",
            borderRadius: "50%",
            boxShadow: "0 0 32px #64ffda99, 0 0 0 8px #10101b",
            padding: "0.5rem",
            zIndex: 2,
          }}>
            <Image
              src={user.avatar}
              alt={user.firstName + ' ' + user.lastName}
              width={140}
              height={140}
              style={{ borderRadius: "50%", boxShadow: "0 0 32px #64ffda", display: "block" }}
            />
          </div>
        )}
        <div style={{ height: "80px" }} />
        <h2 style={{ color: "#64ffda", fontWeight: 700, fontSize: "2.2rem", marginBottom: "2rem", letterSpacing: "0.12em", textAlign: "center" }}>
          {user.firstName} {user.lastName}
        </h2>
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ color: "#fff", fontSize: "1.22rem", opacity: 0.95, background: "rgba(100,255,218,0.13)", borderRadius: "1rem", padding: "1rem 1.5rem", width: "100%", textAlign: "center", fontWeight: 500, boxShadow: "0 2px 16px 0 #64ffda22" }}>
            <strong>Email:</strong> {user.email}
          </div>
          <div style={{ color: "#fff", fontSize: "1.22rem", opacity: 0.95, background: "rgba(100,255,218,0.13)", borderRadius: "1rem", padding: "1rem 1.5rem", width: "100%", textAlign: "center", fontWeight: 500, boxShadow: "0 2px 16px 0 #64ffda22" }}>
            <strong>City:</strong> {user.city}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfilePageSection;
