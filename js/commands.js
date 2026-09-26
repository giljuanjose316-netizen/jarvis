const JarvisCommands = {

    greeting() {
        return "Buenos días, señor. ¿En qué puedo ayudarle?";
    },

    status() {
        return "Todos mis sistemas principales están funcionando correctamente, señor.";
    },

    time() {
        const now = new Date();

        return `Son las ${now.toLocaleTimeString("es-CO", {
            hour: "2-digit",
            minute: "2-digit"
        })}, señor.`;
    },

    date() {
        const now = new Date();

        return `Hoy es ${now.toLocaleDateString("es-CO", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        })}, señor.`;
    },

    help() {
        return "Actualmente puedo decirle la hora, la fecha, informar sobre mi estado y responder a saludos.";
    },

    sleep() {
        return "Entrando en modo de espera, señor.";
    },

    unknown() {
        return "No he entendido el comando, señor.";
    },

    interpretCommand(command) {

        const text = command
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();

        // SALUDOS
        if (
            text.includes("hola") ||
            text.includes("buenos dias") ||
            text.includes("buenas tardes") ||
            text.includes("buenas noches") ||
            text.includes("buen dia") ||
            text.includes("kio")
        ) {
            return this.greeting();
        }

        // ESTADO
        if (
            text.includes("como estas") ||
            text.includes("como te encuentras") ||
            text.includes("estado del sistema") ||
            text.includes("estado de los sistemas") ||
            text.includes("estas funcionando") ||
            text.includes("funcionas")
        ) {
            return this.status();
        }

        // HORA
        if (
            text.includes("que hora es") ||
            text.includes("dime la hora") ||
            text.includes("dime que hora") ||
            text.includes("me dices la hora") ||
            text.includes("tienes la hora") ||
            text.includes("hora actual")
        ) {
            return this.time();
        }

        // FECHA
if (
    text.includes("fecha") ||
    text.includes("que dia") ||
    text.includes("dia de hoy") ||
    text.includes("hoy")
) {
    return this.date();
}

        // AYUDA
        if (
            text.includes("que puedes hacer") ||
            text.includes("que sabes hacer") ||
            text.includes("ayuda") ||
            text.includes("tus comandos") ||
            text.includes("tus funciones")
        ) {
            return this.help();
        }

        // DORMIR
        if (
            text.includes("duerme") ||
            text.includes("dormir") ||
            text.includes("modo espera") ||
            text.includes("entra en modo espera")
        ) {
            return this.sleep();
        }

        return this.unknown();
    }
};
