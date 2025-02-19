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
            }
        }
    };
};

export default getState;