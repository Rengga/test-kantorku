"use client";

import { useEffect, useState } from "react";
import { Employee } from "@/app/onboarding/page";

interface Props {
  onSubmit: (data: Omit<Employee, "id" | "status">) => void;
  editingEmployee: Employee | null;
}

export default function OnboardingForm({ onSubmit, editingEmployee }: Props) {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    division: "",
    role: "",
    salary: "",
  });

  useEffect(() => {
    if (editingEmployee) {
      setForm({
        nama: editingEmployee.nama,
        email: editingEmployee.email,
        division: editingEmployee.division,
        role: editingEmployee.role,
        salary: editingEmployee.salary.toString(),
      });
    }
  }, [editingEmployee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      nama: form.nama,
      email: form.email,
      division: form.division,
      role: form.role,
      salary: Number(form.salary),
    });

    setForm({
      nama: "",
      email: "",
      division: "",
      role: "",
      salary: "",
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">{editingEmployee ? "Edit Employee" : "Employee Onboarding"}</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input required name="nama" value={form.nama} onChange={handleChange} placeholder="Nama" className="input" />
        <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" className="input" />

        <select required name="division" value={form.division} onChange={handleChange} className="input">
          <option value="">Select Division</option>
          <option>IT</option>
          <option>Finance</option>
          <option>HR</option>
          <option>Marketing</option>
        </select>

        <select required name="role" value={form.role} onChange={handleChange} className="input">
          <option value="">Select Role</option>
          <option>Staff</option>
          <option>Supervisor</option>
          <option>Manager</option>
        </select>

        <input required type="number" name="salary" value={form.salary} onChange={handleChange} placeholder="Basic Salary" className="input col-span-2" />

        <button className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          {editingEmployee ? "Update & Re-submit" : "Submit for Approval"}
        </button>
      </form>
    </div>
  );
}
