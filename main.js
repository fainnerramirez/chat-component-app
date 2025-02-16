(
    function(){
        const dataChat = [
            {
                id: 1, 
                username: "Fainner Ramirez",
                date: new Date().toLocaleDateString(),
                likes: 0
            },
            {
                id: 2, 
                username: "Isa Zapata",
                date: new Date().toLocaleDateString(),
                likes: 0
            },
            {
                id: 3, 
                username: "Maria Isabel",
                date: new Date().toLocaleDateString(),
                likes: 0
            },
            {
                id: 4, 
                username: "Pedro Fernandez",
                date: new Date().toLocaleDateString(),
                likes: 0
            }
        ];

        const load = () => {
            setTimeout(() => {
                createChatComponent();
                createEvents();
            }, 1000);
        }

        const getTimeNotification = (dateString) => {
            const now = new Date();
            const date = new Date(dateString.split('/').reverse().join('-')); // Convertir el formato dd/mm/yyyy a yyyy-mm-dd
            
            const diffInSeconds = Math.floor((now - date) / 1000); // Diferencia en segundos
            
            const secondsInMinute = 60;
            const secondsInHour = 60 * 60;
            const secondsInDay = 24 * 60 * 60;
            const secondsInMonth = 30 * 24 * 60 * 60;
            const secondsInYear = 365 * 24 * 60 * 60;
            
            if (diffInSeconds < secondsInMinute) {
              return diffInSeconds <= 1 ? "Hace un segundo" : `Hace ${diffInSeconds} segundos`;
            } else if (diffInSeconds < secondsInHour) {
              const minutes = Math.floor(diffInSeconds / secondsInMinute);
              return minutes <= 1 ? "Hace un minuto" : `Hace ${minutes} minutos`;
            } else if (diffInSeconds < secondsInDay) {
              const hours = Math.floor(diffInSeconds / secondsInHour);
              return hours <= 1 ? "Hace una hora" : `Hace ${hours} horas`;
            } else if (diffInSeconds < secondsInMonth) {
              const days = Math.floor(diffInSeconds / secondsInDay);
              return days <= 1 ? "Hace un día" : `Hace ${days} días`;
            } else if (diffInSeconds < secondsInYear) {
              const months = Math.floor(diffInSeconds / secondsInMonth);
              return months <= 1 ? "Hace un mes" : `Hace ${months} meses`;
            } else {
              const years = Math.floor(diffInSeconds / secondsInYear);
              return years <= 1 ? "Hace un año" : `Hace ${years} años`;
            }
        }

        const createHeaderChatComponent = () => {
            const chatHeader = document.createElement("div");
            chatHeader.classList.add("chat__header");

            const chatAvatar = document.createElement("div");
            chatAvatar.classList.add("chat__avatar");

            const chatDate = document.createElement("div");
            chatDate.classList.add("chat__date");

            const chatReplay = document.createElement("button");
            chatReplay.classList.add("chat__replay");

            const chatInfo = document.createElement("div");
            chatInfo.classList.add("chat_info");

            chatInfo.appendChild(chatAvatar);
            chatInfo.appendChild(chatDate);
            
            chatHeader.appendChild(chatInfo);
            chatHeader.appendChild(chatReplay);

            return chatHeader;
        }

        const createLikesChatComponent = (data) => {
            const {likes, id} = data;
            const chatLikes = document.createElement("div");
            chatLikes.classList.add("chat__likes");

            const chatButtonLike = document.createElement("button");
            chatButtonLike.classList.add("chat__like", "like-"+id);
            chatButtonLike.textContent = "+";

            const chatButtonDislike = document.createElement("button");
            chatButtonDislike.classList.add("chat__dislike", "dislike-"+id);
            chatButtonDislike.textContent = "-";

            const chatCountLike = document.createElement("h3");
            chatCountLike.classList.add("chat__count");
            chatCountLike.textContent = likes.toString();

            chatLikes.appendChild(chatButtonLike);
            chatLikes.appendChild(chatCountLike);
            chatLikes.appendChild(chatButtonDislike);

            return chatLikes;
        }

        const createBodyChatComponent = () => {
            const chatBody = document.createElement("div");
            chatBody.classList.add("chat__body");
            return chatBody;
        }

        const createChat = (data) => {

            const { likes, username, date, id } = data;
            
            const chatMain = document.createElement("div");
            chatMain.classList.add("chat__main");
            
            const chatContainerInfo = document.createElement("div");
            chatContainerInfo.classList.add("chat__containerInfo");
            
            const likesComponent = createLikesChatComponent(data);
            const headerComponent = createHeaderChatComponent();
            const bodyComponent = createBodyChatComponent();
            
            chatContainerInfo.appendChild(headerComponent);
            chatContainerInfo.appendChild(bodyComponent);
            
            chatMain.appendChild(likesComponent);
            chatMain.appendChild(chatContainerInfo);
            
            return chatMain;
        }

        const createChatComponent = () => {
            localStorage.setItem("datachat", JSON.stringify(dataChat));
            const chatContainer = document.createElement("div");
            chatContainer.classList.add("chat__container");

            for(let chat of dataChat) {
                const chatElement = createChat(chat);
                chatContainer.appendChild(chatElement);
            }

            document.body.appendChild(chatContainer);
        }   

        const createEvents = () => {
            const chatdata = JSON.parse(localStorage.getItem("datachat"));
            console.log("chatdata: ", chatdata);
            
            for(let chat in chatdata) {
                
                const selectorlike = ".like-" + chatdata[chat].id;
                const selectordislike = ".dislike-" + chatdata[chat].id;
                const countlikes = document.querySelector(".chat__count");
                const buttonLike = document.querySelector(selectorlike);
                const buttonDislike = document.querySelector(selectordislike);
    
                buttonLike.addEventListener("click", () => {
                    console.log("Like");
                    const numLikes = parseInt(countlikes.textContent);
                    let operation = numLikes + 1;
                    countlikes.textContent = operation;
                });
    
                buttonDislike.addEventListener("click", () => {
                    console.log("Dilike");
                    const numLikes = parseInt(countlikes.textContent);
                    let operation = numLikes - 1;

                    if(numLikes !== 0){
                        const count = document.querySelector(".chat__count");
                        count.textContent = operation;
                    }
                });
            }
        }
        load();
    }
)()