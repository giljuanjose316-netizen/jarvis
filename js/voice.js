/*
 * ==========================================
 * JARVIS - VOICE ENGINE
 * ==========================================
 *
 * Se encarga de:
 *
 * - Reconocimiento de voz
 * - Detección de "Jarvis"
 * - Síntesis de voz
 */

const JarvisVoice = {

  recognition: null,

  listening: false,

  activated: false,

  wakeWord: "jarvis",


  /*
   * ------------------------------------------
   * INICIALIZAR
   * ------------------------------------------
   */

  initialize() {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

      console.error(
        "Este navegador no admite reconocimiento de voz."
      );

      return false;

    }


    this.recognition =
      new SpeechRecognition();


    this.recognition.lang =
      "es-CO";


    this.recognition.continuous =
      true;


    this.recognition.interimResults =
      false;


    this.setupEvents();


    return true;

  },


  /*
   * ------------------------------------------
   * EVENTOS
   * ------------------------------------------
   */

  setupEvents() {

    this.recognition.onresult =
      (event) => {

        const result =
          event.results[
            event.results.length - 1
          ];


        const transcript =
          result[0]
            .transcript
            .trim()
            .toLowerCase();


        console.log(
          "Jarvis escuchó:",
          transcript
        );


        /*
         * Si Jarvis ya está activado,
         * enviar el comando al sistema.
         */

        if (this.activated) {

          this.activated = false;

          if (
            typeof window.handleJarvisCommand ===
            "function"
          ) {

            window.handleJarvisCommand(
              transcript
            );

          }

          return;

        }


        /*
         * Detectar palabra de activación.
         */

        if (
          transcript.includes(
            this.wakeWord
          )
        ) {

          this.activate();

        }

      };


    /*
     * ----------------------------------------
     * ERRORES
     * ----------------------------------------
     */

    this.recognition.onerror =
      (event) => {

        console.error(
          "Error de voz:",
          event.error
        );


        if (
          event.error ===
          "not-allowed"
        ) {

          if (
            typeof window.handleJarvisStatus ===
            "function"
          ) {

            window.handleJarvisStatus(
              "Permiso de micrófono denegado."
            );

          }

        }

      };


    /*
     * ----------------------------------------
     * REINICIO
     * ----------------------------------------
     */

    this.recognition.onend =
      () => {

        if (this.listening) {

          try {

            this.recognition.start();

          } catch (error) {

            console.log(
              "Reconocimiento ya iniciado."
            );

          }

        }

      };

  },


  /*
   * ------------------------------------------
   * INICIAR
   * ------------------------------------------
   */

  start() {

    if (!this.recognition) {

      const initialized =
        this.initialize();

      if (!initialized) {

        return false;

      }

    }


    if (this.listening) {

      return true;

    }


    this.listening = true;


    try {

      this.recognition.start();

    } catch (error) {

      console.error(error);

    }


    return true;

  },


  /*
   * ------------------------------------------
   * ACTIVAR
   * ------------------------------------------
   */

  activate() {

    this.activated = true;


    if (
      typeof window.handleJarvisActivated ===
      "function"
    ) {

      window.handleJarvisActivated();

    }

  },


  /*
   * ------------------------------------------
   * RESPONDER
   * ------------------------------------------
   */

  speak(text) {

    if (
      !window.speechSynthesis
    ) {

      return;

    }


    window.speechSynthesis.cancel();


    const utterance =
      new SpeechSynthesisUtterance(
        text
      );


    utterance.lang =
      "es-CO";


    utterance.rate =
      0.95;


    utterance.pitch =
      0.9;


    window.speechSynthesis.speak(
      utterance
    );

  }

};
