const socket = io();

socket.on("admin_list_all_user", (connections) => {
    console.log(connections);
})