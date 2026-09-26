/*
 * ==========================================
 * JARVIS - CORE
 * ==========================================
 *
 * Este archivo conecta:
 *
 * Voz → Comandos → Respuesta
 */

const Jarvis = {

  /*
   * ------------------------------------------
   * ELEMENTOS DE INTERFAZ
   * ------------------------------------------
   */

  status:
    document.getElementById("status"),

  command:
    document.getElementById("command"),

  orb:
    document.getElementById("orb"),

  startButton:
    document.getElementById("startButton"),


  /*
   * ------------------------------------------
   * INICIAR
   * ------------------------------------------
   */

  initialize() {

    this.setStatus(
      "Pulsa el botón para activar el micrófono."
    );


    this.startButton.addEventListener(
      "click",
      () => {

        const started =
          JarvisVoice.start();


        if (started) {

          this.startButton.textContent =
            "Jarvis activo";

          this.startButton.disabled =
            true;


          this.setStatus(
            "Esperando la palabra Jarvis..."
          );


          this.setCommand(
            'Di "Jarvis"'
          );

        }

      }
    );

  },


  /*
   * ------------------------------------------
   * JARVIS ACTIVADO
   * ------------------------------------------
   */

  activated() {

    this.orb.classList.add(
      "active"
    );


    this.setStatus(
      "Escuchando comando..."
    );


    this.setCommand(
      "Jarvis está escuchando."
    );


    JarvisVoice.speak(
      "¿Sí, señor?"
    );

  },


  /*
   * ------------------------------------------
   * PROCESAR COMANDO
   * ------------------------------------------
   */

  processCommand(command) {

    this.setStatus(
      "Procesando comando..."
    );


    this.setCommand(
      "Comando: " + command
    );


    const result =
      interpretCommand(command);


    console.log(
      "Acción:",
      result.action
    );


    /*
     * Mostrar respuesta.
     */

    setTimeout(
      () => {

        this.setStatus(
          "Respuesta enviada."
        );


        JarvisVoice.speak(
          result.response
        );


      },
      300
    );


    /*
     * Volver al estado de espera.
     */

    setTimeout(
      () => {

        this.orb.classList.remove(
          "active"
        );


        this.setStatus(
          'Esperando "Jarvis"...'
        );


      },
      3000
    );

  },


  /*
   * ------------------------------------------
   * ESTADO
   * ------------------------------------------
   */

  setStatus(text) {

    this.status.textContent =
      text;

  },


  /*
   * ------------------------------------------
   * COMANDO
   * ------------------------------------------
   */

  setCommand(text) {

    this.command.textContent =
      text;

  }

};


/*
 * ==========================================
 * PUENTES PARA VOICE.JS
 * ==========================================
 */

window.handleJarvisActivated =
  function() {

    Jarvis.activated();

  };


window.handleJarvisCommand =
  function(command) {

    Jarvis.processCommand(
      command
    );

  };


window.handleJarvisStatus =
  function(status) {

    Jarvis.setStatus(
      status
    );

  };


/*
 * ==========================================
 * INICIAR JARVIS
 * ==========================================
 */

Jarvis.initialize();
