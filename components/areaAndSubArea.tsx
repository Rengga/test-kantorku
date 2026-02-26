"use client";

import { useState } from "react";
import axios from "axios";

export default function AreaAndSubArea() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [areaValue, setAreaValue] = useState("");
  const [subAreaValue, setSubAreaValue] = useState("");

  const TOKEN = "ngawurtoken";
  const COMPANY_ID = "f1da060c-026e-43fd-b65a-8a2cd7ece617";

  const AREA_UNIT_ID = "c9536f10-99bf-4e29-8ddb-92bc09361819";
  const AREA_PARENT_ID = "b3bbbf96-020b-4d65-b78d-87e617f119ce";

  const SUB_AREA_UNIT_ID = "2718ebc3-6f9e-43d0-87bd-ac0273037000";
  const SUB_AREA_PARENT_ID = "6b44758c-0942-4f27-b3b2-c1d21072d418";

  const API_URL = "https://api.sejutacita.id/v2/hris/company-unit-item/list";

  const generateArea = () => {
    const items = [];

    for (let i = 1; i <= 20; i++) {
      items.push({
        companyUnitId: AREA_UNIT_ID,
        customFields: [],
        value: `${areaValue || "Area Mia Ayam22"} ${i}`,
        parentId: AREA_PARENT_ID,
        note: "",
        code: "",
      });
    }

    return items;
  };

  const generateSubArea = () => {
    const items = [];

    for (let i = 1; i <= 20; i++) {
      items.push({
        companyUnitId: SUB_AREA_UNIT_ID,
        customFields: [],
        value: `${subAreaValue || "Sub Area Mie Ayam Maknyus 22"} ${i}`,
        parentId: SUB_AREA_PARENT_ID,
        note: "",
        code: "",
      });
    }

    return items;
  };

  const createData = async (type: "area" | "subarea") => {
    try {
      setLoading(true);
      setMessage("");

      const payload = type === "area" ? generateArea() : generateSubArea();

      await axios.post(API_URL, payload, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
          "x-company-id": COMPANY_ID,
        },
      });

      setMessage(type === "area" ? "20 Area berhasil dibuat" : "20 Sub Area berhasil dibuat");
    } catch (error) {
      if (typeof error === "object" && error !== null) {
        // @ts-expect-error: eror opo iki
        console.error(error.response?.data || error.message);
      } else {
        console.error(error);
      }
      setMessage("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white" style={{ padding: 30 }}>
      <div style={{ marginBottom: 16 }}>
        <label className="block mb-1">Area</label>
        <input
          type="text"
          value={areaValue}
          onChange={(e) => setAreaValue(e.target.value)}
          className="text-white px-2 py-1 rounded border bg-slate-800"
          placeholder="Masukkan value area"
          style={{ marginRight: 10 }}
        />
        <label className="block mb-1">Sub Area</label>
        <input
          type="text"
          value={subAreaValue}
          onChange={(e) => setSubAreaValue(e.target.value)}
          className="text-white px-2 py-1 rounded border bg-slate-800"
          placeholder="Masukkan value sub area"
        />
      </div>
      <button className="bg-blue-600 text-white py-2 px-4 rounded" onClick={() => createData("area")} disabled={loading} style={{ marginRight: 10 }}>
        Generate 20 Area
      </button>

      <button className="bg-emerald-600 text-white py-2 px-4 rounded" onClick={() => createData("subarea")} disabled={loading}>
        Generate 20 Sub Area
      </button>

      {loading && <p>Processing...</p>}
      {message && <p>{message}</p>}
    </div>
  );
}
