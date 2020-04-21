function alertConfig(title, text, type) {
     return {
          title: title,
          text: text,
          type: type,
          timer: 3000     
     }
}

const alerter = {
     errorAlert(title, text = "") {
          return alertConfig(title, text, "error");
     },
     successAlert(title, text = "") {
          return alertConfig(title, text, "success");
     }
}

export default alerter;