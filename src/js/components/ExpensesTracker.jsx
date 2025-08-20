// ===============================
// src/components/ExpensesTracker.jsx
// ===============================
import React, { useState, useEffect, useContext, useMemo, Fragment } from "react";
import Squares from "./Squares";
import ProjectNavigation from "../components/ProjectNavigation";
import { supabase } from "../../supabase/client";
import { AuthContext } from "../../context/AuthContext";
import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';

function ExpensesTracker() {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    date: "",
    category: "",
    description: "",
    amount: "",
    paymentMethod: "Cash",
  });

  const categories = [
    { name: "Home", color: "bg-green-500" },
    { name: "Food", color: "bg-yellow-400" },
    { name: "Bills", color: "bg-purple-500" },
    { name: "Wear", color: "bg-orange-400" },
    { name: "Health", color: "bg-blue-500" },
    { name: "Entertainment", color: "bg-pink-500" },
  ];

  // 🔹 Cargar gastos desde Supabase si hay usuario
  useEffect(() => {
    const fetchExpenses = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      setLoading(true);
      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .eq("user_id", user.id)
        .order("date", { ascending: false });

      if (error) console.error("❌ Error cargando gastos:", error.message);
      else setExpenses(data || []);

      setLoading(false);
    };

    fetchExpenses();
  }, [isAuthenticated, user]);

  // 🔹 Manejo del form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // 🔹 Añadir gasto
  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!form.date || !form.description || !form.amount || !form.category) return;

    const newExpense = {
      date: form.date,
      category: form.category,
      description: form.description,
      amount: parseFloat(form.amount),
      payment_method: form.paymentMethod,
      user_id: user?.id || null,
    };

    if (isAuthenticated) {
      const { data, error } = await supabase
        .from("expenses")
        .insert([newExpense])
        .select()
        .single();

      if (error) return console.error("❌ Error insertando gasto:", error.message);

      setExpenses(prev => [data, ...prev]);
    } else {
      const localExpense = {
        ...newExpense,
        id: Date.now(),
        paymentMethod: newExpense.payment_method,
      };
      setExpenses(prev => [localExpense, ...prev]);
    }

    setForm({ date: "", category: "", description: "", amount: "", paymentMethod: "Cash" });
  };

  // 🔹 Borrar gasto
  const handleDelete = async (idOrIndex) => {
    if (isAuthenticated) {
      const { error } = await supabase
        .from("expenses")
        .delete()
        .eq("id", idOrIndex)
        .eq("user_id", user.id);
      if (error) return console.error("❌ Error eliminando gasto:", error.message);

      setExpenses(prev => prev.filter(exp => exp.id !== idOrIndex));
    } else {
      setExpenses(prev => prev.filter((_, i) => i !== idOrIndex));
    }
  };

  // 🔹 Total mensual
  const monthlyTotal = useMemo(() => {
    const now = new Date();
    return expenses
      .filter(exp => {
        const expDate = new Date(exp.date);
        return expDate.getMonth() === now.getMonth() && expDate.getFullYear() === now.getFullYear();
      })
      .reduce((sum, exp) => sum + Number(exp.amount || 0), 0)
      .toFixed(2);
  }, [expenses]);

  const Spinner = () => (
    <div className="flex items-center justify-center py-12">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-gray-600 border-t-green-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-green-300 rounded-full animate-spin" style={{animationDirection:'reverse', animationDuration:'1.5s'}}></div>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen w-full overflow-y-auto">
      {/* Fondo */}
      <div className="fixed top-0 left-0 w-full h-full">
        <Squares speed={0.2} squareSize={70} direction="diagonal" borderColor="#fff3" hoverFillColor="#471" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center pb-10 w-7/12 mx-auto">
        <h1 className="titulo text-white text-5xl mt-15">EXPENSES TRACKER</h1>

        {/* Formulario */}
        <form onSubmit={handleAddExpense} className="flex flex-col md:flex-row gap-4 mt-15 w-full justify-center">
          {/* Fecha */}
          <div className="flex flex-col">
            <input id="date" type="date" name="date" value={form.date} onChange={handleChange} className="bg-gray-300 p-2 rounded border placeholder-gray-400" required />
          </div>

          {/* Categoria */}
          <div className="flex flex-col">
            <Listbox value={form.category} onChange={val => setForm({...form, category: val})}>
              <div className="relative w-52">
                <Listbox.Button className="relative w-full cursor-pointer bg-gray-300 rounded border border-gray-300 p-2 text-left">
                  <span className="flex items-center gap-2">
                    {form.category && <span className={`w-3 h-3 rounded-full ${categories.find(c=>c.name===form.category)?.color}`}></span>}
                    <span>{form.category || 'Select category'}</span>
                  </span>
                  <span className="absolute inset-y-0 right-2 flex items-center">
                    <ChevronUpDownIcon className="w-5 h-5 text-gray-700" />
                  </span>
                </Listbox.Button>
                <Listbox.Options className="absolute mt-1 w-full bg-gray-300 rounded shadow-lg max-h-60 overflow-auto z-10">
                  {categories.map(cat => (
                    <Listbox.Option key={cat.name} value={cat.name} as={Fragment}>
                      {({ active, selected }) => (
                        <li className={`cursor-pointer select-none px-4 py-2 flex items-center gap-2 ${active?'bg-gray-400':''} ${selected?'font-bold':''}`}>
                          <span className={`w-3 h-3 rounded-full ${cat.color}`}></span>
                          {cat.name}
                        </li>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </div>

          {/* Descripción */}
          <div className="flex flex-col">
            <input id="description" type="text" name="description" placeholder="Enter description" value={form.description} onChange={handleChange} className="bg-gray-300 p-2 rounded border border-gray-300 w-70" required />
          </div>

          {/* Cantidad */}
          <div className="flex flex-col">
            <input id="amount" type="number" name="amount" placeholder="€" value={form.amount} onChange={handleChange} className="bg-gray-300 p-2 rounded border border-gray-300 w-25" required step="0.01" min="0" />
          </div>

          {/* Método de pago */}
          <div className="flex flex-col">
            <div className="flex gap-6">
              <label className="flex items-center text-white text-sm cursor-pointer mt-2">
                <input type="radio" name="paymentMethod" value="Cash" checked={form.paymentMethod === "Cash"} onChange={handleChange} className="w-6 h-6 accent-green-500 mr-2" />
                Cash
              </label>
              <label className="flex items-center text-white text-sm cursor-pointer mt-2">
                <input type="radio" name="paymentMethod" value="Card" checked={form.paymentMethod === "Card"} onChange={handleChange} className="w-6 h-6 accent-green-500 mr-2" />
                Card
              </label>
            </div>
          </div>

          {/* Botón */}
          <div className="flex items-end">
            <button type="submit" className="items-center bg-radial-[at_50%_75%] from-green-300 via-green-600 to-green-900 to-90% text-2xl py-2 px-4 rounded-xl cursor-pointer hover:bg-radial-[at_50%_75%] hover:from-green-400 hover:via-green-700 hover:to-green-900 hover:to-70% hover:bg-gradient-to-br text-green-800 font-bold hover:text-green-100 transition duration-300">
              +
            </button>
          </div>
        </form>

        {/* Lista de gastos */}
        <div className="mt-8 w-full md:w-11/12 flex flex-col gap-3">
          {loading ? (
            <div className="flex justify-center items-center h-32"><Spinner /></div>
          ) : expenses.length === 0 ? (
            <p className="text-gray-400 text-center">No expenses added</p>
          ) : (
            expenses.map((exp, index) => {
              const catColor = categories.find(c => c.name === (exp.category || exp.category))?.color || 'bg-gray-500';
              return (
                <div key={exp.id || index} className="flex justify-between bg-linear-to-br from-neutral-800 to-neutral-600/40 p-3 rounded text-white relative">
                  {/* Banda de color */}
                  <div className={`w-1 mr-3 rounded-l ${catColor}`}></div>

                  <div className="flex-1">
                    <p className="font-bold">{exp.description}</p>
                    <p className="text-sm text-gray-400">{new Date(exp.date).toLocaleDateString()}</p>
                    <p className="text-sm">{exp.payment_method || exp.paymentMethod}</p>
                    <p className="text-sm mt-1 font-semibold">{exp.category}</p>
                  </div>
                  <div className="flex items-center gap-4 mr-5">
                    <span className="font-bold">€{Number(exp.amount).toFixed(2)}</span>
                    <button className="text-red-500 top-2 right-2 absolute hover:text-red-700" onClick={() => handleDelete(isAuthenticated ? exp.id : index)}>
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Total mensual */}
        {!loading && (
          <div className="mt-6 text-white me-17 w-full text-right">
            Monthly Total: <p className="text-green-500 font-bold text-xl">€{monthlyTotal}</p>
            <p className="text-xs text-gray-400">
              ({expenses.filter(exp => {
                const expDate = new Date(exp.date);
                const now = new Date();
                return expDate.getMonth() === now.getMonth() && expDate.getFullYear() === now.getFullYear();
              }).length} expenses this month)
            </p>
          </div>
        )}
      </div>

      <ProjectNavigation />
    </div>
  );
}

export default ExpensesTracker;
