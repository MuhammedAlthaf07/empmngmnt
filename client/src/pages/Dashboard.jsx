import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const blankEmployee = { name: "", email: "", phone: "", department: "Engineering", position: "", salary: "", status: "Active" };
const departments = ["Engineering", "Human Resources", "Finance", "Marketing", "Sales", "Operations"];
const statuses = ["Active", "On Leave", "Inactive"];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState(blankEmployee);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const { data } = await api.get("/employees");
      setEmployees(data);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load employees");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function update(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function validateEmployee() {
    if (form.name.trim().length < 2) return "Name must be at least 2 characters";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Enter a valid employee email";
    if (!/^[0-9+\-()\s]{7,20}$/.test(form.phone)) return "Enter a valid phone number";
    if (form.position.trim().length < 2) return "Position must be at least 2 characters";
    if (Number(form.salary) < 0 || form.salary === "") return "Salary must be zero or greater";
    return "";
  }

  async function submit(event) {
      event.preventDefault();
      const validationError = validateEmployee();
      if (validationError) return setError(validationError);
      setError("");
      try {
        if (editingId) await api.put(`/employees/${editingId}`, form);
        else await api.post("/employees", form);
        setForm(blankEmployee);
        setEditingId(null);
        await load();
      } catch (err) {
        setError(err.response?.data?.errors?.[0] || err.response?.data?.message || "Could not save employee");
      }
    }

    function edit(employee) {
      setEditingId(employee._id);
      setForm({
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        department: employee.department,
        position: employee.position,
        salary: employee.salary,
        status: employee.status
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    async function remove(id) {
      if (!window.confirm("Delete this employee record?")) return;
      try {
        await api.delete(`/employees/${id}`);
        await load();
      } catch (err) {
        setError(err.response?.data?.message || "Could not delete employee");
      }
    }

    function cancelEdit() {
      setEditingId(null);
      setForm(blankEmployee);
    }

    return (
      <main className="dashboard">
        <header className="topbar">
          <div className="top-brand"><div className="brand-mark small">EM</div><span>Employee Management</span></div>
          <div className="account"><span>{user.name}</span><button className="ghost" onClick={logout}>Sign out</button></div>
        </header>

        <div className="content">
          <div className="heading-row">
            <div><p className="eyebrow">DASHBOARD</p><h1>Team overview</h1></div>
            <div className="metric"><strong>{employees.length}</strong><span>Total employees</span></div>
          </div>

          <section className="panel">
            <h2>{editingId ? "Edit employee" : "Add employee"}</h2>
            <form className="employee-form" onSubmit={submit}>
              <label>Full name<input name="name" value={form.name} onChange={update} placeholder="Employee name" required /></label>
              <label>Email address<input name="email" type="email" value={form.email} onChange={update} placeholder="name@company.com" required /></label>
              <label>Phone<input name="phone" value={form.phone} onChange={update} placeholder="+1 555 000 1234" required /></label>
              <label>Department
                <select name="department" value={form.department} onChange={update}>
                  {departments.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
              <label>Position<input name="position" value={form.position} onChange={update} placeholder="Software Engineer" required /></label>
              <label>Salary<input name="salary" type="number" min="0" value={form.salary} onChange={update} placeholder="75000" required /></label>
              <label>Status
                <select name="status" value={form.status} onChange={update}>
                  {statuses.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
              <div className="form-actions">
                {editingId && <button type="button" className="ghost" onClick={cancelEdit}>Cancel</button>}
                <button className="primary" type="submit">{editingId ? "Save changes" : "Add employee"}</button>
              </div>
            </form>
            {error && <p className="error">{error}</p>}
          </section>

          <section className="panel records">
            <h2>Employee records</h2>
            {loading ? <p className="empty">Loading records...</p> : employees.length === 0 ? (
              <p className="empty">No employee records yet.</p>
            ) : (
              <div className="table-wrap">
                <table>
                  <thead><tr><th>Employee</th><th>Department</th><th>Position</th><th>Salary</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    {employees.map((employee) => (
                      <tr key={employee._id}>
                        <td><strong>{employee.name}</strong><span>{employee.email}</span></td>
                        <td>{employee.department}</td>
                        <td>{employee.position}</td>
                        <td>${Number(employee.salary).toLocaleString()}</td>
                        <td><span className={`status ${employee.status.toLowerCase().replace(" ", "-")}`}>{employee.status}</span></td>
                        <td>
                          <button className="text-button" onClick={() => edit(employee)}>Edit</button>
                          <button className="text-button danger" onClick={() => remove(employee._id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </main>
    );
  }
