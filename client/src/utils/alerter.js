function alertConfig(title, text, type) {
     return {
          title: title,
          text: text,
          type: type,
          timer: 3000     
     }
}

const alerter = {
     errorAlert:    (title, text = "") => alertConfig(title, text, "error"),
     successAlert:  (title, text = "") => alertConfig(title, text, "success"),
}

export default alerter;