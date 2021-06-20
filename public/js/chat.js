document.querySelector("#start_chat").addEventListener("click", (event) => {
    /* console.log("Clicou no botão"); */
    const socket = io();

    const chat_help = document.getElementById("chat_help");
    chat_help.style.display = "none";

    const chat_in_support = document.getElementById("chat_in_support");
    chat_in_support.style.display = "block";

    const button_in_support = document.getElementById("btn_support");
    button_in_support.style.display = "none";

    const email = document.getElementById("email").value;
    const text = document.getElementById("txt_help").value;

    socket.on("connect", () => {
        const params = {
            email,
            text,
        };
        socket.emit("client_first_accses", params, (call, err) => {
            if(err){
                console.log(err);
            }else{
                console.log(call);
            }
        });
    });
    
    socket.on("client_all_messages", (messages) => {
        /* console.log("messages", messages); */

        let template_client = document.getElementById("message-user-template").innerHTML;
        let template_admin = document.getElementById("admin-template").innerHTML;

        messages.forEach(message =>{
            if(message.admin_id === null){
                const rendered = Mustache.render(template_client, {
                    message: message.text,
                    email
                });

                document.getElementById("messages").innerHTML += rendered
            }else{
                const rendered = Mustache.render(template_admin, {
                    message_admin: message.text
                });
            }
        })
    });
});
