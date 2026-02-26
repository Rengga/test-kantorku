import { Employee } from "@/app/onboarding/page";
import Check from "@boxicons/react/Check";
import Edit from "@boxicons/react/Edit";
import X from "@boxicons/react/X";

interface Props {
  employees: Employee[];
  onUpdateStatus: (id: string, status: Employee["status"]) => void;
  onEdit: (employee: Employee) => void;
}

export default function OnboardingTable({ employees, onUpdateStatus, onEdit }: Props) {
  const statusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-700";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "REJECTED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Onboarding List</h2>

      <table className="w-full">
        <thead>
          <tr className="border-b text-left">
            <th className="py-2">Employee ID</th>
            <th>Name</th>
            <th>Division</th>
            <th>Role</th>
            <th>Salary</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((p) => (
            <tr key={p.id} className="border-b hover:bg-gray-50">
              <td className="py-2 font-medium w-32">{p.id}</td>
              <td className="w-24">{p.nama}</td>
              <td className="w-24">{p.division}</td>
              <td className="w-24">{p.role}</td>
              <td className="w-28">Rp {p.salary.toLocaleString()}</td>
              <td className="w-32">
                <span className={`px-2 py-1 rounded text-sm ${statusColor(p.status)}`}>{p.status}</span>
              </td>
              <td className="flex gap-2 py-2 w-full">
                <button onClick={() => onEdit(p)} className="bg-blue-200 hover:underline p-1 rounded-xl">
                  <Edit fill="#005dae" />
                </button>
                {p.status !== "APPROVED" && (
                  <button onClick={() => onUpdateStatus(p.id, "APPROVED")} className="bg-green-200 hover:underline p-1 rounded-xl">
                    <Check fill="#008356" />
                  </button>
                )}
                {p.status !== "REJECTED" && (
                  <button onClick={() => onUpdateStatus(p.id, "REJECTED")} className="bg-red-200 hover:underline p-1 rounded-xl">
                    <X fill="#a30000" />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
