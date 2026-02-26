"use client";

import { useState } from "react";
import OnboardingForm from "@/components/OnboardingForm";
import OnboardingTable from "@/components/OnboardingTable";

export interface Employee {
  id: string;
  nama: string;
  email: string;
  division: string;
  role: string;
  salary: number;
  status: "DRAFT" | "PENDING" | "APPROVED" | "REJECTED";
}

const divisionPrefix: Record<string, string> = {
  IT: "IT",
  Finance: "FIN",
  HR: "HR",
  Marketing: "MKT",
};

export default function OnboardingPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);

  const [divisionCounters, setDivisionCounters] = useState<Record<string, number>>({
    IT: 0,
    Finance: 0,
    HR: 0,
    Marketing: 0,
  });

  const generateEmployeeId = (division: string) => {
    const newCount = divisionCounters[division] + 1;

    setDivisionCounters({
      ...divisionCounters,
      [division]: newCount,
    });

    return `${divisionPrefix[division]}-${String(newCount).padStart(4, "0")}`;
  };

  const addOrUpdateEmployee = (data: Omit<Employee, "id" | "status">) => {
    if (editEmployee) {
      setEmployees(employees.map((p) => (p.id === editEmployee.id ? { ...p, ...data, status: "PENDING" } : p)));
      setEditEmployee(null);
    } else {
      const id = generateEmployeeId(data.division);

      const newEmployee: Employee = {
        ...data,
        id,
        status: "PENDING",
      };

      setEmployees([...employees, newEmployee]);
    }
  };

  const updateStatus = (id: string, status: Employee["status"]) => {
    setEmployees(employees.map((p) => (p.id === id ? { ...p, status } : p)));
  };

  return (
    <div className="space-y-8">
      <OnboardingForm onSubmit={addOrUpdateEmployee} editEmployee={editEmployee} />
      <OnboardingTable employees={employees} onUpdateStatus={updateStatus} onEdit={setEditEmployee} />
    </div>
  );
}
