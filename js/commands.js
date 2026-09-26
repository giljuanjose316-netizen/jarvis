/*
 * ==========================================
 * JARVIS - COMMANDS
 * ==========================================
 *
 * Este archivo contiene las acciones que
 * Jarvis sabe ejecutar.
 */

const JarvisCommands = {

  /*
   * ------------------------------------------
   * SALUDO
   * ------------------------------------------
   */

  greeting() {
    return "Saludos, señor.";
  },


  /*
   * ------------------------------------------
   * ESTADO
   * ------------------------------------------
   */

  status() {
    return "Todos los sistemas básicos están funcionando.";
  },


  /*
   * ------------------------------------------
   * HORA
   * ------------------------------------------
   */

  time() {

    const now = new Date();

    const time = now.toLocaleTimeString(
      "es-CO",
      {
        hour: "2-digit",
        minute: "2-digit"
      }
    );

    return `La hora actual es ${time}.`;
  },


  /*
   * ------------------------------------------
   * FECHA
   * ------------------------------------------
   */

  date() {

    const now = new Date();

    const date = now.toLocaleDateString(
      "es-CO",
      {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      }
    );

    return `Hoy es ${date}.`;
  },


  /*
   * ------------------------------------------
   * AYUDA
   * ------------------------------------------
   */

  help() {

    return (
      "Actualmente puedo decirte la hora, " +
      "la fecha, responder saludos y comprobar " +
      "mi estado."
    );

  },


  /*
   * ------------------------------------------
   * DESPEDIDA
   * ------------------------------------------
   */

  sleep() {

    return "Entendido, señor. Quedo en espera.";

  }

};


/*
 * ==========================================
 * INTERPRETADOR
 * ==========================================
 */

function interpretCommand(command) {

  const text =
    command
      .trim()
      .toLowerCase();


  /*
   * SALUDO
   */

  if (
    text.includes("hola") ||
    text.includes("buenos días") ||
    text.includes("buenos dias") ||
    text.includes("buenas tardes") ||
    text.includes("buenas noches")
  ) {

    return {
      action: "greeting",
      response: JarvisCommands.greeting()
    };

  }


  /*
   * ESTADO
   */

  if (
    text.includes("cómo estás") ||
    text.includes("como estas") ||
    text.includes("estado")
  ) {

    return {
      action: "status",
      response: JarvisCommands.status()
    };

  }


  /*
   * HORA
   */

  if (
    text.includes("qué hora") ||
    text.includes("que hora") ||
    text.includes("hora")
  ) {

    return {
      action: "time",
      response: JarvisCommands.time()
    };

  }


  /*
   * FECHA
   */

  if (
    text.includes("qué fecha") ||
    text.includes("que fecha") ||
    text.includes("qué día") ||
    text.includes("que dia") ||
    text.includes("fecha")
  ) {

    return {
      action: "date",
      response: JarvisCommands.date()
    };

  }


  /*
   * AYUDA
   */

  if (
    text.includes("qué puedes hacer") ||
    text.includes("que puedes hacer") ||
    text.includes("ayuda")
  ) {

    return {
      action: "help",
      response: JarvisCommands.help()
    };

  }


  /*
   * DORMIR
   */

  if (
    text.includes("descansa") ||
    text.includes("duerme") ||
    text.includes("desactívate") ||
    text.includes("desactivarte")
  ) {

    return {
      action: "sleep",
      response: JarvisCommands.sleep()
    };

  }


  /*
   * COMANDO DESCONOCIDO
   */

  return {

    action: "unknown",

    response:
      "Todavía no tengo una acción programada para ese comando."

  };

}
