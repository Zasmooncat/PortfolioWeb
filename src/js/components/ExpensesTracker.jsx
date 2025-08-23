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
    date: new Date().toISOString().split('T')[0], // Fecha actual por defecto
    category: "",
    description: "",
    amount: "",
    paymentMethod: "Pay Method", // Cambiado a "Pay Method" por defecto
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
    console.log("Botón + presionado!", form); // ← Para debug
    if (!form.date || !form.description || !form.amount || !form.category || form.paymentMethod === "Pay Method") {
      console.log("Faltan campos requeridos o método de pago no seleccionado");
      return;
    }

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

    setForm({ date: new Date().toISOString().split('T')[0], category: "", description: "", amount: "", paymentMethod: "Pay Method" });
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
        <div className="w-12 h-12 border-4 border-gray-600 border-t-cyan-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-cyan-300 rounded-full animate-spin" style={{animationDirection:'reverse', animationDuration:'1.5s'}}></div>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen w-full overflow-y-auto">
      {/* Fondo */}
      <div className="fixed top-0 left-0 w-full h-full">
        <Squares 
        speed={0.2} 
        squareSize={70} 
        direction="diagonal" 
        borderColor="#fff3" 
        hoverFillColor="#079" />
      </div>
            
            <div className="fixed inset-0 bg-cyan-950/40 "></div>


      {/* Contenido */}
      
          <h1 className="titulo font-smooch text-white  text-center mb-5 text-5xl mt-5">EXPENSES TRACKER</h1>

      <div className="relative z-10 flex flex-col items-center pb-10 md:w-7/12 mx-auto bg-linear-to-br from-gray-700/60 to-neutral-90000/40 rounded-xl">

        {/* Formulario */}

      {!user && (
            <div className="text-center mb-4">
              <p className="text-cyan-500 text-sm inline-block px-4 py-2 rounded-lg">
                Login to save expenses.
              </p>
            </div>
          )}
       
        <div className="flex flex-col items-center mt-15 w-full">
          {/* Inputs en fila */}
          <div className="flex flex-col lg:flex-row gap-4 w-full justify-center items-center mb-6">
            {/* Fecha */}
            <div className="flex flex-col">
              <input id="date" type="date" name="date" value={form.date} onChange={handleChange} className="bg-gray-300 p-2 w-75 lg:w-33 rounded border placeholder-gray-400" required />
            </div>

            {/* Categoria */}
            <div className="flex flex-col ">
              <Listbox value={form.category} onChange={val => setForm({...form, category: val})}>
                <div className="relative w-75 lg:w-33">
                  <Listbox.Button className="relative w-full cursor-pointer bg-gray-300 rounded border border-gray-300 p-2 text-left">
                    <span className="flex items-center gap-2">
                      {form.category && <span className={`w-3 h-3 rounded-full ${categories.find(c=>c.name===form.category)?.color}`}></span>}
                      <span>{form.category || 'Category'}</span>
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
              <input id="description" type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} className="bg-gray-300 p-2 rounded border border-gray-300 w-75  lg:w-50" required />
            </div>

            {/* Método de pago */}
            <div className="flex flex-col">
              <select
                name="paymentMethod"
                value={form.paymentMethod}
                onChange={handleChange}
                className="bg-gray-300 p-2.5 rounded border border-gray-300 text-black w-75 lg:w-35"
              >
                <option value="Pay Method">Pay Method</option>
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="Transfer">Transfer</option>
                <option value="PayPal">PayPal</option>
              </select>
            </div>

             {/* Cantidad */}
            <div className="flex flex-col">
              <input id="amount" type="number" name="amount" placeholder="€" value={form.amount} onChange={handleChange} className="bg-white p-2 rounded border border-gray-300 w-20" required step="0.01" min="0" />
            </div>
          </div>

          {/* ✅ Botón centrado debajo */}
          <form onSubmit={handleAddExpense}>
            <button type="submit" className="bg-gradient-to-br from-cyan-300 via-cyan-600 to-cyan-900  hover:from-cyan-400 hover:via-cyan-700 hover:to-cyan-900 text-cyan-900 font-bold hover:text-cyan-100 transition duration-300 shadow-lg hover:shadow-xl text-2xl py-2 px-4 rounded-full cursor-pointer">
              +
            </button>
          </form>
        </div>

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
                <div key={exp.id || index} className="flex justify-between bg-linear-to-br from-cyan-950/30 to-gray-600/40 p-3 rounded text-white relative">
                  {/* Banda de color */}
                  <div className={`w-1 mr-3 rounded-l ${catColor}`}></div>

                  <div className="flex-1">
                    <p className="font-bold">{exp.description}</p>
                    <p className="text-sm text-gray-400">{new Date(exp.date).toLocaleDateString()}</p>
                    
                    <p className="text-sm mt-1 font-semibold">{exp.category}</p>
                  </div>
                  <div className="flex flex-col items-end gap-4 mr-5">
                    <p className="text-sm text-gray-400">{exp.payment_method || exp.paymentMethod}</p>
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
          <div className="mt-6 text-white me-17 w-full text-right mb-20">
            Monthly Total: <p className="text-cyan-400 font-bold text-xl">€{monthlyTotal}</p>
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