export default {
  date: (options = { locale: "es-MX", style: "short" }) => {
    return new Intl.DateTimeFormat(options?.locale || "es-MX", {
      dateStyle: options?.style || "short",
    }).format(new Date(Date.now()));
  },
  time: (options = { locale: "es-MX", style: "short" }) => {
    return new Intl.DateTimeFormat(options?.locale || "es-MX", {
      timeStyle: options?.style || "short",
    }).format(new Date(Date.now()));
  },
};
