const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            user: null,
            token: null
        },
        actions: {
            addUser: async (formData) => {
                try {
                    const response = await fetch("https://expert-palm-tree-pjgwrxvxvvrgf6jpx-3001.app.github.dev/api/register", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(formData)
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.message);
                    }
                    const data = await response.json();
                    // ...existing code...
                } catch (error) {
                    console.error("Error:", error);
                }


            },
            loginUser: async (email, password, supabase) => {
                try {
                    const { data, error } = await supabase.auth.signInWithPassword({
                        email: email.trim(),
                        password,
                    });


                    if (error) {
                        console.error("Error al iniciar sesión:", error);
                        throw error;
                    }
                    setStore({ user: data.user, token: data.token });
                }
                catch (error) {
                    console.error("Error en loginUser:", error);
                }
            },
        }
    };
};

export default getState;