import React, { useState, useContext, useEffect } from "react";
import "../../styles/counter.css";
import Squares from "./Squares";
import ProjectNavigation from "../components/ProjectNavigation";
import { supabase } from "../../supabase/client";
import { AuthContext } from "../../context/AuthContext";
import {Trash2 , Pencil  } from "lucide-react";


function ContactList() {
    const { user } = useContext(AuthContext);
    const [contacts, setContacts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingContact, setEditingContact] = useState(null);
    const [loading, setLoading] = useState(true); // Estado de carga
    const [newContact, setNewContact] = useState({
        name: "",
        surname: "",
        phone: "",
        email: "",
    });

    // Cargar contactos
    useEffect(() => {
        const fetchContacts = async () => {
            if (!user) {
                setLoading(false);
                return;
            }
            
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from("contacts")
                    .select("*")
                    .eq("user_id", user.id);

                if (error) {
                    console.error("❌ Error al cargar contactos:", error.message);
                } else {
                    setContacts(data || []);
                }
            } catch (error) {
                console.error("❌ Error al cargar contactos:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchContacts();
    }, [user]);

    // Abrir modal para nuevo contacto
    const openModal = (contact = null) => {
        if (contact) {
            setEditingContact(contact);
            setNewContact({
                name: contact.first_name,
                surname: contact.last_name,
                phone: contact.phone,
                email: contact.email,
            });
        } else {
            setEditingContact(null);
            setNewContact({ name: "", surname: "", phone: "", email: "" });
        }
        setShowModal(true);
    };

    // Guardar o actualizar contacto
const handleSave = async (e) => {
  e.preventDefault();

  if (!newContact.name || !newContact.phone) {
    alert("Nombre y teléfono son obligatorios");
    return;
  }

  if (user) {
    // Si hay usuario, trabajar con Supabase
    if (editingContact) {
      // Actualizar en Supabase
      const { data, error } = await supabase
        .from("contacts")
        .update({
          first_name: newContact.name,
          last_name: newContact.surname,
          phone: newContact.phone,
          email: newContact.email,
        })
        .eq("id", editingContact.id)
        .select()
        .single();

      if (error) {
        console.error("❌ Error al actualizar contacto:", error.message);
        return;
      }

      setContacts((prev) =>
        prev.map((c) => (c.id === data.id ? data : c))
      );
    } else {
      // Crear en Supabase
      const { data, error } = await supabase
        .from("contacts")
        .insert([
          {
            user_id: user.id,
            first_name: newContact.name,
            last_name: newContact.surname,
            phone: newContact.phone,
            email: newContact.email,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error("❌ Error al guardar contacto:", error.message);
        return;
      }

      setContacts((prev) => [...prev, data]);
    }
  } else {
    // ⚡ Si no hay usuario, solo en memoria (no se guarda en ningún sitio)
    if (editingContact) {
      setContacts((prev) =>
        prev.map((c) =>
          c.id === editingContact.id
            ? { ...c, ...newContact }
            : c
        )
      );
    } else {
      const fakeContact = {
        id: Date.now(), // ID temporal único
        first_name: newContact.name,
        last_name: newContact.surname,
        phone: newContact.phone,
        email: newContact.email,
      };
      setContacts((prev) => [...prev, fakeContact]);
    }
  }

  setShowModal(false);
};


    // Borrar contacto
    const handleDelete = async (contactId) => {
        if (!user) return;

        const confirmed = window.confirm("¿Deseas eliminar este contacto?");
        if (!confirmed) return;

        const { error } = await supabase
            .from("contacts")
            .delete()
            .eq("id", contactId);

        if (error) {
            console.error("❌ Error al eliminar contacto:", error.message);
            return;
        }

        setContacts((prev) => prev.filter((c) => c.id !== contactId));
    };

    // Componente Spinner
    const Spinner = () => (
        <div className="flex items-center justify-center py-12">
            <div className="relative">
                <div className="w-12 h-12 border-4 border-gray-600 border-t-green-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-green-300 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
            </div>
        </div>
    );

    return (
      <>
        {/* Fondo */}
        <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
          <Squares
            speed={0.2}
            squareSize={70}
            direction="diagonal"
            borderColor="#fff3"
            hoverFillColor="#911"
          />
        </div>

        {/* Contenido */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full mt-10">
          <h1 className="titulo text-white text-5xl mb-8 pointer-events-auto">
            CONTACT LIST
          </h1>

          {/* Lista de contactos */}
          <div className="w-full md:w-2/4 bg-linear-to-br from-neutral-700 to-neutral-600/40 px-2 rounded-lg shadow-md ">
            {loading ? (
              <Spinner />
            ) : contacts.length === 0 ? (
              <p className="text-gray-400 py-4 text-center">No hay contactos</p>
            ) : (
              <ul className="divide-y-2 divide-gray-500 ">
                {contacts.map((c) => (
                  <li
                    key={c.id}
                    className="py-4 flex items-center text-white justify-between"
                  >
                    <div className="flex items-center">
                      <img
                        src={`https://ui-avatars.com/api/?name=${c.first_name}+${c.last_name}&background=111827&color=fff&rounded=true&size=48`}
                        alt="avatar"
                        className="w-12 h-12 mb-0 mr-3 rounded-full"
                      />
                      <div>
                        <span className="font-bold">
                          {c.first_name} {c.last_name}
                        </span>
                        <br />
                        <p className="text-green-400 titulo text-xl">
                          {c.email}
                        </p>
                        <p className="text-sm">{c.phone}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => openModal(c)}
                        className=" hover:text-yellow-600 text-white  px-3 py-1"
                      >
                        <Pencil />
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="hover:text-red-700 text-white px-3 py-1 rounded"
                      >
                        <Trash2 />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Botón añadir */}
          <button
            onClick={() => openModal()}
            className="bg-radial-[at_50%_75%] from-green-300 via-green-600 to-green-900 to-90% text-2xl py-4 px-6 rounded-full cursor-pointer hover:bg-radial-[at_50%_75%] hover:from-green-400 hover:via-green-700 hover:to-green-900 hover:to-90% hover:text-2xl hover:bg-gradient-to-br text-green-800 font-bold hover:text-green-100 transition duration-300 m-10"
          >
            +
          </button>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">
                {editingContact ? "Editar contacto" : "Nuevo contacto"}
              </h2>
              <form onSubmit={handleSave} className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Nombre"
                  className="border p-2 rounded"
                  value={newContact.name}
                  onChange={(e) =>
                    setNewContact({ ...newContact, name: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Apellido"
                  className="border p-2 rounded"
                  value={newContact.surname}
                  onChange={(e) =>
                    setNewContact({ ...newContact, surname: e.target.value })
                  }
                />
                <input
                  type="tel"
                  placeholder="Teléfono"
                  className="border p-2 rounded"
                  value={newContact.phone}
                  onChange={(e) =>
                    setNewContact({ ...newContact, phone: e.target.value })
                  }
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="border p-2 rounded"
                  value={newContact.email}
                  onChange={(e) =>
                    setNewContact({ ...newContact, email: e.target.value })
                  }
                />
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="bg-gray-400 hover:bg-gray-600 text-white px-4 py-2 rounded"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <ProjectNavigation />
      </>
    );
}

export default ContactList;